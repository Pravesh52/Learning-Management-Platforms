import React from "react";
import CareerPage from "./Careerpage";

const ManagementCareers = () => {
  return (
    <CareerPage
      title="Join Our Dynamic Management Team at Climax Academy"
      intro="Be part of the dynamic management team at Climax Academy and contribute to our mission of providing top-notch education. We are seeking motivated professionals to lead and support our operational and strategic initiatives."
      whyTitle="Why Work With Us?"
      points={[
        { title: "Leadership Opportunities", text: "Drive impactful projects and initiatives across our branches." },
        { title: "Collaborative Culture", text: "Work with a team that values your insights and expertise." },
        { title: "Career Growth", text: "Clear pathways for professional advancement." },
        { title: "Innovative Environment", text: "Engage in a forward-thinking and progressive workplace." },
        { title: "Competitive Benefits", text: "Attractive compensation and benefits package." },
      ]}
      emailNote="If you have strong leadership skills and a passion for education management, we invite you to be part of our team. Contact us at"
    />
  );
};

export default ManagementCareers;