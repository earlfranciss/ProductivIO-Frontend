import { api } from "../utils/api";

export const FlashcardService = {
  async getFlashcards(userId) {
    return await api.getFlashcards(userId);
  },

  async getFlashcard(id, userId) {
    return await api.getFlashcard(id, userId);
  },

  async createFlashcard(flashcard) {
    return await api.createFlashcard(flashcard);
  },

  async updateFlashcard(id, flashcard) {
    return await api.updateFlashcard(id, flashcard);
  },

  async deleteFlashcard(id, userId) {
    return await api.deleteFlashcard(id, userId);
  },

  async createFlashcardQuestion(flashcardId, question) {
    return await api.createFlashcardQuestion(flashcardId, question);
  },

  async updateFlashcardQuestion(questionId, question) {
    return await api.updateFlashcardQuestion(questionId, question);
  },

  async deleteFlashcardQuestion(questionId) {
    return await api.deleteFlashcardQuestion(questionId);
  },

  async createFlashcardAnswer(questionId, answer) {
    return await api.createFlashcardAnswer(questionId, answer);
  },

  async updateFlashcardAnswer(answerId, answer) {
    return await api.updateFlashcardAnswer(answerId, answer);
  },

  async deleteFlashcardAnswer(answerId) {
    return await api.deleteFlashcardAnswer(answerId);
  },


};

