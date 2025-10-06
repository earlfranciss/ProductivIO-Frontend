
import {  CheckCircle, XCircle, Award, ChevronLeft, } from 'lucide-react';


export default function QuizResult() {
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
                    <h1 className="text-4xl font-bold mb-2">Quiz Results</h1>
                    <p className="text-zinc-400">{currentQuiz.title}</p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto">
                <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-500/20 rounded-xl p-8 border border-emerald-500/50 mb-8 text-center">
                    <Award className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                    <h2 className="text-4xl font-bold mb-2">
                        {calculateScore()} / {currentQuiz.questions.length}
                    </h2>
                    <p className="text-xl text-zinc-300 mb-4">
                        {Math.round((calculateScore() / currentQuiz.questions.length) * 100)}% Correct
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <button
                            onClick={() => {
                                setCurrentQuestionIndex(0);
                                setUserAnswers(new Array(currentQuiz.questions.length).fill(null));
                                setShowResults(false);
                            }}
                            className="bg-emerald-600 hover:bg-emerald-700 px-6 py-2 rounded-lg font-medium transition-colors"
                        >
                            Retake Quiz
                        </button>
                        <button
                            onClick={() => setView('library')}
                            className="bg-zinc-700 hover:bg-zinc-600 px-6 py-2 rounded-lg font-medium transition-colors"
                        >
                            Back to Library
                        </button>
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-2xl font-bold">Answer Review</h3>
                    {currentQuiz.questions.map((q, i) => {
                        let isCorrect = false;
                        let userAnswerText = '';
                        let correctAnswerText = '';

                        if (q.type === 'multiple') {
                            isCorrect = userAnswers[i] === q.correctAnswer;
                            userAnswerText = q.options[userAnswers[i]] || 'No answer';
                            correctAnswerText = q.options[q.correctAnswer];
                        } else if (q.type === 'trueFalse') {
                            isCorrect = userAnswers[i] === q.correctAnswer;
                            userAnswerText = userAnswers[i] === null ? 'No answer' : (userAnswers[i] ? 'True' : 'False');
                            correctAnswerText = q.correctAnswer ? 'True' : 'False';
                        } else {
                            if (Array.isArray(q.correctAnswer)) {
                                // Identification → check if user's answer matches any of the accepted ones
                                isCorrect = userAnswers[i]
                                    && q.correctAnswer.some(ans => ans.toLowerCase().trim() === userAnswers[i].toLowerCase().trim());

                                userAnswerText = userAnswers[i] || 'No answer';
                                correctAnswerText = q.correctAnswer.join(', '); // show all accepted answers
                            } else {
                                // Multiple choice / TrueFalse
                                isCorrect = userAnswers[i]
                                    && userAnswers[i].toLowerCase().trim() === q.correctAnswer.toString().toLowerCase().trim();

                                userAnswerText = userAnswers[i] || 'No answer';
                                correctAnswerText = q.correctAnswer.toString();
                            }
                        }

                        return (
                            <div key={i} className={'bg-zinc-800 rounded-xl p-6 border-2 ' + (isCorrect ? 'border-emerald-500/50' : 'border-red-500/50')}>
                                <div className="flex items-start gap-3 mb-4">
                                    {isCorrect ? (
                                        <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1" />
                                    ) : (
                                        <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                                    )}
                                    <div className="flex-1">
                                        <div className="text-sm text-zinc-500 mb-1">Question {i + 1}</div>
                                        <h4 className="text-lg font-bold mb-3">{q.question}</h4>

                                        <div className="space-y-2">
                                            <div>
                                                <span className="text-sm text-zinc-400">Your answer: </span>
                                                <span className={'font-medium ' + (isCorrect ? 'text-emerald-400' : 'text-red-400')}>
                                                    {userAnswerText}
                                                </span>
                                            </div>
                                            {!isCorrect && (
                                                <div>
                                                    <span className="text-sm text-zinc-400">Correct answer: </span>
                                                    <span className="font-medium text-emerald-400">
                                                        {correctAnswerText}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}