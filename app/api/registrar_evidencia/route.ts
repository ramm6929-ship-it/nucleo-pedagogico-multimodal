import { NextResponse } from "next/server";
import { attemptAdvance, getAcreditacionState, updateEvidenciaState } from "@/app/lib/memory-store";
import { analyzeEvidence } from "@/app/lib/vision-service";
import { writeFile } from "fs/promises";
import { join } from "path";

/**
 * POST /api/registrar_evidencia
 * 
 * ORDEN TÉCNICA: ACTIVACIÓN DE ANÁLISIS ÓPTICO Y CIERRE DE PF
 */

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const asignatura = formData.get("asignatura") as string;
        const nivel = formData.get("nivel") as string;
        const file = formData.get("file") as File | null;

        if (!asignatura || !nivel) {
            return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
        }

        if (!file) {
            return NextResponse.json({ error: "Se requiere evidencia visual para análisis MVA." }, { status: 400 });
        }

        // 1. Persistencia de Archivo
        // Sanitizar nombre de archivo
        const safeName = file.name.replace(/\s+/g, "_");
        const filename = `evidence-${Date.now()}-${safeName}`;
        const uploadDir = join(process.cwd(), "public", "uploads");

        // Convertir a Buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        try {
            await writeFile(join(uploadDir, filename), buffer);
        } catch (err) {
            console.error("[UPLOAD WARN] Could not save to disk, proceeding with memory buffer.", err);
        }

        // 2. INVOCACIÓN DE MODELO DE VISIÓN (ORDEN TÉCNICA)
        console.log(`[VISION AI] Invoking Optical Analysis for ${asignatura}...`);
        const visionResult = await analyzeEvidence(buffer, file.name, asignatura);

        // 3. VALIDACIÓN DE CRITERIO NORMATIVO
        if (!visionResult.success) {
            console.warn(`[VISION AI] REJECTED: ${visionResult.feedback_normativo}`);

            return NextResponse.json({
                success: false,
                bloqueo_mva: true,
                error: "Evidencia rechazada por Criterio Normativo.",
                mensaje_vision: visionResult.feedback_normativo,
                detalles_opticos: visionResult.detected_elements,
                // Estado actual (sin cambios)
                evidencias_esgr: getAcreditacionState(asignatura, nivel).evidencias_esgr
            }, { status: 403 });
        }

        // 4. PERSISTENCIA EN STORE (REGLA DE ORO)
        // Si la visión aprueba, actualizamos el estado de evidencias a CUMPLIDO.
        console.log(`[VISION AI] SUCCESS: ${visionResult.description}`);

        updateEvidenciaState(asignatura, nivel, {
            e1_comprension: true,
            e2_aplicacion_paec: true,
            e3_argumentacion: true
        });

        // 5. CIERRE DE P.F. (SET PF INDEX)
        const result = attemptAdvance(asignatura, nivel);

        if (!result.success) {
            // Esto sería raro si acabamos de setear true, pero por seguridad
            return NextResponse.json({
                error: result.error,
                success: false,
                bloqueo_mva: true
            }, { status: 403 });
        }

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
        console.error(e);
        return NextResponse.json({ error: "Error interno: " + e.message }, { status: 500 });
    }
}
