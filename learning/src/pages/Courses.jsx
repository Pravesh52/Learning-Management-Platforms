import React, { useEffect, useState } from "react";
import "./Courses.css";

const BASE_URL = import.meta.env.VITE_BASE_URL;

import CourseCard from "../components/CourseCard/CourseCard";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchPublicCourses();
  }, []);

  const fetchPublicCourses = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/api/courses/public`);
      const data = await res.json();
      setCourses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Courses fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const classOptions = ["All", ...new Set(courses.map((c) => c.className).filter(Boolean))];

  const filteredCourses =
    filter === "All" ? courses : courses.filter((c) => c.className === filter);

  return (
    <div className="courses-page">
      {/* ===== PAGE HEADER ===== */}
      <div className="courses-page-header">
        <h4 className="sub-title">OUR COURSES</h4>
        <h2 className="main-title">Choose Your Best Course</h2>
        <p className="page-desc">
          Comprehensive coaching for JEE, NEET, MP Board, UP Board, CBSE Board, Police & Defence
          exams — designed by experienced faculty for guaranteed results.
        </p>
      </div>

      {/* ===== FILTER TABS ===== */}
      {classOptions.length > 1 && (
        <div className="courses-filter-bar">
          {classOptions.map((opt) => (
            <button
              key={opt}
              className={`filter-tab ${filter === opt ? "active" : ""}`}
              onClick={() => setFilter(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {/* ===== COURSE GRID ===== */}
      <div className="courses-page-grid">
        {loading ? (
          <div className="courses-loading-state">
            <p>Loading courses...</p>
          </div>
        ) : filteredCourses.length > 0 ? (
          filteredCourses.map((course) => <CourseCard course={course} key={course._id} />)
        ) : (
          <div className="courses-empty-state">
            <h3>No Courses Available Right Now</h3>
            <p>Please check back soon — new batches are added regularly.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;