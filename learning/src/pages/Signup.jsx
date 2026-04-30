


import React, { useState } from "react";
import "../styles/Signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobilenumber:"",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 🔥 CLOSE HANDLER
  const handleClose = () => {
    navigate("/");   // back to home
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setSuccess("");
      return;
    }

    try {
      setError("");

      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          name: formData.name,
          email: formData.email,
          mobilenumber:formData.mobilenumber,
          password: formData.password
        }
      );

      setSuccess(res.data.message);
      setError("");

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (error) {
      setSuccess("");
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="signup-overlay">
      <div className="signup-modal">

        {/* ❌ CLOSE BUTTON */}
        <button className="close-btn" onClick={handleClose}>
          ✖
        </button>

        <h2>Create Account</h2>
        <p>Join Climax Academy today</p>

        {success && <p style={{ color: "green" }}>{success}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input

          type="number"
          name="mobilenumber"
          placeholder="Enter Mobile Number"
          value={formData.mobilenumber}
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

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit">Sign Up</button>
        </form>

        <p className="switch-text">
          Already have an account?
          <Link to="/login">
            <span> Login</span>
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Signup;