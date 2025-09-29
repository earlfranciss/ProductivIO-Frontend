import React from "react";
import MainLayout from "../components/MainLayout";
import { FileText, CheckSquare, Target, Clock, Plus, Timer } from 'lucide-react';

export default function Dashboard({ notes, tasks, setCurrentView }) {
  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-900 text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Welcome back, Earl Francis Ong!</h1>
            <p className="text-slate-400">Here's your productivity overview for today.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {/* Total Notes */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <div className="text-3xl font-bold">{notes.length}</div>
                  <div className="text-sm text-slate-400">Total Notes</div>
                </div>
              </div>
            </div>

            {/* Active Tasks */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <CheckSquare className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <div className="text-3xl font-bold">{tasks.length}</div>
                  <div className="text-sm text-slate-400">Active Tasks</div>
                  <div className="text-xs text-slate-500">{tasks.filter(t => t.status === 'done').length} completed</div>
                </div>
              </div>
            </div>

            {/* Completion Rate */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <div className="text-3xl font-bold">0</div>
                  <div className="text-sm text-slate-400">Completion Rate</div>
                </div>
              </div>
            </div>

            {/* Focus Time */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <div className="text-3xl font-bold">0h</div>
                  <div className="text-sm text-slate-400">Focus Time</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
            <div className="flex gap-4">
              <button
                onClick={() => setCurrentView('notes')}
                className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
              >
                <Plus className="w-5 h-5" />
                New Note
              </button>
              <button
                onClick={() => setCurrentView('tasks')}
                className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add Task
              </button>
              <button
                onClick={() => setCurrentView('focus')}
                className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
              >
                <Timer className="w-5 h-5" />
                Start Focus Session
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
