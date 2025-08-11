type Task = {
  id: string;
  title: string;
  category: "Personal" | "Trabajar" | "Todo" | "Compartido";
  done?: boolean;
};

export default function TaskCard({ task }: { task: Task }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/[0.08] transition">
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          defaultChecked={task.done}
          className="mt-1 accent-violet-400"
        />
        <div>
          <div className="text-white/90">{task.title}</div>
          <div className="text-xs text-gray-500 mt-1">{task.category}</div>
        </div>
      </div>
    </div>
  );
}
