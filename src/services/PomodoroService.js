import { api } from "../utils/api";

export const PomodoroService = {
  async getPomodoros(userId) {
    return await api.getPomodoros(userId);
  },

  async getPomodoro(id, userId) {
    return await api.getPomodoro(id, userId);
  },

  async createPomodoro(pomodoro) {
    return await api.createPomodoro(pomodoro);
  },

  async updatePomodoro(id, pomodoro) {
    return await api.updatePomodoro(id, pomodoro);
  },

  async deletePomodoro(id, userId) {
    return await api.deletePomodoro(id, userId);
  },

  async completedSessionPomodoro(userId) {
    return await api.completedSessionPomodoro(userId);
  },

  async sessionDurationPomodoro(userId) {
    return await api.sessionDurationPomodoro(userId);
  },
};
