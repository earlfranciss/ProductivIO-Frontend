import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { UseTask } from '../hooks/UseTask';
import { useAuth } from "../context/authContext";
import MainLayout from "../components/MainLayout";
import TaskModal from '../components/ui/Tasks/TaskModal'
import TaskColumn from "../components/ui/Tasks/TaskColumn";
import { ToastContainer } from "../components/ToastContainer";
import {
  CheckSquare,
  Plus,
  Search,
} from 'lucide-react';

export default function Tasks() {
  const { user, loading: authLoading } = useAuth();
  const { tasks, createTask, updateTask, deleteTask, loading: taskLoading } = UseTask(user.id);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const todoTasks = tasks.filter(t => t.status === 'todo');
  const inProgressTasks = tasks.filter(t => t.status === 'inprogress');
  const doneTasks = tasks.filter(t => t.status === 'done');
  const [isEditing, setIsEditing] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'low',
    status: 'todo',
    dueDate: new Date(),
    position: tasks.length,
  });

  const handleDragEnd = async (result) => {
    const { draggableId, destination } = result;
    if (!destination) return;

    const updatedTask = tasks.find(t => String(t.id) === draggableId);
    if (!updatedTask) return;

    const newStatus = destination.droppableId;
    await updateTask(updatedTask.id, { ...updatedTask, status: newStatus });
  };

  const openCreateTaskModal = () => {
    setNewTask({ title: '', description: '', priority: 'low', status: 'todo', dueDate: new Date() });
    setIsEditing(false);
    setShowTaskModal(true);
  };

  const handleSaveTask = async (task) => {
    try {
      const taskWithUser = { ...task, userId: user.id };

      if (isEditing) {
        await updateTask(task.id, taskWithUser);
        addToast('success', 'Changes saved!', 'Your changes have been saved');
      } else {
        await createTask(taskWithUser);
        addToast('success', 'Task created!', 'Your task has been successfully created.');
      }

      setShowTaskModal(false);
      setIsEditing(false);
      setNewTask({
        title: "",
        description: "",
        priority: "low",
        status: "todo",
        dueDate: new Date(),
      });
    } catch (error) {
      console.error("Failed to save task:", error);
    }
  };


  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    addToast('info', 'Task deleted!', 'Your task has been successfully deleted.');
  };

  const updateTaskStatus = async (id, newStatus) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    await updateTask(id, { ...task, status: newStatus });
  };


  const handleEditTask = (task) => {
    setNewTask(task);
    setIsEditing(true);
    setShowTaskModal(true);
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
              <h1 className="text-4xl font-bold mb-2">Task Management</h1>
              <p className="text-zinc-400">Organize and track your tasks</p>
            </div>
            <button
              onClick={openCreateTaskModal}
              className="bg-emerald-700 hover:bg-emerald-600 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
            >
              <Plus className="w-5 h-5" />
              New Task
            </button>
          </div>

          <div className="mb-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative col-span-2">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  className="w-full bg-zinc-800 border border-zinc-800 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-1 focus:ring-zinc-500"
                />
              </div>
            </div>
          </div>


          {tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24">
              <CheckSquare className="w-24 h-24 text-zinc-700 mb-6" />
              <h3 className="text-2xl font-bold mb-2">No tasks yet</h3>
              <p className="text-zinc-400 mb-6">Create your first task to get started</p>
              <button
                onClick={openCreateTaskModal}
                className="bg-emerald-700 hover:bg-emerald-600 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Create Your First Task
              </button>
            </div>
          ) : (
            <DragDropContext onDragEnd={handleDragEnd}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <TaskColumn
                  droppableId="todo"
                  title="To Do"
                  tasks={todoTasks}
                  onDelete={handleDeleteTask}
                  onStatusChange={updateTaskStatus}
                  onEdit={handleEditTask}
                />
                <TaskColumn
                  droppableId="inprogress"
                  title="In Progress"
                  tasks={inProgressTasks}
                  onDelete={handleDeleteTask}
                  onStatusChange={updateTaskStatus}
                  onEdit={handleEditTask}
                />
                <TaskColumn
                  droppableId="done"
                  title="Done"
                  tasks={doneTasks}
                  onDelete={handleDeleteTask}
                  onStatusChange={updateTaskStatus}
                  onEdit={handleEditTask}
                />
              </div>
            </DragDropContext>
          )}

          <TaskModal
            isOpen={showTaskModal}
            onClose={() => setShowTaskModal(false)}
            onSave={handleSaveTask}
            taskData={newTask}
            setTaskData={setNewTask}
            isEditing={isEditing}
          />
        </div>
        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </div>
      
    </MainLayout>
  );
}