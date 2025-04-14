import React from "react";
import "../styles/Navbar.css";
import lockIcon from "../assets/lock_icon.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={lockIcon} alt="Lock" className="lock-icon" />
        <span>Secure</span>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/" className="linkA">
            Home
          </Link>
        </li>
        <li>
          <Link to="/manager" className="linkA">
            Manager
          </Link>
        </li>
        <li>
          <Link to="/aboutUs" className="linkA">
            About Us
          </Link>
        </li>
        <li>
          <Link to="/login" className="linkA last-link">
            Log In
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
