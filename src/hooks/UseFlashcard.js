import { useEffect, useState } from "react";
import { FlashcardService } from "../services/FlashcardService";

export function UseFlashcard(userId) {
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load flashcards when userId changes
  useEffect(() => {
    if (!userId) return;
    loadFlashcards();
  }, [userId]);

  const loadFlashcards = async () => {
    try {
      setLoading(true);
      const data = await FlashcardService.getFlashcards(userId);
      setFlashcards(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createFlashcard = async (flashcard) => {
    try {
      const newFlashcard = await FlashcardService.createFlashcard(flashcard);
      setFlashcards((prev) => [...prev, newFlashcard]);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateFlashcard = async (id, flashcard) => {
    try {
      await FlashcardService.updateFlashcard(id, flashcard);
      setFlashcards((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...flashcard } : t))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteFlashcard = async (id) => {
    try {
      await FlashcardService.deleteFlashcard(id, userId);
      setFlashcards((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    flashcards,
    loading,
    error,
    createFlashcard,
    updateFlashcard,
    deleteFlashcard,
    reload: loadFlashcards,
  };
}
