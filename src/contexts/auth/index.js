
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../../firebase/firebase';
import { 
  onAuthStateChanged,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';

const AuthContext = createContext();

console.log("onAuthStateChanged: ")
console.log(onAuthStateChanged)


export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

console.log("onAuthStateChanged after login: ")
console.log(onAuthStateChanged)
console.log("currentUser after: ")
console.log(currentUser)
console.log("userLoggedIn after: ")
console.log(userLoggedIn)
console.log("isLoading after: ")
console.log(isLoading)
console.log("error after: ")
console.log(error)


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({
          uid: user.uid,
          email: user.email,
          emailVerified: user.emailVerified,
          displayName: user.displayName,
          photoURL: user.photoURL,
          metadata: {
            creationTime: user.metadata.creationTime,
            lastSignInTime: user.metadata.lastSignInTime
          }
        });
        setUserLoggedIn(true);
      } else {
        setCurrentUser(null);
        setUserLoggedIn(false);
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const signOut = async () => {
    try {
      setIsLoading(true);
      await firebaseSignOut(auth);
      // Success - state will update via onAuthStateChanged
    } catch (err) {
      setError(err.message);
      throw err; // Re-throw to allow handling in components
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    currentUser,
    userLoggedIn,
    isLoading,
    error,
    signOut,
    signInWithGoogle,
    setError
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading ? children : (
        <div className="auth-loading-overlay ">
          <div className="spinner"></div>
          <p>Loading authentication state...</p>
        </div>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
