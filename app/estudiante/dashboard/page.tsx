"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AppShell } from "@/components/infrastructure/AppShell";
import { PropositoFormativoViewer } from "@/components/estudiante/PropositoFormativoViewer";
import { ContenidosFormativosList } from "@/components/estudiante/ContenidosFormativosList";
import { EstadoPropositoBadge } from "@/components/estudiante/EstadoPropositoBadge";
import { RutaRecuperacionPanel } from "@/components/estudiante/RutaRecuperacionPanel";
import type { StatusUpdate } from "@/app/lib/types";
import { getCurriculumData, CurriculumItem } from "@/app/lib/static-curriculum";
import { ArrowRight, Loader2 } from "lucide-react";

/**
 * Pantalla 4E - Dashboard del Estudiante
 * CONECTADA A BACKEND REAL
 */

function DashboardContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const asignatura = searchParams.get("asignatura");

    const [statusUpdate, setStatusUpdate] = useState<StatusUpdate | null>(null);
    const [curriculumInfo, setCurriculumInfo] = useState<CurriculumItem | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                // CONSUMO DE BACKEND REAL con aislamiento de asignatura y nivel (Executive Order 01/02)
                const activeNivel = searchParams.get("nivel") || "I";
                // ORDEN 4: No hay 'phase' en URL. Solo asignatura y nivel.
                const res = await fetch(`/api/status_update?asignatura=${asignatura || "PMI"}&nivel=${activeNivel}`);
                if (!res.ok) {
                    throw new Error("Error al obtener estado académico");
                }
                const data: StatusUpdate = await res.json();

                setStatusUpdate(data);

                // RESOLUCIÓN DE CONTENIDO ESTÁTICO (Dumb Frontend View Logic)
                // Usamos 'proposito_formativo_actual' si existe (Protocolo v2), fallback a legacy
                const activePF = data.proposito_formativo_actual || data.proposito_formativo_id;
                const info = getCurriculumData(activePF);
                setCurriculumInfo(info);

                // 🛡️ GUARDA DE COHERENCIA NORMATIVA DUAL (Executive Order 04)
                const programa = data.asignatura_activa;
                const nivel = data.nivel;
                const pf = activePF;

                if (programa && nivel && pf && !pf.startsWith(`${programa}-${nivel}-`)) {
                    console.error(`[NORMATIVA] Falla de Coherencia Crítica: Programa/Nivel (${programa}-${nivel}) no coincide con PF (${pf})`);
                }

            } catch (err) {
                console.error(err);
                setError("No se pudo cargar la información académica.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchStatus();
    }, [asignatura]);

    const handleAccionPrincipal = () => {
        if (!statusUpdate?.decision_academica) return;

        const resultado = statusUpdate.decision_academica.resultado;

        if (resultado === "AVANZA") {
            router.push(`/estudiante/sesion?asignatura=${statusUpdate.asignatura_activa || "PMI"}&nivel=${statusUpdate.nivel || "I"}`);
        } else if (resultado === "RECUPERACION") {
            router.push(`/estudiante/recuperacion?asignatura=${statusUpdate.asignatura_activa || "PMI"}&nivel=${statusUpdate.nivel || "I"}`);
        } else if (resultado === "BLOQUEADO") {
            router.push(`/estudiante/bloqueo?asignatura=${statusUpdate.asignatura_activa || "PMI"}&nivel=${statusUpdate.nivel || "I"}`);
        } else if (resultado === "ACREDITA_NIVEL") {
            // Acción para descarga de certificado o celebración de fin de nivel
            alert("¡Felicidades! Has acreditado el nivel. Tu certificado se está generando...");
            // Podríamos redirigir a una pantalla de éxito real
        }
    };

    const handleIniciarRecuperacion = () => {
        if (!statusUpdate) return;
        router.push(`/estudiante/recuperacion?asignatura=${statusUpdate.asignatura_activa || "PMI"}&nivel=${statusUpdate.nivel || "I"}`);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
            </div>
        );
    }

    if (error || !statusUpdate || !curriculumInfo) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center text-red-400">
                <p>{error || "Error de inicialización de datos"}</p>
            </div>
        );
    }

    return (
        <AppShell statusUpdate={statusUpdate} userRole="estudiante">
            <div className="max-w-3xl mx-auto space-y-8 py-8 px-4">
                {/* 1. Header de Sección */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/50 pb-6">
                    <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tighter">Mi Progreso</h1>
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                            {statusUpdate.asignatura_activa || "CNEYT"} · Nivel {statusUpdate.nivel || "I"}
                        </h1>
                        <p className="text-gray-400 text-sm">Portafolio Académico Digital</p>
                    </div>
                    <div className="w-fit">
                        <EstadoPropositoBadge estado={statusUpdate.acreditacion.estado_proposito} />
                    </div>
                </div>

                {/* 2. Propósito Formativo (Foco Principal) */}
                <div className="group transition-all">
                    <PropositoFormativoViewer
                        propositoId={statusUpdate.proposito_formativo_id}
                        propositoTexto={curriculumInfo.texto}
                        fuenteMccems={curriculumInfo.fuente_mccems}
                    />
                </div>

                {/* 3. Contenidos Formativos */}
                <div className="bg-slate-800/40 rounded-2xl border border-slate-700/50 shadow-xl overflow-hidden backdrop-blur-sm transition-hover hover:border-slate-600/50">
                    <ContenidosFormativosList contenidos={curriculumInfo.contenidos} />
                </div>

                {/* 4. Panel de Recuperación (Si aplica) */}
                <RutaRecuperacionPanel
                    estadoProposito={statusUpdate.acreditacion.estado_proposito}
                    elegibleRecuperacion={statusUpdate.acreditacion.elegible_recuperacion}
                    accionSiguiente={statusUpdate.decision_academica?.accion_siguiente || "Sin acción definida"}
                    onIniciarRecuperacion={handleIniciarRecuperacion}
                />

                {/* 5. Acción Principal - Prominente y centrada */}
                {statusUpdate.decision_academica && statusUpdate.decision_academica.resultado !== "BLOQUEADO" && (
                    <div className="pt-6">
                        <button
                            onClick={handleAccionPrincipal}
                            className="w-full flex items-center justify-center space-x-3 px-8 py-5 sm:py-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-600 text-white rounded-3xl font-black text-sm sm:text-lg uppercase tracking-widest shadow-2xl shadow-blue-900/40 hover:from-blue-500 hover:to-teal-500 transition-all active:scale-95 ring-1 ring-white/10"
                        >
                            <span>{statusUpdate.decision_academica.accion_siguiente}</span>
                            <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
                        </button>
                    </div>
                )}
            </div>
        </AppShell>
    );
}

export default function DashboardPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
            </div>
        }>
            <DashboardContent />
        </Suspense>
    );
}
