"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Lock, Loader2, ArrowLeft, UserPlus, LogIn } from "lucide-react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

/**
 * Pantalla 2 — Login / Registro al Sistema
 * 
 * Propósito: Autenticación y registro de usuarios con Supabase Auth.
 * REGLA 1: No setea roles (eso es Pantalla 3).
 * REGLA 2: No redirige a asignaturas.
 * REGLA 3: Redirige EXCLUSIVAMENTE a /seleccion-rol.
 */

// Cliente Supabase para autenticación
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isRegisterMode, setIsRegisterMode] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        setSuccess("");

        try {
            if (isRegisterMode) {
                // REGISTRO con Supabase Auth
                const { data, error: signUpError } = await supabase.auth.signUp({
                    email: email.trim(),
                    password: password,
                });

                if (signUpError) {
                    setError(signUpError.message);
                    setIsLoading(false);
                    return;
                }

                if (data.user) {
                    console.log("✅ Usuario registrado:", data.user.id);
                    setSuccess("¡Registro exitoso! Ya puedes iniciar sesión.");
                    setIsRegisterMode(false);
                    setPassword("");
                }
            } else {
                // LOGIN con Supabase Auth
                const { data, error: authError } = await supabase.auth.signInWithPassword({
                    email: email.trim(),
                    password: password,
                });

                if (authError) {
                    setError(authError.message);
                    setIsLoading(false);
                    return;
                }

                if (data.user) {
                    console.log("✅ Usuario autenticado:", data.user.id);
                    router.push("/seleccion-rol");
                }
            }
        } catch (err: any) {
            console.error("Error:", err);
            setError("Error de conexión. Intenta de nuevo.");
        } finally {
            setIsLoading(false);
        }
    };

    const toggleMode = () => {
        setIsRegisterMode(!isRegisterMode);
        setError("");
        setSuccess("");
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
                    {isRegisterMode ? "Registro de Estudiante" : "Acceso al Sistema"}
                </h1>

                {/* Toggle Login/Registro */}
                <div className="flex justify-center gap-2">
                    <button
                        type="button"
                        onClick={() => setIsRegisterMode(false)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${!isRegisterMode
                            ? "bg-white text-black"
                            : "bg-white/5 text-slate-500 hover:bg-white/10"
                            }`}
                    >
                        <LogIn className="h-4 w-4" />
                        Iniciar Sesión
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsRegisterMode(true)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${isRegisterMode
                            ? "bg-teal-500 text-white"
                            : "bg-white/5 text-slate-500 hover:bg-white/10"
                            }`}
                    >
                        <UserPlus className="h-4 w-4" />
                        Registrarse
                    </button>
                </div>

                {/* Formulario */}
                <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Campo: Email */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                                Correo Electrónico
                            </label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-600 group-focus-within:text-blue-400 transition-colors" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="correo@ejemplo.com"
                                    className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-base"
                                    required
                                />
                            </div>
                        </div>

                        {/* Campo: Contraseña */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                                Contraseña {isRegisterMode && "(mín. 6 caracteres)"}
                            </label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-600 group-focus-within:text-blue-400 transition-colors" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    minLength={6}
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
                            {success && (
                                <p className="text-teal-400 text-[10px] font-bold text-center uppercase tracking-wider bg-teal-500/10 py-2 rounded-lg border border-teal-500/20">
                                    {success}
                                </p>
                            )}
                        </div>

                        {/* Botón principal */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full font-bold py-4 rounded-2xl transition-all flex items-center justify-center disabled:opacity-50 text-sm active:scale-95 ${isRegisterMode
                                ? "bg-teal-500 text-white hover:bg-teal-400"
                                : "bg-white text-black hover:bg-blue-400"
                                }`}
                        >
                            {isLoading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : isRegisterMode ? (
                                "Crear Cuenta"
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
