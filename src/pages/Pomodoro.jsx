export default function Pomodoro() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      {/* <div className="max-w-7xl mx-auto">
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
              className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors ${
                timerMode === 'work' ? 'bg-emerald-600' : 'bg-slate-700 hover:bg-slate-600'
              }`}
            >
              <Timer className="w-5 h-5" />
              Work
            </button>
            <button 
              onClick={() => startTimer('shortBreak')}
              className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors ${
                timerMode === 'shortBreak' ? 'bg-emerald-600' : 'bg-slate-700 hover:bg-slate-600'
              }`}
            >
              <Coffee className="w-5 h-5" />
              Short Break
            </button>
            <button 
              onClick={() => startTimer('longBreak')}
              className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors ${
                timerMode === 'longBreak' ? 'bg-emerald-600' : 'bg-slate-700 hover:bg-slate-600'
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
      </div> */}
    </div>
  )
}
