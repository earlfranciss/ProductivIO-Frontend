import { Navigate } from 'react-router-dom'
import { useAuth } from '../../authContext'

export default function AuthRoute({ children }){
    const { user } = useAuth;
    return user ? <Navigate to="/dashboard" replace /> : children;
}