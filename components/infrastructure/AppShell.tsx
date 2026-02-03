"use client";

import { ReactNode } from "react";
import type { StatusUpdate } from "@/app/lib/types";
import { HeaderContextual } from "@/components/infrastructure/HeaderContextual";
import { FlowGuard } from "@/components/infrastructure/FlowGuard";

interface AppShellProps {
    children: ReactNode;
    statusUpdate: StatusUpdate | null;
    userRole: "estudiante" | "docente";
}

export function AppShell({ children, statusUpdate, userRole }: AppShellProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Header contextual con asignatura y día */}
            <HeaderContextual
                asignatura={statusUpdate?.asignatura_activa ?? null}
                diaActual={statusUpdate?.dia_actual ?? null}
                userRole={userRole}
            />

            {/* FlowGuard: bloquea navegación si resultado === BLOQUEADO o si falta asignatura */}
            <FlowGuard
                decisionAcademica={statusUpdate?.decision_academica ?? null}
                userRole={userRole}
                asignatura={statusUpdate?.asignatura_activa}
            >
                <main className="container mx-auto px-4 py-6 sm:py-10 max-w-4xl">
                    {children}
                </main>
            </FlowGuard>
        </div>
    );
}
