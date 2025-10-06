
import { CheckCircle, XCircle,  ChevronLeft, } from 'lucide-react';


export default function QuizTaking() {
    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <button
                        onClick={() => setView('library')}
                        className="text-emerald-500 hover:text-emerald-400 mb-2 flex items-center gap-2"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Back to Library
                    </button>
                    <h1 className="text-4xl font-bold mb-2">{currentQuiz.title}</h1>
                    <p className="text-zinc-400">Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}</p>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-bold text-emerald-500">
                        {Math.round(((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100)}%
                    </div>
                    <div className="text-sm text-zinc-400">Progress</div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <div className="w-full bg-zinc-700 rounded-full h-2">
                        <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500  rounded-full transition-all"
                            style={{ width: ((currentQuestionIndex + 1) / currentQuiz.questions.length * 100) + '%' }}
                        ></div>
                    </div>
                </div>

                <div className="bg-zinc-800 rounded-xl p-8 border border-zinc-700 mb-6">
                    <div className="mb-6">
                        <div className="text-sm text-zinc-500 mb-2">
                            {currentQuiz.questions[currentQuestionIndex].type === 'multiple' && 'Multiple Choice'}
                            {currentQuiz.questions[currentQuestionIndex].type === 'trueFalse' && 'True or False'}
                            {currentQuiz.questions[currentQuestionIndex].type === 'identification' && 'Identification'}
                        </div>
                        <h2 className="text-2xl font-bold">
                            {currentQuiz.questions[currentQuestionIndex].question}
                        </h2>
                    </div>

                    {currentQuiz.questions[currentQuestionIndex].type === 'multiple' && (
                        <div className="space-y-3">
                            {currentQuiz.questions[currentQuestionIndex].options
                                .filter(option => option && option.trim() !== "")
                                .map((option, i) => (
                                    <button
                                        key={i}
                                        onClick={() => selectAnswer(i)}
                                        className={
                                            "w-full text-left p-4 rounded-lg border-2 transition-all " +
                                            (userAnswers[currentQuestionIndex] === i
                                                ? "border-emerald-500 bg-emerald-500/20"
                                                : "border-zinc-600 hover:border-zinc-500")
                                        }
                                    >
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={
                                                    "w-6 h-6 rounded-full border-2 flex items-center justify-center " +
                                                    (userAnswers[currentQuestionIndex] === i
                                                        ? "border-emerald-500 bg-emerald-500"
                                                        : "border-zinc-500")
                                                }
                                            >
                                                {userAnswers[currentQuestionIndex] === i && (
                                                    <div className="w-3 h-3 bg-white rounded-full"></div>
                                                )}
                                            </div>
                                            <span className="font-medium">{option}</span>
                                        </div>
                                    </button>
                                ))}
                        </div>
                    )}


                    {currentQuiz.questions[currentQuestionIndex].type === 'trueFalse' && (
                        <div className="space-y-3">
                            <button
                                onClick={() => selectAnswer(true)}
                                className={'w-full text-left p-4 rounded-lg border-2 transition-all ' +
                                    (userAnswers[currentQuestionIndex] === true
                                        ? 'border-emerald-500 bg-emerald-500/20'
                                        : 'border-zinc-600 hover:border-zinc-500')}
                            >
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="w-6 h-6 text-emerald-500" />
                                    <span className="font-medium">True</span>
                                </div>
                            </button>
                            <button
                                onClick={() => selectAnswer(false)}
                                className={'w-full text-left p-4 rounded-lg border-2 transition-all ' +
                                    (userAnswers[currentQuestionIndex] === false
                                        ? 'border-emerald-500 bg-emerald-500/20'
                                        : 'border-zinc-600 hover:border-zinc-500')}
                            >
                                <div className="flex items-center gap-3">
                                    <XCircle className="w-6 h-6 text-red-500" />
                                    <span className="font-medium">False</span>
                                </div>
                            </button>
                        </div>
                    )}

                    {currentQuiz.questions[currentQuestionIndex].type === 'identification' && (
                        <div>
                            <input
                                type="text"
                                value={userAnswers[currentQuestionIndex] || ''}
                                onChange={(e) => selectAnswer(e.target.value)}
                                placeholder="Type your answer here..."
                                className="w-full bg-zinc-900 border border-zinc-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-zinc-500"
                            />
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-between">
                    <button
                        onClick={previousQuestion}
                        disabled={currentQuestionIndex === 0}
                        className="bg-zinc-700 hover:bg-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        Previous
                    </button>

                    <div className="text-zinc-400">
                        {currentQuestionIndex + 1} / {currentQuiz.questions.length}
                    </div>

                    {currentQuestionIndex === currentQuiz.questions.length - 1 ? (
                        <button
                            onClick={submitQuiz}
                            className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg font-medium transition-colors"
                        >
                            Submit Quiz
                        </button>
                    ) : (
                        <button
                            onClick={nextQuestion}
                            className="bg-zinc-700 hover:bg-zinc-600 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
                        >
                            Next
                            <ChevronLeft className="w-5 h-5 rotate-180" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}