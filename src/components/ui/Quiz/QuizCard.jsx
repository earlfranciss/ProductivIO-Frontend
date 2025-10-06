import { Edit2, Trash2, Play, } from 'lucide-react';

export default function QuizCard({ quiz, onDelete, startQuiz, onEdit }) {
    return (
        <div key={quiz.id} className="bg-zinc-800 rounded-xl p-6 border border-zinc-700 hover:border-zinc-500/50 transition-all">
            <div>
                <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                            <h4 className="font-bold truncate">{quiz.title}</h4>
                            <div className="flex gap-2 pl-2">
                                <button onClick={() => onEdit(quiz)} className="text-zinc-400 hover:text-white">
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button onClick={() => onDelete(quiz.id)} className="text-zinc-400 hover:text-red-500">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <p className="truncate-2-lines text-sm text-zinc-400 mb-2">{quiz.description}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 mb-4">
                    <div className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded text-sm font-medium">
                        {quiz.questions.length} questions
                    </div>
                </div>
                <button
                    onClick={() => startQuiz(quiz)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                    <Play className="w-4 h-4" />
                    Start Quiz
                </button>
            </div>
            <div className="text-xs text-zinc-600 mt-auto">Created: {new Date(quiz.createdAt).toLocaleDateString()}</div>
        </div>
    )
}