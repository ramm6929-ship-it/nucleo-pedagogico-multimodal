import { NextResponse } from "next/server";
import type { EstudianteResumen } from "@/app/lib/types";

/**
 * GET /api/docente/estudiantes
 * 
 * BFF Adapter - Lista de estudiantes y sus estados académicos actuales.
 */
export async function GET() {
    // Mock data based on the required structure
    const estudiantes: EstudianteResumen[] = [
        { id: "1", nombre: "María García López", estado_pf: "LOGRADO", pf_activo: "PF-CNEYT-I-01" },
        { id: "2", nombre: "Juan Hernández Ruiz", estado_pf: "EN_PROCESO", pf_activo: "PF-CNEYT-I-02" },
        { id: "3", nombre: "Ana Martínez Sánchez", estado_pf: "NO_INICIADO", pf_activo: "PF-CNEYT-I-01" },
        { id: "4", nombre: "Carlos Rodríguez Pérez", estado_pf: "LOGRADO", pf_activo: "PF-CNEYT-I-03" },
        { id: "5", nombre: "Laura Gómez Torres", estado_pf: "EN_PROCESO", pf_activo: "PF-CNEYT-I-02" },
    ];

    return NextResponse.json(estudiantes, { status: 200 });
}
