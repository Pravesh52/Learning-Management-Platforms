// import React, { useEffect, useState } from "react";
// import "../../styles/AdminDashboard.css";
// import axios from "axios";

// const AdminDashboard = () => {

//   const [activeTab, setActiveTab] = useState("dashboard");

//   const [courses, setCourses] = useState([]);
//   const [users, setUsers] = useState([]);

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

//       const res = await axios.get(
//         "http://localhost:5000/api/courses"
//       );

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

//       const res = await axios.get(
//         "http://localhost:5000/api/admin/students",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log("USERS:", res.data);

//       setUsers(res.data);

//     } catch (error) {
//       console.log(error.response?.data || error.message);
//     }
//   };

//   // ================= CREATE COURSE =================
//   const createCourse = async () => {

//     if (
//       !newCourse.title ||
//       !newCourse.timing ||
//       !newCourse.price
//     ) {
//       alert("All fields are required");
//       return;
//     }

//     try {

//       // ✅ CREATE COURSE
//       await axios.post(
//         "http://localhost:5000/api/courses",
//         newCourse
//       );

//       // ✅ FETCH UPDATED COURSES
//       await fetchCourses();

//       // ✅ RESET FORM
//       setNewCourse({
//         title: "",
//         timing: "",
//         price: "",
//         status: "draft",
//       });

//     } catch (error) {
//       console.log(
//         error.response?.data || error.message
//       );
//     }
//   };

//   return (
//     <div className="admin-container">

//       {/* ================= SIDEBAR ================= */}
//       <div className="sidebar">

//         <h2>Climax Academy</h2>

//         <ul>

//           <li onClick={() => setActiveTab("dashboard")}>
//             Dashboard
//           </li>

//           <li onClick={() => setActiveTab("students")}>
//             All Students
//           </li>

//           <li onClick={() => setActiveTab("courses")}>
//             Create Courses
//           </li>

//           <li onClick={() => setActiveTab("quiz")}>
//             Create Quiz
//           </li>

//           <li onClick={() => setActiveTab("pdf")}>
//             Upload PDF
//           </li>

//           <li onClick={() => setActiveTab("live")}>
//             Live Classes
//           </li>

//           <li onClick={() => setActiveTab("notify")}>
//             Send Notification
//           </li>

//         </ul>

//       </div>

//       {/* ================= MAIN ================= */}
//       <div className="main">

//         {/* ================= TOP BAR ================= */}
//         <div className="top-bar">

//           <div className="admin-info">

//             <span>
//               {admin?.name || "Admin"}
//             </span>

//             <button
//               onClick={handleLogout}
//               className="logout-btn"
//             >
//               Logout
//             </button>

//           </div>

//         </div>

//         {/* ================= DASHBOARD ================= */}
//         {activeTab === "dashboard" && (
//           <>

//             <h2 className="dashboard-title">
//               Dashboard Overview
//             </h2>

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

//                         <td>
//                           {u.mobilenumber || "N/A"}
//                         </td>

//                         <td>
//                           {u.role}
//                         </td>

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
//                   setNewCourse({
//                     ...newCourse,
//                     title: e.target.value,
//                   })
//                 }
//               />

//               <input
//                 type="text"
//                 placeholder="Timing"
//                 value={newCourse.timing}
//                 onChange={(e) =>
//                   setNewCourse({
//                     ...newCourse,
//                     timing: e.target.value,
//                   })
//                 }
//               />

//               <input
//                 type="number"
//                 placeholder="Price"
//                 value={newCourse.price}
//                 onChange={(e) =>
//                   setNewCourse({
//                     ...newCourse,
//                     price: e.target.value,
//                   })
//                 }
//               />

//               <select
//                 value={newCourse.status}
//                 onChange={(e) =>
//                   setNewCourse({
//                     ...newCourse,
//                     status: e.target.value,
//                   })
//                 }
//               >

//                 <option value="draft">
//                   Draft
//                 </option>

//                 <option value="published">
//                   Published
//                 </option>

//               </select>

