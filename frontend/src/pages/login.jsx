import React, { useState } from "react";
import "../App.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted");
  };

  return (
    <div className="login-page">

      {/* Background Effects */}
      <div className="red-glow glow-one"></div>
      <div className="red-glow glow-two"></div>

      <div className="web web-1"></div>
      <div className="web web-2"></div>
      <div className="web web-3"></div>

      {/* Main Container */}
      <div className="login-container">

      

        {/* RIGHT SIDE */}
        <div className="login-card">

          <div className="card-top">
            <span className="card-label">MISSION CONTROL</span>
            <span className="status-dot"></span>
          </div>

          <h2>LOGIN</h2>

          <p className="login-subtitle">
            Enter your details to continue your journey.
          </p>

          <form onSubmit={handleSubmit}>

            {/* EMAIL */}
            <div className="input-group">
              <label>EMAIL</label>

              <input
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="input-group">
              <label>PASSWORD</label>

              <div className="password-box">

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                />

                <button
                  type="button"
                  className="show-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>

              </div>
            </div>

            {/* OPTIONS */}
            <div className="login-options">

              <label className="remember">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>

              <a href="#">
                Forgot Password?
              </a>

            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="login-btn"
            >
              <span>LOGIN</span>
              <span className="arrow">→</span>
            </button>

          </form>

          {/* DIVIDER */}
          <div className="divider">
            <span></span>
            <p>OR</p>
            <span></span>
          </div>

          {/* SIGN UP */}
          <p className="signup-text">
            New to the mission?
            <a href="#"> CREATE ACCOUNT</a>
          </p>

        </div>

      </div>
    </div>
  );
}

export default Login;