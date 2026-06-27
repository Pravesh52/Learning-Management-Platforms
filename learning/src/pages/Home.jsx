import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

import HeroSlider from "../components/HeroSlider/HeroSlider";
import StatsCounter from "../components/StatsCounter/StatsCounter";
import TestimonialCard from "../components/TestimonialCard/TestimonialCard";
import BlogCard from "../components/BlogCard/BlogCard";
import BranchCard from "../components/BranchCard/BranchCard";
import ContactForm from "../components/ContactForm/ContactForm";

import { branchesData } from "../data/branchesData";
import { testimonialsData } from "../data/testimonialsData";
import { blogsData } from "../data/blogsData";
import { coursesData } from "../data/coursesData";

const Home = () => {
  return (
    <div className="home-page">
      {/* ===== HERO SLIDER ===== */}
      <HeroSlider />

      {/* ===== STATS ===== */}
      <StatsCounter />

      {/* ===== OUR COURSES ===== */}
      <section className="courses-preview-section">
        <div className="section-heading">
          <h4 className="sub-title">OUR COURSES</h4>
          <h2 className="main-title">Choose Your Path to Success</h2>
        </div>

        <div className="courses-preview-grid">
          {coursesData.map((course) => (
            <Link to="/courses" className="course-preview-card" key={course.id}>
              <div className="course-preview-icon">{course.icon}</div>
              <h3>{course.name}</h3>
              <p>{course.desc}</p>
              <span className="learn-more">Learn More →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== SUBJECTS WE TEACH ===== */}
      <section className="subjects-section">
        <div className="section-heading">
          <h4 className="sub-title">SUBJECTS WE TEACH</h4>
          <h2 className="main-title">Physics, Chemistry & Mathematics</h2>
          <p className="section-desc">For Class 9th, 10th, 11th and 12th students</p>
        </div>
        <div className="subjects-grid">
          <div className="subject-card physics">
            <h3>⚛️ Physics</h3>
            <p>Concept-based learning with real-world application and regular practice tests.</p>
          </div>
          <div className="subject-card chemistry">
            <h3>🧪 Chemistry</h3>
            <p>Simplified explanations of organic, inorganic and physical chemistry topics.</p>
          </div>
          <div className="subject-card maths">
            <h3>📐 Mathematics</h3>
            <p>Step-by-step problem solving techniques for board and competitive exams.</p>
          </div>
        </div>
      </section>

      {/* ===== BRANCHES ===== */}
      <section className="branches-section">
        <div className="section-heading">
          <h4 className="sub-title">OUR LOCATIONS</h4>
          <h2 className="main-title">Find Climax Academy Near You</h2>
          <p className="section-desc">We are proud to serve students across Madhya Pradesh</p>
        </div>
        <div className="branches-preview-grid">
          {branchesData.map((branch) => (
            <BranchCard branch={branch} key={branch.id} />
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <Link to="/branches" className="view-more-btn">
            View All Branches
          </Link>
        </div>
      </section>

      {/* ===== NOTES PROMO ===== */}
      <section className="notes-promo-section">
        <div className="notes-promo-content">
          <h2>Climax Academy's Perfect Notes</h2>
          <p>
            Crafted by top faculty, exam-focused, easy to understand, and trusted by thousands of
            students across Madhya Pradesh.
          </p>
          <Link to="/notes" className="hero-btn">
            Shop Notes Now
          </Link>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="testimonials-section">
        <div className="section-heading">
          <h4 className="sub-title">TESTIMONIALS</h4>
          <h2 className="main-title">Loved by Students, Trusted by Parents</h2>
        </div>
        <div className="testimonials-grid">
          {testimonialsData.slice(0, 3).map((t) => (
            <TestimonialCard testimonial={t} key={t.id} />
          ))}
        </div>
      </section>

      {/* ===== BLOG PREVIEW ===== */}
      <section className="blog-preview-section">
        <div className="section-heading">
          <h4 className="sub-title">BLOG POSTS</h4>
          <h2 className="main-title">Latest Updates & Tips</h2>
        </div>
        <div className="blog-preview-grid">
          {blogsData.slice(0, 3).map((blog) => (
            <BlogCard blog={blog} key={blog.id} />
          ))}
        </div>
      </section>

      {/* ===== CONTACT FORM ===== */}
      <ContactForm />
    </div>
  );
};

export default Home;