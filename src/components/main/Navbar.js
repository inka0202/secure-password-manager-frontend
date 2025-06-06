import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Navbar.css";
import "../../styles/Login.css";
import lockIcon from "../../assets/lock_icon.png";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  let initials = "";
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1])); // decode JWT payload
      const email = payload.email || "";
      const usernamePart = email.split("@")[0];
      initials = usernamePart
        .split(/[._-]/) // split by dot, underscore, dash if any
        .map((s) => s.charAt(0).toUpperCase())
        .join("")
        .slice(0, 2); // first two initials
    } catch (e) {
      console.error("Invalid token format");
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="logoT">
          <img src={lockIcon} alt="Lock" className="lock-icon" />
        </Link>
        <span>
          <Link to="/" className="logoT">Giggle Password Manager</Link>
        </span>
      </div>

      <ul className="navbar-links">
        <li><Link to="/" className="linkA">Home</Link></li>
        <li><Link to="/manager" className="linkA">Manager</Link></li>
        <li><Link to="/aboutUs" className="linkA">About Us</Link></li>
        <li>
          {token ? (
            <div
              className="user-initials-circle"
              onClick={() => navigate("/my-account")}
              title="My Account"
            >
              {initials || "U"}
            </div>
          ) : (
            <Link to="/login" className="linkA last-link">Log In</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
