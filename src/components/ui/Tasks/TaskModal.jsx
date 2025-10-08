import { X, Save } from "lucide-react";
import React, { useState, useEffect } from "react";
import DateTimePicker from "react-datetime-picker";
import { ToastContainer } from "../../ToastContainer";

export default function TaskModal({ tasks, isOpen, onClose, onSave, taskData, setTaskData, isEditing }) {
  const [toasts, setToasts] = useState([]);

  const handleSubmit = () => {
    const Duplicate = tasks.some(
      (task) => 
        task.title.toLowerCase() === taskData.title.toLowerCase() 
    );

    if (Duplicate && isEditing == false) {
      addToast('error', 'Title already exist!', `${taskData.title} already exists as task.`);
      return;
    }

    onSave(taskData);
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
      <div className="bg-zinc-800 rounded-xl p-6 max-w-lg w-full border border-zinc-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            {isEditing ? "Edit Task" : "Create New Task"}
          </h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Task Title</label>
            <input
              type="text"
              value={taskData.title}
              onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
              placeholder="Enter task title..."
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-zinc-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Description (Optional)</label>
            <textarea
              value={taskData.description}
              onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
              placeholder="Add task description..."
              rows="3"
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-zinc-500"
            />
          </div>

          {/* Priority + Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Priority</label>
              <select
                value={taskData.priority}
                onChange={(e) => setTaskData({ ...taskData, priority: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-zinc-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Status</label>
              <select
                value={taskData.status}
                onChange={(e) => setTaskData({ ...taskData, status: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-zinc-500"
              >
                <option value="todo">To Do</option>
                <option value="inprogress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Due date</label>
            <DateTimePicker
              onChange={(date) => setTaskData({ ...taskData, dueDate: date })}
              value={taskData.dueDate}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg text-white px-4 py-3"
              calendarIcon={null}
              clearIcon={null}
              disableClock={true}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-end mt-6">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-lg font-medium text-zinc-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <X className="w-5 h-5" />
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
          >
            <Save className="w-5 h-5" />
            {isEditing ? "Update Task" : "Save Task"}
          </button>
        </div>
      </div>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};
