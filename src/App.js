import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../src/Components/Header/index";
import './App.css';
import './custome.css';
import React, { useState } from "react";
import Body from "./Pages/body"; // Assuming Body component exists
import Register from "./Components/Register/register";
  


function App() {
  const [searchInput, setSearchInput] = useState("");
  console.log('searchInput');

  return (
    <BrowserRouter>
      {/* <Header/> */}
      <Routes>
        <Route path="/" element={<Body/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
