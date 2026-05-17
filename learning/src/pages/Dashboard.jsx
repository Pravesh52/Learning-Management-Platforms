import React, { useState, useRef, useEffect } from "react";
import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderContent = () => {
    if (activeTab === "dashboard") {
      return (
        <>
          <div className="stats">
            <div className="stat-card">
              <p>Enrolled Courses</p>
              <h2>12</h2>
            </div>
            <div className="stat-card">
              <p>In Progress</p>
              <h2>7</h2>
            </div>
            <div className="stat-card">
              <p>Completed</p>
              <h2>5</h2>
            </div>
            <div className="stat-card">
              <p>Pending Tasks</p>
              <h2>24</h2>
            </div>
          </div>

          
        </>
      );
    }

    if (activeTab === "courses") return <h2>Courses Section</h2>;
    if (activeTab === "messages") return <h2>Messages Section</h2>;
    if(activeTab === "notes") return <h2>NOtes Section</h2>
  };

  return (
    <div className="dashboard-container">

      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="logo">Climax Academy</h2>
        <ul>
          <li
            onClick={() => setActiveTab("dashboard")}
            className={activeTab === "dashboard" ? "active" : ""}
          >
            Dashboard
          </li>
          <li
            onClick={() => setActiveTab("courses")}
            className={activeTab === "courses" ? "active" : ""}
          >
            Courses
          </li>
          <li
            onClick={() => setActiveTab("messages")}
            className={activeTab === "messages" ? "active" : ""}
          >
            Messages
          </li>

           <li
            onClick={() => setActiveTab("notes")}
            className={activeTab === "notes" ? "active" : ""}
          >
            Notes 
          </li>
        </ul>
      </div>

      {/* Main */}
      <div className="main-content">

        {/* Header */}
        <div className="header">
          <h1>Welcome, {user?.name} 👋</h1>

          {/* Profile with Dropdown */}
          <div className="profile-wrapper" ref={dropdownRef}>
            <img
              src={`https://ui-avatars.com/api/?name=${user?.name}`}
              alt="profile"
              className="profile-avatar"
              onMouseEnter={() => setDropdownOpen(true)}
              onClick={() => setDropdownOpen((prev) => !prev)}
            />

            {dropdownOpen && (
              <div
                className="profile-dropdown"
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <p className="dropdown-email">{user?.email}</p>
                <hr />
                <button
                  className="dropdown-item"
                  onClick={() => {
                    setDropdownOpen(false);
                    // navigate("/settings");
                  }}
                >
                  ⚙️ Settings
                </button>
                <button
                  className="dropdown-item logout"
                  onClick={handleLogout}
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {renderContent()}

      </div>
    </div>
  );
};

export default Dashboard;