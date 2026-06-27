// import React, { useState, useRef, useEffect } from "react";
// import "./styles/Dashboard.css";
// import { useNavigate, useLocation } from "react-router-dom";
// const BASE_URL = import.meta.env.VITE_BASE_URL;

// const Dashboard = () => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();
//   const location = useLocation();

//   const urlParams = new URLSearchParams(location.search);
//   const initialTab = urlParams.get("tab") || "dashboard";

//   const [activeTab, setActiveTab] = useState(initialTab);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   const [courses, setCourses] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [pdfs, setPdfs] = useState([]);

//   const [loadingCourses, setLoadingCourses] = useState(false);
//   const [errorCourses, setErrorCourses] = useState("");

//   // ===== ENROLLMENT FORM STATE =====
//   const [showEnrollForm, setShowEnrollForm] = useState(false);
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [enrolledCourseIds, setEnrolledCourseIds] = useState([]);
//   const [enrollStep, setEnrollStep] = useState(1);
//   const [enrollLoading, setEnrollLoading] = useState(false);
//   const [enrollSuccess, setEnrollSuccess] = useState(false);
//   const [photoFile, setPhotoFile] = useState(null);
//   const [myResults, setMyResults] = useState([]);
//   const [lastEnrollmentNumber, setLastEnrollmentNumber] = useState("");

//   const [formData, setFormData] = useState({
//     studentName: user?.name || "",
//     fatherName: "",
//     motherName: "",
//     dob: "",
//     aadharNo: "",
//     gender: "",
//     mobile: user?.mobilenumber || "",
//     email: user?.email || "",
//     fullAddress: "",
//     city: "",
//     district: "",
//     state: "",
//     pinCode: "",
//     schoolName: "",
//     board: "",
//     presentClass: "",
//     stream: "",
//     prevPercentage: "",
//     feesMode: "",
//     agreed: false,
//   });

//   const authHeaders = {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token}`,
//   };

//   // ===== FETCH COURSES =====
//   const fetchCourses = async () => {
//     setLoadingCourses(true);
//     setErrorCourses("");
//     try {
//       const res = await fetch(`${BASE_URL}/api/courses/public`);
//       const data = await res.json();
//       setCourses(Array.isArray(data) ? data : []);
//     } catch {
//       setErrorCourses("Could not load courses. Please try again.");
//     } finally {
//       setLoadingCourses(false);
//     }
//   };

//   // ===== FETCH ENROLLED COURSES =====
//   const fetchEnrolledCourses = async () => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/enrollments/student/${user?.id}`, {
//         headers: authHeaders,
//       });
//       const data = await res.json();
//       if (Array.isArray(data)) {
//         setEnrolledCourseIds(data.map((e) => e.course));
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const fetchMessages = async () => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/notifications/all`, { headers: authHeaders });
//       const data = await res.json();
//       setMessages(data.data || []);
//     } catch {}
//   };

//   const fetchPdfs = async () => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/pdfs/public`);
//       const data = await res.json();
//       setPdfs(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.log("PDF fetch error:", err);
//       setPdfs([]);
//     }
//   };

//   // ===== FETCH MY RESULTS =====
//   const fetchMyResults = async () => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/results/my/${user?.id}`, {
//         headers: authHeaders,
//       });
//       const data = await res.json();
//       setMyResults(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.log("Results fetch error:", err);
//       setMyResults([]);
//     }
//   };

//   useEffect(() => {
//     if (activeTab === "courses") {
//       fetchCourses();
//       fetchEnrolledCourses();
//     }
//     if (activeTab === "messages") fetchMessages();
//     if (activeTab === "pdfs") fetchPdfs();
//     if (activeTab === "results") fetchMyResults();
//   }, [activeTab]);

//   // ===== Pending enroll course auto-open =====
//   useEffect(() => {
//     const pendingCourseId = localStorage.getItem("pendingEnrollCourse");
//     if (pendingCourseId && courses.length > 0) {
//       const course = courses.find((c) => c._id === pendingCourseId);
//       if (course) {
//         localStorage.removeItem("pendingEnrollCourse");
//         openEnrollForm(course);
//       }
//     }
//   }, [courses]);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target))
//         setDropdownOpen(false);
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/");
//   };

//   const formatDate = (dateStr) =>
//     new Date(dateStr).toLocaleDateString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });

//   const isEnrolled = (courseId) => {
//     const currentUser = JSON.parse(localStorage.getItem("user"));
//     return (
//       enrolledCourseIds.includes(courseId) ||
//       currentUser?.enrolledCourse === courseId
//     );
//   };

//   // ===== OPEN ENROLLMENT FORM =====
//   const openEnrollForm = (course) => {
//     setSelectedCourse(course);
//     setEnrollStep(1);
//     setEnrollSuccess(false);
//     setEnrollLoading(false);
//     setFormData({
//       studentName: user?.name || "",
//       fatherName: "",
//       motherName: "",
//       dob: "",
//       aadharNo: "",
//       gender: "",
//       mobile: user?.mobilenumber?.toString() || "",
//       email: user?.email || "",
//       fullAddress: "",
//       city: "",
//       district: "",
//       state: "",
//       pinCode: "",
//       schoolName: "",
//       board: "",
//       presentClass: "",
//       stream: "",
//       prevPercentage: "",
//       feesMode: "",
//       agreed: false,
//     });
//     setPhotoFile(null);
//     setShowEnrollForm(true);
//   };

//   // ===== SUBMIT ENROLLMENT =====
//   // ✅ FIX: Response aate hi success dikhao — email backend mein non-blocking hai
//   const handleEnrollSubmit = async () => {
//     if (!formData.agreed) {
//       alert("Please accept the terms and conditions");
//       return;
//     }

//     setEnrollLoading(true);

//     try {
//       const fd = new FormData();
//       fd.append("studentId", user?.id);
//       fd.append("courseId", selectedCourse._id);
//       fd.append("courseName", selectedCourse.title);

//       Object.keys(formData).forEach((key) => {
//         if (key !== "agreed") fd.append(key, formData[key]);
//       });

//       if (photoFile) fd.append("photo", photoFile);

//       const res = await fetch(`${BASE_URL}/api/enrollments`, {
//         method: "POST",
//         headers: { Authorization: `Bearer ${token}` },
//         body: fd,
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Enrollment failed");
//       }

//       // ✅ LocalStorage update karo
//       const updatedUser = {
//         ...user,
//         isEnrolled: true,
//         enrolledCourse: selectedCourse._id,
//         enrolledCourseName: selectedCourse.title,
//         enrollmentNumber: data.enrollmentNumber || "",
//       };
//       localStorage.setItem("user", JSON.stringify(updatedUser));
//       setEnrolledCourseIds((prev) => [...prev, selectedCourse._id]);
//       setLastEnrollmentNumber(data.enrollmentNumber || "");

//       // ✅ Turant success dikhao
//       setEnrollSuccess(true);
//     } catch (error) {
//       console.log("Enrollment error:", error);
//       alert("Enrollment failed: " + error.message);
//     } finally {
//       setEnrollLoading(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   // ===== RENDER DASHBOARD =====
//   const renderDashboard = () => {
//     const currentUser = JSON.parse(localStorage.getItem("user"));
//     return (
//       <div className="stats">
//         <div className="stat-card">
//           <p>Enrollment Status</p>
//           <h2
//             style={{
//               fontSize: "16px",
//               color: currentUser?.isEnrolled ? "#22c55e" : "#f59e0b",
//             }}
//           >
//             {currentUser?.isEnrolled ? "✅ Enrolled" : "❌ Not Enrolled"}
//           </h2>
//         </div>
//         {currentUser?.enrollmentNumber && (
//           <div className="stat-card">
//             <p>Enrollment Number</p>
//             <h2 style={{ fontSize: "16px", color: "#a78bfa" }}>
//               🆔 {currentUser.enrollmentNumber}
//             </h2>
//           </div>
//         )}
//         {currentUser?.isEnrolled && (
//           <div className="stat-card">
//             <p>Enrolled Course</p>
//             <h2 style={{ fontSize: "14px" }}>
//               {currentUser?.enrolledCourseName || "—"}
//             </h2>
//           </div>
//         )}
//         <div className="stat-card">
//           <p>In Progress</p>
//           <h2>0</h2>
//         </div>
//         <div className="stat-card">
//           <p>Completed</p>
//           <h2>0</h2>
//         </div>
//       </div>
//     );
//   };

