"use client";

import { Suspense, useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AppShell } from "@/components/infrastructure/AppShell";
import { SesionAprendizajePanel } from "@/components/estudiante/SesionAprendizajePanel";
import type { StatusUpdate } from "@/app/lib/types";
import { AlertCircle, Loader2, History, RotateCcw, ShieldCheck, Clock } from "lucide-react";
import { processChat } from "@/app/actions/chat";

/**
 * Pantalla 7E - Recuperación Dirigida (Flujo Estudiante)
 * 
 * Propósito: Activar mecanismo de recuperación pedagógica condicionada.
 * REGLA: No punitivo, trazable, dirigido por el backend.
 */

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
}

function RecuperacionContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const asignaturaParam = searchParams.get("asignatura");

    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [statusUpdate, setStatusUpdate] = useState<StatusUpdate | null>(null);

    useEffect(() => {
        // 1. Guard de Rol: Solo Estudiante
        const role = localStorage.getItem("nai_session_role");
        if (role !== "estudiante") {
            router.replace("/");
            return;
        }

        // 2. Resolver Asignatura y Validar Estatus de Recuperación
        const activeSubject = asignaturaParam || localStorage.getItem("nai_active_subject");
        if (!activeSubject) {
            router.replace("/estudiante");
            return;
        }

        // Simulación de validación de estatus (En producción vendría del fetch de /api/status_update)
        setIsAuthorized(true);

        const initialStatus: StatusUpdate = {
            asignatura_activa: activeSubject as any,
            nivel: "I",
            dia_actual: 15,
            proposito_formativo_id: "PF-CNEYT-I-01",
            proposito_formativo_actual: "CNEYT-I-PF1",
            proposito_formativo_siguiente: "CNEYT-I-PF2",
            evaluacion_evidencia: {
                tipo: "digital",
                rubrica_version: "v1.0",
                comentario_portafolio: "Retroalimentación previa: Se requiere profundizar en la aplicación situada del concepto.",
                validada_por_docente: false,
            },
            acreditacion: {
                estado_proposito: "NO_INICIADO", // O NO_LOGRADO
                elegible_recuperacion: true,
            },
            decision_academica: {
                resultado: "RECUPERACION",
                accion_siguiente: "Completar Ruta de Recuperación Dirigida",
            },
        };

        // 🛡️ GUARDA DE COHERENCIA NORMATIVA DUAL (Executive Order 04)
        const prog = initialStatus.asignatura_activa;
        const niv = initialStatus.nivel;
        const pf = initialStatus.proposito_formativo_id;

        if (pf && prog && niv && !pf.startsWith(`${prog}-${niv}-`)) {
            console.error(`[NORMATIVA] Discrepancia crítica en Recuperación: ${prog}-${niv} no coincide con el prefijo de ${pf}`);
        }

        setStatusUpdate(initialStatus);
    }, [asignaturaParam, router]);

    const handleSendMessage = useCallback(async (messageText: string) => {
        if (!statusUpdate) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: messageText,
        };
        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);

        try {
            const response = await processChat(messageText, messages, statusUpdate.asignatura_activa as any);
            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: response.answer || "Respuesta procesada.",
            };
            setMessages((prev) => [...prev, aiMessage]);
            if (response.status_update) {
                setStatusUpdate(prev => ({
                    ...response.status_update,
                    proposito_formativo_id: prev!.proposito_formativo_id // Blindaje de PF
                }));
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    }, [messages, statusUpdate]);

    if (!isAuthorized || !statusUpdate) return null;

    return (
        <AppShell statusUpdate={statusUpdate} userRole="estudiante">
            <div className="max-w-4xl mx-auto py-6 sm:py-8 px-4 space-y-6 sm:space-y-8">
                {/* 🏗️ BLOQUE 7E-A: Identidad de Recuperación (No Punitiva) */}
                <div className="bg-gradient-to-br from-indigo-900/40 to-blue-900/20 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 backdrop-blur-md shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <RotateCcw className="h-24 w-24" />
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center shrink-0">
                        <History className="h-8 w-8 text-indigo-400" />
                    </div>
                    <div className="flex flex-col text-right">
                        <h2 className="text-lg font-bold text-white">
                            {statusUpdate.asignatura_activa} · Nivel {statusUpdate.nivel}
                        </h2>
                        <span className="text-xs text-orange-400 font-medium">Espacio de Regularización</span>
                    </div>
                    <div className="flex-1 text-center sm:text-left space-y-2 relative">
                        <div className="flex items-center justify-center sm:justify-start gap-2">
                            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">Ruta de Recuperación Dirigida</h2>
                            <span className="text-[10px] bg-indigo-500 text-white px-2 py-0.5 rounded-full font-black uppercase">Activa</span>
                        </div>
                        <p className="text-sm text-slate-300 font-medium leading-relaxed max-w-2xl">
                            Esta sesión es una oportunidad para fortalecer los aprendizajes del propósito <span className="text-indigo-400 font-bold">{statusUpdate.proposito_formativo_id}</span>.
                        </p>
                    </div>
                </div>

                {/* 🏗️ BLOQUE 7E-C: Por qué y Qué se recupera */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-800/40 border border-white/5 p-5 rounded-2xl space-y-3">
                        <div className="flex items-center gap-2 text-blue-400">
                            <AlertCircle className="h-4 w-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Diagnóstico Previo</span>
                        </div>
                        <p className="text-xs text-slate-400 italic">
                            &quot;{statusUpdate.evaluacion_evidencia.comentario_portafolio}&quot;
                        </p>
                    </div>
                    <div className="bg-slate-800/40 border border-white/5 p-5 rounded-2xl space-y-3">
                        <div className="flex items-center gap-2 text-teal-400">
                            <ShieldCheck className="h-4 w-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Actividad Asignada</span>
                        </div>
                        <p className="text-xs text-slate-400">
                            Construcción de evidencia situada: <span className="text-slate-200">Refuerzo del pensamiento algorítmico en contextos comunitarios.</span>
                        </p>
                    </div>
                </div>

                {/* 🏗️ BLOQUE 7E-D: Sesión Trazable */}
                <div className="shadow-2xl shadow-indigo-900/20">
                    <div className="flex items-center justify-between mb-2 px-2">
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Trazabilidad: Intento Único Activo</span>
                        <div className="flex items-center gap-1.5 text-slate-500">
                            <Clock className="h-3 w-3" />
                            <span className="text-[9px] font-black uppercase tracking-widest">Tiempo Acotado: 45m</span>
                        </div>
                    </div>
                    <SesionAprendizajePanel
                        onSendMessage={handleSendMessage}
                        messages={messages}
                        isLoading={isLoading}
                        statusUpdate={statusUpdate}
                    />
                </div>

                {/* Footer Normativo */}
                <p className="text-center text-[9px] text-slate-600 font-bold uppercase tracking-[0.3em] py-4 border-t border-white/5">
                    Evidencia de Recuperación Dirigida – NAI Normativo v1.0
                </p>
            </div>
        </AppShell>
    );
}

export default function RecuperacionPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#050510] flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
        }>
            <RecuperacionContent />
        </Suspense>
    );
}
