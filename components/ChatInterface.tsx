"use client";

import { useState, useRef, useEffect } from "react";
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
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

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
            const response: AIResponse = await processChat(input, messages);

            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: response.answer || "Respuesta procesada.", // Accessing the text part
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, aiMessage]);

            // Log the status update for debugging/verification of NAI logic
            console.log("NAI Status Update:", response.status_update);

        } catch (error) {
            console.error("Error processing chat:", error);
            // Optionally add error message to chat
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)]">
            <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400">
                        <p className="text-lg font-medium">Bienvenido al NÚCLEO PEDAGÓGICO MULTIMODAL</p>
                        <p className="text-sm">Selecciona una asignatura o inicia la conversación.</p>
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
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Send className="h-4 w-4" />
                    </button>
                </form>
            </div>
        </div>
    );
}
