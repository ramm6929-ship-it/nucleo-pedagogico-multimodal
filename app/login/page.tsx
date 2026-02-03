"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Lock, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

/**
 * Pantalla 2 — Login / Acceso al Sistema
 * 
 * Propósito: Autenticación de usuarios.
 * REGLA 1: No setea roles (eso es Pantalla 3).
 * REGLA 2: No redirige a asignaturas.
 * REGLA 3: Redirige EXCLUSIVAMENTE a /seleccion-rol.
 */

export default function LoginPage() {
    const router = useRouter();
    const [id, setId] = useState("");
    const [credencial, setCredencial] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        // Simulación de sesión técnica (sin roles)
        setTimeout(() => {
            if (id.trim() && credencial.trim()) {
                // REDIRECCIÓN NORMATIVA: A Selección de Rol
                router.push("/seleccion-rol");
            } else {
                setError("Error: Credenciales incompletas.");
                setIsLoading(false);
            }
        }, 600);
    };

    return (
        <div className="min-h-screen bg-[#050510] flex flex-col items-center justify-center p-4">
            {/* Atmosphere Glow */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-600/5 blur-[120px] rounded-full" />
            </div>

            <div className="w-full max-w-sm space-y-10 relative z-10">
                <div className="flex items-center justify-between px-2">
                    <Link href="/" className="text-slate-500 hover:text-white transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                        <ArrowLeft className="h-4 w-4" />
                        Volver
                    </Link>
                </div>

                {/* Título del sistema */}
                <h1 className="text-xl md:text-2xl font-bold text-white text-center tracking-tight px-4">
                    Identificación de Usuario
                </h1>

                {/* Acceso Técnico */}
                <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl">
                    <form onSubmit={handleLogin} className="space-y-5">

                        {/* Campo: Identificador de usuario */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                                Identificador
                            </label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-600 group-focus-within:text-blue-400 transition-colors" />
                                <input
                                    type="text"
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
                                    placeholder="ID ENTIDAD"
                                    className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-mono text-base"
                                    required
                                />
                            </div>
                        </div>

                        {/* Campo: Credencial */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                                Credencial
                            </label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-600 group-focus-within:text-blue-400 transition-colors" />
                                <input
                                    type="password"
                                    value={credencial}
                                    onChange={(e) => setCredencial(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-base"
                                    required
                                />
                            </div>
                        </div>

                        {/* Mensaje de estado */}
                        <div className="min-h-[1.25rem]">
                            {error && (
                                <p className="text-red-400 text-[10px] font-bold text-center uppercase tracking-wider bg-red-500/10 py-2 rounded-lg border border-red-500/20">
                                    {error}
                                </p>
                            )}
                        </div>

                        {/* Botón único: Ingresar */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-white text-black font-bold py-4 rounded-2xl hover:bg-blue-400 transition-all flex items-center justify-center disabled:opacity-50 text-sm active:scale-95"
                        >
                            {isLoading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                "Acceder al Sistema"
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer Técnico */}
                <p className="text-[9px] text-center text-slate-700 uppercase font-medium tracking-[0.3em]">
                    NAI | Módulo de Autenticación
                </p>
            </div>
        </div>
    );
}
