"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AppShell } from "@/components/infrastructure/AppShell";
import { EvidenciaUploader } from "@/components/estudiante/EvidenciaUploader";
import type { StatusUpdate } from "@/app/lib/types";
import { CheckCircle, Loader2, ClipboardCheck, Info } from "lucide-react";

/**
 * Pantalla 6E - Entrega de Evidencia (Flujo Estudiante)
 * 
 * Propósito: Registrar evidencia sin juicio académico ni rúbricas visibles.
 * REGLA: El frontend no decide la ruta de salida (depende del statusUpdate).
 * Bloques A, B, C, D implementados.
 */

function EvidenciaContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const asignaturaParam = searchParams.get("asignatura");

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [statusUpdate, setStatusUpdate] = useState<StatusUpdate | null>(null);

    useEffect(() => {
        // 1. Guard de Rol: Solo Estudiante
        const role = localStorage.getItem("nai_session_role");
        if (role !== "estudiante") {
            router.replace("/");
            return;
        }

        // 2. Resolver Asignatura y PF Inmutable de la sesión
        const activeSubject = asignaturaParam || localStorage.getItem("nai_active_subject");
        if (!activeSubject) {
            router.replace("/estudiante");
            return;
        }

        setIsAuthorized(true);

        // 3. Cargar estado (Simulado, en producción vendría del backend)
        const fetchStatus = async () => {
            try {
                const res = await fetch(`/api/status_update?asignatura=${activeSubject}&nivel=I`);
                const data: StatusUpdate = await res.json();

                // 🛡️ GUARDA DE COHERENCIA NORMATIVA DUAL (Executive Order 04)
                const prog = data.asignatura_activa;
                const niv = data.nivel;
                const pf = data.proposito_formativo_id;

                if (pf && prog && niv && !pf.startsWith(`${prog}-${niv}-`)) {
                    console.error(`[NORMATIVA] Discrepancia crítica en Registro: ${prog}-${niv} no coincide con el prefijo de ${pf}`);
                }

                setStatusUpdate(data);
            } catch (e) {
                console.error("Error fetching status", e);
            }
        };
        fetchStatus();

    }, [asignaturaParam, router]);

    const handleSubmitEvidencia = async (evidencia: any) => {
        setIsSubmitting(true);
        try {
            // ORDEN TÉCNICA: Cambio a FormData para enviar imagen real
            const formData = new FormData();
            formData.append("asignatura", statusUpdate?.asignatura_activa || "");
            formData.append("nivel", statusUpdate?.nivel || "");

            if (evidencia?.contenido instanceof File) {
                formData.append("file", evidencia.contenido);
            } else if (evidencia?.contenido) {
                // Si es texto, enviamos un Blob con nombre para el análisis de visión
                const textBlob = new Blob([evidencia.contenido], { type: "text/plain" });
                formData.append("file", textBlob, "evidencia_texto.txt");
            }

            const res = await fetch("/api/registrar_evidencia", {
                method: "POST",
                body: formData // Content-Type es automático con FormData
            });

            const data = await res.json();

            if (!res.ok) {
                // Manejo de Bloqueo MVA
                if (data.bloqueo_mva) {
                    alert(`⛔ BLOQUEO MVA DETECTADO\n\n${data.error}\n\nDiagnóstico Visión: ${data.mensaje_vision}`);
                    console.error("MVA State:", data.evidencias_esgr);
                    return; // No marcamos submitted
                }
                throw new Error(data.error || "Error en registro");
            }

            // Éxito: Mostrar feedback de visión si existe
            if (data.mensaje_vision) {
                console.log("Vision Feedback:", data.mensaje_vision);
            }

            setSubmitted(true);
        } catch (error: any) {
            console.error("Error:", error);
            alert(`Error técnico: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFinalizar = () => {
        if (!statusUpdate) return;

        // ORDEN 4: Sin limpieza local (ya no existe) y SIN parámetros de fase
        // El backend ya tiene el nuevo estado persistido.

        const asignatura = statusUpdate.asignatura_activa || "CNEYT";
        const nivel = statusUpdate.nivel || "I";

        if (statusUpdate.acreditacion?.elegible_recuperacion) {
            router.push(`/estudiante/recuperacion?asignatura=${asignatura}&nivel=${nivel}`);
        } else {
            // Navegación SIMPLE: El dashboard leerá el nuevo estado del backend
            router.push(`/estudiante/dashboard?asignatura=${asignatura}&nivel=${nivel}`);
        }
    };

    if (!isAuthorized || !statusUpdate) return null;

    return (
        <AppShell statusUpdate={statusUpdate} userRole="estudiante">
            <div className="max-w-2xl mx-auto py-8 px-4 space-y-8">
                {/* 🏗️ BLOQUE A — Identificación Normativa */}
                <div className="text-center space-y-3">
                    <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                        Registro de Evidencia Normativa
                    </h1>
                    <div className="flex flex-wrap justify-center gap-2">
                        <span className="text-[10px] font-black bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20 uppercase tracking-widest">
                            {statusUpdate.asignatura_activa} · Nivel {statusUpdate.nivel}
                        </span>
                        <span className="text-[10px] font-black bg-slate-800 text-slate-400 px-3 py-1 rounded-full border border-white/5 uppercase tracking-widest">
                            PF: {statusUpdate.proposito_formativo_id}
                        </span>
                        <span className="text-[10px] font-black bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full border border-indigo-500/20 uppercase tracking-widest">
                            Sesión: Concluida
                        </span>
                    </div>
                </div>

                {submitted ? (
                    /* 🏗️ BLOQUE D — Confirmación (Sin retroalimentación académica) */
                    <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-10 text-center shadow-2xl backdrop-blur-md animate-in fade-in zoom-in duration-500">
                        <div className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-6 shadow-inner">
                            <CheckCircle className="h-10 w-10 text-green-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">Evidencia Registrada</h2>
                        <p className="text-slate-400 mb-8 leading-relaxed text-sm max-w-sm mx-auto">
                            Su evidencia ha sido vinculada al Propósito Formativo correspondiente y está lista para validación administrativa.
                        </p>
                        <button
                            onClick={handleFinalizar}
                            className="w-full py-4 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-400 transition-all shadow-xl active:scale-95"
                        >
                            Regresar a Dashboard
                        </button>
                    </div>
                ) : (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* 🏗️ BLOQUE B — Evidencia Requerida */}
                        <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-2xl p-6 flex items-start space-x-4">
                            <div className="shrink-0 w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                                <ClipboardCheck className="h-5 w-5 text-indigo-400" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-sm font-bold text-white uppercase tracking-tight">Requerimiento de Carga</h3>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    Capture o escriba los resultados del reto cognitivo planteado en la sesión. La evidencia debe ser original y técnica.
                                </p>
                            </div>
                        </div>

                        {/* 🏗️ BLOQUE C — Área de Carga */}
                        <div className="relative">
                            <EvidenciaUploader onSubmit={handleSubmitEvidencia} isSubmitting={isSubmitting} />

                            {/* Estado visible de carga */}
                            <div className="mt-4 flex items-center justify-center space-x-2">
                                <span className={`w-2 h-2 rounded-full ${isSubmitting ? "bg-blue-400 animate-pulse" : "bg-slate-700"}`} />
                                <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
                                    {isSubmitting ? "Enviando Evidencia..." : "Lista para Envío"}
                                </span>
                            </div>
                        </div>

                        {/* Aviso Técnico */}
                        <div className="flex items-center justify-center space-x-2 text-slate-700">
                            <Info className="h-3 w-3" />
                            <p className="text-[9px] uppercase font-bold tracking-widest">
                                El sistema no emite juicios académicos durante el registro.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}

export default function EvidenciaPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#050510] flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
        }>
            <EvidenciaContent />
        </Suspense>
    );
}
