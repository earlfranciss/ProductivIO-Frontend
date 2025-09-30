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

export default function Pomodoro() {

  const [timerMode, setTimerMode] = useState('work');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showTimerSettings, setShowTimerSettings] = useState(false);


  const [timerSettings, setTimerSettings] = useState({
    work: 25,
    shortBreak: 5,
    longBreak: 15,
    sessionsUntilLongBreak: 4
  });
  useEffect(() => {
    let interval;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = (mode) => {
    setTimerMode(mode);
    if (mode === 'work') setTimeLeft(timerSettings.work * 60);
    else if (mode === 'shortBreak') setTimeLeft(timerSettings.shortBreak * 60);
    else setTimeLeft(timerSettings.longBreak * 60);
    setIsTimerRunning(true);
  };

  return (
    <MainLayout>

      <div className="min-h-screen text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Focus Timer</h1>
              <p className="text-slate-400">Stay focused with the Pomodoro Technique</p>
            </div>
            <button
              onClick={() => setShowTimerSettings(true)}
              className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
            >
              <SettingsIcon className="w-5 h-5" />
              Settings
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                  <CheckSquare className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <div className="text-3xl font-bold">0</div>
                  <div className="text-sm text-slate-400">Sessions Today</div>
                  <div className="text-xs text-slate-500">Focus sessions completed</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <div className="text-3xl font-bold">0h</div>
                  <div className="text-sm text-slate-400">Focus Time</div>
                  <div className="text-xs text-slate-500">Total time this week</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <div className="text-3xl font-bold">0</div>
                  <div className="text-sm text-slate-400">Current Streak</div>
                  <div className="text-xs text-slate-500">Sessions in this cycle</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-12 border border-slate-700">
            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={() => startTimer('work')}
                className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors ${timerMode === 'work' ? 'bg-emerald-600' : 'bg-slate-700 hover:bg-slate-600'
                  }`}
              >
                <Timer className="w-5 h-5" />
                Work
              </button>
              <button
                onClick={() => startTimer('shortBreak')}
                className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors ${timerMode === 'shortBreak' ? 'bg-emerald-600' : 'bg-slate-700 hover:bg-slate-600'
                  }`}
              >
                <Coffee className="w-5 h-5" />
                Short Break
              </button>
              <button
                onClick={() => startTimer('longBreak')}
                className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors ${timerMode === 'longBreak' ? 'bg-emerald-600' : 'bg-slate-700 hover:bg-slate-600'
                  }`}
              >
                <Coffee className="w-5 h-5" />
                Long Break
              </button>
            </div>

            <div className="text-center mb-8">
              <div className="text-8xl font-bold text-emerald-500 mb-8">{formatTime(timeLeft)}</div>
              <div className="flex justify-center">
                <div className="relative w-64 h-64">
                  <svg className="w-full h-full -rotate-90">
                    <circle cx="128" cy="128" r="120" fill="none" stroke="#1e293b" strokeWidth="8" />
                    <circle cx="128" cy="128" r="120" fill="none" stroke="#10b981" strokeWidth="8" strokeDasharray="754" strokeDashoffset="0" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-20 h-20 bg-emerald-600 hover:bg-emerald-700 rounded-full flex items-center justify-center transition-colors">
                      <Timer className="w-8 h-8" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showTimerSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-xl p-6 max-w-lg w-full border border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <SettingsIcon className="w-6 h-6" />
                <h2 className="text-2xl font-bold text-white">Timer Settings</h2>
              </div>
              <button onClick={() => setShowTimerSettings(false)} className="text-slate-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Work Session (minutes)</label>
                <input
                  type="number"
                  value={timerSettings.work}
                  onChange={(e) => setTimerSettings({ ...timerSettings, work: parseInt(e.target.value) })}
                  className="w-full bg-slate-900 border border-emerald-500 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Short Break (minutes)</label>
                <input
                  type="number"
                  value={timerSettings.shortBreak}
                  onChange={(e) => setTimerSettings({ ...timerSettings, shortBreak: parseInt(e.target.value) })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Long Break (minutes)</label>
                <input
                  type="number"
                  value={timerSettings.longBreak}
                  onChange={(e) => setTimerSettings({ ...timerSettings, longBreak: parseInt(e.target.value) })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Sessions until Long Break</label>
                <input
                  type="number"
                  value={timerSettings.sessionsUntilLongBreak}
                  onChange={(e) => setTimerSettings({ ...timerSettings, sessionsUntilLongBreak: parseInt(e.target.value) })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="flex gap-4 justify-end mt-6">
              <button
                onClick={() => setShowTimerSettings(false)}
                className="px-6 py-3 rounded-lg font-medium text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowTimerSettings(false)}
                className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  )
}
