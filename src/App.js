import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Verify2FA from "./pages/Verify2FA";
<<<<<<< Updated upstream
=======
import Manager from "./pages/Manager";
import ManagerA from "./pages/ManagerA";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AdminDashboard from "./pages/AdminDashboard";
>>>>>>> Stashed changes

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/aboutUs" element={<AboutUs />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify" element={<Verify2FA />} />
<<<<<<< Updated upstream
=======
      <Route path="/manager" element={<Manager />} />
      <Route path="/my-account" element={<ManagerA />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword/>} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
>>>>>>> Stashed changes
    </Routes>
  );
}

export default App;
