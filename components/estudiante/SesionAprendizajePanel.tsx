"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Send, Loader2, Target, Users, BookOpen, Clock, ArrowRight, ShieldCheck } from "lucide-react";
import type { StatusUpdate } from "@/app/lib/types";

/**
 * SesionAprendizajePanel - Panel de interacción didáctica (Pantalla 5E)
 * 
 * REGLA: El sistema guía el razonamiento, pero NO resuelve.
 * REGLA: El PF activo no cambia durante la sesión.
 * Bloques A, B, C, D implementados.
 */

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
}

interface SesionAprendizajePanelProps {
    onSendMessage: (message: string) => Promise<void>;
    messages: Message[];
    isLoading: boolean;
    statusUpdate: StatusUpdate;
}

export function SesionAprendizajePanel({
    onSendMessage,
    messages,
    isLoading,
    statusUpdate,
}: SesionAprendizajePanelProps) {
    const router = useRouter();
    const [input, setInput] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const messageText = input;
        setInput("");
        await onSendMessage(messageText);
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleFinalizarSesion = () => {
        router.push(`/estudiante/evidencia?asignatura=${statusUpdate.asignatura_activa}`);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-10rem)] bg-slate-900 shadow-2xl overflow-hidden border border-white/5 rounded-3xl">
            {/* 🏗️ BLOQUE A — Identidad de la Sesión */}
            <div className="bg-slate-800/50 border-b border-white/5 px-6 py-4 flex items-center justify-between backdrop-blur-md">
                <div className="flex items-center space-x-4">
                    <div className="p-2 bg-blue-500/10 rounded-xl border border-blue-500/20">
                        <BookOpen className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-sm font-bold text-white uppercase tracking-tight">Sesión de Aprendizaje</h2>
                            <span className="text-[9px] font-black bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20 uppercase">Activa</span>
                        </div>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                            {statusUpdate.asignatura_activa} | {statusUpdate.proposito_formativo_id}
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-2 text-slate-400">
                    <Clock className="h-3 w-3" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Est: 50 min</span>
                </div>
            </div>

            {/* 🏗️ BLOQUE B — Contexto Cognitivo (Challenge & PAEC) */}
            <div className="bg-slate-800/20 px-6 py-4 border-b border-white/5 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                    <Target className="h-4 w-4 text-teal-400 mt-1 shrink-0" />
                    <div>
                        <p className="text-[10px] text-teal-500 font-black uppercase tracking-widest mb-1">Reto Cognitivo</p>
                        <p className="text-xs text-slate-300 leading-snug">
                            Analizar la relación entre el {statusUpdate.proposito_formativo_id} y la resolución de problemas comunitarios.
                        </p>
                    </div>
                </div>
                {/* Visualización PAEC Condicional */}
                <div className="flex items-start space-x-3 bg-amber-500/5 p-3 rounded-xl border border-amber-500/10">
                    <Users className="h-4 w-4 text-amber-400 mt-1 shrink-0" />
                    <div>
                        <p className="text-[10px] text-amber-500 font-black uppercase tracking-widest mb-1">Contexto PAEC (Activo)</p>
                        <p className="text-xs text-slate-400 leading-snug italic">
                            Problema: Sedentarismo y salud comunitaria en el entorno escolar.
                        </p>
                    </div>
                </div>
            </div>

            {/* 🏗️ BLOQUE C — Interacción Guiada (Chat Area) */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-900/40" ref={scrollRef}>
                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                        <div className="w-12 h-12 rounded-full bg-slate-800 border border-white/5 flex items-center justify-center animate-pulse">
                            <ShieldCheck className="h-6 w-6 text-slate-600" />
                        </div>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Iniciando Diálogo Cognitivo...</p>
                    </div>
                )}
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex w-full ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`max-w-[85%] rounded-2xl px-5 py-3 text-sm leading-relaxed shadow-lg ${message.role === "user"
                                ? "bg-blue-600 text-white rounded-tr-none shadow-blue-900/20"
                                : "bg-slate-800/80 text-slate-200 border border-white/5 rounded-tl-none"
                                }`}
                        >
                            {message.content}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-slate-800/80 rounded-2xl p-4 border border-white/5">
                            <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                        </div>
                    </div>
                )}
            </div>

            {/* 🏗️ BLOQUE D — Evidencia Solicitada & Input */}
            <div className="p-4 sm:p-6 bg-slate-800/40 border-t border-white/5">
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Evidencia Solicitada:</span>
                        <span className="text-[9px] font-black text-indigo-400 uppercase bg-indigo-500/10 px-2 py-0.5 rounded">Texto Digital / Imagen</span>
                    </div>
                    <button
                        onClick={handleFinalizarSesion}
                        className="text-[10px] font-black text-slate-400 hover:text-white flex items-center gap-1 transition-all group"
                    >
                        Terminar Sesión <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Proponga una idea o solicite una pista..."
                        className="flex-1 h-12 rounded-xl bg-slate-900/80 border border-white/10 px-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white disabled:opacity-50 hover:bg-blue-500"
                    >
                        <Send className="h-5 w-5" />
                    </button>
                </form>
            </div>
        </div>
    );
}
