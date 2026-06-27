import React from "react";
import { Link } from "react-router-dom";
 import "./AboutUs.css";
import StatsCounter from "../components/StatsCounter/StatsCounter";
import TestimonialCard from "../components/TestimonialCard/TestimonialCard";
import { testimonialsData } from "../data/testimonialsData";

const AboutUs = () => {
  return (
    <div className="about-page">
      {/* HERO */}
      <section className="about-hero">
        <h4 className="sub-title">ABOUT CLIMAX ACADEMY</h4>
        <h1>Correct Guidance, Well Planned and Consistent Hard Work Lead to a Bright Future</h1>
        <p>
          For over 15 years, Climax Academy has been a trusted name in coaching education
          across Madhya Pradesh, helping thousands of students achieve their academic dreams.
        </p>
      </section>

      {/* STATS */}
      <StatsCounter />

      {/* STORY */}
      <section className="about-story-section">
        <div className="about-story-grid">
          <div className="about-story-text">
            <h4 className="sub-title">OUR STORY</h4>
            <h2 className="main-title">Building Futures Since Day One</h2>
            <p>
              Climax Academy was founded with a simple yet powerful vision — to provide
              quality education and personalized guidance to students preparing for board
              exams and competitive entrance tests like JEE, NEET, Police and Defence exams.
            </p>
            <p>
              Over the past 15 years, we have grown from a single classroom to two thriving
              branches in Rewa and Jawa, Madhya Pradesh, helping over 10,000 students achieve
              academic success and producing more than 1,000 toppers across various exams and
              boards including MP Board, UP Board, and CBSE.
            </p>
            <p>
              Our success lies in our commitment to understanding each student's unique
              learning needs, providing structured testing through our Marathon, Weekly, and
              Quiz Tests, and maintaining transparent communication with parents through our
              digital dashboard system.
            </p>
          </div>
          <div className="about-story-highlights">
            <div className="highlight-box">
              <h3>🎯 Our Mission</h3>
              <p>
                To empower every student with the knowledge, confidence, and discipline needed
                to excel in academics and competitive examinations.
              </p>
            </div>
            <div className="highlight-box">
              <h3>👁️ Our Vision</h3>
              <p>
                To become the most trusted coaching institute in Madhya Pradesh, known for
                producing disciplined, knowledgeable, and successful students.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="about-why-section">
        <div className="section-heading-center">
          <h4 className="sub-title">WHY CHOOSE US</h4>
          <h2 className="main-title">What Makes Climax Academy Different</h2>
        </div>
        <div className="why-us-grid">
          <div className="why-us-card">
            <div className="why-us-icon">👨‍🏫</div>
            <h3>Experienced Faculty</h3>
            <p>Our teachers bring 15+ years of combined experience in JEE, NEET and Board exam coaching.</p>
          </div>
          <div className="why-us-card">
            <div className="why-us-icon">📝</div>
            <h3>Regular Testing</h3>
            <p>Marathon, Weekly, and Quiz tests ensure consistent practice and exam readiness.</p>
          </div>
          <div className="why-us-card">
            <div className="why-us-icon">📊</div>
            <h3>Digital Dashboard</h3>
            <p>Students and parents can track results, enrollment status, and study materials online.</p>
          </div>
          <div className="why-us-card">
            <div className="why-us-icon">📍</div>
            <h3>2 Convenient Branches</h3>
            <p>Located in Rewa and Jawa, Madhya Pradesh, for easy access to quality education.</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="about-testimonials-section">
        <div className="section-heading-center">
          <h4 className="sub-title">TESTIMONIALS</h4>
          <h2 className="main-title">What Our Students Say</h2>
        </div>
        <div className="about-testimonials-grid">
          {testimonialsData.map((t) => (
            <TestimonialCard testimonial={t} key={t.id} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta-section">
        <h2>Ready to Begin Your Success Journey?</h2>
        <p>Join thousands of successful students at Climax Academy today.</p>
        <Link to="/courses" className="about-cta-btn">
          Explore Our Courses
        </Link>
      </section>
    </div>
  );
};

export default AboutUs;