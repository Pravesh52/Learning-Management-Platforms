import React from 'react';
import '../styles/Page.css'; 
import studyImage from '../assets/about.png'; 
import Features from './Features';
// import { Router } from 'react-router-dom';

const Page = () => {
 
  const imageBackgroundStyle = {
    backgroundImage: `url(${studyImage})`,
  };

  return (
    <>
    <div className="container">
      <div className="content-wrapper">
        
        {/* Left Side: Photo Section with 3 Panes */}
        <div className="image-section">
          {/* Har pane mein unique internal style hai (width, margin, position) aur upar define ki gayi studyImage apply hai */}
          <div className="mask-item mask-1" style={imageBackgroundStyle}></div>
          <div className="mask-item mask-2" style={imageBackgroundStyle}></div>
          <div className="mask-item mask-3" style={imageBackgroundStyle}></div>
        </div>

        {/* Right Side: Text Content Section */}
        <div className="text-section">
          <h1 className="main-title">
            Learn New Skills To Go <span className="highlight-ahead">Ahead</span><br />
            <span className="highlight-for-your">For Your</span> Career.
          </h1>
          <p className="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          <div className="info-card">
            <div className="icon-box mission-icon">
              {/* Green icon path for Mission (using simplified emoji for now, replaceable with SVG if needed) */}
              <span className="icon">🏆</span>
            </div>
            <div className="info-content">
              <h3>Our Mission</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor ut labore.</p>
            </div>
          </div>

          <div className="info-card">
            <div className="icon-box vision-icon">
              {/* Green icon path for Vision */}
              <span className="icon">🪄</span>
            </div>
            <div className="info-content">
              <h3>Our Vision</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor ut labore.</p>
            </div>
          </div>

          <button className="discover-btn">Discover More</button>
        </div>
        
      </div>
      
    </div>
    
        <Features/>
    </>
    
       
  );
};

export default Page;