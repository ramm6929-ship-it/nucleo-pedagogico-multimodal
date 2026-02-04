"use server";

import { getSystemPrompt } from "@/app/lib/nai";
import { AIResponse, StatusUpdate, Asignatura } from "@/app/lib/types";
import { createClient } from "@supabase/supabase-js";
import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. CONFIGURACIÓN
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

        // 2. RECUPERAR DATOS
        const { data: estadoActual } = await supabase
            .from('avance_curricular')
            .select('*')
            .eq('estudiante_id', userId)
            .eq('asignatura', asignaturaSolicitada)
            .maybeSingle();

        const contexto = {
            dia: estadoActual?.dia_actual || 1,
            pf_actual: estadoActual?.proposito_formativo_actual || (asignaturaSolicitada === 'CNEYT' ? 'CNEYT-I-PF1' : 'PMI-I-PF1'),
            historial: estadoActual?.pf_acreditados || []
        };

        // 3. PROMPT CON "PARCHE ANTI-BLOQUEO"
        const basePrompt = await getSystemPrompt();

        const fullSystemInstruction = `
        ${basePrompt}

        === CONTEXTO DEL ESTUDIANTE ===
        ID: ${userId}
        Asignatura: ${asignaturaSolicitada}
        PF Activo: ${contexto.pf_actual}
        Historial: ${JSON.stringify(contexto.historial)}
        ===============================
        
        !!! INSTRUCCIONES DE CONTROL DE FLUJO (PRIORITARIAS) !!!
        1. Tu respuesta DEBE ser un JSON válido (StatusUpdate).
        2. REGLA DE SESIÓN ACTIVA: Si el estudiante está trabajando en el Propósito Formativo actual, el estado es "CONTINUA".
        3. NO uses "BLOQUEADO" para sesiones normales. "BLOQUEADO" es EXCLUSIVO para intentos de saltar a un Nivel superior sin acreditar el anterior.
        4. Si es el primer mensaje ("Hola"), responde con bienvenida y estado "CONTINUA".
        5. Es OBLIGATORIO incluir el objeto "acreditacion".
        `;

        // 4. INVOCACIÓN GEMINI 2.5 FLASH
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction: fullSystemInstruction,
            generationConfig: {
                temperature: 0.1,
                responseMimeType: "application/json"
            }
        });

        const result = await model.generateContent(userMessage);
        const responseText = result.response.text();

        // 5. PARSEO
        let statusUpdate: StatusUpdate;
        try {
            statusUpdate = JSON.parse(responseText);
            // --- LOG CRÍTICO: VER EL CEREBRO DE LA IA ---
            console.log("🧠 NAI DECISIÓN (JSON):", JSON.stringify(statusUpdate.decision_academica));
            // -------------------------------------------
        } catch (e) {
            console.error("🔥 Error JSON Gemini:", responseText);
            throw new Error("Error de Integridad: La IA no entregó un formato válido.");
        }

        const textoRespuesta = (statusUpdate as any).mensaje_usuario ||
            (statusUpdate as any).comentario_pedagogico ||
            statusUpdate.decision_academica?.accion_siguiente ||
            "Continúa con la actividad.";

        // 6. PERSISTENCIA

        // A) Sesión
        const { data: sesion } = await supabase
            .from('sesiones_aprendizaje')
            .insert({
                estudiante_id: userId,
                asignatura_id: (statusUpdate.asignatura_activa === 'CNEYT' || asignaturaSolicitada === 'CNEYT') ? 2 : 1,
                proposito_formativo_id: statusUpdate.proposito_formativo_actual || contexto.pf_actual,
                dia: statusUpdate.dia_actual || contexto.dia,
                estado: 'completada',
                contenido_interaccion: textoRespuesta,
                fecha: new Date().toISOString()
            })
            .select()
            .single();

        // B) Evidencia
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
                    retroalimentacion: statusUpdate.evaluacion_evidencia.comentario_portafolio || "Registrado",
                    validada: statusUpdate.evaluacion_evidencia.validada_por_docente || false
                });
            }
        }

        // C) Actualización Curricular
        const estadoLogro = statusUpdate.acreditacion?.estado_proposito || "EN_PROCESO";
        const pfActual = statusUpdate.proposito_formativo_actual || contexto.pf_actual;

        const nuevosAcreditados = estadoLogro === "LOGRADO"
            ? Array.from(new Set([...contexto.historial, pfActual]))
            : contexto.historial;

        await supabase.from('avance_curricular').upsert({
            estudiante_id: userId,
            asignatura: asignaturaSolicitada,
            dia_actual: statusUpdate.dia_actual || contexto.dia,
            proposito_formativo_actual: pfActual,
            pf_acreditados: nuevosAcreditados,
            updated_at: new Date().toISOString()
        });

        return {
            answer: textoRespuesta,
            status_update: statusUpdate
        };

    } catch (error: any) {
        console.error("❌ Error processChat:", error);
        return {
            answer: "Error de conexión con el Núcleo. Intenta de nuevo.",
            status_update: {
                asignatura_activa: asignaturaSolicitada,
                nivel: "I",
                dia_actual: 0,
                proposito_formativo_id: "ERR",
                proposito_formativo_actual: "ERR",
                proposito_formativo_siguiente: null,
                evaluacion_evidencia: { tipo: "digital", rubrica_version: "v1", comentario_portafolio: "", validada_por_docente: false },
                acreditacion: { estado_proposito: "EN_PROCESO", elegible_recuperacion: false },
                decision_academica: { resultado: "BLOQUEADO", accion_siguiente: "Reintentar" }
            }
        };
    }
}