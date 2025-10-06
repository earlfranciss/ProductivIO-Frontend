import { api } from "../utils/api";

export const QuizService = {
  async getQuizzes(userId) {
    return await api.getQuizzes(userId);
  },

  async getQuiz(id, userId) {
    return await api.getQuiz(id, userId);
  },

  async createQuiz(quiz) {
    return await api.createQuiz(quiz);
  },

  async updateQuiz(id, quiz) {
    return await api.updateQuiz(id, quiz);
  },

  async deleteQuiz(id, userId) {
    return await api.deleteQuiz(id, userId);
  },

  async updateQuizQuestion(quizId, questionId, question) {
    return await api.updateQuizQuestion(quizId, questionId, question);
  },

  async deleteQuizQuestion(questionId) {
    return await api.deleteQuizQuestion(questionId);
  },

  async createQuizAnswer(questionId, answer) {
    return await api.createQuizAnswer(questionId, answer);
  },

  async updateQuizAnswer(questionId, answerId, answer) {
    return await api.updateQuizAnswer(questionId, answerId, answer);
  },

  async deleteQuizAnswer(answerId) {
    return await api.deleteQuizAnswer(answerId);
  },


};
