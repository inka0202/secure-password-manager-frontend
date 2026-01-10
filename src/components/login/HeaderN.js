import React from "react";
import { Link } from "react-router-dom";
import lockIcon from "../../assets/lock_icon.png";
import "../../styles/Navbar.css";
import "../../styles/Login.css";
import clouds from "../../assets/clouds.png";

function HeaderN() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="logoT">
          <img src={lockIcon} alt="Lock" className="lock-icon" />
        </Link>
        <span>
          <Link to="/" className="logoT">
            Secure Password Manager
          </Link>
        </span>
        <div>
          <img src={clouds} alt="Clouds" className="clouds" />
        </div>
      </div>
    </nav>
  );
}

export default HeaderN;
