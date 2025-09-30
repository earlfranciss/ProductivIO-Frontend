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
  AlertCircle
} from 'lucide-react';
// import UseTask from '../hooks/UseTask'
import TaskCard from '../components/ui/Tasks/TaskCard'
import TaskModal from '../components/ui/Tasks/TaskModal'
import TaskFilter from '../components/ui/Tasks/TaskFilter'

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const todoTasks = tasks.filter(t => t.status === 'todo');
    const inProgressTasks = tasks.filter(t => t.status === 'inprogress');
    const doneTasks = tasks.filter(t => t.status === 'done');
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'todo'
  });

  
  const handleCreateTask = () => {
    if (newTask.title.trim()) {
      setTasks([...tasks, { ...newTask, id: Date.now(), createdAt: new Date().toLocaleDateString() }]);
      setNewTask({ title: '', description: '', priority: 'medium', status: 'todo' });
      setShowTaskModal(false);
      setNotification('Task created successfully');
      setTimeout(() => setNotification(''), 3000);
    }
  };
  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const updateTaskStatus = (id, newStatus) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };
    return (
      <MainLayout>
      <div className="min-h-screen text-white p-8">
        <div className="max-w-7xl mx-auto">
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
        </div>
      </div>



      {showTaskModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-xl p-6 max-w-lg w-full border border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Create New Task</h2>
              <button onClick={() => setShowTaskModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Task Title</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="Enter task title..."
                  className="w-full bg-slate-900 border border-emerald-500 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Description (Optional)</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="Add task description..."
                  rows="3"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Priority</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Status</label>
                  <select
                    value={newTask.status}
                    onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="todo">To Do</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-end mt-6">
              <button 
                onClick={() => setShowTaskModal(false)}
                className="px-6 py-3 rounded-lg font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <X className="w-5 h-5" />
                Cancel
              </button>
              <button 
                onClick={handleCreateTask}
                className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
              >
                <Save className="w-5 h-5" />
                Save Task
              </button>
            </div>
          </div>
        </div>
      )}
      </MainLayout>
    );
}
