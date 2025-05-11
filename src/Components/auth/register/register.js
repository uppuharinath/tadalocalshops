import { useState, useEffect } from "react";
import { Navigate, Link, useNavigate, useLocation } from "react-router-dom";
import { 
  doCreateUserWithEmailAndPassword, 
  doSignInWithGoogle,
  doSendEmailVerification
} from "../../../firebase/auth";
import { useAuth } from "../../../contexts/auth";
import LoadingSpinner from "../../LoadingSpinner"; // Assume you have a spinner component

const Register = () => {
  const { userLoggedIn, currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if already logged in
useEffect(() => {
  // Only redirect if we have a confirmed logged-in user
  if (userLoggedIn && currentUser) {
    if (currentUser.emailVerified) {
      navigate(location.state?.from || '/home', { replace: true });
    } else {
      navigate('/verify-email', { replace: true });
    }
  }
}, [userLoggedIn, currentUser, navigate, location.state]);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors when user types
    if (errorMessage) setErrorMessage('');
  };

  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setErrorMessage('All fields are required');
      return false;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage('Please enter a valid email address');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return false;
    }
    
    if (formData.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters");
      return false;
    }
    
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    
    if (!validateForm()) return;

    setIsProcessing(true);
    
    try {
      const userCredential = await doCreateUserWithEmailAndPassword(
        formData.email, 
        formData.password
      );
      
      await doSendEmailVerification(userCredential.user);
      
      setSuccessMessage('Registration successful! Please check your email to verify your account.');
      setFormData({ 
        name: '',
        email: '', 
        password: '', 
        confirmPassword: '' 
      });
      
      // Optional: Auto-redirect to verify-email page after 3 seconds
      setTimeout(() => {
        navigate('/verify-email');
      }, 3000);
      
    } catch (error) {
      handleAuthError(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    if (isProcessing) return;

    setIsProcessing(true);
    setErrorMessage('');
    setSuccessMessage('');
    
    try {
      await doSignInWithGoogle();
      // Google sign-in will automatically redirect via the auth state listener
    } catch (error) {
      handleAuthError(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAuthError = (error) => {
    let message = 'An error occurred. Please try again.';
    
    switch (error.code) {
      case 'auth/email-already-in-use':
        message = 'This email is already registered. Try logging in instead.';
        break;
      case 'auth/invalid-email':
        message = 'Please enter a valid email address.';
        break;
      case 'auth/weak-password':
        message = 'Password should be at least 6 characters.';
        break;
      case 'auth/operation-not-allowed':
        message = 'Email/password accounts are not enabled.';
        break;
      case 'auth/popup-closed-by-user':
        message = 'Google sign-in was cancelled.';
        break;
      default:
        message = error.message || 'Registration failed. Please try again.';
    }
    
    setErrorMessage(message);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (userLoggedIn) {
    return <Navigate to={currentUser?.emailVerified ? '/home' : '/verify-email'} replace />;
  }

  return (
    <div className="container ">
      <div className="row flex-column jcl">
        <div>
          <h2 className="w-80 ">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-light">
            Already have an account?{' '}
            <Link 
              to="/login" 
              state={{ from: location.state?.from }} 
              className="font-medium blue hover:text-indigo-500"
            >
              Sign in here
            </Link>
          </p>
        </div>

        {successMessage && (
          <div className="rounded-md bg-green-50 p-4 mb-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">{successMessage}</p>
                <div className="mt-2 text-sm text-green-700">
                  <p>
                    Didn't receive the email?{' '}
                    <button
                      onClick={async () => {
                        try {
                          await doSendEmailVerification();
                          setSuccessMessage('Verification email resent! Please check your inbox.');
                        } catch (error) {
                          setErrorMessage('Failed to resend verification email');
                        }
                      }}
                      className="font-medium text-green-800 hover:text-green-700 underline"
                    >
                      Resend verification email
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="rounded-md bg-red-50 p-4 mb-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{errorMessage}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={formData.name}
                onChange={handleInputChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Full name (optional)"
              />
            </div>

            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                disabled={isProcessing}
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password (min 6 characters)"
                disabled={isProcessing}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {showPassword ? (
                  <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
                disabled={isProcessing}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isProcessing}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <LoadingSpinner className="h-5 w-5 mr-2" />
                  Creating account...
                </>
              ) : 'Register'}
            </button>
          </div>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <div>
          <button
            onClick={handleGoogleSignIn}
            disabled={isProcessing}
            type="button"
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;