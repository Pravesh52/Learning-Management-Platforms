// import React, { useEffect, useState } from "react";
// import "../../styles/AdminDashboard.css";
// import axios from "axios";

// const AdminDashboard = () => {

//   const [activeTab, setActiveTab] = useState("dashboard");

//   const [courses, setCourses] = useState([]);
//   const [users, setUsers] = useState([]);

//   // ================= SENT TO UI TRACKER =================
//   // Ye track karta hai ki kaunse courses UI pe bheje gaye hain
//   const [sentCourses, setSentCourses] = useState(() => {
//     const saved = localStorage.getItem("sentCourses");
//     return saved ? JSON.parse(saved) : [];
//   });

//   const admin = JSON.parse(localStorage.getItem("user"));

//   // ================= NEW COURSE =================
//   const [newCourse, setNewCourse] = useState({
//     title: "",
//     timing: "",
//     price: "",
//     status: "draft",
//   });

//   // ================= LOGOUT =================
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     window.location.href = "/";
//   };

//   // ================= USE EFFECT =================
//   useEffect(() => {
//     fetchCourses();
//     fetchUsers();
//   }, []);

//   // ================= FETCH COURSES =================
//   const fetchCourses = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/courses");
//       console.log("COURSES:", res.data);
//       setCourses(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // ================= FETCH USERS =================
//   const fetchUsers = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.get("http://localhost:5000/api/admin/students", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log("USERS:", res.data);
//       setUsers(res.data);
//     } catch (error) {
//       console.log(error.response?.data || error.message);
//     }
//   };

//   // ================= CREATE COURSE =================
//   const createCourse = async () => {
//     if (!newCourse.title || !newCourse.timing || !newCourse.price) {
//       alert("All fields are required");
//       return;
//     }

//     try {
//       await axios.post("http://localhost:5000/api/courses", newCourse);
//       await fetchCourses();
//       setNewCourse({
//         title: "",
//         timing: "",
//         price: "",
//         status: "draft",
//       });
//     } catch (error) {
//       console.log(error.response?.data || error.message);
//     }
//   };

//   // ================= SEND TO UI =================
//   // Ye function course ko Courses.jsx (public UI) pe bhejta hai
//   const handleSendToUI = (course) => {
//     const alreadySent = sentCourses.find((c) => c._id === course._id);

//     if (alreadySent) {
//       // Agar pehle se bheja hua hai toh remove karo (toggle)
//       const updated = sentCourses.filter((c) => c._id !== course._id);
//       setSentCourses(updated);
//       localStorage.setItem("sentCourses", JSON.stringify(updated));
//       alert(`"${course.title}" ko UI se hata diya gaya!`);
//     } else {
//       // Naya course UI pe bhejo
//       const updated = [...sentCourses, course];
//       setSentCourses(updated);
//       localStorage.setItem("sentCourses", JSON.stringify(updated));
//       alert(`"${course.title}" ab Courses page pe show hoga!`);
//     }
//   };

//   // ================= CHECK IF SENT =================
//   const isSentToUI = (courseId) => {
//     return sentCourses.some((c) => c._id === courseId);
//   };

//   return (
//     <div className="admin-container">

//       {/* ================= SIDEBAR ================= */}
//       <div className="sidebar">

//         <h2>Climax Academy</h2>

//         <ul>
//           <li onClick={() => setActiveTab("dashboard")}>Dashboard</li>
//           <li onClick={() => setActiveTab("students")}>All Students</li>
//           <li onClick={() => setActiveTab("courses")}>Create Courses</li>
//           <li onClick={() => setActiveTab("quiz")}>Create Quiz</li>
//           <li onClick={() => setActiveTab("pdf")}>Upload PDF</li>
//           <li onClick={() => setActiveTab("live")}>Live Classes</li>
//           <li onClick={() => setActiveTab("notify")}>Send Notification</li>
//         </ul>

//       </div>

//       {/* ================= MAIN ================= */}
//       <div className="main">

