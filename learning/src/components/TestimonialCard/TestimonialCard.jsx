import React from "react";
import "./TestimonialCard.css";

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="testimonial-card-component">
      <div className="quote-icon">"</div>
      <p className="testimonial-text">{testimonial.text}</p>
      <h4 className="testimonial-name">{testimonial.name}</h4>
      <span className="testimonial-role">{testimonial.role}</span>
    </div>
  );
};

export default TestimonialCard;