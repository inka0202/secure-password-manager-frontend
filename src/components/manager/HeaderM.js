import React from "react";
import { Link, useNavigate } from "react-router-dom";
import lockIcon from "../../assets/lock_icon.png";
import "../../styles/NavbarM.css";
import "../../styles/Login.css";
import { jwtDecode } from 'jwt-decode';

function HeaderM() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // redirect to homepage
    window.location.reload(); // optional: refresh to trigger navbar change
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Link to="/" className="logoT">
          <img src={lockIcon} alt="Lock" className="sidebar-lock-icon" />
        </Link>
        <span>
          <Link to="/" className="logoT">Giggle Password Manager</Link>
        </span>
      </div>

      <div className="sidebar-content">
        <div className="sidebar-links">
          <button className="sidebar-btn">
            <Link to="/manager">My Passwords</Link>
          </button>
          <button className="sidebar-btn">
            <Link to="/my-account">My Account</Link>
          </button>
        </div>
      </div>

      <button className="btnLogout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default HeaderM;
