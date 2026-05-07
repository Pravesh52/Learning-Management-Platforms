import React, { useEffect, useState } from "react";
import "../styles/Courses.css";
import Blogs from "./Blogs";

const Courses = () => {

  // ================= STATE =================
  // Admin ne jo courses "Send to UI" kiye hain, woh localStorage se lenge
  const [courses, setCourses] = useState([]);

  // ================= USE EFFECT =================
  useEffect(() => {
    loadSentCourses();

    // ✅ Agar admin koi course add/remove kare toh
    // dusre tab mein bhi auto-update ho jaye
    window.addEventListener("storage", loadSentCourses);

    return () => {
      window.removeEventListener("storage", loadSentCourses);
    };
  }, []);

  // ================= LOAD COURSES FROM LOCALSTORAGE =================
  const loadSentCourses = () => {
    const saved = localStorage.getItem("sentCourses");
    if (saved) {
      setCourses(JSON.parse(saved));
    } else {
      setCourses([]);
    }
  };

  return (
    <>
      <section className="courses">

        {/* HEADER */}
        <div className="courses-header">
          <h4 className="sub-title">COURSES _______</h4>
          <h2 className="main-title">Choose Our Top Courses</h2>
        </div>

        {/* CARDS */}
        <div className="course-container">

          {courses.length > 0 ? (

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
                  <p className="price">₹ {course.price}</p>
                  <button>Enroll Now</button>
                </div>

              </div>
            ))

          ) : (

            // ✅ Jab tak admin koi course send nahi karta
            <div style={{
              textAlign: "center",
              padding: "60px 20px",
              color: "#888",
              width: "100%"
            }}>
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