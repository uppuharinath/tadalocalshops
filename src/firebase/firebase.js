// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// ✅ Firebase configuration (keep this secure in production)
const firebaseConfig = {
  apiKey: "AIzaSyCqLr-gBH-Xv_hu-ZFr5NkAoCRMxiq9orQ",
  authDomain: "tadalocalshops.firebaseapp.com",
  projectId: "tadalocalshops",
  storageBucket: "tadalocalshops.appspot.com", // ✅ fixed typo: was "firebasestorage.app"
  messagingSenderId: "861595347255",
  appId: "1:861595347255:web:222d3ebca8aea7cd1312b2",
  measurementId: "G-HZXMPY7PR0" // optional
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Authentication
const auth = getAuth(app);

export { app, auth };
