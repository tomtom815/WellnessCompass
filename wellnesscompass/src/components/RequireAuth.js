import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// Define a functional component named RequireAuth.
const RequireAuth = () => {
  // Use the custom AuthContext hook to access the auth status.
  const { auth } = useAuth();

  // Use the useLocation hook from react-router-dom to get the current location.
  const location = useLocation();

  // Check if the user is authenticated (auth?.user is truthy).
  // If authenticated, render the child components nested inside the <RequireAuth> component (the <Outlet />).
  // If not authenticated, redirect to the login page ("/login") while preserving the current location (from: location).
  // The "replace" prop replaces the current history entry instead of adding a new one.
  return auth?.user ? (
    <Outlet /> // Render the child components inside the outlet when authenticated.
  ) : (
    <Navigate to="/login" state={{ from: location }} replace /> // Redirect to the login page when not authenticated.
  );
}

export default RequireAuth;