//   // ===== RENDER COURSES =====
//   const renderCourses = () => (
//     <div className="section">
//       <h2>Available Courses</h2>
//       {loadingCourses && <p className="loading-text">Loading courses...</p>}
//       {errorCourses && <p className="error-text">❌ {errorCourses}</p>}
//       {!loadingCourses && !errorCourses && courses.length === 0 && (
//         <p className="empty-text">No published courses available right now.</p>
//       )}
//       {!loadingCourses && courses.length > 0 && (
//         <div className="course-grid">
//           {courses.map((course) => {
//             const enrolled = isEnrolled(course._id);
//             return (
//               <div className="course-card-full" key={course._id}>
//                 <div className="course-badge">✅ Published</div>
//                 <h3>{course.title}</h3>
//                 <div className="course-meta">
//                   <span>⏱ {course.timing}</span>
//                   <span>💰 ₹{course.price}</span>
//                 </div>
//                 {course.batch && (
//                   <p style={{ color: "#a78bfa", fontSize: "13px", margin: "4px 0" }}>
//                     📅 Batch: {course.batch}
//                   </p>
//                 )}
//                 {course.className && (
//                   <p style={{ color: "#60a5fa", fontSize: "13px", margin: "4px 0" }}>
//                     🎓 Class: {course.className}
//                   </p>
//                 )}
//                 {course.teacherName && (
//                   <p style={{ color: "#34d399", fontSize: "13px", margin: "4px 0" }}>
//                     👨‍🏫 Teacher: {course.teacherName}
//                   </p>
//                 )}
//                 <p className="course-date">Added: {formatDate(course.createdAt)}</p>
//                 {enrolled ? (
//                   <div
//                     style={{
//                       background: "#22c55e",
//                       color: "white",
//                       padding: "10px 20px",
//                       borderRadius: "8px",
//                       textAlign: "center",
//                       fontWeight: "600",
//                       marginTop: "10px",
//                     }}
//                   >
//                     ✅ Enrolled
//                   </div>
//                 ) : (
//                   <button
//                     className="enroll-btn"
//                     onClick={() => openEnrollForm(course)}
//                   >
//                     Enroll Now
//                   </button>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );

//   const renderMessages = () => (
//     <div className="section">
//       <h2>Messages from Admin</h2>
//       {messages.length === 0 ? (
//         <p className="empty-text">No messages yet.</p>
//       ) : (
//         <div className="message-list">
//           {messages.map((msg) => (
//             <div className="message-card" key={msg._id}>
//               <div className="message-header">
//                 <h4>📢 {msg.subject}</h4>
//                 <span className="message-date">{formatDate(msg.createdAt)}</span>
//               </div>
//               <p className="message-body">{msg.message}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );

//   const renderPdfs = () => (
//     <div className="section">
//       <h2>Study Materials</h2>
//       {pdfs.length === 0 ? (
//         <p className="empty-text">No study materials uploaded yet.</p>
//       ) : (
//         <div className="pdf-grid">
//           {pdfs.map((pdf) => (
//             <div className="pdf-card" key={pdf._id}>
//               <div className="pdf-icon">📄</div>
//               <div className="pdf-info">
//                 <h4>{pdf.title}</h4>
//                 <p>Course: {pdf.course || "General"}</p>
//               </div>
//               <a
//                 href={pdf.pdf}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="pdf-download-btn"
//               >
//                 ⬇ Download
//               </a>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );

//   const renderResults = () => {
//     const getTestIcon = (type) => {
//       if (type === "Marathon Test") return "🏃";
//       if (type === "Weekly Test") return "📅";
//       if (type === "Quiz Test") return "❓";
//       return "📝";
//     };
//     const getGradeColor = (percentage) => {
//       if (percentage >= 90) return "#22c55e";
//       if (percentage >= 75) return "#60a5fa";
//       if (percentage >= 50) return "#f59e0b";
//       return "#ef4444";
//     };
//     const currentUser = JSON.parse(localStorage.getItem("user"));

//     return (
//       <div className="section">
//         <h2>📊 My Results</h2>

//         {currentUser?.enrollmentNumber && (
//           <div style={{
//             background: "linear-gradient(135deg, #6c63ff, #a78bfa)",
//             borderRadius: "12px", padding: "16px 20px", marginBottom: "20px",
//             display: "flex", justifyContent: "space-between", alignItems: "center"
//           }}>
//             <div>
//               <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "12px", margin: "0 0 4px" }}>
//                 Your Enrollment Number
//               </p>
//               <p style={{ color: "#fff", fontSize: "22px", fontWeight: "700", margin: 0 }}>
//                 {currentUser.enrollmentNumber}
//               </p>
//             </div>
//             <div style={{ fontSize: "40px" }}>🎓</div>
//           </div>
//         )}

//         {myResults.length === 0 ? (
//           <p className="empty-text">Abhi tak koi result publish nahi hua hai.</p>
//         ) : (
//           <div style={{ display: "grid", gap: "14px" }}>
//             {myResults.map((r) => (
//               <div
//                 key={r._id}
//                 style={{
//                   background: "#1e1e2e", borderRadius: "12px", padding: "18px 20px",
//                   border: "1px solid #333",
//                 }}
//               >
//                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px", flexWrap: "wrap", gap: "8px" }}>
//                   <div>
//                     <span style={{
//                       fontSize: "12px", background: "#2a2a3e", padding: "3px 10px",
//                       borderRadius: "12px", color: "#a78bfa", marginRight: "8px"
//                     }}>
//                       {getTestIcon(r.testType)} {r.testType}
//                     </span>
//                     <h3 style={{ margin: "8px 0 0", color: "#fff", fontSize: "17px" }}>
//                       {r.testName}
//                     </h3>
//                   </div>
//                   <div style={{ textAlign: "right" }}>
//                     <p style={{
//                       margin: 0, fontSize: "26px", fontWeight: "800",
//                       color: getGradeColor(r.percentage)
//                     }}>
//                       {r.percentage}%
//                     </p>
//                   </div>
//                 </div>

//                 <div style={{
//                   display: "flex", justifyContent: "space-between",
//                   background: "#2a2a3e", borderRadius: "8px", padding: "10px 14px", marginBottom: "8px"
//                 }}>
//                   <span style={{ color: "#888", fontSize: "13px" }}>Marks Obtained</span>
//                   <span style={{ color: "#fff", fontWeight: "700", fontSize: "13px" }}>
//                     {r.marksObtained} / {r.totalMarks}
//                   </span>
//                 </div>

//                 <p style={{ color: "#666", fontSize: "12px", margin: "0 0 4px" }}>
//                   📅 {new Date(r.date).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}
//                 </p>

//                 {r.remarks && (
//                   <p style={{
//                     color: "#a78bfa", fontSize: "13px", margin: "8px 0 0",
//                     background: "rgba(167,139,250,0.1)", padding: "8px 12px", borderRadius: "6px"
//                   }}>
//                     💬 {r.remarks}
//                   </p>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   };

//   const renderContent = () => {
//     switch (activeTab) {
//       case "dashboard": return renderDashboard();
//       case "courses": return renderCourses();
//       case "messages": return renderMessages();
//       case "pdfs": return renderPdfs();
//       case "results": return renderResults();
//       default: return renderDashboard();
//     }
//   };

//   const tabs = [
//     { id: "dashboard", label: "🏠 Dashboard" },
//     { id: "courses", label: "📚 Courses" },
//     { id: "results", label: "📊 Results" },
//     { id: "messages", label: "💬 Messages" },
//     { id: "pdfs", label: "📄 PDFs" },
//   ];

