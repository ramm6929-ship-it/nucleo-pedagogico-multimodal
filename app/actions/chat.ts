"use server";

import { getSystemPrompt } from "@/app/lib/nai";
import { AIResponse } from "@/app/lib/types";
import { supabase } from '@/lib/supabaseClient'

export async function processChat(userMessage: string, history: any[]): Promise<AIResponse> {
    // 1. Load the System Prompt (Conceptually we would send this to the LLM)
    const systemPrompt = await getSystemPrompt();

    // For now, we are MOCKING the response because we don't have an LLM connected.
    // However, we ensure the 'logic' infrastructure is ready:
    // - We read the prompt (proven by logging or using it conceptually)
    // - We return the MANDATORY JSON structure.

    console.log("System Prompt Loaded length:", systemPrompt.length);
    console.log("Processing user message:", userMessage);

    // Simulated LLM delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Construct a mocked response that strictly follows the NAI output format
    const mockResponseText = `Hola. Entendido. Vamos a abordar este tema relacionado con el problema PAEC actual (Sedentarismo).
¿Podrías explicarme con tus propias palabras qué entiendes por "función lineal" y cómo crees que se relaciona con calcular pasos diarios?

Recuerda que estoy aquí para guiarte, no para darte la respuesta directa.`;

    const statusUpdate = {
        asignatura_activa: "PM" as const, // Hardcoded for demo
        progreso: {
            dia_actual: 1,
            porcentaje_logrado: "05%",
            proposito_formativo: "Comprensión de funciones lineales",
        },
        evaluacion_evidencia: {
            tipo: "digital" as const,
            calificacion: 0,
            criterios_cumplidos: [],
            comentario_portafolio: "Interacción inicial sin evidencia evaluable.",
        },
        portafolio_id: "",
    };

    // ================================
    // 🔹 NAI → Supabase (Sesión)
    // ================================

    // Constantes OBLIGATORIAS UUID
    const ESTUDIANTE_ID = '73adfcd1-d3e5-4101-b959-bf1879e36489';
    const ASIGNATURA_ID = '9ce1098d-bed2-4be9-89ea-aac7514b83c7';
    const PROPOSITO_ID = '06804c14-3451-4e50-9c63-85b42e697a39';

    const status = statusUpdate;
    let sesionCreada: { id: string } | null = null;
    let portafolioId: string | undefined;

    if (status?.progreso) {
        const { dia_actual } = status.progreso;

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
        if (sesionCreada) { // Movido dentro de la verificación de sesión
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
            // Note: statusUpdate always sends evaluacion_evidencia according to current code logic, 
            // but we check if it is populated/meaningful if needed. The prompt snippet implies we should just insert.

            if (portafolioId && evaluacion) {
                const { error: evidenciaError } = await supabase
                    .from('evidencias')
                    .insert({
                        portafolio_id: portafolioId,
                        sesion_id: sesionCreada.id,
                        tipo: evaluacion.tipo,
                        calificacion: evaluacion.calificacion,
                        criterios_cumplidos: evaluacion.criterios_cumplidos,
                        retroalimentacion: evaluacion.comentario_portafolio, // FIXED: Mapped to correct column
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
    }

    // Update response with the potentially created/found IDs if needed or just return standard structure
    if (portafolioId) {
        statusUpdate.portafolio_id = portafolioId;
    }

    // ================================
    // ✅ RESPUESTA FINAL OBLIGATORIA
    // ================================

    return {
        answer: mockResponseText,
        status_update: statusUpdate,
    };
}

