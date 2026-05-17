import React, { useState, useRef, useEffect } from "react";
import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:5000";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // ─── Data States ───────────────────────────────────────────
  const [courses, setCourses] = useState([]);
  const [messages, setMessages] = useState([]);
  const [pdfs, setPdfs] = useState([]);

  // ─── Loading / Error States ────────────────────────────────
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [loadingPdfs, setLoadingPdfs] = useState(false);
  const [errorCourses, setErrorCourses] = useState("");
  const [errorMessages, setErrorMessages] = useState("");
  const [errorPdfs, setErrorPdfs] = useState("");

  // ─── Auth Headers ──────────────────────────────────────────
  const authHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  // ─── Fetch Courses ─────────────────────────────────────────
  const fetchCourses = async () => {
    setLoadingCourses(true);
    setErrorCourses("");
    try {
      const res = await fetch(`${BASE_URL}/api/courses`, { headers: authHeaders });
      const data = await res.json();
      const published = data.filter((c) => c.status === "published");
      setCourses(published);
    } catch (err) {
      setErrorCourses("Courses load nahi hue. Server check karo.");
    } finally {
      setLoadingCourses(false);
    }
  };

  // ─── Fetch Messages (Notifications) ───────────────────────
  const fetchMessages = async () => {
    setLoadingMessages(true);
    setErrorMessages("");
    try {
      const res = await fetch(`${BASE_URL}/api/notifications/all`, { headers: authHeaders });
      const data = await res.json();
      setMessages(data.data || []);
    } catch (err) {
      setErrorMessages("Messages load nahi hue. Server check karo.");
    } finally {
      setLoadingMessages(false);
    }
  };

  // ─── Fetch PDFs ────────────────────────────────────────────
  const fetchPdfs = async () => {
    setLoadingPdfs(true);
    setErrorPdfs("");
    try {
      const res = await fetch(`${BASE_URL}/api/pdfs`, { headers: authHeaders });
      const data = await res.json();
      setPdfs(data);
    } catch (err) {
      setErrorPdfs("PDFs load nahi hue. Server check karo.");
    } finally {
      setLoadingPdfs(false);
    }
  };

  // ─── Tab change pe fetch ───────────────────────────────────
  useEffect(() => {
    if (activeTab === "courses" && courses.length === 0) fetchCourses();
    if (activeTab === "messages" && messages.length === 0) fetchMessages();
    if (activeTab === "pdfs" && pdfs.length === 0) fetchPdfs();
  }, [activeTab]);

  // ─── Logout ────────────────────────────────────────────────
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  // ─── Close dropdown on outside click ──────────────────────
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ─── Date Format Helper ────────────────────────────────────
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      day: "2-digit", month: "short", year: "numeric",
    });
  };

  // ══════════════════════════════════════════════════════════
  //  TAB CONTENT RENDERERS
  // ══════════════════════════════════════════════════════════

  const renderDashboard = () => (
    <>
      <div className="stats">
        <div className="stat-card"><p>Enrolled Courses</p><h2>12</h2></div>
        <div className="stat-card"><p>In Progress</p><h2>7</h2></div>
        <div className="stat-card"><p>Completed</p><h2>5</h2></div>
        <div className="stat-card"><p>Pending Tasks</p><h2>24</h2></div>
      </div>

      {/* <div className="section">
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
          <div className="course-card"><h4>React Development</h4><p>Progress: 60%</p></div>
          <div className="course-card"><h4>Node.js Backend</h4><p>Progress: 40%</p></div>
          <div className="course-card"><h4>MongoDB Mastery</h4><p>Progress: 20%</p></div>
        </div>
      </div> */}
    </>
  );

  const renderCourses = () => (
    <div className="section">
      <h2>Available Courses</h2>

      {loadingCourses && <p className="loading-text">⏳ Courses load ho rahe hain...</p>}
      {errorCourses && <p className="error-text">❌ {errorCourses}</p>}

      {!loadingCourses && !errorCourses && courses.length === 0 && (
        <p className="empty-text">Abhi koi published course nahi hai.</p>
      )}

      {!loadingCourses && courses.length > 0 && (
        <div className="course-grid">
          {courses.map((course) => (
            <div className="course-card-full" key={course._id}>
              <div className="course-badge">✅ Published</div>
              <h3>{course.title}</h3>
              <div className="course-meta">
                <span>⏱ {course.timing}</span>
                <span>💰 ₹{course.price}</span>
              </div>
              <p className="course-date">Added: {formatDate(course.createdAt)}</p>
              <button className="enroll-btn">Enroll Now</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderMessages = () => (
    <div className="section">
      <h2>Messages from Admin</h2>

      {loadingMessages && <p className="loading-text">⏳ Messages load ho rahe hain...</p>}
      {errorMessages && <p className="error-text">❌ {errorMessages}</p>}

      {!loadingMessages && !errorMessages && messages.length === 0 && (
        <p className="empty-text">Abhi koi message nahi hai.</p>
      )}

      {!loadingMessages && messages.length > 0 && (
        <div className="message-list">
          {messages.map((msg) => (
            <div className="message-card" key={msg._id}>
              <div className="message-header">
                <h4>📢 {msg.subject}</h4>
                <span className="message-date">{formatDate(msg.createdAt)}</span>
              </div>
              <p className="message-body">{msg.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderPdfs = () => (
    <div className="section">
      <h2>Study Materials (PDFs)</h2>

      {loadingPdfs && <p className="loading-text">⏳ PDFs load ho rahe hain...</p>}
      {errorPdfs && <p className="error-text">❌ {errorPdfs}</p>}

      {!loadingPdfs && !errorPdfs && pdfs.length === 0 && (
        <p className="empty-text">Abhi koi PDF upload nahi hui hai.</p>
      )}

      {!loadingPdfs && pdfs.length > 0 && (
        <div className="pdf-grid">
          {pdfs.map((pdf) => (
            <div className="pdf-card" key={pdf._id}>
              <div className="pdf-icon">📄</div>
              <div className="pdf-info">
                <h4>{pdf.title}</h4>
                <p>Course: {pdf.course || "General"}</p>
                <p className="pdf-date">Uploaded: {formatDate(pdf.createdAt)}</p>
              </div>
              <a
                href={`${BASE_URL}/upload/${pdf.pdf}`}
                target="_blank"
                rel="noopener noreferrer"
                className="pdf-download-btn"
              >
                ⬇ Download
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard": return renderDashboard();
      case "courses":   return renderCourses();
      case "messages":  return renderMessages();
      case "pdfs":      return renderPdfs();
      default:          return renderDashboard();
    }
  };

  // ══════════════════════════════════════════════════════════
  //  MAIN RENDER
  // ══════════════════════════════════════════════════════════

  return (
    <div className="dashboard-container">

      {/* ── Sidebar ── */}
      <div className="sidebar">
        <h2 className="logo">SkillStack</h2>
        <ul>
          {[
            { id: "dashboard", label: "🏠 Dashboard" },
            { id: "courses",   label: "📚 Courses"   },
            { id: "messages",  label: "💬 Messages"  },
            { id: "pdfs",      label: "📄 PDFs"      },
          ].map((tab) => (
            <li
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={activeTab === tab.id ? "active" : ""}
            >
              {tab.label}
            </li>
          ))}
        </ul>
      </div>

      {/* ── Main Content ── */}
      <div className="main-content">

        {/* Header */}
        <div className="header">
          <h1>Welcome, {user?.name} 👋</h1>

          {/* Profile Dropdown */}
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
                  onClick={() => { setDropdownOpen(false); navigate("/settings"); }}
                >
                  ⚙️ Settings
                </button>
                <button className="dropdown-item logout" onClick={handleLogout}>
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Tab Content */}
        {renderContent()}

      </div>
    </div>
  );
};

export default Dashboard;