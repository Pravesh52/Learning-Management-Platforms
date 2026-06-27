import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import { useCart } from "../../context/CartContext";
import Image from "../../assets/Image.png"
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { getCartCount } = useCart();

  const isLoggedIn = !!localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Courses", path: "/courses" },
    { label: "Notes", path: "/notes" },
    { label: "Branches", path: "/branches" },
    { label: "Blogs", path: "/blogs" },
    { label: "About Us", path: "/about-us" },
    { label: "Contact Us", path: "/contact-us" },
  ];

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        {/* LOGO */}
        <Link to="/" className="header-logo">
          {/* <img src="/Image.png" alt="Climax Academy" /> */}
          <img src={Image} alt="Climax Academy" />
          <span className="header-logo-text">CLIMAX ACADEMY</span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="header-nav desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={location.pathname === link.path ? "active" : ""}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="header-actions">
          <Link to="/cart" className="header-cart-icon">
            🛒
            {getCartCount() > 0 && (
              <span className="cart-count-badge">{getCartCount()}</span>
            )}
          </Link>

          {isLoggedIn ? (
            <Link
              to={user?.role === "admin" ? "/admin" : "/dashboard"}
              className="header-dashboard-btn"
            >
              Dashboard
            </Link>
          ) : (
            <Link to="/login" className="header-login-btn">
              Login
            </Link>
          )}

          {/* HAMBURGER */}
          <button
            className="hamburger-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={menuOpen ? "open" : ""}></span>
            <span className={menuOpen ? "open" : ""}></span>
            <span className={menuOpen ? "open" : ""}></span>
          </button>
        </div>
      </div>

      {/* MOBILE NAV */}
      <nav className={`mobile-nav ${menuOpen ? "open" : ""}`}>
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={location.pathname === link.path ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        {isLoggedIn ? (
          <Link
            to={user?.role === "admin" ? "/admin" : "/dashboard"}
            className="mobile-dashboard-link"
            onClick={() => setMenuOpen(false)}
          >
            Go to Dashboard
          </Link>
        ) : (
          <Link
            to="/login"
            className="mobile-dashboard-link"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;