import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';
import LoadingSpinner from '../LoadingSpinner'; // Create this component

const PublicRoute = ({ children }) => {
  const { userLoggedIn, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  // If user is logged in, redirect to home or original destination
  if (userLoggedIn) {
    return <Navigate 
      to={location.state?.from || '/home'} 
      replace 
      state={{ from: location }}
    />;
  }

  return children;
};

export default PublicRoute;