import React, { useState } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import AuthModal from '../components/common/AuthModal';
import HeroSection from '../components/landing/HeroSection';
import CategoryCarousel from '../components/landing/CategoryCarousel';
import { accommodations } from '../data/accommodations';
import './LandingPage.css';

const LandingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const handleAuthClick = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleCardClick = (item) => {
    console.log('Card clicked:', item);
  };

  const handleSeeMore = (category) => {
    console.log('See more:', category);
  };

  return (
    <div className="landing-page">
      <Header 
        isLoggedIn={isLoggedIn} 
        onAuthClick={handleAuthClick}
        onLogout={handleLogout}
      />
      
      <AuthModal 
        isOpen={showAuthModal}
        mode={authMode}
        onClose={() => setShowAuthModal(false)}
        onToggleMode={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
        onSubmit={handleAuthSubmit}
      />

      <main className="main-content">
        <HeroSection />
        
        <div className="accommodations-section">
          <div className="accommodations-content">
            <div className="section-header">
              <h2 className="section-title">Choose Your Stay Experience</h2>
              <p className="section-subtitle">
                From luxury hotels to traditional tents, find accommodation that suits your needs for the sacred Kumbh Mela 2027
              </p>
            </div>

            <CategoryCarousel 
              title="Hotels"
              description="Comfortable hotel accommodations with modern amenities near the Kumbh Mela site"
              items={accommodations.hotels}
              onSeeMore={() => handleSeeMore('hotels')}
              onCardClick={handleCardClick}
            />

            <CategoryCarousel 
              title="Homestays"
              description="Experience authentic Nashik hospitality with local families"
              items={accommodations.homestays}
              onSeeMore={() => handleSeeMore('homestays')}
              onCardClick={handleCardClick}
            />

            <CategoryCarousel 
              title="Tents"
              description="Traditional tent accommodations for the authentic Kumbh Mela experience"
              items={accommodations.tents}
              onSeeMore={() => handleSeeMore('tents')}
              onCardClick={handleCardClick}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
