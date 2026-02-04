// app/lib/canonical-pf-data.ts

export const PF_SEQUENCE: Record<string, Record<string, string[]>> = {
    PMI: {
        I: ["PMI-I-PF1", "PMI-I-PF2", "PMI-I-PF3", "PMI-I-PF4", "PMI-I-PF5", "PMI-I-PF6", "PMI-I-PF7"],
        II: ["PMI-II-PF1", "PMI-II-PF2", "PMI-II-PF3", "PMI-II-PF4", "PMI-II-PF5"],
        III: ["PMI-III-PF1", "PMI-III-PF2", "PMI-III-PF3", "PMI-III-PF4", "PMI-III-PF5", "PMI-III-PF6"],
        IV: ["PMI-IV-PF1", "PMI-IV-PF2", "PMI-IV-PF3", "PMI-IV-PF4", "PMI-IV-PF5", "PMI-IV-PF6", "PMI-IV-PF7"],
        V: ["PMI-V-PF1", "PMI-V-PF2", "PMI-V-PF3", "PMI-V-PF4", "PMI-V-PF5", "PMI-V-PF6", "PMI-V-PF7", "PMI-V-PF8"],
        VI: ["PMI-VI-PF1", "PMI-VI-PF2", "PMI-VI-PF3", "PMI-VI-PF4", "PMI-VI-PF5", "PMI-VI-PF6", "PMI-VI-PF7", "PMI-VI-PF8"]
    },
    CNEYT: {
        I: ["CNEYT-I-PF1", "CNEYT-I-PF2", "CNEYT-I-PF3"],
        II: ["CNEYT-II-PF1", "CNEYT-II-PF2", "CNEYT-II-PF3", "CNEYT-II-PF4"]
    }
};

export const getCanonicalPF = (asignatura: string, nivel: string, index: number): string | null => {
    const subj = asignatura === "PM" ? "PMI" : asignatura;
    const sequence = PF_SEQUENCE[subj]?.[nivel];
    if (!sequence) {
        console.warn(`[DEBUG CANONICAL] No sequence for ${subj}-${nivel}`);
        return null;
    }
    const val = sequence[index - 1] || null;
    console.log(`[DEBUG CANONICAL] Subj: ${subj}, Nivel: ${nivel}, Index: ${index}, Value: ${val}`);
    return val;
};

export const getPFCount = (asignatura: string, nivel: string): number => {
    const subj = asignatura === "PM" ? "PMI" : asignatura;
    const sequence = PF_SEQUENCE[subj]?.[nivel];
    const count = sequence ? sequence.length : 0;
    console.log(`[DEBUG PF_COUNT] Subj: ${subj}, Nivel: ${nivel}, Count: ${count}`);
    return count;
};
