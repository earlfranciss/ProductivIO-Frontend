import { useState, useEffect } from "react";
import { UseNote } from '../hooks/UseNote';
import { useAuth } from "../context/authContext";
import MainLayout from "../components/MainLayout";
import NoteModal from "../components/ui/Notes/NoteModal";
import NoteCard from "../components/ui/Notes/NoteCard";
import { ToastContainer } from "../components/ToastContainer";
import {
  Plus,
  Search,
  X,
  Save,
  FileEdit
} from 'lucide-react';

export default function Notes() {
  const { user, loading: authLoading } = useAuth();
  const { notes, createNote, updateNote, deleteNote, loading: noteLoading } = UseNote(user.id);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    position: notes.length,
  });

  const openCreateNoteModal = () => {
    setNewNote({ title: '', content: '', });
    setIsEditing(false);
    setShowNoteModal(true);
  };

  const handleSaveNote = async (note) => {
    try {
      const noteWithUser = { ...note, userId: user.id };

      if (isEditing) {
        await updateNote(note.id, noteWithUser);
        addToast('success', 'Changes saved!', 'Your changes have been saved');
      } else {
        await createNote(noteWithUser);
        addToast('success', 'Notes created!', 'Your notes has been successfully created.');

      }

      setShowNoteModal(false);
      setIsEditing(false);
      setNewNote({
        title: "",
        description: "",
        priority: "low",
        status: "todo",
        dueDate: new Date(),
      });
    } catch (error) {
      console.error("Failed to save note:", error);
    }
  };


  const handleDeleteNote = async (id) => {
    await deleteNote(id);
    addToast('info', 'Task deleted!', 'Your task has been successfully deleted.');
  };

  const updateNoteStatus = async (id, newStatus) => {
    const note = notes.find(t => t.id === id);
    if (!note) return;
    await updateNote(id, { ...note, status: newStatus });
  };


  const handleEditNote = (note) => {
    setNewNote(note);
    setIsEditing(true);
    setShowNoteModal(true);
  };

  const addToast = (type, title, message, duration = 3000) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, type, title, message }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, duration);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <MainLayout>
      <div className="min-h-screen text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">My Notes</h1>
              <p className="text-zinc-400">Capture your thoughts and ideas</p>
            </div>
            <button
              onClick={openCreateNoteModal}
              className="bg-emerald-800 hover:bg-emerald-700 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
            >
              <Plus className="w-5 h-5" />
              New Note
            </button>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
              <input
                type="text"
                placeholder="Search notes..."
                className="w-full max-w-md bg-zinc-800 border border-zinc-800 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-1 focus:ring-zinc-500"
              />
            </div>
          </div>

          {notes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24">
              <FileEdit className="w-24 h-24 text-zinc-700 mb-6" />
              <h3 className="text-2xl font-bold mb-2">No notes yet</h3>
              <p className="text-zinc-400 mb-6">Create your first note to get started</p>
              <button
                onClick={openCreateNoteModal}
                className="bg-emerald-800 hover:bg-emerald-700 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Create Your First Note
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map(note => (
                <NoteCard
                  note={note}
                  onDelete={handleDeleteNote}
                  onEdit={handleEditNote}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <NoteModal
        notes = { notes }
        isOpen={showNoteModal}
        onClose={() => setShowNoteModal(false)}
        onSave={handleSaveNote}
        noteData={newNote}
        setNoteData={setNewNote}
        isEditing={isEditing}
      />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </MainLayout>
  )
}
