import { NextResponse } from "next/server";

/**
 * POST /api/docente/validar
 * 
 * BFF Adapter - Validación/Rechazo de evidencias por parte del docente.
 */
export async function POST(request: Request) {
    const body = await request.json();
    const { evidenciaId, aprobada, comentario } = body;

    console.log(`[BFF] Evidencia ${evidenciaId} ${aprobada ? 'VALIDADA' : 'RECHAZADA'}. Comentario: ${comentario}`);

    // Solo emitimos el evento. El backend real procesaría esto.
    return NextResponse.json({ success: true, status: "PROCESSED" }, { status: 200 });
}
