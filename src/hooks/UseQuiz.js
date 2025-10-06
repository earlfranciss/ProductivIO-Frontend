import { useEffect, useState } from "react";
import { QuizService } from "../services/QuizService";

export function UseQuiz(userId) {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load quizzes when userId changes
  useEffect(() => {
    if (!userId) return;
    loadQuizzes();
  }, [userId]);

  const loadQuizzes = async () => {
    try {
      setLoading(true);
      const data = await QuizService.getQuizzes(userId);
      setQuizzes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createQuiz = async (quiz) => {
    try {
      const newQuiz = await QuizService.createQuiz(quiz);
      setQuizzes((prev) => [...prev, newQuiz]);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateQuiz = async (id, quiz) => {
    try {
      await QuizService.updateQuiz(id, quiz);
      setQuizzes((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...quiz } : t))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteQuiz = async (id) => {
    try {
      await QuizService.deleteQuiz(id, userId);
      setQuizzes((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    quizzes,
    loading,
    error,
    createQuiz,
    updateQuiz,
    deleteQuiz,
    reload: loadQuizzes,
  };
}
