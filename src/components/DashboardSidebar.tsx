import { useNavigate } from "react-router-dom";
import { useGlobalStore } from "../../theme/thema";

export default function DashboardSidebar() {
  const navigate = useNavigate();
  const isthema = useGlobalStore((state) => state.isthema);

  return (
    <aside className="h-screen w-72 bg-black/60 border-r border-white/10 p-4 flex flex-col gap-6">
      {/* Logo */}
      <div className={`flex items-center gap-1 px-6 py-2 rounded-full border backdrop-blur-md text-sm shadow-md
  ${isthema ? "bg-[#f2f2f2] text-black border-black/10" : "bg-[#0c0c0c]/40 text-gray-200 border-white/10"}`}
>
  
      <div className="relative w-10 h-10 animate-spin-slow cursor-pointer">
              {[...Array(8)].map((_, i) => {
                const angle = (i * 360) / 6;
                const x = 16 + 12 * Math.cos((angle * Math.PI) / 180);
                const y = 16 + 12 * Math.sin((angle * Math.PI) / 180);
                return (
                  <div
                    key={i}
                    className={`absolute w-1 h-1 rounded-full cursor-pointer
  ${isthema ? " bg-[#0c0c0c]" : "bg-[#f2f2f2]"}`}
                    style={{
                      left: `${x}px`,
                      top: `${y}px`,
                    }}
                  />
                );
              })}
            </div>
      </div>

      {/* Secciones */}
      <div className="space-y-2">
        <div className="text-sm text-gray-400 px-2">Secciones</div>
        <button className="w-full text-left px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition">
          Tareas
        </button>
      </div>

      {/* Categorías */}
      <div className="space-y-3">
        <div className="text-sm text-gray-400 px-2">Categorías</div>

        <button className="w-full text-left px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white/90 hover:bg-white/10 transition">
          Todo
        </button>
        <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/5 text-white/80">
          Personal
        </button>
        <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/5 text-white/80">
          Trabajar
        </button>
        <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/5 text-white/80">
          Compartido
        </button>
      </div>

      <div className="mt-auto px-2">
        <div className="text-xs text-gray-400">Kevin Quiñones</div>
        <div className="text-[11px] text-gray-500">
          Hecho con ❤️ · <span className="underline cursor-pointer" onClick={() => navigate("/")}>Home</span>
        </div>
      </div>
    </aside>
  );
}
