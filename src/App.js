import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/aboutUs" element={<AboutUs />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
