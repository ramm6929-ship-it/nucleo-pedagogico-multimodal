"use client";

import { useState } from "react";
import { CheckCircle, XCircle, FileText, Image as ImageIcon, Loader2, Download } from "lucide-react";
import type { EvaluacionEvidencia } from "@/app/lib/types";

/**
 * EvidenciaReviewer - Revisor de evidencias para docente
 * 
 * REGLA: Botones Validar / Rechazar.
 * Envía flags al backend.
 * NO decide acreditación.
 */

interface EvidenciaInfo {
    id: string;
    estudianteNombre: string;
    estudiante_id: string;
    tipo: "digital" | "captura_optica";
    contenido: string; // texto o URL de imagen
    fecha: string;
    comentario_portafolio: string;
    validada: boolean | null; // null = pendiente
}

interface EvidenciaReviewerProps {
    evidencia: EvidenciaInfo;
    onValidar: (id: string, aprobada: boolean) => Promise<void>;
    onExportFEA: () => Promise<void>;
    isSubmitting: boolean;
}

export function EvidenciaReviewer({ evidencia, onValidar, onExportFEA, isSubmitting }: EvidenciaReviewerProps) {
    const [comentarioDocente, setComentarioDocente] = useState("");

    const handleValidar = async (aprobada: boolean) => {
        await onValidar(evidencia.id, aprobada);
    };

    return (
        <div className="bg-slate-800/40 rounded-3xl border border-slate-700/50 shadow-2xl backdrop-blur-xl overflow-hidden transition-all duration-500 flex flex-col h-full">
            {/* Header Profesional */}
            <div className="bg-slate-900/60 px-6 sm:px-10 py-6 sm:py-8 border-b border-slate-700/30 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                <div className="space-y-1">
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tighter uppercase italic">{evidencia.estudianteNombre}</h3>
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="text-[10px] text-slate-600 uppercase font-black bg-slate-800 px-2 py-0.5 rounded tracking-tighter border border-slate-700/50">ID: {evidencia.estudiante_id}</span>
                        <span className="text-[10px] text-slate-600 uppercase font-black tracking-widest">• {evidencia.fecha}</span>
                    </div>
                </div>
                <div className="flex items-center space-x-3 bg-slate-800/80 px-4 py-2.5 rounded-2xl border border-slate-700/50 shadow-inner w-fit">
                    {evidencia.tipo === "digital" ? (
                        <FileText className="h-5 w-5 text-blue-400" />
                    ) : (
                        <ImageIcon className="h-5 w-5 text-purple-400" />
                    )}
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        {evidencia.tipo === "digital" ? "Digital" : "Captura"}
                    </span>
                </div>
            </div>

            {/* Contenido en Scroll Area */}
            <div className="flex-1 p-6 sm:p-10 space-y-10 overflow-y-auto min-h-0">
                {/* Rúbrica Normativa (Visualización) */}
                <div className="bg-slate-900/40 rounded-3xl border border-slate-700/50 p-6 sm:p-8 group hover:border-blue-500/30 transition-all shadow-xl shadow-black/20">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
                            <CheckCircle className="h-5 w-5 text-blue-500" />
                        </div>
                        <h4 className="text-[10px] text-slate-400 uppercase font-black tracking-widest">
                            Criterios de Evaluación
                        </h4>
                    </div>
                    <ul className="grid grid-cols-1 gap-4">
                        <li className="text-sm text-slate-400 flex items-start p-4 bg-slate-950/30 rounded-2xl border border-slate-800/50 font-medium">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0 mr-4" />
                            <span>Claridad en la exposición de conceptos base conforme a MCCEMS.</span>
                        </li>
                        <li className="text-sm text-slate-400 flex items-start p-4 bg-slate-950/30 rounded-2xl border border-slate-800/50 font-medium">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0 mr-4" />
                            <span>Relación directa y coherente con el Propósito Formativo.</span>
                        </li>
                    </ul>
                </div>

                {/* Evidencia */}
                <div className="space-y-4">
                    <p className="text-[10px] text-slate-600 uppercase font-black tracking-widest px-1">Documento de Evidencia</p>
                    {evidencia.tipo === "digital" ? (
                        <div className="bg-slate-900/90 border border-slate-700/50 rounded-3xl p-8 text-slate-200 text-sm sm:text-base leading-relaxed shadow-inner font-serif italic border-l-4 border-l-blue-600/50 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-900 via-slate-900 to-slate-950">
                            {evidencia.contenido}
                        </div>
                    ) : (
                        <div className="flex justify-center bg-slate-950 border border-slate-700/80 rounded-3xl p-3 overflow-hidden shadow-2xl group relative">
                            <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <img
                                src={evidencia.contenido}
                                alt="Evidencia"
                                className="max-w-full max-h-[500px] rounded-2xl group-hover:scale-[1.01] transition-transform duration-1000 origin-center"
                            />
                        </div>
                    )}
                </div>

                {/* Comentario del portafolio (del sistema) */}
                {evidencia.comentario_portafolio && (
                    <div className="p-6 sm:p-8 bg-indigo-600/5 border border-indigo-500/20 rounded-3xl shadow-xl backdrop-blur-sm relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-600/40" />
                        <p className="text-[10px] text-indigo-400 font-black uppercase tracking-widest mb-4">Dictamen de Inteligencia</p>
                        <p className="text-sm sm:text-base text-slate-300 italic leading-relaxed font-black tracking-tight">"{evidencia.comentario_portafolio}"</p>
                    </div>
                )}
            </div>

            {/* Acciones - Footer Fijo - Mobile Optimized */}
            <div className="bg-slate-950/90 p-6 sm:p-10 border-t border-slate-700/30 space-y-6 backdrop-blur-xl">
                {/* Decisiones Normativas */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={() => handleValidar(true)}
                        disabled={isSubmitting}
                        className="flex-1 flex items-center justify-center gap-4 h-16 sm:h-20 bg-gradient-to-r from-teal-600 via-teal-700 to-teal-800 text-white rounded-2xl font-black uppercase text-xs sm:text-sm tracking-widest hover:from-teal-500 hover:to-teal-600 transition-all shadow-2xl shadow-teal-900/30 active:scale-95 disabled:grayscale"
                    >
                        {isSubmitting ? (
                            <Loader2 className="h-6 w-6 animate-spin" />
                        ) : (
                            <CheckCircle className="h-6 w-6" />
                        )}
                        <span>Acreditar nivel</span>
                    </button>
                    <button
                        onClick={() => handleValidar(false)}
                        disabled={isSubmitting}
                        className="flex-1 flex items-center justify-center gap-4 h-16 sm:h-20 bg-slate-900 text-slate-300 border border-slate-700/80 rounded-2xl font-black uppercase text-xs sm:text-sm tracking-widest hover:bg-slate-800 hover:text-white transition-all active:scale-95 disabled:grayscale shadow-xl"
                    >
                        {isSubmitting ? (
                            <Loader2 className="h-6 w-6 animate-spin" />
                        ) : (
                            <XCircle className="h-6 w-6" />
                        )}
                        <span>Rechazar</span>
                    </button>
                </div>

                {/* Administrativa */}
                <button
                    onClick={onExportFEA}
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-3 h-14 sm:h-16 text-slate-500 hover:text-slate-300 transition-all text-[10px] font-black uppercase tracking-widest border border-dashed border-slate-800 rounded-2xl hover:border-slate-600 hover:bg-slate-900/50"
                >
                    <Download className="h-4 w-4" />
                    <span>Informe FEA (Administrativo)</span>
                </button>
            </div>
        </div>
    );
}
