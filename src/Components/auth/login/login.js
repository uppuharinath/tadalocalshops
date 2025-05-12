import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { doSignInWithGoogle } from "../../../firebase/auth";
import { doSignInWithEmailAndPassword } from "../../../firebase/auth";
import { useAuth } from "../../../contexts/auth";

const Login = () => {
  // State and hooks
  const { userLoggedIn, currentUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Helper components
  const ForgotPasswordLink = () => (
    <div className="forgot-password mb-1r white">
      <Link 
        to="/forgot-password"
        state={{ from: location.state?.from }}
        className="text-link white"
      >
        Forgot password?
      </Link>
      <hr/>
    </div>
    
  );

  const RegisterLink = () => (
    <div className="register-link">
      Don't have an account?{' '}
      <Link 
        to="/register" 
        state={{ from: location.state?.from }}
        className="text-link white"
      >
        Register
      </Link>
      <hr/>
    </div>
  );

  // Auth state handler
  useEffect(() => {
    if (userLoggedIn) {
      const redirectPath = currentUser?.emailVerified 
        ? location.state?.from || '/'
        : '/verify-email';
      navigate(redirectPath, { replace: true });
    }
  }, [userLoggedIn, currentUser, navigate, location.state]);

  // Form handlers
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Please enter both email and password');
      return;
    }

    if (!isSigningIn) {
      setIsSigningIn(true);
      setErrorMessage('');
      try {
        await doSignInWithEmailAndPassword(email, password);
      } catch (err) {
        handleAuthError(err);
      } finally {
        setIsSigningIn(false);
      }
    }
  };

const onGoogleSignIn = async (e) => {
  e.preventDefault();
  if (!isSigningIn) {
    setIsSigningIn(true);
    setErrorMessage('');
    try {
      const userCredential = await doSignInWithGoogle(); // This should return user info
      if (userCredential?.user?.emailVerified) {
        navigate('/', { replace: true });
      } else {
        navigate('/verify-email', { replace: true });
      }
    } catch (err) {
      handleAuthError(err);
    } finally {
      setIsSigningIn(false);
    }
  }
};

  // Error handler
  const handleAuthError = (error) => {
    let message = error.message;
    switch (error.code) {
      case 'auth/invalid-credential':
        message = 'Invalid email or password';
        break;
      case 'auth/too-many-requests':
        message = 'Account temporarily locked due to multiple failed attempts';
        break;
      case 'auth/popup-closed-by-user':
        message = 'Google sign-in was cancelled';
        break;
      default:
        message = 'Login failed. Please try again.';
    }
    setErrorMessage(message);
  };

  // Render
  return (
    <div className="container login-container bg-black plpr-1r">
      <div className="login-card">
        <h2 className="login-title text-center pt-1r">Login to View Best of Tada Local Services</h2>
        <hr/>
       
       <div className="row">
        <div className="col-6">
          <form onSubmit={onSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="Enter your password"
            />
            <ForgotPasswordLink />
          </div>

          {errorMessage && (
            <div className="error-message">{errorMessage}</div>
          )}

          <button
            type="submit"
            disabled={isSigningIn}
            className={`btn login-button ${isSigningIn ? 'loading' : ''}`}
            aria-busy={isSigningIn}
          >
            {isSigningIn ? (
              <>
                <span className="spinner btn" aria-hidden="true"></span>
                Signing In...
              </>
            ) : 'Sign In'}
          </button>

          <div className="divider mt-1r mb-1r pl-1r">
            <span>OR</span>
          </div>

        <button
  onClick={onGoogleSignIn}
  disabled={isSigningIn}
  className={`google-button ${isSigningIn ? 'loading' : ''}`}
  type="button"
  aria-label="Continue with Google"
>
  <span className="google-icon" aria-hidden="true">
    <svg viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  </span>
  {isSigningIn ? (
    <>
      <span className="spinner" aria-hidden="true"></span>
      Signing In...
    </>
  ) : 'Continue with Google'}
</button>
<hr/>

        </form>
        </div>
        <div className="col-6 flex jcc aic m-auto text-center register-link">
          <RegisterLink />
        </div>
       </div>
        


        
      </div>
    </div>
  );
};

export default Login;