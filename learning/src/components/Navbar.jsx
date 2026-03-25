import React from "react";
import "../styles/Navbar.css";
import { FaSearch, FaShoppingCart, FaGraduationCap } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <FaGraduationCap className="logo-icon" />
        <span>SkillStack</span>
      </div>

      {/* Menu */}
      <ul className="nav-links">
        <li>Home </li>
        <li>Pages </li>
        <li>Courses </li>
        <li>Blog </li>
        <li>Contact</li>
      </ul>

      {/* Right Section */}
      <div className="nav-right">
        
        <FaSearch className="icon" />

        <div className="cart">
          <FaShoppingCart className="icon" />
          <span className="badge">0</span>
        </div>

        <button className="login-btn">Login</button>
        <button className="signup-btn">Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;