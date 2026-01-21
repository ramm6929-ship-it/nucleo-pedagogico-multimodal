import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col justify-center items-center text-white px-4">
      <div className="max-w-3xl text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
            MAT-IA / NAI
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 font-light">
            Núcleo Pedagógico Multimodal
          </p>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Sistema de inteligencia artificial pedagógica para el acompañamiento y evaluación
            del aprendizaje en el Marco Curricular Común 2025.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-md mx-auto">
          <Link
            href="/dashboard/student"
            className="group relative flex flex-col items-center p-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl hover:bg-slate-700/50 transition-all hover:scale-105"
          >
            <GraduationCap className="h-12 w-12 mb-4 text-blue-400" />
            <h3 className="text-xl font-semibold mb-2">Modo Estudiante</h3>
            <p className="text-sm text-slate-400 text-center">
              Accede a tus asignaturas y seguimiento personalizado.
            </p>
            <ArrowRight className="absolute bottom-4 right-4 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
          </Link>

          <Link
            href="/dashboard/teacher"
            className="group relative flex flex-col items-center p-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl hover:bg-slate-700/50 transition-all hover:scale-105"
          >
            <BookOpen className="h-12 w-12 mb-4 text-teal-400" />
            <h3 className="text-xl font-semibold mb-2">Modo Docente</h3>
            <p className="text-sm text-slate-400 text-center">
              Gestiona grupos, reportes y evaluaciones.
            </p>
            <ArrowRight className="absolute bottom-4 right-4 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity text-teal-400" />
          </Link>
        </div>
      </div>

      <footer className="absolute bottom-6 text-slate-600 text-xs">
        MCC 2025 · PAEC · Educación Media Superior
      </footer>
    </div>
  );
}
