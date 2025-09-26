import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Notes from './pages/Notes'
import Tasks from './pages/Tasks'
import Quiz from './pages/Quiz'
import Pomodoro from './pages/Pomodoro'
import Flashcards from './pages/Flashcards'
import Dashboard from './pages/Dashboard'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/equipment-management" element={<ProtectedRoute><EquipmentManagementPage /></ProtectedRoute>} />
        <Route path="/assign-equipment" element={<ProtectedRoute><AssignEquipmentPage /></ProtectedRoute>} />
        <Route path="/employee-management" element={<ProtectedRoute><EmployeeManagementPage /></ProtectedRoute>} />
      </Routes>
    </Router>
  )
}

export default App