//         {/* ================= TOP BAR ================= */}
//         <div className="top-bar">
//           <div className="admin-info">
//             <span>{admin?.name || "Admin"}</span>
//             <button onClick={handleLogout} className="logout-btn">
//               Logout
//             </button>
//           </div>
//         </div>

//         {/* ================= DASHBOARD ================= */}
//         {activeTab === "dashboard" && (
//           <>
//             <h2 className="dashboard-title">Dashboard Overview</h2>
//             <div className="dashboard-cards">
//               <div className="dash-card">
//                 <h4>Total Students</h4>
//                 <p>{users.length}</p>
//               </div>
//               <div className="dash-card">
//                 <h4>Total Courses</h4>
//                 <p>{courses.length}</p>
//               </div>
//               <div className="dash-card">
//                 <h4>Total Quiz</h4>
//                 <p>5</p>
//               </div>
//               <div className="dash-card">
//                 <h4>Live Classes</h4>
//                 <p>2</p>
//               </div>
//             </div>
//           </>
//         )}

//         {/* ================= STUDENTS ================= */}
//         {activeTab === "students" && (
//           <>
//             <h2>All Students</h2>
//             <div className="student-table-wrapper">
//               {users.length > 0 ? (
//                 <table className="student-table">
//                   <thead>
//                     <tr>
//                       <th>#</th>
//                       <th>Name</th>
//                       <th>Email</th>
//                       <th>Mobile</th>
//                       <th>Role</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {users.map((u, index) => (
//                       <tr key={u._id}>
//                         <td>{index + 1}</td>
//                         <td>{u.name}</td>
//                         <td>{u.email}</td>
//                         <td>{u.mobilenumber || "N/A"}</td>
//                         <td>{u.role}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               ) : (
//                 <p>No students found</p>
//               )}
//             </div>
//           </>
//         )}

//         {/* ================= COURSES ================= */}
//         {activeTab === "courses" && (
//           <>
//             <h2>Create Courses</h2>

//             {/* ================= FORM ================= */}
//             <div className="form">
//               <input
//                 type="text"
//                 placeholder="Course Name"
//                 value={newCourse.title}
//                 onChange={(e) =>
//                   setNewCourse({ ...newCourse, title: e.target.value })
//                 }
//               />
//               <input
//                 type="text"
//                 placeholder="Timing"
//                 value={newCourse.timing}
//                 onChange={(e) =>
//                   setNewCourse({ ...newCourse, timing: e.target.value })
//                 }
//               />
//               <input
//                 type="number"
//                 placeholder="Price"
//                 value={newCourse.price}
//                 onChange={(e) =>
//                   setNewCourse({ ...newCourse, price: e.target.value })
//                 }
//               />
//               <select
//                 value={newCourse.status}
//                 onChange={(e) =>
//                   setNewCourse({ ...newCourse, status: e.target.value })
//                 }
//               >
//                 <option value="draft">Draft</option>
//                 <option value="published">Published</option>
//               </select>
//               <button onClick={createCourse}>Create</button>
//             </div>

//             {/* ================= COURSE GRID ================= */}
//             <div className="course-list">
//               {courses.length > 0 ? (
//                 courses.map((c) => (
//                   <div className="course-card" key={c._id}>

//                     <h4>{c.title}</h4>

//                     <p className="timing">⏰ {c.timing}</p>

//                     <p className="price">₹ {c.price}</p>

//                     <p className="status">Status : {c.status}</p>

