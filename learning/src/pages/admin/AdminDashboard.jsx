// import React, { useEffect, useState } from "react";
// import "../../styles/AdminDashboard.css";
// import axios from "axios";

// const AdminDashboard = () => {
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const [courses, setCourses] = useState([]);
//   const [users, setUsers] = useState([]);

//   const admin = JSON.parse(localStorage.getItem("user"));

//   const [newCourse, setNewCourse] = useState({
//     title: "",
//     category: "",
//     teacher: "",
//     status: "draft"
//   });

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     window.location.href = "/";
//   };

//   useEffect(() => {
//     fetchCourses();
//     fetchUsers();
//   }, []);

//   const fetchCourses = async () => {
//     const res = await axios.get("http://localhost:5000/api/courses");
//     setCourses(res.data);
//   };

//   const fetchUsers = async () => {
//     const res = await axios.get("http://localhost:5000/api/admin/users");
//     setUsers(res.data);
//   };

//   const createCourse = async () => {
//     await axios.post("http://localhost:5000/api/courses", newCourse);
//     fetchCourses();
//   };

//   return (
//     <div className="admin-container">

//       {/* SIDEBAR */}
//       <div className="sidebar">
//         <h2>Climax Academy</h2>
//         <ul>
//           <li onClick={() => setActiveTab("dashboard")}>Dashboard</li>
//           <li onClick={() => setActiveTab("students")}>All Students</li>
//           <li onClick={() => setActiveTab("teacher")}>Teacher Assign</li>
//           <li onClick={() => setActiveTab("courses")}>Create Courses</li>
//           <li onClick={() => setActiveTab("quiz")}>Create Quiz</li>
//           <li onClick={() => setActiveTab("pdf")}>Upload PDF</li>
//           <li onClick={() => setActiveTab("live")}>Live Classes</li>
//           <li onClick={() => setActiveTab("notify")}>Send Notification</li>
//           <li onClick={()=> setActiveTab("result")}>Result</li>
//         </ul>
//       </div>

//       {/* MAIN */}
//       <div className="main">

//         {/* TOP BAR */}
//         <div className="top-bar">
//           <div className="admin-info">
//             <span>{admin?.name || "Admin"}</span>
//             <button onClick={handleLogout} className="logout-btn">
//               Logout
//             </button>
//           </div>
//         </div>

//         {/* DASHBOARD */}
//         {activeTab === "dashboard" && (
//   <>
//     <h2 className="dashboard-title">Dashboard Overview</h2>

//     <div className="dashboard-cards">

//       <div className="dash-card">
//         <h4>Total Students</h4>
//         <p>{users.length}</p>
//       </div>

//       <div className="dash-card">
//         <h4>Total Teachers</h4>
//         <p>10</p> {/* backend se baad me */}
//       </div>

//       <div className="dash-card">
//         <h4>Total Courses</h4>
//         <p>{courses.length}</p>
//       </div>

//       <div className="dash-card">
//         <h4>Total Quiz</h4>
//         <p>5</p>
//       </div>

//       <div className="dash-card">
//         <h4>Live Classes</h4>
//         <p>2</p>
//       </div>

//       <div className="dash-card">
//         <h4>Uploaded Pdf</h4>
//         <p>0</p>

//       </div>

//     </div>
//   </>
// )}

//         {/* STUDENTS */}
//         {activeTab === "students" && (
//           <>
//             <h2>All Students</h2>
//             {users.map((u) => (
//               <div className="card" key={u._id}>
//                 <p>{u.name}</p>
//                 <p>{u.email}</p>
//               </div>
//             ))}
//           </>
//         )}

//         {/* TEACHER ASSIGN */}
//         {activeTab === "teacher" && (
//           <>
//             <h2>Assign Teacher</h2>
//             <p>👉 Here you can assign teachers to courses (backend logic needed)</p>
//           </>
//         )}

//         {/* CREATE COURSE */}
//         {activeTab === "courses" && (
//           <>
//             <h2>Create Courses</h2>

//             <div className="form">
//               <input placeholder="Course Name"
//                 onChange={(e)=>setNewCourse({...newCourse, title:e.target.value})}/>

//               <input placeholder="Category"
//                 onChange={(e)=>setNewCourse({...newCourse, category:e.target.value})}/>

//               <input placeholder="Teacher"
//                 onChange={(e)=>setNewCourse({...newCourse, teacher:e.target.value})}/>

