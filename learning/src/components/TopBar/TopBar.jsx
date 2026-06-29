import React from "react";
import "./TopBar.css";

const TopBar = () => {
  return (
    <div className="top-utility-bar">
      <span className="follow-us-text">Follow us on</span>
      <div className="top-bar-socials">
        <a
          href="https://www.instagram.com/_i_pravesh/"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
        >
          📷
        </a>
        <a
          href="https://www.youtube.com/@praveshtiwari4135"
          target="_blank"
          rel="noreferrer"
          aria-label="YouTube"
        >
          ▶️
        </a>
      </div>
    </div>
  );
};

export default TopBar;