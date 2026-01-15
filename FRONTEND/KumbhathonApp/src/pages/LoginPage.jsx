import React, { useState } from 'react';
import './AuthPages.css';

const LoginPage = ({ onClose, onSwitchToSignup }) => {
  const [userType, setUserType] = useState('customer');
  const [formData, setFormData] = useState({
    mobile: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login:', { userType, ...formData });
    onClose();
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close-btn" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>

        <div className="auth-modal-content">
          {/* Left - Visual */}
          <div className="auth-visual-side">
            <img 
              src="/src/data/img for signup page.png" 
              alt="Kumbhathon" 
              className="auth-visual-image"
            />
          </div>

          {/* Right - Form */}
          <div className="auth-form-side">
            <div className="auth-form-header">
              <h2 className="auth-form-title">Welcome Back</h2>
              <p className="auth-form-subtitle">Sign in to continue your journey</p>
            </div>

            {/* Role Selection */}
            <div className="role-selector">
              <button
                type="button"
                className={`role-btn ${userType === 'customer' ? 'active' : ''}`}
                onClick={() => setUserType('customer')}
              >
                <i className="fas fa-user"></i> Customer
              </button>
              <button
                type="button"
                className={`role-btn ${userType === 'host' ? 'active' : ''}`}
                onClick={() => setUserType('host')}
              >
                <i className="fas fa-home"></i> Host/Owner
              </button>
            </div>

            <form className="auth-form-main" onSubmit={handleSubmit}>
              <div className="auth-input-group">
                <label className="auth-label">Mobile Number</label>
                <input
                  type="tel"
                  className="auth-input"
                  placeholder="Enter mobile number"
                  value={formData.mobile}
                  onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                  required
                />
              </div>

              <div className="auth-input-group">
                <label className="auth-label">Password</label>
                <input
                  type="password"
                  className="auth-input"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
              </div>

              <button type="submit" className="auth-submit-btn">
                Sign In as {userType === 'customer' ? 'Customer' : 'Host'}
              </button>
            </form>

            <div className="auth-divider">
              <span>or</span>
            </div>

            <p className="auth-switch-text">
              Don't have an account?
              <button className="auth-switch-btn" onClick={onSwitchToSignup}>
                Create Account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
