"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Calculator, FlaskConical, BookOpen, ArrowRight, Loader2, ShieldAlert } from "lucide-react";
import { AppShell } from "@/components/infrastructure/AppShell";
import type { AsignaturaInfo, Asignatura } from "@/app/lib/types";

/**
 * Pantalla 3E - Selección de Asignatura (Flujo Estudiante)
 * 
 * Propósito: Permitir al estudiante elegir la asignatura activa.
 * REGLA: Sin contenidos pedagógicos (PFs, Contenidos).
 * REGLA: Rol Estudiante debe estar activo en sesión.
 */

const ASIGNATURA_CONFIG: Record<Asignatura, { nombre: string; icon: typeof Calculator; gradient: string }> = {
    PM: {
        nombre: "Pensamiento Matemático",
        icon: Calculator,
        gradient: "from-blue-600 to-blue-400",
    },
    PMI: {
        nombre: "Pensamiento Matemático I",
        icon: Calculator,
        gradient: "from-blue-500 to-indigo-500",
    },
    CNEYT: {
        nombre: "Ciencias Naturales, Experimentales y Tecnología",
        icon: FlaskConical,
        gradient: "from-teal-600 to-teal-400",
    },
    FISICA: {
        nombre: "Física",
        icon: BookOpen,
        gradient: "from-purple-600 to-purple-400",
    },
};

export default function AsignaturaPage() {
    const router = useRouter();
    const [asignaturas, setAsignaturas] = useState<AsignaturaInfo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        // Guard de Rol: Solo Estudiante
        const role = localStorage.getItem("nai_session_role");
        if (role !== "estudiante") {
            router.replace("/");
            return;
        }
        setIsAuthorized(true);

        const fetchAsignaturas = async () => {
            await new Promise((r) => setTimeout(r, 600));
            // Mock de asignaturas según requerimiento (PM, CNEYT, FISICA bloqueada)
            const data: AsignaturaInfo[] = [
                { id: "PM", nombre: "Pensamiento Matemático", habilitada: true },
                { id: "CNEYT", nombre: "CNEYT", habilitada: true },
                { id: "FISICA", nombre: "Física", habilitada: false },
            ];
            setAsignaturas(data);
            setIsLoading(false);
        };
        fetchAsignaturas();
    }, [router]);
    const handleSelectAsignatura = (id: Asignatura) => {
        // Fijación de asignatura en sesión (REGLA 8)
        localStorage.setItem("nai_active_subject", id);
        router.push(`/estudiante/dashboard?asignatura=${id}&nivel=I`);
    };

    if (!isAuthorized) return null;

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#050510] flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
        );
    }

    return (
        <AppShell statusUpdate={null} userRole="estudiante">
            <div className="max-w-3xl mx-auto py-12 px-4 space-y-12">
                {/* Identidad de Sesión y Título */}
                <div className="text-center space-y-3">
                    <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                        Núcleo Pedagógico Multimodal – NAI / MAT-IA
                    </h1>
                    <div className="flex items-center justify-center gap-2">
                        <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                            Rol: Estudiante
                        </span>
                    </div>
                </div>

                <div className="space-y-6">
                    <h2 className="text-lg font-bold text-slate-300 text-center uppercase tracking-widest">
                        Seleccione Asignatura
                    </h2>

                    <div className="grid gap-4">
                        {asignaturas.map((asignatura) => {
                            const config = ASIGNATURA_CONFIG[asignatura.id];
                            const Icon = config.icon;
                            const isHabilitada = asignatura.habilitada;

                            return (
                                <button
                                    key={asignatura.id}
                                    onClick={() => isHabilitada && handleSelectAsignatura(asignatura.id)}
                                    disabled={!isHabilitada}
                                    className={`group relative flex items-center p-6 rounded-2xl border transition-all ${isHabilitada
                                        ? "bg-white/[0.02] border-white/10 hover:bg-white/[0.05] hover:border-blue-500/50 cursor-pointer shadow-lg"
                                        : "bg-black/40 border-white/5 opacity-40 cursor-not-allowed grayscale"
                                        }`}
                                >
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center mr-4 shadow-inner`}>
                                        <Icon className="h-6 w-6 text-white" />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <h3 className="text-base font-bold text-white">{config.nombre}</h3>
                                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                                            {isHabilitada ? "Disponible" : "Bloqueada"}
                                        </p>
                                    </div>
                                    {isHabilitada && (
                                        <ArrowRight className="h-5 w-5 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                                    )}
                                    {!isHabilitada && (
                                        <ShieldAlert className="h-5 w-5 text-slate-700" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <p className="text-[9px] text-center text-slate-700 uppercase font-black tracking-[0.3em]">
                    NAI | Selección Académica v1.0.0
                </p>
            </div>
        </AppShell>
    );
}
