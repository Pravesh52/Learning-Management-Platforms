
import React, { useEffect, useRef, useState } from "react";
import "../../styles/AdminDashboard.css";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [pdfs, setPdfs] = useState([]);

  // ================= NOTIFICATION STATES =================
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [notifications, setNotifications] = useState([]); // Sent notifications list

  // ================= PDF STATES =================
  const [pdfTitle, setPdfTitle] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfCourse, setPdfCourse] = useState("");

  const fileInputRef = useRef(null);

  // ================= SENT TO UI TRACKER =================
  const [sentCourses, setSentCourses] = useState(() => {
    const saved = localStorage.getItem("sentCourses");
    return saved ? JSON.parse(saved) : [];
  });

  const admin = JSON.parse(localStorage.getItem("user"));

  // ================= NEW COURSE =================
  const [newCourse, setNewCourse] = useState({
    title: "",
    timing: "",
    price: "",
    status: "draft",
  });

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  // ================= USE EFFECT =================
  useEffect(() => {
    fetchCourses();
    fetchUsers();
    fetchPDFs();
  }, []);

  // Jab bhi notify tab open ho, notifications fetch karo
  useEffect(() => {
    if (activeTab === "notify") {
      fetchNotifications();
    }
  }, [activeTab]);

  // ================= FETCH COURSES =================
  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/courses`);
      setCourses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= FETCH USERS =================
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${BASE_URL}/api/admin/students`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  // ================= FETCH PDFS =================
  const fetchPDFs = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/pdfs`);
      setPdfs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= FETCH NOTIFICATIONS =================
  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/notifications/all`);
      setNotifications(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= CREATE COURSE =================
  const createCourse = async () => {
    if (!newCourse.title || !newCourse.timing || !newCourse.price) {
      alert("All fields are required");
      return;
    }
    try {
      await await axios.post(`${BASE_URL}/api/courses`, newCourse);
      await fetchCourses();
      setNewCourse({ title: "", timing: "", price: "", status: "draft" });
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  // ================= SEND TO UI =================
  const handleSendToUI = (course) => {
    const alreadySent = sentCourses.find((c) => c._id === course._id);
    if (alreadySent) {
      const updated = sentCourses.filter((c) => c._id !== course._id);
      setSentCourses(updated);
      localStorage.setItem("sentCourses", JSON.stringify(updated));
      alert(`"${course.title}" removed from UI`);
    } else {
      const updated = [...sentCourses, course];
      setSentCourses(updated);
      localStorage.setItem("sentCourses", JSON.stringify(updated));
      alert(`"${course.title}" sent to UI`);
    }
  };

  const isSentToUI = (courseId) => {
    return sentCourses.some((c) => c._id === courseId);
  };

  // ================= UPLOAD PDF =================
  const uploadPDF = async () => {
    if (!pdfTitle || !pdfFile) {
      alert("Please fill all fields");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("title", pdfTitle);
      formData.append("pdf", pdfFile);
      if (pdfCourse) formData.append("course", pdfCourse);
      await await axios.post(`${BASE_URL}/api/pdfs/upload`, formData);
      alert("PDF Uploaded Successfully");
      setPdfTitle("");
      setPdfCourse("");
      setPdfFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      fetchPDFs();
    } catch (error) {
      alert(
        "Upload failed: " + (error.response?.data?.message || error.message)
      );
    }
  };

  // ================= SEND NOTIFICATION =================
  const sendNotification = async () => {
    if (!subject || !message) {
      alert("Please fill all fields");
      return;
    }
    try {
      await await axios.post(`${BASE_URL}/api/notifications/send`, {
        subject,
        message,
      });

      alert("✅ Notification Successfully Send Ho Gayi - Sab Students Ko Pahuch Gayi!");

      // Inputs reset karo
      setSubject("");
      setMessage("");

      // List refresh karo
      fetchNotifications();
    } catch (error) {
      console.log(error);
      alert("❌ Failed To Send Notification");
    }
  };

  // ================= DELETE NOTIFICATION =================
  const deleteNotification = async (id) => {
    const confirm = window.confirm(
      "Kya aap sure hain? Ye notification delete ho jaegi."
    );
    if (!confirm) return;

    try {
      await axios.delete(
  `${BASE_URL}/api/notifications/delete/${id}`
);
      // List se remove karo
      setNotifications((prev) => prev.filter((n) => n._id !== id));
      alert("🗑️ Notification Delete Ho Gayi");
    } catch (error) {
      console.log(error);
      alert("❌ Delete Failed");
    }
  };

  // ================= FORMAT DATE & TIME =================
  const formatDateTime = (isoString) => {
    const date = new Date(isoString);

    const dateStr = date.toLocaleDateString("hi-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    const timeStr = date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `${dateStr} | ${timeStr}`;
  };

  return (
    <div className="admin-container">
      {/* ================= SIDEBAR ================= */}
      <div className="sidebar">
        <h2>Climax Academy</h2>
        <ul>
          <li onClick={() => setActiveTab("dashboard")}>Dashboard</li>
          <li onClick={() => setActiveTab("students")}>All Students</li>
          <li onClick={() => setActiveTab("courses")}>Create Courses</li>
          <li onClick={() => setActiveTab("pdf")}>Upload PDF</li>
          <li onClick={() => setActiveTab("quiz")}>Create Quiz</li>
          <li onClick={() => setActiveTab("live")}>Live Classes</li>
          <li onClick={() => setActiveTab("notify")}>Send Notification</li>
        </ul>
      </div>

      {/* ================= MAIN ================= */}
      <div className="main">
        {/* ================= TOP BAR ================= */}
        <div className="top-bar">
          <div className="admin-info">
            <span>{admin?.name || "Admin"}</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>

        {/* ================= DASHBOARD ================= */}
        {activeTab === "dashboard" && (
          <>
            <h2 className="dashboard-title">Dashboard Overview</h2>
            <div className="dashboard-cards">
              <div className="dash-card">
                <h4>Total Students</h4>
                <p>{users.length}</p>
              </div>
              <div className="dash-card">
                <h4>Total Courses</h4>
                <p>{courses.length}</p>
              </div>
              <div className="dash-card">
                <h4>Total PDFs</h4>
                <p>{pdfs.length}</p>
              </div>
              <div className="dash-card">
                <h4>Live Classes</h4>
                <p>2</p>
              </div>
            </div>
          </>
        )}

        {/* ================= STUDENTS ================= */}
        {activeTab === "students" && (
          <>
            <h2>All Students</h2>
            <div className="student-table-wrapper">
              {users.length > 0 ? (
                <table className="student-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Mobile</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u, index) => (
                      <tr key={u._id}>
                        <td>{index + 1}</td>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>{u.mobilenumber || "N/A"}</td>
                        <td>{u.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No students found</p>
              )}
            </div>
          </>
        )}

        {/* ================= COURSES ================= */}
        {activeTab === "courses" && (
          <>
            <h2>Create Courses</h2>
            <div className="form">
              <input
                type="text"
                placeholder="Course Name"
                value={newCourse.title}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, title: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Timing"
                value={newCourse.timing}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, timing: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Price"
                value={newCourse.price}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, price: e.target.value })
                }
              />
              <select
                value={newCourse.status}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, status: e.target.value })
                }
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
              <button onClick={createCourse}>Create</button>
            </div>
            <div className="course-list">
              {courses.length > 0 ? (
                courses.map((c) => (
                  <div className="course-card" key={c._id}>
                    <h4>{c.title}</h4>
                    <p className="timing">⏰ {c.timing}</p>
                    <p className="price">₹ {c.price}</p>
                    <p className="status">Status : {c.status}</p>
                    {c.status === "published" ? (
                      <button onClick={() => handleSendToUI(c)}>
                        {isSentToUI(c._id) ? "✓ Sent (Remove)" : "Send to UI"}
                      </button>
                    ) : (
                      <button disabled>Draft</button>
                    )}
                  </div>
                ))
              ) : (
                <p>No Courses Found</p>
              )}
            </div>
          </>
        )}

        {/* ================= PDF ================= */}
        {activeTab === "pdf" && (
          <>
            <h2>Upload PDF</h2>
            <div className="form">
              <input
                type="text"
                placeholder="PDF Title"
                value={pdfTitle}
                onChange={(e) => setPdfTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="Course Name (Optional)"
                value={pdfCourse}
                onChange={(e) => setPdfCourse(e.target.value)}
              />
              <input
                type="file"
                accept=".pdf"
                ref={fileInputRef}
                onChange={(e) => setPdfFile(e.target.files[0])}
              />
              <button onClick={uploadPDF}>Upload PDF</button>
            </div>

            <div className="pdf-list">
              {pdfs.length > 0 ? (
                pdfs.map((pdf) => (
                  <div className="pdf-card" key={pdf._id}>
                    <h3>{pdf.title}</h3>
                    <p>Course: {pdf.course || "General"}</p>
                    <p>Study Material PDF</p>
                    <a
                      href={`http://localhost:5000/upload/${pdf.pdf}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <button>View PDF</button>
                    </a>
                    <button className="send-btn">Send Student Dashboard</button>
                  </div>
                ))
              ) : (
                <p>No PDFs Uploaded</p>
              )}
            </div>
          </>
        )}

        {/* ================= NOTIFICATIONS ================= */}
        {activeTab === "notify" && (
          <>
            <h2>📢 Send Notification of all students</h2>

            {/* SEND FORM */}
            <div className="notification">
              <input
                type="text"
                placeholder="Subject (e.g. Exam Date, Holiday Notice)"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />

              <textarea
                placeholder="Message likhein..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
              />

              <button onClick={sendNotification}>
                📤 Send to All Students
              </button>
            </div>

            {/* SENT NOTIFICATIONS LIST */}
            <div style={{ marginTop: "30px" }}>
              <h3>
                📋 All messages list ({notifications.length})
              </h3>

              {notifications.length === 0 ? (
                <p style={{ color: "#888", marginTop: "10px" }}>
                 just notification not send...
                </p>
              ) : (
                <div className="notification-list">
                  {notifications.map((notif) => (
                    <div
                      key={notif._id}
                      className="notification-card"
                      style={{
                        background: "#1e1e2e",
                        border: "1px solid #333",
                        borderRadius: "10px",
                        padding: "16px 20px",
                        marginBottom: "14px",
                        position: "relative",
                      }}
                    >
                      {/* Subject */}
                      <h4
                        style={{
                          color: "#a78bfa",
                          margin: "0 0 6px 0",
                          fontSize: "16px",
                        }}
                      >
                        📌 {notif.subject}
                      </h4>

                      {/* Message */}
                      <p
                        style={{
                          color: "#ccc",
                          margin: "0 0 10px 0",
                          lineHeight: "1.5",
                          fontSize: "14px",
                        }}
                      >
                        {notif.message}
                      </p>

                      {/* Date & Time */}
                      <p
                        style={{
                          color: "#666",
                          fontSize: "12px",
                          margin: "0",
                        }}
                      >
                        🕐 {formatDateTime(notif.createdAt)}
                      </p>

                      {/* Delete Button */}
                      <button
                        onClick={() => deleteNotification(notif._id)}
                        style={{
                          position: "absolute",
                          top: "14px",
                          right: "14px",
                          background: "#dc2626",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          padding: "5px 12px",
                          cursor: "pointer",
                          fontSize: "13px",
                        }}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;