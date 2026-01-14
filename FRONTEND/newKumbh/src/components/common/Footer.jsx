import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-grid">
          <div className="footer-column">
            <div className="footer-logo-container">
              <div className="footer-logo-circle">
                <span className="footer-logo-text">कुं</span>
              </div>
              <div className="footer-logo-text-container">
                <h2 className="footer-logo-title">KUMBHATHON</h2>
                <p className="footer-logo-subtitle">Nashik 2027</p>
              </div>
            </div>
            <p className="footer-description">Smart Accommodation Platform for the Sacred Kumbh Mela 2027 in Nashik</p>
            <div className="social-links">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          
          <div className="footer-column">
            <h3 className="footer-column-title">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">Home</a></li>
              <li><a href="#" className="footer-link">About Kumbh Mela</a></li>
              <li><a href="#" className="footer-link">Accommodation</a></li>
              <li><a href="#" className="footer-link">Nashik Guide</a></li>
              <li><a href="#" className="footer-link">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3 className="footer-column-title">Accommodation Types</h3>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">Hotels</a></li>
              <li><a href="#" className="footer-link">Home Stays</a></li>
              <li><a href="#" className="footer-link">Tent Stays</a></li>
              <li><a href="#" className="footer-link">Ashram Stays</a></li>
              <li><a href="#" className="footer-link">Premium Camps</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3 className="footer-column-title">Contact Us</h3>
            <ul className="contact-info">
              <li className="contact-item">
                <i className="fas fa-map-marker-alt contact-icon"></i>
                <span className="contact-text">Nashik, Maharashtra, India</span>
              </li>
              <li className="contact-item">
                <i className="fas fa-phone contact-icon"></i>
                <span className="contact-text">+91 1800 123 4567</span>
              </li>
              <li className="contact-item">
                <i className="fas fa-envelope contact-icon"></i>
                <span className="contact-text">support@kumbhathon2027.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">© 2027 Kumbhathon - Smart Accommodation Platform for Kumbh Mela 2027. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
