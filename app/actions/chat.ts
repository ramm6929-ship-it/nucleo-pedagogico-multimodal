"use server";

import { getSystemPrompt } from "@/app/lib/nai";
import { AIResponse, StatusUpdate, Asignatura } from "@/app/lib/types";
import { supabase } from '@/lib/supabaseClient'

export async function processChat(userMessage: string, history: any[], asignaturaSolicitada?: Asignatura): Promise<AIResponse> {
    // 1. Load the System Prompt (Conceptually we would send this to the LLM)
    const systemPrompt = await getSystemPrompt();

    const asignatura = asignaturaSolicitada || "PM";

    // For now, we are MOCKING the response because we don't have an LLM connected.
    // However, we ensure the 'logic' infrastructure is ready:
    // - We read the prompt (proven by logging or using it conceptually)
    // - We return the MANDATORY JSON structure.

    console.log("System Prompt Loaded length:", systemPrompt.length);
    console.log("Processing user message:", userMessage, "for subject:", asignatura);

    // Simulated LLM delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Construct a mocked response that strictly follows the NAI output format
    const mockResponseText = `Hola. Entendido. Vamos a abordar este tema relacionado con el problema PAEC actual (Sedentarismo).
¿Podrías explicarme con tus propias palabras qué entiendes por este concepto en el contexto de ${asignatura}?

Recuerda que estoy aquí para guiarte, no para darte la respuesta directa.`;

    // UPDATED: StatusUpdate aligned with BFF contract and Executive Order
    const statusUpdate: StatusUpdate = {
        asignatura_activa: asignatura,
        nivel: "I", // Default level for mock
        dia_actual: 15, // Demo value
        proposito_formativo_id: asignatura === "CNEYT" ? "CNEYT-I-PF1" : "PMI-I-PF1",
        proposito_formativo_actual: asignatura === "CNEYT" ? "CNEYT-I-PF1" : "PMI-I-PF1",
        proposito_formativo_siguiente: asignatura === "CNEYT" ? "CNEYT-I-PF2" : "PMI-I-PF2",
        evaluacion_evidencia: {
            tipo: "digital",
            rubrica_version: "v1.0",
            comentario_portafolio: "Interacción en sesión - Aislamiento verificado.",
            validada_por_docente: false,
        },
        acreditacion: {
            estado_proposito: "EN_PROCESO",
            elegible_recuperacion: false,
        },
        decision_academica: {
            resultado: "AVANZA",
            accion_siguiente: "Continuar con la sesión de aprendizaje",
        },
    };

    // ================================
    // 🔹 NAI → Supabase (Sesión)
    // ================================

    // Constantes OBLIGATORIAS UUID
    const ESTUDIANTE_ID = '73adfcd1-d3e5-4101-b959-bf1879e36489';
    const ASIGNATURA_ID = '9ce1098d-bed2-4be9-89ea-aac7514b83c7';
    const PROPOSITO_ID = '06804c14-3451-4e50-9c63-85b42e697a39';

    let sesionCreada: { id: string } | null = null;
    let portafolioId: string | undefined;

    const dia_actual = statusUpdate.dia_actual;

    // 3️⃣ Crear sesión de aprendizaje (CORRECTO - usando UUIDs fijos)
    const { data: sesion, error: sesionError } = await supabase
        .from('sesiones_aprendizaje')
        .insert({
            estudiante_id: ESTUDIANTE_ID,
            asignatura_id: ASIGNATURA_ID,
            proposito_formativo_id: PROPOSITO_ID,
            dia: dia_actual,
            estado: 'iniciada',
            fecha: new Date().toISOString(),
        })
        .select()
        .single();

    if (sesionError) {
        console.error('Error creando sesión:', sesionError);
    } else if (sesion) {
        sesionCreada = sesion;

        // 🔹 NAI → Supabase (Vincular Contenidos Formativos)
        const { data: contenidos } = await supabase
            .from('contenidos_formativos')
            .select('id')
            .eq('proposito_formativo_id', PROPOSITO_ID);

        console.log("DEBUG LINKING:", {
            sesionId: sesion.id,
            contenidosCount: contenidos?.length,
            propositoId: PROPOSITO_ID
        });

        if (contenidos && contenidos.length > 0) {
            const relaciones = contenidos.map(c => ({
                sesion_id: sesion.id,
                contenido_formativo_id: c.id
            }));

            const { error: contenidosError } = await supabase
                .from('sesion_contenidos')
                .insert(relaciones);

            if (contenidosError) {
                console.error('Error vinculando contenidos:', contenidosError);
            }
        }
    }

    const evaluacion = statusUpdate.evaluacion_evidencia;

    // 🔹 NAI → Supabase (Evidencia) (Solo si existe sesión)
    if (sesionCreada) {
        // 4️⃣ Portafolio (alineado al esquema real)
        const { data: portafolio } = await supabase
            .from('portafolios')
            .select('id')
            .eq('estudiante_id', ESTUDIANTE_ID)
            .single();

        portafolioId = portafolio?.id;

        if (!portafolioId) {
            const { data: nuevoPortafolio, error: nuevoPortafolioError } = await supabase
                .from('portafolios')
                .insert({ estudiante_id: ESTUDIANTE_ID })
                .select()
                .single();

            if (nuevoPortafolioError) {
                console.error('Error creando portafolio:', nuevoPortafolioError);
            } else if (nuevoPortafolio) {
                portafolioId = nuevoPortafolio.id;
            }
        }

        // 5️⃣ Evidencia (solo si existe sesión y evaluación)
        if (portafolioId && evaluacion) {
            const { error: evidenciaError } = await supabase
                .from('evidencias')
                .insert({
                    portafolio_id: portafolioId,
                    sesion_id: sesionCreada.id,
                    tipo: evaluacion.tipo,
                    retroalimentacion: evaluacion.comentario_portafolio,
                });

            if (evidenciaError) {
                console.error('Error creando evidencia:', evidenciaError);
            } else {
                // 6️⃣ Actualizar estado de sesión
                await supabase
                    .from('sesiones_aprendizaje')
                    .update({ estado: 'completada' })
                    .eq('id', sesionCreada.id);
            }
        }
    }

    // NOTE: portafolio_id is NOT part of StatusUpdate contract
    // The ID is persisted in Supabase but not exposed to Frontend

    // ================================
    // ✅ RESPUESTA FINAL OBLIGATORIA
    // ================================

    return {
        answer: mockResponseText,
        status_update: statusUpdate,
    };
}
