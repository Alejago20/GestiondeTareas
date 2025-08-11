type Props = {
  onNewTask: () => void;
  query: string;
  onQueryChange: (q: string) => void;
};

function formatFechaES(d = new Date()) {
  const fmt = new Intl.DateTimeFormat("es-CO", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const str = fmt.format(d);
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function DashboardTopbar({ onNewTask, query, onQueryChange }: Props) {
  return (
    <div className="px-6 pt-8">
      <h1 className="text-2xl md:text-3xl font-semibold text-white">Buenas tardes, Kevin 👋</h1>
      <p className="text-sm text-gray-400">{formatFechaES()}</p>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4 flex items-center justify-between">
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Buscar tareas…"
          className="w-full max-w-xl bg-transparent outline-none text-white/90 placeholder:text-gray-500"
        />
        <button
          onClick={onNewTask}
          className="ml-4 px-4 py-2 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition"
        >
          + Nueva tarea
        </button>
      </div>
    </div>
  );
}
