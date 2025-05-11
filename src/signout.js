import { useAuth } from './contexts/auth';
import { useNavigate } from 'react-router-dom';

const SignOutButton = () => {
  const { signOut, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/', { 
        replace: true,
        state: { from: 'signout' } // Optional: track signout action
      });
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  return (
    <button 
      onClick={handleSignOut}
      disabled={isLoading}    
      aria-label="Sign out"
    >
      {isLoading ? 'Signing Out...' : 'Sign Out'}
    </button>
  );
};

export default SignOutButton;