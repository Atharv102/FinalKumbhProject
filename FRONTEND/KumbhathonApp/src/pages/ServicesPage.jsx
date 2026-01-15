import React, { useState, useEffect } from 'react';
import './ServicesPage.css';

const ServicesPage = ({ onBack }) => {
  const services = [
    {
      icon: 'fas fa-shield-alt',
      title: 'Verified Accommodation Discovery',
      description: 'Every stay option is personally verified for safety, cleanliness, and authenticity. We visit each location to ensure it meets our standards for pilgrims and families.',
      color: '#10B981'
    },
    {
      icon: 'fas fa-handshake',
      title: 'Trust & Safety Assurance',
      description: 'All hosts are background-verified with proper documentation. We maintain safety protocols and provide 24/7 support during your stay for complete peace of mind.',
      color: '#3B82F6'
    },
    {
      icon: 'fas fa-balance-scale',
      title: 'Fair Pricing & Transparency',
      description: 'No hidden fees or surprise charges. All prices are clearly displayed upfront. We work with hosts to maintain reasonable rates during the sacred Kumbh period.',
      color: '#8B5CF6'
    },
    {
      icon: 'fas fa-route',
      title: 'Personalized Stay Planning',
      description: 'Get customized recommendations based on your needs, budget, and group size. Our planning tools help you find the right accommodation and nearby amenities.',
      color: '#F59E0B'
    },
    {
      icon: 'fas fa-universal-access',
      title: 'Accessibility & Inclusive Support',
      description: 'Special assistance for elderly pilgrims, families with children, and visitors with accessibility needs. We ensure everyone can participate in this sacred journey.',
      color: '#EF4444'
    },
    {
      icon: 'fas fa-map-marked-alt',
      title: 'Local Guidance & City Navigation',
      description: 'Detailed information about Nashik\'s sacred sites, local customs, and practical guidance. We help you navigate the city with respect and understanding.',
      color: '#06B6D4'
    },
    {
      icon: 'fas fa-phone-alt',
      title: 'Support & Emergency Information',
      description: 'Access to local emergency contacts, medical facilities, and support services. We provide essential information to keep you safe and informed during your visit.',
      color: '#84CC16'
    },
    {
      icon: 'fas fa-users',
      title: 'Community Connection',
      description: 'Connect with fellow pilgrims, local volunteers, and community members. We foster meaningful connections while respecting privacy and personal space.',
      color: '#F97316'
    }
  ];

  const stats = [
    { number: '500+', label: 'Verified Accommodations', icon: 'fas fa-home' },
    { number: '10,000+', label: 'Happy Pilgrims', icon: 'fas fa-users' },
    { number: '24/7', label: 'Support Available', icon: 'fas fa-clock' },
    { number: '100%', label: 'Verified Hosts', icon: 'fas fa-check-circle' }
  ];

  return (
    <div className="services-page">
      <div className="services-content">
        {/* Core Services Section */}
        <section className="core-services-section">
          <div className="section-header">
            <h2 className="section-title">What We Provide</h2>
            <p className="section-description">Comprehensive services designed with pilgrims' needs in mind</p>
          </div>
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card" style={{'--service-color': service.color}}>
                <div className="service-icon">
                  <i className={service.icon}></i>
                </div>
                <div className="service-content">
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                </div>
                <div className="service-hover-effect"></div>
              </div>
            ))}
          </div>
        </section>

        {/* How We Serve People Section */}
        <section className="vision-section">
          <div className="vision-container">
            <div className="vision-header">
              <h2 className="section-title">How We Serve People</h2>
              <div className="title-underline"></div>
            </div>
            <div className="vision-content">
              <div className="vision-card">
                <div className="vision-icon">
                  <i className="fas fa-heart"></i>
                </div>
                <div className="vision-text">
                  <p className="vision-highlight">
                    Aasray is built for pilgrims, families, and visitors who seek safe, dignified accommodation 
                    during one of India's most sacred gatherings.
                  </p>
                  <p>
                    We understand that finding trustworthy places to stay during Kumbh Mela can be overwhelming, 
                    especially for first-time visitors. Our platform uses technology quietly and respectfully—not 
                    to complicate your journey, but to simplify it.
                  </p>
                  <p>
                    Every feature is designed with the needs of real people in mind: elderly pilgrims who need 
                    accessible facilities, families traveling with children, and individuals seeking authentic 
                    spiritual experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust & Responsibility Section */}
        <section className="trust-section">
          <div className="section-header">
            <h2 className="section-title">Our Commitment to You</h2>
            <p className="section-description">Built on trust, powered by care</p>
          </div>
          <div className="trust-grid">
            <div className="trust-item">
              <div className="trust-icon">
                <i className="fas fa-certificate"></i>
              </div>
              <h4>Verified Information</h4>
              <p>
                Every accommodation listing is personally inspected and verified. We visit each location, 
                meet with hosts, and ensure all information is accurate and up-to-date.
              </p>
            </div>
            <div className="trust-item">
              <div className="trust-icon">
                <i className="fas fa-om"></i>
              </div>
              <h4>Cultural Respect</h4>
              <p>
                We work closely with local communities and respect Nashik's traditions. Our platform 
                supports local hosts while maintaining the sanctity of this sacred event.
              </p>
            </div>
            <div className="trust-item">
              <div className="trust-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h4>Safety First</h4>
              <p>
                Your safety is our priority. We maintain strict safety standards, provide emergency 
                contacts, and ensure all accommodations meet basic health and security requirements.
              </p>
            </div>
            <div className="trust-item">
              <div className="trust-icon">
                <i className="fas fa-hands-helping"></i>
              </div>
              <h4>Inclusive Access</h4>
              <p>
                We believe everyone should be able to participate in Kumbh Mela. Our platform includes 
                options for different budgets, accessibility needs, and family requirements.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="contact-section">
          <div className="contact-card">
            <div className="contact-icon">
              <i className="fas fa-headset"></i>
            </div>
            <div className="contact-content">
              <h3>Need Help or Have Questions?</h3>
              <p>
                Our support team is here to assist you in finding the right accommodation and planning 
                your visit to Nashik. We're committed to making your Kumbh Mela experience safe, 
                comfortable, and spiritually fulfilling.
              </p>
              <div className="contact-features">
                <div className="contact-feature">
                  <i className="fas fa-language"></i>
                  <span>Support in Hindi, English, and Marathi</span>
                </div>
                <div className="contact-feature">
                  <i className="fas fa-clock"></i>
                  <span>24/7 Emergency Support</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ServicesPage;