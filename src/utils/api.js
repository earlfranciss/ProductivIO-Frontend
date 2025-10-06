const BASE_URL = import.meta.env.VITE_API_URL;

async function http(path, options = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", 
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}), 
    },
    ...options,
  });

  const resClone = res.clone();

  if (!res.ok) {
    let errorBody;
    try {
      errorBody = await res.json();
    } catch {
      try {
        errorBody = await resClone.text();
      } catch {
        errorBody = null;
      }
    }

    const errorMessage =
      (errorBody && errorBody.message) ||
      (typeof errorBody === "string" ? errorBody : null) ||
      "API Error";

    const error = new Error(errorMessage);
    error.status = res.status;
    error.statusText = res.statusText;
    error.body = errorBody;
    throw error;
  }

  return res.status === 204 ? null : res.json();
}

export const api = {
  // --- Auth ---
  login: (credentials) =>
    http("/api/Auth/login", { method: "POST", body: JSON.stringify(credentials) }),
  register: (credentials) =>
    http("/api/Auth/register", { method: "POST", body: JSON.stringify(credentials) }),
  validate: (token) =>
    http("/api/Auth/validate", {
      headers: { Authorization: `Bearer ${token}` }
    }),

  // --- Tasks ---
  getTasks: (userId) => http(`/api/Tasks/user/${userId}`),
  getTask: (id, userId) => http(`/api/Tasks/${id}/user/${userId}`),
  createTask: (task) =>
    http("/api/Tasks", {method: "POST", body: JSON.stringify(task)}),
  updateTask: (id, task) =>
    http(`/api/Tasks/${id}`, { method: "PUT", body: JSON.stringify(task)}),
  deleteTask: (id, userId) =>
    http(`/api/Tasks/${id}/user/${userId}`, { method: "DELETE", }),

  // --- Notes ---
  getNotes: (userId) => http(`/api/Notes/user/${userId}`),
  getNote: (id, userId) => http(`/api/Notes/${id}/user/${userId}`),
  createNote: (note) =>
    http("/api/Notes", { method: "POST", body: JSON.stringify(note)}),
  updateNote: (id, note) =>
    http(`/api/Notes/${id}`, { method: "PUT", body: JSON.stringify(note)}),
  deleteNote: (id, userId) =>
    http(`/api/Notes/${id}/user/${userId}`, { method: "DELETE", }),

  // --- Quiz ---
  getQuizzes: (userId) => http(`/api/Quiz/user/${userId}`),
  getQuiz: (id, userId) => http(`/api/Quiz/${id}/user/${userId}`),
  createQuiz: (quiz) => 
    http("/api/Quiz", { method: "POST", body: JSON.stringify(quiz)}),
  updateQuiz: (id, quiz) =>
    http(`/api/Quiz/${id}`, { method: "PUT", body: JSON.stringify(quiz)}),
  deleteQuiz: (id, userId) =>
    http(`/api/Quiz/${id}/user/${userId}`, { method: "DELETE", }),

  // --- Quiz Questions ---
  updateQuizQuestion: (quizId, questionId, question) =>
    http(`/api/Quiz/${quizId}/questions/${questionId}`, { method: "PUT", body: JSON.stringify(question)}),
  deleteQuizQuestion: (questionId) =>
    http(`/api/Quiz/questions/${questionId}`, { method: "DELETE", }),

  // --- Quiz Answers ---
  createQuizAnswer: (questionId, answer) =>
    http(`/api/Quiz/questions/${questionId}/answers`, { method: "POST", body: JSON.stringify(answer)}),
  updateQuizAnswer: (questionId, answerId, answer) =>
    http(`/api/Quiz/questions/${questionId}/answers/${answerId}`, { method: "PUT", body: JSON.stringify(answer)}),
  deleteQuizAnswer: (answerId) =>
    http(`/api/Quiz/answers/${answerId}`, { method: "DELETE", }),

  // --- Flashcards ---
  getFlashcards: (userId) => http(`/api/Flashcard/user/${userId}`),
  getFlashcard: (id, userId) => http(`/api/Flashcard/${id}/user/${userId}`),
  createFlashcard: (flashcard) =>
    http("/api/Flashcard", { method: "POST", body: JSON.stringify(flashcard)}),
  updateFlashcard: (id, flashcard) =>
    http(`/api/Flashcard/${id}`, { method: "PUT", body: JSON.stringify(flashcard)}),
  deleteFlashcard: (id, userId) =>
    http(`/api/Flashcard/${id}/user/${userId}`, { method: "DELETE", }),
  
  // --- Flashcard Questions ---
  createFlashcardQuestion: (flashcardId, question) =>
    http(`/api/Flashcard/${flashcardId}/questions`, { method: "POST", body: JSON.stringify(question)}),
  updateFlashcardQuestion: (id, question) =>
    http(`/api/Flashcard/questions/${id}`, { method: "PUT", body: JSON.stringify(question)}),
  deleteFlashcardQuestion: (questionId) =>
    http(`/api/Flashcard/questions/${questionId}`, { method: "DELETE", }),

  // --- Flashcard Answers ---
  createFlashcardAnswer: (questionId, answer) => 
    http(`/api/Flashcard/questions/${questionId}/answers`, { method: "POST", body: JSON.stringify(answer)}),
  updateFlashcardAnswer: (id, answer) => 
    http(`/api/Flashcard/answers/${id}`, { method: "PUT", body: JSON.stringify(answer)}),
  deleteFlashcardAnswer: (answerId) => 
    http(`/api/Flashcard/answers/${answerId}`, { method: "DELETE", }),

  // --- Pomodoro ---
  getPomodoros: (userId) => http(`/api/Pomodoro/user/${userId}`),
  getPomodoro: (id, userId) => http(`/api/Pomodoro/${id}/user/${userId}`),
  createPomodoro: (pomodoro) => 
    http("/api/Pomodoro", { method: "POST", body: JSON.stringify(pomodoro)}),
  updatePomodoro: (id, pomodoro) =>
    http(`/api/Pomodoro/${id}`, { method: "PUT", body: JSON.stringify(pomodoro)}),
  deletePomodoro: (id, userId) => 
    http(`/api/Pomodoro/${id}/user/${userId}`, { method: "DELETE", }),
  completedSessionPomodoro: (userId) =>
    http(`/api/Pomodoro/user/${userId}/completedSession`),
  sessionDurationPomodoro: (userId) =>
    http(`/api/Pomodoro/user/${userId}/sessionDuration`),
}

