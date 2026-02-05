import { NextResponse } from "next/server";
import { advancePFIndex, getAcreditacionState, updateEvidenciaState, getPFIndex } from "@/app/lib/memory-store";
import { analyzeEvidence } from "@/app/lib/vision-service";
import { writeFile } from "fs/promises";
import { join } from "path";

/**
 * POST /api/registrar_evidencia
 * 
 * ORDEN TÉCNICA: SANEAMIENTO ESTRUCTURAL (SIN HTML)
 * Garantiza respuestas JSON estrictas en todos los casos.
 */

export async function POST(request: Request) {
    // Wrapper global de seguridad para atrapar cualquier error no controlado y forzar JSON
    try {
        const formData = await request.formData();
        const asignatura = formData.get("asignatura") as string;
        const nivel = formData.get("nivel") as string;
        const file = formData.get("file") as File | null;

        // 1. Validación de Entrada (Strict JSON on error)
        if (!asignatura || !nivel) {
            return NextResponse.json({ success: false, error: "Datos incompletos: asignatura o nivel faltantes." }, { status: 400 });
        }

        if (!file || !(file instanceof File) || file.size === 0) {
            return NextResponse.json({ success: false, error: "Se requiere evidencia visual válida para análisis MVA." }, { status: 400 });
        }

        // 1.5 VALIDACIÓN DE SEGURIDAD (TOKEN SAFETY)
        // Evitamos enviar basura a Gemini.
        const { validateImageFile } = require("@/app/lib/file-validation");
        const validation = await validateImageFile(file);

        if (!validation.isValid) {
            console.warn(`[UPLOAD BLOCKED] Archivo rechazado: ${validation.error}`);
            return NextResponse.json({
                success: false,
                error: validation.error,
                bloqueo_seguridad: true
            }, { status: 400 });
        }

        // 2. Persistencia de Archivo (Sin exponer detalles de sistema en error)
        const filename = `evidence-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`; // Sanitización estricta de nombre
        const uploadDir = join(process.cwd(), "public", "uploads");

        try {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            await writeFile(join(uploadDir, filename), buffer);
        } catch (err: any) {
            console.error("[UPLOAD CRITICAL] Error saving file:", err.message);
            // No bloqueamos el flujo pedagógico por error de disco secundario, pero logueamos
        }

        // 3. Análisis MVA (Vision Service)
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        console.log(`[VISION AI] Analyzing for ${asignatura}...`);
        const visionResult = await analyzeEvidence(buffer, file.name, asignatura);

        if (!visionResult.success) {
            return NextResponse.json({
                success: false,
                bloqueo_mva: true,
                error: "Evidencia rechazada por Criterio Normativo.",
                mensaje_vision: visionResult.feedback_normativo,
                detalles_opticos: visionResult.detected_elements,
                evidencias_esgr: getAcreditacionState(asignatura, nivel).evidencias_esgr
            }, { status: 403 }); // Forbidden por normativa
        }

        // 4. Actualización de Estado (Atomic Operation)
        console.log(`[VISION AI] SUCCESS. Updating store...`);

        updateEvidenciaState(asignatura, nivel, {
            e1_comprension: true,
            e2_aplicacion_paec: true,
            e3_argumentacion: true
        });

        const result = advancePFIndex(asignatura, nivel);

        if (!result.success) {
            return NextResponse.json({
                success: false,
                bloqueo_mva: true,
                error: result.error || "Error al avanzar índice académico."
            }, { status: 403 });
        }

        // 5. Respuesta Exitosa Canonical
        return NextResponse.json({
            success: true,
            mensaje: result.trayectoConcluido ? "Trayecto Concluido" : "Evidencia Acreditada por Visión Artificial.",
            mensaje_vision: visionResult.feedback_normativo,
            detalles_opticos: visionResult.detected_elements,
            nuevo_pf_index: result.newIndex,
            trayecto_concluido: result.trayectoConcluido,
            evidencias_esgr: getAcreditacionState(asignatura, nivel).evidencias_esgr
        });

    } catch (e: any) {
        console.error("[API FATAL]", e);
        // GARANTÍA DE CERO HTML: Siempre devolvemos JSON
        return NextResponse.json({
            success: false,
            error: "Error Interno del Servidor (Protocolo de Seguridad).",
            details: process.env.NODE_ENV === 'development' ? e.message : undefined
        }, { status: 500 });
    }
}
