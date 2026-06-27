import React, { useEffect, useRef, useState } from "react";
import "../pages/../styles/AdminDashboard.css";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
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
  // Ye line add karo baaki states ke saath
const [pdfLoading, setPdfLoading] = useState(false);
  const fileInputRef = useRef(null);

  // ===== ENROLLMENT DETAIL MODAL =====
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [enrollDetail, setEnrollDetail] = useState(null);

  // ===== RESULT MANAGEMENT STATES (NEW) =====
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

  // ===== BUG 4 FIX: New course fields =====
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
  }, [activeTab]);

  // ===== FETCH COURSES =====
  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/courses`);
      setCourses(res.data);
    } catch (error) { console.log(error); }
  };

  // ===== FETCH USERS =====
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/admin/students`, { headers: authHeaders });
      setUsers(res.data);
    } catch (error) { console.log(error.response?.data || error.message); }
  };

  // ===== FETCH PDFs =====
  const fetchPDFs = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/pdfs`, { 
      headers: { Authorization: `Bearer ${token}` }
    });
    setPdfs(res.data);
  } catch (error) {
    console.log("PDF fetch error:", error.response?.data || error.message);
  }
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

  // ===== CREATE COURSE (BUG 4 FIX) =====
  const createCourse = async () => {
    if (!newCourse.title || !newCourse.timing || !newCourse.price) {
      alert("Title, Timing aur Price required hain"); return;
    }
    try {
      await axios.post(`${BASE_URL}/api/courses`, newCourse);
      await fetchCourses();
      setNewCourse({ title: "", timing: "", price: "", status: "draft", batch: "", className: "", teacherName: "" });
    } catch (error) { console.log(error.response?.data || error.message); }
  };

  // ===== BUG 1 FIX: SEND TO UI (DB me save hoga, localStorage nahi) =====
  const handleSendToUI = async (course) => {
    try {
      const res = await axios.put(`${BASE_URL}/api/courses/${course._id}/toggle-ui`, {}, { headers: authHeaders });
      alert(res.data.message);
      await fetchCourses(); // ✅ Fresh data DB se
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || error.message));
    }
  };

  // ===== BUG 3 FIX: TOGGLE ACTIVE/DEACTIVE =====
  const handleToggleStatus = async (userId, currentStatus) => {
    const confirm = window.confirm(
      currentStatus ? "Kya aap is student ko Deactivate karna chahte ho?" : "Kya aap is student ko Activate karna chahte ho?"
    );
    if (!confirm) return;
    try {
      const res = await axios.put(
        `${BASE_URL}/api/admin/users/${userId}/toggle-status`, {},
        { headers: authHeaders }
      );
      alert(res.data.message);
      await fetchUsers();
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || error.message));
    }
  };

  // ===== VIEW ENROLLMENT DETAIL (Eye icon) =====
  const handleViewEnrollment = async (enrollmentId) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/enrollments/detail/${enrollmentId}`, { headers: authHeaders });
      setEnrollDetail(res.data);
      setShowEnrollModal(true);
    } catch (error) {
      alert("Form detail load nahi ho paya");
    }
  };

  // ===== UPLOAD PDF =====
  const uploadPDF = async () => {
  if (!pdfTitle || !pdfFile) {
    alert("Title aur PDF file dono required hain");
    return;
  }
  try {
    setPdfLoading(true);
    const formData = new FormData();
    formData.append("title", pdfTitle);
    formData.append("pdf", pdfFile);
    if (pdfCourse) formData.append("course", pdfCourse);

    await axios.post(`${BASE_URL}/api/pdfs/upload`, formData, {
      headers: { 
        Authorization: `Bearer ${token}` 
        // Content-Type mat daalo — FormData khud set karta hai
      },
    });

    alert("✅ PDF upload ho gaya!");
    setPdfTitle("");
    setPdfCourse("");
    setPdfFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    fetchPDFs();
  } catch (error) {
    alert("Upload failed: " + (error.response?.data?.message || error.message));
  } finally {
    setPdfLoading(false);
  }
};

  // ===== SEND NOTIFICATION =====
  const sendNotification = async () => {
    if (!subject || !message) { alert("Please fill all fields"); return; }
    try {
      await axios.post(`${BASE_URL}/api/notifications/send`, { subject, message });
      alert("✅ Notification Successfully Send Ho Gayi!");
      setSubject(""); setMessage("");
      fetchNotifications();
    } catch (error) { alert("❌ Failed To Send Notification"); }
  };

  // ===== DELETE NOTIFICATION =====
  const deleteNotification = async (id) => {
    if (!window.confirm("Kya aap sure hain? Ye notification delete ho jaegi.")) return;
    try {
      await axios.delete(`${BASE_URL}/api/notifications/delete/${id}`);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
      alert("🗑️ Notification Delete Ho Gayi");
    } catch (error) { alert("❌ Delete Failed"); }
  };

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return `${date.toLocaleDateString("hi-IN", { day: "2-digit", month: "long", year: "numeric" })} | ${date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true })}`;
  };

  // Delete Pdfs

  const handleSendPdf = async (pdfId, title) => {
  try {
    await axios.put(`${BASE_URL}/api/pdfs/${pdfId}/send`, {}, { headers: authHeaders });
    alert(`✅ "${title}" — All Students ko send ho gaya!`);
    fetchPDFs();
  } catch (error) {
    alert("Error: " + (error.response?.data?.message || error.message));
  }
};
 
