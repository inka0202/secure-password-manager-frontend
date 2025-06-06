import { Routes, Route, Navigate } from 'react-router-dom';
import Main from "./pages/Main";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Verify2FA from "./pages/Verify2FA";
import Manager from "./pages/Manager";
import ManagerA from "./pages/ManagerA";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogs from "./pages/AdminLogs";
import RequireAuth from "./components/RequireAuth";


function App() {
  return (
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
         <Route path="/reset-password" element={<ResetPassword/>} />
         <Route path="/verify" element={<Verify2FA />} />
        <Route element={<RequireAuth />}>
          <Route path="/manager" element={<Manager />} />
          <Route path="/my-account" element={<ManagerA />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-logs" element={<AdminLogs />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
  );
}

export default App;
