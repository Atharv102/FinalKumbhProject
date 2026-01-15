import React, { useState } from 'react';
import './AuthPages.css';

const LoginPage = ({ onClose, onSwitchToSignup }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login:', formData);
  };

  return (
    <div className="auth-page">
      {/* Left Panel - Form */}
      <div className="auth-form-panel">
        <div className="auth-form-container">
          <div className="auth-header">
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Sign in to continue your journey with trusted accommodations</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>

            <button type="submit" className="auth-btn-primary">
              Sign In Securely
            </button>

            <div className="auth-trust-badge">
              <i className="fas fa-shield-alt"></i>
              <span>Your data is protected with industry-standard encryption</span>
            </div>
          </form>

          <div className="auth-footer">
            <p className="auth-switch">
              Don't have an account? 
              <button className="auth-link" onClick={onSwitchToSignup}>Create Account</button>
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Visual Storytelling */}
      <div className="auth-visual-panel">
        <div className="visual-content">
          <div className="visual-shape shape-1"></div>
          <div className="visual-shape shape-2"></div>
          <div className="visual-shape shape-3"></div>
          
          <div className="visual-text">
            <h2 className="visual-heading">Kumbh Mela 2027</h2>
            <p className="visual-subheading">Nashik, Maharashtra</p>
            <p className="visual-description">
              Experience the sacred gathering with verified, trustworthy accommodations. 
              Your spiritual journey begins with peace of mind.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
