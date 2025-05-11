import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/auth'; // Corrected path
import { doSendEmailVerification } from '../../../firebase/auth';
import LoadingSpinner from '../../LoadingSpinner';
import { Link } from 'react-router-dom';

const VerifyEmail = () => {
  const { currentUser, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!currentUser) {
        navigate('/login');
      } else if (currentUser.emailVerified) {
        navigate('/home');
      }
    }
  }, [currentUser, isLoading, navigate]);

  const handleResend = async () => {
    try {
      await doSendEmailVerification();
      alert('Verification email resent! Please check your inbox.');
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="verify-email-container">
      <h2>Verify Your Email Address</h2>
      <p>
        We've sent a verification email to <strong>{currentUser?.email}</strong>.
        Please check your inbox and click the verification link.
      </p>
      <div className="verify-email-actions">
        <button onClick={handleResend} className="resend-button">
          Resend Verification Email
        </button>


        <button 
          onClick={() => navigate('/login')} 
          className="back-to-login"
        >
        
        <Link
        to="/login"
        className="back-to-login" // Ensure this styles like a button
        state={{ from: 'verify-email' }} // Optional state
        replace // Optional: replaces history entry
        >

      
          Back to Login
          </Link>
        </button>
      </div>
      <p className="email-note">
        Note: If you don't see the email, please check your spam folder.
      </p>
    </div>
  );
};

export default VerifyEmail;