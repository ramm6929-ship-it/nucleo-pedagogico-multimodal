"use client";

import type { EstadoProposito } from "@/app/lib/types";
import { CheckCircle2, Clock, XCircle } from "lucide-react";

/**
 * EstadoPropositoBadge - Badge de estado del Propósito Formativo
 * 
 * REGLA: Colores según estado:
 *   LOGRADO     → Verde
 *   EN_PROCESO  → Amarillo
 *   NO_INICIADO → Gris
 * 
 * NO calcula, NO decide, solo refleja.
 */

interface EstadoPropositoBadgeProps {
    estado: EstadoProposito;
    showLabel?: boolean;
}

const ESTADO_CONFIG: Record<EstadoProposito, {
    label: string;
    bgColor: string;
    textColor: string;
    icon: typeof CheckCircle2;
}> = {
    LOGRADO: {
        label: "Logrado",
        bgColor: "bg-green-500/20",
        textColor: "text-green-400",
        icon: CheckCircle2,
    },
    EN_PROCESO: {
        label: "En Proceso",
        bgColor: "bg-yellow-500/20",
        textColor: "text-yellow-400",
        icon: Clock,
    },
    NO_INICIADO: {
        label: "No Iniciado",
        bgColor: "bg-slate-500/20",
        textColor: "text-slate-400",
        icon: XCircle,
    },
};

export function EstadoPropositoBadge({ estado, showLabel = true }: EstadoPropositoBadgeProps) {
    const config = ESTADO_CONFIG[estado];
    const Icon = config.icon;

    return (
        <div
            className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-full ${config.bgColor}`}
        >
            <Icon className={`h-4 w-4 ${config.textColor}`} />
            {showLabel && (
                <span className={`text-sm font-medium ${config.textColor}`}>
                    {config.label}
                </span>
            )}
        </div>
    );
}
