// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "./HeroSlider.css";

// const slides = [
//   {
//     id: 1,
//     title: "Admissions Open 2026-27",
//     subtitle:
//       "Join Climax Academy for JEE, NEET, MP Board, UP Board, CBSE, Police & Defence Coaching",
//     bg: "linear-gradient(135deg, #0a1f44 0%, #1a3a6e 100%)",
//   },
//   {
//     id: 2,
//     title: "15+ Years of Trusted Excellence",
//     subtitle: "10000+ Successful Students | 1000+ Toppers",
//     bg: "linear-gradient(135deg, #7a1212 0%, #a31f1f 100%)",
//   },
//   {
//     id: 3,
//     title: "Expert Faculty, Proven Results",
//     subtitle: "Personalized attention for every student, every subject",
//     bg: "linear-gradient(135deg, #0a1f44 0%, #7a1212 100%)",
//   },
// ];

// const HeroSlider = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="hero-slider">
//       {slides.map((slide, index) => (
//         <div
//           key={slide.id}
//           className={`hero-slide ${index === currentSlide ? "active" : ""}`}
//           style={{ background: slide.bg }}
//         >
//           <div className="hero-content">
//             <h1>{slide.title}</h1>
//             <p>{slide.subtitle}</p>
//             <Link to="/courses" className="hero-btn">
//               Explore Courses
//             </Link>
//           </div>
//         </div>
//       ))}
//       <div className="hero-dots">
//         {slides.map((_, index) => (
//           <span
//             key={index}
//             className={`dot ${index === currentSlide ? "active" : ""}`}
//             onClick={() => setCurrentSlide(index)}
//           />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default HeroSlider;


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HeroSlider.css";
import Ticker from "../Ticker/Ticker";

const slides = [
  {
    id: 1,
    title: "Admissions Open 2026-27",
    subtitle:
      "Join Climax Academy for JEE, NEET, MP Board, UP Board, CBSE, Police & Defence Coaching",
    bg: "linear-gradient(135deg, #0a1f44 0%, #1a3a6e 100%)",
  },
  {
    id: 2,
    title: "15+ Years of Trusted Excellence",
    subtitle: "10000+ Successful Students | 1000+ Toppers",
    bg: "linear-gradient(135deg, #7a1212 0%, #a31f1f 100%)",
  },
  {
    id: 3,
    title: "Expert Faculty, Proven Results",
    subtitle: "Personalized attention for every student, every subject",
    bg: "linear-gradient(135deg, #0a1f44 0%, #7a1212 100%)",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Ticker />
      <section className="hero-slider">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`hero-slide ${index === currentSlide ? "active" : ""}`}
          style={{ background: slide.bg }}
        >
          <div className="hero-content">
            <h1>{slide.title}</h1>
            <p>{slide.subtitle}</p>
            <Link to="/courses" className="hero-btn">
              Explore Courses
            </Link>
          </div>
        </div>
      ))}
      <div className="hero-dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
    </>
  );
};

export default HeroSlider;