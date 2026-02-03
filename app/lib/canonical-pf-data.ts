// app/lib/canonical-pf-data.ts

export const PF_SEQUENCE: Record<string, Record<string, string[]>> = {
    PMI: {
        I: ["PMI-I-PF1", "PMI-I-PF2", "PMI-I-PF3", "PMI-I-PF4"],
        II: ["PMI-II-PF1", "PMI-II-PF2", "PMI-II-PF3"],
        III: ["PMI-III-PF1", "PMI-III-PF2", "PMI-III-PF3", "PMI-III-PF4", "PMI-III-PF5"]
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
