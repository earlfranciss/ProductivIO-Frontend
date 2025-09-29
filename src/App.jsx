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
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/pomodoro" element={<Pomodoro />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
