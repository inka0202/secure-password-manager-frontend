import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; 
import HeaderAd from "../components/admin/HeaderAd";
import UsersList from "../components/admin/UserList";
import "../styles/AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const decoded = jwtDecode(token);
      if (decoded.role !== "admin") {
        navigate("/");
      }
    } catch {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div
      className="dashboard-container"
      style={{ marginLeft: "240px", padding: "40px" }}
    >
      <HeaderAd />
      <div className="dashboard-content">
        <UsersList />
      </div>
    </div>
  );
}

export default AdminDashboard;
