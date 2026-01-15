import React, { useState } from 'react';
import './Header.css';

const Header = ({ isLoggedIn, onAuthClick, onLogout }) => {
  const [hoveredNav, setHoveredNav] = useState(null);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'accommodation', label: 'Accommodation' },
    { id: 'explore', label: 'Explore Nashik' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact Us' }
  ];

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container">
          <div className="logo-circle">
            <span className="logo-text">कुं</span>
          </div>
          <div className="logo-text-container">
            <h1 className="logo-title">KUMBHATHON</h1>
            <p className="logo-subtitle">Nashik 2027</p>
          </div>
        </div>
        
        <nav className="main-nav">
          {navItems.map((item) => (
            <a 
              key={item.id}
              href="#" 
              className={`nav-link ${hoveredNav === item.id ? 'nav-link-hovered' : ''}`}
              onMouseEnter={() => setHoveredNav(item.id)}
              onMouseLeave={() => setHoveredNav(null)}
            >
              {item.label}
            </a>
          ))}
        </nav>
        
        <div className="auth-section">
          {!isLoggedIn ? (
            <>
              <button onClick={() => onAuthClick('signup')} className="signup-btn">Sign Up</button>
              <button onClick={() => onAuthClick('login')} className="login-btn">Login</button>
            </>
          ) : (
            <div className="profile-container">
              <div className="profile-info">
                <p className="profile-name">Harish Patel</p>
                <p className="profile-role">Pilgrim</p>
              </div>
              <div className="profile-icon">
                <span className="profile-initials">HP</span>
              </div>
              <button onClick={onLogout} className="logout-btn">Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
