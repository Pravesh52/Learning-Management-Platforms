import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

import Image from "../../assets/Image.png"

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* ABOUT COLUMN */}
        <div className="footer-col">
          <div className="footer-logo">
           <img src={Image} alt="Climax Academy" />
            <span>CLIMAX ACADEMY</span>
          </div>
          <p className="footer-about-text">
            Correct guidance, well planned and consistent hard work lead to a bright future.
            Climax Academy has been shaping successful careers for over 15 years.
          </p>
          <div className="footer-socials">
            <a
              href="https://www.instagram.com/_i_pravesh/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              📷
            </a>
            <a
              href="https://www.youtube.com/@praveshtiwari4135"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
            >
              ▶️
            </a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/notes">Notes</Link></li>
            <li><Link to="/branches">Branches</Link></li>
            <li><Link to="/blogs">Blogs</Link></li>
            <li><Link to="/about-us">About Us</Link></li>
          </ul>
        </div>

        {/* SUPPORT LINKS */}
        <div className="footer-col">
          <h4>Support</h4>
          <ul>
            <li><Link to="/contact-us">Contact Us</Link></li>
            <li><Link to="/login">Student Login</Link></li>
            <li><Link to="/signup">Student Signup</Link></li>
            <li><Link to="/cart">My Cart</Link></li>
          </ul>
        </div>

        {/* CONTACT INFO */}
        <div className="footer-col">
          <h4>Contact Us</h4>
          <ul className="footer-contact-list">
            <li>📍 Main Road, Kasturi Medical, Beside Raj Plaza, Jawa, Rewa, Madhya Pradesh</li>
            <li>📞 <a href="tel:+918319661649">+91 8319661649</a></li>
            <li>📧 <a href="mailto:Pravesht252@gmail.com">Pravesht252@gmail.com</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {year} Climax Academy. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;