/**
 * SERVICIO DE VISIÓN ARTIFICIAL (MOCK ESTRUCTURADO)
 * Simula el análisis óptico de evidencias según Criterios Normativos.
 */

export interface VisionAnalysisResult {
    success: boolean;
    description: string;
    detected_elements: string[];
    feedback_normativo: string;
}

export const analyzeEvidence = async (fileBuffer: Buffer, filename: string, asignatura: string): Promise<VisionAnalysisResult> => {
    // Simulación de latencia de red/procesamiento (800ms)
    await new Promise(resolve => setTimeout(resolve, 800));

    const name = filename.toLowerCase();

    // CASO DE FALLO: Si el nombre contiene palabras clave de error
    if (name.includes("dibujo") || name.includes("texto") || name.includes("error") || name.includes("cat")) {
        return {
            success: false,
            description: "Imagen no académica detectada.",
            detected_elements: ["Trazos libres", "Ilustración artística", "Ausencia de notación matemática"],
            feedback_normativo: "FALLO_MVA: La evidencia no contiene números, operaciones ni razonamiento matemático verificable."
        };
    }

    // CASO DE ÉXITO: Por defecto (Happy Path)
    // Simulamos detección inteligente basada en la asignatura
    if (asignatura.startsWith("PM")) {
        return {
            success: true,
            description: "Hoja de libreta con resolución de ejercicios.",
            detected_elements: ["Ecuaciones algebraicas", "Números enteros", "Procedimiento paso a paso", "Resultado remarcado"],
            feedback_normativo: "Se detectó resolución de fracciones y operaciones aritméticas. Evidencia E1 (Comprensión) y E2 (Aplicación) validadas."
        };
    }

    if (asignatura === "CNEYT") {
        return {
            success: true,
            description: "Esquema científico o reporte de laboratorio.",
            detected_elements: ["Diagrama de flujo", "Conceptos físicos", "Hipótesis escrita"],
            feedback_normativo: "Evidencia válida para CNEYT. Se identifican elementos del método científico."
        };
    }

    // Fallback genérico exitoso
    return {
        success: true,
        description: "Documento académico legible.",
        detected_elements: ["Texto estructurado", "Formato de evidencia"],
        feedback_normativo: "Contenido cumple con los requisitos mínimos de forma."
    };
};