//   const stepLabels = ["Personal", "Address", "Academic", "Fees", "Submit"];

//   return (
//     <div className="dashboard-container">
//       <div className="sidebar">
//         <h2 className="logo">Climax Academy</h2>
//         <ul>
//           {tabs.map((tab) => (
//             <li
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={activeTab === tab.id ? "active" : ""}
//             >
//               {tab.label}
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="main-content">
//         <div className="header">
//           <h1>Welcome, {user?.name} 👋</h1>
//           <div className="profile-wrapper" ref={dropdownRef}>
//             <img
//               src={`https://ui-avatars.com/api/?name=${user?.name}`}
//               alt="profile"
//               className="profile-avatar"
//               onClick={() => setDropdownOpen((prev) => !prev)}
//             />
//             {dropdownOpen && (
//               <div
//                 className="profile-dropdown"
//                 onMouseLeave={() => setDropdownOpen(false)}
//               >
//                 <p className="dropdown-email">{user?.email}</p>
//                 <hr />
//                 <button className="dropdown-item logout" onClick={handleLogout}>
//                   🚪 Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//         {renderContent()}
//       </div>

//       {/* ===== ENROLLMENT FORM MODAL ===== */}
//       {showEnrollForm && (
//         <div
//           style={{
//             position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
//             background: "rgba(0,0,0,0.85)", zIndex: 1000, overflowY: "auto",
//             display: "flex", justifyContent: "center", alignItems: "flex-start",
//             padding: "30px 15px",
//           }}
//         >
//           <div
//             style={{
//               background: "#1e1e2e", borderRadius: "16px", padding: "30px",
//               maxWidth: "650px", width: "100%", color: "#fff", position: "relative",
//             }}
//           >
//             {/* Close button — sirf success nahi hai tab */}
//             {!enrollSuccess && !enrollLoading && (
//               <button
//                 onClick={() => setShowEnrollForm(false)}
//                 style={{
//                   position: "absolute", top: "15px", right: "15px",
//                   background: "#dc2626", color: "#fff", border: "none",
//                   borderRadius: "6px", padding: "6px 14px", cursor: "pointer",
//                 }}
//               >
//                 ✖
//               </button>
//             )}

//             <h2 style={{ color: "#a78bfa", marginBottom: "5px" }}>
//               🎓 Enrollment Form
//             </h2>
//             <p style={{ color: "#888", marginBottom: "20px" }}>
//               Course:{" "}
//               <strong style={{ color: "#60a5fa" }}>{selectedCourse?.title}</strong>
//             </p>

//             {/* ===== SUCCESS SCREEN ===== */}
//             {enrollSuccess ? (
//               <div style={{ textAlign: "center", padding: "20px 10px" }}>
//                 <div style={{ fontSize: "70px", marginBottom: "10px" }}>🎉</div>
//                 <h2 style={{ color: "#22c55e", marginBottom: "8px" }}>
//                   Enrollment Confirmed!
//                 </h2>
//                 <p style={{ color: "#ccc", fontSize: "15px", marginBottom: "6px" }}>
//                   Aap successfully enroll ho gaye hain:
//                 </p>
//                 <p
//                   style={{
//                     color: "#a78bfa", fontWeight: "700",
//                     fontSize: "20px", marginBottom: "16px",
//                   }}
//                 >
//                   {selectedCourse?.title}
//                 </p>
//                 {lastEnrollmentNumber && (
//                   <div style={{
//                     background: "#6c63ff", color: "#fff", padding: "14px",
//                     borderRadius: "10px", textAlign: "center", marginBottom: "16px"
//                   }}>
//                     <p style={{ margin: 0, fontSize: "12px", opacity: 0.85 }}>Your Enrollment Number</p>
//                     <p style={{ margin: "4px 0 0", fontSize: "24px", fontWeight: "800" }}>
//                       {lastEnrollmentNumber}
//                     </p>
//                   </div>
//                 )}
//                 <div
//                   style={{
//                     background: "#2a2a3e", borderRadius: "10px",
//                     padding: "14px 20px", marginBottom: "20px", textAlign: "left",
//                   }}
//                 >
//                   {[
//                     ["👤 Name", formData.studentName],
//                     ["📧 Email", formData.email],
//                     ["📱 Mobile", formData.mobile],
//                     ["💰 Fees Mode", formData.feesMode === "online" ? "💳 Online" : "💵 Offline"],
//                   ].map(([k, v]) => (
//                     <div
//                       key={k}
//                       style={{
//                         display: "flex", justifyContent: "space-between",
//                         padding: "6px 0", borderBottom: "1px solid #333",
//                         fontSize: "14px",
//                       }}
//                     >
//                       <span style={{ color: "#888" }}>{k}</span>
//                       <span style={{ color: "#fff" }}>{v}</span>
//                     </div>
//                   ))}
//                 </div>
//                 <p style={{ color: "#888", fontSize: "13px", marginBottom: "20px" }}>
//                   📧 Confirmation email bheja ja raha hai:{" "}
//                   <strong style={{ color: "#60a5fa" }}>{formData.email}</strong>
//                 </p>
//                 <button
//                   onClick={() => {
//                     setShowEnrollForm(false);
//                     setEnrollSuccess(false);
//                     window.location.reload(); // Dashboard refresh
//                   }}
//                   style={{
//                     background: "#6c63ff", color: "#fff", border: "none",
//                     borderRadius: "10px", padding: "14px 50px",
//                     fontSize: "16px", cursor: "pointer", fontWeight: "700",
//                   }}
//                 >
//                   ✅ Done
//                 </button>
//               </div>
//             ) : (
//               <>
//                 {/* STEP INDICATOR */}
//                 <div
//                   style={{
//                     display: "flex", gap: "6px",
//                     marginBottom: "25px", justifyContent: "center",
//                   }}
//                 >
//                   {stepLabels.map((label, i) => (
//                     <div
//                       key={i}
//                       style={{
//                         flex: 1, textAlign: "center", padding: "8px 4px",
//                         borderRadius: "8px", fontSize: "11px",
//                         background:
//                           enrollStep === i + 1
//                             ? "#6c63ff"
//                             : enrollStep > i + 1
//                             ? "#22c55e"
//                             : "#2a2a3e",
//                         color: "#fff",
//                         fontWeight: enrollStep === i + 1 ? "700" : "400",
//                       }}
//                     >
//                       {enrollStep > i + 1 ? "✓" : i + 1}. {label}
//                     </div>
//                   ))}
//                 </div>

