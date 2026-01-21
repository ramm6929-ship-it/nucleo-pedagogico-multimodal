import { ChatInterface } from "@/components/ChatInterface";

export default function StudentPage() {
    return (
        <div className="h-full flex flex-col">
            <header className="bg-white border-b px-6 py-4">
                <h1 className="text-2xl font-bold text-slate-800">Modo Estudiante</h1>
                <p className="text-sm text-slate-500">Asignatura: Pensamiento Matemático | Día: 1</p>
            </header>
            <div className="flex-1 overflow-hidden">
                <ChatInterface />
            </div>
        </div>
    );
}
