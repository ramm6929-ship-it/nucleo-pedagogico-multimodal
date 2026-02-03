"use client";

import { ShieldAlert } from "lucide-react";
import { AppShell } from "@/components/infrastructure/AppShell";

/**
 * Pantalla 8E - Bloqueo Académico
 * Pantalla terminal sin navegación.
 */
export default function BloqueoPage() {
    return (
        <AppShell statusUpdate={null} userRole="estudiante">
            <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 sm:p-8 text-center animate-in zoom-in-95 duration-700">
                <div className="w-24 h-24 rounded-3xl bg-red-600/10 border border-red-500/20 flex items-center justify-center mb-8 shadow-2xl shadow-red-900/20">
                    <ShieldAlert className="h-12 w-12 text-red-500" />
                </div>

                <h1 className="text-2xl sm:text-4xl font-black text-white mb-6 tracking-tighter uppercase italic">
                    Progresión Bloqueada
                </h1>

                <div className="w-full max-w-md bg-slate-900/80 border border-slate-700/50 rounded-3xl p-8 sm:p-10 backdrop-blur-md shadow-2xl">
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8 font-medium">
                        De acuerdo con la normativa MCCEMS vigente, tu progreso académico ha sido suspendido temporalmente.
                    </p>
                    <div className="w-full h-px bg-slate-800 mb-8" />
                    <p className="text-[10px] sm:text-xs text-slate-500 uppercase font-black tracking-widest leading-loose">
                        Contacta a tu docente para revisar los criterios de acreditación pendientes.
                    </p>
                </div>

                {/* SIN BOTONES CONFORME A REQUERIMIENTO UX */}
            </div>
        </AppShell>
    );
}