//                 {/* ===== STEP 1: PERSONAL ===== */}
//                 {enrollStep === 1 && (
//                   <div>
//                     <h3 style={{ color: "#a78bfa", marginBottom: "15px" }}>
//                       Step 1: Personal Details
//                     </h3>
//                     <div
//                       style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}
//                     >
//                       <div>
//                         <label style={labelStyle}>Student Name</label>
//                         <input
//                           value={formData.studentName}
//                           readOnly
//                           style={{ ...inputStyle, background: "#111", cursor: "not-allowed" }}
//                         />
//                       </div>
//                       <div>
//                         <label style={labelStyle}>Father's Name *</label>
//                         <input
//                           name="fatherName"
//                           value={formData.fatherName}
//                           onChange={handleInputChange}
//                           placeholder="Father's Name"
//                           style={inputStyle}
//                         />
//                       </div>
//                       <div>
//                         <label style={labelStyle}>Mother's Name *</label>
//                         <input
//                           name="motherName"
//                           value={formData.motherName}
//                           onChange={handleInputChange}
//                           placeholder="Mother's Name"
//                           style={inputStyle}
//                         />
//                       </div>
//                       <div>
//                         <label style={labelStyle}>Date of Birth *</label>
//                         <input
//                           type="date"
//                           name="dob"
//                           value={formData.dob}
//                           onChange={handleInputChange}
//                           style={inputStyle}
//                         />
//                       </div>
//                       <div>
//                         <label style={labelStyle}>Aadhar Card No. *</label>
//                         <input
//                           name="aadharNo"
//                           value={formData.aadharNo}
//                           onChange={handleInputChange}
//                           placeholder="XXXX XXXX XXXX"
//                           style={inputStyle}
//                           maxLength={14}
//                         />
//                       </div>
//                       <div>
//                         <label style={labelStyle}>Gender *</label>
//                         <select
//                           name="gender"
//                           value={formData.gender}
//                           onChange={handleInputChange}
//                           style={inputStyle}
//                         >
//                           <option value="">Select Gender</option>
//                           <option>Male</option>
//                           <option>Female</option>
//                           <option>Other</option>
//                         </select>
//                       </div>
//                       <div>
//                         <label style={labelStyle}>Mobile Number</label>
//                         <input
//                           value={formData.mobile}
//                           readOnly
//                           style={{ ...inputStyle, background: "#111", cursor: "not-allowed" }}
//                         />
//                       </div>
//                       <div>
//                         <label style={labelStyle}>Email ID</label>
//                         <input
//                           value={formData.email}
//                           readOnly
//                           style={{ ...inputStyle, background: "#111", cursor: "not-allowed" }}
//                         />
//                       </div>
//                       <div style={{ gridColumn: "1 / -1" }}>
//                         <label style={labelStyle}>Passport Size Photo</label>
//                         <input
//                           type="file"
//                           accept="image/*"
//                           onChange={(e) => setPhotoFile(e.target.files[0])}
//                           style={{ ...inputStyle, padding: "8px" }}
//                         />
//                       </div>
//                     </div>
//                     <button
//                       onClick={() => {
//                         if (!formData.fatherName || !formData.motherName || !formData.dob || !formData.aadharNo || !formData.gender) {
//                           alert("Please fill all required fields");
//                           return;
//                         }
//                         setEnrollStep(2);
//                       }}
//                       style={nextBtnStyle}
//                     >
//                       Next →
//                     </button>
//                   </div>
//                 )}

//                 {/* ===== STEP 2: ADDRESS ===== */}
//                 {enrollStep === 2 && (
//                   <div>
//                     <h3 style={{ color: "#f59e0b", marginBottom: "15px" }}>
//                       Step 2: Address Details
//                     </h3>
//                     <div
//                       style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}
//                     >
//                       <div style={{ gridColumn: "1 / -1" }}>
//                         <label style={labelStyle}>Full Address *</label>
//                         <textarea
//                           name="fullAddress"
//                           value={formData.fullAddress}
//                           onChange={handleInputChange}
//                           placeholder="House No., Street, Area..."
//                           rows={2}
//                           style={{ ...inputStyle, resize: "vertical" }}
//                         />
//                       </div>
//                       {[
//                         ["city", "City / Village *", "City ya Village"],
//                         ["district", "District *", "District"],
//                         ["state", "State *", "State"],
//                         ["pinCode", "PIN Code *", "000000"],
//                       ].map(([name, label, placeholder]) => (
//                         <div key={name}>
//                           <label style={labelStyle}>{label}</label>
//                           <input
//                             name={name}
//                             value={formData[name]}
//                             onChange={handleInputChange}
//                             placeholder={placeholder}
//                             style={inputStyle}
//                           />
//                         </div>
//                       ))}
//                     </div>
//                     <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
//                       <button onClick={() => setEnrollStep(1)} style={backBtnStyle}>
//                         ← Back
//                       </button>
//                       <button
//                         onClick={() => {
//                           if (!formData.fullAddress || !formData.city || !formData.district || !formData.state || !formData.pinCode) {
//                             alert("Please fill all address fields");
//                             return;
//                           }
//                           setEnrollStep(3);
//                         }}
//                         style={nextBtnStyle}
//                       >
//                         Next →
//                       </button>
//                     </div>
//                   </div>
//                 )}

//                 {/* ===== STEP 3: ACADEMIC ===== */}
//                 {enrollStep === 3 && (
//                   <div>
//                     <h3 style={{ color: "#60a5fa", marginBottom: "15px" }}>
//                       Step 3: Academic Details
//                     </h3>
//                     <div
//                       style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}
//                     >
//                       <div style={{ gridColumn: "1 / -1" }}>
//                         <label style={labelStyle}>School Name *</label>
//                         <input
//                           name="schoolName"
//                           value={formData.schoolName}
//                           onChange={handleInputChange}
//                           placeholder="School Name"
//                           style={inputStyle}
//                         />
//                       </div>
//                       <div>
//                         <label style={labelStyle}>Board *</label>
//                         <select
//                           name="board"
//                           value={formData.board}
//                           onChange={handleInputChange}
//                           style={inputStyle}
//                         >
//                           <option value="">Select Board</option>
//                           <option>CBSE</option>
//                           <option>MP Board</option>
//                           <option>UP Board</option>
//                           <option>Other</option>
//                         </select>
//                       </div>
//                       <div>
//                         <label style={labelStyle}>Present Class *</label>
//                         <select
//                           name="presentClass"
//                           value={formData.presentClass}
//                           onChange={handleInputChange}
//                           style={inputStyle}
//                         >
//                           <option value="">Select Class</option>
//                           <option>9th</option>
//                           <option>10th</option>
//                           <option>11th</option>
//                           <option>12th</option>
//                         </select>
//                       </div>
//                       <div>
//                         <label style={labelStyle}>Stream *</label>
//                         <select
//                           name="stream"
//                           value={formData.stream}
//                           onChange={handleInputChange}
//                           style={inputStyle}
//                         >
//                           <option value="">Select Stream</option>
//                           <option>PCM</option>
//                           <option>PCB</option>
//                           <option>Commerce</option>
//                           <option>Arts</option>
//                         </select>
//                       </div>
//                       <div>
//                         <label style={labelStyle}>Previous Class % *</label>
//                         <input
//                           name="prevPercentage"
//                           value={formData.prevPercentage}
//                           onChange={handleInputChange}
//                           placeholder="e.g. 85%"
//                           style={inputStyle}
//                         />
//                       </div>
//                     </div>
//                     <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
//                       <button onClick={() => setEnrollStep(2)} style={backBtnStyle}>
//                         ← Back
//                       </button>
//                       <button
//                         onClick={() => {
//                           if (!formData.schoolName || !formData.board || !formData.presentClass || !formData.stream || !formData.prevPercentage) {
//                             alert("Please fill all academic details");
//                             return;
//                           }
//                           setEnrollStep(4);
//                         }}
//                         style={nextBtnStyle}
//                       >
//                         Next →
//                       </button>
//                     </div>
//                   </div>
//                 )}

