import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Image from "../assets/Image.png"

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      const res = await axios.post(`${BASE_URL}/api/auth/login`, formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* LEFT BRANDING PANEL */}
        <div className="auth-branding-panel">
          {/* <img src="/l.png" alt="Climax Academy" className="auth-logo" /> */}
          <img src={Image} alt="Climax Academy" className="auth-logo" />
          <h2>Climax Academy</h2>
          <p>
            Correct guidance, well planned and consistent hard work lead to a bright future.
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
          <h2>Welcome Back</h2>
          <p className="auth-sub-text">Login to continue your learning journey</p>

          {error && <p className="auth-error">{error}</p>}

          <form onSubmit={handleSubmit} className="auth-form">
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
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="auth-switch-text">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>

          <Link to="/" className="auth-back-home">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;