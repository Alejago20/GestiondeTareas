// src/context/AuthContext.tsx
import { createContext, useState} from "react";
import type { ReactNode } from "react";
import { registerRequest } from "../api/user";
import type { User, AuthContextType } from "./types";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
 const [errors, setErrors] = useState<string[]>([]);

  const signup = async (name: string, email: string, password: string) => {
    try {
       const res = await registerRequest({ username: name, email, password });
    console.log(res.data);
    setUser(res.data);
    setIsAuthenticated(true);
    } catch (error: unknown) {
  const err = error as any;
  console.log(err.response?.data);
  setErrors(err.response?.data?.message);
}

  };

  return (
    <AuthContext.Provider value={{ user, signup,  isAuthenticated,errors}}>
      {children}
    </AuthContext.Provider>
  );
};


