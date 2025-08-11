// src/pages/Dashboard.tsx
import { useMemo, useState } from "react";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardTopbar from "../components/DashboardTopbar";
import TaskCard from "../components/TaskCard";
import NewTaskModal from "../components/NewTaskModal";

type Task = {
  id: string;
  title: string;
  category: "Todo" | "Personal" | "Trabajar" | "Compartido";
  done?: boolean;
  dueDate?: string;
};

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Revisar PR #42", category: "Trabajar" },
    { id: "2", title: "Pagar servicios", category: "Personal" },
    { id: "3", title: "Plan sprint", category: "Trabajar", done: true },
    { id: "4", title: "Comprar regalo", category: "Personal" },
  ]);

  const [selectedCat, setSelectedCat] = useState<string>("Todo");
  const [query, setQuery] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [loading] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tasks.filter((t) => {
      const byCat = selectedCat === "Todo" ? true : t.category === (selectedCat as Task["category"]);
      const byQuery = !q || t.title.toLowerCase().includes(q);
      return byCat && byQuery;
    });
  }, [tasks, selectedCat, query]);

  const handleCreate = (data: { title: string; category: string; dueDate?: string }) => {
    setTasks((prev) => [
      { id: crypto.randomUUID(), title: data.title, category: data.category as Task["category"], dueDate: data.dueDate },
      ...prev,
    ]);
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white flex">
      <DashboardSidebar selected={selectedCat} onSelect={setSelectedCat} />

      <main className="flex-1">
        <DashboardTopbar onNewTask={() => setOpen(true)} query={query} onQueryChange={setQuery} />

        <section className="px-6 pb-10">
          <div className="my-6 border-t border-white/10" />

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
                <TaskCard key={t.id} task={t} />
              ))}
            </div>
          )}
        </section>
      </main>

      <NewTaskModal open={open} onClose={() => setOpen(false)} onCreate={handleCreate} />
    </div>
  );
}
