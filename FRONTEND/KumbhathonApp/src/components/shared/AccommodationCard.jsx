import React from 'react';
import './AccommodationCard.css';

const AccommodationCard = ({ accommodation, onClick }) => {
  const getSecurityLevel = (rating) => {
    if (rating >= 4.5) return { label: 'Highly Secure', color: '#10B981' };
    if (rating >= 4.0) return { label: 'Secure', color: '#FF9933' };
    return { label: 'Basic Security', color: '#6B7280' };
  };

  const security = getSecurityLevel(accommodation.rating || accommodation.ratings?.average || 0);
  const imageUrl = accommodation.image || (accommodation.images && accommodation.images[0]?.url) || 'https://via.placeholder.com/500x300?text=No+Image';
  const displayName = accommodation.name || accommodation.title;
  const displayPrice = accommodation.price || `₹${accommodation.pricing?.basePrice}`;
  const displayRating = accommodation.rating || accommodation.ratings?.average || 0;

  return (
    <div className="accommodation-card" onClick={onClick}>
      <div className="card-image-container">
        <img src={imageUrl} alt={displayName} className="card-image" />
        <div className="security-badge">
          <span className="security-icon">🛡️</span>
          <span className="security-text">{security.label}</span>
        </div>
      </div>
      <div className="card-details">
        <h4 className="card-title">{displayName}</h4>
        <div className="card-info">
          <span className="card-price">{displayPrice}</span>
          <span className="card-rating">{displayRating} ★</span>
        </div>
      </div>
    </div>
  );
};

export default AccommodationCard;
