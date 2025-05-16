import React from "react";
import lockIcon from "../../assets/lock_icon.png";
import "../../styles/Navbar.css";
import "../../styles/Login.css";
import clouds from "../../assets/clouds.png";

function HeaderN() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={lockIcon} alt="Lock" className="lock-icon" />
        <span>Secure</span>
        <div>
          <img src={clouds} alt="Clouds" className="clouds"></img>
        </div>
      </div>
    </nav>
  );
}

export default HeaderN;
