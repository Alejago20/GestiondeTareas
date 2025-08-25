// src/hooks/useTasks.ts
import { useEffect, useState } from "react";
import type { Task } from "../services/tasks";
import { listTasksSrv, createTaskSrv, updateTaskSrv, deleteTaskSrv } from "../services/tasks";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await listTasksSrv();
        setTasks(data);
      } catch (e: unknown) {
        if (typeof e === "object" && e !== null && "response" in e) {
          // @ts-expect-error: dynamic error shape
          setError(e.response?.data?.error ?? e.message ?? "No se pudieron cargar las tareas");
        } else if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("No se pudieron cargar las tareas");
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // create (optimista)
  async function addTask(
    title: string,
    category: "Todo" | "Personal" | "Trabajar" | "Compartido"
  ) {
    const now = new Date().toISOString();
    const phantom: Task = { id: `tmp-${Date.now()}`, title, category, done: false, createdAt: now, updatedAt: now };
    setTasks(prev => [phantom, ...prev]);
    try {
      const created = await createTaskSrv({ title, category });
      setTasks(prev => [created, ...prev.filter(t => t.id !== phantom.id)]);
    } catch (e: unknown) {
      setTasks(prev => prev.filter(t => t.id !== phantom.id));
      throw e;
    }
  }

  // toggle done (optimista)
  async function toggleDone(id: string, nextDone: boolean) {
    const prev = [...tasks];
    setTasks(list => list.map(t => t.id === id ? { ...t, done: nextDone } : t));
    try {
      await updateTaskSrv(id, { done: nextDone });
    } catch (e) {
      setTasks(prev); // revert
      throw e;
    }
  }

  // delete (optimista)
  async function removeTask(id: string) {
    const prev = [...tasks];
    setTasks(list => list.filter(t => t.id !== id));
    try {
      await deleteTaskSrv(id);
    } catch (e) {
      setTasks(prev);
      throw e;
    }
  }

  return { tasks, loading, error, addTask, toggleDone, removeTask };
}
