import React, { useState } from 'react';
import './AuthPages.css';

const SignUpPage = ({ onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign Up:', formData);
  };

  return (
    <div className="auth-page">
      {/* Left Panel - Form */}
      <div className="auth-form-panel">
        <div className="auth-form-container">
          <div className="auth-header">
            <h1 className="auth-title">Create Your Account</h1>
            <p className="auth-subtitle">Join thousands of pilgrims finding trusted stays for Kumbh Mela 2027</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>

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
                placeholder="Create a strong password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                required
              />
            </div>

            <button type="submit" className="auth-btn-primary">
              Create Account
            </button>

            <div className="auth-trust-badge">
              <i className="fas fa-lock"></i>
              <span>Secure registration • Your information is safe with us</span>
            </div>
          </form>

          <div className="auth-footer">
            <p className="auth-switch">
              Already have an account? 
              <button className="auth-link" onClick={onSwitchToLogin}>Sign In</button>
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
            <h2 className="visual-heading">Trustworthy Stays</h2>
            <p className="visual-subheading">Verified Accommodations</p>
            <p className="visual-description">
              Every property is verified for safety and authenticity. 
              Book with confidence for your once-in-a-lifetime pilgrimage.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