//                     {/* 
//                       ✅ MAIN LOGIC:
//                       - Agar course "published" hai → "Send to UI" button dikhao
//                       - Agar course "draft" hai → koi button nahi (ya disabled)
//                     */}
//                     {c.status === "published" ? (
//                       <button
//                         onClick={() => handleSendToUI(c)}
//                         style={{
//                           backgroundColor: isSentToUI(c._id) ? "#e74c3c" : "#27ae60",
//                           color: "white",
//                           border: "none",
//                           padding: "8px 14px",
//                           borderRadius: "6px",
//                           cursor: "pointer",
//                           fontWeight: "bold",
//                           transition: "background-color 0.3s",
//                         }}
//                       >
//                         {isSentToUI(c._id) ? "✓ Sent (Remove)" : "Send to UI"}
//                       </button>
//                     ) : (
//                       <button
//                         disabled
//                         style={{
//                           backgroundColor: "#bdc3c7",
//                           color: "#7f8c8d",
//                           border: "none",
//                           padding: "8px 14px",
//                           borderRadius: "6px",
//                           cursor: "not-allowed",
//                           fontWeight: "bold",
//                         }}
//                       >
//                         Draft
//                       </button>
//                     )}

//                   </div>
//                 ))
//               ) : (
//                 <p>No Courses Found</p>
//               )}
//             </div>
//           </>
//         )}

//       </div>

//     </div>
//   );
// };

// export default AdminDashboard;


import React, { useEffect, useState } from "react";
import "../../styles/AdminDashboard.css";
import axios from "axios";