//                 {/* ===== STEP 4: FEES ===== */}
//                 {enrollStep === 4 && (
//                   <div>
//                     <h3 style={{ color: "#34d399", marginBottom: "15px" }}>
//                       Step 4: Fees Details
//                     </h3>
//                     <div
//                       style={{
//                         background: "#2a2a3e", borderRadius: "10px",
//                         padding: "20px", marginBottom: "20px",
//                       }}
//                     >
//                       <div
//                         style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}
//                       >
//                         <div>
//                           <p style={{ color: "#888", fontSize: "12px", margin: "0 0 4px" }}>
//                             Course
//                           </p>
//                           <p style={{ color: "#fff", fontWeight: "600" }}>
//                             {selectedCourse?.title}
//                           </p>
//                         </div>
//                         <div>
//                           <p style={{ color: "#888", fontSize: "12px", margin: "0 0 4px" }}>
//                             Total Fees
//                           </p>
//                           <p
//                             style={{
//                               color: "#22c55e", fontWeight: "700", fontSize: "20px",
//                             }}
//                           >
//                             ₹ {selectedCourse?.price}
//                           </p>
//                         </div>
//                         {selectedCourse?.batch && (
//                           <div>
//                             <p style={{ color: "#888", fontSize: "12px", margin: "0 0 4px" }}>
//                               Batch
//                             </p>
//                             <p style={{ color: "#a78bfa" }}>{selectedCourse?.batch}</p>
//                           </div>
//                         )}
//                         {selectedCourse?.teacherName && (
//                           <div>
//                             <p style={{ color: "#888", fontSize: "12px", margin: "0 0 4px" }}>
//                               Teacher
//                             </p>
//                             <p style={{ color: "#60a5fa" }}>{selectedCourse?.teacherName}</p>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                     <div>
//                       <label
//                         style={{
//                           fontSize: "12px", color: "#888",
//                           display: "block", marginBottom: "8px",
//                         }}
//                       >
//                         Payment Mode *
//                       </label>
//                       <div style={{ display: "flex", gap: "15px" }}>
//                         {["online", "offline"].map((mode) => (
//                           <label
//                             key={mode}
//                             style={{
//                               display: "flex", alignItems: "center", gap: "8px",
//                               cursor: "pointer",
//                               background: formData.feesMode === mode ? "#6c63ff" : "#2a2a3e",
//                               padding: "12px 20px", borderRadius: "8px",
//                               flex: 1, justifyContent: "center",
//                             }}
//                           >
//                             <input
//                               type="radio"
//                               name="feesMode"
//                               value={mode}
//                               checked={formData.feesMode === mode}
//                               onChange={handleInputChange}
//                             />
//                             {mode === "online" ? "💳 Online" : "💵 Offline"}
//                           </label>
//                         ))}
//                       </div>
//                     </div>
//                     <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
//                       <button onClick={() => setEnrollStep(3)} style={backBtnStyle}>
//                         ← Back
//                       </button>
//                       <button
//                         onClick={() => {
//                           if (!formData.feesMode) {
//                             alert("Please select payment mode");
//                             return;
//                           }
//                           setEnrollStep(5);
//                         }}
//                         style={nextBtnStyle}
//                       >
//                         Next →
//                       </button>
//                     </div>
//                   </div>
//                 )}

//                 {/* ===== STEP 5: CONFIRM & SUBMIT ===== */}
//                 {enrollStep === 5 && (
//                   <div>
//                     <h3 style={{ color: "#f43f5e", marginBottom: "15px" }}>
//                       Step 5: Confirm & Submit
//                     </h3>
//                     <div
//                       style={{
//                         background: "#2a2a3e", borderRadius: "10px",
//                         padding: "16px", marginBottom: "20px", fontSize: "13px",
//                       }}
//                     >
//                       <p
//                         style={{
//                           color: "#a78bfa", fontWeight: "600", marginBottom: "10px",
//                         }}
//                       >
//                         📋 Summary
//                       </p>
//                       {[
//                         ["Course", selectedCourse?.title],
//                         ["Name", formData.studentName],
//                         ["Father", formData.fatherName],
//                         ["Gender", formData.gender],
//                         ["Mobile", formData.mobile],
//                         ["Email", formData.email],
//                         ["Class", formData.presentClass],
//                         ["Stream", formData.stream],
//                         ["Board", formData.board],
//                         ["Fees Mode", formData.feesMode],
//                       ].map(([k, v]) => (
//                         <div
//                           key={k}
//                           style={{
//                             display: "flex", justifyContent: "space-between",
//                             padding: "5px 0", borderBottom: "1px solid #333",
//                           }}
//                         >
//                           <span style={{ color: "#888" }}>{k}</span>
//                           <span style={{ color: "#fff" }}>{v}</span>
//                         </div>
//                       ))}
//                     </div>
//                     <label
//                       style={{
//                         display: "flex", alignItems: "center", gap: "10px",
//                         cursor: "pointer", color: "#ccc", marginBottom: "20px",
//                       }}
//                     >
//                       <input
//                         type="checkbox"
//                         name="agreed"
//                         checked={formData.agreed}
//                         onChange={handleInputChange}
//                       />
//                       I confirm all details are correct and agree to the terms & conditions.
//                     </label>
//                     <div style={{ display: "flex", gap: "10px" }}>
//                       <button onClick={() => setEnrollStep(4)} style={backBtnStyle}>
//                         ← Back
//                       </button>
//                       <button
//                         onClick={handleEnrollSubmit}
//                         disabled={enrollLoading}
//                         style={{
//                           ...nextBtnStyle,
//                           background: enrollLoading ? "#555" : "#22c55e",
//                           flex: 1,
//                           opacity: enrollLoading ? 0.8 : 1,
//                         }}
//                       >
//                         {enrollLoading ? "⏳ Submitting..." : "✅ Submit Enrollment"}
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // ===== STYLES =====
// const labelStyle = { fontSize: "12px", color: "#888" };
// const inputStyle = {
//   width: "100%", padding: "10px 12px", background: "#2a2a3e",
//   border: "1px solid #444", borderRadius: "8px", color: "#fff",
//   fontSize: "13px", boxSizing: "border-box", marginTop: "4px",
// };
// const nextBtnStyle = {
//   background: "#6c63ff", color: "#fff", border: "none", borderRadius: "8px",
//   padding: "12px 24px", cursor: "pointer", fontWeight: "600",
//   fontSize: "14px", flex: 1, marginTop: "5px",
// };
// const backBtnStyle = {
//   background: "#374151", color: "#fff", border: "none", borderRadius: "8px",
//   padding: "12px 24px", cursor: "pointer", fontSize: "14px",
// };

// export default Dashboard;


