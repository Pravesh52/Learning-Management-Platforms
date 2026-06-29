import React from "react";
import CareerPage from "./Careerpage";

const InvestWithUs = () => {
  return (
    <CareerPage
      title="Invest in Educational Excellence with Climax Academy"
      intro="At Climax Academy, we have built a reputation for excellence in education over the past 15 years. Our commitment to academic success and holistic student development has positioned us as a leading coaching institute in Madhya Pradesh. As we continue to expand and innovate, we invite visionary investors to join us on this journey."
      whyTitle="Why Invest in Climax Academy?"
      points={[
        { title: "Proven Track Record", text: "With over 10,000+ students successfully coached over 15 years, our results speak for themselves. Our students consistently achieve top ranks in board and entrance exams." },
        { title: "State-of-the-Art Infrastructure", text: "Our facilities are equipped with modern amenities and advanced teaching tools, creating an optimal environment for learning." },
        { title: "Innovative Teaching Methodologies", text: "We blend traditional teaching methods with modern educational technologies, ensuring students receive the best of both worlds." },
        { title: "Expanding Market and Opportunity", text: "The demand for quality education and coaching classes is rapidly increasing across Madhya Pradesh, creating substantial market opportunities." },
        { title: "Strategic Expansion Plans", text: "We plan to establish new coaching centers in prime locations and introduce specialized courses to address various academic needs." },
      ]}
      emailNote="By investing in Climax Academy, you are contributing to shaping the future of education. Contact us at"
    />
  );
};

export default InvestWithUs;