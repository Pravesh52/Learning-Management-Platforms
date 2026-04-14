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

  // ✅ ANALYTICS STATE
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

  // ✅ SAFE COMBINED DATA
  const combinedData = (analytics.userGrowth || []).map((item, index) => ({
    month: item.month,
    users: item.users,
    students: analytics.coursePerformance[index]?.students || 0
  }));

  // ================= API =================

  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/courses");
      setCourses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/analytics");
      setAnalytics(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const createCourse = async () => {
    try {
      await axios.post("http://localhost:5000/api/courses", newCourse);
      fetchCourses();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCourse = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/courses/${id}`);
      fetchCourses();
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ LOAD ALL DATA
  useEffect(() => {
    fetchCourses();
    fetchUsers();
    fetchAnalytics();
  }, []);

  // ================= UI =================

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

      {/* MAIN */}
      <div className="main">

        {/* ================= DASHBOARD ================= */}
        {activeTab === "dashboard" && (
          <>
            <h2>Overview</h2>

            <div className="card">Total Courses: {courses.length}</div>
            <div className="card">Total Students: {users.length}</div>

            {/* GRAPH */}
            <div className="graph-card">
              <h3>Analytics Overview</h3>

              <ResponsiveContainer width="100%" height={350}>
                <ComposedChart data={combinedData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />

                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#3b82f6"
                    strokeWidth={3}
                  />

                  <Bar
                    dataKey="students"
                    fill="#22c55e"
                    radius={[5, 5, 0, 0]}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {/* ================= COURSE ================= */}
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

        {/* ================= QUIZ ================= */}
        {activeTab === "quiz" && (
          <h2>Quiz Management (Coming Soon)</h2>
        )}

        {/* ================= CONTENT ================= */}
        {activeTab === "content" && (
          <h2>Content Management (Coming Soon)</h2>
        )}

        {/* ================= STUDENTS ================= */}
        {activeTab === "students" && (
          <>
            <h2>Students</h2>

            {users.map((u)=>(
              <div className="card" key={u._id}>
                <p>{u.name}</p>
                <p>{u.email}</p>
                <p>Courses: {u.courses || 0}</p>
              </div>
            ))}
          </>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;