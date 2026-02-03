"use client";

import { useState, useRef } from "react";
import { Upload, Image as ImageIcon, FileText, X, Loader2 } from "lucide-react";

/**
 * EvidenciaUploader - Cargador de evidencias
 * 
 * REGLA: Inputs de texto o imagen.
 * ACCIÓN: POST a /api/evidencia/submit.
 * NO evalúa, NO decide, solo envía.
 */

interface EvidenciaUploaderProps {
    onSubmit: (evidencia: { tipo: "digital" | "captura_optica"; contenido: string | File }) => Promise<void>;
    isSubmitting: boolean;
}

export function EvidenciaUploader({ onSubmit, isSubmitting }: EvidenciaUploaderProps) {
    const [modo, setModo] = useState<"texto" | "imagen">("texto");
    const [texto, setTexto] = useState("");
    const [archivo, setArchivo] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setArchivo(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitting) return;

        if (modo === "texto" && texto.trim()) {
            await onSubmit({ tipo: "digital", contenido: texto });
            setTexto("");
        } else if (modo === "imagen" && archivo) {
            await onSubmit({ tipo: "captura_optica", contenido: archivo });
            setArchivo(null);
            setPreview(null);
        }
    };

    const clearFile = () => {
        setArchivo(null);
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="bg-slate-800/40 rounded-3xl border border-slate-700/50 shadow-2xl backdrop-blur-xl overflow-hidden transition-all duration-500">
            {/* Selector de modo - Estilo Segmented Control Optimizado */}
            <div className="p-3 bg-slate-900/50 border-b border-slate-700/30 flex gap-2">
                <button
                    type="button"
                    onClick={() => setModo("texto")}
                    className={`flex-1 flex items-center justify-center gap-2 h-14 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${modo === "texto"
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                        : "text-slate-500 hover:text-slate-300 hover:bg-slate-800"
                        }`}
                >
                    <FileText className="h-4 w-4" />
                    <span className="hidden sm:inline">Texto Digital</span>
                    <span className="sm:hidden">Texto</span>
                </button>
                <button
                    type="button"
                    onClick={() => setModo("imagen")}
                    className={`flex-1 flex items-center justify-center gap-2 h-14 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${modo === "imagen"
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                        : "text-slate-500 hover:text-slate-300 hover:bg-slate-800"
                        }`}
                >
                    <ImageIcon className="h-4 w-4" />
                    <span className="hidden sm:inline">Captura Óptica</span>
                    <span className="sm:hidden">Cámara</span>
                </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8">
                {modo === "texto" ? (
                    <div className="relative group">
                        <textarea
                            value={texto}
                            onChange={(e) => setTexto(e.target.value)}
                            placeholder="Describe aquí tu evidencia detallada..."
                            className="w-full h-56 sm:h-64 rounded-2xl bg-slate-900/50 border border-slate-700/50 px-6 py-5 text-sm sm:text-base text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none shadow-inner"
                            disabled={isSubmitting}
                        />
                        <div className="absolute bottom-4 right-4 text-[10px] text-slate-700 uppercase font-black">
                            {texto.length} caracteres
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {preview ? (
                            <div className="relative group animate-in zoom-in-95 duration-300">
                                <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-900/80 border border-slate-700/50 ring-1 ring-white/5">
                                    <img
                                        src={preview}
                                        alt="Vista previa"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={clearFile}
                                    className="absolute -top-3 -right-3 h-12 w-12 bg-red-600 rounded-2xl text-white shadow-xl flex items-center justify-center hover:bg-red-500 transition-colors border-2 border-slate-900"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>
                        ) : (
                            <label className="flex flex-col items-center justify-center w-full min-h-[16rem] border-2 border-dashed border-slate-700/50 rounded-3xl cursor-pointer hover:bg-blue-500/5 hover:border-blue-500/30 transition-all group overflow-hidden relative">
                                <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/[0.02] transition-colors" />
                                <div className="relative flex flex-col items-center text-center px-6">
                                    <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-500/10 transition-all">
                                        <ImageIcon className="h-7 w-7 text-slate-500 group-hover:text-blue-400" />
                                    </div>
                                    <span className="text-base font-black text-white transition-colors">Seleccionar Archivo</span>
                                    <span className="text-xs text-slate-500 mt-2 max-w-[200px]">Toma una foto de tu evidencia física para validación.</span>
                                </div>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    disabled={isSubmitting}
                                />
                            </label>
                        )}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting || (modo === "texto" ? !texto.trim() : !archivo)}
                    className="w-full flex items-center justify-center gap-3 h-16 sm:h-20 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-2xl font-black text-xs sm:text-sm tracking-widest uppercase hover:from-teal-500 hover:to-emerald-500 disabled:opacity-50 disabled:grayscale transition-all shadow-2xl shadow-teal-900/20 active:scale-95"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="h-6 w-6 animate-spin" />
                            <span>Procesando...</span>
                        </>
                    ) : (
                        <>
                            <Upload className="h-6 w-6" />
                            <span>Enviar al Portafolio</span>
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
