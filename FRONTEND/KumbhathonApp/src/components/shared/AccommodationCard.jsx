import React from 'react';
import './AccommodationCard.css';

const AccommodationCard = ({ accommodation, onClick }) => {
  const getSecurityLevel = (rating) => {
    if (rating >= 4.5) return { label: 'Highly Secure', color: '#10B981' };
    if (rating >= 4.0) return { label: 'Secure', color: '#FF9933' };
    return { label: 'Basic Security', color: '#6B7280' };
  };

  const security = getSecurityLevel(accommodation.rating);

  return (
    <div className="accommodation-card" onClick={onClick}>
      <div className="card-image-container">
        <img src={accommodation.image} alt={accommodation.name} className="card-image" />
        <div className="security-badge">
          <span className="security-icon">🛡️</span>
          <span className="security-text">{security.label}</span>
        </div>
      </div>
      <div className="card-details">
        <h4 className="card-title">{accommodation.name}</h4>
        <div className="card-info">
          <span className="card-price">{accommodation.price}</span>
          <span className="card-rating">{accommodation.rating} ★</span>
        </div>
      </div>
    </div>
  );
};

export default AccommodationCard;
