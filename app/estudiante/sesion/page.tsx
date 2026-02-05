"use client";

import { Suspense, useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
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

// Cliente Supabase para Frontend
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function SesionContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const asignaturaParam = searchParams.get("asignatura");

    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [statusUpdate, setStatusUpdate] = useState<StatusUpdate | null>(null);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const initSession = async () => {
            // 1. Guard de Rol: Solo Estudiante
            const role = localStorage.getItem("nai_session_role");
            if (role !== "estudiante") {
                router.replace("/");
                return;
            }

            // 2. Obtener usuario autenticado
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                console.error("⚠️ Usuario no autenticado");
                router.replace("/login");
                return;
            }
            setUserId(user.id);

            // 3. Resolver Asignatura y PF Inmutable
            const activeSubject = asignaturaParam || localStorage.getItem("nai_active_subject");
            if (!activeSubject) {
                router.replace("/estudiante");
                return;
            }

            setIsAuthorized(true);

            // 4. Inicialización Estado Dinámico (SSOT del Backend)
            try {
                const res = await fetch(`/api/status_update?asignatura=${activeSubject}&nivel=I`);
                if (!res.ok) throw new Error("Error loading session state");
                const data = await res.json();
                setStatusUpdate(data);
            } catch (err) {
                console.error("Failed to fetch initial session state", err);
            }
        };

        initSession();
    }, [asignaturaParam, router]);

    const handleSendMessage = useCallback(async (messageText: string) => {
        if (!statusUpdate || !userId) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: messageText,
        };
        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);

        try {
            // CORRECCIÓN: Llamar processChat con la firma correcta (message, userId, asignatura)
            const response = await processChat(
                messageText,
                userId,
                statusUpdate.asignatura_activa as any
            );

            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: response.answer || "Respuesta procesada.",
            };
            setMessages((prev) => [...prev, aiMessage]);

            // Actualizar solo estados permitidos (Respetando SSOT del backend)
            if (response.status_update) {
                setStatusUpdate(response.status_update);
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    }, [userId, statusUpdate]);

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
