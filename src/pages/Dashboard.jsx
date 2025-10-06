import React from "react";
import MainLayout from "../components/MainLayout";
import { UsePomodoro } from '../hooks/UsePomodoro';
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { FileText, CheckSquare, Target, Clock, Plus, Timer, Layers, Brain, FileEdit, CircleCheckBig } from 'lucide-react';

export default function Dashboard({ notes, tasks, setCurrentView }) {
  const { user, loading: authLoading } = useAuth();
  const { pomodoros, completedCount, totalDuration, loading } = UsePomodoro(user.id);
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="min-h-screen  text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Welcome back, {user.firstName}!</h1>
            <p className="text-zinc-400">Here's your productivity overview for today.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {/* Total Notes */}
            <div className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700 hover:bg-zinc-700/30">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <div className="text-sm text-zinc-400">Total Notes</div>
                  <div className="text-3xl font-bold">{notes.length}</div>
                  <div className="text-xs text-zinc-500">Knowledge captured</div>
                </div>
              </div>
            </div>

            {/* Active Tasks */}
            <div className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700 hover:bg-zinc-700/30">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                  <CheckSquare className="w-6 h-6 text-indigo-500" />
                </div>
                <div>
                  <div className="text-sm text-zinc-400">Active Tasks</div>
                  <div className="text-3xl font-bold">{tasks.length}</div>
                  <div className="text-xs text-zinc-500">{tasks.filter(t => t.status === 'done').length} completed</div>
                </div>
              </div>
            </div>

            {/* Completion Rate */}
            <div className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700 hover:bg-zinc-700/30">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <div className="text-sm text-zinc-400">Completion Rate</div>
                  <div className="text-3xl font-bold">0</div>
                  <div className="text-xs text-zinc-500">Task success rate</div>
                </div>
              </div>
            </div>

            {/* Focus Time */}
            <div className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700 hover:bg-zinc-700/30">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <div className="text-sm text-zinc-400">Focus Time</div>
                  <div className="text-2xl font-bold truncate">{Math.floor(totalDuration)}h {Math.floor((totalDuration % 1) * 60)}m</div>
                  <div className="text-xs text-zinc-500">This week</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/tasks")}
                className="bg-zinc-800 hover:bg-emerald-700 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add Task
              </button>
              <button
                onClick={() => navigate("/notes")}
                className="bg-zinc-800 hover:bg-emerald-700 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
              >
                <Plus className="w-5 h-5" />
                New Note
              </button>
              <button
                onClick={() => navigate("/flashcards")}
                className="bg-zinc-800 hover:bg-emerald-700 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
              >
                <Plus className="w-5 h-5" />
                New Flashcards
              </button>
              <button
                onClick={() => navigate("/quiz")}
                className="bg-zinc-800 hover:bg-emerald-700 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Create a Quiz
              </button>
              <button
                onClick={() => navigate("/pomodoro")}
                className="bg-zinc-800 hover:bg-emerald-700 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
              >
                <Timer className="w-5 h-5" />
                Start Focus Session
              </button>
            </div>
          </div>
          <div>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Recent Notes */}
              <div className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-emerald-500" />
                    <h3 className="text-xl font-bold">Recent Notes</h3>
                  </div>
                  <button onClick={() => navigate("/notes")} className="text-emerald-500 text-sm hover:underline">View all</button>
                </div>

                {notes.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <FileText className="w-16 h-16 text-emerald-600 mb-4" />
                    <p className="text-sm text-zinc-500">No notes yet. Create your first note!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {notes.slice(0, 2).map((note) => (
                      <div key={note.id} className="bg-zinc-900 rounded-lg p-4 border border-zinc-700 hover:border-zinc-600 transition-colors">
                        <h4 className="font-medium mb-1">{note.title}</h4>
                        <p className="text-sm text-zinc-400 line-clamp-2">{note.content}</p>
                        <p className="text-xs text-zinc-500 mt-2">{note.date}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Active Tasks */}
              <div className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <CheckSquare className="w-5 h-5 text-blue-500" />
                    <h3 className="text-xl font-bold">Active Tasks</h3>
                  </div>
                  <button onClick={() => navigate("/tasks")} className="text-blue-500 text-sm hover:underline">View all</button>
                </div>

                {tasks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <CheckSquare className="w-16 h-16 text-blue-600 mb-4" />
                    <p className="text-sm text-zinc-500">No active tasks. Add your first task!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {tasks.slice(0, 2).map((task) => (
                      <div key={task.id} className="bg-zinc-900 rounded-lg p-4 border border-zinc-700 hover:border-zinc-600 transition-colors">
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            className="w-5 h-5 mt-0.5 rounded border-zinc-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-zinc-900"
                            readOnly
                          />
                          <div className="flex-1">
                            <h4 className={'font-medium ' + (task.completed ? 'line-through text-zinc-500' : '')}>
                              {task.title}
                            </h4>
                            {task.description && (
                              <p className="text-sm text-zinc-400 mt-1">{task.description}</p>
                            )}
                            <div className="flex items-center gap-2 mt-2">
                              <span className={'text-xs px-2 py-1 rounded ' +
                                (task.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                                  task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                    'bg-blue-500/20 text-blue-400')}>
                                {task.priority}
                              </span>
                              <span className="text-xs text-zinc-500">{task.dueDate}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}



              </div>


              <div className="flex-column">
                {/* New Quiz */}
                <div className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700 mb-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <Brain className="w-5 h-5 text-purple-500" />
                      <h3 className="text-xl font-bold">New Quiz</h3>
                    </div>
                    <button onClick={() => navigate("/quiz")} className="text-purple-500 text-sm hover:underline">View all</button>
                  </div>


                  <div className="flex flex-col items-center justify-center py-2">
                    <p className="text-sm text-zinc-500">No quiz yet. Create your first quiz!</p>
                  </div>

                </div>


                {/* New Flashcard */}
                <div className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <Layers className="w-5 h-5 text-amber-500" />
                      <h3 className="text-xl font-bold">New Flashcard</h3>
                    </div>
                    <button onClick={() => navigate("/flashcards")} className="text-amber-500 text-sm hover:underline">View all</button>
                  </div>


                  <div className="flex flex-col items-center justify-center py-2">
                    <p className="text-sm text-zinc-500">No flashcard yet. Create your first flashcard!</p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
