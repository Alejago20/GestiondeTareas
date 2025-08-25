import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FloatingStones } from "../components/FloatingStones";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError(null);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "response" in err) {
        const errorObj = err as { response?: { data?: { error?: string } } };
        setError(errorObj.response?.data?.error ?? "Error al iniciar sesión");
      } else {
        setError("Error al iniciar sesión");
      }
    } finally { setLoading(false); }
  }

  return (
    <div className="relative min-h-screen bg-black text-white grid grid-cols-1 md:grid-cols-2 overflow-hidden">

      {/* LOGO ARRIBA IZQUIERDA */}
      <div className="absolute top-0 left-0 w-full z-30">
        <div className="pl-8 pt-6" onClick={() => navigate("/")}>
          <h1 className="text-white text-2xl tracking-widest drop-shadow">
            COSMODEX
            <span className="absolute text-base top-0 left-[rem] align-super">©</span>
          </h1>
        </div>
      </div>

      {/* LÍNEA DIVISORIA */}
      <div className="hidden md:block absolute left-1/2 top-0 h-full w-px bg-white/20 z-20"></div>

      {/* LADO IZQUIERDO - ANIMACIÓN */}
      <div className="z-10 flex flex-col items-center h-1/2 justify-center">
        <FloatingStones />
      </div>

      {/* LADO DERECHO - FORMULARIO */}
      <div className="flex items-center justify-center px-6 py-12 relative z-10">
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">

          {/* Loader + título */}
          <div className="flex flex-col items-center mb-4 mt-6">
            <div className="relative w-10 h-10 animate-spin-slow">
              {[...Array(8)].map((_, i) => {
                const angle = (i * 360) / 6;
                const x = 16 + 12 * Math.cos((angle * Math.PI) / 180);
                const y = 16 + 12 * Math.sin((angle * Math.PI) / 180);
                return (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-white rounded-full"
                    style={{
                      left: `${x}px`,
                      top: `${y}px`,
                    }}
                  />
                );
              })}
            </div>
            <div className="text-xl mt-4">Sign in</div>
            <h4 className="text-sm text-gray-400 mt-1">or</h4>
            <div className="text-sm text-gray-400">
              <span
                onClick={() => navigate("/register")}
                className="underline cursor-pointer hover:text-white"
              >
                create an account
              </span>
            </div>
          </div>

          {/* Inputs */}
          <div className="space-y-4">
            <input
              type="email"
              required
              placeholder="Email or username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 bg-zinc-800 text-white rounded-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
            />

            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3 bg-zinc-800 text-white rounded-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          {/* Botón */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition"
          >
            {loading ? "Loading..." : "Enter"}
          </button>

          {/* Error message */}
          {error && (
            <p className="text-sm text-red-500 text-center mt-2">
              {error}
            </p>
          )}

          {/* Contraseña olvidada */}
          <p className="text-sm text-gray-500 text-center">
            Forgot your password?
          </p>
        </form>
      </div>

      {/* Footer */}
      <p className="text-gray-500 text-sm bottom-0 left-40 flex items-center justify-center">
        Terms of Service &nbsp;&nbsp;&nbsp;Privacy Policy
      </p>
    </div>
  );
}
