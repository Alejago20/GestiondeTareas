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

const norm = (t: Task) => ({ ...t, id: t._id ?? t.id });

export async function listTasksSrv(): Promise<Task[]> {
  const { data } = await api.get<Task[]>("/tasks");
  return data.map(norm);
}

export async function createTaskSrv(payload: { 
  title: string; 
  category: string 
}): Promise<Task> {
  const { data } = await api.post<Task>("/tasks", payload);
  return norm(data);
}

export async function updateTaskSrv(id: string, payload: Partial<Pick<Task, "title" | "category" | "done">>): Promise<Task> {
  const { data } = await api.patch<Task>(`/tasks/${id}`, payload);
  return norm(data);
}

export async function deleteTaskSrv(id: string): Promise<{ ok: true }> {
  const { data } = await api.delete<{ ok: true }>(`/tasks/${id}`);
  return data;
}