import { api } from "../lib/api";

export type Task = {
  id: string; // si usas _id en Mongo, mapéalo al traerlo
  _id?: string;
  title: string;
  category: "Todo" | "Personal" | "Trabajar" | "Compartido";
  done: boolean;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
};

export async function listTasks(params?: { q?: string; category?: string }) {
  const { data } = await api.get<Task[]>("/tasks", { params });
  return data.map(t => ({ ...t, id: t._id ?? t.id })); // por si llega _id
}
export async function createTask(payload: { title: string; category: Task["category"]; dueDate?: string }) {
  const { data } = await api.post<Task>("/tasks", payload);
  return { ...data, id: data._id ?? data.id };
}
export async function updateTask(id: string, patch: Partial<Pick<Task, "title"|"category"|"done"|"dueDate">>) {
  const { data } = await api.patch<Task>(`/tasks/${id}`, patch);
  return { ...data, id: data._id ?? data.id };
}
export async function deleteTask(id: string) {
  await api.delete(`/tasks/${id}`);
}
