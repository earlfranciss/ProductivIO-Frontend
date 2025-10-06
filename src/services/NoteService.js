import { api } from "../utils/api";

export const NoteService = {
  async getNotes(userId) {
    return await api.getNotes(userId);
  },

  async getNote(id, userId) {
    return await api.getNote(id, userId);
  },

  async createNote(note) {
    return await api.createNote(note);
  },

  async updateNote(id, note) {
    return await api.updateNote(id, note);
  },

  async deleteNote(id, userId) {
    return await api.deleteNote(id, userId);
  },
};
