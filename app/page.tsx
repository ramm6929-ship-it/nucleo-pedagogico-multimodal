"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

/**
 * Pantalla 1 — Inicio (Landing)
 * 
 * Propósito: Puerta de enlace al sistema.
 * REGLA 1: No Login.
 * REGLA 2: No Rol.
 * REGLA 3: Solo navegación a Login o Registro.
 */

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-[#050510] flex flex-col items-center justify-center p-4 relative overflow-hidden">

            {/* Atmosphere Glow */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] bg-indigo-600/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-[-20%] right-[-20%] w-[50%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-md w-full space-y-12 text-center">

                {/* Identidad del Sistema */}
                <div className="space-y-6">
                    <div className="inline-flex items-center justify-center p-3 bg-white/5 rounded-2xl border border-white/10 mb-4 shadow-2xl">
                        <Sparkles className="h-8 w-8 text-blue-400" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
                        Núcleo Pedagógico Multimodal
                    </h1>
                    <p className="text-slate-400 text-sm md:text-base font-medium tracking-wide">
                        SISTEMA NAI / MAT-IA
                    </p>
                </div>

                {/* Acciones de Entrada */}
                <div className="space-y-4">
                    <Link
                        href="/login"
                        className="group relative w-full flex items-center justify-center py-5 bg-white text-black font-black text-sm uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-50 transition-all shadow-xl active:scale-95"
                    >
                        Iniciar Sesión
                        <ArrowRight className="h-4 w-4 ml-3 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                        href="/registro"
                        className="w-full flex items-center justify-center py-5 bg-transparent border border-white/10 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-white/5 transition-all active:scale-95"
                    >
                        Registrarse
                    </Link>
                </div>

                {/* Footer Normativo */}
                <div className="pt-12">
                    <p className="text-[9px] text-slate-700 uppercase font-black tracking-[0.3em]">
                        MCCEMS 2025 · Versión 1.0.0
                    </p>
                </div>
            </div>
        </div>
    );
}
