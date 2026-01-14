import React from 'react';
import './AccommodationCard.css';

const AccommodationCard = ({ accommodation, onClick }) => {
  return (
    <div className="accommodation-card" onClick={onClick}>
      <img src={accommodation.image} alt={accommodation.name} className="card-image" />
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
