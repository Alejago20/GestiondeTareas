import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;            // evita doble submit
    setLoading(true);
    setError(null);

    try {
      await register(name, email, password);
      navigate("/dashboard");
    } catch (err: unknown) {
      console.error("REGISTER ERROR:", err);
      if (typeof err === "object" && err !== null && "response" in err) {
        const errorObj = err as { response?: { data?: { error?: string } } };
        setError(errorObj.response?.data?.error ?? "No se pudo crear la cuenta");
      } else {
        setError("No se pudo crear la cuenta");
      }
    } finally {
      setLoading(false);
    }
  }

  console.log("VITE_API_URL =>", import.meta.env.VITE_API_URL);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Overlay de carga (opcional) */}
      {loading && (
        <div
          className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-center justify-center"
          aria-live="polite"
          aria-busy="true"
        >
          <div className="flex items-center gap-3">
            <svg className="h-6 w-6 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-20" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
              <path d="M22 12a10 10 0 0 1-10 10" stroke="white" strokeWidth="4" />
            </svg>
            <span className="text-sm text-gray-200">Creando tu cuenta…</span>
          </div>
        </div>
      )}

      {/* Logo */}
      <div className="absolute top-6 left-8 z-30">
        <h1
          className="text-white text-xl font-semibold tracking-wide cursor-pointer"
          onClick={() => navigate("/")}
        >
          COSMODEX<span className="text-sm align-super">©</span>
        </h1>
      </div>

      {/* Card de registro */}
      <div className="relative z-20 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md bg-white/5 backdrop-blur-sm p-10 rounded-3xl shadow-lg border border-white/10">
          <div className="text-center mb-8">
            <div className="relative w-10 h-10 animate-spin-slow flex items-center left-40">
              {[...Array(8)].map((_, i) => {
                const angle = (i * 360) / 6;
                const x = 16 + 12 * Math.cos((angle * Math.PI) / 180);
                const y = 16 + 12 * Math.sin((angle * Math.PI) / 180);
                return (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-white rounded-full left-50"
                    style={{ left: `${x}px`, top: `${y}px` }}
                  />
                );
              })}
            </div>
            <div className="text-2xl font-serif">Welcome to Cosmodex</div>
            <p className="text-gray-400 text-sm">Begin by creating an account</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className={`space-y-4 ${loading ? "pointer-events-none" : ""}`}
            aria-disabled={loading}
          >
            <input
              type="text"
              placeholder="Full name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              className="w-full px-5 py-3 bg-zinc-900 text-white rounded-full placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-60"
            />
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="w-full px-5 py-3 bg-zinc-900 text-white rounded-full placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-60"
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="w-full px-5 py-3 bg-zinc-900 text-white rounded-full placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-60"
            />

            <button
              type="submit"
              disabled={loading}
              aria-disabled={loading}
              className="w-full py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-20" cx="12" cy="12" r="10" stroke="black" strokeWidth="4" />
                    <path d="M22 12a10 10 0 0 1-10 10" stroke="black" strokeWidth="4" />
                  </svg>
                  Creating…
                </>
              ) : (
                "Sign up"
              )}
            </button>
          </form>

          {error && <div className="text-center mt-4 text-sm text-red-500">{error}</div>}

          <div className="text-center mt-4 text-sm text-gray-500">
            By continuing, you agree to our{" "}
            <span className="underline cursor-pointer hover:text-white">Terms</span> and{" "}
            <span className="underline cursor-pointer hover:text-white">Privacy Policy</span>.
          </div>

          <div className="text-center mt-6 text-sm">
            <span className="text-gray-400">Already have an account? </span>
            <span onClick={() => navigate("/login")} className="underline cursor-pointer hover:text-white">
              Log in
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
