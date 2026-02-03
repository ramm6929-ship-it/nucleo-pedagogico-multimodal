"use client";

import type { Asignatura } from "@/app/lib/types";
import { BookOpen, FlaskConical, Calculator, Brain, Cpu } from "lucide-react";

/**
 * HeaderContextual - Encabezado con contexto académico
 * 
 * REGLA: Muestra asignatura_activa y dia_actual.
 * PROHIBIDO: Mostrar calificaciones.
 */

interface HeaderContextualProps {
    asignatura: Asignatura | null;
    diaActual: number | null;
    userRole: "estudiante" | "docente";
}

const ASIGNATURA_CONFIG: Record<Asignatura, { nombre: string; icon: typeof BookOpen; color: string }> = {
    PM: {
        nombre: "Pensamiento Matemático",
        icon: Brain,
        color: "text-blue-400",
    },
    PMI: {
        nombre: "Pensamiento Matemático I",
        icon: Brain,
        color: "text-blue-400",
    },
    CNEYT: {
        nombre: "Cultura Digital",
        icon: Cpu,
        color: "text-purple-400",
    },
    FISICA: {
        nombre: "Física",
        icon: BookOpen,
        color: "text-purple-400",
    },
};

export function HeaderContextual({ asignatura, diaActual, userRole }: HeaderContextualProps) {
    const config = asignatura ? ASIGNATURA_CONFIG[asignatura] : null;
    const Icon = config?.icon ?? BookOpen;

    return (
        <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 h-16 flex items-center">
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo / Título - Compacto en móvil */}
                <div className="flex items-center space-x-2 shrink-0">
                    <span className="text-xl font-black text-white tracking-tighter">NAI</span>
                    <span className="hidden sm:inline text-slate-700">|</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hidden sm:block">{userRole}</span>
                </div>

                {/* Contexto académico - Sensible al ancho de pantalla */}
                {asignatura && config && (
                    <div className="flex items-center space-x-3 sm:space-x-6 min-w-0">
                        <div className="flex items-center space-x-2 min-w-0">
                            <div className={`p-2 rounded-xl bg-slate-800/50 border border-slate-700/50 ${config.color.replace('text-', 'bg-')} bg-opacity-10 shrink-0`}>
                                <Icon className={`h-5 w-5 ${config.color}`} />
                            </div>
                            <span className="text-sm font-bold text-slate-200 truncate max-w-[120px] sm:max-w-none">
                                {config.nombre}
                            </span>
                        </div>

                        {diaActual !== null && (
                            <div className="flex items-center space-x-1.5 shrink-0 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700/50 shadow-inner">
                                <span className="text-[10px] uppercase font-black text-slate-500 tracking-tighter">Día</span>
                                <span className="text-xs font-bold text-blue-400">{diaActual}</span>
                                <span className="text-[10px] text-slate-600">/</span>
                                <span className="text-[10px] text-slate-600">75</span>
                            </div>
                        )}
                    </div>
                )}

                {/* Si no hay asignatura, placeholder discreto */}
                {!asignatura && (
                    <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Contexto Académico</div>
                )}
            </div>
        </header>
    );
}
