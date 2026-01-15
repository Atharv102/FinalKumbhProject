import React from 'react';
import './AuthModal.css';

const AuthModal = ({ isOpen, mode, onClose, onToggleMode, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2 className="modal-title">{mode === 'login' ? 'Login' : 'Sign Up'}</h2>
        <form className="auth-form" onSubmit={onSubmit}>
          {mode === 'signup' && (
            <input type="text" placeholder="Full Name" className="auth-input" required />
          )}
          <input type="email" placeholder="Email" className="auth-input" required />
          <input type="password" placeholder="Password" className="auth-input" required />
          {mode === 'signup' && (
            <input type="password" placeholder="Confirm Password" className="auth-input" required />
          )}
          <button type="submit" className="auth-submit-btn">
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <p className="auth-switch">
          {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
          <span onClick={onToggleMode} className="auth-switch-link">
            {mode === 'login' ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
