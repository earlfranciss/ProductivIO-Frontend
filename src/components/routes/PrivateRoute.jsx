import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/authContext";

export default function PrivateRoute() {
  const { user } = useAuth();

  // If not logged in, send back to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If logged in, render the requested page
  return <Outlet />;
}
