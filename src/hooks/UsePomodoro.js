import { useEffect, useState } from "react";
import { PomodoroService } from "../services/PomodoroService";

export function UsePomodoro(userId) {
  const [pomodoros, setPomodoros] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load pomodoros when userId changes
  useEffect(() => {
    if (!userId) return;
    loadPomodoros();
    loadPomodoroStats();
  }, [userId]);

  const loadPomodoros = async () => {
    try {
      setLoading(true);
      const data = await PomodoroService.getPomodoros(userId);
      setPomodoros(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createPomodoro = async (pomodoro) => {
    try {
      const newPomodoro = await PomodoroService.createPomodoro(pomodoro);
      setPomodoros((prev) => [...prev, newPomodoro]);
    } catch (err) {
      setError(err.message);
    }
  };

  const updatePomodoro = async (id, pomodoro) => {
    try {
      await PomodoroService.updatePomodoro(id, pomodoro);
      setPomodoros((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...pomodoro } : t))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const deletePomodoro = async (id) => {
    try {
      await PomodoroService.deletePomodoro(id, userId);
      setPomodoros((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const loadPomodoroStats = async () => {
    try {
      const completed = await PomodoroService.completedSessionPomodoro(userId);
      const durationTicks = await PomodoroService.sessionDurationPomodoro(userId);
      
      const durationHours = durationTicks / 36_000_000_000;

      setCompletedCount(completed);
      setTotalDuration(durationHours);
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    pomodoros,
    completedCount,
    totalDuration,
    loading,
    error,
    createPomodoro,
    updatePomodoro,
    deletePomodoro,
    reload: loadPomodoros,
    reloadStats: loadPomodoroStats,
  };
}
