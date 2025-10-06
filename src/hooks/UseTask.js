import { useEffect, useState } from "react";
import { TaskService } from "../services/TaskService";

export function UseTask(userId) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load tasks when userId changes
  useEffect(() => {
    if (!userId) return;
    loadTasks();
  }, [userId]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await TaskService.getTasks(userId);
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (task) => {
    try {
      const newTask = await TaskService.createTask(task);
      setTasks((prev) => [...prev, newTask]);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateTask = async (id, task) => {
    try {
      await TaskService.updateTask(id, task);
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...task } : t))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await TaskService.deleteTask(id, userId);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    reload: loadTasks,
  };
}
