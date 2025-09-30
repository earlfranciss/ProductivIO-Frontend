export const taskService = {
  createTask: (tasks, newTask) => [
    ...tasks,
    { ...newTask, id: Date.now(), createdAt: new Date().toISOString() }
  ],
  deleteTask: (tasks, id) => tasks.filter(t => t.id !== id),
  updateStatus: (tasks, id, status) =>
    tasks.map(t => (t.id === id ? { ...t, status } : t)),
};
