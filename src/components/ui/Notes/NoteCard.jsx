import { Edit2, Trash2 } from 'lucide-react';

export default function NoteCard({ note, onDelete, onEdit }) {
  return (
    <div className="bg-zinc-800/60 rounded-xl p-4 border border-zinc-700 hover:border-zinc-600 transition-colors flex flex-col justify-between h-32">
      {/* Title and buttons */}
      <div>
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-bold truncate">{note.title}</h4>
          <div className="flex gap-2 pl-2">
            <button onClick={() => onEdit(note)} className="text-zinc-400 hover:text-white">
              <Edit2 className="w-4 h-4" />
            </button>
            <button onClick={() => onDelete(note.id)} className="text-zinc-400 hover:text-red-500">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Note content */}
        <div
          className="truncate-2-lines text-zinc-300 text-sm"
          dangerouslySetInnerHTML={{ __html: note.content }}
        ></div>
      </div>

      {/* Date Created */}
      <div className="text-xs text-zinc-600 mt-auto">
        Created: {new Date(note.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
}
