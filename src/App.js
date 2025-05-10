import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../src/Components/Header/index";
import './App.css';
import './custome.css';
import React, { useState } from "react";
import Body from "./Pages/body"; // Assuming Body component exists
import Register from "./Components/Register/register";
import Profile from "./Components/Profile/profile"; // Import Profile component

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [userProfile, setUserProfile] = useState(null); // State to hold user profile data

  return (
    <BrowserRouter>
      <Header searchInput={searchInput} setSearchInput={setSearchInput} />
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/register" element={<Register setUserProfile={setUserProfile} />} />
        {/* Route for Profile */}
        <Route
          path="/profile"
          element={<Profile userProfile={userProfile} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
