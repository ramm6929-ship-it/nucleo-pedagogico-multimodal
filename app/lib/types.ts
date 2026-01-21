export type Asignatura = "PM" | "CNEyT" | "FISICA";
export type TipoEvidencia = "digital" | "captura_optica";

export interface Progreso {
    dia_actual: number;
    porcentaje_logrado: string;
    proposito_formativo: string;
}

export interface EvaluacionEvidencia {
    tipo: TipoEvidencia;
    calificacion: number;
    criterios_cumplidos: string[];
    comentario_portafolio: string;
}

export interface StatusUpdate {
    asignatura_activa: Asignatura;
    progreso: Progreso;
    evaluacion_evidencia: EvaluacionEvidencia;
    portafolio_id: string;
}

export interface AIResponse {
    status_update: StatusUpdate;
    [key: string]: any; // Allow for other fields like the main response text found outside the JSON block if needed, though the prompt says "FINALIZAR CON UN BLOQUE JSON" implying the rest is text.
}
