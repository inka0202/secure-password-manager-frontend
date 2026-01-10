import React from "react";
import HeaderAd from "../components/admin/HeaderAd"; // or HeaderM.js
import UsersList from "../components/admin/UserList";
import "../styles/AdminDashboard.css";

function AdminDashboard() {
  return (
    <div className="dashboard-container">
      <HeaderAd />
      <div className="dashboard-content">
        <UsersList />
      </div>
    </div>
  );
}

export default AdminDashboard;
