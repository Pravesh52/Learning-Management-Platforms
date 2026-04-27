import React from 'react';
import '../styles/Page.css'; 
import studyImage from '../assets/about.png'; 

const Page = () => {
 
  const imageBackgroundStyle = {
    backgroundImage: `url(${studyImage})`,
  };

  return (
    <>
      <div className="container">
        <div className="content-wrapper">
          
          {/* Left Side: Image Section */}
          <div className="image-section">
            <div className="mask-item mask-1" style={imageBackgroundStyle}></div>
            <div className="mask-item mask-2" style={imageBackgroundStyle}></div>
            <div className="mask-item mask-3" style={imageBackgroundStyle}></div>
          </div>

          {/* Right Side: Text Section */}
          <div className="text-section">
            <h1 className="main-title">
              Learn New Skills To Go <span className="highlight-ahead">Ahead</span><br />
              <span className="highlight-for-your">For Your</span> Career.
            </h1>

            <p className="description">
              At Climax Academy, we provide high-quality education designed to help you build real-world skills. 
              Our courses are structured to enhance your knowledge, boost your confidence, and prepare you 
              for a successful career in today’s competitive world.
            </p>

            <div className="info-card">
              <div className="icon-box mission-icon">
                <span className="icon">🏆</span>
              </div>
              <div className="info-content">
                <h3>Our Mission</h3>
                <p>
                  Our mission is to empower students with practical skills and industry-relevant knowledge 
                  through expert guidance, innovative teaching methods, and continuous support.
                </p>
              </div>
            </div>

            <div className="info-card">
              <div className="icon-box vision-icon">
                <span className="icon">🪄</span>
              </div>
              <div className="info-content">
                <h3>Our Vision</h3>
                <p>
                  Our vision is to become a leading learning platform that transforms education by making 
                  it accessible, engaging, and career-focused for learners across the globe.
                </p>
              </div>
            </div>

            <button className="discover-btn">Discover More</button>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default Page;