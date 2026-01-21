export default function TeacherPage() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-slate-800 mb-4">Panel Docente - Estado del Grupo</h1>
            <div className="bg-white rounded-lg shadow p-6 border border-slate-200">
                <p className="text-slate-600">
                    Aquí se mostrarán los indicadores de desempeño y validaciones pendientes.
                </p>
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
                    Esperando conexión con Supabase para cargar datos en tiempo real.
                </div>
            </div>
        </div>
    );
}
