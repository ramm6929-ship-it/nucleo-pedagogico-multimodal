"use client";

import { List } from "lucide-react";

/**
 * ContenidosFormativosList - Lista de Contenidos Formativos
 * 
 * REGLA: Lista simple de contenidos_formativos[].
 * PROHIBIDO: Jerarquías inventadas, agrupaciones, ordenamientos.
 */

interface ContenidosFormativosListProps {
    contenidos: string[];
}

export function ContenidosFormativosList({ contenidos }: ContenidosFormativosListProps) {
    // Si no hay contenidos, no renderizar nada
    if (!contenidos || contenidos.length === 0) {
        return null;
    }

    return (
        <div className="bg-slate-800/40 rounded-3xl border border-slate-700/50 p-6 sm:p-8 shadow-xl backdrop-blur-sm">
            <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-teal-600/20 border border-teal-500/20 flex items-center justify-center">
                    <List className="h-5 w-5 text-teal-400" />
                </div>
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Contenidos Formativos
                </h3>
            </div>
            <ul className="grid grid-cols-1 gap-4">
                {contenidos.map((contenido, index) => (
                    <li
                        key={index}
                        className="flex items-start p-4 bg-slate-900/30 rounded-2xl border border-slate-700/30 transition-all hover:bg-slate-900/50"
                    >
                        <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-teal-600/10 border border-teal-500/20 flex items-center justify-center text-[10px] font-black text-teal-500 mr-3">
                            {index + 1}
                        </span>
                        <span className="text-sm text-slate-300 leading-relaxed font-medium">{contenido}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
