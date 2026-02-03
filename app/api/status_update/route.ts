import { NextResponse } from "next/server";
import type { StatusUpdate, Asignatura } from "@/app/lib/types";
import { getPFIndex, getAcreditacionState } from "@/app/lib/memory-store";
import { getCanonicalPF, getPFCount } from "@/app/lib/canonical-pf-data";

/**
 * GET /api/status_update
 * 
 * ORDEN TÉCNICA DE AUDITORÍA: CORRECCIÓN DE LECTURA
 * Este endpoint es un ESPEJO FIEL de memory-store.ts.
 */

const RESULTADO_MAPPING: Record<string, "AVANZA" | "RECUPERACION" | "BLOQUEADO" | "ACREDITA_NIVEL"> = {
    "CONTINUA": "AVANZA",
    "RECUPERA": "RECUPERACION",
    "BLOQUEADO": "BLOQUEADO",
    "ACREDITA_NIVEL": "ACREDITA_NIVEL"
};

const ESTADO_MAPPING: Record<string, "NO_INICIADO" | "EN_PROCESO" | "LOGRADO"> = {
    "NO_LOGRADO": "EN_PROCESO",
    "EN_PROCESO": "EN_PROCESO",
    "LOGRADO": "LOGRADO"
};

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const asignaturaRaw = searchParams.get("asignatura") || "PMI";
        const nivel = searchParams.get("nivel") || "I";

        // Normalización Estricta
        const asignatura: Asignatura = (asignaturaRaw === "PM" ? "PMI" : asignaturaRaw) as Asignatura;

        // 1. LECTURA EN TIEMPO REAL (SSOT)
        const pfIndex = getPFIndex(asignatura, nivel);
        const totalPFs = getPFCount(asignatura, nivel);

        console.log(`[AUDIT API] Reading Status for ${asignatura}-${nivel}. Index: ${pfIndex}/${totalPFs}`);

        // 2. RESOLUCIÓN CANÓNICA
        const currentPF = getCanonicalPF(asignatura, nivel, pfIndex);
        const nextPF = getCanonicalPF(asignatura, nivel, pfIndex + 1);
        const isLastPF = pfIndex >= totalPFs;

        // Validación de integridad
        if (!currentPF) {
            console.error(`[CRITICAL ERROR] PF Index ${pfIndex} not found in canonical sequence for ${asignatura}-${nivel}`);
            // Fallback para evitar crash en frontend si algo sale muy mal
            return NextResponse.json({ error: "Desincronización canónica detected", debug_index: pfIndex }, { status: 500 });
        }

        // 3. ESTADO DE ACREDITACIÓN (MVA/ESGR)
        const acreditacionState = getAcreditacionState(asignatura, nivel);

        // 4. CONSTRUCCIÓN DE RESPUESTA
        const statusUpdate: StatusUpdate = {
            asignatura_activa: asignatura,
            nivel: nivel,
            dia_actual: 15,

            proposito_formativo_id: currentPF,
            proposito_formativo_actual: currentPF,
            proposito_formativo_siguiente: nextPF,

            evaluacion_evidencia: {
                tipo: "digital",
                rubrica_version: "v1.0",
                comentario_portafolio: "Esperando evidencia normativa.",
                validada_por_docente: false
            },

            acreditacion: {
                estado_proposito: ESTADO_MAPPING["EN_PROCESO"],
                elegible_recuperacion: false,
                evidencias_esgr: acreditacionState.evidencias_esgr,
                intentos_realizados: 0
            },

            decision_academica: {
                resultado: RESULTADO_MAPPING["CONTINUA"],
                accion_siguiente: nextPF ? "Continuar con la sesión de aprendizaje" : "Ciclo Concluido"
            },
            trayecto_concluido: isLastPF
        };

        return NextResponse.json(statusUpdate, { status: 200 });

    } catch (error: any) {
        console.error("[API FATAL ERROR]", error);
        return NextResponse.json({
            error: "Internal Server Error",
            message: error.message,
            stack: error.stack
        }, { status: 500 });
    }
}
