import React, { useState } from "react";
import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("dashboard");

  // 🔥 LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/"); // ✅ direct home page
  };

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

          <div className="section">
            <h2>My Tasks</h2>
            <ul>
              <li>✔ Complete React Project</li>
              <li>✔ Watch Node.js Lecture</li>
              <li>✔ Revise MongoDB</li>
            </ul>
          </div>

          <div className="section">
            <h2>Continue Learning</h2>
            <div className="course-list">
              <div className="course-card">
                <h4>React Development</h4>
                <p>Progress: 60%</p>
              </div>
              <div className="course-card">
                <h4>Node.js Backend</h4>
                <p>Progress: 40%</p>
              </div>
              <div className="course-card">
                <h4>MongoDB Mastery</h4>
                <p>Progress: 20%</p>
              </div>
            </div>
          </div>
        </>
      );
    }

    if (activeTab === "courses") return <h2>Courses Section</h2>;
    if (activeTab === "progress") return <h2>Progress Section</h2>;
    if (activeTab === "messages") return <h2>Messages Section</h2>;

    if (activeTab === "settings") {
      return (
        <div className="section">
          <h2>Profile</h2>
          <p>Name: {user?.name}</p>
          <p>Email: {user?.email}</p>
        </div>
      );
    }
  };

  return (
    <div className="dashboard-container">

      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="logo">SkillStack</h2>

        <ul>
          <li onClick={() => setActiveTab("dashboard")} className={activeTab==="dashboard" ? "active" : ""}>Dashboard</li>
          <li onClick={() => setActiveTab("courses")} className={activeTab==="courses" ? "active" : ""}>Courses</li>
          <li onClick={() => setActiveTab("progress")} className={activeTab==="progress" ? "active" : ""}>Progress</li>
          <li onClick={() => setActiveTab("messages")} className={activeTab==="messages" ? "active" : ""}>Messages</li>
          <li onClick={() => setActiveTab("settings")} className={activeTab==="settings" ? "active" : ""}>Settings</li>
        </ul>
      </div>

      {/* Main */}
      <div className="main-content">

        {/* 🔥 HEADER */}
        <div className="header">
          <h1>Welcome, {user?.name} 👋</h1>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            
            {/* PROFILE */}
            <img 
              src={`https://ui-avatars.com/api/?name=${user?.name}`} 
              alt="profile"
              style={{ width: "40px", borderRadius: "50%" }}
            />

            {/* 🔥 LOGOUT BUTTON */}
            <button
              onClick={handleLogout}
              style={{
                padding: "8px 15px",
                background: "#ef4444",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              Logout
            </button>

          </div>
        </div>

        {renderContent()}

      </div>
    </div>
  );
};

export default Dashboard;