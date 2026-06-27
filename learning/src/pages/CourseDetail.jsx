import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./CourseDetail.css";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/api/courses/public`);
      const data = await res.json();
      const found = Array.isArray(data) ? data.find((c) => c._id === id) : null;
      setCourse(found || null);
    } catch (error) {
      console.log("Course detail fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnrollClick = () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      localStorage.setItem("pendingEnrollCourse", course._id);
      navigate("/login");
      return;
    }
    navigate("/dashboard?tab=courses");
  };

  if (loading) {
    return (
      <div className="course-detail-page">
        <p className="loading-text">Loading course details...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="course-detail-page">
        <div className="course-not-found">
          <h2>Course Not Found</h2>
          <Link to="/courses" className="back-to-courses-btn">
            ← Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="course-detail-page">
      <div className="course-detail-breadcrumb">
        <Link to="/courses">Courses</Link> / <span>{course.title}</span>
      </div>

      <div className="course-detail-container">
        {/* HEADER BANNER */}
        <div className="course-detail-banner">
          <span className="course-detail-badge">Published</span>
          <h1>{course.title}</h1>
          <p>
            Designed for serious students aiming for top results in board exams and
            competitive entrance tests.
          </p>
        </div>

        {/* INFO GRID */}
        <div className="course-detail-info-grid">
          <div className="course-detail-info-card">
            <span className="info-label">⏰ Timing</span>
            <span className="info-value">{course.timing}</span>
          </div>
          {course.batch && (
            <div className="course-detail-info-card">
              <span className="info-label">📅 Batch</span>
              <span className="info-value">{course.batch}</span>
            </div>
          )}
          {course.className && (
            <div className="course-detail-info-card">
              <span className="info-label">🎓 Class</span>
              <span className="info-value">{course.className}</span>
            </div>
          )}
          {course.teacherName && (
            <div className="course-detail-info-card">
              <span className="info-label">👨‍🏫 Teacher</span>
              <span className="info-value">{course.teacherName}</span>
            </div>
          )}
        </div>

        {/* WHAT YOU GET */}
        <div className="course-detail-features">
          <h3>What You Get</h3>
          <ul>
            <li>✅ Regular Marathon, Weekly and Quiz Tests</li>
            <li>✅ Detailed performance tracking on your dashboard</li>
            <li>✅ Access to exam-focused study notes</li>
            <li>✅ Doubt-clearing sessions with expert faculty</li>
            <li>✅ Personalized attention for every student</li>
          </ul>
        </div>

        {/* ENROLL CTA */}
        <div className="course-detail-cta">
          <div className="course-detail-price">₹ {course.price}</div>
          <button onClick={handleEnrollClick} className="course-detail-enroll-btn">
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;