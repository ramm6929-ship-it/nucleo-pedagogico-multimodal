"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { DecisionAcademica } from "@/app/lib/types";
import { ShieldAlert } from "lucide-react";

/**
 * FlowGuard - Guardián de navegación normativa
 * 
 * REGLA: Si decision_academica.resultado === "BLOQUEADO" → Redirige a Pantalla 8E.
 * NO decide, solo refleja el estado del backend.
 */

interface FlowGuardProps {
    children: ReactNode;
    decisionAcademica: DecisionAcademica | null;
    userRole: "estudiante" | "docente";
}

export function FlowGuard({ children, decisionAcademica, userRole, asignatura }: FlowGuardProps & { asignatura?: string | null }) {
    const router = useRouter();

    // 1. Guard de Aislamiento Curricular: No permite flujo pedagógico sin asignatura
    useEffect(() => {
        if (userRole === "estudiante" && !asignatura) {
            // Si estamos en una ruta que requiere asignatura (como dashboard, sesion, etc.)
            // y no viene en los params, forzamos regreso a la selección (Shell de Inicio)
            const path = window.location.pathname;
            if (path.includes("/estudiante/") && path !== "/estudiante") {
                router.replace("/estudiante");
            }
        }
    }, [asignatura, userRole, router]);

    // 2. Guard de Bloqueo Normativo
    useEffect(() => {
        if (userRole === "estudiante" && decisionAcademica?.resultado === "BLOQUEADO") {
            router.replace("/estudiante/bloqueo");
        }
    }, [decisionAcademica, userRole, router]);

    // Renderizado Inline de Bloqueo
    if (userRole === "estudiante" && decisionAcademica?.resultado === "BLOQUEADO") {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <ShieldAlert className="h-16 w-16 text-red-500 mb-4" />
                <h1 className="text-2xl font-bold text-white mb-2">Nivel Bloqueado</h1>
                <p className="text-slate-400 max-w-md font-medium">
                    Nivel bloqueado conforme a los criterios de acreditación RACN del MCCEMS 2025.
                </p>
            </div>
        );
    }

    return <>{children}</>;
}
