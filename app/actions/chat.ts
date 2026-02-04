"use server";

import { getSystemPrompt } from "@/app/lib/nai";
import { AIResponse, StatusUpdate, Asignatura } from "@/app/lib/types";
import { createClient } from "@supabase/supabase-js";
import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. CONFIGURACIÓN SEGURA DE CLIENTES
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function processChat(
    userMessage: string,
    userId: string,
    asignaturaSolicitada: Asignatura
): Promise<AIResponse> {

    try {
        console.log(`🚀 [NAI] Iniciando ciclo para usuario: ${userId}`);

        // 2. RECUPERAR MEMORIA DEL ESTUDIANTE (Contexto)
        const { data: estadoActual, error: errorDb } = await supabase
            .from('avance_curricular')
            .select('*')
            .eq('estudiante_id', userId)
            .eq('asignatura', asignaturaSolicitada)
            .maybeSingle();

        // Estado por defecto para usuarios nuevos
        const contexto = {
            dia: estadoActual?.dia_actual || 1,
            pf_actual: estadoActual?.proposito_formativo_actual || (asignaturaSolicitada === 'CNEYT' ? 'CNEYT-I-PF1' : 'PMI-I-PF1'),
            historial: estadoActual?.pf_acreditados || []
        };

        // 3. CONSTRUCCIÓN DEL PROMPT
        const basePrompt = await getSystemPrompt();

        const fullSystemInstruction = `
        ${basePrompt}

        === CONTEXTO DINÁMICO DEL ESTUDIANTE ===
        ID: ${userId}
        Asignatura: ${asignaturaSolicitada}
        Día de avance: ${contexto.dia}
        Propósito Formativo Activo: ${contexto.pf_actual}
        Historial Acreditado: ${JSON.stringify(contexto.historial)}
        ========================================
        
        INSTRUCCIÓN TÉCNICA:
        Tu respuesta DEBE ser un objeto JSON válido que cumpla la interfaz 'StatusUpdate'.
        Incluye tu respuesta conversacional al estudiante dentro de un campo llamado 'mensaje_usuario' dentro del JSON.
        `;

        // 4. INVOCACIÓN A GEMINI 1.5 PRO (Modo JSON)
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: fullSystemInstruction,
            generationConfig: {
                temperature: 0.1,
                responseMimeType: "application/json"
            }
        });

        const result = await model.generateContent(userMessage);
        const responseText = result.response.text();

        // 5. PARSEO Y EXTRACCIÓN
        let statusUpdate: StatusUpdate;
        try {
            statusUpdate = JSON.parse(responseText);
        } catch (e) {
            console.error("🔥 Error JSON Gemini:", responseText);
            throw new Error("La IA no devolvió un formato válido.");
        }

        // Recuperar el mensaje para el usuario del JSON
        const textoRespuesta = (statusUpdate as any).mensaje_usuario ||
            (statusUpdate as any).comentario_pedagogico ||
            statusUpdate.decision_academica?.accion_siguiente ||
            "Continúa con la actividad.";

        // 6. GUARDAR EN SUPABASE (Persistencia)

        // A) Sesión
        const { data: sesion } = await supabase
            .from('sesiones_aprendizaje')
            .insert({
                estudiante_id: userId,
                asignatura_id: statusUpdate.asignatura_activa === 'CNEYT' ? 2 : 1, // Ajustar IDs según DB
                proposito_formativo_id: statusUpdate.proposito_formativo_actual,
                dia: statusUpdate.dia_actual,
                estado: 'completada',
                contenido_interaccion: textoRespuesta,
                fecha: new Date().toISOString()
            })
            .select()
            .single();

        // B) Evidencia (si aplica)
        if (sesion && statusUpdate.evaluacion_evidencia?.tipo) {
            const { data: portafolio } = await supabase.from('portafolios').select('id').eq('estudiante_id', userId).maybeSingle();
            let portafolioId = portafolio?.id;

            if (!portafolioId) {
                const { data: newP } = await supabase.from('portafolios').insert({ estudiante_id: userId }).select().single();
                portafolioId = newP?.id;
            }

            if (portafolioId) {
                await supabase.from('evidencias').insert({
                    portafolio_id: portafolioId,
                    sesion_id: sesion.id,
                    tipo: statusUpdate.evaluacion_evidencia.tipo,
                    retroalimentacion: statusUpdate.evaluacion_evidencia.comentario_portafolio,
                    validada: statusUpdate.evaluacion_evidencia.validada_por_docente
                });
            }
        }

        // C) Actualizar Avance
        const nuevosAcreditados = statusUpdate.acreditacion.estado_proposito === "LOGRADO"
            ? Array.from(new Set([...contexto.historial, statusUpdate.proposito_formativo_actual]))
            : contexto.historial;

        await supabase.from('avance_curricular').upsert({
            estudiante_id: userId,
            asignatura: asignaturaSolicitada,
            dia_actual: statusUpdate.dia_actual,
            proposito_formativo_actual: statusUpdate.proposito_formativo_actual,
            pf_acreditados: nuevosAcreditados,
            updated_at: new Date().toISOString()
        });

        return {
            answer: textoRespuesta,
            status_update: statusUpdate
        };

    } catch (error: any) {
        console.error("❌ Error processChat:", error);
        // Respuesta de emergencia para no romper la UI
        return {
            answer: "Hubo un error de conexión con el núcleo pedagógico. Intenta de nuevo.",
            status_update: {
                asignatura_activa: asignaturaSolicitada,
                nivel: "I",
                dia_actual: 0,
                proposito_formativo_id: "ERROR",
                proposito_formativo_actual: "ERROR",
                proposito_formativo_siguiente: null,
                evaluacion_evidencia: { tipo: "digital", rubrica_version: "v1", comentario_portafolio: "", validada_por_docente: false },
                acreditacion: { estado_proposito: "NO_INICIADO", elegible_recuperacion: false },
                decision_academica: { resultado: "BLOQUEADO", accion_siguiente: "Reintentar" }
            }
        };
    }
}