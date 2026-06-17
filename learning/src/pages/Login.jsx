


import React, { useState } from "react";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     setError("");

  //             const res = await axios.post(
  //               `${BASE_URL}/api/auth/login`,
  //               formData
  //              );

  //     localStorage.setItem("token", res.data.token);
  //     localStorage.setItem("user", JSON.stringify(res.data.user));

  //     if (res.data.user.role === "admin") {
  //       navigate("/admin");
  //     } else {
  //       navigate("/dashboard");
  //     }

  //   } catch (error) {
  //     setError(error.response?.data?.message || "Invalid credentials");
  //   }
  // };

  const handleSubmit = async (e) => {
            e.preventDefault();

            try {
            setError("");

            const res = await axios.post(
              `${BASE_URL}/api/auth/login`,
              formData
            );

            // Session Storage Use Karo
            sessionStorage.setItem("token", res.data.token);
            sessionStorage.setItem("user", JSON.stringify(res.data.user));

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