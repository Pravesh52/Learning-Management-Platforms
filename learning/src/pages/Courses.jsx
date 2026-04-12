import React from "react";
import "../styles/Courses.css";
import Blogs from "./Blogs";

const courses = [
  {
    id: 1,
    title: "Web Development Bootcamp",
    price: "₹999",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 2,
    title: "React JS Mastery",
    price: "₹799",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 3,
    title: "Full Stack MERN",
    price: "₹1299",
    image: "https://via.placeholder.com/300x200",
  },
];

const Courses = () => {
  return (
    <>
      <section className="courses">
        <h4 className="sub-title">Courses</h4>
        <h2 className="main-title">Choose Our Top Courses</h2>

        <div className="course-container">
          {courses.map((course) => (
            <div className="course-card" key={course.id}>
              <div className="img-box">
                <img src={course.image} alt="course" />
              </div>

              <div className="course-content">
                <h3>{course.title}</h3>
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