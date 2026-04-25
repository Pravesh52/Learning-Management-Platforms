import React from "react";
import "../styles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaGraduationCap } from "react-icons/fa";

const Navbar = () => {

  const navigate = useNavigate();

  // ✅ USER GET FROM LOCAL STORAGE
  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // ✅ ROLE BASED NAVIGATION
  const handleDashboardRedirect = () => {
    if (!user) return;

    if (user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <nav className="navbar">

      {/* 🔥 LOGO */}
      <div
        className="logo"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        <FaGraduationCap className="logo-icon" />
        <span>SkillStack</span>
      </div>

      {/* 🔥 MENU */}
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/pages">Pages</Link></li>
        <li><Link to="/">Contact</Link></li>
      </ul>

      {/* 🔥 RIGHT SECTION */}
      <div className="nav-right">

        <FaSearch className="icon" />

        <div className="cart">
          <FaShoppingCart className="icon" />
          <span className="badge">0</span>
        </div>

        {/* ✅ IF USER LOGGED IN */}
        {user ? (
          <>
            {/* 🔥 ADMIN BUTTON */}
            {user.role === "admin" && (
              <button
                className="login-btn"
                onClick={() => navigate("/admin")}
                style={{ marginRight: "10px" }}
              >
                Admin Panel
              </button>
            )}

            {/* 🔥 USER NAME */}
            <span
              onClick={handleDashboardRedirect}
              style={{
                marginRight: "10px",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              {user.name}
            </span>

            {/* 🔥 PROFILE IMAGE */}
            <img
              src={`https://ui-avatars.com/api/?name=${user.name}`}
              alt="profile"
              onClick={handleDashboardRedirect}
              style={{
                width: "35px",
                height: "35px",
                borderRadius: "50%",
                marginRight: "10px",
                cursor: "pointer"
              }}
            />

            {/* 🔥 LOGOUT */}
            <button className="login-btn" onClick={handleLogout}>
              Logout
            </button>
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
  );
};

export default Navbar;