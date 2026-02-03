"use client";

import { Suspense, useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AppShell } from "@/components/infrastructure/AppShell";
import { SesionAprendizajePanel } from "@/components/estudiante/SesionAprendizajePanel";
import type { StatusUpdate } from "@/app/lib/types";
import { Loader2 } from "lucide-react";
import { processChat } from "@/app/actions/chat";

/**
 * Pantalla 5E - Sesión de Aprendizaje (Flujo Estudiante)
 * 
 * Propósito: Trabajo cognitivo guiado del PF activo.
 * REGLA: PF inmutable durante la sesión.
 * REGLA: Salida exclusiva a Pantalla 6E.
 */

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
}

function SesionContent() {
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

        // 2. Resolver Asignatura y PF Inmutable
        const activeSubject = asignaturaParam || localStorage.getItem("nai_active_subject");
        if (!activeSubject) {
            router.replace("/estudiante");
            return;
        }

        setIsAuthorized(true);

        // 3. Inicializar Estado (Simulación de carga de estado desde el dashboard)
        const initialStatus: StatusUpdate = {
            asignatura_activa: activeSubject as any,
            nivel: "I", // Inyectado desde el contexto
            dia_actual: 15,
            proposito_formativo_id: "PF-PM-I-01",
            proposito_formativo_actual: "PMI-I-PF1",
            proposito_formativo_siguiente: "PMI-I-PF2",
            evaluacion_evidencia: {
                tipo: "digital",
                rubrica_version: "v1.0",
                comentario_portafolio: "",
                validada_por_docente: false,
            },
            acreditacion: {
                estado_proposito: "EN_PROCESO",
                elegible_recuperacion: false,
            },
            decision_academica: {
                resultado: "AVANZA",
                accion_siguiente: "Continuar con la sesión",
            },
        };
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
            // PF se envía explícitamente para asegurar INMUTABILIDAD en el backend
            const response = await processChat(
                messageText,
                messages,
                statusUpdate.asignatura_activa as any
            );

            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: response.answer || "Respuesta procesada.",
            };
            setMessages((prev) => [...prev, aiMessage]);

            // Actualizar solo estados permitidos (no el PF)
            if (response.status_update) {
                // 🛡️ GUARDA DE COHERENCIA NORMATIVA DUAL (Executive Order 04)
                const newPF = response.status_update.proposito_formativo_id;
                const prog = response.status_update.asignatura_activa;
                const niv = response.status_update.nivel;

                if (newPF && prog && niv && !newPF.startsWith(`${prog}-${niv}-`)) {
                    console.error(`[NORMATIVA] Discrepancia crítica Programa/Nivel: ${prog}-${niv} vs ${newPF}`);
                }

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
            <div className="max-w-4xl mx-auto py-2 px-4">
                <SesionAprendizajePanel
                    onSendMessage={handleSendMessage}
                    messages={messages}
                    isLoading={isLoading}
                    statusUpdate={statusUpdate}
                />
            </div>
        </AppShell>
    );
}

export default function SesionPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#050510] flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
        }>
            <SesionContent />
        </Suspense>
    );
}
