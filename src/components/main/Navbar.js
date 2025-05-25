import React, { useState } from "react";
import "../../styles/Navbar.css";
import lockIcon from "../../assets/lock_icon.png";
import { Link } from "react-router-dom";
import "../../styles/Login.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="logoT">
          <img src={lockIcon} alt="Lock" className="lock-icon" />
        </Link>
        <span>
          <Link to="/" className="logoT">
            Secure
          </Link>
        </span>
      </div>
      {/* Меню */}
      <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <li>
          <Link to="/" className="linkA" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/manager"
            className="linkA"
            onClick={() => setMenuOpen(false)}
          >
            Manager
          </Link>
        </li>
        <li>
          <Link
            to="/aboutUs"
            className="linkA"
            onClick={() => setMenuOpen(false)}
          >
            About Us
          </Link>
        </li>
      </ul>
      <div className="navbar-right">
        <button className="burger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <Link to="/login" className="linkA last-link">
          Log In
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
