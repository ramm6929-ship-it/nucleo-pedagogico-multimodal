"use client";

import Link from "next/link";
import { ArrowLeft, UserPlus } from "lucide-react";

export default function RegistroPage() {
    return (
        <div className="min-h-screen bg-[#050510] flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-sm space-y-8 text-center">
                <div className="flex justify-center">
                    <UserPlus className="h-16 w-16 text-slate-700" />
                </div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Registro de Nuevo Ingreso</h1>
                <p className="text-slate-400 text-sm">El registro de nuevos usuarios está controlado administrativamente en esta versión.</p>

                <Link
                    href="/login"
                    className="inline-flex items-center justify-center w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-500 transition-all active:scale-95"
                >
                    Ir a Inicio de Sesión
                </Link>

                <Link href="/" className="block text-slate-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest mt-4">
                    Volver a Inicio
                </Link>
            </div>
        </div>
    );
}
