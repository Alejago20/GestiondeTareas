import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
    // Aquí va la lógica de autenticación real
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-black text-white grid grid-cols-1 md:grid-cols-2">
      {/* LADO IZQUIERDO: decoración / arte / animación futura */}
      <div className="hidden md:flex items-center justify-center relative">
        {/* Aquí puedes poner animación o imagen */}
        <img
          src="/decor/planets.png" // o cualquier imagen decorativa tipo esfera
          alt="decoración"
          className="w-2/3 object-contain animate-pulse"
        />
      </div>

      {/* LADO DERECHO: Formulario */}
      <div className="flex items-center justify-center px-6 py-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm space-y-6"
        >
          <div className="text-center space-y-2">
            <div className="text-xl">Acceso</div>
            <div className="text-sm text-gray-400">
              <span
                onClick={() => navigate("/register")}
                className="underline cursor-pointer hover:text-white"
              >
                crear una cuenta
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <input
              type="email"
              required
              placeholder="Correo electrónico o nombre de usuario"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 bg-zinc-800 text-white rounded-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
            />

            <input
              type="password"
              required
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3 bg-zinc-800 text-white rounded-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition"
          >
            Ingresar
          </button>

          <p className="text-sm text-gray-500 text-center">
            ¿Has olvidado tu contraseña?
          </p>
        </form>
      </div>
    </div>
  );
}
