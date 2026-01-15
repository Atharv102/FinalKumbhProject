import React, { useState, useEffect } from 'react';
import './CategoryListingsPage.css';

const CategoryListingsPage = ({ accommodations, onBack, onCardClick, type = 'hotels' }) => {
  const [showBackBtn, setShowBackBtn] = useState(true);

  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      setShowBackBtn(currentScroll <= lastScroll || currentScroll < 100);
      lastScroll = currentScroll;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  console.log('CategoryListingsPage render:', { type, accommodations, hasData: !!accommodations });

  if (!accommodations) {
    return <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>Loading...</div>;
  }

  const title = type === 'hotels' ? 'All Hotels' : type === 'homestays' ? 'All Homestays' : type === 'tents' ? 'All Tents' : 'All Dormitories';
  const items = accommodations[type] || [];

  console.log('CategoryListingsPage - type:', type);
  console.log('CategoryListingsPage - accommodations keys:', Object.keys(accommodations));
  console.log('CategoryListingsPage - items:', items);
  console.log('CategoryListingsPage - items.length:', items.length);

  return (
    <div className="category-listings-page">
      <button className={`back-btn ${showBackBtn ? 'visible' : 'hidden'}`} onClick={onBack}>
        <i className="fas fa-arrow-left"></i>
      </button>

      <div className="listings-container">
        {/* Left Side - List */}
        <div className="listings-section">
          <h1 className="listings-title">{title}</h1>
          <p className="listings-subtitle">Browse all available {type} for Kumbh Mela 2027</p>

          <div className="listings-grid">
            {items.length === 0 ? (
              <p style={{ gridColumn: '1/-1', textAlign: 'center', padding: '2rem' }}>No properties found</p>
            ) : (
              items.map((item) => {
                const imageUrl = item.image || (item.images && item.images[0]?.url) || 'https://via.placeholder.com/500x300?text=No+Image';
                const displayName = item.name || item.title;
                const displayPrice = item.price || `₹${item.pricing?.basePrice}`;
                const displayRating = item.rating || item.ratings?.average || 0;
                const displayLocation = item.location?.address || item.location?.city || item.location;
                const displayAmenities = Array.isArray(item.amenities) ? item.amenities.join(', ') : item.amenities || '';

                return (
                  <div key={item.id || item._id} className="listing-card" onClick={() => onCardClick(item)}>
                    <img src={imageUrl} alt={displayName} className="listing-image" />
                    <div className="listing-details">
                      <h3 className="listing-name">{displayName}</h3>
                      <p className="listing-location">
                        <i className="fas fa-map-marker-alt"></i> {displayLocation}
                      </p>
                      <p className="listing-amenities">{displayAmenities}</p>
                      <div className="listing-footer">
                        <span className="listing-price">{displayPrice}/night</span>
                        <span className="listing-rating">{displayRating} ★</span>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Right Side - Map & AI Planner */}
        <div className="map-planner-section">
          {/* Map Section */}
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60196.15!2d73.7898!3d19.9975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeb9d3a8b2d43%3A0x4f8f8f8f8f8f8f8f!2sNashik%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            //title="Nashik Map"
            ></iframe>
          </div>

          {/* AI Itinerary Planner */}
          <div className="ai-planner-container">
            <h3 className="section-heading">
              <i className="fas fa-robot"></i> AI Itinerary Planner
            </h3>
            <p className="planner-description">
              Get personalized travel plans for your Nashik visit during Kumbh Mela 2027
            </p>

            <div className="planner-form">
              <div className="form-field">
                <label className="form-label">Number of Days</label>
                <input
                  type="number"
                  placeholder="e.g., 3"
                  className="planner-input"
                  min="1"
                  max="30"
                />
              </div>
              <div className="form-field">
                <label className="form-label">Select Your Interests</label>
                <select className="planner-input">
                  <option>Choose category</option>
                  <option>Religious Sites</option>
                  <option>Cultural Heritage</option>
                  <option>Wine Tours</option>
                  <option>Nature & Scenic</option>
                </select>
              </div>
              <button className="planner-btn">
                <i className="fas fa-magic"></i> Generate Itinerary
              </button>
            </div>

            <div className="planner-output">
              <p className="planner-placeholder">
                <i className="fas fa-lightbulb"></i> Your AI-generated itinerary will appear here
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryListingsPage;
