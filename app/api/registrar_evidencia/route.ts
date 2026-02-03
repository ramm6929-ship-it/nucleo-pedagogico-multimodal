import { NextResponse } from "next/server";
import { attemptAdvance } from "@/app/lib/memory-store";

/**
 * POST /api/registrar_evidencia
 * 
 * Endpoint transaccional para registrar evidencia y avanzar el estado académico.
 * ORDEN 4: Avance CONDICIONADO (MVA/ESGR).
 * ORDEN 5: Bloqueo duro de ciclos y requisitos.
 */

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { asignatura, nivel } = body;

        if (!asignatura || !nivel) {
            return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
        }

        // 1. Simular validación de evidencia 
        const validacionExitosa = true;

        if (validacionExitosa) {
            // 2. Ejecutar intento de avance con blindaje MVA
            const result = attemptAdvance(asignatura, nivel);

            if (!result.success) {
                return NextResponse.json({
                    error: result.error,
                    success: false,
                    bloqueo_mva: true
                }, { status: 403 }); // 403 Forbidden: No cumple requisitos
            }

            return NextResponse.json({
                success: true,
                mensaje: result.trayectoConcluido ? "Trayecto Concluido" : "Evidencia registrada y acreditada",
                nuevo_pf_index: result.newIndex,
                trayecto_concluido: result.trayectoConcluido
            });
        }

        return NextResponse.json({ error: "Validación fallida" }, { status: 400 });

    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Error interno" }, { status: 500 });
    }
}