//               <select onChange={(e)=>setNewCourse({...newCourse, status:e.target.value})}>
//                 <option value="draft">Draft</option>
//                 <option value="published">Published</option>
//               </select>

//               <button onClick={createCourse}>Create</button>
//             </div>

//             {courses.map((c)=>(
//               <div className="card" key={c._id}>
//                 <h4>{c.title}</h4>
//                 <p>{c.category}</p>
//                 <p>{c.teacher}</p>
//                 <p>{c.status}</p>
//               </div>
//             ))}
//           </>
//         )}

//         {/* QUIZ */}
//         {activeTab === "quiz" && (
//           <>
//             <h2>Create Quiz</h2>
//             <p>👉 Add quiz creation logic here</p>
//           </>
//         )}

//         {/* PDF */}
//         {activeTab === "pdf" && (
//           <>
//             <h2>Upload PDF</h2>
//             <input type="file" />
//             <button>Upload</button>
//           </>
//         )}

//         {/* LIVE CLASS */}
//         {activeTab === "live" && (
//           <>
//             <h2>Live Classes</h2>
//             <p>👉 Integrate Zoom / Google Meet link here</p>
//           </>
//         )}

//         {/* NOTIFICATION */}
//         {activeTab === "notify" && (
//           <>
//             <h2>Send Notification</h2>
//             <textarea placeholder="Enter message"></textarea>
//             <button>Send</button>
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

  const admin = JSON.parse(localStorage.getItem("user"));

  const [newCourse, setNewCourse] = useState({
    title: "",
    category: "",
    teacher: "",
    status: "draft"
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  useEffect(() => {
    fetchCourses();
    fetchUsers();
  }, []);

  // ✅ COURSES
  const fetchCourses = async () => {
    const res = await axios.get("http://localhost:5000/api/courses");
    setCourses(res.data);
  };

  // ✅ ONLY STUDENTS
  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/student");
    setUsers(res.data);
  };

  const createCourse = async () => {
    await axios.post("http://localhost:5000/api/courses", newCourse);
    fetchCourses();
  };

  return (
    <div className="admin-container">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>Climax Academy</h2>
        <ul>
          <li onClick={() => setActiveTab("dashboard")}>Dashboard</li>
          <li onClick={() => setActiveTab("students")}>All Students</li>
          <li onClick={() => setActiveTab("teacher")}>Teacher Assign</li>
          <li onClick={() => setActiveTab("courses")}>Create Courses</li>
          <li onClick={() => setActiveTab("quiz")}>Create Quiz</li>
          <li onClick={() => setActiveTab("pdf")}>Upload PDF</li>
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
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>

        {/* DASHBOARD */}
        {activeTab === "dashboard" && (
          <>
            <h2 className="dashboard-title">Dashboard Overview</h2>

            <div className="dashboard-cards">

              <div className="dash-card">
                <h4>Total Students</h4>
                <p>{users.length}</p>
              </div>

              <div className="dash-card">
                <h4>Total Teachers</h4>
                <p>10</p>
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

        {/* ✅ STUDENTS (PRO UI) */}
        {activeTab === "students" && (
          <>
            <h2 className="section-title">All Students</h2>

            <div className="student-table">

              <div className="table-header">
                <span>Name</span>
                <span>Email</span>
              </div>

              {users.length === 0 ? (
                <p className="empty-text">No students found</p>
              ) : (
                users.map((u) => (
                  <div className="table-row" key={u._id}>
                    <span>{u.name}</span>
                    <span>{u.email}</span>
                  </div>
                ))
              )}

            </div>
          </>
        )}

        {/* CREATE COURSE */}
        {activeTab === "courses" && (
          <>
            <h2>Create Courses</h2>

            <div className="form">
              <input placeholder="Course Name"
                onChange={(e)=>setNewCourse({...newCourse, title:e.target.value})}/>

              <input placeholder="Category"
                onChange={(e)=>setNewCourse({...newCourse, category:e.target.value})}/>

              <input placeholder="Teacher"
                onChange={(e)=>setNewCourse({...newCourse, teacher:e.target.value})}/>

              <select onChange={(e)=>setNewCourse({...newCourse, status:e.target.value})}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>

              <button onClick={createCourse}>Create</button>
            </div>

            {courses.map((c)=>(
              <div className="card" key={c._id}>
                <h4>{c.title}</h4>
                <p>{c.category}</p>
                <p>{c.teacher}</p>
                <p>{c.status}</p>
              </div>
            ))}
          </>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;