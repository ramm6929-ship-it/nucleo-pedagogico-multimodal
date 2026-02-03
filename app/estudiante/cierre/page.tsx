"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AppShell } from "@/components/infrastructure/AppShell";
import type { StatusUpdate } from "@/app/lib/types";
import { Loader2, ShieldCheck, ClipboardList, ArrowRight, Award } from "lucide-react";

/**
 * Pantalla 8E — Cierre Normativo de Ciclo de Aprendizaje (Flujo Estudiante)
 * 
 * Propósito: Comunicación pasiva del estado normativo del PF.
 * REGLA 1: Dumb Frontend. Solo refleja StatusUpdate.
 * REGLA 2: Lenguaje No Punitivo.
 * REGLA 3: Bloques A, B, C, D obligatorios.
 */

function CierreContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const asignaturaParam = searchParams.get("asignatura");

    const [isAuthorized, setIsAuthorized] = useState(false);
    const [statusUpdate, setStatusUpdate] = useState<StatusUpdate | null>(null);

    useEffect(() => {
        // 1. Guard de Rol: Solo Estudiante
        const role = localStorage.getItem("nai_session_role");
        if (role !== "estudiante") {
            router.replace("/");
            return;
        }

        // 2. Resolver Asignatura y PF de la sesión
        const activeSubject = asignaturaParam || localStorage.getItem("nai_active_subject");
        if (!activeSubject) {
            router.replace("/estudiante");
            return;
        }

        setIsAuthorized(true);

        // 3. Simulación de StatusUpdate Final (En producción vendría del fetch/backend)
        const finalStatus: StatusUpdate = {
            asignatura_activa: activeSubject as any,
            nivel: "I",
            dia_actual: 15,
            proposito_formativo_id: "PF-CNEYT-I-01",
            proposito_formativo_actual: "CNEYT-I-PF1",
            proposito_formativo_siguiente: "CNEYT-I-PF2",
            evaluacion_evidencia: {
                tipo: "digital",
                rubrica_version: "v1.0",
                comentario_portafolio: "El propósito formativo ha sido consolidado satisfactoriamente.",
                validada_por_docente: true,
            },
            acreditacion: {
                estado_proposito: "LOGRADO",
                elegible_recuperacion: false,
            },
            decision_academica: {
                resultado: "AVANZA", // O ACREDITADO_PF
                accion_siguiente: "Regresar al Dashboard de Progreso",
            },
        };

        // 🛡️ GUARDA DE COHERENCIA NORMATIVA DUAL (Executive Order 04)
        const prog = finalStatus.asignatura_activa;
        const niv = finalStatus.nivel;
        const pf = finalStatus.proposito_formativo_id;

        if (pf && prog && niv && !pf.startsWith(`${prog}-${niv}-`)) {
            console.error(`[NORMATIVA] Discrepancia crítica en Cierre: ${prog}-${niv} no coincide con el prefijo de ${pf}`);
        }

        setStatusUpdate(finalStatus);
    }, [asignaturaParam, router]);

    const handleAction = () => {
        if (!statusUpdate) return;
        // Salida única controlada por el backend
        router.push(`/estudiante/dashboard?asignatura=${statusUpdate.asignatura_activa}`);
    };

    if (!isAuthorized || !statusUpdate) return null;

    const isAcreditado = statusUpdate.acreditacion.estado_proposito === "LOGRADO";

    return (
        <AppShell statusUpdate={statusUpdate} userRole="estudiante">
            <div className="max-w-2xl mx-auto py-12 px-6">
                <div className="bg-slate-900/60 border border-white/5 rounded-[2.5rem] p-10 shadow-2xl backdrop-blur-3xl space-y-12 relative overflow-hidden">

                    {/* Atmosphere Background */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] -mr-32 -mt-32 rounded-full" />

                    {/* 🏗️ BLOQUE 8E-A — Identidad Normativa */}
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-slate-800 rounded-xl border border-white/5">
                                <ClipboardList className="h-5 w-5 text-slate-400" />
                            </div>
                            <h1 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Cierre Normativo de Ciclo</h1>
                        </div>
                        <div className="flex flex-wrap justify-center gap-2">
                            <span className="text-[10px] font-black bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20 uppercase tracking-widest">
                                {statusUpdate.asignatura_activa}
                            </span>
                            <span className="text-[10px] font-black bg-slate-800 text-slate-300 px-3 py-1 rounded-full border border-white/10 uppercase tracking-widest">
                                {statusUpdate.proposito_formativo_id}
                            </span>
                        </div>
                    </div>

                    {/* 🏗️ BLOQUE 8E-B — Mensaje de Resultado (No Punitivo) */}
                    <div className="flex flex-col items-center text-center space-y-6">
                        <div className={`w-20 h-20 rounded-3xl flex items-center justify-center shadow-inner ${isAcreditado
                            ? "bg-teal-500/10 border border-teal-500/20"
                            : "bg-amber-500/10 border border-amber-500/20"
                            }`}>
                            {isAcreditado
                                ? <Award className="h-10 w-10 text-teal-400" />
                                : <ShieldCheck className="h-10 w-10 text-amber-400" />
                            }
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                                {statusUpdate.asignatura_activa} · Nivel {statusUpdate.nivel}
                            </h2>
                            <p className="text-gray-400 text-sm">Ciclo de Aprendizaje Concluido</p>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                            {statusUpdate.evaluacion_evidencia.comentario_portafolio || "Su actividad ha sido registrada en el portafolio normativo."}
                        </p>
                    </div>
                </div>

                {/* 🏗️ BLOQUE 8E-C — Estado Administrativo */}
                <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-6 flex items-center justify-between">
                    <div className="space-y-0.5">
                        <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Estatus Pedagógico</p>
                        <p className="text-sm font-bold text-white uppercase italic">Sistema NAI / MAT-IA</p>
                    </div>
                    <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${isAcreditado
                        ? "bg-teal-500/10 text-teal-400 border-teal-500/20"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        }`}>
                        {statusUpdate.acreditacion.estado_proposito}
                    </div>
                </div>

                {/* 🏗️ BLOQUE 8E-D — Acción Única Controlada */}
                <button
                    onClick={handleAction}
                    className="w-full h-16 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-400 transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95 group"
                >
                    {statusUpdate.decision_academica?.accion_siguiente || "Continuar"}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-center text-[9px] text-slate-700 font-bold uppercase tracking-[0.3em]">
                    Documento Electrónico de Cierre · MCCEMS 2025
                </p>
            </div>
        </AppShell>
    );
}

export default function CierrePage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#050510] flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
        }>
            <CierreContent />
        </Suspense>
    );
}
