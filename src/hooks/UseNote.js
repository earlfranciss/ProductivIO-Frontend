import { useEffect, useState } from "react";
import { NoteService } from "../services/NoteService";

export function UseNote(userId) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load notes when userId changes
  useEffect(() => {
    if (!userId) return;
    loadNotes();
  }, [userId]);

  const loadNotes = async () => {
    try {
      setLoading(true);
      const data = await NoteService.getNotes(userId);
      setNotes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createNote = async (note) => {
    try {
      const newNote = await NoteService.createNote(note);
      setNotes((prev) => [...prev, newNote]);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateNote = async (id, note) => {
    try {
      await NoteService.updateNote(id, note);
      setNotes((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...note } : t))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteNote = async (id) => {
    try {
      await NoteService.deleteNote(id, userId);
      setNotes((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    notes,
    loading,
    error,
    createNote,
    updateNote,
    deleteNote,
    reload: loadNotes,
  };
}
