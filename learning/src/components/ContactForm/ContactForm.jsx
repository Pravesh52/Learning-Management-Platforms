import React, { useState } from "react";
import "./ContactForm.css";

const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    type: "Student",
    branch: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      alert("Please fill all required fields");
      return;
    }
    console.log("Contact form submitted:", form);
    setSubmitted(true);
    setForm({ name: "", email: "", phone: "", type: "Student", branch: "" });
  };

  return (
    <section className="contact-quick-section">
      <div className="contact-quick-container">
        <div className="contact-quick-text">
          <h2>Got Any Questions?</h2>
          <p>
            Take a second and fill this form and we will get in contact with you as soon as we
            can.
          </p>
        </div>

        <form className="contact-quick-form" onSubmit={handleSubmit}>
          {submitted && (
            <div className="form-success-msg">
              ✅ Thank you! We will contact you shortly.
            </div>
          )}
          <div className="form-row">
            <input
              type="text"
              name="name"
              placeholder="Name *"
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
              placeholder="Phone Number (10 digits) *"
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
          <div className="form-row">
            <select name="branch" value={form.branch} onChange={handleChange}>
              <option value="">Closest Branch to You</option>
              <option value="Rewa">Madhya Pradesh - Rewa</option>
              <option value="Jawa">Madhya Pradesh - Jawa</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;