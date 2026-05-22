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

  const [courses, setCourses] = useState([]);
  const [messages, setMessages] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const [liveClasses, setLiveClasses] = useState([]);

  const [loadingCourses, setLoadingCourses] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [loadingPdfs, setLoadingPdfs] = useState(false);
  const [loadingLiveClasses, setLoadingLiveClasses] = useState(false);

  const [errorCourses, setErrorCourses] = useState("");
  const [errorMessages, setErrorMessages] = useState("");
  const [errorPdfs, setErrorPdfs] = useState("");
  const [errorLiveClasses, setErrorLiveClasses] = useState("");

  const authHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const fetchCourses = async () => {
    setLoadingCourses(true);
    setErrorCourses("");
    try {
      const res = await fetch(`${BASE_URL}/api/courses`, { headers: authHeaders });
      const data = await res.json();
      setCourses(data.filter((c) => c.status === "published"));
    } catch {
      setErrorCourses("Could not load courses. Please try again.");
    } finally {
      setLoadingCourses(false);
    }
  };

  const fetchMessages = async () => {
    setLoadingMessages(true);
    setErrorMessages("");
    try {
      const res = await fetch(`${BASE_URL}/api/notifications/all`, { headers: authHeaders });
      const data = await res.json();
      setMessages(data.data || []);
    } catch {
      setErrorMessages("Could not load messages. Please try again.");
    } finally {
      setLoadingMessages(false);
    }
  };

  const fetchPdfs = async () => {
    setLoadingPdfs(true);
    setErrorPdfs("");
    try {
      const res = await fetch(`${BASE_URL}/api/pdfs`, { headers: authHeaders });
      const data = await res.json();
      setPdfs(data);
    } catch {
      setErrorPdfs("Could not load PDFs. Please try again.");
    } finally {
      setLoadingPdfs(false);
    }
  };

  const fetchLiveClasses = async () => {
    setLoadingLiveClasses(true);
    setErrorLiveClasses("");
    try {
      const res = await fetch(`${BASE_URL}/api/liveclasses`, { headers: authHeaders });
      const data = await res.json();
      setLiveClasses(data || []);
    } catch {
      setErrorLiveClasses("Could not load live classes. Please try again.");
    } finally {
      setLoadingLiveClasses(false);
    }
  };

  useEffect(() => {
    if (activeTab === "courses" && courses.length === 0) fetchCourses();
    if (activeTab === "messages" && messages.length === 0) fetchMessages();
    if (activeTab === "pdfs" && pdfs.length === 0) fetchPdfs();
    if (activeTab === "liveclasses" && liveClasses.length === 0) fetchLiveClasses();
  }, [activeTab]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const renderDashboard = () => (
    <div className="stats">
      <div className="stat-card"><p>Enrolled Courses</p><h2>12</h2></div>
      <div className="stat-card"><p>In Progress</p><h2>7</h2></div>
      <div className="stat-card"><p>Completed</p><h2>5</h2></div>
      <div className="stat-card"><p>Pending Tasks</p><h2>24</h2></div>
    </div>
  );

  const renderCourses = () => (
    <div className="section">
      <h2>Available Courses</h2>

      {loadingCourses && <p className="loading-text">Loading courses...</p>}
      {errorCourses && <p className="error-text">❌ {errorCourses}</p>}
      {!loadingCourses && !errorCourses && courses.length === 0 && (
        <p className="empty-text">No published courses available right now.</p>
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

      {loadingMessages && <p className="loading-text">Loading messages...</p>}
      {errorMessages && <p className="error-text">❌ {errorMessages}</p>}
      {!loadingMessages && !errorMessages && messages.length === 0 && (
        <p className="empty-text">No messages yet.</p>
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
      <h2>Study Materials</h2>

      {loadingPdfs && <p className="loading-text">Loading PDFs...</p>}
      {errorPdfs && <p className="error-text">❌ {errorPdfs}</p>}
      {!loadingPdfs && !errorPdfs && pdfs.length === 0 && (
        <p className="empty-text">No study materials uploaded yet.</p>
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

  const renderLiveClasses = () => (
    <div className="section">
      <h2>Live Classes</h2>

      {loadingLiveClasses && <p className="loading-text">Loading live classes...</p>}
      {errorLiveClasses && <p className="error-text">❌ {errorLiveClasses}</p>}
      {!loadingLiveClasses && !errorLiveClasses && liveClasses.length === 0 && (
        <p className="empty-text">No live classes scheduled right now.</p>
      )}

      {!loadingLiveClasses && liveClasses.length > 0 && (
        <div className="course-grid">
          {liveClasses.map((cls) => (
            <div className="course-card-full" key={cls._id}>
              <h3>{cls.title}</h3>
              <div className="course-meta">
                <span>📅 {formatDate(cls.scheduledAt)}</span>
                <span>🕐 {cls.time}</span>
              </div>
              {cls.link && (
                <a href={cls.link} target="_blank" rel="noopener noreferrer" className="enroll-btn">
                  Join Class
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":   return renderDashboard();
      case "courses":     return renderCourses();
      case "messages":    return renderMessages();
      case "pdfs":        return renderPdfs();
      case "liveclasses": return renderLiveClasses();
      default:            return renderDashboard();
    }
  };

  const tabs = [
    { id: "dashboard",   label: "🏠 Dashboard"  },
    { id: "courses",     label: "📚 Courses"     },
    { id: "messages",    label: "💬 Messages"    },
    { id: "pdfs",        label: "📄 PDFs"        },
    { id: "liveclasses", label: "🎥 Live Classes" },
  ];

  return (
    <div className="dashboard-container">

      <div className="sidebar">
        <h2 className="logo">Climax Academy</h2>
        <ul>
          {tabs.map((tab) => (
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

      <div className="main-content">

        <div className="header">
          <h1>Welcome, {user?.name} 👋</h1>

          <div className="profile-wrapper" ref={dropdownRef}>
            <img
              src={`https://ui-avatars.com/api/?name=${user?.name}`}
              alt="profile"
              className="profile-avatar"
              onClick={() => setDropdownOpen((prev) => !prev)}
            />

            {dropdownOpen && (
              <div className="profile-dropdown" onMouseLeave={() => setDropdownOpen(false)}>
                <p className="dropdown-email">{user?.email}</p>
                <hr />
                <button
                  className="dropdown-item"
                  onClick={() => setDropdownOpen(false)}
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

        {renderContent()}

      </div>
    </div>
  );
};

export default Dashboard;