// import React, { useState, useEffect } from 'react';
// import { 
//   FileText, 
//   CheckSquare, 
//   Target, 
//   Clock, 
//   Plus, 
//   Search,
//   X,
//   Edit2,
//   Trash2,
//   Save,
//   Coffee,
//   Timer,
//   TrendingUp,
//   Settings as SettingsIcon,
//   AlertCircle
// } from 'lucide-react';

// export default function Productivity() {
//   const [currentView, setCurrentView] = useState('dashboard');
//   const [showNoteModal, setShowNoteModal] = useState(false);
//   const [showTaskModal, setShowTaskModal] = useState(false);
//   const [showTimerSettings, setShowTimerSettings] = useState(false);
//   const [notes, setNotes] = useState([]);
//   const [tasks, setTasks] = useState([]);
//   const [timerMode, setTimerMode] = useState('work');
//   const [timeLeft, setTimeLeft] = useState(25 * 60);
//   const [isTimerRunning, setIsTimerRunning] = useState(false);
//   const [notification, setNotification] = useState('');
  
//   const [timerSettings, setTimerSettings] = useState({
//     work: 25,
//     shortBreak: 5,
//     longBreak: 15,
//     sessionsUntilLongBreak: 4
//   });

//   const [newTask, setNewTask] = useState({
//     title: '',
//     description: '',
//     priority: 'medium',
//     status: 'todo'
//   });

