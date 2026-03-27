import React from 'react';
import '../styles/Features.css';
import Courses from './Courses';

const Features = () => {
  const featureData = [
    {
      title: "Learn More Anywhere",
      icon: "📖",
      desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor ut labore."
    },
    {
      title: "Expert Instructor",
      icon: "❤️",
      desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor ut labore."
    },
    {
      title: "Team Management",
      icon: "👤",
      desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor ut labore."
    },
    {
      title: "Course Planing",
      icon: "👁️",
      desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor ut labore."
    },
    {
      title: "Teacher Monitoring",
      icon: "💡",
      desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor ut labore."
    },
    {
      title: "24/7 Strong Support",
      icon: "✉️",
      desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor ut labore."
    }
  ];

  return (
    <>
    <div>
    <section className="features-container">
      <div className="features-header">
        <div className="sub-title-wrapper">
          <span className="sub-title">WHY CHOOSE SkillStack</span>
          <div className="title-line"></div>
        </div>
        <h2 className="main-title">
          Find The <span className="highlight">Best Features</span> Of SkillStack
        </h2>
      </div>

      <div className="features-grid">
        {featureData.map((item, index) => (
          <div className="feature-card" key={index}>
            <div className="card-header">
              <div className="icon-circle">
                <span className="icon-placeholder">{item.icon}</span>
              </div>
              <h3 className="card-title">{item.title}</h3>
            </div>
            <p className="card-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
    </div>
    
    <Courses/>
    </>

  );
};

export default Features;