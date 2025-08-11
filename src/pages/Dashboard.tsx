import { useMemo, useState } from "react";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardTopbar from "../components/DashboardTopbar";
import TaskCard from "../components/TaskCard";

type Task = Parameters<typeof TaskCard>[0]["task"];

export default function Dashboard() {
  const [loading] = useState(false);
  const tasks = useMemo<Task[]>(
    () => [
      { id: "1", title: "Revisar PR #42", category: "Trabajar" },
      { id: "2", title: "Pagar servicios", category: "Personal" },
      { id: "3", title: "Plan sprint", category: "Trabajar", done: true },
      { id: "4", title: "Comprar regalo", category: "Personal" },
    ],
    []
  );

  const onNewTask = () => {
    // aquí abrirías un modal o navegas a /tasks/new
    alert("Abrir modal de 'Nueva tarea' (pendiente)");
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white flex">
      <DashboardSidebar />

      <main className="flex-1">
        <DashboardTopbar onNewTask={onNewTask} />

        <section className="px-6 pb-10">
          {/* Separador sutil, estilo Cosmos */}
          <div className="my-6 border-t border-white/10" />

          {loading ? (
            <div className="h-72 grid place-items-center">
              <div className="h-8 w-8 rounded-full border-2 border-white/20 border-t-white animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tasks.map((t) => (
                <TaskCard key={t.id} task={t} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