const AdminDashboard = () => {

  const [activeTab, setActiveTab] = useState("dashboard");

  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [pdfs, setPdfs] = useState([]);

  // ================= PDF STATES =================

  const [pdfTitle, setPdfTitle] = useState("");

  const [pdfFile, setPdfFile] = useState(null);

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

  // ================= FETCH COURSES =================

  const fetchCourses = async () => {
    try {

      const res = await axios.get(
        "http://localhost:5000/api/courses"
      );

      setCourses(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  // ================= FETCH USERS =================

  const fetchUsers = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/admin/students",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers(res.data);

    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  // ================= FETCH PDFS =================

  const fetchPDFs = async () => {
    try {

      const res = await axios.get(
        "http://localhost:5000/api/pdfs"
      );

      setPdfs(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  // ================= CREATE COURSE =================

  const createCourse = async () => {

    if (
      !newCourse.title ||
      !newCourse.timing ||
      !newCourse.price
    ) {
      alert("All fields are required");
      return;
    }

    try {

      await axios.post(
        "http://localhost:5000/api/courses",
        newCourse
      );

      await fetchCourses();

      setNewCourse({
        title: "",
        timing: "",
        price: "",
        status: "draft",
      });

    } catch (error) {
      console.log(
        error.response?.data || error.message
      );
    }
  };

  // ================= SEND TO UI =================

  const handleSendToUI = (course) => {

    const alreadySent = sentCourses.find(
      (c) => c._id === course._id
    );

    if (alreadySent) {

      const updated = sentCourses.filter(
        (c) => c._id !== course._id
      );

      setSentCourses(updated);

      localStorage.setItem(
        "sentCourses",
        JSON.stringify(updated)
      );

      alert(
        `"${course.title}" removed from UI`
      );

    } else {

      const updated = [...sentCourses, course];

      setSentCourses(updated);

      localStorage.setItem(
        "sentCourses",
        JSON.stringify(updated)
      );

      alert(
        `"${course.title}" sent to UI`
      );
    }
  };

  // ================= CHECK IF SENT =================

  const isSentToUI = (courseId) => {
    return sentCourses.some(
      (c) => c._id === courseId
    );
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

      const res = await axios.post(
        "http://localhost:5000/api/pdfs/upload",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      console.log(res.data);

      alert("PDF Uploaded Successfully");

      setPdfTitle("");

      setPdfFile(null);

      fetchPDFs();

    } catch (error) {
      console.log(
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="admin-container">

      {/* ================= SIDEBAR ================= */}

      <div className="sidebar">

        <h2>Climax Academy</h2>

        <ul>

          <li onClick={() => setActiveTab("dashboard")}>
            Dashboard
          </li>

          <li onClick={() => setActiveTab("students")}>
            All Students
          </li>

          <li onClick={() => setActiveTab("courses")}>
            Create Courses
          </li>

          <li onClick={() => setActiveTab("pdf")}>
            Upload PDF
          </li>

          <li onClick={() => setActiveTab("quiz")}>
            Create Quiz
          </li>

          <li onClick={() => setActiveTab("live")}>
            Live Classes
          </li>

          <li onClick={() => setActiveTab("notify")}>
            Send Notification
          </li>

        </ul>

      </div>

      {/* ================= MAIN ================= */}

      <div className="main">

        {/* ================= TOP BAR ================= */}

        <div className="top-bar">

          <div className="admin-info">

            <span>
              {admin?.name || "Admin"}
            </span>

            <button
              onClick={handleLogout}
              className="logout-btn"
            >
              Logout
            </button>

          </div>

        </div>

        {/* ================= DASHBOARD ================= */}

        {activeTab === "dashboard" && (

          <>
            <h2 className="dashboard-title">
              Dashboard Overview
            </h2>

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

                        <td>
                          {u.mobilenumber || "N/A"}
                        </td>

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
                  setNewCourse({
                    ...newCourse,
                    title: e.target.value,
                  })
                }
              />

              <input
                type="text"
                placeholder="Timing"
                value={newCourse.timing}
                onChange={(e) =>
                  setNewCourse({
                    ...newCourse,
                    timing: e.target.value,
                  })
                }
              />

              <input
                type="number"
                placeholder="Price"
                value={newCourse.price}
                onChange={(e) =>
                  setNewCourse({
                    ...newCourse,
                    price: e.target.value,
                  })
                }
              />

              <select
                value={newCourse.status}
                onChange={(e) =>
                  setNewCourse({
                    ...newCourse,
                    status: e.target.value,
                  })
                }
              >

                <option value="draft">
                  Draft
                </option>

                <option value="published">
                  Published
                </option>

              </select>

              <button onClick={createCourse}>
                Create
              </button>

            </div>

            <div className="course-list">

              {courses.length > 0 ? (

                courses.map((c) => (

                  <div
                    className="course-card"
                    key={c._id}
                  >

                    <h4>{c.title}</h4>

                    <p className="timing">
                      ⏰ {c.timing}
                    </p>

                    <p className="price">
                      ₹ {c.price}
                    </p>

                    <p className="status">
                      Status : {c.status}
                    </p>

                    {c.status === "published" ? (

                      <button
                        onClick={() =>
                          handleSendToUI(c)
                        }
                      >
                        {isSentToUI(c._id)
                          ? "✓ Sent (Remove)"
                          : "Send to UI"}
                      </button>

                    ) : (

                      <button disabled>
                        Draft
                      </button>

                    )}

                  </div>

                ))

              ) : (
                <p>No Courses Found</p>
              )}

            </div>
          </>
        )}

        {/* ================= PDF SECTION ================= */}

        {activeTab === "pdf" && (

          <>
            <h2>Upload PDF</h2>

            <div className="form">

              <input
                type="text"
                placeholder="PDF Title"
                value={pdfTitle}
                onChange={(e) =>
                  setPdfTitle(e.target.value)
                }
              />

              <input
                type="file"
                accept=".pdf"
                onChange={(e) =>
                  setPdfFile(e.target.files[0])
                }
              />

              <button onClick={uploadPDF}>
                Upload PDF
              </button>

            </div>

            {/* PDF LIST */}

            <div className="course-list">

              {pdfs.length > 0 ? (

                pdfs.map((pdf) => (

                  <div
                    className="course-card"
                    key={pdf._id}
                  >

                    <h3>{pdf.title}</h3>

                    <p>
                      Study Material PDF
                    </p>

                    <a
                      href={`http://localhost:5000/uploads/${pdf.file}`}
                      target="_blank"
                      rel="noreferrer"
                    >

                      <button>
                        View PDF
                      </button>

                    </a>

                  </div>

                ))

              ) : (

                <p>No PDFs Uploaded</p>

              )}

            </div>
          </>
        )}

      </div>

    </div>
  );
};

export default AdminDashboard;