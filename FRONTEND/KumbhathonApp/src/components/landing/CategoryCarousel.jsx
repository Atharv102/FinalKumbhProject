import React from 'react';
import AccommodationCard from '../shared/AccommodationCard';
import './CategoryCarousel.css';

const CategoryCarousel = ({ title, description, items, onSeeMore, onCardClick }) => {
  return (
    <div className="category-section">
      <div className="category-header">
        <div>
          <h3 className="category-title">{title}</h3>
          <p className="category-description">{description}</p>
        </div>
      </div>
      
      <div className="category-carousel">
        {items.slice(0, 5).map((item, index) => (
          <AccommodationCard 
            key={item.id} 
            accommodation={item} 
            onClick={() => onCardClick(item)}
            isLast={index === 4}
            onSeeMore={items.length > 5 ? onSeeMore : null}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryCarousel;
