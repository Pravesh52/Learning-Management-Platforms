import React from "react";
import "./Careerpage.css";
import ContactForm from "../components/ContactForm/ContactForm";

const CareerPage = ({ title, intro, whyTitle, points, steps, emailNote }) => {
  const handleContactClick = () => {
    alert("📋 Application form coming soon! Please check back later or contact us directly at Pravesht252@gmail.com");
  };

  return (
    <div className="career-page">
      <div className="career-hero">
        <h1>{title}</h1>
        <p>{intro}</p>
      </div>

      <div className="career-content">
        <h3>{whyTitle}</h3>
        <ul className="career-points-list">
          {points.map((point, i) => (
            <li key={i}>
              <strong>{point.title}:</strong> {point.text}
            </li>
          ))}
        </ul>

        {steps && steps.length > 0 && (
          <>
            <h3 className="career-steps-title">Steps to Join</h3>
            <div className="career-steps-grid">
              {steps.map((step, i) => (
                <div className="career-step-card" key={i}>
                  <div className="career-step-number">{i + 1}</div>
                  <div>
                    <h4>{step.title}</h4>
                    <p>{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {emailNote && (
          <p className="career-email-note">
            {emailNote} <strong>Pravesht252@gmail.com</strong> to apply.
          </p>
        )}

        <button className="career-contact-btn" onClick={handleContactClick}>
          Contact Us Now
        </button>
        <p className="career-coming-soon-badge">
          🚧 Online application form coming soon
        </p>
      </div>

      <ContactForm />
    </div>
  );
};

export default CareerPage;