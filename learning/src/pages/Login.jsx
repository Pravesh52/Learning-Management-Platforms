// // import React, { useState } from "react";
// // import "../styles/Login.css";
// // import { Link, useNavigate } from "react-router-dom";
// // import axios from "axios";

// // const Login = () => {
// //   const navigate = useNavigate();

// //   const [formData, setFormData] = useState({
// //     email: "",
// //     password: ""
// //   });

// //   const [error, setError] = useState("");
// //   const [success, setSuccess] = useState("");

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       setError("");
// //       setSuccess("");

// //       const res = await axios.post(
// //         "http://localhost:5000/api/auth/login",
// //         formData
// //       );

// //       // ✅ SAVE DATA
// //       localStorage.setItem("token", res.data.token);
// //       localStorage.setItem("user", JSON.stringify(res.data.user));

// //       setSuccess("Login successful");

// //       // 🔥 CORRECT ROLE BASED REDIRECT (BACKEND SE)
// //       if (res.data.user.role === "admin") {
// //         navigate("/admin");
// //       } else {
// //         navigate("/dashboard");
// //       }

// //     } catch (error) {
// //       setError(error.response?.data?.message || "Invalid credentials");
// //     }
// //   };

// //   return (
// //     <div className="login-container">
// //       <div className="login-box">
// //         <h2>Welcome to Climax Academy</h2>
// //         <p>Login to continue learning</p>

// //         {success && <p style={{ color: "green" }}>{success}</p>}
// //         {error && <p style={{ color: "red" }}>{error}</p>}

// //         <form onSubmit={handleSubmit}>

// //           {/* ❌ ROLE SELECT REMOVE KAR DIYA */}

// //           <input
// //             type="email"
// //             name="email"
// //             placeholder="Enter Email"
// //             value={formData.email}
// //             onChange={handleChange}
// //             required
// //           />

// //           <input
// //             type="password"
// //             name="password"
// //             placeholder="Enter Password"
// //             value={formData.password}
// //             onChange={handleChange}
// //             required
// //           />

// //           <button type="submit">Login</button>
// //         </form>

// //         <p className="switch-text">
// //           Don't have an account?
// //           <Link to="/signup">
// //             <span> Sign Up</span>
// //           </Link>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;


// import React, { useState } from "react";
// import "../styles/Login.css";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// const Login = ({ onClose }) => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: ""
//   });

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setError("");
//       setSuccess("");

//       const res = await axios.post(
//         "http://localhost:5000/api/auth/login",
//         formData
//       );

//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));

//       if (res.data.user.role === "admin") {
//         navigate("/admin");
//       } else {
//         navigate("/dashboard");
//       }

//     } catch (error) {
//       setError(error.response?.data?.message || "Invalid credentials");
//     }
//   };

//   return (
//     <div className="login-overlay" onClick={onClose}>
//       <div
//         className="login-modal"
//         onClick={(e) => e.stopPropagation()}
//       >

//         {/* ❌ CLOSE */}
//         <button className="close-btn" onClick={onClose}>
//           ✖
//         </button>

//         <h2>Climax Academy</h2>
//         <p className="sub-text">Login to continue learning</p>

//         {error && <p className="error">{error}</p>}

//         <form onSubmit={handleSubmit}>
//           <input
//             type="email"
//             name="email"
//             placeholder="Enter Email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Enter Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />

//           <button type="submit">Login</button>
//         </form>

//         <p className="switch-text">
//           Don't have an account?
//           <Link to="/signup"> Sign Up</Link>
//         </p>

//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ onClose }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  // 🔥 CLOSE HANDLER (FINAL FIX)
  const handleClose = () => {
    if (onClose) {
      onClose();          // modal close
    } else {
      navigate("/");      // fallback (route case)
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch (error) {
      setError(error.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="login-overlay" onClick={handleClose}>
      <div
        className="login-modal"
        onClick={(e) => e.stopPropagation()}
      >

        {/* ❌ CLOSE BUTTON */}
        <button className="close-btn" onClick={handleClose}>
          ✖
        </button>

        <h2>Climax Academy</h2>
        <p className="sub-text">Login to continue learning</p>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>
        </form>

        <p className="switch-text">
          Don't have an account?
          <Link to="/signup"> Sign Up</Link>
        </p>

      </div>
    </div>
  );
};

export default Login;