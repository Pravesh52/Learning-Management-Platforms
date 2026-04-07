// import React from "react";
// import "../styles/Footer.css";
// import {
//   FaFacebookF,
//   FaInstagram,
//   FaYoutube,
//   FaPinterestP,
// } from "react-icons/fa";
// import { FiPhone, FiMail, FiMap } from "react-icons/fi";

// const Footer = () => {
//   return (
//     <footer className="footer">
//       <div className="footer-container">

//         {/* LEFT */}
//         <div className="footer-col">
//           <h2 className="logo">SkillStack</h2>
//           <p>
//             SkillStack is a modern learning platform designed to empower students with high-quality courses, expert guidance, and real-world skills for a successful future.
//           </p>

//           <div className="socials">
//             <span>CONNECT WITH:</span>
//             <FaInstagram />
//             <FaFacebookF />
//             <FaYoutube />
//             <FaPinterestP />
//           </div>
//         </div>

//         {/* COURSES */}
//         <div className="footer-col">
//           <h3>Courses</h3>
//           <ul>
//             <li>Creative Writing</li>
//             <li>Digital Marketing</li>
//             <li>SEO Business</li>
//             <li>Social Marketing</li>
//             <li>Graphic Design</li>
//             <li>Website Development</li>
//           </ul>
//         </div>

//         {/* COMPANY */}
//         <div className="footer-col">
//           <h3>Company</h3>
//           <ul>
//             <li>About Us</li>
//             <li>Knowledge Base</li>
//             <li>Affiliate Program</li>
//             <li>Community</li>
//             <li>Market API</li>
//             <li>Support Team</li>
//           </ul>
//         </div>

//         {/* CONTACT */}
//         <div className="footer-col">
//           <h3>Contact Info</h3>

//           <div className="contact-item">
//             <FiPhone />
//             <div>
//               <h4>Phone Number</h4>
//               <p>+91 1234567895</p>
//             </div>
//           </div>

//           <div className="contact-item">
//             <FiMail />
//             <div>
//               <h4>Email Address</h4>
//               <p>Pravesht252@gmail.com</p>
//             </div>
//           </div>

//           <div className="contact-item">
//             <FiMap />
//             <div>
//               <h4>Location</h4>
//               <p>Jabalpur Madhya Pradesh, India</p>
//             </div>
//           </div>
//         </div>

//       </div>

//       {/* BOTTOM */}
//       <div className="footer-bottom">
//         <p>© 2026 SkillStack. All Rights Reserved</p>

//         <div className="footer-links">
//           <span>Terms & Conditions</span>
//           <span>Special</span>
//           <span>Privacy Policy</span>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import React from "react";
import "../styles/Footer.css";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaPinterestP,
} from "react-icons/fa";
import { FiPhone, FiMail, FiMap } from "react-icons/fi";

const Footer = () => {
  return (
    <footer id="footer" className="footer">
      <div className="footer-container">

        {/* LEFT */}
        <div className="footer-col">
          <h2 className="logo">SkillStack</h2>
          <p>
            SkillStack is a modern learning platform designed to empower students with high-quality courses.
          </p>

          <div className="socials">
            <span>CONNECT WITH:</span>
            <FaInstagram />
            <FaFacebookF />
            <FaYoutube />
            <FaPinterestP />
          </div>
        </div>

        {/* COURSES */}
        <div className="footer-col">
          <h3>Courses</h3>
          <ul>
            <li>Creative Writing</li>
            <li>Digital Marketing</li>
            <li>SEO Business</li>
            <li>Social Marketing</li>
            <li>Graphic Design</li>
            <li>Website Development</li>
          </ul>
        </div>

        {/* COMPANY */}
        <div className="footer-col">
          <h3>Company</h3>
          <ul>
            <li>About Us</li>
            <li>Knowledge Base</li>
            <li>Affiliate Program</li>
            <li>Community</li>
            <li>Market API</li>
            <li>Support Team</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="footer-col">
          <h3>Contact Info</h3>

          <div className="contact-item">
            <FiPhone />
            <div>
              <h4>Phone Number</h4>
              <p>+91 1234567895</p>
            </div>
          </div>

          <div className="contact-item">
            <FiMail />
            <div>
              <h4>Email Address</h4>
              <p>Pravesht252@gmail.com</p>
            </div>
          </div>

          <div className="contact-item">
            <FiMap />
            <div>
              <h4>Location</h4>
              <p>Jabalpur, India</p>
            </div>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 SkillStack. All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;