import React, { useState, useRef, useEffect } from "react";
import "./styles/Dashboard.css";
import { useNavigate, useLocation } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();

  const urlParams = new URLSearchParams(location.search);
  const initialTab = urlParams.get("tab") || "dashboard";

  const [activeTab, setActiveTab] = useState(initialTab);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [courses, setCourses] = useState([]);
  const [messages, setMessages] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const [myResults, setMyResults] = useState([]);

  const [loadingCourses, setLoadingCourses] = useState(false);
  const [errorCourses, setErrorCourses] = useState("");

  // ===== ENROLLMENT FORM STATE =====
  const [showEnrollForm, setShowEnrollForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState([]);
  const [enrollStep, setEnrollStep] = useState(1);
  const [enrollLoading, setEnrollLoading] = useState(false);
  const [enrollSuccess, setEnrollSuccess] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [lastEnrollmentNumber, setLastEnrollmentNumber] = useState("");

  const [formData, setFormData] = useState({
    studentName: user?.name || "",
    fatherName: "",
    motherName: "",
    dob: "",
    aadharNo: "",
    gender: "",
    mobile: user?.mobilenumber || "",
    email: user?.email || "",
    fullAddress: "",
    city: "",
    district: "",
    state: "",
    pinCode: "",
    schoolName: "",
    board: "",
    presentClass: "",
    stream: "",
    prevPercentage: "",
    feesMode: "",
    agreed: false,
  });

  const authHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  // ===== FETCH COURSES =====
  const fetchCourses = async () => {
    setLoadingCourses(true);
    setErrorCourses("");
    try {
      const res = await fetch(`${BASE_URL}/api/courses/public`, { headers: authHeaders });
      const data = await res.json();
      setCourses(Array.isArray(data) ? data : []);
    } catch {
      setErrorCourses("Could not load courses. Please try again.");
    } finally {
      setLoadingCourses(false);
    }
  };

  // ===== FETCH ENROLLED COURSES =====
  const fetchEnrolledCourses = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/enrollments/student/${user?.id}`, {
        headers: authHeaders,
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setEnrolledCourseIds(data.map((e) => e.course));
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ===== FETCH MESSAGES =====
  const fetchMessages = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/notifications/all`, { headers: authHeaders });
      const data = await res.json();
      setMessages(data.data || []);
    } catch {}
  };

  // ===== FETCH PDFS =====
  const fetchPdfs = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/pdfs/public`);
      const data = await res.json();
      setPdfs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log("PDF fetch error:", err);
      setPdfs([]);
    }
  };

  // ===== FETCH MY RESULTS =====
  const fetchMyResults = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/results/my/${user?.id}`, {
        headers: authHeaders,
      });
      const data = await res.json();
      setMyResults(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log("Results fetch error:", err);
      setMyResults([]);
    }
  };

  useEffect(() => {
    if (activeTab === "courses") {
      fetchCourses();
      fetchEnrolledCourses();
    }
    if (activeTab === "messages") fetchMessages();
    if (activeTab === "pdfs") fetchPdfs();
    if (activeTab === "results") fetchMyResults();
  }, [activeTab]);

  // ===== Pending enroll course auto-open (from Courses page "Enroll Now") =====
  useEffect(() => {
    const pendingCourseId = localStorage.getItem("pendingEnrollCourse");
    if (pendingCourseId && courses.length > 0) {
      const course = courses.find((c) => c._id === pendingCourseId);
      if (course) {
        localStorage.removeItem("pendingEnrollCourse");
        openEnrollForm(course);
      }
    }
  }, [courses]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ===== Close mobile sidebar on tab change =====
  useEffect(() => {
    setSidebarOpen(false);
  }, [activeTab]);

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

  const formatDateTime = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })} • ${date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true })}`;
  };

  const isEnrolled = (courseId) => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    return (
      enrolledCourseIds.includes(courseId) ||
      currentUser?.enrolledCourse === courseId
    );
  };

  // ===== OPEN ENROLLMENT FORM =====
  const openEnrollForm = (course) => {
    setSelectedCourse(course);
    setEnrollStep(1);
    setEnrollSuccess(false);
    setEnrollLoading(false);
    setFormData({
      studentName: user?.name || "",
      fatherName: "",
      motherName: "",
      dob: "",
      aadharNo: "",
      gender: "",
      mobile: user?.mobilenumber?.toString() || "",
      email: user?.email || "",
      fullAddress: "",
      city: "",
      district: "",
      state: "",
      pinCode: "",
      schoolName: "",
      board: "",
      presentClass: "",
      stream: "",
      prevPercentage: "",
      feesMode: "",
      agreed: false,
    });
    setPhotoFile(null);
    setShowEnrollForm(true);
  };

  // ===== SUBMIT ENROLLMENT =====
  const handleEnrollSubmit = async () => {
    if (!formData.agreed) {
      alert("Please accept the terms and conditions");
      return;
    }

    setEnrollLoading(true);

    try {
      const fd = new FormData();
      fd.append("studentId", user?.id);
      fd.append("courseId", selectedCourse._id);
      fd.append("courseName", selectedCourse.title);

      Object.keys(formData).forEach((key) => {
        if (key !== "agreed") fd.append(key, formData[key]);
      });

      if (photoFile) fd.append("photo", photoFile);

      const res = await fetch(`${BASE_URL}/api/enrollments`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Enrollment failed");
      }

      const updatedUser = {
        ...user,
        isEnrolled: true,
        enrolledCourse: selectedCourse._id,
        enrolledCourseName: selectedCourse.title,
        enrollmentNumber: data.enrollmentNumber || "",
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setEnrolledCourseIds((prev) => [...prev, selectedCourse._id]);
      setLastEnrollmentNumber(data.enrollmentNumber || "");

      setEnrollSuccess(true);
    } catch (error) {
      console.log("Enrollment error:", error);
      alert("Enrollment failed: " + error.message);
    } finally {
      setEnrollLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ===== TABS =====
  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: "🏠" },
    { id: "courses", label: "Courses", icon: "📚" },
    { id: "results", label: "Results", icon: "📊" },
    { id: "messages", label: "Messages", icon: "💬" },
    { id: "pdfs", label: "Study Material", icon: "📄" },
  ];

  // ===== RENDER: DASHBOARD HOME =====
  const renderDashboard = () => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    return (
      <div className="dash-home">
        <div className="dash-welcome-banner">
          <div>
            <h2>Welcome back, {user?.name?.split(" ")[0]} 👋</h2>
            <p>Here's a quick overview of your learning journey at Climax Academy.</p>
          </div>
          {currentUser?.enrollmentNumber && (
            <div className="dash-enrollment-chip">
              <span>Enrollment No.</span>
              <strong>{currentUser.enrollmentNumber}</strong>
            </div>
          )}
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">{currentUser?.isEnrolled ? "✅" : "⏳"}</div>
            <p className="stat-label">Enrollment Status</p>
            <h3 className={currentUser?.isEnrolled ? "stat-value green" : "stat-value orange"}>
              {currentUser?.isEnrolled ? "Enrolled" : "Not Enrolled"}
            </h3>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📚</div>
            <p className="stat-label">Enrolled Course</p>
            <h3 className="stat-value">{currentUser?.enrolledCourseName || "—"}</h3>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <p className="stat-label">Results Published</p>
            <h3 className="stat-value">{myResults.length}</h3>
          </div>

          <div className="stat-card">
            <div className="stat-icon">💬</div>
            <p className="stat-label">New Messages</p>
            <h3 className="stat-value">{messages.length}</h3>
          </div>
        </div>

        {!currentUser?.isEnrolled && (
          <div className="dash-cta-card">
            <div>
              <h3>You're not enrolled in any course yet</h3>
              <p>Browse our available courses and start your learning journey today.</p>
            </div>
            <button className="dash-cta-btn" onClick={() => setActiveTab("courses")}>
              Browse Courses →
            </button>
          </div>
        )}
      </div>
    );
  };

  // ===== RENDER: COURSES =====
  const renderCourses = () => (
    <div className="section">
      <div className="section-header-row">
        <h2>Available Courses</h2>
      </div>
      {loadingCourses && <p className="loading-text">Loading courses...</p>}
      {errorCourses && <p className="error-text">❌ {errorCourses}</p>}
      {!loadingCourses && !errorCourses && courses.length === 0 && (
        <p className="empty-text">No published courses available right now.</p>
      )}
      {!loadingCourses && courses.length > 0 && (
        <div className="course-grid">
          {courses.map((course) => {
            const enrolled = isEnrolled(course._id);
            return (
              <div className="course-card-full" key={course._id}>
                <div className="course-badge">Published</div>
                <h3>{course.title}</h3>
                <div className="course-meta">
                  <span>⏱ {course.timing}</span>
                  <span>💰 ₹{course.price}</span>
                </div>
                {course.batch && <p className="course-extra-info purple">📅 Batch: {course.batch}</p>}
                {course.className && <p className="course-extra-info blue">🎓 Class: {course.className}</p>}
                {course.teacherName && <p className="course-extra-info green">👨‍🏫 Teacher: {course.teacherName}</p>}
                <p className="course-date">Added: {formatDate(course.createdAt)}</p>
                {enrolled ? (
                  <div className="course-enrolled-badge">✅ Enrolled</div>
                ) : (
                  <button className="enroll-btn" onClick={() => openEnrollForm(course)}>
                    Enroll Now
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  // ===== RENDER: RESULTS =====
  const renderResults = () => {
    const getTestIcon = (type) => {
      if (type === "Marathon Test") return "🏃";
      if (type === "Weekly Test") return "📅";
      if (type === "Quiz Test") return "❓";
      return "📝";
    };
    const getGradeColor = (percentage) => {
      if (percentage >= 90) return "#22c55e";
      if (percentage >= 75) return "#3b82f6";
      if (percentage >= 50) return "#f59e0b";
      return "#ef4444";
    };
    const currentUser = JSON.parse(localStorage.getItem("user"));

    return (
      <div className="section">
        <h2>My Results</h2>

        {currentUser?.enrollmentNumber && (
          <div className="result-enrollment-banner">
            <div>
              <p>Your Enrollment Number</p>
              <h3>{currentUser.enrollmentNumber}</h3>
            </div>
            <div className="result-enrollment-icon">🎓</div>
          </div>
        )}

        {myResults.length === 0 ? (
          <p className="empty-text">No results have been published yet.</p>
        ) : (
          <div className="results-list">
            {myResults.map((r) => (
              <div className="result-card" key={r._id}>
                <div className="result-card-top">
                  <div>
                    <span className="result-type-pill">
                      {getTestIcon(r.testType)} {r.testType}
                    </span>
                    <h3>{r.testName}</h3>
                  </div>
                  <p
                    className="result-percentage"
                    style={{ color: getGradeColor(r.percentage) }}
                  >
                    {r.percentage}%
                  </p>
                </div>

                <div className="result-marks-row">
                  <span>Marks Obtained</span>
                  <strong>
                    {r.marksObtained} / {r.totalMarks}
                  </strong>
                </div>

                <p className="result-date">📅 {formatDate(r.date)}</p>

                {r.remarks && <p className="result-remarks">💬 {r.remarks}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // ===== RENDER: MESSAGES (paragraph formatting fix) ===== 
  const renderMessages = () => (
    <div className="section">
      <h2>Messages from Admin</h2>
      {messages.length === 0 ? (
        <p className="empty-text">No messages yet.</p>
      ) : (
        <div className="message-list">
          {messages.map((msg) => (
            <div className="message-card" key={msg._id}>
              <div className="message-header">
                <h4>📢 {msg.subject}</h4>
                <span className="message-date">{formatDateTime(msg.createdAt)}</span>
              </div>
              {/* ✅ white-space pre-line preserves line breaks exactly as admin typed them */}
              <p className="message-body">{msg.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // ===== RENDER: PDFS / STUDY MATERIAL =====
  const renderPdfs = () => (
    <div className="section">
      <h2>Study Material</h2>
      {pdfs.length === 0 ? (
        <p className="empty-text">No study materials uploaded yet.</p>
      ) : (
        <div className="pdf-grid">
          {pdfs.map((pdf) => (
            <div className="pdf-card" key={pdf._id}>
              <div className="pdf-icon">📄</div>
              <div className="pdf-info">
                <h4>{pdf.title}</h4>
                <p>Course: {pdf.course || "General"}</p>
              </div>
              <a
                href={pdf.pdf}
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
      case "courses": return renderCourses();
      case "results": return renderResults();
      case "messages": return renderMessages();
      case "pdfs": return renderPdfs();
      default: return renderDashboard();
    }
  };

  const stepLabels = ["Personal", "Address", "Academic", "Fees", "Submit"];

  return (
    <div className="dashboard-container">
      {/* MOBILE TOP BAR */}
      <div className="dash-mobile-topbar">
        <button className="dash-hamburger" onClick={() => setSidebarOpen(true)}>
          ☰
        </button>
        <span className="dash-mobile-logo">Climax Academy</span>
        <img
          src={`https://ui-avatars.com/api/?name=${user?.name}&background=0a1f44&color=fff`}
          alt="profile"
          className="dash-mobile-avatar"
          onClick={() => setDropdownOpen((p) => !p)}
        />
      </div>

      {/* SIDEBAR OVERLAY (mobile) */}
      {sidebarOpen && (
        <div className="dash-sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* SIDEBAR */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2 className="logo">Climax Academy</h2>
          <button className="sidebar-close" onClick={() => setSidebarOpen(false)}>
            ✖
          </button>
        </div>
        <ul>
          {tabs.map((tab) => (
            <li
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={activeTab === tab.id ? "active" : ""}
            >
              <span className="tab-icon">{tab.icon}</span> {tab.label}
            </li>
          ))}
        </ul>
        <div className="sidebar-footer">
          <button className="sidebar-logout-btn" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="main-content">
        {/* DESKTOP HEADER */}
        <div className="header desktop-only">
          <h1>{tabs.find((t) => t.id === activeTab)?.label || "Dashboard"}</h1>
          <div className="profile-wrapper" ref={dropdownRef}>
            <img
              src={`https://ui-avatars.com/api/?name=${user?.name}&background=0a1f44&color=fff`}
              alt="profile"
              className="profile-avatar"
              onClick={() => setDropdownOpen((prev) => !prev)}
            />
            {dropdownOpen && (
              <div className="profile-dropdown" onMouseLeave={() => setDropdownOpen(false)}>
                <p className="dropdown-name">{user?.name}</p>
                <p className="dropdown-email">{user?.email}</p>
                <hr />
                <button className="dropdown-item logout" onClick={handleLogout}>
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* MOBILE PROFILE DROPDOWN */}
        {dropdownOpen && (
          <div className="mobile-profile-dropdown" ref={dropdownRef}>
            <p className="dropdown-name">{user?.name}</p>
            <p className="dropdown-email">{user?.email}</p>
            <hr />
            <button className="dropdown-item logout" onClick={handleLogout}>
              🚪 Logout
            </button>
          </div>
        )}

        {renderContent()}
      </div>

      {/* ===== ENROLLMENT FORM MODAL ===== */}
      {showEnrollForm && (
        <div className="enroll-modal-overlay">
          <div className="enroll-modal">
            {!enrollSuccess && !enrollLoading && (
              <button onClick={() => setShowEnrollForm(false)} className="enroll-modal-close">
                ✖
              </button>
            )}

            <h2 className="enroll-modal-title">🎓 Enrollment Form</h2>
            <p className="enroll-modal-subtitle">
              Course: <strong>{selectedCourse?.title}</strong>
            </p>

            {enrollSuccess ? (
              <div className="enroll-success-box">
                <div className="enroll-success-icon">🎉</div>
                <h2>Enrollment Confirmed!</h2>
                <p>You are successfully enrolled in:</p>
                <p className="enroll-success-course">{selectedCourse?.title}</p>

                {lastEnrollmentNumber && (
                  <div className="enroll-number-box">
                    <p>Your Enrollment Number</p>
                    <h3>{lastEnrollmentNumber}</h3>
                  </div>
                )}

                <div className="enroll-success-summary">
                  {[
                    ["Name", formData.studentName],
                    ["Email", formData.email],
                    ["Mobile", formData.mobile],
                    [
                      "Fees Mode",
                      formData.feesMode === "online" ? "💳 Online" : "💵 Offline",
                    ],
                  ].map(([k, v]) => (
                    <div className="enroll-summary-row" key={k}>
                      <span>{k}</span>
                      <span>{v}</span>
                    </div>
                  ))}
                </div>

                <p className="enroll-email-note">
                  📧 Confirmation email being sent to: <strong>{formData.email}</strong>
                </p>

                <button
                  className="enroll-done-btn"
                  onClick={() => {
                    setShowEnrollForm(false);
                    setEnrollSuccess(false);
                    setActiveTab("dashboard");
                  }}
                >
                  ✅ Done
                </button>
              </div>
            ) : (
              <>
                {/* STEP INDICATOR */}
                <div className="enroll-step-indicator">
                  {stepLabels.map((label, i) => (
                    <div
                      key={i}
                      className={`enroll-step-pill ${
                        enrollStep === i + 1
                          ? "current"
                          : enrollStep > i + 1
                          ? "done"
                          : ""
                      }`}
                    >
                      {enrollStep > i + 1 ? "✓" : i + 1}
                      <span className="step-pill-label">{label}</span>
                    </div>
                  ))}
                </div>

                {/* STEP 1: PERSONAL */}
                {enrollStep === 1 && (
                  <div className="enroll-step-body">
                    <h3 className="step-title purple">Step 1: Personal Details</h3>
                    <div className="enroll-form-grid">
                      <div className="enroll-field">
                        <label>Student Name</label>
                        <input value={formData.studentName} readOnly className="readonly-input" />
                      </div>
                      <div className="enroll-field">
                        <label>Father's Name *</label>
                        <input
                          name="fatherName"
                          value={formData.fatherName}
                          onChange={handleInputChange}
                          placeholder="Father's Name"
                        />
                      </div>
                      <div className="enroll-field">
                        <label>Mother's Name *</label>
                        <input
                          name="motherName"
                          value={formData.motherName}
                          onChange={handleInputChange}
                          placeholder="Mother's Name"
                        />
                      </div>
                      <div className="enroll-field">
                        <label>Date of Birth *</label>
                        <input
                          type="date"
                          name="dob"
                          value={formData.dob}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="enroll-field">
                        <label>Aadhar Card No. *</label>
                        <input
                          name="aadharNo"
                          value={formData.aadharNo}
                          onChange={handleInputChange}
                          placeholder="XXXX XXXX XXXX"
                          maxLength={14}
                        />
                      </div>
                      <div className="enroll-field">
                        <label>Gender *</label>
                        <select name="gender" value={formData.gender} onChange={handleInputChange}>
                          <option value="">Select Gender</option>
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div className="enroll-field">
                        <label>Mobile Number</label>
                        <input value={formData.mobile} readOnly className="readonly-input" />
                      </div>
                      <div className="enroll-field">
                        <label>Email ID</label>
                        <input value={formData.email} readOnly className="readonly-input" />
                      </div>
                      <div className="enroll-field full-width">
                        <label>Passport Size Photo</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setPhotoFile(e.target.files[0])}
                          className="file-input"
                        />
                      </div>
                    </div>
                    <button
                      className="enroll-next-btn"
                      onClick={() => {
                        if (
                          !formData.fatherName ||
                          !formData.motherName ||
                          !formData.dob ||
                          !formData.aadharNo ||
                          !formData.gender
                        ) {
                          alert("Please fill all required fields");
                          return;
                        }
                        setEnrollStep(2);
                      }}
                    >
                      Next →
                    </button>
                  </div>
                )}

                {/* STEP 2: ADDRESS */}
                {enrollStep === 2 && (
                  <div className="enroll-step-body">
                    <h3 className="step-title orange">Step 2: Address Details</h3>
                    <div className="enroll-form-grid">
                      <div className="enroll-field full-width">
                        <label>Full Address *</label>
                        <textarea
                          name="fullAddress"
                          value={formData.fullAddress}
                          onChange={handleInputChange}
                          placeholder="House No., Street, Area..."
                          rows={2}
                        />
                      </div>
                      {[
                        ["city", "City / Village *", "City or Village"],
                        ["district", "District *", "District"],
                        ["state", "State *", "State"],
                        ["pinCode", "PIN Code *", "000000"],
                      ].map(([name, label, placeholder]) => (
                        <div className="enroll-field" key={name}>
                          <label>{label}</label>
                          <input
                            name={name}
                            value={formData[name]}
                            onChange={handleInputChange}
                            placeholder={placeholder}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="enroll-btn-row">
                      <button className="enroll-back-btn" onClick={() => setEnrollStep(1)}>
                        ← Back
                      </button>
                      <button
                        className="enroll-next-btn"
                        onClick={() => {
                          if (
                            !formData.fullAddress ||
                            !formData.city ||
                            !formData.district ||
                            !formData.state ||
                            !formData.pinCode
                          ) {
                            alert("Please fill all address fields");
                            return;
                          }
                          setEnrollStep(3);
                        }}
                      >
                        Next →
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: ACADEMIC */}
                {enrollStep === 3 && (
                  <div className="enroll-step-body">
                    <h3 className="step-title blue">Step 3: Academic Details</h3>
                    <div className="enroll-form-grid">
                      <div className="enroll-field full-width">
                        <label>School Name *</label>
                        <input
                          name="schoolName"
                          value={formData.schoolName}
                          onChange={handleInputChange}
                          placeholder="School Name"
                        />
                      </div>
                      <div className="enroll-field">
                        <label>Board *</label>
                        <select name="board" value={formData.board} onChange={handleInputChange}>
                          <option value="">Select Board</option>
                          <option>CBSE</option>
                          <option>MP Board</option>
                          <option>UP Board</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div className="enroll-field">
                        <label>Present Class *</label>
                        <select
                          name="presentClass"
                          value={formData.presentClass}
                          onChange={handleInputChange}
                        >
                          <option value="">Select Class</option>
                          <option>9th</option>
                          <option>10th</option>
                          <option>11th</option>
                          <option>12th</option>
                        </select>
                      </div>
                      <div className="enroll-field">
                        <label>Stream *</label>
                        <select name="stream" value={formData.stream} onChange={handleInputChange}>
                          <option value="">Select Stream</option>
                          <option>PCM</option>
                          <option>PCB</option>
                          <option>Commerce</option>
                          <option>Arts</option>
                        </select>
                      </div>
                      <div className="enroll-field">
                        <label>Previous Class % *</label>
                        <input
                          name="prevPercentage"
                          value={formData.prevPercentage}
                          onChange={handleInputChange}
                          placeholder="e.g. 85%"
                        />
                      </div>
                    </div>
                    <div className="enroll-btn-row">
                      <button className="enroll-back-btn" onClick={() => setEnrollStep(2)}>
                        ← Back
                      </button>
                      <button
                        className="enroll-next-btn"
                        onClick={() => {
                          if (
                            !formData.schoolName ||
                            !formData.board ||
                            !formData.presentClass ||
                            !formData.stream ||
                            !formData.prevPercentage
                          ) {
                            alert("Please fill all academic details");
                            return;
                          }
                          setEnrollStep(4);
                        }}
                      >
                        Next →
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 4: FEES */}
                {enrollStep === 4 && (
                  <div className="enroll-step-body">
                    <h3 className="step-title green">Step 4: Fees Details</h3>
                    <div className="enroll-fees-summary">
                      <div className="enroll-fees-grid">
                        <div>
                          <p>Course</p>
                          <strong>{selectedCourse?.title}</strong>
                        </div>
                        <div>
                          <p>Total Fees</p>
                          <strong className="fees-amount">₹ {selectedCourse?.price}</strong>
                        </div>
                        {selectedCourse?.batch && (
                          <div>
                            <p>Batch</p>
                            <strong className="purple-text">{selectedCourse?.batch}</strong>
                          </div>
                        )}
                        {selectedCourse?.teacherName && (
                          <div>
                            <p>Teacher</p>
                            <strong className="blue-text">{selectedCourse?.teacherName}</strong>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="enroll-payment-mode">
                      <label>Payment Mode *</label>
                      <div className="payment-mode-options">
                        {["online", "offline"].map((mode) => (
                          <label
                            key={mode}
                            className={`payment-mode-option ${
                              formData.feesMode === mode ? "selected" : ""
                            }`}
                          >
                            <input
                              type="radio"
                              name="feesMode"
                              value={mode}
                              checked={formData.feesMode === mode}
                              onChange={handleInputChange}
                            />
                            {mode === "online" ? "💳 Online" : "💵 Offline"}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="enroll-btn-row">
                      <button className="enroll-back-btn" onClick={() => setEnrollStep(3)}>
                        ← Back
                      </button>
                      <button
                        className="enroll-next-btn"
                        onClick={() => {
                          if (!formData.feesMode) {
                            alert("Please select payment mode");
                            return;
                          }
                          setEnrollStep(5);
                        }}
                      >
                        Next →
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 5: CONFIRM & SUBMIT */}
                {enrollStep === 5 && (
                  <div className="enroll-step-body">
                    <h3 className="step-title red">Step 5: Confirm & Submit</h3>
                    <div className="enroll-confirm-summary">
                      <p className="confirm-summary-heading">📋 Summary</p>
                      {[
                        ["Course", selectedCourse?.title],
                        ["Name", formData.studentName],
                        ["Father", formData.fatherName],
                        ["Gender", formData.gender],
                        ["Mobile", formData.mobile],
                        ["Email", formData.email],
                        ["Class", formData.presentClass],
                        ["Stream", formData.stream],
                        ["Board", formData.board],
                        ["Fees Mode", formData.feesMode],
                      ].map(([k, v]) => (
                        <div className="confirm-summary-row" key={k}>
                          <span>{k}</span>
                          <span>{v}</span>
                        </div>
                      ))}
                    </div>
                    <label className="enroll-agree-checkbox">
                      <input
                        type="checkbox"
                        name="agreed"
                        checked={formData.agreed}
                        onChange={handleInputChange}
                      />
                      I confirm all details are correct and agree to the terms & conditions.
                    </label>
                    <div className="enroll-btn-row">
                      <button className="enroll-back-btn" onClick={() => setEnrollStep(4)}>
                        ← Back
                      </button>
                      <button
                        className="enroll-submit-btn"
                        onClick={handleEnrollSubmit}
                        disabled={enrollLoading}
                      >
                        {enrollLoading ? "Submitting..." : "✅ Submit Enrollment"}
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;