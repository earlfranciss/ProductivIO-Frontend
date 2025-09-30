import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoute from './components/routes/PrivateRoute'
import AuthRoute from './components/routes/AuthRoute'
import LandingPage from './pages/Auth/LandingPage'
import LoginPage from './pages/Auth/LoginPage'
import RegisterPage from './pages/Auth/RegisterPage'
import NotFound from './pages/Auth/NotFound'
import ForgotPassword from './pages/Auth/ForgotPassword'
import TwoFactorAuth from './pages/Auth/TwoFactorAuth'
import Notes from './pages/Notes'
import Tasks from './pages/Tasks'
import Quiz from './pages/Quiz'
import Pomodoro from './pages/Pomodoro'
import Flashcards from './pages/Flashcards'
import Dashboard from './pages/Dashboard'


function App() {

  const dummyNotes = [
    { id: 1, title: "Meeting Notes", content: "Discuss project timeline" },
    { id: 2, title: "Ideas", content: "Build AI-powered study tool" }
  ];

  const dummyTasks = [
    { id: 1, title: "Finish React layout", completed: false },
    { id: 2, title: "Write documentation", completed: true }
  ];

  // Dummy setter (just logs to console for now)
  const dummySetCurrentView = (view) => {
    console.log("Switching view to:", view);
  };



  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<AuthRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/two-factor" element={<TwoFactorAuth />} />
        </Route>
        {/* <Route element={<PrivateRoute />}> */}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route
          path="/dashboard"
          element={
            <Dashboard
              notes={dummyNotes}
              tasks={dummyTasks}
              setCurrentView={dummySetCurrentView}
            />
          }
        />
        <Route path="/notes" element={<Notes />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/flashcards" element={<Flashcards />} />
        <Route path="/pomodoro" element={<Pomodoro />} />
        {/* </Route> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
