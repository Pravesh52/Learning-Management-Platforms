import React from "react";
import "../styles/Courses.css";
import Blogs from "./Blogs";

const courses = [
  {
    id: 1,
    title: "Chemistry Hindi Medium",
    time: "6.00 AM : 7.00 AM",
    price: "₹2000",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 2,
    title: "Chemistry English Medium",
    time: "7.00 AM : 8.00 AM",
    price: "₹2500",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 3,
    title: "Chemistry Hindi Medium",
    time: "8.00 AM : 9.00 AM",
    price: "₹2000",
    image: "https://via.placeholder.com/300x200",
  },
];

const Courses = () => {
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
          {courses.map((course) => (
            <div className="course-card" key={course.id}>

              <div className="img-box">
                <img src={course.image} alt={course.title} />
              </div>

              <div className="course-content">
                <h3>{course.title}</h3>
                <h5>{course.time}</h5>
                <p className="price">{course.price}</p>
                <button>Enroll Now</button>
              </div>

            </div>
          ))}
        </div>
      </section>

      <Blogs />
    </>
  );
};

export default Courses;