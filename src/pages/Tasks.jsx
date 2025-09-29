export default function Tasks() {
  const todoTasks = tasks.filter(t => t.status === 'todo');
    const inProgressTasks = tasks.filter(t => t.status === 'inprogress');
    const doneTasks = tasks.filter(t => t.status === 'done');

    return (
      <div className="min-h-screen bg-slate-900 text-white p-8">
        {/* <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Task Management</h1>
              <p className="text-slate-400">Organize and track your tasks with priorities and status</p>
            </div>
            <button 
              onClick={() => setShowTaskModal(true)}
              className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
            >
              <Plus className="w-5 h-5" />
              New Task
            </button>
          </div>

          <div className="mb-6">
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                placeholder="Search tasks..."
                className="w-full max-w-md bg-slate-800 border border-slate-700 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                <option>All Status</option>
                <option>To Do</option>
                <option>In Progress</option>
                <option>Done</option>
              </select>
              <select className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                <option>All Priority</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>

          {tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24">
              <CheckSquare className="w-24 h-24 text-slate-700 mb-6" />
              <h3 className="text-2xl font-bold mb-2">No tasks yet</h3>
              <p className="text-slate-400 mb-6">Create your first task to get started</p>
              <button 
                onClick={() => setShowTaskModal(true)}
                className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Create Your First Task
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-slate-500"></div>
                  <h3 className="text-lg font-bold">To Do</h3>
                  <span className="bg-slate-700 px-2 py-1 rounded text-sm">{todoTasks.length}</span>
                </div>
                <div className="space-y-4">
                  {todoTasks.map(task => (
                    <TaskCard key={task.id} task={task} onDelete={deleteTask} onStatusChange={updateTaskStatus} />
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <h3 className="text-lg font-bold">In Progress</h3>
                  <span className="bg-emerald-500/20 text-emerald-500 px-2 py-1 rounded text-sm">{inProgressTasks.length}</span>
                </div>
                <div className="space-y-4">
                  {inProgressTasks.map(task => (
                    <TaskCard key={task.id} task={task} onDelete={deleteTask} onStatusChange={updateTaskStatus} />
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <h3 className="text-lg font-bold">Done</h3>
                  <span className="bg-emerald-500/20 text-emerald-500 px-2 py-1 rounded text-sm">{doneTasks.length}</span>
                </div>
                <div className="space-y-4">
                  {doneTasks.map(task => (
                    <TaskCard key={task.id} task={task} onDelete={deleteTask} onStatusChange={updateTaskStatus} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div> */}
      </div>
    );
}
