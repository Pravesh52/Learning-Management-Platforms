import React, { useEffect, useState } from "react";
import "../styles/Courses.css";
import { useNavigate } from "react-router-dom";
import Blogs from "./Blogs";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPublicCourses();
  }, []);

  // ✅ BUG 1 FIX: Ab DB se public courses aayenge, localStorage nahi
  const fetchPublicCourses = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/api/courses/public`);
      const data = await res.json();
      setCourses(data);
    } catch (error) {
      console.log("Courses fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ BUG 2 FIX: Enroll Now click → Login pe le jao agar logged in nahi
  const handleEnrollClick = (courseId) => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      // Save intended course to redirect back after login
      localStorage.setItem("pendingEnrollCourse", courseId);
      navigate("/login");
      return;
    }

    // Agar already logged in toh dashboard courses tab pe le jao
    navigate("/dashboard?tab=courses");
  };

  return (
    <>
      <section className="courses">
        <div className="courses-header">
          <h4 className="sub-title">COURSES _______</h4>
          <h2 className="main-title">Choose Our Top Courses</h2>
        </div>

        <div className="course-container">
          {loading ? (
            <div style={{ textAlign: "center", padding: "60px", color: "#888", width: "100%" }}>
              <p>Loading courses...</p>
            </div>
          ) : courses.length > 0 ? (
            courses.map((course) => (
              <div className="course-card" key={course._id}>
                <div className="img-box">
                  <img
                    src={`https://via.placeholder.com/300x200?text=${encodeURIComponent(course.title)}`}
                    alt={course.title}
                  />
                </div>
                <div className="course-content">
                  <h3>{course.title}</h3>
                  <h5>⏰ {course.timing}</h5>
                  {/* ✅ BUG 4: Show new fields */}
                  {course.batch && <p style={{ color: "#a78bfa", fontSize: "13px" }}>📅 Batch: {course.batch}</p>}
                  {course.className && <p style={{ color: "#60a5fa", fontSize: "13px" }}>🎓 Class: {course.className}</p>}
                  {course.teacherName && <p style={{ color: "#34d399", fontSize: "13px" }}>👨‍🏫 Teacher: {course.teacherName}</p>}
                  <p className="price">₹ {course.price}</p>
                  <button onClick={() => handleEnrollClick(course._id)}>Enroll Now</button>
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "#888", width: "100%" }}>
              <h3>No Courses Available Right Now</h3>
              <p>Admin will add new courses soon. Stay tuned!</p>
            </div>
          )}
        </div>
      </section>
      <Blogs />
    </>
  );
};

export default Courses;