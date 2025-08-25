import { api } from "../lib/api";
export type User = { id: string; name: string; email: string; createdAt: string };
export type AuthResponse = { token: string; user: User };

export async function loginSrv(email: string, password: string) {
  const { data } = await api.post<AuthResponse>("/auth/login", { email, password });
  return data;
}
export async function registerSrv(name: string, email: string, password: string) {
  const { data } = await api.post<AuthResponse>("/auth/register", { name, email, password });
  return data;
}
