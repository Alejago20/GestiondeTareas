import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, password });
    // Aquí iría la lógica de creación de usuario
    navigate("/login"); // Redirigir al login tras registro
  };

  return (
    <div className="min-h-screen bg-black text-white grid grid-cols-1 md:grid-cols-2">
      {/* Lado visual */}
      <div className="hidden md:flex items-center justify-center relative">
        <img
          src="/decor/planets.png"
          alt="decoración"
          className="w-2/3 object-contain animate-pulse"
        />
      </div>

      {/* Formulario de registro */}
      <div className="flex items-center justify-center px-6 py-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm space-y-6"
        >
          <div className="text-center space-y-2">
            <div className="text-xl">Crear cuenta</div>
            <div className="text-sm text-gray-400">
              <span
                onClick={() => navigate("/login")}
                className="underline cursor-pointer hover:text-white"
              >
                ya tengo cuenta
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Nombre completo"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-5 py-3 bg-zinc-800 text-white rounded-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
            />

            <input
              type="email"
              placeholder="Correo electrónico"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 bg-zinc-800 text-white rounded-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
            />

            <input
              type="password"
              placeholder="Contraseña"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3 bg-zinc-800 text-white rounded-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition"
          >
            Registrarme
          </button>
        </form>
      </div>
    </div>
  );
}
