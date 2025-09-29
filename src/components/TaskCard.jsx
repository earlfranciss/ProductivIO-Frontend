// const TaskCard = ({ task, onDelete, onStatusChange }) => {
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