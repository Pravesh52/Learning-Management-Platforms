import React, { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Image from "../assets/Image.png"

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobilenumber: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

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
      setLoading(true);

      const res = await axios.post(`${BASE_URL}/api/auth/signup`, {
        name: formData.name,
        email: formData.email,
        mobilenumber: formData.mobilenumber,
        password: formData.password,
      });

      setSuccess(res.data.message);
      setError("");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setSuccess("");
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container signup-container">
        {/* LEFT BRANDING PANEL */}
        <div className="auth-branding-panel">
          {/* <img src="/logo.png" alt="Climax Academy" className="auth-logo" /> */}
          <img src={Image} alt="Climax Academy" className="auth-logo" />
          <h2>Climax Academy</h2>
          <p>
            Join thousands of students achieving academic excellence with structured guidance
            and personalized attention.
          </p>
          <div className="auth-branding-stats">
            <div>
              <h3>10000+</h3>
              <span>Students</span>
            </div>
            <div>
              <h3>15+</h3>
              <span>Years</span>
            </div>
            <div>
              <h3>1000+</h3>
              <span>Toppers</span>
            </div>
          </div>
        </div>

        {/* RIGHT FORM PANEL */}
        <div className="auth-form-panel">
          <h2>Create Account</h2>
          <p className="auth-sub-text">Join Climax Academy today</p>

          {success && <p className="auth-success">{success}</p>}
          {error && <p className="auth-error">{error}</p>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-input-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="auth-input-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="auth-input-group">
              <label>Mobile Number</label>
              <input
                type="number"
                name="mobilenumber"
                placeholder="10-digit mobile number"
                value={formData.mobilenumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="auth-form-row">
              <div className="auth-input-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Create password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="auth-input-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Re-enter password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <p className="auth-switch-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>

          <Link to="/" className="auth-back-home">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;