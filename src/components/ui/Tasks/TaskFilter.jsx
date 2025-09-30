// src/components/tasks/TaskFilter.jsx
import React from "react";

const TaskFilter = ({ filter, setFilter }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      {/* Priority Filter */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Priority
        </label>
        <select
          value={filter.priority}
          onChange={(e) =>
            setFilter({ ...filter, priority: e.target.value })
          }
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* Status Filter */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Status
        </label>
        <select
          value={filter.status}
          onChange={(e) =>
            setFilter({ ...filter, status: e.target.value })
          }
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="all">All</option>
          <option value="todo">To Do</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
    </div>
  );
};

export default TaskFilter;
