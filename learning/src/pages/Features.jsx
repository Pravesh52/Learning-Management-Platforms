import React from 'react';
import '../styles/Features.css';

const Features = () => {
  const featureData = [
    {
      title: "Learn More Anywhere",
      icon: "📖",
      desc: "Access high-quality learning materials anytime and anywhere, allowing students to study at their own pace with complete flexibility."
    },
    {
      title: "Expert Instructor",
      icon: "❤️",
      desc: "Learn from experienced and highly qualified instructors who provide real-world knowledge and practical insights."
    },
    {
      title: "Team Management",
      icon: "👤",
      desc: "Efficiently manage student groups, track performance, and collaborate with ease through our smart management system."
    },
    {
      title: "Course Planning",
      icon: "👁️",
      desc: "Well-structured course planning that ensures step-by-step learning with clear goals and organized content delivery."
    },
    {
      title: "Teacher Monitoring",
      icon: "💡",
      desc: "Monitor teaching activities, evaluate performance, and ensure quality education through advanced tracking tools."
    },
    {
      title: "24/7 Strong Support",
      icon: "✉️",
      desc: "Get continuous support anytime you need, with a dedicated team ready to solve your queries and guide you."
    }
  ];

  return (
    <>
      <div>
        <section className="features-container">
          <div className="features-header">
            <div className="sub-title-wrapper">
              <span className="sub-title">WHY CHOOSE Climax Academy</span>
              <div className="title-line"></div>
            </div>
            <h2 className="main-title">
              Find The <span className="highlight">Best Features</span> Of Climax Academy
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
    </>
  );
};

export default Features;