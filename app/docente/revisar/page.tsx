"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AppShell } from "@/components/infrastructure/AppShell";
import { EvidenciaReviewer } from "@/components/docente/EvidenciaReviewer";
import type { StatusUpdate } from "@/app/lib/types";
import { ArrowLeft, Loader2 } from "lucide-react";

/**
 * Página de revisión de evidencias (Docente)
 */

interface EvidenciaInfo {
    id: string;
    estudianteNombre: string;
    estudiante_id: string;
    tipo: "digital" | "captura_optica";
    contenido: string;
    fecha: string;
    comentario_portafolio: string;
    validada: boolean | null;
}

function RevisarContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const estudianteId = searchParams.get("estudiante");

    const [evidencia, setEvidencia] = useState<EvidenciaInfo | null>(null);
    const [statusUpdate, setStatusUpdate] = useState<StatusUpdate | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch context status for header
                const resStatus = await fetch("/api/status_update");
                if (resStatus.ok) {
                    const dataStatus: StatusUpdate = await resStatus.json();
                    setStatusUpdate(dataStatus);
                }

                // Fetch evidence (simulated for the specific student)
                const fetchEvidencia = async () => {
                    await new Promise((r) => setTimeout(r, 500));
                    const data: EvidenciaInfo = {
                        id: "ev-001",
                        estudianteNombre: "Juan Hernández Ruiz",
                        estudiante_id: estudianteId ?? "2",
                        tipo: "digital",
                        contenido: "El método científico consta de las siguientes etapas: observación, formulación de hipótesis, experimentación, análisis de resultados y conclusión. En mi observación del fenómeno de la caída de objetos, noté que...",
                        fecha: "29 de enero, 2026 - 10:30",
                        comentario_portafolio: "La evidencia muestra comprensión del método científico pero requiere mayor profundidad en la justificación.",
                        validada: null,
                    };
                    setEvidencia(data);
                };
                await fetchEvidencia();
            } catch (err) {
                console.error("Error fetching revision data:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [estudianteId]);

    const handleValidar = async (id: string, aprobada: boolean) => {
        setIsSubmitting(true);
        try {
            // Emite evento al backend (POST /api/docente/validar)
            const res = await fetch("/api/docente/validar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ evidenciaId: id, aprobada, comentario: "" })
            });

            if (res.ok) {
                router.push("/docente");
            }
        } catch (error) {
            console.error("Error al validar:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleExportFEA = async () => {
        setIsSubmitting(true);
        try {
            // Acción única: POST /api/export/fea
            const res = await fetch("/api/export/fea", {
                method: "POST"
            });

            if (res.ok) {
                const data = await res.json();

                // Simulación de descarga de archivo
                const blob = new Blob([data.content], { type: 'application/json' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = data.filename;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);

                console.log(`FEA exportado: ${data.filename}`);
            }
        } catch (error) {
            console.error("Error al exportar FEA:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading || !evidencia) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
            </div>
        );
    }

    return (
        <AppShell statusUpdate={statusUpdate} userRole="docente">
            <div className="max-w-2xl mx-auto py-6">
                <button
                    onClick={() => router.push("/docente")}
                    className="flex items-center space-x-2 text-slate-400 hover:text-white mb-6 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Volver al panel</span>
                </button>

                <EvidenciaReviewer
                    evidencia={evidencia}
                    onValidar={handleValidar}
                    onExportFEA={handleExportFEA}
                    isSubmitting={isSubmitting}
                />
            </div>
        </AppShell>
    );
}

export default function RevisarPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
            </div>
        }>
            <RevisarContent />
        </Suspense>
    );
}
