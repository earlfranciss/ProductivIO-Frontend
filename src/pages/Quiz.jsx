import MainLayout from "../components/MainLayout";
import React, { useState } from 'react';
import { Plus, X, Save, CheckCircle, XCircle, Award, BarChart3, Trash2, Play, ChevronLeft } from 'lucide-react';

export default function Quizt() {
  const [view, setView] = useState('library');
  const [quizzes, setQuizzes] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  
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

  const handleCreateQuiz = () => {
    if (newQuiz.title.trim() && newQuiz.questions.some(q => q.question.trim())) {
      const validQuestions = newQuiz.questions.filter(q => {
        if (q.type === 'multiple') {
          return q.question.trim() && q.options.some(opt => opt.trim());
        } else if (q.type === 'trueFalse') {
          return q.question.trim();
        } else {
          return q.question.trim() && q.correctAnswer.trim();
        }
      });
      
      setQuizzes([...quizzes, { 
        ...newQuiz, 
        questions: validQuestions,
        id: Date.now(),
        createdAt: new Date().toLocaleDateString()
      }]);
      setNewQuiz({
        title: '',
        description: '',
        questions: [{ 
          type: 'multiple', 
          question: '', 
          options: ['', '', '', ''], 
          correctAnswer: 0 
        }]
      });
      setShowCreateModal(false);
    }
  };

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

  const updateQuestion = (index, field, value) => {
    const updatedQuestions = [...newQuiz.questions];
    updatedQuestions[index][field] = value;
    setNewQuiz({ ...newQuiz, questions: updatedQuestions });
  };

  const updateOption = (qIndex, optIndex, value) => {
    const updatedQuestions = [...newQuiz.questions];
    updatedQuestions[qIndex].options[optIndex] = value;
    setNewQuiz({ ...newQuiz, questions: updatedQuestions });
  };

  const removeQuestion = (index) => {
    if (newQuiz.questions.length > 1) {
      setNewQuiz({
        ...newQuiz,
        questions: newQuiz.questions.filter((_, i) => i !== index)
      });
    }
  };

  const changeQuestionType = (index, type) => {
    const updatedQuestions = [...newQuiz.questions];
    if (type === 'multiple') {
      updatedQuestions[index] = {
        type: 'multiple',
        question: updatedQuestions[index].question,
        options: ['', '', '', ''],
        correctAnswer: 0
      };
    } else if (type === 'trueFalse') {
      updatedQuestions[index] = {
        type: 'trueFalse',
        question: updatedQuestions[index].question,
        correctAnswer: true
      };
    } else {
      updatedQuestions[index] = {
        type: 'identification',
        question: updatedQuestions[index].question,
        correctAnswer: ''
      };
    }
    setNewQuiz({ ...newQuiz, questions: updatedQuestions });
  };

  const startQuiz = (quiz) => {
    setCurrentQuiz(quiz);
    setCurrentQuestionIndex(0);
    setUserAnswers(new Array(quiz.questions.length).fill(null));
    setShowResults(false);
    setView('taking');
  };

  const selectAnswer = (answer) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const submitQuiz = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    currentQuiz.questions.forEach((q, i) => {
      if (q.type === 'multiple' || q.type === 'trueFalse') {
        if (userAnswers[i] === q.correctAnswer) correct++;
      } else {
        if (userAnswers[i] && userAnswers[i].toLowerCase().trim() === q.correctAnswer.toLowerCase().trim()) {
          correct++;
        }
      }
    });
    return correct;
  };

  const deleteQuiz = (id) => {
    setQuizzes(quizzes.filter(quiz => quiz.id !== id));
  };

  return (
    <MainLayout>
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {view === 'library' && (
          <>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold mb-2">Quiz Library</h1>
                <p className="text-slate-400">Test your knowledge with custom quizzes</p>
              </div>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Create Quiz
              </button>
            </div>

            {quizzes.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24">
                <BarChart3 className="w-24 h-24 text-slate-700 mb-6" />
                <h3 className="text-2xl font-bold mb-2">No quizzes yet</h3>
                <p className="text-slate-400 mb-6">Create your first quiz to start testing</p>
                <button 
                  onClick={() => setShowCreateModal(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Create Your First Quiz
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quizzes.map(quiz => (
                  <div key={quiz.id} className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1">{quiz.title}</h3>
                        <p className="text-sm text-slate-400 mb-2">{quiz.description}</p>
                      </div>
                      <button 
                        onClick={() => deleteQuiz(quiz.id)}
                        className="text-slate-400 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded text-sm font-medium">
                        {quiz.questions.length} questions
                      </div>
                      <div className="text-xs text-slate-500">
                        Created: {quiz.createdAt}
                      </div>
                    </div>
                    <button 
                      onClick={() => startQuiz(quiz)}
                      className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <Play className="w-4 h-4" />
                      Start Quiz
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {view === 'taking' && currentQuiz && !showResults && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <button 
                  onClick={() => setView('library')}
                  className="text-blue-500 hover:text-blue-400 mb-2 flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back to Library
                </button>
                <h1 className="text-4xl font-bold mb-2">{currentQuiz.title}</h1>
                <p className="text-slate-400">Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}</p>
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all"
                    style={{ width: ((currentQuestionIndex + 1) / currentQuiz.questions.length * 100) + '%' }}
                  ></div>
                </div>
              </div>

              <div className="bg-slate-800 rounded-xl p-8 border border-slate-700 mb-6">
                <div className="mb-6">
                  <div className="text-sm text-slate-500 mb-2">
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
                    {currentQuiz.questions[currentQuestionIndex].options.map((option, i) => (
                      <button
                        key={i}
                        onClick={() => selectAnswer(i)}
                        className={'w-full text-left p-4 rounded-lg border-2 transition-all ' + 
                          (userAnswers[currentQuestionIndex] === i 
                            ? 'border-blue-500 bg-blue-500/20' 
                            : 'border-slate-600 hover:border-slate-500')}
                      >
                        <div className="flex items-center gap-3">
                          <div className={'w-6 h-6 rounded-full border-2 flex items-center justify-center ' +
                            (userAnswers[currentQuestionIndex] === i 
                              ? 'border-blue-500 bg-blue-500' 
                              : 'border-slate-500')}>
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
                          : 'border-slate-600 hover:border-slate-500')}
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
                          ? 'border-red-500 bg-red-500/20' 
                          : 'border-slate-600 hover:border-slate-500')}
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
                      className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <button 
                  onClick={previousQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Previous
                </button>
                
                <div className="text-slate-400">
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
                    className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
                  >
                    Next
                    <ChevronLeft className="w-5 h-5 rotate-180" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {view === 'taking' && currentQuiz && showResults && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <button 
                  onClick={() => setView('library')}
                  className="text-blue-500 hover:text-blue-400 mb-2 flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back to Library
                </button>
                <h1 className="text-4xl font-bold mb-2">Quiz Results</h1>
                <p className="text-slate-400">{currentQuiz.title}</p>
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-8 border border-blue-500/50 mb-8 text-center">
                <Award className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h2 className="text-4xl font-bold mb-2">
                  {calculateScore()} / {currentQuiz.questions.length}
                </h2>
                <p className="text-xl text-slate-300 mb-4">
                  {Math.round((calculateScore() / currentQuiz.questions.length) * 100)}% Correct
                </p>
                <div className="flex items-center justify-center gap-4">
                  <button 
                    onClick={() => {
                      setCurrentQuestionIndex(0);
                      setUserAnswers(new Array(currentQuiz.questions.length).fill(null));
                      setShowResults(false);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Retake Quiz
                  </button>
                  <button 
                    onClick={() => setView('library')}
                    className="bg-slate-700 hover:bg-slate-600 px-6 py-2 rounded-lg font-medium transition-colors"
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
                    isCorrect = userAnswers[i] && userAnswers[i].toLowerCase().trim() === q.correctAnswer.toLowerCase().trim();
                    userAnswerText = userAnswers[i] || 'No answer';
                    correctAnswerText = q.correctAnswer;
                  }

                  return (
                    <div key={i} className={'bg-slate-800 rounded-xl p-6 border-2 ' + (isCorrect ? 'border-emerald-500/50' : 'border-red-500/50')}>
                      <div className="flex items-start gap-3 mb-4">
                        {isCorrect ? (
                          <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1" />
                        ) : (
                          <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                        )}
                        <div className="flex-1">
                          <div className="text-sm text-slate-500 mb-1">Question {i + 1}</div>
                          <h4 className="text-lg font-bold mb-3">{q.question}</h4>
                          
                          <div className="space-y-2">
                            <div>
                              <span className="text-sm text-slate-400">Your answer: </span>
                              <span className={'font-medium ' + (isCorrect ? 'text-emerald-400' : 'text-red-400')}>
                                {userAnswerText}
                              </span>
                            </div>
                            {!isCorrect && (
                              <div>
                                <span className="text-sm text-slate-400">Correct answer: </span>
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
        )}

        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-slate-800 rounded-xl p-6 max-w-4xl w-full border border-slate-700 my-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Create Quiz</h2>
                <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Quiz Title</label>
                  <input
                    type="text"
                    value={newQuiz.title}
                    onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })}
                    placeholder="e.g., History Chapter 5, Math Practice Test"
                    className="w-full bg-slate-900 border border-blue-500 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Description (Optional)</label>
                  <input
                    type="text"
                    value={newQuiz.description}
                    onChange={(e) => setNewQuiz({ ...newQuiz, description: e.target.value })}
                    placeholder="Brief description of this quiz"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-white">Questions</label>
                    <button 
                      onClick={addQuestion}
                      className="text-blue-500 hover:text-blue-400 text-sm flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" />
                      Add Question
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {newQuiz.questions.map((question, qIndex) => (
                      <div key={qIndex} className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-slate-400">Question {qIndex + 1}</span>
                          <div className="flex items-center gap-2">
                            <select
                              value={question.type}
                              onChange={(e) => changeQuestionType(qIndex, e.target.value)}
                              className="bg-slate-800 border border-slate-600 rounded px-3 py-1 text-sm text-white focus:outline-none"
                            >
                              <option value="multiple">Multiple Choice</option>
                              <option value="trueFalse">True/False</option>
                              <option value="identification">Identification</option>
                            </select>
                            {newQuiz.questions.length > 1 && (
                              <button 
                                onClick={() => removeQuestion(qIndex)}
                                className="text-slate-400 hover:text-red-500"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs text-slate-500 mb-1">Question</label>
                            <input
                              type="text"
                              value={question.question}
                              onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                              placeholder="Enter your question"
                              className="w-full bg-slate-800 border border-slate-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>

                          {question.type === 'multiple' && (
                            <div>
                              <label className="block text-xs text-slate-500 mb-2">Options</label>
                              <div className="space-y-2">
                                {question.options.map((option, optIndex) => (
                                  <div key={optIndex} className="flex items-center gap-2">
                                    <input
                                      type="radio"
                                      name={'correct-' + qIndex}
                                      checked={question.correctAnswer === optIndex}
                                      onChange={() => updateQuestion(qIndex, 'correctAnswer', optIndex)}
                                      className="w-4 h-4"
                                    />
                                    <input
                                      type="text"
                                      value={option}
                                      onChange={(e) => updateOption(qIndex, optIndex, e.target.value)}
                                      placeholder={'Option ' + (optIndex + 1)}
                                      className="flex-1 bg-slate-800 border border-slate-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                  </div>
                                ))}
                              </div>
                              <p className="text-xs text-slate-500 mt-1">Select the correct answer</p>
                            </div>
                          )}

                          {question.type === 'trueFalse' && (
                            <div>
                              <label className="block text-xs text-slate-500 mb-2">Correct Answer</label>
                              <div className="flex gap-3">
                                <button
                                  onClick={() => updateQuestion(qIndex, 'correctAnswer', true)}
                                  className={'px-4 py-2 rounded-lg border-2 transition-all ' + 
                                    (question.correctAnswer === true 
                                      ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400' 
                                      : 'border-slate-600 text-slate-400')}
                                >
                                  True
                                </button>
                                <button
                                  onClick={() => updateQuestion(qIndex, 'correctAnswer', false)}
                                  className={'px-4 py-2 rounded-lg border-2 transition-all ' + 
                                    (question.correctAnswer === false 
                                      ? 'border-red-500 bg-red-500/20 text-red-400' 
                                      : 'border-slate-600 text-slate-400')}
                                >
                                  False
                                </button>
                              </div>
                            </div>
                          )}

                          {question.type === 'identification' && (
                            <div>
                              <label className="block text-xs text-slate-500 mb-1">Correct Answer</label>
                              <input
                                type="text"
                                value={question.correctAnswer}
                                onChange={(e) => updateQuestion(qIndex, 'correctAnswer', e.target.value)}
                                placeholder="Enter the correct answer"
                                className="w-full bg-slate-800 border border-slate-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 justify-end mt-6 pt-4 border-t border-slate-700">
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="px-6 py-3 rounded-lg font-medium text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleCreateQuiz}
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
                >
                  <Save className="w-5 h-5" />
                  Create Quiz
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </MainLayout>
  );
}
