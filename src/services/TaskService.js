import { api } from "../utils/api";

export const TaskService = {
  async getTasks(userId) {
    return await api.getTasks(userId);
  },

  async getTask(id, userId) {
    return await api.getTask(id, userId);
  },

  async createTask(task) {
    return await api.createTask(task);
  },

  async updateTask(id, task) {
    return await api.updateTask(id, task);
  },

  async deleteTask(id, userId) {
    return await api.deleteTask(id, userId);
  },
};
