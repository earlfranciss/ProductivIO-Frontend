import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/authContext";

export default function AuthRoute() {
  const { user } = useAuth();

  // If logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  // If not logged in, render the requested auth page
  return <Outlet />;
}
