import React, { useState } from 'react';
import './App.css';
import AllHotels from './AllHotels';
import HotelDetail from './HotelDetail';

const KumbhathonLandingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [selectedCard, setSelectedCard] = useState(null);
  const [showAllPage, setShowAllPage] = useState(null);
  const [viewMode, setViewMode] = useState('home'); // 'home', 'list', 'detail'

  const handleLoginToggle = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  const accommodations = {
    hotels: [
      { id: 1, name: "Triveni Riverside Hotel", price: "₹2,499", rating: 4.5, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", location: "Near Godavari River, Nashik", amenities: "Free WiFi, Pool, Restaurant", description: "Luxurious riverside hotel with stunning views of the Godavari River. Perfect for pilgrims seeking comfort." },
      { id: 2, name: "Godavari Grand Hotel", price: "₹3,299", rating: 4.7, image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", location: "Near Godavari River, Nashik", amenities: "Spa, Gym, Free Breakfast", description: "Grand hotel offering premium amenities and exceptional service for a memorable stay." },
      { id: 3, name: "Nashik City Palace", price: "₹4,999", rating: 4.9, image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", location: "Near Godavari River, Nashik", amenities: "Concierge, Valet, Fine Dining", description: "Experience royal hospitality at this palace-style hotel with world-class facilities." },
      { id: 4, name: "Kumbh Mela View Hotel", price: "₹1,999", rating: 4.2, image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", location: "Near Godavari River, Nashik", amenities: "AC Rooms, Parking, 24/7 Service", description: "Budget-friendly hotel with direct views of the Kumbh Mela grounds." },
      { id: 5, name: "Panchavati Heritage Hotel", price: "₹2,799", rating: 4.6, image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", location: "Panchavati, Nashik", amenities: "Heritage Architecture, Garden", description: "Stay in a heritage property with traditional Maharashtrian architecture and modern comforts." },
      { id: 6, name: "Ramkund Plaza Hotel", price: "₹3,499", rating: 4.8, image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", location: "Near Ramkund, Nashik", amenities: "Rooftop Restaurant, WiFi", description: "Modern hotel near the sacred Ramkund with excellent facilities and service." },
      { id: 7, name: "Tapovan Retreat", price: "₹2,199", rating: 4.4, image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", location: "Tapovan, Nashik", amenities: "Peaceful Location, Garden", description: "Peaceful retreat away from the city hustle, perfect for spiritual seekers." }
    ],
    homestays: [
      { id: 1, name: "Sacred Family Homestay", price: "₹1,299", rating: 4.8, image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", location: "Local family homes, Nashik", amenities: "Home-cooked meals, WiFi", description: "Experience authentic Nashik hospitality with a local family in their traditional home." },
      { id: 2, name: "Godavari Riverside Home", price: "₹2,199", rating: 4.6, image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", location: "Local family homes, Nashik", amenities: "Garden, Kitchen access", description: "Peaceful riverside homestay offering tranquility and local cultural experiences." },
      { id: 3, name: "Traditional Nashik House", price: "₹1,799", rating: 4.4, image: "https://images.unsplash.com/photo-1585543805890-6051f7829f98?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", location: "Local family homes, Nashik", amenities: "Traditional decor, Meals", description: "Stay in a beautifully preserved traditional house with modern comforts." },
      { id: 4, name: "Pilgrim Family Stay", price: "₹999", rating: 4.3, image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", location: "Local family homes, Nashik", amenities: "Basic amenities, Clean rooms", description: "Affordable and welcoming homestay perfect for budget-conscious pilgrims." },
      { id: 5, name: "Vineyard View Homestay", price: "₹1,599", rating: 4.7, image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", location: "Nashik Vineyards", amenities: "Vineyard tours, Breakfast", description: "Unique homestay experience in Nashik's famous vineyard region." },
      { id: 6, name: "Panchavati Family Home", price: "₹1,399", rating: 4.5, image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", location: "Panchavati, Nashik", amenities: "Home meals, Cultural tours", description: "Experience local culture and traditions with a warm Nashik family." },
      { id: 7, name: "Riverside Cottage Stay", price: "₹1,899", rating: 4.6, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", location: "Godavari Banks, Nashik", amenities: "River view, Private garden", description: "Charming cottage stay right by the Godavari river with stunning views." }
    ],
    tents: [
      { id: 1, name: "Premium Pilgrim Tent", price: "₹499", rating: 4.5, image: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", location: "Kumbh Mela Grounds, Nashik", amenities: "Bedding, Lighting, Security", description: "Comfortable tent accommodation right at the heart of Kumbh Mela grounds." },
      { id: 2, name: "River View Camping Tent", price: "₹699", rating: 4.7, image: "https://images.unsplash.com/photo-1537905569824-f89f14cceb68?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", location: "Kumbh Mela Grounds, Nashik", amenities: "River view, Mattress, Blankets", description: "Premium camping experience with beautiful river views and enhanced comfort." },
      { id: 3, name: "Family Group Tent", price: "₹1,299", rating: 4.2, image: "https://images.unsplash.com/photo-1563299796-17596ed6b017?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", location: "Kumbh Mela Grounds, Nashik", amenities: "Large space, Multiple beds", description: "Spacious tent perfect for families and groups attending the Kumbh Mela together." },
      { id: 4, name: "Basic Pilgrim Tent", price: "₹299", rating: 3.9, image: "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", location: "Kumbh Mela Grounds, Nashik", amenities: "Basic shelter, Mat", description: "Simple and affordable tent accommodation for the authentic pilgrimage experience." },
      { id: 5, name: "Deluxe Camping Tent", price: "₹899", rating: 4.6, image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", location: "Kumbh Mela Grounds, Nashik", amenities: "AC, Comfortable beds, Attached bath", description: "Luxury camping experience with air conditioning and modern amenities." },
      { id: 6, name: "Eco-Friendly Tent", price: "₹599", rating: 4.4, image: "https://images.unsplash.com/photo-1445308394109-4ec2920981b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", location: "Kumbh Mela Grounds, Nashik", amenities: "Eco-friendly, Solar power", description: "Sustainable camping option with eco-friendly facilities and solar power." },
      { id: 7, name: "VIP Pilgrim Tent", price: "₹1,499", rating: 4.8, image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", location: "Kumbh Mela Grounds, Nashik", amenities: "Premium bedding, Private area", description: "VIP tent accommodation with exclusive amenities and prime location." }
    ]
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'accommodation', label: 'Accommodation' },
    { id: 'explore', label: 'Explore Nashik' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact Us' }
  ];

  return (
    <div className="kumbhathon-container">
      {viewMode === 'home' && (
      <>
      {/* Header/Navbar */}
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
          
          {/* Navigation */}
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
          
          {/* Auth/Profile Section */}
          <div className="auth-section">
            {!isLoggedIn ? (
              <>
                <button onClick={() => openAuthModal('signup')} className="signup-btn">Sign Up</button>
                <button 
                  onClick={() => openAuthModal('login')}
                  className="login-btn"
                >
                  Login
                </button>
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
                <button 
                  onClick={handleLoginToggle}
                  className="logout-btn"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="modal-overlay" onClick={closeAuthModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeAuthModal}>×</button>
            <h2 className="modal-title">{authMode === 'login' ? 'Login' : 'Sign Up'}</h2>
            <form className="auth-form">
              {authMode === 'signup' && (
                <input type="text" placeholder="Full Name" className="auth-input" />
              )}
              <input type="email" placeholder="Email" className="auth-input" />
              <input type="password" placeholder="Password" className="auth-input" />
              {authMode === 'signup' && (
                <input type="password" placeholder="Confirm Password" className="auth-input" />
              )}
              <button type="submit" className="auth-submit-btn" onClick={(e) => { e.preventDefault(); handleLoginToggle(); closeAuthModal(); }}>
                {authMode === 'login' ? 'Login' : 'Sign Up'}
              </button>
            </form>
            <p className="auth-switch">
              {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
              <span onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')} className="auth-switch-link">
                {authMode === 'login' ? 'Sign Up' : 'Login'}
              </span>
            </p>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <main className="main-content">
        <div className="hero-section">
          <h1 className="hero-title-top">Experience Kumbh 2027 in Nashik</h1>
          <div className="hero-image">
            <div className="hero-overlay">
            </div>
          </div>

          {/* Search Bar */}
          <div className="search-container">
            <div className="search-box">
              <div className="search-grid">
                <div className="search-field">
                  <input 
                    type="text" 
                    className="search-input"
                    placeholder="Location"
                    defaultValue="Nashik, Maharashtra"
                  />
                </div>
                
                <div className="search-field">
                  <input 
                    type="date" 
                    className="search-input"
                    placeholder="Check-in"
                  />
                </div>
                
                <div className="search-field">
                  <input 
                    type="date" 
                    className="search-input"
                    placeholder="Check-out"
                  />
                </div>
                
                <div className="search-field">
                  <input 
                    type="text" 
                    className="search-input"
                    placeholder="Guests"
                    defaultValue="2 guests"
                  />
                </div>
                
                <button className="search-button">
                  <i className="fas fa-search"></i>
                  <span>Search</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Accommodation Sections */}
        <div className="accommodation-section">
          <div className="accommodation-content">
            <div className="section-header">
              <h2 className="section-title">Choose Your Stay Experience</h2>
              <p className="section-subtitle">From luxury hotels to traditional tents, find accommodation that suits your needs for the sacred Kumbh Mela 2027</p>
            </div>

            {/* Hotel Stays Section */}
            <div className="accommodation-type">
              <div className="type-header">
                <h3 className="type-title">Hotel Stays</h3>
                <p className="type-description">Comfortable hotel accommodations with modern amenities near the Kumbh Mela site</p>
              </div>
              
              <div className="accommodation-grid">
                {accommodations.hotels.slice(0, 5).map((hotel) => (
                  <div key={hotel.id} className="accommodation-card" onClick={() => setSelectedCard(hotel)}>
                    <img src={hotel.image} alt={hotel.name} className="card-image" />
                    <div className="card-details">
                      <h4 className="card-title">{hotel.name}</h4>
                      <div className="card-info">
                        <span className="card-price">{hotel.price}</span>
                        <span className="card-rating">{hotel.rating} ★</span>
                      </div>
                    </div>
                  </div>
                ))}
                {accommodations.hotels.length > 5 && (
                  <div className="see-all-card" onClick={() => { setShowAllPage('hotels'); setViewMode('list'); }}>
                    <div className="see-all-content">
                      <i className="fas fa-plus-circle"></i>
                      <p>See All Hotels</p>
                      <span>{accommodations.hotels.length - 5} more</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Home Stays Section */}
            <div className="accommodation-type">
              <div className="type-header">
                <h3 className="type-title">Home Stays</h3>
                <p className="type-description">Experience authentic Nashik hospitality with local families</p>
              </div>
              
              <div className="accommodation-grid">
                {accommodations.homestays.slice(0, 5).map((homestay) => (
                  <div key={homestay.id} className="accommodation-card" onClick={() => setSelectedCard(homestay)}>
                    <img src={homestay.image} alt={homestay.name} className="card-image" />
                    <div className="card-details">
                      <h4 className="card-title">{homestay.name}</h4>
                      <div className="card-info">
                        <span className="card-price">{homestay.price}</span>
                        <span className="card-rating">{homestay.rating} ★</span>
                      </div>
                    </div>
                  </div>
                ))}
                {accommodations.homestays.length > 5 && (
                  <div className="see-all-card" onClick={() => { setShowAllPage('homestays'); setViewMode('list'); }}>
                    <div className="see-all-content">
                      <i className="fas fa-plus-circle"></i>
                      <p>See All Homestays</p>
                      <span>{accommodations.homestays.length - 5} more</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Tent Stays Section */}
            <div className="accommodation-type">
              <div className="type-header">
                <h3 className="type-title">Tent Stays</h3>
                <p className="type-description">Traditional tent accommodations for the authentic Kumbh Mela experience</p>
              </div>
              
              <div className="accommodation-grid">
                {accommodations.tents.slice(0, 5).map((tent) => (
                  <div key={tent.id} className="accommodation-card" onClick={() => setSelectedCard(tent)}>
                    <img src={tent.image} alt={tent.name} className="card-image" />
                    <div className="card-details">
                      <h4 className="card-title">{tent.name}</h4>
                      <div className="card-info">
                        <span className="card-price">{tent.price}</span>
                        <span className="card-rating">{tent.rating} ★</span>
                      </div>
                    </div>
                  </div>
                ))}
                {accommodations.tents.length > 5 && (
                  <div className="see-all-card" onClick={() => { setShowAllPage('tents'); setViewMode('list'); }}>
                    <div className="see-all-content">
                      <i className="fas fa-plus-circle"></i>
                      <p>See All Tents</p>
                      <span>{accommodations.tents.length - 5} more</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Detail Page */}
        {selectedCard && (
          <HotelDetail 
            hotel={selectedCard}
            onBack={() => { setSelectedCard(null); setViewMode('home'); }}
          />
        )}

        {/* All Hotels/Homestays/Tents Page */}
        {showAllPage && (
          <AllHotels 
            accommodations={accommodations}
            onBack={() => { setShowAllPage(null); setViewMode('home'); }}
            onCardClick={setSelectedCard}
            type={showAllPage}
          />
        )}
      </main>

      {/* Footer */}
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
      </>
      )}

      {/* List View */}
      {viewMode === 'list' && showAllPage && (
        <AllHotels 
          accommodations={accommodations}
          onBack={() => { setShowAllPage(null); setViewMode('home'); }}
          onCardClick={(card) => { setSelectedCard(card); setViewMode('detail'); }}
          type={showAllPage}
        />
      )}

      {/* Detail View */}
      {viewMode === 'detail' && selectedCard && (
        <HotelDetail 
          hotel={selectedCard}
          onBack={() => { setSelectedCard(null); setViewMode('list'); }}
        />
      )}
    </div>
  );
};

export default KumbhathonLandingPage;
