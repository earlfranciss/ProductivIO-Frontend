import TaskCard from './ui/Tasks/TaskCard'

export default function TaskList({ title, color, tasks, onDelete, onStatusChange }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-3 h-3 rounded-full ${color}`} />
        <h3 className="text-lg font-bold">{title}</h3>
        <span className="bg-zinc-700 px-2 py-1 rounded text-sm">{tasks.length}</span>
      </div>
      <div className="space-y-4">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} onDelete={onDelete} onStatusChange={onStatusChange} />
        ))}
      </div>
    </div>
  );
}
