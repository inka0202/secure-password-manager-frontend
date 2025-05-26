import React from "react";
import lockIcon from "../../assets/lock_icon.png";
import "../../styles/Navbar.css";
import "../../styles/Login.css";
import clouds from "../../assets/clouds.png";

function HeaderN() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
<<<<<<< Updated upstream
        <img src={lockIcon} alt="Lock" className="lock-icon" />
        <span>Secure</span>
=======
        <Link to="/" className="logoT">
          <img src={lockIcon} alt="Lock" className="lock-icon" />
        </Link>
        <span>
          <Link to="/" className="logoT">
            Giggle Password Manager
          </Link>
        </span>
>>>>>>> Stashed changes
        <div>
          <img src={clouds} alt="Clouds" className="clouds"></img>
        </div>
      </div>
    </nav>
  );
}

export default HeaderN;
