// import React from "react";
// import "./TopBar.css";

// const TopBar = () => {
//   return (
//     <div className="top-utility-bar">
//       <span className="follow-us-text">Follow us on</span>
//       <div className="top-bar-socials">
//         <a
//           href="https://www.instagram.com/_i_pravesh/"
//           target="_blank"
//           rel="noreferrer"
//           aria-label="Instagram"
//         >
//           📷
//         </a>
//         <a
//           href="https://www.youtube.com/@praveshtiwari4135"
//           target="_blank"
//           rel="noreferrer"
//           aria-label="YouTube"
//         >
//           ▶️
//         </a>
//       </div>
//     </div>
//   );
// };

// export default TopBar;


import React from "react";
import "./TopBar.css";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

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
          <FaInstagram />
        </a>

        <a
          href="https://www.youtube.com/@praveshtiwari4135"
          target="_blank"
          rel="noreferrer"
          aria-label="YouTube"
        >
          <FaYoutube />
        </a>

        <a
            href="https://facebook.com/yourprofile"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            >
            <FaFacebook />
        </a>

      </div>
    </div>
  );
};

export default TopBar;