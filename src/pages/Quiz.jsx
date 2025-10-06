import MainLayout from "../components/MainLayout";
import React, { useState } from 'react';
import { UseQuiz } from '../hooks/UseQuiz';
import { useAuth } from "../context/authContext";
import QuizModal from "../components/ui/Quiz/QuizModal";
import QuizTaking from "../components/ui/Quiz/QuizTaking";
import QuizResult from "../components/ui/Quiz/QuizResult";
import { Plus, Trash2, Play, Brain, } from 'lucide-react';
import QuizCard from "../components/ui/Quiz/QuizCard";

export default function Quiz() {
  const { user, loading: authLoading } = useAuth();
  const { quizzes, createQuiz, updateQuiz, deleteQuiz, loading: quizLoading } = UseQuiz(user.id);
  const [view, setView] = useState('library');

  const [showQuizModal, setShowQuizModal] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
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
console.log("Quizzes", quizzes);
  const handleSaveQuiz = async (quiz) => {
    try {
      const quizWithUser = { ...quiz, userId: user.id };

      if (isEditing) {
        await updateQuiz(quiz.id, quizWithUser);
        addToast('success', 'Changes saved!', 'Your changes have been saved');
      } else {
        await createQuiz(quizWithUser);
        addToast('success', 'Quiz created!', 'Your quiz has been successfully created.');
      }

      setShowQuizModal(false);
      setIsEditing(false);
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
    } catch (error) {
      console.error("Failed to save quiz:", error);
    }
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
        correctAnswer: ['']
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
      } else if (q.type === 'identification') {
        if (userAnswers[i]) {
          const isCorrect = q.correctAnswer.some(
            ans => ans.toLowerCase().trim() === userAnswers[i].toLowerCase().trim()
          );
          if (isCorrect) correct++;
        }
      }

    });
    return correct;
  };

  const handleDeleteQuiz = async (id) => {
    setQuizzes(quizzes.filter(quiz => quiz.id !== id));
    await deleteQuiz(id);
    addToast('info', 'Quiz deleted!', 'Your quiz has been successfully deleted.');
  };

   const handleEditQuiz = (task) => {
    setNewTask(task);
    setIsEditing(true);
    setShowTaskModal(true);
  };

  return (
    <MainLayout>
      <div className="min-h-screen text-white p-8">
        <div className="max-w-7xl mx-auto">
          {view === 'library' && (
            <>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-4xl font-bold mb-2">Quiz Library</h1>
                  <p className="text-zinc-400">Test your knowledge with custom quizzes</p>
                </div>
                <button
                  onClick={() => setShowQuizModal(true)}
                  className="bg-emerald-800 hover:bg-emerald-700 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Create Quiz
                </button>
              </div>

              {quizzes.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24">
                  <Brain className="w-24 h-24 text-zinc-700 mb-6" />
                  <h3 className="text-2xl font-bold mb-2">No quizzes yet</h3>
                  <p className="text-zinc-400 mb-6">Create your first quiz to start testing</p>
                  <button
                    onClick={() => setShowQuizModal(true)}
                    className="bg-emerald-800 hover:bg-emerald-700 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    Create Your First Quiz
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {quizzes.map(quiz => (
                    <QuizCard 
                      quiz = {quiz}
                      onDelete={handleDeleteQuiz}
                      startQuiz={startQuiz}
                      onEdit={handleEditQuiz}
                      />
                      
                  ))}
                  
                </div>
              )}
            </>
          )}

          {view === 'taking' && currentQuiz && !showResults && (
            <QuizTaking />
          )}

          {view === 'taking' && currentQuiz && showResults && (
            <QuizResult />
          )}

          <QuizModal
            isOpen={showQuizModal}
            onClose={() => setShowQuizModal(false)}
            onSave={handleSaveQuiz}
            quizData={newQuiz}
            setQuizData={setNewQuiz}
            isEditing={isEditing}
          />
        </div>
      </div>
    </MainLayout>
  );
}
