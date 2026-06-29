import React, { useEffect, useRef, useState } from "react";
import "../styles/AdminDashboard.css";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const [enrollments, setEnrollments] = useState([]);

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [notifications, setNotifications] = useState([]);

  const [pdfTitle, setPdfTitle] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfCourse, setPdfCourse] = useState("");
  const [pdfLoading, setPdfLoading] = useState(false);
  const fileInputRef = useRef(null);

  // ===== ENROLLMENT DETAIL MODAL =====
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [enrollDetail, setEnrollDetail] = useState(null);

  // ===== RESULT MANAGEMENT STATES =====
  const [showResultModal, setShowResultModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentResults, setStudentResults] = useState([]);
  const [showResultForm, setShowResultForm] = useState(false);
  const [editingResultId, setEditingResultId] = useState(null);
  const [resultForm, setResultForm] = useState({
    testType: "Marathon Test",
    testName: "",
    marksObtained: "",
    totalMarks: "",
    remarks: "",
    date: new Date().toISOString().split("T")[0],
  });

  const admin = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const authHeaders = { Authorization: `Bearer ${token}` };

  const [newCourse, setNewCourse] = useState({
    title: "", timing: "", price: "", status: "draft",
    batch: "", className: "", teacherName: "",
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  useEffect(() => {
    fetchCourses();
    fetchUsers();
    fetchPDFs();
  }, []);

  useEffect(() => {
    if (activeTab === "notify") fetchNotifications();
    if (activeTab === "students") fetchEnrollments();
    setSidebarOpen(false);
  }, [activeTab]);

  // ===== FETCH COURSES =====
  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/courses`);
      setCourses(res.data);
    } catch (error) { console.log(error); }
  };

  // ===== FETCH USERS/STUDENTS =====
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/admin/students`, { headers: authHeaders });
      setUsers(res.data);
    } catch (error) { console.log(error.response?.data || error.message); }
  };

  // ===== FETCH PDFS =====
  const fetchPDFs = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/pdfs`, { headers: authHeaders });
      setPdfs(res.data);
    } catch (error) { console.log(error); }
  };

  // ===== FETCH ENROLLMENTS =====
  const fetchEnrollments = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/enrollments/all`, { headers: authHeaders });
      setEnrollments(res.data);
    } catch (error) { console.log(error); }
  };

  // ===== FETCH NOTIFICATIONS =====
  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/notifications/all`);
      setNotifications(res.data.data || []);
    } catch (error) { console.log(error); }
  };

  // ===== CREATE COURSE =====
  const createCourse = async () => {
    if (!newCourse.title || !newCourse.timing || !newCourse.price) {
      alert("Title, Timing and Price are required"); return;
    }
    try {
      await axios.post(`${BASE_URL}/api/courses`, newCourse);
      await fetchCourses();
      setNewCourse({ title: "", timing: "", price: "", status: "draft", batch: "", className: "", teacherName: "" });
    } catch (error) { console.log(error.response?.data || error.message); }
  };

  // ===== SEND TO UI / REMOVE FROM UI =====
  const handleSendToUI = async (course) => {
    try {
      const res = await axios.put(`${BASE_URL}/api/courses/${course._id}/toggle-ui`, {}, { headers: authHeaders });
      await fetchCourses();
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || error.message));
    }
  };

  // ===== TOGGLE ACTIVE/DEACTIVE =====
  const handleToggleStatus = async (userId, currentStatus) => {
    const confirmMsg = currentStatus
      ? "Deactivate this student? They will not be able to login."
      : "Activate this student? They will be able to login again.";
    if (!window.confirm(confirmMsg)) return;
    try {
      const res = await axios.put(
        `${BASE_URL}/api/admin/users/${userId}/toggle-status`, {},
        { headers: authHeaders }
      );
      await fetchUsers();
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || error.message));
    }
  };

  // ===== VIEW ENROLLMENT DETAIL =====
  const handleViewEnrollment = async (enrollmentId) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/enrollments/detail/${enrollmentId}`, { headers: authHeaders });
      setEnrollDetail(res.data);
      setShowEnrollModal(true);
    } catch (error) {
      alert("Could not load enrollment form details");
    }
  };

  const getEnrollmentId = (studentId) => {
    const e = enrollments.find(en => en.student?._id === studentId || en.student === studentId);
    return e ? e._id : null;
  };

  // ===== RESULT MANAGEMENT FUNCTIONS =====
  const fetchStudentResults = async (studentId) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/results/student/${studentId}`, { headers: authHeaders });
      setStudentResults(res.data);
    } catch (error) { console.log(error); }
  };

  const openResultModal = (student) => {
    setSelectedStudent(student);
    setShowResultModal(true);
    setShowResultForm(false);
    setEditingResultId(null);
    fetchStudentResults(student._id);
  };

  const resetResultForm = () => {
    setResultForm({
      testType: "Marathon Test", testName: "", marksObtained: "",
      totalMarks: "", remarks: "", date: new Date().toISOString().split("T")[0],
    });
    setEditingResultId(null);
  };

  const handleSaveResult = async (sendNow) => {
    if (!resultForm.testName || !resultForm.marksObtained || !resultForm.totalMarks) {
      alert("Test Name, Marks Obtained and Total Marks are required");
      return;
    }
    try {
      if (editingResultId) {
        await axios.put(`${BASE_URL}/api/results/${editingResultId}`, resultForm, { headers: authHeaders });
      } else {
        await axios.post(
          `${BASE_URL}/api/results`,
          { ...resultForm, studentId: selectedStudent._id, sendNow },
          { headers: authHeaders }
        );
      }
      resetResultForm();
      setShowResultForm(false);
      fetchStudentResults(selectedStudent._id);
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || error.message));
    }
  };

  const handleEditResult = (result) => {
    setResultForm({
      testType: result.testType,
      testName: result.testName,
      marksObtained: result.marksObtained,
      totalMarks: result.totalMarks,
      remarks: result.remarks || "",
      date: new Date(result.date).toISOString().split("T")[0],
    });
    setEditingResultId(result._id);
    setShowResultForm(true);
  };

  const handleDeleteResult = async (resultId, testName) => {
    if (!window.confirm(`Delete result "${testName}"?`)) return;
    try {
      await axios.delete(`${BASE_URL}/api/results/${resultId}`, { headers: authHeaders });
      fetchStudentResults(selectedStudent._id);
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || error.message));
    }
  };

  const handleSendResult = async (resultId) => {
    try {
      await axios.put(`${BASE_URL}/api/results/${resultId}/send`, {}, { headers: authHeaders });
      fetchStudentResults(selectedStudent._id);
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || error.message));
    }
  };

  const handleUnsendResult = async (resultId, testName) => {
    if (!window.confirm(`Hide "${testName}" from student's dashboard?`)) return;
    try {
      await axios.put(`${BASE_URL}/api/results/${resultId}/unsend`, {}, { headers: authHeaders });
      fetchStudentResults(selectedStudent._id);
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || error.message));
    }
  };

  // ===== PDF MANAGEMENT =====
  const uploadPDF = async () => {
    if (!pdfTitle || !pdfFile) { alert("Please fill all fields"); return; }
    try {
      setPdfLoading(true);
      const formData = new FormData();
      formData.append("title", pdfTitle);
      formData.append("pdf", pdfFile);
      if (pdfCourse) formData.append("course", pdfCourse);
      await axios.post(`${BASE_URL}/api/pdfs/upload`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPdfTitle(""); setPdfCourse(""); setPdfFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      fetchPDFs();
    } catch (error) {
      alert("Upload failed: " + (error.response?.data?.message || error.message));
    } finally {
      setPdfLoading(false);
    }
  };

  const handleSendPdf = async (pdfId) => {
    try {
      await axios.put(`${BASE_URL}/api/pdfs/${pdfId}/send`, {}, { headers: authHeaders });
      fetchPDFs();
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || error.message));
    }
  };

  const handleRemovePdf = async (pdfId, title) => {
    if (!window.confirm(`Remove "${title}" from students?`)) return;
    try {
      await axios.put(`${BASE_URL}/api/pdfs/${pdfId}/remove`, {}, { headers: authHeaders });
      fetchPDFs();
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || error.message));
    }
  };

  const handleDeletePdf = async (pdfId, title) => {
    if (!window.confirm(`Permanently delete "${title}"?`)) return;
    try {
      await axios.delete(`${BASE_URL}/api/pdfs/${pdfId}`, { headers: authHeaders });
      fetchPDFs();
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || error.message));
    }
  };

  // ===== NOTIFICATIONS =====
  const sendNotification = async () => {
    if (!subject || !message) { alert("Please fill all fields"); return; }
    try {
      await axios.post(`${BASE_URL}/api/notifications/send`, { subject, message });
      setSubject(""); setMessage("");
      fetchNotifications();
    } catch (error) { alert("Failed to send notification"); }
  };

  const deleteNotification = async (id) => {
    if (!window.confirm("Delete this notification?")) return;
    try {
      await axios.delete(`${BASE_URL}/api/notifications/delete/${id}`);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (error) { alert("Delete failed"); }
  };

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return `${date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })} • ${date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true })}`;
  };

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: "🏠" },
    { id: "students", label: "All Students", icon: "👥" },
    { id: "courses", label: "Courses", icon: "📚" },
    { id: "pdf", label: "Study Material", icon: "📄" },
    { id: "notify", label: "Notifications", icon: "📢" },
  ];

  return (
    <div className="admin-container">
      {/* MOBILE TOP BAR */}
      {/* MOBILE TOP BAR */}
<div className="admin-mobile-topbar">
  <button className="admin-hamburger" onClick={() => setSidebarOpen(true)}>☰</button>
  <span className="admin-mobile-logo">Climax Academy — Admin</span>
  <button onClick={handleLogout} className="mobile-logout-btn">Logout</button>
</div>

      {sidebarOpen && (
        <div className="admin-sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* SIDEBAR */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2>Climax Academy</h2>
          <button className="sidebar-close" onClick={() => setSidebarOpen(false)}>✖</button>
        </div>
        <ul>
          {tabs.map((tab) => (
            <li
              key={tab.id}
              className={activeTab === tab.id ? "active" : ""}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span> {tab.label}
            </li>
          ))}
        </ul>
      </div>

      {/* MAIN */}
      <div className="main">
        <div className="top-bar desktop-only">
          <h1>{tabs.find((t) => t.id === activeTab)?.label}</h1>
          <div className="admin-info">
            <span>{admin?.name || "Admin"}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        </div>

        {/* ===== DASHBOARD ===== */}
        {activeTab === "dashboard" && (
          <>
            <h2 className="dashboard-title mobile-only-title">Dashboard Overview</h2>
            <div className="dashboard-cards">
              <div className="dash-card">
                <div className="dash-card-icon">👥</div>
                <h4>Total Students</h4>
                <p>{users.length}</p>
              </div>
              <div className="dash-card">
                <div className="dash-card-icon">📚</div>
                <h4>Total Courses</h4>
                <p>{courses.length}</p>
              </div>
              <div className="dash-card">
                <div className="dash-card-icon">📄</div>
                <h4>Total PDFs</h4>
                <p>{pdfs.length}</p>
              </div>
              <div className="dash-card">
                <div className="dash-card-icon">✅</div>
                <h4>Enrolled Students</h4>
                <p>{users.filter((u) => u.isEnrolled).length}</p>
              </div>
            </div>
          </>
        )}

        {/* ===== STUDENTS ===== */}
        {activeTab === "students" && (
          <>
            <h2 className="mobile-only-title">All Students</h2>
            <div className="student-table-wrapper">
              {users.length > 0 ? (
                <table className="student-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Enrollment No.</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Mobile</th>
                      <th>Enrollment</th>
                      <th>Course Enrolled</th>
                      <th>Form</th>
                      <th>Result</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u, index) => {
                      const enrollId = u.enrollmentFormId || getEnrollmentId(u._id);
                      return (
                        <tr key={u._id}>
                          <td>{index + 1}</td>
                          <td>
                            {u.enrollmentNumber ? (
                              <span className="pill-badge purple">{u.enrollmentNumber}</span>
                            ) : "—"}
                          </td>
                          <td>{u.name}</td>
                          <td className="ellipsis-cell">{u.email}</td>
                          <td>{u.mobilenumber || "N/A"}</td>
                          <td>
                            <span className={`pill-badge ${u.isEnrolled ? "green" : "red"}`}>
                              {u.isEnrolled ? "✅ Enrolled" : "❌ Not Enrolled"}
                            </span>
                          </td>
                          <td>{u.enrolledCourseName || "—"}</td>
                          <td>
                            {enrollId ? (
                              <button onClick={() => handleViewEnrollment(enrollId)} className="icon-btn" title="View Enrollment Form">
                                👁️
                              </button>
                            ) : "—"}
                          </td>
                          <td>
                            {u.isEnrolled ? (
                              <button onClick={() => openResultModal(u)} className="manage-btn">
                                📊 Manage
                              </button>
                            ) : "—"}
                          </td>
                          <td>
                            <button
                              onClick={() => handleToggleStatus(u._id, u.isActive)}
                              className={`status-btn ${u.isActive ? "btn-active" : "btn-deactive"}`}
                            >
                              {u.isActive ? "🟢 Active" : "🔴 Deactive"}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <p className="empty-text">No students found</p>
              )}
            </div>
          </>
        )}

        {/* ===== COURSES ===== */}
        {activeTab === "courses" && (
          <>
            <h2 className="mobile-only-title">Create Courses</h2>
            <div className="form-card">
              <div className="form-grid">
                <input type="text" placeholder="Course Name" value={newCourse.title}
                  onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })} />
                <input type="text" placeholder="Timing (e.g. 9:00 AM - 11:00 AM)" value={newCourse.timing}
                  onChange={(e) => setNewCourse({ ...newCourse, timing: e.target.value })} />
                <input type="number" placeholder="Price" value={newCourse.price}
                  onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })} />
                <input type="text" placeholder="Batch (e.g. 2026-27)" value={newCourse.batch}
                  onChange={(e) => setNewCourse({ ...newCourse, batch: e.target.value })} />
                <input type="text" placeholder="Class (e.g. 11th / 12th)" value={newCourse.className}
                  onChange={(e) => setNewCourse({ ...newCourse, className: e.target.value })} />
                <input type="text" placeholder="Teacher Name" value={newCourse.teacherName}
                  onChange={(e) => setNewCourse({ ...newCourse, teacherName: e.target.value })} />
                <select value={newCourse.status}
                  onChange={(e) => setNewCourse({ ...newCourse, status: e.target.value })}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <button className="primary-btn" onClick={createCourse}>+ Create Course</button>
            </div>

            <div className="course-list">
              {courses.length > 0 ? (
                courses.map((c) => (
                  <div className="course-card-admin" key={c._id}>
                    <h4>{c.title}</h4>
                    <p className="timing">⏰ {c.timing}</p>
                    <p className="price">₹ {c.price}</p>
                    {c.batch && <p className="extra-info purple">📅 Batch: {c.batch}</p>}
                    {c.className && <p className="extra-info blue">🎓 Class: {c.className}</p>}
                    {c.teacherName && <p className="extra-info green">👨‍🏫 Teacher: {c.teacherName}</p>}
                    <p className="status-tag">Status: {c.status}</p>
                    {c.status === "published" ? (
                      <button
                        onClick={() => handleSendToUI(c)}
                        className={c.sentToUI ? "danger-btn full" : "success-btn full"}
                      >
                        {c.sentToUI ? "✓ Sent (Remove)" : "Send to UI"}
                      </button>
                    ) : (
                      <button className="disabled-btn full" disabled>Draft</button>
                    )}
                  </div>
                ))
              ) : (
                <p className="empty-text">No Courses Found</p>
              )}
            </div>
          </>
        )}

        {/* ===== PDF / STUDY MATERIAL ===== */}
        {activeTab === "pdf" && (
          <>
            <h2 className="mobile-only-title">Upload Study Material</h2>
            <div className="form-card">
              <div className="form-grid">
                <input type="text" placeholder="PDF Title" value={pdfTitle}
                  onChange={(e) => setPdfTitle(e.target.value)} />
                <input type="text" placeholder="Course Name (Optional)" value={pdfCourse}
                  onChange={(e) => setPdfCourse(e.target.value)} />
                <input type="file" accept=".pdf" ref={fileInputRef}
                  onChange={(e) => setPdfFile(e.target.files[0])} />
              </div>
              <button className="primary-btn" onClick={uploadPDF} disabled={pdfLoading}>
                {pdfLoading ? "Uploading..." : "⬆️ Upload PDF"}
              </button>
            </div>

            <div className="pdf-admin-list">
              {pdfs.length === 0 ? (
                <p className="empty-text">No PDFs uploaded yet</p>
              ) : (
                pdfs.map((pdf) => (
                  <div className={`pdf-admin-card ${pdf.sentToStudents ? "sent" : ""}`} key={pdf._id}>
                    <div className="pdf-admin-info">
                      <div className="pdf-admin-title-row">
                        <span className="pdf-admin-icon">📄</span>
                        <h4>{pdf.title}</h4>
                        {pdf.sentToStudents && <span className="pill-badge green small">✅ Sent</span>}
                      </div>
                      <p className="pdf-admin-course">📚 Course: {pdf.course || "General"}</p>
                      <p className="pdf-admin-date">
                        🕐 {pdf.createdAt
                          ? `${new Date(pdf.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })} • ${new Date(pdf.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true })}`
                          : "—"}
                      </p>
                    </div>
                    <div className="pdf-admin-actions">
                      <a href={pdf.pdf} target="_blank" rel="noreferrer" className="action-btn blue">👁️ View</a>
                      {pdf.sentToStudents ? (
                        <button onClick={() => handleRemovePdf(pdf._id, pdf.title)} className="action-btn red">🚫 Remove</button>
                      ) : (
                        <button onClick={() => handleSendPdf(pdf._id)} className="action-btn green">📤 Send</button>
                      )}
                      <button onClick={() => handleDeletePdf(pdf._id, pdf.title)} className="action-btn red">🗑️ Delete</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {/* ===== NOTIFICATIONS ===== */}
        {activeTab === "notify" && (
          <>
            <h2 className="mobile-only-title">Send Notification to All Students</h2>
            <div className="form-card">
              <input type="text" placeholder="Subject (e.g. Exam Date, Holiday Notice)"
                value={subject} onChange={(e) => setSubject(e.target.value)} className="full-width-input" />
              <textarea placeholder="Write your message here... You can use line breaks for paragraphs."
                value={message} onChange={(e) => setMessage(e.target.value)} rows={5} className="full-width-textarea" />
              <button className="primary-btn" onClick={sendNotification}>📤 Send to All Students</button>
            </div>

            <div className="notifications-section">
              <h3>All Messages ({notifications.length})</h3>
              {notifications.length === 0 ? (
                <p className="empty-text">No notifications sent yet...</p>
              ) : (
                <div className="notification-list">
                  {notifications.map((notif) => (
                    <div key={notif._id} className="notification-card">
                      <h4>📌 {notif.subject}</h4>
                      <p className="notification-message">{notif.message}</p>
                      <p className="notification-time">🕐 {formatDateTime(notif.createdAt)}</p>
                      <button onClick={() => deleteNotification(notif._id)} className="delete-notif-btn">
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

      {/* ===== ENROLLMENT DETAIL MODAL ===== */}
      {showEnrollModal && enrollDetail && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <button onClick={() => setShowEnrollModal(false)} className="admin-modal-close">✖ Close</button>
            <h2 className="admin-modal-title">📋 Enrollment Form Details</h2>

            <div className="admin-modal-grid">
              {[
                ["Course", enrollDetail.courseName],
                ["Student Name", enrollDetail.studentName],
                ["Father's Name", enrollDetail.fatherName],
                ["Mother's Name", enrollDetail.motherName],
                ["Date of Birth", enrollDetail.dob],
                ["Gender", enrollDetail.gender],
                ["Aadhar No.", enrollDetail.aadharNo],
                ["Mobile", enrollDetail.mobile],
                ["Email", enrollDetail.email],
                ["Full Address", enrollDetail.fullAddress],
                ["City/Village", enrollDetail.city],
                ["District", enrollDetail.district],
                ["State", enrollDetail.state],
                ["PIN Code", enrollDetail.pinCode],
                ["School Name", enrollDetail.schoolName],
                ["Board", enrollDetail.board],
                ["Present Class", enrollDetail.presentClass],
                ["Stream", enrollDetail.stream],
                ["Previous %", enrollDetail.prevPercentage],
                ["Fees Mode", enrollDetail.feesMode],
                ["Batch", enrollDetail.batch || "N/A"],
                ["Enrolled On", new Date(enrollDetail.enrolledAt).toLocaleDateString("en-IN")],
              ].map(([label, value]) => (
                <div className="admin-modal-field" key={label}>
                  <p className="field-label">{label}</p>
                  <p className="field-value">{value || "—"}</p>
                </div>
              ))}
            </div>

            {enrollDetail.photo && (
              <div className="admin-modal-photo">
                <p>Passport Photo</p>
                <img src={`${BASE_URL}/upload/photos/${enrollDetail.photo}`} alt="Student" />
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===== RESULT MANAGEMENT MODAL ===== */}
      {showResultModal && selectedStudent && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <button
              onClick={() => { setShowResultModal(false); setShowResultForm(false); resetResultForm(); }}
              className="admin-modal-close"
            >
              ✖ Close
            </button>

            <h2 className="admin-modal-title">📊 Results</h2>
            <p className="admin-modal-subtext">
              Student: <strong>{selectedStudent.name}</strong>
            </p>
            <p className="admin-modal-subtext">
              Enrollment No: <strong className="purple-text">{selectedStudent.enrollmentNumber || "N/A"}</strong>
              {" | "}Course: <strong className="blue-text">{selectedStudent.enrolledCourseName || "—"}</strong>
            </p>

            {!showResultForm && (
              <button onClick={() => { resetResultForm(); setShowResultForm(true); }} className="primary-btn" style={{ marginBottom: "20px" }}>
                + Add New Result
              </button>
            )}

            {showResultForm && (
              <div className="result-form-card">
                <h4>{editingResultId ? "✏️ Edit Result" : "➕ Add New Result"}</h4>
                <div className="result-form-grid">
                  <div className="result-field">
                    <label>Test Type *</label>
                    <select value={resultForm.testType} onChange={(e) => setResultForm({ ...resultForm, testType: e.target.value })}>
                      <option>Marathon Test</option>
                      <option>Weekly Test</option>
                      <option>Quiz Test</option>
                    </select>
                  </div>
                  <div className="result-field">
                    <label>Test Name *</label>
                    <input value={resultForm.testName} onChange={(e) => setResultForm({ ...resultForm, testName: e.target.value })} placeholder="e.g. Marathon Test #1" />
                  </div>
                  <div className="result-field">
                    <label>Marks Obtained *</label>
                    <input type="number" value={resultForm.marksObtained} onChange={(e) => setResultForm({ ...resultForm, marksObtained: e.target.value })} placeholder="85" />
                  </div>
                  <div className="result-field">
                    <label>Total Marks *</label>
                    <input type="number" value={resultForm.totalMarks} onChange={(e) => setResultForm({ ...resultForm, totalMarks: e.target.value })} placeholder="100" />
                  </div>
                  <div className="result-field">
                    <label>Date</label>
                    <input type="date" value={resultForm.date} onChange={(e) => setResultForm({ ...resultForm, date: e.target.value })} />
                  </div>
                  <div className="result-field full-width">
                    <label>Remarks (Optional)</label>
                    <input value={resultForm.remarks} onChange={(e) => setResultForm({ ...resultForm, remarks: e.target.value })} placeholder="Excellent performance!" />
                  </div>
                </div>

                <div className="result-form-actions">
                  <button onClick={() => { setShowResultForm(false); resetResultForm(); }} className="cancel-btn">Cancel</button>
                  {!editingResultId && (
                    <button onClick={() => handleSaveResult(false)} className="draft-btn">💾 Save Draft</button>
                  )}
                  <button onClick={() => handleSaveResult(true)} className="success-btn">
                    {editingResultId ? "✅ Update Result" : "📤 Save & Send"}
                  </button>
                </div>
              </div>
            )}

            <h4 className="results-history-title">📋 Results History ({studentResults.length})</h4>

            {studentResults.length === 0 ? (
              <p className="empty-text">No results added yet</p>
            ) : (
              studentResults.map((r) => (
                <div className={`result-history-card ${r.sentToStudent ? "sent" : ""}`} key={r._id}>
                  <div className="result-history-top">
                    <div>
                      <div className="result-history-tags">
                        <span className="pill-badge gray small">{r.testType}</span>
                        {r.sentToStudent && <span className="pill-badge green small">✅ Sent</span>}
                      </div>
                      <h4>{r.testName}</h4>
                      <p className="result-history-marks">
                        Marks: <strong>{r.marksObtained}/{r.totalMarks}</strong> ({r.percentage}%)
                      </p>
                      <p className="result-history-date">
                        📅 {new Date(r.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                        {r.remarks && ` | 💬 ${r.remarks}`}
                      </p>
                    </div>
                    <div className="result-history-actions">
                      {r.sentToStudent ? (
                        <button onClick={() => handleUnsendResult(r._id, r.testName)} className="action-btn red">🚫 Unsend</button>
                      ) : (
                        <button onClick={() => handleSendResult(r._id)} className="action-btn green">📤 Send</button>
                      )}
                      <button onClick={() => handleEditResult(r)} className="action-btn blue">✏️ Edit</button>
                      <button onClick={() => handleDeleteResult(r._id, r.testName)} className="action-btn red">🗑️ Delete</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;