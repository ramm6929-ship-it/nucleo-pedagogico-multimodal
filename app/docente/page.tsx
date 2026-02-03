"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/infrastructure/AppShell";
import { DocenteDashboard } from "@/components/docente/DocenteDashboard";
import type { EstudianteResumen, StatusUpdate } from "@/app/lib/types";
import { Loader2 } from "lucide-react";

/**
 * Página principal Docente
 * 
 * Selección de UAC, lista de PFs y estados.
 * Vista de lectura, sin lógica académica.
 */

export default function DocentePage() {
    const router = useRouter();
    const [estudiantes, setEstudiantes] = useState<EstudianteResumen[]>([]);
    const [statusUpdate, setStatusUpdate] = useState<StatusUpdate | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch context status for header
                const resStatus = await fetch("/api/status_update");
                if (resStatus.ok) {
                    const dataStatus: StatusUpdate = await resStatus.json();
                    setStatusUpdate(dataStatus);
                }

                // Fetch students list
                const resEst = await fetch("/api/docente/estudiantes");
                if (resEst.ok) {
                    const dataEst: EstudianteResumen[] = await resEst.json();
                    setEstudiantes(dataEst);
                }
            } catch (err) {
                console.error("Error fetching docente data:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSelectEstudiante = (id: string) => {
        router.push(`/docente/revisar?estudiante=${id}`);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
            </div>
        );
    }

    return (
        <AppShell statusUpdate={statusUpdate} userRole="docente">
            <div className="max-w-4xl mx-auto py-6">
                <DocenteDashboard
                    estudiantes={estudiantes}
                    onSelectEstudiante={handleSelectEstudiante}
                />
            </div>
        </AppShell>
    );
}
