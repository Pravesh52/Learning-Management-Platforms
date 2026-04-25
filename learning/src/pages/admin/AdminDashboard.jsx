import React, { useEffect, useState } from "react";
import "../../styles/AdminDashboard.css";
import axios from "axios";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from "recharts";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);

  const admin = JSON.parse(localStorage.getItem("user"));

  const [analytics, setAnalytics] = useState({
    userGrowth: [],
    coursePerformance: []
  });

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

  const combinedData = (analytics.userGrowth || []).map((item, index) => ({
    month: item.month,
    users: item.users,
    students: analytics.coursePerformance[index]?.students || 0
  }));

  // API CALLS
  useEffect(() => {
    fetchCourses();
    fetchUsers();
    fetchAnalytics();
  }, []);

  const fetchCourses = async () => {
    const res = await axios.get("http://localhost:5000/api/courses");
    setCourses(res.data);
  };

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/users");
    setUsers(res.data);
  };

  const fetchAnalytics = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/analytics");
    setAnalytics(res.data);
  };

  const createCourse = async () => {
    await axios.post("http://localhost:5000/api/courses", newCourse);
    fetchCourses();
  };

  const deleteCourse = async (id) => {
    await axios.delete(`http://localhost:5000/api/courses/${id}`);
    fetchCourses();
  };

  return (
    <div className="admin-container">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>SkillStack</h2>
        <ul>
          <li onClick={() => setActiveTab("dashboard")}>Dashboard</li>
          <li onClick={() => setActiveTab("courses")}>Courses</li>
          <li onClick={() => setActiveTab("quiz")}>Quiz</li>
          <li onClick={() => setActiveTab("content")}>Content</li>
          <li onClick={() => setActiveTab("students")}>Students</li>
        </ul>
      </div>

      {/* RIGHT SIDE (MAIN AREA) */}
      <div className="main">

        {/* ✅ TOP BAR INSIDE MAIN */}
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
            <h2>Overview</h2>

            <div className="card">Total Courses: {courses.length}</div>
            <div className="card">Total Students: {users.length}</div>

            <div className="graph-card">
              <h3>Analytics Overview</h3>

              <ResponsiveContainer width="100%" height={350}>
                <ComposedChart data={combinedData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />

                  <Line type="monotone" dataKey="users" stroke="#3b82f6" />
                  <Bar dataKey="students" fill="#22c55e" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {/* COURSES */}
        {activeTab === "courses" && (
          <>
            <h2>Course Management</h2>

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

              <button onClick={createCourse}>Create Course</button>
            </div>

            {courses.map((c)=>(
              <div className="card" key={c._id}>
                <h4>{c.title}</h4>
                <p>{c.category}</p>
                <p>{c.teacher}</p>
                <p>{c.status}</p>
                <button onClick={()=>deleteCourse(c._id)}>Delete</button>
              </div>
            ))}
          </>
        )}

        {/* STUDENTS */}
        {activeTab === "students" && (
          <>
            <h2>Students</h2>

            {users.map((u)=>(
              <div className="card" key={u._id}>
                <p>{u.name}</p>
                <p>{u.email}</p>
              </div>
            ))}
          </>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;