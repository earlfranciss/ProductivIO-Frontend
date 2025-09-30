// hooks/useTasks.js
import { useState } from "react";
import { taskService } from "../services/TaskService";

export function UseTask() {
  const [tasks, setTasks] = useState([]);

  const createTask = (newTask) => {
    setTasks(taskService.createTask(tasks, newTask));
  };

  const deleteTask = (id) => {
    setTasks(taskService.deleteTask(tasks, id));
  };

  const updateStatus = (id, status) => {
    setTasks(taskService.updateStatus(tasks, id, status));
  };

  return { tasks, createTask, deleteTask, updateStatus };
}
