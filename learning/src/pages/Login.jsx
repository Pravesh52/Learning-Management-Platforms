import React, { useState } from "react";
import "../styles/Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome to SkillStack</h2>
        <p>Login to continue learning</p>

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