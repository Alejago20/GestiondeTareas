import { useNavigate } from "react-router-dom";
import { useGlobalStore } from "../../theme/thema";

export default function Header() {
  const isthema = useGlobalStore((state) => state.isthema);

    const navigate = useNavigate();

    return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
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
        {/* Navegación principal */}


        {/* Botones de sesión */}
        <div className="flex gap-2 ml-6">
          <button
            onClick={() => navigate("/login")}
           className={`px-6 py-2  rounded-full border transition
  ${isthema 
    ? "bg-[#f2f2f2] border-black/20 font-medium text-black" 
    : "bg-white/10 hover:bg-white/20 border-white/20 text-white"
  }`}

          >
            Log In
          </button>
          <button
            onClick={() => navigate("/register")}
           className={`px-6 py-2 rounded-full transition
  ${isthema
    ? "bg-black text-white font-semibold"
    : "bg-white font-semibold text-black border border-white/20"
  }`}

          >
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
}