// src/Components/auth/ProtectedRoute.js
import { useAuth } from '../../contexts/auth';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { userLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Or your loading spinner
  }

  return userLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;