import React from 'react';
import '../styles/Navbar.css';
import lockIcon from '../assets/lock_big.png';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
      <img src={lockIcon} alt="Lock" className="lock-icon" />
        <span>Secure</span>
        </div>
      <ul className="navbar-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">Manager</a></li>
        <li><a href="#">About Us</a></li>
        <li><a href="#">Log In</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;