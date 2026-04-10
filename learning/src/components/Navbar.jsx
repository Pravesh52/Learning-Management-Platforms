// // // import React from "react";
// // // import "../styles/Navbar.css";
// // // import { Link } from "react-router-dom";
// // // import { useNavigate } from "react-router-dom";
// // // import { FaSearch, FaShoppingCart, FaGraduationCap } from "react-icons/fa";

// // // const Navbar = () => {
// // //   const navigate = useNavigate(); // useNavigate hook
// // //   return (
// // //     <nav className="navbar">
// // //       {/* Logo */}
// // //       <div className="logo">
// // //         <FaGraduationCap className="logo-icon" />
// // //         <span>SkillStack</span>
// // //       </div>

// // //       {/* Menu */}
// // //       <ul className="nav-links">
// // //          <li onClick={() => navigate("/")}>Home</li>
// // //         <li onClick={() => navigate("/pages")}>Pages</li>
// // //         <li onClick={() => navigate("/courses")}>Courses</li>
// // //         <li onClick={() => navigate("/Blog")}>Blog</li>
// // //         <li onClick={() => navigate("/Footer")}>Contact</li>
// // //       </ul>

// // //       {/* Right Section */}
// // //       <div className="nav-right">
        
// // //         <FaSearch className="icon" />

// // //         <div className="cart">
// // //           <FaShoppingCart className="icon" />
// // //           <span className="badge">0</span>
// // //         </div>

       


// // //   <Link to="/login">
// // //     <button className="login-btn">Login</button>
// // //   </Link>

// // //   <Link to="/signup">
// // //     <button className="signup-btn">Sign Up</button>
// // //   </Link>
// // // </div>
      
// // //     </nav>
// // //   );
// // // };

// // // export default Navbar;


// // import React from "react";
// // import "../styles/Navbar.css";
// // import { Link } from "react-router-dom";
// // import { FaSearch, FaShoppingCart, FaGraduationCap } from "react-icons/fa";

// // const Navbar = () => {
// //   return (
// //     <nav className="navbar">

// //       {/* Logo */}
// //       <div className="logo">
// //         <FaGraduationCap className="logo-icon" />
// //         <span>SkillStack</span>
// //       </div>

// //       {/* Menu */}
// //       <ul className="nav-links">
// //         <li><Link to="/">Home</Link></li>
// //         <li><Link to="/course">Courses</Link></li>
// //         <li><Link to="/blog">Blog</Link></li>
// //         <li><Link to="/contact">Contact</Link></li>
// //       </ul>

// //       {/* Right Section */}
// //       <div className="nav-right">
// //         <FaSearch className="icon" />

// //         <div className="cart">
// //           <FaShoppingCart className="icon" />
// //           <span className="badge">0</span>
// //         </div>

// //         <Link to="/login">
// //           <button className="login-btn">Login</button>
// //         </Link>

// //         <Link to="/signup">
// //           <button className="signup-btn">Sign Up</button>
// //         </Link>
// //       </div>

// //     </nav>
// //   );
// // };

// // export default Navbar;

// import React from "react";
// import "../styles/Navbar.css";
// import { Link } from "react-router-dom";
// import { FaSearch, FaShoppingCart, FaGraduationCap } from "react-icons/fa";

// const Navbar = () => {
//   return (
//     <nav className="navbar">

//       {/* Logo */}
//       <div className="logo">
//         <FaGraduationCap className="logo-icon" />
//         <span>SkillStack</span>
//       </div>

//       {/* Menu */}
//       <ul className="nav-links">
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/courses">Courses</Link></li>
//         <li><Link to="/blog">Blog</Link></li>
//         <li><a href="/#Footer">Contact</a></li>
//       </ul>

//       {/* Right Section */}
//       <div className="nav-right">
//         <FaSearch className="icon" />

//         <div className="cart">
//           <FaShoppingCart className="icon" />
//           <span className="badge">0</span>
//         </div>

//         <Link to="/login">
//           <button className="login-btn">Login</button>
//         </Link>

//         <Link to="/signup">
//           <button className="signup-btn">Sign Up</button>
//         </Link>
//       </div>

//     </nav>
//   );
// };

// export default Navbar;


import React from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaGraduationCap } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="logo">
        <FaGraduationCap className="logo-icon" />
        <span>SkillStack</span>
      </div>

      {/* Menu */}
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/pages">Pages</Link></li>
        <li>
          {/* Contact → scroll to footer */}
          <a href="/Footer">Contact</a>
        </li>
      </ul>

      {/* Right Section */}
      <div className="nav-right">
        <FaSearch className="icon" />

        <div className="cart">
          <FaShoppingCart className="icon" />
          <span className="badge">0</span>
        </div>

        <Link to="/login">
          <button className="login-btn">Login</button>
        </Link>

        <Link to="/signup">
          <button className="signup-btn">Sign Up</button>
        </Link>
      </div>

    </nav>
  );
};

export default Navbar;