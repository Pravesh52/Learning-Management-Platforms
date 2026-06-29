import React from "react";
import CareerPage from "./CareerPage";

const Franchise = () => {
  return (
    <CareerPage
      title="Capitalize on High Demand: Franchise with Climax Academy"
      intro="Become a franchise partner with Climax Academy, a trusted name in education across Madhya Pradesh. Leverage our 15-year legacy and proven business model to establish a successful coaching center and tap into the booming education market."
      whyTitle="Why Partner With Us?"
      points={[
        { title: "Established Brand", text: "Trusted and respected in education, ensuring credibility and attracting students." },
        { title: "Proven Model", text: "Detailed operational guidelines and continuous support to ensure your franchise's success." },
        { title: "Comprehensive Training", text: "Equip your team with the knowledge and skills needed for excellence." },
        { title: "Marketing Support", text: "Benefit from centralized marketing efforts and operational assistance to drive student enrollment." },
        { title: "High Demand", text: "The demand for quality education and coaching classes is rapidly increasing across Madhya Pradesh." },
      ]}
      steps={[
        { title: "Inquiry", text: "Express your interest and learn more about the franchise opportunity." },
        { title: "Application", text: "Submit your application, which will be reviewed to ensure alignment with our values and standards." },
        { title: "Agreement", text: "Sign the franchise agreement and join the Climax Academy family." },
        { title: "Training", text: "Receive comprehensive training to prepare you and your team for success." },
        { title: "Launch", text: "Open your franchise and start empowering students to achieve their academic goals." },
      ]}
      emailNote="To express your interest in opening a franchise, contact us at"
    />
  );
};

export default Franchise;