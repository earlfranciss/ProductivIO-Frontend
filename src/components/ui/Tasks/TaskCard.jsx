import {
  Edit2,
  Trash2,
  AlertCircle,
  Loader,
  CircleCheck,
  StickyNote
} from 'lucide-react';

export default function TaskCard({ task, onDelete, onStatusChange, onEdit }) {
  const priorityColors = {
    high: 'text-red-300 bg-red-500/30',
    medium: 'text-yellow-300 bg-yellow-500/20',
    low: 'text-emerald-300 bg-emerald-500/20'
  };

  const priorityLabel = {
    high: "High",
    medium: "Medium",
    low: "Low",
  }

  const statusColors = {
    todo: 'text-amber-500 bg-amber-700/40',
    inprogress: 'text-yellow-500 bg-yellow-500/20',
    done: 'text-emerald-500 bg-emerald-500/20'
  };

  const statusLabels = {
    todo: "To do",
    inprogress: "In progress",
    done: "Done",
  };


  return (
    <div className="bg-zinc-800/60 rounded-xl p-4 border border-zinc-700 hover:border-zinc-600 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-bold truncate">{task.title}</h4>
        <div className="flex gap-2 pl-2">
          <button onClick={() => onEdit(task)} className="text-zinc-400 hover:text-white">
            <Edit2 className="w-4 h-4" />
          </button>
          <button onClick={() => onDelete(task.id)} className="text-zinc-400 hover:text-red-500">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      {task.description && <p className="text-sm text-zinc-400 mb-3 truncate">{task.description}</p>}
      <div className="flex items-center">
        {/* Priority badge */}
        <span
          className={`px-2 py-1 rounded text-xs flex items-center gap-1 ${priorityColors[task.priority]}`}
        >
          <AlertCircle className="w-3 h-3" />
          {priorityLabel[task.priority]}
        </span>

        {/* Status badge */}
        <span
          className={`px-2 py-1 mx-2 rounded text-xs flex items-center gap-1 ${statusColors[task.status]}`}
        >
          {task.status === "todo" && <StickyNote className="w-3 h-3" />}
          {task.status === "inprogress" && <Loader className="w-3 h-3" />}
          {task.status === "done" && <CircleCheck className="w-3 h-3" />}
          <span>{statusLabels[task.status]}</span>
        </span>

      </div>
      <div className='flex justify-between  mt-3'>
        <div className="text-xs text-zinc-400">
          Due: {new Date(task.dueDate).toLocaleDateString()}{", "}
          {new Date(task.dueDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })}
        </div>
        <div className="text-xs text-zinc-600">Created: {new Date(task.createdAt).toLocaleDateString()}</div>
      </div>
    </div>
  );
};