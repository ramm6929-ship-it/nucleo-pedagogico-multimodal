"use server";

import { getSystemPrompt } from "@/app/lib/nai";
import { AIResponse, StatusUpdate, Asignatura } from "@/app/lib/types";
import { createClient } from "@supabase/supabase-js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { generarContextoBFF } from "@/app/lib/canonical-pf-data";

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

        // 1. RECUPERAR ESTADO
        const { data: estadoActual } = await supabase
            .from('avance_curricular')
            .select('*')
            .eq('estudiante_id', userId)
            .eq('asignatura', asignaturaSolicitada)
            .maybeSingle();

        // DETECCIÓN DE ARRANQUE: Solo si no hay registro previo de avance
        const esArranque = !estadoActual;

        // Determinar nivel actual (por ahora siempre I, en el futuro será dinámico)
        const nivelActual = "I";

        const contexto = {
            dia: estadoActual?.dia_actual || 1,
            pf_actual: estadoActual?.proposito_formativo_actual || (asignaturaSolicitada === 'CNEYT' ? 'CNEYT-I-PF1' : 'PMI-I-PF1'),
            historial: estadoActual?.pf_acreditados || []
        };

        // 2. PROMPT BASE + CONTEXTO BFF
        const basePrompt = await getSystemPrompt();

        // Generar el contexto curricular BFF con el texto oficial del PF
        const contextoBFF = generarContextoBFF(asignaturaSolicitada, nivelActual, contexto.pf_actual);
        console.log(`📚 [BFF] Contexto inyectado para: ${contexto.pf_actual}`);

        // Instrucción reforzada con contexto BFF
        const instruccionContexto = `
        ${basePrompt}

        ${contextoBFF}

        CONTEXTO ESTUDIANTE:
        ID: ${userId}
        Asignatura: ${asignaturaSolicitada}
        Nivel: ${nivelActual}
        Propósito Formativo Activo: ${contexto.pf_actual}
        Historial Acreditado: ${JSON.stringify(contexto.historial)} (Si está vacío, es ALUMNO NUEVO).
        
        REGLA DE INICIO:
        Si el historial está vacío, ESTÁ AUTORIZADO A INICIAR.
        Define "decision_academica": { "resultado": "CONTINUA", "accion_siguiente": "Bienvenida" }.
        NO USES "BLOQUEADO" EN EL PRIMER MENSAJE.
        
        RECORDATORIO BFF CRÍTICO:
        - USA EXCLUSIVAMENTE el texto del Propósito Formativo que aparece en el CONTEXTO CURRICULAR BFF arriba.
        - NO parafrasees, NO modifiques, NO resumas el texto del PF.
        - TODAS tus preguntas y ejemplos deben relacionarse con los Contenidos Formativos listados.
        `;


        // 3. GEMINI 2.5 FLASH
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction: instruccionContexto,
            generationConfig: {
                temperature: 0.1,
                responseMimeType: "application/json"
            }
        });

        const result = await model.generateContent(userMessage);
        const responseText = result.response.text();

        // 4. PARSEO
        let statusUpdate: StatusUpdate;
        try {
            const parsed = JSON.parse(responseText);
            // Manejar si viene envuelto en status_update o no
            statusUpdate = parsed.status_update || parsed;
        } catch (e) {
            console.error("🔥 JSON Roto, creando fallback.");
            statusUpdate = {
                asignatura_activa: asignaturaSolicitada,
                nivel: "I",
                dia_actual: 1,
                proposito_formativo_id: contexto.pf_actual,
                proposito_formativo_actual: contexto.pf_actual,
                proposito_formativo_siguiente: null,
                evaluacion_evidencia: { tipo: "digital", rubrica_version: "v1", comentario_portafolio: "", validada_por_docente: false },
                acreditacion: { estado_proposito: "EN_PROCESO", elegible_recuperacion: false },
                decision_academica: { resultado: "CONTINUA", accion_siguiente: "Recuperación" }
            } as any;
        }

        // =====================================================================
        // 🛡️ PROTECTOR DE ESTADO Y ARRANQUE (AUDITORÍA DE REDIRECCIÓN)
        // =====================================================================

        // 1. Portero de Arranque: Evita bloqueos falsos al inicio
        // Solo actúa si es REALMENTE la primera vez (estadoActual null)
        if (esArranque) {
            if (!statusUpdate.decision_academica || statusUpdate.decision_academica.resultado === "BLOQUEADO") {
                console.warn("⚠️ CORRIGIENDO BLOQUEO FALSO EN ARRANQUE. Forzando CONTINUA.");

                const mAI = (statusUpdate as any).mensaje_usuario || statusUpdate.decision_academica?.accion_siguiente;

                statusUpdate.decision_academica = {
                    resultado: "CONTINUA",
                    accion_siguiente: mAI || "Bienvenida al curso (Acceso Autorizado por Sistema)"
                };
                statusUpdate.dia_actual = 1;
            }
        }

        // 2. Fix de Redirección: Forzamos persistencia de la asignatura y nivel
        statusUpdate.asignatura_activa = asignaturaSolicitada;
        statusUpdate.nivel = "I";
        // =====================================================================

        console.log("🧠 DECISIÓN FINAL:", statusUpdate.decision_academica?.resultado);

        // 5. EXTRACCIÓN TEXTO
        // Buscamos el mensaje pedagógico en orden de prioridad
        const textoRespuesta = (statusUpdate as any).mensaje_usuario ||
            (statusUpdate as any).comentario_pedagogico ||
            statusUpdate.decision_academica?.accion_siguiente ||
            "¡Hola! Soy tu asistente pedagógico. ¿En qué puedo ayudarte hoy?";

        // 6. PERSISTENCIA
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

        // Avance
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
        console.error("❌ Error Fatal:", error);
        return {
            answer: "Error de conexión. Intenta de nuevo.",
            status_update: {
                asignatura_activa: asignaturaSolicitada,
                nivel: "I",
                dia_actual: 1,
                proposito_formativo_id: "ERR",
                proposito_formativo_actual: "ERR",
                proposito_formativo_siguiente: null,
                evaluacion_evidencia: { tipo: "digital", rubrica_version: "v1", comentario_portafolio: "", validada_por_docente: false },
                acreditacion: { estado_proposito: "EN_PROCESO", elegible_recuperacion: false },
                decision_academica: { resultado: "CONTINUA", accion_siguiente: "Reinicio" }
            }
        };
    }
}