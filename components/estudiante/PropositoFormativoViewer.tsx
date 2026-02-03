"use client";

import { Target } from "lucide-react";

/**
 * PropositoFormativoViewer - Visualizador del Propósito Formativo
 * 
 * REGLA: Render literal de proposito_formativo_texto.
 * PROHIBIDO: Resúmenes, interpretaciones, modificaciones.
 */

interface PropositoFormativoViewerProps {
    propositoId: string;
    propositoTexto: string;
    fuenteMccems: string; // Binding explícito
}

export function PropositoFormativoViewer({ propositoId, propositoTexto, fuenteMccems }: PropositoFormativoViewerProps) {
    return (
        <div className="bg-slate-800/40 rounded-3xl border border-slate-700/50 p-6 sm:p-8 shadow-xl backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row items-start gap-5 sm:gap-6">
                <div className="shrink-0">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/20 flex items-center justify-center shadow-inner">
                        <Target className="h-6 w-6 text-blue-400" />
                    </div>
                </div>
                <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-black font-mono text-slate-500 bg-slate-900/50 px-2 py-1 rounded-lg border border-slate-700/50">
                            {propositoId}
                        </span>
                        <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Propósito Formativo</span>
                        <span className="text-[10px] font-black font-mono text-teal-500/80 bg-teal-500/5 px-2 py-1 rounded-lg border border-teal-500/10">
                            Source: {fuenteMccems}
                        </span>
                    </div>
                    <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
                        {propositoTexto}
                    </p>
                </div>
            </div>
        </div>
    );
}