const handleRemovePdf = async (pdfId, title) => {
  if (!window.confirm(`"${title}" students se remove karna chahte ho?`)) return;
  try {
    await axios.put(`${BASE_URL}/api/pdfs/${pdfId}/remove`, {}, { headers: authHeaders });
    alert(`🗑️ "${title}" students se remove ho gaya!`);
    fetchPDFs();
  } catch (error) {
    alert("Error: " + (error.response?.data?.message || error.message));
  }
};
 
const handleDeletePdf = async (pdfId, title) => {
  if (!window.confirm(`"${title}" permanently delete karna chahte ho? Supabase se bhi delete hoga.`)) return;
  try {
    await axios.delete(`${BASE_URL}/api/pdfs/${pdfId}`, { headers: authHeaders });
    alert(`🗑️ "${title}" delete ho gaya!`);
    fetchPDFs();
  } catch (error) {
    alert("Error: " + (error.response?.data?.message || error.message));
  }
};

  // ===== GET ENROLLMENT ID FOR A STUDENT =====
  const getEnrollmentId = (studentId) => {
    const e = enrollments.find(en => en.student?._id === studentId || en.student === studentId);
    return e ? e._id : null;
  };

  // ===== RESULT MANAGEMENT FUNCTIONS (NEW) =====
  const fetchStudentResults = async (studentId) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/results/student/${studentId}`, {
        headers: authHeaders,
      });
      setStudentResults(res.data);
    } catch (error) {
      console.log(error);
    }
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
      testType: "Marathon Test",
      testName: "",
      marksObtained: "",
      totalMarks: "",
      remarks: "",
      date: new Date().toISOString().split("T")[0],
    });
    setEditingResultId(null);
  };

  const handleSaveResult = async (sendNow) => {
    if (!resultForm.testName || !resultForm.marksObtained || !resultForm.totalMarks) {
      alert("Test Name, Marks Obtained aur Total Marks required hain");
      return;
    }
    try {
      if (editingResultId) {
        await axios.put(`${BASE_URL}/api/results/${editingResultId}`, resultForm, { headers: authHeaders });
        alert("✅ Result updated successfully!");
      } else {
        await axios.post(
          `${BASE_URL}/api/results`,
          { ...resultForm, studentId: selectedStudent._id, sendNow },
          { headers: authHeaders }
        );
        alert(sendNow ? "✅ Result created & sent to student!" : "✅ Result saved as draft!");
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
    if (!window.confirm(`"${testName}" result delete karna chahte ho?`)) return;
    try {
      await axios.delete(`${BASE_URL}/api/results/${resultId}`, { headers: authHeaders });
      alert("🗑️ Result deleted!");
      fetchStudentResults(selectedStudent._id);
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || error.message));
    }
  };

  const handleSendResult = async (resultId, testName) => {
    try {
      await axios.put(`${BASE_URL}/api/results/${resultId}/send`, {}, { headers: authHeaders });
      alert(`📤 "${testName}" student ko send ho gaya!`);
      fetchStudentResults(selectedStudent._id);
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || error.message));
    }
  };

  const handleUnsendResult = async (resultId, testName) => {
    if (!window.confirm(`"${testName}" student ki dashboard se hide karna chahte ho?`)) return;
    try {
      await axios.put(`${BASE_URL}/api/results/${resultId}/unsend`, {}, { headers: authHeaders });
      alert(`🚫 "${testName}" student se hide ho gaya!`);
      fetchStudentResults(selectedStudent._id);
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="admin-container">
      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>Climax Academy</h2>
        <ul>
          <li onClick={() => setActiveTab("dashboard")}>Dashboard</li>
          <li onClick={() => { setActiveTab("students"); fetchEnrollments(); }}>All Students</li>
          <li onClick={() => setActiveTab("courses")}>Create Courses</li>
          <li onClick={() => setActiveTab("pdf")}>Upload PDF</li>
          <li onClick={() => setActiveTab("quiz")}>Create Quiz</li>
          <li onClick={() => setActiveTab("live")}>Live Classes</li>
          <li onClick={() => setActiveTab("notify")}>Send Notification</li>
        </ul>
      </div>

      {/* MAIN */}
      <div className="main">
        {/* TOP BAR */}
        <div className="top-bar">
          <div className="admin-info">
            <span>{admin?.name || "Admin"}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        </div>

        {/* ===== DASHBOARD ===== */}
        {activeTab === "dashboard" && (
          <>
            <h2 className="dashboard-title">Dashboard Overview</h2>
            <div className="dashboard-cards">
              <div className="dash-card"><h4>Total Students</h4><p>{users.length}</p></div>
              <div className="dash-card"><h4>Total Courses</h4><p>{courses.length}</p></div>
              <div className="dash-card"><h4>Total PDFs</h4><p>{pdfs.length}</p></div>
              <div className="dash-card"><h4>Live Classes</h4><p>2</p></div>
            </div>
          </>
        )}

        {/* ===== STUDENTS (BUG 2 + BUG 3 FIX) ===== */}
        {activeTab === "students" && (
          <>
            <h2>All Students</h2>
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
                      <th>Enrollment Form</th>
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
                              <span style={{
                                background: "rgba(167,139,250,0.15)", color: "#a78bfa",
                                border: "1px solid #a78bfa", borderRadius: "6px",
                                padding: "3px 10px", fontSize: "12px", fontWeight: "700",
                                whiteSpace: "nowrap"
                              }}>
                                {u.enrollmentNumber}
                              </span>
                            ) : "—"}
                          </td>
                          <td>{u.name}</td>
                          <td>{u.email}</td>
                          <td>{u.mobilenumber || "N/A"}</td>
                          {/* ✅ Enrolled / Not Enrolled */}
                          <td>
                            <span style={{
                              display: "inline-block",
                              padding: "4px 12px",
                              borderRadius: "20px",
                              fontSize: "12px",
                              fontWeight: "600",
                              background: u.isEnrolled ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)",
                              color: u.isEnrolled ? "#22c55e" : "#ef4444",
                              border: `1px solid ${u.isEnrolled ? "#22c55e" : "#ef4444"}`,
                              whiteSpace: "nowrap",
                            }}>
                              {u.isEnrolled ? "✅ Enrolled" : "❌ Not Enrolled"}
                            </span>
                          </td>
                          <td>{u.enrolledCourseName || "—"}</td>
                          {/* Eye icon for enrollment form */}
                          <td>
                            {enrollId ? (
                              <button
                                onClick={() => handleViewEnrollment(enrollId)}
                                title="Enrollment Form Dekho"
                                style={{ background: "none", border: "none", cursor: "pointer", fontSize: "20px" }}
                              >
                                👁️
                              </button>
                            ) : "—"}
                          </td>
                          {/* ✅ Result Manage Button */}
                          <td>
                            {u.isEnrolled ? (
                              <button
                                onClick={() => openResultModal(u)}
                                style={{
                                  background: "rgba(96,165,250,0.15)", color: "#60a5fa",
                                  border: "1px solid #60a5fa", borderRadius: "6px",
                                  padding: "5px 12px", cursor: "pointer", fontSize: "12px", fontWeight: "600",
                                  whiteSpace: "nowrap"
                                }}
                              >
                                📊 Manage
                              </button>
                            ) : "—"}
                          </td>
                          {/* ✅ Active / Deactive */}
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
                <p>No students found</p>
              )}
            </div>
          </>
        )}

        {/* ===== COURSES (BUG 1 + BUG 4 FIX) ===== */}
        {activeTab === "courses" && (
          <>
            <h2>Create Courses</h2>
            <div className="form">
              <input type="text" placeholder="Course Name" value={newCourse.title}
                onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })} />
              <input type="text" placeholder="Timing (e.g. 9:00 AM - 11:00 AM)" value={newCourse.timing}
                onChange={(e) => setNewCourse({ ...newCourse, timing: e.target.value })} />
              <input type="number" placeholder="Price" value={newCourse.price}
                onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })} />
              {/* ✅ BUG 4 FIX: New fields */}
              <input type="text" placeholder="Batch (e.g. 2024-25)" value={newCourse.batch}
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
              <button onClick={createCourse}>Create Course</button>
            </div>

            <div className="course-list">
              {courses.length > 0 ? (
                courses.map((c) => (
                  <div className="course-card" key={c._id}>
                    <h4>{c.title}</h4>
                    <p className="timing">⏰ {c.timing}</p>
                    <p className="price">₹ {c.price}</p>
                    {/* ✅ BUG 4: Show new fields */}
                    {c.batch && <p>📅 Batch: {c.batch}</p>}
                    {c.className && <p>🎓 Class: {c.className}</p>}
                    {c.teacherName && <p>👨‍🏫 Teacher: {c.teacherName}</p>}
                    <p className="status">Status: {c.status}</p>
                    {c.status === "published" ? (
                      <button
                        onClick={() => handleSendToUI(c)}
                        style={{ background: c.sentToUI ? "#dc2626" : "#16a34a" }}
                      >
                        {c.sentToUI ? "✓ Sent (Remove)" : "Send to UI"}
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

        {/* ===== PDF ===== */}
        {activeTab === "pdf" && (
  <>
    <h2>📄 Upload PDF / Notes</h2>
 
    {/* UPLOAD FORM */}
    <div className="form">
      <input
        type="text"
        placeholder="PDF Title (e.g. Physics Chapter 1 Notes)"
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
      <button onClick={uploadPDF} disabled={pdfLoading}>
        {pdfLoading ? "⏳ Uploading..." : "⬆️ Upload PDF"}
      </button>
    </div>
 
    {/* PDF CARDS LIST */}
    <div className="pdf-list" style={{ marginTop: "30px" }}>
      <h3 style={{ marginBottom: "16px", color: "#a78bfa" }}>
        📋 All Uploaded PDFs ({pdfs.length})
      </h3>
 
      {pdfs.length === 0 ? (
        <p style={{ color: "#888" }}>Abhi tak koi PDF upload nahi hua</p>
      ) : (
        pdfs.map((pdf) => (
          <div
            key={pdf._id}
            style={{
              background: "#1e1e2e",
              border: `1px solid ${pdf.sentToStudents ? "#22c55e" : "#333"}`,
              borderRadius: "12px",
              padding: "18px 20px",
              marginBottom: "14px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            {/* LEFT: PDF INFO */}
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                <span style={{ fontSize: "24px" }}>📄</span>
                <h4 style={{ margin: 0, color: "#fff", fontSize: "15px" }}>{pdf.title}</h4>
                {pdf.sentToStudents && (
                  <span style={{
                    background: "rgba(34,197,94,0.15)", color: "#22c55e",
                    border: "1px solid #22c55e", borderRadius: "20px",
                    padding: "2px 10px", fontSize: "11px", fontWeight: "600"
                  }}>
                    ✅ Sent to Students
                  </span>
                )}
              </div>
              <p style={{ margin: "0 0 4px", color: "#888", fontSize: "13px" }}>
                📚 Course: {pdf.course || "General"}
              </p>
              <p style={{ margin: 0, color: "#666", fontSize: "12px" }}>
                🕐 Uploaded: {new Date(pdf.createdAt).toLocaleDateString("en-IN", {
                  day: "2-digit", month: "short", year: "numeric"
                })}{", "}
                {new Date(pdf.createdAt).toLocaleTimeString("en-IN", {
                  hour: "2-digit", minute: "2-digit", hour12: true
                })}
              </p>
            </div>
 
            {/* RIGHT: ACTION BUTTONS */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {/* View PDF */}
              <a href={pdf.pdf} target="_blank" rel="noreferrer">
                <button style={{
                  background: "#2563eb", color: "#fff", border: "none",
                  borderRadius: "6px", padding: "7px 14px", cursor: "pointer", fontSize: "13px"
                }}>
                  👁️ View
                </button>
              </a>
 
              {/* Send / Remove toggle */}
              {pdf.sentToStudents ? (
                <button
                  onClick={() => handleRemovePdf(pdf._id, pdf.title)}
                  style={{
                    background: "rgba(239,68,68,0.15)", color: "#ef4444",
                    border: "1px solid #ef4444", borderRadius: "6px",
                    padding: "7px 14px", cursor: "pointer", fontSize: "13px"
                  }}
                >
                  🚫 Remove
                </button>
              ) : (
                <button
                  onClick={() => handleSendPdf(pdf._id, pdf.title)}
                  style={{
                    background: "rgba(34,197,94,0.15)", color: "#22c55e",
                    border: "1px solid #22c55e", borderRadius: "6px",
                    padding: "7px 14px", cursor: "pointer", fontSize: "13px"
                  }}
                >
                  📤 Send to Students
                </button>
              )}
 
              {/* Delete */}
              <button
                onClick={() => handleDeletePdf(pdf._id, pdf.title)}
                style={{
                  background: "rgba(239,68,68,0.15)", color: "#ef4444",
                  border: "1px solid #ef4444", borderRadius: "6px",
                  padding: "7px 14px", cursor: "pointer", fontSize: "13px"
                }}
              >
                🗑️ Delete
              </button>
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
            <h2>📢 Send Notification to All Students</h2>
            <div className="notification">
              <input type="text" placeholder="Subject (e.g. Exam Date, Holiday Notice)"
                value={subject} onChange={(e) => setSubject(e.target.value)} />
              <textarea placeholder="Message likhein..." value={message}
                onChange={(e) => setMessage(e.target.value)} rows={4} />
              <button onClick={sendNotification}>📤 Send to All Students</button>
            </div>

            <div style={{ marginTop: "30px" }}>
              <h3>📋 All Messages ({notifications.length})</h3>
              {notifications.length === 0 ? (
                <p style={{ color: "#888", marginTop: "10px" }}>Abhi tak koi notification send nahi hui...</p>
              ) : (
                <div className="notification-list">
                  {notifications.map((notif) => (
                    <div key={notif._id} className="notification-card"
                      style={{ background: "#1e1e2e", border: "1px solid #333", borderRadius: "10px", padding: "16px 20px", marginBottom: "14px", position: "relative" }}>
                      <h4 style={{ color: "#a78bfa", margin: "0 0 6px 0" }}>📌 {notif.subject}</h4>
                      <p style={{ color: "#ccc", margin: "0 0 10px 0", lineHeight: "1.5", fontSize: "14px" }}>{notif.message}</p>
                      <p style={{ color: "#666", fontSize: "12px", margin: "0" }}>🕐 {formatDateTime(notif.createdAt)}</p>
                      <button onClick={() => deleteNotification(notif._id)}
                        style={{ position: "absolute", top: "14px", right: "14px", background: "#dc2626", color: "white", border: "none", borderRadius: "6px", padding: "5px 12px", cursor: "pointer" }}>
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

      {/* ===== ENROLLMENT DETAIL MODAL (Eye icon) ===== */}
      {showEnrollModal && enrollDetail && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          background: "rgba(0,0,0,0.7)", zIndex: 1000, overflowY: "auto", display: "flex", justifyContent: "center", alignItems: "flex-start", padding: "40px 20px"
        }}>
          <div style={{ background: "#1e1e2e", borderRadius: "12px", padding: "30px", maxWidth: "700px", width: "100%", color: "#fff", position: "relative" }}>
            <button onClick={() => setShowEnrollModal(false)}
              style={{ position: "absolute", top: "15px", right: "15px", background: "#dc2626", color: "white", border: "none", borderRadius: "6px", padding: "6px 14px", cursor: "pointer", fontSize: "14px" }}>
              ✖ Close
            </button>
            <h2 style={{ color: "#a78bfa", marginBottom: "20px" }}>📋 Enrollment Form Details</h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
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
                ["Enrolled On", new Date(enrollDetail.enrolledAt).toLocaleDateString("hi-IN")],
              ].map(([label, value]) => (
                <div key={label} style={{ background: "#2a2a3e", borderRadius: "8px", padding: "10px 14px" }}>
                  <p style={{ color: "#888", fontSize: "12px", margin: "0 0 4px" }}>{label}</p>
                  <p style={{ color: "#fff", fontSize: "14px", margin: "0", fontWeight: "500" }}>{value || "—"}</p>
                </div>
              ))}
            </div>

            {enrollDetail.photo && (
              <div style={{ marginTop: "20px", textAlign: "center" }}>
                <p style={{ color: "#888", marginBottom: "8px" }}>Passport Photo</p>
                <img
                  src={`${BASE_URL}/upload/photos/${enrollDetail.photo}`}
                  alt="Student"
                  style={{ width: "120px", height: "140px", objectFit: "cover", borderRadius: "8px", border: "2px solid #a78bfa" }}
                />
              </div>
            )}
          </div>
        </div>
      )}
      {/* ===== RESULT MANAGEMENT MODAL ===== */}
      {showResultModal && selectedStudent && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          background: "rgba(0,0,0,0.8)", zIndex: 1000, overflowY: "auto",
          display: "flex", justifyContent: "center", alignItems: "flex-start", padding: "30px 15px"
        }}>
          <div style={{
            background: "#1e1e2e", borderRadius: "14px", padding: "26px",
            maxWidth: "700px", width: "100%", color: "#fff", position: "relative"
          }}>
            <button
              onClick={() => { setShowResultModal(false); setShowResultForm(false); resetResultForm(); }}
              style={{
                position: "absolute", top: "15px", right: "15px",
                background: "#dc2626", color: "#fff", border: "none",
                borderRadius: "6px", padding: "6px 14px", cursor: "pointer"
              }}
            >
              ✖
            </button>

            <h2 style={{ color: "#a78bfa", marginBottom: "4px" }}>📊 Results</h2>
            <p style={{ color: "#888", marginBottom: "4px" }}>
              Student: <strong style={{ color: "#fff" }}>{selectedStudent.name}</strong>
            </p>
            <p style={{ color: "#888", marginBottom: "20px" }}>
              Enrollment No: <strong style={{ color: "#a78bfa" }}>{selectedStudent.enrollmentNumber || "N/A"}</strong>
              {" | "}Course: <strong style={{ color: "#60a5fa" }}>{selectedStudent.enrolledCourseName || "—"}</strong>
            </p>

            {!showResultForm && (
              <button
                onClick={() => { resetResultForm(); setShowResultForm(true); }}
                style={{
                  background: "#6c63ff", color: "#fff", border: "none",
                  borderRadius: "8px", padding: "10px 20px", cursor: "pointer",
                  fontWeight: "600", marginBottom: "20px"
                }}
              >
                + Add New Result
              </button>
            )}

            {showResultForm && (
              <div style={{ background: "#2a2a3e", borderRadius: "10px", padding: "20px", marginBottom: "20px" }}>
                <h4 style={{ color: "#a78bfa", marginBottom: "14px" }}>
                  {editingResultId ? "✏️ Edit Result" : "➕ Add New Result"}
                </h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ fontSize: "12px", color: "#888" }}>Test Type *</label>
                    <select
                      value={resultForm.testType}
                      onChange={(e) => setResultForm({ ...resultForm, testType: e.target.value })}
                      style={resultInputStyle}
                    >
                      <option>Marathon Test</option>
                      <option>Weekly Test</option>
                      <option>Quiz Test</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: "12px", color: "#888" }}>Test Name *</label>
                    <input
                      value={resultForm.testName}
                      onChange={(e) => setResultForm({ ...resultForm, testName: e.target.value })}
                      placeholder="e.g. Marathon Test #1"
                      style={resultInputStyle}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "12px", color: "#888" }}>Marks Obtained *</label>
                    <input
                      type="number"
                      value={resultForm.marksObtained}
                      onChange={(e) => setResultForm({ ...resultForm, marksObtained: e.target.value })}
                      placeholder="e.g. 85"
                      style={resultInputStyle}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "12px", color: "#888" }}>Total Marks *</label>
                    <input
                      type="number"
                      value={resultForm.totalMarks}
                      onChange={(e) => setResultForm({ ...resultForm, totalMarks: e.target.value })}
                      placeholder="e.g. 100"
                      style={resultInputStyle}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "12px", color: "#888" }}>Date</label>
                    <input
                      type="date"
                      value={resultForm.date}
                      onChange={(e) => setResultForm({ ...resultForm, date: e.target.value })}
                      style={resultInputStyle}
                    />
                  </div>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label style={{ fontSize: "12px", color: "#888" }}>Remarks (Optional)</label>
                    <input
                      value={resultForm.remarks}
                      onChange={(e) => setResultForm({ ...resultForm, remarks: e.target.value })}
                      placeholder="e.g. Excellent performance!"
                      style={resultInputStyle}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
                  <button
                    onClick={() => { setShowResultForm(false); resetResultForm(); }}
                    style={{
                      background: "#374151", color: "#fff", border: "none",
                      borderRadius: "8px", padding: "10px 18px", cursor: "pointer"
                    }}
                  >
                    Cancel
                  </button>
                  {!editingResultId && (
                    <button
                      onClick={() => handleSaveResult(false)}
                      style={{
                        background: "#374151", color: "#fff", border: "1px solid #555",
                        borderRadius: "8px", padding: "10px 18px", cursor: "pointer"
                      }}
                    >
                      💾 Save Draft
                    </button>
                  )}
                  <button
                    onClick={() => handleSaveResult(true)}
                    style={{
                      background: "#22c55e", color: "#fff", border: "none",
                      borderRadius: "8px", padding: "10px 18px", cursor: "pointer",
                      fontWeight: "600", flex: 1
                    }}
                  >
                    {editingResultId ? "✅ Update Result" : "📤 Save & Send"}
                  </button>
                </div>
              </div>
            )}

            <h4 style={{ color: "#888", marginBottom: "10px", fontSize: "14px" }}>
              📋 Results History ({studentResults.length})
            </h4>

            {studentResults.length === 0 ? (
              <p style={{ color: "#666" }}>Abhi tak koi result add nahi hua</p>
            ) : (
              studentResults.map((r) => (
                <div
                  key={r._id}
                  style={{
                    background: "#252538", borderRadius: "10px", padding: "14px 18px",
                    marginBottom: "10px", border: `1px solid ${r.sentToStudent ? "#22c55e" : "#444"}`
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "10px" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", flexWrap: "wrap" }}>
                        <span style={{
                          fontSize: "11px", background: "#374151", padding: "2px 8px",
                          borderRadius: "10px", color: "#a78bfa"
                        }}>
                          {r.testType}
                        </span>
                        <h4 style={{ margin: 0, color: "#fff", fontSize: "14px" }}>{r.testName}</h4>
                        {r.sentToStudent && (
                          <span style={{
                            background: "rgba(34,197,94,0.15)", color: "#22c55e",
                            border: "1px solid #22c55e", borderRadius: "20px",
                            padding: "1px 8px", fontSize: "10px", fontWeight: "600"
                          }}>
                            ✅ Sent
                          </span>
                        )}
                      </div>
                      <p style={{ margin: "0 0 2px", color: "#ccc", fontSize: "13px" }}>
                        Marks: <strong style={{ color: "#fff" }}>{r.marksObtained}/{r.totalMarks}</strong>
                        {" "}({r.percentage}%)
                      </p>
                      <p style={{ margin: 0, color: "#666", fontSize: "12px" }}>
                        📅 {new Date(r.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                        {r.remarks && ` | 💬 ${r.remarks}`}
                      </p>
                    </div>

                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {r.sentToStudent ? (
                        <button onClick={() => handleUnsendResult(r._id, r.testName)} style={smallBtnStyle("#ef4444")}>
                          🚫 Unsend
                        </button>
                      ) : (
                        <button onClick={() => handleSendResult(r._id, r.testName)} style={smallBtnStyle("#22c55e")}>
                          📤 Send
                        </button>
                      )}
                      <button onClick={() => handleEditResult(r)} style={smallBtnStyle("#60a5fa")}>
                        ✏️ Edit
                      </button>
                      <button onClick={() => handleDeleteResult(r._id, r.testName)} style={smallBtnStyle("#ef4444")}>
                        🗑️ Delete
                      </button>
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

const resultInputStyle = {
  width: "100%", padding: "9px 12px", background: "#1e1e2e",
  border: "1px solid #444", borderRadius: "8px", color: "#fff",
  fontSize: "13px", boxSizing: "border-box", marginTop: "4px"
};

const smallBtnStyle = (color) => ({
  background: `${color}22`, color: color, border: `1px solid ${color}`,
  borderRadius: "6px", padding: "5px 10px", cursor: "pointer", fontSize: "12px"
});

export default AdminDashboard;