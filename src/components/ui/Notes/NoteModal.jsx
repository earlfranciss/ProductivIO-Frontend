import NoteEditor from "./NoteEditor";
import React, { useState, useEffect } from "react";
import { X, Save } from "lucide-react";
import { ToastContainer } from "../../ToastContainer";

export default function NoteModal({ notes, isOpen, onClose, onSave, noteData, setNoteData, isEditing }) {
  const [toasts, setToasts] = useState([]);

   const handleSubmit = () => {
    const Duplicate = notes.some(
      (note) => 
        note.title.toLowerCase() === noteData.title.toLowerCase() 
    );

    if (Duplicate) {
      addToast('error', 'Note already exist!', `${noteData.title} already exists as notes.`);
      return;
    }

    onSave(noteData);
    onClose();
  };

  if (!isOpen) return null;

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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-zinc-800 rounded-xl p-6 max-w-4xl w-full border border-zinc-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            {isEditing ? "Edit Note" : "Create New Note"}
          </h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Title */}
        <input
          type="text"
          value={noteData.title || ""}
          onChange={(e) => setNoteData({ ...noteData, title: e.target.value })}
          placeholder="Note title..."
          className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white mb-4 focus:outline-none focus:ring-1 focus:ring-zinc-500"
        />

        {/* Editor */}
        <div className="bg-zinc-900 rounded-lg border border-zinc-700 mb-4">
          <NoteEditor
            value={noteData.content || ""}
            onChange={(content) => setNoteData({ ...noteData, content })}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 justify-end">
          <button
            onClick={onClose}
            className="bg-zinc-700 hover:bg-zinc-600 px-6 py-3 rounded-lg font-medium text-white hover:text-white transition-colors flex items-center gap-2"
          >
            <X className="w-5 h-5" />
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
          >
            <Save className="w-5 h-5" />
            {isEditing ? "Update Note" : "Save Note"}
          </button>
        </div>
      </div>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
