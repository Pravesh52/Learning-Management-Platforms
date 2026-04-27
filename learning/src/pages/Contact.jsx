import React from "react";
import "../styles/Contact.css";

const Contact = ({ onClose }) => {
  return (
    <div className="contact-overlay" onClick={onClose}>
      
      {/* 🔥 STOP CLICK PROPAGATION */}
      <div
        className="contact-modal"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* CLOSE BUTTON */}
        <button
          className="close-btn"
          onClick={onClose}
        >
          ✖
        </button>

        <h2>Climax Academy</h2>

        <p className="info-text">
          If you have any queries, issues, or need assistance, feel free to contact us.
          Our team is always ready to help you.
        </p>

        <div className="contact-details">
          <p><strong>Email:</strong> climaxacademy@gmail.com</p>
          <p><strong>Phone:</strong> +91 9876543210</p>
        </div>

        <div className="hint-box">
          <p>
            👉 If you face any problem, please share your issue through email.
            Our support team will resolve your problem within <strong>12 hours</strong>.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Contact;