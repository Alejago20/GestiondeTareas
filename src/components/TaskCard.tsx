import type { Task } from "../services/tasks";

type Props = {
  task: Task;
  onToggle?: (next: boolean) => void;
  onDelete?: () => void;
};

export default function TaskCard({ task, onToggle, onDelete }: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/[0.08] transition">
      <div className="flex items-start gap-3">
        <input 
        type="checkbox" 
        checked={!!task.done}
        onChange={e => onToggle?.(e.target.checked)} 
        className="mt-1 accent-violet-400" 
        />
        <button onClick={onDelete}>Eliminar</button>
        <div>
          <div className="text-white/90">{task.title}</div>
          <div className="text-xs text-gray-500 mt-1">
            {task.category}
            {task.dueDate ? ` • vence ${new Date(task.dueDate).toLocaleDateString("es-CO")}` : ""}
          </div>
        </div>
      </div>
    </div>
  );
}