//   useEffect(() => {
//     let interval;
//     if (isTimerRunning && timeLeft > 0) {
//       interval = setInterval(() => {
//         setTimeLeft(prev => prev - 1);
//       }, 1000);
//     } else if (timeLeft === 0) {
//       setIsTimerRunning(false);
//     }
//     return () => clearInterval(interval);
//   }, [isTimerRunning, timeLeft]);

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   const handleCreateTask = () => {
//     if (newTask.title.trim()) {
//       setTasks([...tasks, { ...newTask, id: Date.now(), createdAt: new Date().toLocaleDateString() }]);
//       setNewTask({ title: '', description: '', priority: 'medium', status: 'todo' });
//       setShowTaskModal(false);
//       setNotification('Task created successfully');
//       setTimeout(() => setNotification(''), 3000);
//     }
//   };

//   const deleteTask = (id) => {
//     setTasks(tasks.filter(t => t.id !== id));
//   };

//   const updateTaskStatus = (id, newStatus) => {
//     setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
//   };

//   const startTimer = (mode) => {
//     setTimerMode(mode);
//     if (mode === 'work') setTimeLeft(timerSettings.work * 60);
//     else if (mode === 'shortBreak') setTimeLeft(timerSettings.shortBreak * 60);
//     else setTimeLeft(timerSettings.longBreak * 60);
//     setIsTimerRunning(true);
//   };

//   const Dashboard = () => (
//     <div className="min-h-screen bg-slate-900 text-white p-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold mb-2">Welcome back, Earl Francis Ong!</h1>
//           <p className="text-slate-400">Here's your productivity overview for today.</p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
//                 <FileText className="w-6 h-6 text-emerald-500" />
//               </div>
//               <div>
//                 <div className="text-3xl font-bold">{notes.length}</div>
//                 <div className="text-sm text-slate-400">Total Notes</div>
//                 <div className="text-xs text-slate-500">Knowledge captured</div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
//                 <CheckSquare className="w-6 h-6 text-blue-500" />
//               </div>
//               <div>
//                 <div className="text-3xl font-bold">{tasks.length}</div>
//                 <div className="text-sm text-slate-400">Active Tasks</div>
//                 <div className="text-xs text-slate-500">{tasks.filter(t => t.status === 'done').length} completed</div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
//                 <Target className="w-6 h-6 text-purple-500" />
//               </div>
//               <div>
//                 <div className="text-3xl font-bold">0</div>
//                 <div className="text-sm text-slate-400">Completion Rate</div>
//                 <div className="text-xs text-slate-500">Task success rate</div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
//                 <Clock className="w-6 h-6 text-orange-500" />
//               </div>
//               <div>
//                 <div className="text-3xl font-bold">0h</div>
//                 <div className="text-sm text-slate-400">Focus Time</div>
//                 <div className="text-xs text-slate-500">This week</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="mb-8">
//           <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
//           <div className="flex gap-4">
//             <button 
//               onClick={() => setCurrentView('notes')}
//               className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
//             >
//               <Plus className="w-5 h-5" />
//               New Note
//             </button>
//             <button 
//               onClick={() => setCurrentView('tasks')}
//               className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
//             >
//               <Plus className="w-5 h-5" />
//               Add Task
//             </button>
//             <button 
//               onClick={() => setCurrentView('focus')}
//               className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
//             >
//               <Timer className="w-5 h-5" />
//               Start Focus Session
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
//             <div className="flex items-center justify-between mb-6">
//               <div className="flex items-center gap-3">
//                 <FileText className="w-5 h-5 text-emerald-500" />
//                 <h3 className="text-xl font-bold">Recent Notes</h3>
//               </div>
//               <button className="text-emerald-500 text-sm hover:underline">View all</button>
//             </div>
//             <div className="flex flex-col items-center justify-center py-12">
//               <FileText className="w-16 h-16 text-slate-600 mb-4" />
//               <p className="text-slate-400">No notes yet. Create your first note!</p>
//             </div>
//           </div>

//           <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
//             <div className="flex items-center justify-between mb-6">
//               <div className="flex items-center gap-3">
//                 <CheckSquare className="w-5 h-5 text-blue-500" />
//                 <h3 className="text-xl font-bold">Active Tasks</h3>
//               </div>
//               <button className="text-blue-500 text-sm hover:underline">View all</button>
//             </div>
//             <div className="flex flex-col items-center justify-center py-12">
//               <CheckSquare className="w-16 h-16 text-slate-600 mb-4" />
//               <p className="text-slate-400">No active tasks. Add your first task!</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const NotesView = () => (
//     <div className="min-h-screen bg-slate-900 text-white p-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className="text-4xl font-bold mb-2">My Notes</h1>
//             <p className="text-slate-400">Capture your thoughts and ideas with rich formatting</p>
//           </div>
//           <button 
//             onClick={() => setShowNoteModal(true)}
//             className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
//           >
//             <Plus className="w-5 h-5" />
//             New Note
//           </button>
//         </div>

//         <div className="mb-6">
//           <div className="relative">
//             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
//             <input
//               type="text"
//               placeholder="Search notes..."
//               className="w-full max-w-md bg-slate-800 border border-slate-700 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//             />
//           </div>
//         </div>

//         {notes.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-24">
//             <FileText className="w-24 h-24 text-slate-700 mb-6" />
//             <h3 className="text-2xl font-bold mb-2">No notes yet</h3>
//             <p className="text-slate-400 mb-6">Create your first note to get started</p>
//             <button 
//               onClick={() => setShowNoteModal(true)}
//               className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
//             >
//               <Plus className="w-5 h-5" />
//               Create Your First Note
//             </button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {notes.map(note => (
//               <div key={note.id} className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors">
//                 <h3 className="text-xl font-bold mb-2">{note.title}</h3>
//                 <p className="text-slate-400 text-sm">{note.content}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   const TasksView = () => {
//     const todoTasks = tasks.filter(t => t.status === 'todo');
//     const inProgressTasks = tasks.filter(t => t.status === 'inprogress');
//     const doneTasks = tasks.filter(t => t.status === 'done');

//     return (
//       <div className="min-h-screen bg-slate-900 text-white p-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex items-center justify-between mb-8">
//             <div>
//               <h1 className="text-4xl font-bold mb-2">Task Management</h1>
//               <p className="text-slate-400">Organize and track your tasks with priorities and status</p>
//             </div>
//             <button 
//               onClick={() => setShowTaskModal(true)}
//               className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
//             >
//               <Plus className="w-5 h-5" />
//               New Task
//             </button>
//           </div>

//           <div className="mb-6">
//             <div className="relative mb-4">
//               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
//               <input
//                 type="text"
//                 placeholder="Search tasks..."
//                 className="w-full max-w-md bg-slate-800 border border-slate-700 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//               />
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <select className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500">
//                 <option>All Status</option>
//                 <option>To Do</option>
//                 <option>In Progress</option>
//                 <option>Done</option>
//               </select>
//               <select className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500">
//                 <option>All Priority</option>
//                 <option>High</option>
//                 <option>Medium</option>
//                 <option>Low</option>
//               </select>
//             </div>
//           </div>

//           {tasks.length === 0 ? (
//             <div className="flex flex-col items-center justify-center py-24">
//               <CheckSquare className="w-24 h-24 text-slate-700 mb-6" />
//               <h3 className="text-2xl font-bold mb-2">No tasks yet</h3>
//               <p className="text-slate-400 mb-6">Create your first task to get started</p>
//               <button 
//                 onClick={() => setShowTaskModal(true)}
//                 className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
//               >
//                 <Plus className="w-5 h-5" />
//                 Create Your First Task
//               </button>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div>
//                 <div className="flex items-center gap-2 mb-4">
//                   <div className="w-3 h-3 rounded-full bg-slate-500"></div>
//                   <h3 className="text-lg font-bold">To Do</h3>
//                   <span className="bg-slate-700 px-2 py-1 rounded text-sm">{todoTasks.length}</span>
//                 </div>
//                 <div className="space-y-4">
//                   {todoTasks.map(task => (
//                     <TaskCard key={task.id} task={task} onDelete={deleteTask} onStatusChange={updateTaskStatus} />
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <div className="flex items-center gap-2 mb-4">
//                   <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
//                   <h3 className="text-lg font-bold">In Progress</h3>
//                   <span className="bg-emerald-500/20 text-emerald-500 px-2 py-1 rounded text-sm">{inProgressTasks.length}</span>
//                 </div>
//                 <div className="space-y-4">
//                   {inProgressTasks.map(task => (
//                     <TaskCard key={task.id} task={task} onDelete={deleteTask} onStatusChange={updateTaskStatus} />
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <div className="flex items-center gap-2 mb-4">
//                   <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
//                   <h3 className="text-lg font-bold">Done</h3>
//                   <span className="bg-emerald-500/20 text-emerald-500 px-2 py-1 rounded text-sm">{doneTasks.length}</span>
//                 </div>
//                 <div className="space-y-4">
//                   {doneTasks.map(task => (
//                     <TaskCard key={task.id} task={task} onDelete={deleteTask} onStatusChange={updateTaskStatus} />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   const TaskCard = ({ task, onDelete, onStatusChange }) => {
//     const priorityColors = {
//       high: 'text-red-500 bg-red-500/20',
//       medium: 'text-yellow-500 bg-yellow-500/20',
//       low: 'text-blue-500 bg-blue-500/20'
//     };

//     const statusColors = {
//       todo: 'text-slate-400 bg-slate-700',
//       inprogress: 'text-emerald-400 bg-emerald-500/20',
//       done: 'text-emerald-400 bg-emerald-500/20'
//     };

//     return (
//       <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 hover:border-slate-600 transition-colors">
//         <div className="flex items-start justify-between mb-2">
//           <h4 className="font-bold">{task.title}</h4>
//           <div className="flex gap-2">
//             <button className="text-slate-400 hover:text-white">
//               <Edit2 className="w-4 h-4" />
//             </button>
//             <button onClick={() => onDelete(task.id)} className="text-slate-400 hover:text-red-500">
//               <Trash2 className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//         {task.description && <p className="text-sm text-slate-400 mb-3">{task.description}</p>}
//         <div className="flex items-center justify-between">
//           <span className={`px-2 py-1 rounded text-xs flex items-center gap-1 ${priorityColors[task.priority]}`}>
//             <AlertCircle className="w-3 h-3" />
//             {task.priority}
//           </span>
//           <select 
//             value={task.status}
//             onChange={(e) => onStatusChange(task.id, e.target.value)}
//             className={`px-2 py-1 rounded text-xs ${statusColors[task.status]} border-none focus:outline-none`}
//           >
//             <option value="todo">todo</option>
//             <option value="inprogress">in progress</option>
//             <option value="done">done</option>
//           </select>
//         </div>
//         <div className="text-xs text-slate-500 mt-3">Created: {task.createdAt}</div>
//       </div>
//     );
//   };

//   const FocusTimer = () => (
//     <div className="min-h-screen bg-slate-900 text-white p-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className="text-4xl font-bold mb-2">Focus Timer</h1>
//             <p className="text-slate-400">Stay focused with the Pomodoro Technique</p>
//           </div>
//           <button 
//             onClick={() => setShowTimerSettings(true)}
//             className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
//           >
//             <SettingsIcon className="w-5 h-5" />
//             Settings
//           </button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
//                 <CheckSquare className="w-6 h-6 text-emerald-500" />
//               </div>
//               <div>
//                 <div className="text-3xl font-bold">0</div>
//                 <div className="text-sm text-slate-400">Sessions Today</div>
//                 <div className="text-xs text-slate-500">Focus sessions completed</div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
//                 <Target className="w-6 h-6 text-blue-500" />
//               </div>
//               <div>
//                 <div className="text-3xl font-bold">0h</div>
//                 <div className="text-sm text-slate-400">Focus Time</div>
//                 <div className="text-xs text-slate-500">Total time this week</div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
//                 <TrendingUp className="w-6 h-6 text-purple-500" />
//               </div>
//               <div>
//                 <div className="text-3xl font-bold">0</div>
//                 <div className="text-sm text-slate-400">Current Streak</div>
//                 <div className="text-xs text-slate-500">Sessions in this cycle</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="bg-slate-800 rounded-xl p-12 border border-slate-700">
//           <div className="flex justify-center gap-4 mb-8">
//             <button 
//               onClick={() => startTimer('work')}
//               className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors ${
//                 timerMode === 'work' ? 'bg-emerald-600' : 'bg-slate-700 hover:bg-slate-600'
//               }`}
//             >
//               <Timer className="w-5 h-5" />
//               Work
//             </button>
//             <button 
//               onClick={() => startTimer('shortBreak')}
//               className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors ${
//                 timerMode === 'shortBreak' ? 'bg-emerald-600' : 'bg-slate-700 hover:bg-slate-600'
//               }`}
//             >
//               <Coffee className="w-5 h-5" />
//               Short Break
//             </button>
//             <button 
//               onClick={() => startTimer('longBreak')}
//               className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors ${
//                 timerMode === 'longBreak' ? 'bg-emerald-600' : 'bg-slate-700 hover:bg-slate-600'
//               }`}
//             >
//               <Coffee className="w-5 h-5" />
//               Long Break
//             </button>
//           </div>

//           <div className="text-center mb-8">
//             <div className="text-8xl font-bold text-emerald-500 mb-8">{formatTime(timeLeft)}</div>
//             <div className="flex justify-center">
//               <div className="relative w-64 h-64">
//                 <svg className="w-full h-full -rotate-90">
//                   <circle cx="128" cy="128" r="120" fill="none" stroke="#1e293b" strokeWidth="8" />
//                   <circle cx="128" cy="128" r="120" fill="none" stroke="#10b981" strokeWidth="8" strokeDasharray="754" strokeDashoffset="0" strokeLinecap="round" />
//                 </svg>
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <button className="w-20 h-20 bg-emerald-600 hover:bg-emerald-700 rounded-full flex items-center justify-center transition-colors">
//                     <Timer className="w-8 h-8" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-slate-900">
//       <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4">
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           <div className="flex items-center gap-8">
//             <h1 className="text-xl font-bold text-white">Productivity App</h1>
//             <div className="flex gap-4">
//               <button 
//                 onClick={() => setCurrentView('dashboard')}
//                 className={`px-4 py-2 rounded-lg transition-colors ${currentView === 'dashboard' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
//               >
//                 Dashboard
//               </button>
//               <button 
//                 onClick={() => setCurrentView('notes')}
//                 className={`px-4 py-2 rounded-lg transition-colors ${currentView === 'notes' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
//               >
//                 Notes
//               </button>
//               <button 
//                 onClick={() => setCurrentView('tasks')}
//                 className={`px-4 py-2 rounded-lg transition-colors ${currentView === 'tasks' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
//               >
//                 Tasks
//               </button>
//               <button 
//                 onClick={() => setCurrentView('focus')}
//                 className={`px-4 py-2 rounded-lg transition-colors ${currentView === 'focus' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
//               >
//                 Focus Timer
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {currentView === 'dashboard' && <Dashboard />}
//       {currentView === 'notes' && <NotesView />}
//       {currentView === 'tasks' && <TasksView />}
//       {currentView === 'focus' && <FocusTimer />}

//       {showTaskModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
//           <div className="bg-slate-800 rounded-xl p-6 max-w-lg w-full border border-slate-700">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-2xl font-bold text-white">Create New Task</h2>
//               <button onClick={() => setShowTaskModal(false)} className="text-slate-400 hover:text-white">
//                 <X className="w-6 h-6" />
//               </button>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-white mb-2">Task Title</label>
//                 <input
//                   type="text"
//                   value={newTask.title}
//                   onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
//                   placeholder="Enter task title..."
//                   className="w-full bg-slate-900 border border-emerald-500 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-white mb-2">Description (Optional)</label>
//                 <textarea
//                   value={newTask.description}
//                   onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
//                   placeholder="Add task description..."
//                   rows="3"
//                   className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-white mb-2">Priority</label>
//                   <select
//                     value={newTask.priority}
//                     onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
//                     className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                   >
//                     <option value="low">Low</option>
//                     <option value="medium">Medium</option>
//                     <option value="high">High</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-white mb-2">Status</label>
//                   <select
//                     value={newTask.status}
//                     onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
//                     className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                   >
//                     <option value="todo">To Do</option>
//                     <option value="inprogress">In Progress</option>
//                     <option value="done">Done</option>
//                   </select>
//                 </div>
//               </div>
//             </div>

//             <div className="flex gap-4 justify-end mt-6">
//               <button 
//                 onClick={() => setShowTaskModal(false)}
//                 className="px-6 py-3 rounded-lg font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-2"
//               >
//                 <X className="w-5 h-5" />
//                 Cancel
//               </button>
//               <button 
//                 onClick={handleCreateTask}
//                 className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
//               >
//                 <Save className="w-5 h-5" />
//                 Save Task
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showNoteModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
//           <div className="bg-slate-800 rounded-xl p-6 max-w-4xl w-full border border-slate-700">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-2xl font-bold text-white">Create New Note</h2>
//               <button onClick={() => setShowNoteModal(false)} className="text-slate-400 hover:text-white">
//                 <X className="w-6 h-6" />
//               </button>
//             </div>

//             <input
//               type="text"
//               placeholder="Note title..."
//               className="w-full bg-slate-900 border border-emerald-500 rounded-lg px-4 py-3 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//             />

//             <div className="bg-slate-900 rounded-lg border border-slate-700 mb-4">
//               <div className="border-b border-slate-700 p-2 flex gap-1">
//                 <button className="p-2 hover:bg-slate-800 rounded"><span className="font-bold">B</span></button>
//                 <button className="p-2 hover:bg-slate-800 rounded"><span className="italic">I</span></button>
//                 <button className="p-2 hover:bg-slate-800 rounded"><span className="underline">U</span></button>
//               </div>
//               <textarea
//                 placeholder="Start writing..."
//                 rows="12"
//                 className="w-full bg-slate-900 px-4 py-3 text-white focus:outline-none resize-none"
//               />
//             </div>

//             <div className="flex gap-4 justify-end">
//               <button 
//                 onClick={() => setShowNoteModal(false)}
//                 className="px-6 py-3 rounded-lg font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-2"
//               >
//                 <X className="w-5 h-5" />
//                 Cancel
//               </button>
//               <button 
//                 className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
//               >
//                 <Save className="w-5 h-5" />
//                 Save Note
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showTimerSettings && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
//           <div className="bg-slate-800 rounded-xl p-6 max-w-lg w-full border border-slate-700">
//             <div className="flex items-center justify-between mb-6">
//               <div className="flex items-center gap-2">
//                 <SettingsIcon className="w-6 h-6" />
//                 <h2 className="text-2xl font-bold text-white">Timer Settings</h2>
//               </div>
//               <button onClick={() => setShowTimerSettings(false)} className="text-slate-400 hover:text-white">
//                 <X className="w-6 h-6" />
//               </button>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-white mb-2">Work Session (minutes)</label>
//                 <input
//                   type="number"
//                   value={timerSettings.work}
//                   onChange={(e) => setTimerSettings({ ...timerSettings, work: parseInt(e.target.value) })}
//                   className="w-full bg-slate-900 border border-emerald-500 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-white mb-2">Short Break (minutes)</label>
//                 <input
//                   type="number"
//                   value={timerSettings.shortBreak}
//                   onChange={(e) => setTimerSettings({ ...timerSettings, shortBreak: parseInt(e.target.value) })}
//                   className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-white mb-2">Long Break (minutes)</label>
//                 <input
//                   type="number"
//                   value={timerSettings.longBreak}
//                   onChange={(e) => setTimerSettings({ ...timerSettings, longBreak: parseInt(e.target.value) })}
//                   className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-white mb-2">Sessions until Long Break</label>
//                 <input
//                   type="number"
//                   value={timerSettings.sessionsUntilLongBreak}
//                   onChange={(e) => setTimerSettings({ ...timerSettings, sessionsUntilLongBreak: parseInt(e.target.value) })}
//                   className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                 />
//               </div>
//             </div>

//             <div className="flex gap-4 justify-end mt-6">
//               <button 
//                 onClick={() => setShowTimerSettings(false)}
//                 className="px-6 py-3 rounded-lg font-medium text-slate-400 hover:text-white transition-colors"
//               >
//                 Cancel
//               </button>
//               <button 
//                 onClick={() => setShowTimerSettings(false)}
//                 className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg font-medium transition-colors"
//               >
//                 Save Settings
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {notification && (
//         <div className="fixed bottom-8 right-8 bg-white text-slate-900 px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50">
//           <CheckSquare className="w-5 h-5" />
//           <span className="font-medium">{notification}</span>
//         </div>
//       )}
//     </div>
//   );
// }
                    