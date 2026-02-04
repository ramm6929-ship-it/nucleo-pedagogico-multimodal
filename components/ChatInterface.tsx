"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState, useRef } from "react";
import { Send, Image as ImageIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AIResponse } from "@/app/lib/types";
import { processChat } from "@/app/actions/chat";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

export function ChatInterface() {
    // 1. ESTADOS (Usuario, Mensajes, UI)
    const [user, setUser] = useState<any>(null); // Estado para guardar al usuario autenticado
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Cliente Supabase para Frontend
    const supabase = createClientComponentClient();

    // 2. EFECTO DE AUTENTICACIÓN (Carga el ID Real al iniciar)
    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUser(user);
                console.log("✅ Usuario autenticado en chat:", user.id);
            }
        };
        getUser();
    }, [supabase]);

    // 3. AUTO-SCROLL
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    // 4. MANEJO DEL ENVÍO
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validaciones de seguridad: No enviar si carga, vacío o SIN USUARIO
        if (!input.trim() || isLoading || !user) {
            if (!user) console.error("⚠️ Intento de envío sin usuario autenticado");
            return;
        }

        // Mensaje optimista (se muestra inmediatamente)
        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            // --- LLAMADA AL NÚCLEO (PRODUCCIÓN) ---
            // Enviamos: 1. Texto, 2. ID Real, 3. Asignatura
            const response: AIResponse = await processChat(
                userMessage.content,
                user.id,
                "PM" // <--- Aquí defines la asignatura. Si tienes un selector, pasa esa variable.
            );

            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: response.answer || "Respuesta procesada.",
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, aiMessage]);

            // Log para verificar que el JSON del NAI llega bien
            console.log("🤖 NAI Status Update:", response.status_update);

        } catch (error) {
            console.error("❌ Error processing chat:", error);
            // Feedback visual de error
            setMessages((prev) => [...prev, {
                id: Date.now().toString(),
                role: "assistant",
                content: "⚠️ Lo siento, hubo un problema de conexión con el Núcleo Pedagógico. Inténtalo de nuevo.",
                timestamp: new Date()
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)]">
            <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400">
                        <p className="text-lg font-medium">Bienvenido al NÚCLEO PEDAGÓGICO MULTIMODAL</p>
                        <p className="text-sm">
                            {user ? "Selecciona una asignatura o inicia la conversación." : "Cargando perfil..."}
                        </p>
                    </div>
                )}
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={cn(
                            "flex w-full",
                            message.role === "user" ? "justify-end" : "justify-start"
                        )}
                    >
                        <div
                            className={cn(
                                "max-w-[80%] rounded-lg px-4 py-3 text-sm whitespace-pre-wrap",
                                message.role === "user"
                                    ? "bg-slate-900 text-white"
                                    : "bg-slate-100 text-slate-800 border border-slate-200"
                            )}
                        >
                            {message.content}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-slate-100 rounded-lg px-4 py-3 border border-slate-200">
                            <Loader2 className="h-5 w-5 animate-spin text-slate-500" />
                        </div>
                    </div>
                )}
            </div>

            <div className="border-t p-4 bg-white">
                <form onSubmit={handleSubmit} className="flex space-x-2">
                    <button
                        type="button"
                        className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                        title="Subir evidencia"
                    >
                        <ImageIcon className="h-5 w-5" />
                    </button>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Escribe tu respuesta o duda..."
                        className="flex-1 min-w-0 rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                        disabled={isLoading || !user}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim() || !user}
                        className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Send className="h-4 w-4" />
                    </button>
                </form>
            </div>
        </div>
    );
}