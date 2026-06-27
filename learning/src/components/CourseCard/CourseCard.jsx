import React from "react";
import { useNavigate } from "react-router-dom";
import "./CourseCard.css";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

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

  return (
    <div className="course-card-component">
      <div className="course-card-top">
        <span className="course-badge-pill">Published</span>
        <h3>{course.title}</h3>
      </div>

      <div className="course-card-body">
        <p className="course-info-row">
          <span>⏰ Timing</span>
          <strong>{course.timing}</strong>
        </p>
        {course.batch && (
          <p className="course-info-row">
            <span>📅 Batch</span>
            <strong>{course.batch}</strong>
          </p>
        )}
        {course.className && (
          <p className="course-info-row">
            <span>🎓 Class</span>
            <strong>{course.className}</strong>
          </p>
        )}
        {course.teacherName && (
          <p className="course-info-row">
            <span>👨‍🏫 Teacher</span>
            <strong>{course.teacherName}</strong>
          </p>
        )}
      </div>

      <div className="course-card-footer">
        <div className="course-price-tag">₹ {course.price}</div>
        <button onClick={handleEnrollClick} className="enroll-now-btn">
          Enroll Now
        </button>
      </div>
    </div>
  );
};

export default CourseCard;