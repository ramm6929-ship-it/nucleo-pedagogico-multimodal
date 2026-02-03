"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

/**
 * RutaRecuperacionPanel - Panel de recuperación académica
 * 
 * REGLA: Se renderiza SOLO si:
 *   - estado_proposito === "NO_INICIADO"
 *   - elegible_recuperacion === true
 * 
 * NO decide, solo refleja condiciones del backend.
 */

interface RutaRecuperacionPanelProps {
    estadoProposito: "LOGRADO" | "EN_PROCESO" | "NO_INICIADO";
    elegibleRecuperacion: boolean;
    accionSiguiente: string;
    onIniciarRecuperacion: () => void;
}

export function RutaRecuperacionPanel({
    estadoProposito,
    elegibleRecuperacion,
    accionSiguiente,
    onIniciarRecuperacion,
}: RutaRecuperacionPanelProps) {
    // Condición de renderizado según wireframe
    if (estadoProposito !== "NO_INICIADO" || !elegibleRecuperacion) {
        return null;
    }

    return (
        <div className="bg-gradient-to-br from-amber-900/30 to-red-900/30 border border-amber-700/50 rounded-xl p-6">
            <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                        <AlertTriangle className="h-6 w-6 text-amber-400" />
                    </div>
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-amber-200 mb-2">
                        Ruta de Recuperación Disponible
                    </h3>
                    <p className="text-slate-300 text-sm mb-4">
                        {accionSiguiente}
                    </p>
                    <button
                        onClick={onIniciarRecuperacion}
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-500 transition-colors"
                    >
                        <RefreshCw className="h-4 w-4" />
                        <span>Iniciar Recuperación</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
