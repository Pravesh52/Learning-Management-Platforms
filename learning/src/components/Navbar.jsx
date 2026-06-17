import React, { useState } from "react";
import "../styles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaGraduationCap, FaBars, FaTimes } from "react-icons/fa";
import Contact from "../pages/Contact";

const Navbar = () => {
  const navigate = useNavigate();
  const [showContact, setShowContact] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav className="navbar">

        {/* ── LOGO ── */}
        <div className="logo" onClick={() => { navigate("/"); closeMenu(); }}>
          <FaGraduationCap className="logo-icon" />
          <span>Climax Academy</span>
        </div>

        {/* ── HAMBURGER ── */}
        <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* ── DROPDOWN MENU ── */}
        <div className={`mobile-menu ${isOpen ? "open" : ""}`}>

          {/* Nav Links */}
          <ul className="nav-links">
            <li><Link to="/" onClick={closeMenu}>Home</Link></li>
            <li><Link to="/courses" onClick={closeMenu}>Courses</Link></li>
            <li><Link to="/pages" onClick={closeMenu}>Pages</Link></li>
            <li onClick={() => { setShowContact(true); closeMenu(); }}>Contact</li>
          </ul>

          {/* ── AUTH BUTTONS — mobile dropdown ke andar ── */}
          <div className="mobile-auth">
            {user ? (
              <>
                {user.role === "admin" && (
                  <button className="mobile-btn" onClick={() => { navigate("/admin"); closeMenu(); }}>
                    Admin Panel
                  </button>
                )}
                <span className="mobile-username" onClick={handleDashboardRedirect}>
                  👤 {user.name}
                </span>
                <button className="mobile-btn logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={closeMenu}>
                  <button className="mobile-btn login-btn">Login</button>
                </Link>
                <Link to="/signup" onClick={closeMenu}>
                  <button className="mobile-btn signup-btn">Sign Up</button>
                </Link>
              </>
            )}
          </div>

        </div>

        {/* ── DESKTOP NAV RIGHT (sirf desktop par dikhta hai) ── */}
        <ul className="nav-links desktop-only">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/courses">Courses</Link></li>
          <li><Link to="/pages">Pages</Link></li>
          <li onClick={() => setShowContact(true)}>Contact</li>
        </ul>

        <div className="nav-right desktop-only">
          <FaSearch className="icon" />
          <div className="cart">
            <FaShoppingCart className="icon" />
            <span className="badge">0</span>
          </div>

          {user ? (
            <>
              {user.role === "admin" && (
                <button onClick={() => navigate("/admin")}>Admin Panel</button>
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
              <Link to="/login">
                <button className="login-btn">Login</button>
              </Link>
              <Link to="/signup">
                <button className="signup-btn">Sign Up</button>
              </Link>
            </>
          )}
        </div>

      </nav>

      {showContact && <Contact onClose={() => setShowContact(false)} />}
    </>
  );
};

export default Navbar;