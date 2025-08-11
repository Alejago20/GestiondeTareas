import { useEffect, useRef, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: (data: { title: string; category: string; dueDate?: string }) => void;
};

const CATEGORIES = ["Todo", "Personal", "Trabajar", "Compartido"];

export default function NewTaskModal({ open, onClose, onCreate }: Props) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Todo");
  const [dueDate, setDueDate] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      setTitle("");
      setCategory("Todo");
      setDueDate("");
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onCreate({ title: title.trim(), category, dueDate });
    onClose();
  };

  return (
    <div
      ref={dialogRef}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      aria-modal
      role="dialog"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-[90%] max-w-md rounded-2xl border border-white/10 bg-[#0f0f0f] p-6 text-white shadow-xl"
      >
        <h2 className="text-xl font-semibold mb-4">Nueva tarea</h2>

        <label className="block text-sm mb-1">Título</label>
        <input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ej. Revisar PR #42"
          className="mb-4 w-full rounded-xl bg-white/[0.06] border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-white"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Categoría</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl bg-white/[0.06] border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-white"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Fecha límite (opcional)</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full rounded-xl bg-white/[0.06] border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-white"
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.06] hover:bg-white/[0.12] transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition"
          >
            Crear
          </button>
        </div>
      </form>
    </div>
  );
}