//               <button onClick={createCourse}>
//                 Create
//               </button>

//             </div>

//             {/* ================= COURSE GRID ================= */}
//             <div className="course-list">

//               {courses.length > 0 ? (

//                 courses.map((c) => (

//                   <div className="course-card" key={c._id}>

//                     <h4>{c.title}</h4>

//                     <p className="timing">
//                       ⏰ {c.timing}
//                     </p>

//                     <p className="price">
//                       ₹ {c.price}
//                     </p>

//                     <p className="status">
//                       Status : {c.status}
//                     </p>

//                     <button>
//                       Enroll Now
//                     </button>

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

  // ================= SENT TO UI TRACKER =================
  // Ye track karta hai ki kaunse courses UI pe bheje gaye hain
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
  }, []);

  // ================= FETCH COURSES =================
  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/courses");
      console.log("COURSES:", res.data);
      setCourses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= FETCH USERS =================
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/admin/students", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("USERS:", res.data);
      setUsers(res.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  // ================= CREATE COURSE =================
  const createCourse = async () => {
    if (!newCourse.title || !newCourse.timing || !newCourse.price) {
      alert("All fields are required");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/courses", newCourse);
      await fetchCourses();
      setNewCourse({
        title: "",
        timing: "",
        price: "",
        status: "draft",
      });
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  // ================= SEND TO UI =================
  // Ye function course ko Courses.jsx (public UI) pe bhejta hai
  const handleSendToUI = (course) => {
    const alreadySent = sentCourses.find((c) => c._id === course._id);

    if (alreadySent) {
      // Agar pehle se bheja hua hai toh remove karo (toggle)
      const updated = sentCourses.filter((c) => c._id !== course._id);
      setSentCourses(updated);
      localStorage.setItem("sentCourses", JSON.stringify(updated));
      alert(`"${course.title}" ko UI se hata diya gaya!`);
    } else {
      // Naya course UI pe bhejo
      const updated = [...sentCourses, course];
      setSentCourses(updated);
      localStorage.setItem("sentCourses", JSON.stringify(updated));
      alert(`"${course.title}" ab Courses page pe show hoga!`);
    }
  };

  // ================= CHECK IF SENT =================
  const isSentToUI = (courseId) => {
    return sentCourses.some((c) => c._id === courseId);
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
          <li onClick={() => setActiveTab("quiz")}>Create Quiz</li>
          <li onClick={() => setActiveTab("pdf")}>Upload PDF</li>
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
                <h4>Total Quiz</h4>
                <p>5</p>
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

            {/* ================= FORM ================= */}
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

            {/* ================= COURSE GRID ================= */}
            <div className="course-list">
              {courses.length > 0 ? (
                courses.map((c) => (
                  <div className="course-card" key={c._id}>

                    <h4>{c.title}</h4>

                    <p className="timing">⏰ {c.timing}</p>

                    <p className="price">₹ {c.price}</p>

                    <p className="status">Status : {c.status}</p>

                    {/* 
                      ✅ MAIN LOGIC:
                      - Agar course "published" hai → "Send to UI" button dikhao
                      - Agar course "draft" hai → koi button nahi (ya disabled)
                    */}
                    {c.status === "published" ? (
                      <button
                        onClick={() => handleSendToUI(c)}
                        style={{
                          backgroundColor: isSentToUI(c._id) ? "#e74c3c" : "#27ae60",
                          color: "white",
                          border: "none",
                          padding: "8px 14px",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontWeight: "bold",
                          transition: "background-color 0.3s",
                        }}
                      >
                        {isSentToUI(c._id) ? "✓ Sent (Remove)" : "Send to UI"}
                      </button>
                    ) : (
                      <button
                        disabled
                        style={{
                          backgroundColor: "#bdc3c7",
                          color: "#7f8c8d",
                          border: "none",
                          padding: "8px 14px",
                          borderRadius: "6px",
                          cursor: "not-allowed",
                          fontWeight: "bold",
                        }}
                      >
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

      </div>

    </div>
  );
};

export default AdminDashboard;