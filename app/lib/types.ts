/**
 * CONTRATO BACKEND → FRONTEND (BFF)
 * Tipado estricto del objeto status_update.
 * El Frontend NO modifica, NO calcula, NO infiere datos.
 */

// === ENUMS CONTRATO OBLIGATORIO ===

export type Asignatura = "PM" | "PMI" | "CNEYT" | "FISICA";
export type TipoEvidencia = "digital" | "captura_optica";
export type EstadoProposito = "NO_INICIADO" | "EN_PROCESO" | "LOGRADO";
export type ResultadoAcademico = "AVANZA" | "RECUPERACION" | "BLOQUEADO" | "ACREDITA_NIVEL";

// === INTERFACES CONTRATO OBLIGATORIO ===

export interface EvaluacionEvidencia {
    tipo: TipoEvidencia;
    rubrica_version: string;
    comentario_portafolio: string;
    validada_por_docente: boolean;
}

export interface Acreditacion {
    estado_proposito: EstadoProposito;
    elegible_recuperacion: boolean;
    // NUEVO: Rastreo de evidencias ESGR (ORDEN EJECUTIVA MVA)
    evidencias_esgr: {
        e1_comprension: boolean;
        e2_aplicacion_paec: boolean;
        e3_argumentacion: boolean;
    };
    intentos_realizados: number;
}

export interface DecisionAcademica {
    resultado: ResultadoAcademico;
    accion_siguiente: string;
}

// === CONTRATO PRINCIPAL STATUS_UPDATE ===

export interface StatusUpdate {
    asignatura_activa: Asignatura | null;
    nivel: string | null;
    dia_actual: number | null;

    proposito_formativo_id: string; // ID Legacy para compatibilidad
    proposito_formativo_actual: string; // ID Oficial del PF en curso
    proposito_formativo_siguiente: string | null; // ID del siguiente PF (para prefetch/navegación)

    evaluacion_evidencia: EvaluacionEvidencia;

    acreditacion: Acreditacion;

    decision_academica: DecisionAcademica | null;
}

// === RESPUESTA DEL BACKEND (para Server Actions) ===

export interface AIResponse {
    answer: string;
    status_update: StatusUpdate;
}

// === TIPOS AUXILIARES PARA COMPONENTES ===

export interface AsignaturaInfo {
    id: Asignatura;
    nombre: string;
    habilitada: boolean;
}

export interface EstudianteResumen {
    id: string;
    nombre: string;
    estado_pf: EstadoProposito;
    pf_activo: string;
}
