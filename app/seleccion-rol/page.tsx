"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, BookOpen, GraduationCap } from "lucide-react";

/**
 * Pantalla 2 — Selección de Rol
 * 
 * Propósito: Diferenciar acceso entre Estudiante y Docente.
 * No contiene PFs ni dashboards.
 * REGLA: El rol se fija por sesión.
 */

export default function RoleSelectionPage() {
  const router = useRouter();

  // Guard de persistencia de rol (Fixation)

  const handleSelectRole = (role: "estudiante" | "docente") => {
    localStorage.setItem("nai_session_role", role);
    router.push(`/${role}`);
  };

  return (
    <div className="min-h-screen bg-[#050510] flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full text-center space-y-12">
        <div className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white italic">
            Selección de Perfil
          </h1>
          <p className="text-slate-400 max-w-lg mx-auto text-sm md:text-base">
            Bienvenido al Núcleo Pedagógico Multimodal. Elija su rol para acceder a las funciones correspondientes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto w-full">
          <button
            onClick={() => handleSelectRole("estudiante")}
            className="group relative flex flex-col items-center p-8 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl hover:bg-white/[0.06] transition-all hover:scale-105 text-left"
          >
            <GraduationCap className="h-12 w-12 mb-4 text-blue-400 transition-transform group-hover:scale-110" />
            <h3 className="text-xl font-bold mb-2 text-white">Modo Estudiante</h3>
            <p className="text-xs text-slate-500 text-center">
              Acceso a sesiones de aprendizaje y seguimiento de Propósitos Formativos.
            </p>
            <ArrowRight className="absolute bottom-6 right-6 h-5 w-5 opacity-0 group-hover:opacity-100 transition-all text-blue-400 translate-x-[-10px] group-hover:translate-x-0" />
          </button>

          <button
            onClick={() => handleSelectRole("docente")}
            className="group relative flex flex-col items-center p-8 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl hover:bg-white/[0.06] transition-all hover:scale-105 text-left"
          >
            <BookOpen className="h-12 w-12 mb-4 text-teal-400 transition-transform group-hover:scale-110" />
            <h3 className="text-xl font-bold mb-2 text-white">Modo Docente</h3>
            <p className="text-xs text-slate-500 text-center">
              Gestión académica, monitoreo de grupos y validación de evidencias.
            </p>
            <ArrowRight className="absolute bottom-6 right-6 h-5 w-5 opacity-0 group-hover:opacity-100 transition-all text-teal-400 translate-x-[-10px] group-hover:translate-x-0" />
          </button>
        </div>

        <p className="text-[10px] text-slate-700 uppercase font-bold tracking-widest">
          Sistema NAI | Plataforma de Gestión de Aprendizaje
        </p>
      </div>
    </div>
  );
}
