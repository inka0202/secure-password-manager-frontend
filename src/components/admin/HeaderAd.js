import React from "react";
import { Link } from "react-router-dom";
import lockIcon from "../../assets/lock_icon.png";
import "../../styles/NavbarM.css";
import "../../styles/Login.css";

function HeaderAd() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={lockIcon} alt="Lock" className="sidebar-lock-icon" />
        <h2 id="h2h">Secure</h2>
      </div>
      <div className="sidebar-content">
        <div className="sidebar-links">
          <button className="sidebar-btn">
            <Link to="/admin-dashboard">Admin Management Panel</Link>
          </button>
          {/*    <button className="sidebar-btn">
            <Link to="/my-account-admin">My Account</Link>
          </button>
          <button className="sidebar-btn">
            <Link to="/manager-admin">My Passwords</Link>
          </button> */}
        </div>
      </div>
      <button className="btnLogout">
        <Link to="/">Logout</Link>
      </button>
    </div>
  );
}

export default HeaderAd;
