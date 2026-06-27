import React, { useState } from "react";
import "./ContactUs.css";
import { branchesData } from "../data/branchesData";

const ContactUs = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    type: "Student",
    branch: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.message) {
      alert("Please fill all required fields");
      return;
    }
    console.log("Contact Us form submitted:", form);
    setSubmitted(true);
    setForm({ name: "", email: "", phone: "", type: "Student", branch: "", message: "" });
  };

  return (
    <div className="contact-us-page">
      <div className="contact-us-header">
        <h4 className="sub-title">GET IN TOUCH</h4>
        <h2 className="main-title">Contact Climax Academy</h2>
        <p className="page-desc">
          Have questions about our courses, admissions, or notes? We're here to help you
          every step of the way.
        </p>
      </div>

      <div className="contact-us-container">
        {/* CONTACT INFO */}
        <div className="contact-us-info">
          <div className="contact-info-card">
            <div className="contact-info-icon">📞</div>
            <h3>Call Us</h3>
            <a href="tel:+918319661649">+91 8319661649</a>
          </div>
          <div className="contact-info-card">
            <div className="contact-info-icon">📧</div>
            <h3>Email Us</h3>
            <a href="mailto:Pravesht252@gmail.com">Pravesht252@gmail.com</a>
          </div>
          <div className="contact-info-card">
            <div className="contact-info-icon">📍</div>
            <h3>Visit Us</h3>
            <p>Main Road, Kasturi Medical, Beside Raj Plaza, Jawa, Rewa, Madhya Pradesh</p>
          </div>

          <div className="contact-branches-list">
            <h3>Our Branches</h3>
            {branchesData.map((branch) => (
              <div className="contact-branch-item" key={branch.id}>
                <strong>{branch.name}</strong>
                <p>{branch.address}</p>
              </div>
            ))}
          </div>

          <div className="contact-socials">
            <a href="https://www.instagram.com/_i_pravesh/" target="_blank" rel="noreferrer">
              📷 Instagram
            </a>
            <a
              href="https://www.youtube.com/@praveshtiwari4135"
              target="_blank"
              rel="noreferrer"
            >
              ▶️ YouTube
            </a>
          </div>
        </div>

        {/* CONTACT FORM */}
        <form className="contact-us-form" onSubmit={handleSubmit}>
          <h3>Send Us a Message</h3>

          {submitted && (
            <div className="form-success-msg">
              ✅ Thank you for reaching out! We will contact you shortly.
            </div>
          )}

          <div className="form-row">
            <input
              type="text"
              name="name"
              placeholder="Full Name *"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email *"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number *"
              value={form.phone}
              onChange={handleChange}
              maxLength={10}
              required
            />
            <select name="type" value={form.type} onChange={handleChange}>
              <option value="Student">Student</option>
              <option value="Parent">Parent</option>
            </select>
          </div>

          <select name="branch" value={form.branch} onChange={handleChange} className="full-width-select">
            <option value="">Select Nearest Branch</option>
            <option value="Rewa">Madhya Pradesh - Rewa</option>
            <option value="Jawa">Madhya Pradesh - Jawa</option>
            <option value="Other">Other</option>
          </select>

          <textarea
            name="message"
            placeholder="Your Message *"
            rows={5}
            value={form.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit" className="contact-submit-btn">
            Send Message
          </button>
        </form>
      </div>

      {/* MAP */}
      <div className="contact-map-wrapper">
        <iframe
          title="Climax Academy Location"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d234567.0!2d81.3037!3d24.5362!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDMyJzEwLjMiTiA4McKwMTgnMTMuMyJF!5e0!3m2!1sen!2sin!4v1700000000000"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;