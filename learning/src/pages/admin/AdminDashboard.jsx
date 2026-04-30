import React, { useEffect, useState } from "react";
import "../../styles/AdminDashboard.css";
import axios from "axios";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);

  const admin = JSON.parse(localStorage.getItem("user"));

  // ✅ Only required fields
  const [newCourse, setNewCourse] = useState({
    title: "",
    timing: "",
    price: "",
    status: "draft",
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

  // ✅ Fetch Courses
  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/courses");

       console.log("FULL DATA:", res.data);
        
      setCourses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Fetch Students
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
      console.log(error.response?.data);
    }
  };

  // ✅ Create Course
  const createCourse = async () => {
    if (!newCourse.title || !newCourse.timing || !newCourse.price) {
      alert("All fields are required");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/courses", newCourse);

      // reset form
      setNewCourse({
        title: "",
        timing: "",
        price: "",
        status: "draft",
      });

      fetchCourses();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="admin-container">

      {/* SIDEBAR */}
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

        {/* STUDENTS */}
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
                      <th>Courses</th>
                    </tr>
                  </thead>

                  <tbody>
                    {users.map((u, index) => (
                      <tr key={u._id}>
                        <td>{index + 1}</td>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>+{u.mobilenumber || "N/A"}</td>
                        <td>
                          {u.courses?.length > 0
                            ? u.courses.map((c) => c.title).join(", ")
                            : "Not Enrolled"}
                        </td>
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

        {/* CREATE COURSES */}
        {activeTab === "courses" && (
          <>
            <h2>Create Courses</h2>

            <div className="form">

              <input
                placeholder="Course Name"
                value={newCourse.title}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, title: e.target.value })
                }
              />

              <input
                placeholder="Timing (e.g. 6:00 AM - 7:00 AM)"
                value={newCourse.timing}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, timing: e.target.value })
                }
              />

              <input
                type="number"
                placeholder="Price (₹)"
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

            {/* Course List */}
            <div className="course-list">
  {courses.map((c) => (
    <div className="card" key={c._id}>
      <h4>{c.title}</h4>

      <p className="timing">Time {c.timing}</p>

      <p className="price">₹{c.price}</p>

      <p className="status">{c.status}</p>

      <button>Enroll Now</button>
    </div>
  ))}
</div>
          </>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;