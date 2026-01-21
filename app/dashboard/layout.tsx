import { Sidebar } from "@/components/Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-white">
            <Sidebar />
            <main className="flex-1 overflow-hidden bg-slate-50">
                {children}
            </main>
        </div>
    );
}
