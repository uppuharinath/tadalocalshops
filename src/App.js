import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../src/Components/Header/index";
import './App.css';
import './custome.css';
import { useState } from "react";
import Body from "./Pages/body";
import Register from "./Components/auth/register/register";
import Login from "./Components/auth/login/login";
import Profile from "./Components/Profile/profile";
import { AuthProvider } from "./contexts/auth";
import VerifyEmail from "./Components/auth/verifyemail/VerifyEmail";
import ProtectedRoute from "./Components/auth/ProtectedRoute";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [userProfile, setUserProfile] = useState(null);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Header searchInput={searchInput} setSearchInput={setSearchInput} />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Body searchInput={searchInput} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email" element={<VerifyEmail />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile userProfile={userProfile} />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;