import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import Image from "../../assets/Image.png";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      {/* TAGLINE BANNER */}
      <div className="footer-tagline-banner">
        <p>
          "CORRECT GUIDANCE, WELL PLANNED AND CONSISTENT HARD WORK LEAD TO A
          BRIGHT FUTURE"
        </p>
      </div>

      {/* MAIN FOOTER */}
      <div className="footer-main">
        <div className="footer-container">
          {/* LOGO COLUMN */}
          <div className="footer-col footer-logo-col">
            <Link to="/" className="footer-logo">
              <img src={Image} alt="Climax Academy" />
              <span>CLIMAX ACADEMY</span>
            </Link>

            {/* SOCIAL ICONS - Logo ke neeche */}
            <div className="footer-socials-row">
              <a
                href="https://www.instagram.com/_i_pravesh/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>

              <a
                href="https://www.youtube.com/@praveshtiwari4135"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>
              <a
                href="https://facebook.com/yourpage"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
            </div>
          </div>

          {/* CONTACT US */}
          <div className="footer-col">
            <h4>Contact Us</h4>
            <ul>
              <li>
                <Link to="/contact-us">Head Office</Link>
              </li>
              <li>
                <Link to="/branches">Branches</Link>
              </li>
            </ul>
          </div>

          {/* WORK WITH US */}
          <div className="footer-col">
            <h4>Work with Us</h4>
            <ul>
              <li>
                <Link to="/careers/management">As a Management</Link>
              </li>
              <li>
                <Link to="/careers/faculty">As a Faculty</Link>
              </li>
            </ul>
          </div>

          {/* INVEST WITH US */}
          <div className="footer-col">
            <h4>Invest with Us</h4>
            <ul>
              <li>
                <Link to="/invest-with-us">Investor</Link>
              </li>
              <li>
                <Link to="/franchise">Franchise</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="footer-bottom">
        <p>
          © {year}, <strong>Climax Academy</strong> All Rights Reserved
        </p>
        <div className="footer-bottom-links">
          <Link to="/policies/privacy-policy">Privacy Policy</Link>
          <span>|</span>
          <Link to="/policies/terms-of-service">Terms of Service</Link>
          <span>|</span>
          <Link to="/policies/refund-policy">Refund Policy</Link>
          <span>|</span>
          <Link to="/policies/shipping-policy">Shipping Policy</Link>
          <span>|</span>
          <Link to="/contact-us">Contact Information</Link>
        </div>
      </div>

      {/* DEVELOPER CREDIT */}
      <a
        href="https://pravesh52.github.io/Pravesh-Portfolio/"
        target="_blank"
        rel="noreferrer"
        className="developer-credit"
      >
        <span>
          Designed & Developed by

          </span>
        <img
          src="/Pravesh.png"
          alt="Pravesh Tiwari"
          className="developer-credit-img"
        />

          <strong>Pravesh Tiwari</strong>
      </a>
    </footer>
  );
};

export default Footer;