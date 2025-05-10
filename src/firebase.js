import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCqLr-gBH-Xv_hu-ZFr5NkAoCRMxiq9orQ",
  authDomain: "tadalocalshops.firebaseapp.com",
  projectId: "tadalocalshops",
  storageBucket: "tadalocalshops.appspot.com",
  messagingSenderId: "861595347255",
  appId: "1:861595347255:web:222d3ebca8aea7cd1312b2",
  measurementId: "G-HZXMPY7PR0"
};

// Initialize Firebase app once
const app = initializeApp(firebaseConfig);

// Initialize services AFTER app is initialized
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { app, auth, analytics };
