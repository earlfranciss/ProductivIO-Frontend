import { useState, useEffect } from "react";
import { UsePomodoro } from '../hooks/UsePomodoro';
import { useAuth } from "../context/authContext";
import MainLayout from "../components/MainLayout";
import PomodoroSettings from "../components/ui/Pomodoro/PomodoroSettings";
import PomodoroTutorial from "../components/ui/Pomodoro/PomodoroTutorial";
import { Clock, Play, Pause, RotateCcw, ChevronDown, Check, Settings } from 'lucide-react';
import { ToastContainer } from "../components/ToastContainer";

export default function Pomodoro() {
  const { user, loading: authLoading } = useAuth();
  const { pomodoros, createPomodoro, completedCount, totalDuration, loading: pomodoroLoading, reloadStats } = UsePomodoro(user.id);

  // Durations
  const [sessionType, setSessionType] = useState('work');
  const [workDuration, setWorkDuration] = useState(25 * 60);
  const [breakDuration, setBreakDuration] = useState(5 * 60);

  // Timer state
  const [endTime, setEndTime] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(workDuration);

  // UI state
  const [showSessionDropdown, setShowSessionDropdown] = useState(false);
  const [showDurationDropdown, setShowDurationDropdown] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [toasts, setToasts] = useState([]);

  const durationOptions = [5, 10, 15, 25, 30, 45, 60];

  // Load saved timer state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('pomodoroState');
    if (saved) {
      const state = JSON.parse(saved);
      setSessionType(state.sessionType);
      setTimeLeft(state.timeLeft);
      setIsRunning(state.isRunning);
      setWorkDuration(state.workDuration);
      setBreakDuration(state.breakDuration);
    }
  }, []);

  // Persist timer state to localStorage
  useEffect(() => {
    const state = { sessionType, timeLeft, isRunning, workDuration, breakDuration };
    localStorage.setItem('pomodoroState', JSON.stringify(state));
  }, [sessionType, timeLeft, isRunning, workDuration, breakDuration]);

  // Timer interval
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      const remaining = Math.max(Math.round((endTime - Date.now()) / 1000), 0);
      setTimeLeft(remaining);

      if (remaining === 0) {
        setIsRunning(false);
        handleSessionEnd();
        const nextType = sessionType === 'work' ? 'break' : 'work';
        handleSessionTypeChange(nextType);
        addToast('info', sessionType, sessionType + 'Session finished.');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, endTime, sessionType]);

  // Update timeLeft when sessionType or durations change
  useEffect(() => {
    const durationSeconds = sessionType === 'work' ? workDuration : breakDuration;
    setTimeLeft(durationSeconds);
  }, [sessionType, workDuration, breakDuration]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Start/pause timer
  const handleStartPause = () => {
    if (!isRunning) {
      const end = Date.now() + timeLeft * 1000;
      setEndTime(end);
      localStorage.setItem('pomodoroEndTime', end.toString());
    }
    setIsRunning(prev => !prev);
  };

  // On mount
  useEffect(() => {
    const savedEnd = localStorage.getItem('pomodoroEndTime');
    if (savedEnd) {
      const remaining = Math.max(Math.round((+savedEnd - Date.now()) / 1000), 0);
      setTimeLeft(remaining);
      setEndTime(+savedEnd);
      if (remaining > 0) setIsRunning(true);
    }
  }, []);


  const resetTimer = () => {
    const durationSeconds = sessionType === 'work' ? workDuration : breakDuration;
    setTimeLeft(durationSeconds);
    setIsRunning(false);
  };

  const handleSessionTypeChange = (type) => {
    setSessionType(type);
    setShowSessionDropdown(false);
    setIsRunning(false);
  };

  const handleDurationChange = (minutes) => {
    const seconds = minutes * 60;
    if (sessionType === 'work') setWorkDuration(seconds);
    else setBreakDuration(seconds);
    setShowDurationDropdown(false);
    setTimeLeft(seconds);
    setIsRunning(false);
  };

  const handleSaveSettings = () => {
    resetTimer();
    setShowSettings(false);
  };

  const handleSessionEnd = async () => {
    const durationSeconds = sessionType === 'work' ? workDuration : breakDuration;
    const hours = Math.floor(durationSeconds / 3600);
    const minutes = Math.floor((durationSeconds % 3600) / 60);
    const seconds = durationSeconds % 60;

    const durationString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    const completedPomodoro = {
      UserID: user.id,
      Duration: durationString,
      SessionType: sessionType,
      IsCompleted: true,
    };

    await createPomodoro(completedPomodoro);
    await reloadStats();
  };

  const totalFocusHours = Math.floor(totalDuration);
  const totalFocusMinutes = Math.floor((totalDuration % 1) * 60);

  if (authLoading || pomodoroLoading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center text-white">
          Loading Pomodoro data...
        </div>
      </MainLayout>
    );
  }

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
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Pomodoro Timer</h1>
              <p className="text-zinc-400">Stay focused with timed work sessions</p>
            </div>
            <Settings
              className="mt-4 hover:rotate-90 hover:text-zinc-400 cursor-pointer"
              onClick={() => setShowSettings(true)}
            />
          </div>

          {/* Timer Display */}
          <div className="bg-zinc-900 rounded-2xl p-12 border border-zinc-800 mb-8">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-emerald-500" />
                <h2 className="text-2xl font-bold">{sessionType === 'work' ? 'Work Session' : 'Break'}</h2>
              </div>
              <p className="text-gray-500 text-sm mb-1">Total sessions completed: {completedCount}</p>
              <p className="text-gray-500 text-sm">Total focus time: {totalFocusHours}h {totalFocusMinutes}m</p>
            </div>

            <div className="text-center mb-12">
              <div className="text-8xl font-bold mb-8" style={{
                background: 'linear-gradient(to right, #047857, #9ccaa4ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                {formatTime(timeLeft)}
              </div>
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={handleStartPause}
                  className="bg-gradient-to-l from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-700 px-8 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
                >
                  {isRunning ? <><Pause className="w-4 h-4" />Pause</> : <><Play className="w-4 h-4" />Start</>}
                </button>
                <button
                  onClick={resetTimer}
                  className="bg-black hover:bg-zinc-800 border border-zinc-700 px-8 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>
            </div>

            {/* Session Type & Duration */}
            <div className="grid grid-cols-2 gap-6">
              {/* Session Type */}
              <div className="relative">
                <label className="block text-sm font-medium text-white mb-3">Session Type</label>
                <button
                  onClick={() => setShowSessionDropdown(!showSessionDropdown)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white flex items-center justify-between"
                >
                  <span className="capitalize">{sessionType}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showSessionDropdown && (
                  <div className="absolute z-10 w-full mt-2 bg-zinc-800 border border-zinc-700 rounded-lg overflow-hidden">
                    {['work', 'break'].map((type) => (
                      <button
                        key={type}
                        onClick={() => handleSessionTypeChange(type)}
                        className="w-full px-4 py-3 text-left hover:bg-zinc-700 flex items-center justify-between"
                      >
                        <span className="capitalize">{type}</span>
                        {sessionType === type && <Check className="w-4 h-4 text-emerald-500" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Duration */}
              <div className="relative">
                <label className="block text-sm font-medium text-white mb-3">Duration (minutes)</label>
                <button
                  onClick={() => setShowDurationDropdown(!showDurationDropdown)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white flex items-center justify-between"
                >
                  <span>{Math.floor((sessionType === 'work' ? workDuration : breakDuration) / 60)} min</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showDurationDropdown && (
                  <div className="absolute z-10 w-full mt-2 bg-zinc-800 border border-zinc-700 rounded-lg overflow-hidden max-h-48 overflow-y-auto">
                    {durationOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleDurationChange(option)}
                        className="w-full px-4 py-3 text-left hover:bg-zinc-700 flex items-center justify-between"
                      >
                        <span>{option} min</span>
                        {Math.floor((sessionType === 'work' ? workDuration : breakDuration) / 60) === option && <Check className="w-4 h-4 text-emerald-500" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <PomodoroTutorial />
        </div>

        <PomodoroSettings
          workDuration={workDuration}
          breakDuration={breakDuration}
          setWorkDuration={setWorkDuration}
          setBreakDuration={setBreakDuration}
          showSettings={showSettings}
          setShowSettings={setShowSettings}
          onSave={handleSaveSettings}
        />
        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </div>
    </MainLayout>
  );
}
