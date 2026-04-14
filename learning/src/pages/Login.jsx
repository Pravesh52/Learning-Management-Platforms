// import React, { useState } from "react";
// import "../styles/Login.css";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// const Login = () => {
//   const navigate = useNavigate(); // ✅ redirect

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

//       // ✅ SAVE DATA
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));

//       setSuccess("Login successful");

//       // 🔥 REDIRECT TO HOME
//       navigate("/");

//     } catch (error) {
//       setError(error.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h2>Welcome to SkillStack</h2>
//         <p>Login to continue learning</p>

//         {/* ✅ SUCCESS */}
//         {success && <p style={{ color: "green" }}>{success}</p>}

//         {/* ❌ ERROR */}
//         {error && <p style={{ color: "red" }}>{error}</p>}

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
//           <Link to="/signup">
//             <span> Sign Up</span>
//           </Link>
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

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setSuccess("");

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      // ✅ SAVE DATA
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setSuccess("Login successful");

      // 🔥 ROLE BASED REDIRECT
      if (res.data.user.role === "admin") {
        navigate("/admin");      // 👑 admin dashboard
      } else {
        navigate("/dashboard");  // 👤 user dashboard
      }

    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome to SkillStack</h2>
        <p>Login to continue learning</p>

        {success && <p style={{ color: "green" }}>{success}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

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
          <Link to="/signup">
            <span> Sign Up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;