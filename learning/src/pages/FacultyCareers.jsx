import React from "react";
import CareerPage from "./CareerPage";

const FacultyCareers = () => {
  return (
    <CareerPage
      title="Join Our Faculty Team at Climax Academy"
      intro="Be part of a passionate teaching team dedicated to shaping the future of students preparing for board exams and competitive entrance tests like JEE, NEET, Police and Defence exams."
      whyTitle="Why Teach With Us?"
      points={[
        { title: "Meaningful Impact", text: "Directly shape the academic future of thousands of students every year." },
        { title: "Professional Development", text: "Regular training sessions to sharpen your teaching methodologies." },
        { title: "Supportive Team", text: "Work alongside experienced educators in a collaborative environment." },
        { title: "Modern Resources", text: "Access to structured testing tools, study materials, and digital dashboards." },
        { title: "Attractive Compensation", text: "Competitive salary packages with performance-based incentives." },
      ]}
      emailNote="If you have a passion for teaching and helping students excel academically, we invite you to join our faculty. Contact us at"
    />
  );
};

export default FacultyCareers;