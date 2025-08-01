import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();

    return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-6 px-6 py-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-sm text-gray-200 shadow-md">
      <div className="relative w-10 h-10 animate-spin-slow">
              {[...Array(8)].map((_, i) => {
                const angle = (i * 360) / 6;
                const x = 16 + 12 * Math.cos((angle * Math.PI) / 180);
                const y = 16 + 12 * Math.sin((angle * Math.PI) / 180);
                return (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
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
            className="px-5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white"
          >
            Log In
          </button>
          <button
            onClick={() => navigate("/register")}
            className="px-4 py-1 rounded-full bg-white text-black hover:bg-gray-200 transition"
          >
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
}