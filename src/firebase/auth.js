import { 
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
  sendEmailVerification
} from "firebase/auth";
import { app } from "./firebase";

// Initialize auth once with your Firebase app
const auth = getAuth(app);

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    console.error("Registration error:", error);
    throw error; // Re-throw for handling in UI
  }
};

export const doSignInWithEmailAndPassword = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// In your firebase/auth.js
export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account' // Forces account selection every time
  });
  
  try {
    const result = await signInWithPopup(auth, provider);
    return result;
  } catch (error) {
    console.error("Google sign-in error details:", error);
    if (error.code === 'auth/popup-closed-by-user') {
      throw new Error('Sign-in was cancelled');
    }
    throw error;
  }
};

export const doSignOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Sign out error:", error);
    throw error;
  }
};

export const doPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error("Password reset error:", error);
    throw error;
  }
};

export const doPasswordChange = async (password) => {
  try {
    if (!auth.currentUser) {
      throw new Error("No authenticated user");
    }
    await updatePassword(auth.currentUser, password);
  } catch (error) {
    console.error("Password change error:", error);
    throw error;
  }
};

export const doSendEmailVerification = async () => {
  try {
    if (!auth.currentUser) {
      throw new Error("No authenticated user");
    }
    await sendEmailVerification(auth.currentUser, {
      url: `${window.location.origin}/`,
    });
  } catch (error) {
    console.error("Email verification error:", error);
    throw error;
  }
};