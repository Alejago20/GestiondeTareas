// src/pages/Dashboard.tsx
import { useMemo, useState } from "react";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardTopbar from "../components/DashboardTopbar";
import TaskCard from "../components/TaskCard";
import NewTaskModal from "../components/NewTaskModal";
import { useTasks } from "../hooks/useTasks"; // ⬅️ nuevo
import type { Task } from "../services/tasks"; // ⬅️ tipado unificado

export default function Dashboard() {
  // ⬇️ ahora las tareas vienen del backend
  const { tasks, loading, error, addTask, toggleDone, removeTask } = useTasks();

  const [selectedCat, setSelectedCat] = useState<string>("Todo");
  const [query, setQuery] = useState<string>("");
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tasks.filter((t) => {
      const byCat =
        selectedCat === "Todo"
          ? true
          : t.category === (selectedCat as Task["category"]);
      const byQuery = !q || t.title.toLowerCase().includes(q);
      return byCat && byQuery;
    });
  }, [tasks, selectedCat, query]);

  // ahora crear llama al backend via hook
  const handleCreate = async (data: {
    title: string;
    category: string;
    dueDate?: string;
  }) => {
    try {
      await addTask(
        data.title,
        data.category as Task["category"]
      );
      setOpen(false);
    } catch (e: unknown) {
      if (typeof e === "object" && e !== null) {
        const err = e as { response?: { data?: { error?: string } }, message?: string };
        alert(
          err?.response?.data?.error ??
            err?.message ??
            "No se pudo crear la tarea"
        );
      } else {
        alert("No se pudo crear la tarea");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white flex">
      <DashboardSidebar selected={selectedCat} onSelect={setSelectedCat} />

      <main className="flex-1">
        <DashboardTopbar
          onNewTask={() => setOpen(true)}
          query={query}
          onQueryChange={setQuery}
        />

        <section className="px-6 pb-10">
          <div className="my-6 border-t border-white/10" />

          {/* error global al cargar */}
          {error && (
            <div className="mb-4 text-red-400">
              {error}
            </div>
          )}

          {loading ? (
            <div className="h-72 grid place-items-center">
              <div className="h-8 w-8 rounded-full border-2 border-white/20 border-t-white animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="h-72 grid place-items-center text-gray-400">
              Sin resultados
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((t) => (
                <TaskCard
                  key={t.id}
                  task={t}
                  onToggle={(next) => toggleDone(t.id, next)}
                  onDelete={() => removeTask(t.id)}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <NewTaskModal
        open={open}
        onClose={() => setOpen(false)}
        onCreate={handleCreate}
      />
    </div>
  );
}

