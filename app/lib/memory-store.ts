// app/lib/memory-store.ts
import { getPFCount } from "./canonical-pf-data";

type LevelState = Record<string, number>;
export type ESGRState = {
    e1_comprension: boolean;
    e2_aplicacion_paec: boolean;
    e3_argumentacion: boolean;
};

// Mapa de estado de evidencias por asignatura-nivel-index
type EvidenceMap = Record<string, ESGRState>;

type AcademicState = {
    indexes: Record<string, LevelState>;
    evidencias: EvidenceMap;
};

// SIMPLIFICACION: Singleton Global para persistencia en DEV (HMR Safe)
const globalForAcademic = globalThis as unknown as {
    academicStore: AcademicState | undefined;
};

export const academicStore = globalForAcademic.academicStore ?? {
    indexes: {},
    evidencias: {}
};

if (process.env.NODE_ENV !== 'production') {
    globalForAcademic.academicStore = academicStore;
}

const getKey = (asignatura: string) => asignatura === "PM" ? "PMI" : asignatura;

/**
 * Obtiene el índice actual del PF. Inicializa en 1 si no existe.
 */
export const getPFIndex = (asignatura: string, nivel: string): number => {
    const subjKey = getKey(asignatura);
    // Init subj entry
    if (!academicStore.indexes[subjKey]) {
        academicStore.indexes[subjKey] = {};
    }

    // Init level entry to 1 if missing or 0
    if (!academicStore.indexes[subjKey][nivel] || academicStore.indexes[subjKey][nivel] < 1) {
        academicStore.indexes[subjKey][nivel] = 1;
    }

    return academicStore.indexes[subjKey][nivel];
};

export const setPFIndex = (asignatura: string, nivel: string, newIndex: number) => {
    const subjKey = getKey(asignatura);
    if (!academicStore.indexes[subjKey]) academicStore.indexes[subjKey] = {};
    academicStore.indexes[subjKey][nivel] = newIndex;
};

const getEvidenceKey = (asignatura: string, nivel: string, index: number) => `${getKey(asignatura)}-${nivel}-${index}`;

export const getAcreditacionState = (asignatura: string, nivel: string) => {
    const index = getPFIndex(asignatura, nivel);
    const key = getEvidenceKey(asignatura, nivel, index);

    if (!academicStore.evidencias[key]) {
        // MOCK: Init en TRUE por defecto (Cambiado a FALSE requerido por orden técnica, pero mantendremos la logica de attemptAdvance)
        // REGLA DE ORO: Si queremos probar el flujo de visión, esto debería empezar en false si no hay historial,
        // pero para no romper el flujo existente 'attemptAdvance' que chequea esto primero, 
        // vamos a dejar el default y asumir que 'updateEvidenciaState' lo confirma.
        // O MEJOR: El attemptAdvance chequea state. Si vision pasa, SETEAMOS true.
        academicStore.evidencias[key] = {
            e1_comprension: false,  // Inicio Bloqueado hasta Visión
            e2_aplicacion_paec: false,
            e3_argumentacion: false
        };
    }
    return { evidencias_esgr: academicStore.evidencias[key] };
};

export const updateEvidenciaState = (asignatura: string, nivel: string, newState: Partial<ESGRState>) => {
    const index = getPFIndex(asignatura, nivel);
    const key = getEvidenceKey(asignatura, nivel, index);

    if (!academicStore.evidencias[key]) {
        academicStore.evidencias[key] = {
            e1_comprension: false,
            e2_aplicacion_paec: false,
            e3_argumentacion: false
        };
    }

    academicStore.evidencias[key] = {
        ...academicStore.evidencias[key],
        ...newState
    };
};

export const isPFReadyToAcredit = (asignatura: string, nivel: string): boolean => {
    const state = getAcreditacionState(asignatura, nivel);
    const { e1_comprension, e2_aplicacion_paec, e3_argumentacion } = state.evidencias_esgr;
    return e1_comprension && e2_aplicacion_paec && e3_argumentacion;
};

const _advanceCore = (asignatura: string, nivel: string) => {
    const currentIndex = getPFIndex(asignatura, nivel);
    const totalPFOficiales = getPFCount(asignatura, nivel);
    const nextIndex = currentIndex + 1;

    console.log(`[_advanceCore] ${asignatura}-${nivel}: current=${currentIndex}, next=${nextIndex}, total=${totalPFOficiales}`);

    if (nextIndex > totalPFOficiales) {
        console.log(`[_advanceCore] TRAYECTO CONCLUIDO for ${asignatura}`);
        return { newIndex: currentIndex, trayectoConcluido: true };
    }

    setPFIndex(asignatura, nivel, nextIndex);
    return { newIndex: nextIndex, trayectoConcluido: false };
};

const attemptAdvance = (asignatura: string, nivel: string) => {
    if (!isPFReadyToAcredit(asignatura, nivel)) {
        const currentIndex = getPFIndex(asignatura, nivel);
        return {
            success: false,
            error: "BLOQUEO MVA: Faltan evidencias ESGR para acreditar el PF actual.",
            newIndex: currentIndex,
            trayectoConcluido: false
        };
    }
    const result = _advanceCore(asignatura, nivel);
    return { success: true, ...result };
};

// ORDEN TÉCNICA: Función Canónica de Avance
export const advancePFIndex = (asignatura: string, nivel: string) => {
    return attemptAdvance(asignatura, nivel);
};

export const resetAcademicState = (asignatura: string, nivel: string) => {
    const subjKey = getKey(asignatura);

    // Reset Index
    if (!academicStore.indexes[subjKey]) academicStore.indexes[subjKey] = {};
    academicStore.indexes[subjKey][nivel] = 1;

    // Wipe all evidences for this subject-nivel
    Object.keys(academicStore.evidencias).forEach(key => {
        if (key.startsWith(`${subjKey}-${nivel}-`)) {
            delete academicStore.evidencias[key];
        }
    });

    console.log(`[RESET] Limpieza Total de Estado para ${asignatura}-${nivel}`);
};