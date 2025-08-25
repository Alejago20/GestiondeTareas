import { createContext, useContext, useEffect, useState } from "react";
import type { User, AuthResponse } from "../services/auth";
import { loginSrv, registerSrv } from "../services/auth";

type AuthCtx = {
  user: User | null;
  token: string | null;
  restoring: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const Ctx = createContext<AuthCtx>({
  user: null,
  token: null,
  restoring: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [restoring, setRestoring] = useState(true);

  useEffect(() => {
    const t = localStorage.getItem("token");
    const u = localStorage.getItem("user");
    if (t && u) {
      setToken(t);
      setUser(JSON.parse(u));
    }
    setRestoring(false);
  }, []);

  const persist = ({ token, user }: AuthResponse) => {
    setToken(token);
    setUser(user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const login = async (email: string, password: string) => {
    const res = await loginSrv(email, password);
    persist(res);
  };

  const register = async (name: string, email: string, password: string) => {
    const res = await registerSrv(name, email, password);
    persist(res);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <Ctx.Provider value={{ user, token, restoring, login, register, logout }}>
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => useContext(Ctx);
