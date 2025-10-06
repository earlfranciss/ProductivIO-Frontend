import { useState, useEffect } from "react";
import { X, Save, Plus, Trash2 } from "lucide-react";

export default function QuizModal({ isOpen, onClose, onSave, quizData, setQuizData, isEditing }) {
    const [newQuiz, setNewQuiz] = useState({
        title: '',
        description: '',
        questions: [{
            type: 'multiple',
            question: '',
            options: ['', '', '', ''],
            correctAnswer: 0
        }]
    });

    const handleSubmit = () => {
        onSave(quizData);
        onClose();
    };

    if (!isOpen) return null;

    const addQuestion = () => {
        setNewQuiz({
            ...newQuiz,
            questions: [...newQuiz.questions, {
                type: 'multiple',
                question: '',
                options: ['', '', '', ''],
                correctAnswer: 0
            }]
        });
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-zinc-800 rounded-xl p-6 max-w-4xl w-full border border-zinc-700 my-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">
                        {isEditing ? "Edit Quiz" : "Create New Quiz"}
                    </h2>
                    <button onClick={() => setShowCreateModal(false)} className="text-zinc-400 hover:text-white">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                    <div className="ml-1">
                        <label className="block text-sm font-medium text-white mb-2">Quiz Title</label>
                        <input
                            type="text"
                            value={quizData.title}
                            onChange={(e) => setQuizData({ ...quizData, title: e.target.value })}
                            placeholder="e.g., History Chapter 5, Math Practice Test"
                            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-zinc-500"
                        />
                    </div>

                    <div className="ml-1">
                        <label className="block text-sm font-medium text-white mb-2">Description (Optional)</label>
                        <input
                            type="text"
                            value={quizData.description}
                            onChange={(e) => setQuizData({ ...quizData, description: e.target.value })}
                            placeholder="Brief description of this quiz"
                            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-zinc-500"
                        />
                    </div>

                    <div className="ml-1">
                        <div className="flex items-center justify-between mb-3">
                            <label className="block text-sm font-medium text-white">Questions</label>
                            <button
                                onClick={addQuestion}
                                className="text-emerald-500 hover:text-emerald-400 text-sm flex items-center gap-1"
                            >
                                <Plus className="w-4 h-4" />
                                Add Question
                            </button>
                        </div>

                        <div className="space-y-4">
                            {newQuiz.questions.map((question, qIndex) => (
                                <div key={qIndex} className="bg-zinc-900 rounded-lg p-4 border border-zinc-700">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-sm font-medium text-zinc-400">Question {qIndex + 1}</span>
                                        <div className="flex items-center gap-2">
                                            <select
                                                value={question.type}
                                                onChange={(e) => changeQuestionType(qIndex, e.target.value)}
                                                className="bg-zinc-800 border border-zinc-600 rounded px-3 py-1 text-sm text-white focus:outline-none"
                                            >
                                                <option value="multiple">Multiple Choice</option>
                                                <option value="trueFalse">True/False</option>
                                                <option value="identification">Identification</option>
                                            </select>
                                            {newQuiz.questions.length > 1 && (
                                                <button
                                                    onClick={() => removeQuestion(qIndex)}
                                                    className="text-zinc-400 hover:text-red-500"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-xs text-zinc-500 mb-1"><strong>Question</strong></label>
                                            <input
                                                type="text"
                                                value={question.question}
                                                onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                                                placeholder="Enter your question"
                                                className="w-full bg-zinc-800 border border-zinc-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-zinc-500"
                                            />
                                        </div>

                                        {question.type === 'multiple' && (
                                            <div>
                                                <label className="block text-xs text-zinc-500 mb-2"><strong>Options</strong> (Select the correct answer)</label>
                                                <div className="space-y-2">
                                                    {question.options.map((option, optIndex) => (
                                                        <div key={optIndex} className="flex items-center gap-2">
                                                            <input
                                                                type="radio"
                                                                name={'correct-' + qIndex}
                                                                checked={question.correctAnswer === optIndex}
                                                                onChange={() => updateQuestion(qIndex, 'correctAnswer', optIndex)}
                                                                className="w-4 h-4 accent-emerald-500"
                                                            />
                                                            <input
                                                                type="text"
                                                                value={option}
                                                                onChange={(e) => updateOption(qIndex, optIndex, e.target.value)}
                                                                placeholder={'Option ' + (optIndex + 1)}
                                                                className="flex-1 bg-zinc-800 border border-zinc-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-zinc-500"
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {question.type === 'trueFalse' && (
                                            <div>
                                                <label className="block text-xs text-zinc-500 mb-2">Correct Answer</label>
                                                <div className="flex gap-3">
                                                    <button
                                                        onClick={() => updateQuestion(qIndex, 'correctAnswer', true)}
                                                        className={'px-4 py-2 rounded-lg border-2 transition-all ' +
                                                            (question.correctAnswer === true
                                                                ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400'
                                                                : 'border-zinc-600 text-zinc-400')}
                                                    >
                                                        True
                                                    </button>
                                                    <button
                                                        onClick={() => updateQuestion(qIndex, 'correctAnswer', false)}
                                                        className={'px-4 py-2 rounded-lg border-2 transition-all ' +
                                                            (question.correctAnswer === false
                                                                ? 'border-red-500 bg-red-500/20 text-red-400'
                                                                : 'border-zinc-600 text-zinc-400')}
                                                    >
                                                        False
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {question.type === 'identification' && (
                                            <div>
                                                <label className="block text-xs text-zinc-500 mb-2">
                                                    <strong>Correct Answers</strong> (You can add multiple)
                                                </label>
                                                <div className="space-y-2">
                                                    {question.correctAnswer.map((answer, ansIndex) => (
                                                        <div key={ansIndex} className="flex items-center gap-2">
                                                            <input
                                                                type="text"
                                                                value={answer}
                                                                onChange={(e) => {
                                                                    const updated = [...question.correctAnswer];
                                                                    updated[ansIndex] = e.target.value;
                                                                    updateQuestion(qIndex, 'correctAnswer', updated);
                                                                }}
                                                                placeholder={'Answer ' + (ansIndex + 1)}
                                                                className="w-full bg-zinc-800 border border-zinc-600 rounded px-3 py-2 text-white text-sm focus:outline-none"
                                                            />
                                                            {question.correctAnswer.length > 1 && (
                                                                <button
                                                                    onClick={() => {
                                                                        const updated = question.correctAnswer.filter((_, i) => i !== ansIndex);
                                                                        updateQuestion(qIndex, 'correctAnswer', updated);
                                                                    }}
                                                                    className="text-zinc-400 hover:text-red-500"
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </button>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        updateQuestion(qIndex, 'correctAnswer', [...question.correctAnswer, '']);
                                                    }}
                                                    className="mt-2 ml-2 text-emerald-600 hover:text-emerald-400 text-sm"
                                                >
                                                    + Add another answer
                                                </button>
                                            </div>
                                        )}


                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-center ">
                        <button
                            onClick={addQuestion}
                            className="bg-emerald-800 p-2 rounded-lg text-white hover:bg-emerald-700 text-sm flex items-center gap-1"
                        >
                            <Plus className="w-4 h-4" />
                            Add Question
                        </button>
                    </div>
                </div>



                <div className="flex gap-4 justify-end mt-6 pt-4 border-t border-zinc-700">
                    <button
                        onClick={() => setShowCreateModal(false)}
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
                        {isEditing ? "Update Quiz" : "Create Quiz"}
                    </button>
                </div>
            </div>
        </div>
    )
}