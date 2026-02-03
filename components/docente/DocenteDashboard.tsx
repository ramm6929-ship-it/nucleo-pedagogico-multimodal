"use client";

import type { EstudianteResumen, EstadoProposito } from "@/app/lib/types";
import { EstadoPropositoBadge } from "@/components/estudiante/EstadoPropositoBadge";
import { Users, Search } from "lucide-react";
import { useState } from "react";

/**
 * DocenteDashboard - Panel de docente
 * 
 * REGLA: Vista de lectura.
 * Lista de estudiantes y estado de PF.
 * NO modifica, NO decide acreditación.
 */

interface DocenteDashboardProps {
    estudiantes: EstudianteResumen[];
    onSelectEstudiante: (id: string) => void;
}

export function DocenteDashboard({ estudiantes, onSelectEstudiante }: DocenteDashboardProps) {
    const [filtro, setFiltro] = useState("");

    const estudiantesFiltrados = estudiantes.filter(
        (e) => e.nombre.toLowerCase().includes(filtro.toLowerCase())
    );

    // Contar por estado (solo para visualización, sin lógica de negocio)
    const contadores: Record<EstadoProposito, number> = {
        LOGRADO: estudiantes.filter((e) => e.estado_pf === "LOGRADO").length,
        EN_PROCESO: estudiantes.filter((e) => e.estado_pf === "EN_PROCESO").length,
        NO_INICIADO: estudiantes.filter((e) => e.estado_pf === "NO_INICIADO").length,
    };

    return (
        <div className="space-y-6 sm:space-y-10 animate-in fade-in duration-700">
            {/* Header y Búsqueda Optimized */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center shadow-lg shadow-teal-900/10 transition-transform active:scale-95">
                        <Users className="h-7 w-7 text-teal-400" />
                    </div>
                    <div>
                        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tighter uppercase italic">Panel de Docencia</h2>
                        <p className="text-[10px] sm:text-xs text-slate-500 font-black uppercase tracking-widest mt-0.5">Normativa MCCEMS 2025</p>
                    </div>
                </div>

                {/* Buscador Full-Width en Móbil */}
                <div className="relative w-full sm:w-80 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-600 group-focus-within:text-teal-400 transition-colors" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre..."
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                        className="w-full h-14 pl-12 pr-6 rounded-2xl bg-slate-900/80 border border-slate-700/50 text-white placeholder-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30 transition-all shadow-inner"
                    />
                </div>
            </div>

            {/* Listado de Estudiantes: Cards en móvil (≤768px), Tabla en Desktop (≥769px) */}
            <div className="bg-slate-800/20 rounded-3xl border border-slate-700/50 shadow-2xl backdrop-blur-md overflow-hidden transition-all">

                {/* VISTA MOBILE - CARDS */}
                <div className="block sm:hidden grid grid-cols-1 divide-y divide-slate-800/50">
                    {estudiantesFiltrados.map((estudiante) => (
                        <div key={estudiante.id} className="p-6 space-y-5 flex flex-col">
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <p className="text-base font-black text-white tracking-tight">{estudiante.nombre}</p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] text-slate-600 uppercase font-black tracking-tighter bg-slate-900 px-2 py-0.5 rounded">ID: {estudiante.id}</span>
                                        <span className="text-[10px] text-slate-600 uppercase font-black tracking-tighter">• {estudiante.pf_activo}</span>
                                    </div>
                                </div>
                                <div className="shrink-0">
                                    <EstadoPropositoBadge estado={estudiante.estado_pf} showLabel={false} />
                                </div>
                            </div>

                            <button
                                onClick={() => onSelectEstudiante(estudiante.id)}
                                className="w-full h-14 bg-slate-900 border border-slate-700/50 rounded-2xl flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest text-teal-400 active:bg-slate-800 transition-all shadow-inner"
                            >
                                <span>Revisar Progreso</span>
                                <div className="w-2 h-2 rounded-full bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]" />
                            </button>
                        </div>
                    ))}
                    {estudiantesFiltrados.length === 0 && (
                        <div className="p-12 text-center text-[10px] font-black text-slate-600 uppercase tracking-widest italic">
                            No se encontraron registros
                        </div>
                    )}
                </div>

                {/* VISTA DESKTOP - TABLA */}
                <div className="hidden sm:block overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead className="bg-slate-900/40">
                            <tr>
                                <th className="text-left px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-700/30">Estudiante</th>
                                <th className="text-left px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-700/30">Propósito Activo</th>
                                <th className="text-center px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-700/30">Estado</th>
                                <th className="text-right px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-700/30">Acción</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                            {estudiantesFiltrados.map((estudiante) => (
                                <tr key={estudiante.id} className="group hover:bg-white/[0.02] transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="font-bold text-white group-hover:text-teal-400 transition-colors">{estudiante.nombre}</div>
                                        <div className="text-[10px] text-slate-600 uppercase tracking-tighter mt-1 font-black">ID: {estudiante.id}</div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="px-3 py-1.5 rounded-lg bg-slate-900/50 border border-slate-700/30 text-slate-500 font-mono text-[11px] font-black">
                                            {estudiante.pf_activo}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <EstadoPropositoBadge estado={estudiante.estado_pf} showLabel={false} />
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button
                                            onClick={() => onSelectEstudiante(estudiante.id)}
                                            className="inline-flex items-center space-x-3 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest text-teal-400 hover:bg-teal-500/10 transition-all active:scale-95 border border-transparent hover:border-teal-500/20 shadow-sm"
                                        >
                                            <span>Revisar</span>
                                            <div className="w-2 h-2 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.6)]" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
