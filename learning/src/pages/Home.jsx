import React from "react";
import "../styles/Home.css";
import studentImg from "../assets/student.png";

const Home = () => {
  return (
    <>
      {/* HERO SECTION */}
      <section className="home">
        <div className="home-left">
          <h1>
            Better <span className="green">Learning</span><br />
            <span className="green">Future</span> Starts<br />
            With SkillStack
          </h1>

          <p>
            It is a long established fact that reader will be distracted readable
            content of a page when.
          </p>

          <button className="explore-btn">
            Explore Courses →
          </button>
        </div>

        <div className="home-right">
          <div className="circle-bg"></div>
          <img src={studentImg} alt="student" />

          <div className="card card1">
            <h3>4500+</h3>
            <p>Online Course</p>
          </div>

          <div className="card card2">
            <h3>7500+</h3>
            <p>Active Student</p>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features">
        <div className="feature-box">
          <h3>Quality Education</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod
            tempor ut labore.
          </p>
          <button className="feature-btn">
            <span className="circle"></span>
            EXPLORE COURSES →
          </button>
        </div>

        <div className="feature-box">
          <h3>Experienced Teachers</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod
            tempor ut labore.
          </p>
          <button className="feature-btn">
            <span className="circle"></span>
            EXPLORE COURSES →
          </button>
        </div>

        <div className="feature-box">
          <h3>Delicious Food</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod
            tempor ut labore.
          </p>
          <button className="feature-btn">
            <span className="circle"></span>
            EXPLORE COURSES →
          </button>
        </div>
      </section>
    </>
  );
};

export default Home;