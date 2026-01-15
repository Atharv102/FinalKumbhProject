import React from 'react';
import './AllHotels.css';

const AllHotels = ({ accommodations, onBack, onCardClick, type = 'hotels' }) => {
  const title = type === 'hotels' ? 'All Hotels' : type === 'homestays' ? 'All Homestays' : 'All Tents';
  const items = accommodations[type];

  return (
    <div className="all-hotels-page">
      <button className="back-btn" onClick={onBack}>
        <i className="fas fa-arrow-left"></i> Back
      </button>

      <div className="all-hotels-container">
        {/* Left Side - List */}
        <div className="hotels-list-section">
          <h1 className="all-hotels-title">{title}</h1>
          <p className="all-hotels-subtitle">Browse all available {type} for Kumbh Mela 2027</p>
          
          <div className="hotels-list-grid">
            {items.map((item) => (
              <div key={item.id} className="hotel-list-card" onClick={() => onCardClick(item)}>
                <img src={item.image} alt={item.name} className="hotel-list-image" />
                <div className="hotel-list-details">
                  <h3 className="hotel-list-name">{item.name}</h3>
                  <p className="hotel-list-location">
                    <i className="fas fa-map-marker-alt"></i> {item.location}
                  </p>
                  <p className="hotel-list-amenities">{item.amenities}</p>
                  <div className="hotel-list-footer">
                    <span className="hotel-list-price">{item.price}/night</span>
                    <span className="hotel-list-rating">{item.rating} ★</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Map & AI Planner */}
        <div className="map-planner-section">
          {/* Map Section */}
          <div className="map-container">
            <h3 className="section-heading">Location Map</h3>
            <div className="map-placeholder">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60196.15!2d73.7898!3d19.9975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeb9d3a8b2d43%3A0x4f8f8f8f8f8f8f8f!2sNashik%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
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
              <input 
                type="number" 
                placeholder="Number of days" 
                className="planner-input"
                min="1"
                max="30"
              />
              <select className="planner-input">
                <option>Select interests</option>
                <option>Religious Sites</option>
                <option>Cultural Heritage</option>
                <option>Wine Tours</option>
                <option>Nature & Scenic</option>
              </select>
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

export default AllHotels;
