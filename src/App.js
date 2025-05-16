import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import Register from './pages/Register';
import Verify2FA from './pages/Verify2FA';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/aboutUs" element={<AboutUs />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify" element={<Verify2FA />} />
    </Routes>
  );
}

export default App;
