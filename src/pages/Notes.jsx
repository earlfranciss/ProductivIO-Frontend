import { useState, useEffect } from "react";
import MainLayout from "../components/MainLayout";
import { 
  FileText, 
  CheckSquare, 
  Target, 
  Clock, 
  Plus, 
  Search,
  X,
  Edit2,
  Trash2,
  Save,
  Coffee,
  Timer,
  TrendingUp,
  Settings as SettingsIcon,
  AlertCircle,
  FileEdit
} from 'lucide-react';


export default function Notes() {
  const [showNoteModal, setShowNoteModal] = useState(false);
const [notes, setNotes] = useState([]);
  return (
    <MainLayout>
    <div className="min-h-screen text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">My Notes</h1>
            <p className="text-slate-400">Capture your thoughts and ideas with rich formatting</p>
          </div>
          <button 
            onClick={() => setShowNoteModal(true)}
            className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Note
          </button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              placeholder="Search notes..."
              className="w-full max-w-md bg-slate-800 border border-slate-700 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24">
            <FileEdit className="w-24 h-24 text-slate-700 mb-6" />
            <h3 className="text-2xl font-bold mb-2">No notes yet</h3>
            <p className="text-slate-400 mb-6">Create your first note to get started</p>
            <button 
              onClick={() => setShowNoteModal(true)}
              className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create Your First Note
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map(note => (
              <div key={note.id} className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors">
                <h3 className="text-xl font-bold mb-2">{note.title}</h3>
                <p className="text-slate-400 text-sm">{note.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>

     {showNoteModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-slate-800 rounded-xl p-6 max-w-4xl w-full border border-slate-700">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Create New Note</h2>
                  <button onClick={() => setShowNoteModal(false)} className="text-slate-400 hover:text-white">
                    <X className="w-6 h-6" />
                  </button>
                </div>
    
                <input
                  type="text"
                  placeholder="Note title..."
                  className="w-full bg-slate-900 border border-emerald-500 rounded-lg px-4 py-3 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
    
                <div className="bg-slate-900 rounded-lg border border-slate-700 mb-4">
                  <div className="border-b border-slate-700 p-2 flex gap-1">
                    <button className="p-2 hover:bg-slate-800 rounded"><span className="font-bold">B</span></button>
                    <button className="p-2 hover:bg-slate-800 rounded"><span className="italic">I</span></button>
                    <button className="p-2 hover:bg-slate-800 rounded"><span className="underline">U</span></button>
                  </div>
                  <textarea
                    placeholder="Start writing..."
                    rows="12"
                    className="w-full bg-slate-900 px-4 py-3 text-white focus:outline-none resize-none"
                  />
                </div>
    
                <div className="flex gap-4 justify-end">
                  <button 
                    onClick={() => setShowNoteModal(false)}
                    className="px-6 py-3 rounded-lg font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <X className="w-5 h-5" />
                    Cancel
                  </button>
                  <button 
                    className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
                  >
                    <Save className="w-5 h-5" />
                    Save Note
                  </button>
                </div>
              </div>
            </div>
          )}


    </MainLayout>
  )
}
