import React, { useState } from "react";
import "../styles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaGraduationCap, FaBars, FaTimes } from "react-icons/fa";
import Contact from "../pages/Contact";

const Navbar = () => {
  const navigate = useNavigate();
  const [showContact, setShowContact] = useState(false);
  const [isOpen, setIsOpen] = useState(false);   // ✅ hamburger state

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsOpen(false);
    navigate("/login");
  };

  const handleDashboardRedirect = () => {
    if (!user) return;
    setIsOpen(false);
    if (user.role === "admin") navigate("/admin");
    else navigate("/dashboard");
  };

  // link click par menu band ho jaye
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav className="navbar">

        {/* LOGO */}
        <div className="logo" onClick={() => { navigate("/"); closeMenu(); }}>
          <FaGraduationCap className="logo-icon" />
          <span>Climax Academy</span>
        </div>

        {/* ✅ HAMBURGER BUTTON — sirf mobile par dikhta hai */}
        <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* ✅ NAV LINKS — mobile par .open class se toggle hoti hai */}
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li><Link to="/" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/courses" onClick={closeMenu}>Courses</Link></li>
          <li><Link to="/pages" onClick={closeMenu}>Pages</Link></li>
          <li
            onClick={() => { setShowContact(true); closeMenu(); }}
            style={{ cursor: "pointer" }}
          >
            Contact
          </li>
        </ul>

        {/* ✅ NAV RIGHT — mobile par .open class se toggle hoti hai */}
        <div className={`nav-right ${isOpen ? "open" : ""}`}>
          <FaSearch className="icon" />

          <div className="cart">
            <FaShoppingCart className="icon" />
            <span className="badge">0</span>
          </div>

          {user ? (
            <>
              {user.role === "admin" && (
                <button onClick={() => { navigate("/admin"); closeMenu(); }}>
                  Admin Panel
                </button>
              )}

              <span onClick={handleDashboardRedirect} style={{ cursor: "pointer" }}>
                {user.name}
              </span>

              <img
                src={`https://ui-avatars.com/api/?name=${user.name}`}
                alt="profile"
                onClick={handleDashboardRedirect}
                style={{ width: 36, height: 36, borderRadius: "50%", cursor: "pointer" }}
              />

              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu}>
                <button className="login-btn">Login</button>
              </Link>
              <Link to="/signup" onClick={closeMenu}>
                <button className="signup-btn">Sign Up</button>
              </Link>
            </>
          )}
        </div>

      </nav>

      {/* CONTACT MODAL */}
      {showContact && (
        <Contact onClose={() => setShowContact(false)} />
      )}
    </>
  );
};

export default Navbar;