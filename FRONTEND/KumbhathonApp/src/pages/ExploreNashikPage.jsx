import React, { useState, useEffect } from 'react';
import './ExploreNashikPage.css';

const ExploreNashikPage = ({ onBack }) => {
  const sections = [
    {
      id: 'heritage',
      title: 'Heritage & Spiritual Sites',
      description: 'Sacred places that define Nashik\'s spiritual significance',
      items: [
        {
          name: 'Ramkund',
          description: 'Sacred bathing ghat where Lord Rama bathed during his exile',
          image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400',
          category: 'Sacred'
        },
        {
          name: 'Kalaram Temple',
          description: 'Ancient temple dedicated to Lord Rama with black stone idol',
          image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400',
          category: 'Temple'
        },
        {
          name: 'Panchavati',
          description: 'Where Lord Rama, Sita, and Lakshmana lived during exile',
          image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=400',
          category: 'Heritage'
        },
        {
          name: 'Trimbakeshwar Temple',
          description: 'One of the twelve Jyotirlingas, source of river Godavari',
          image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400',
          category: 'Jyotirlinga'
        }
      ]
    },
    {
      id: 'culture',
      title: 'Culture & Traditions',
      description: 'Living traditions that connect past and present',
      items: [
        {
          name: 'Godavari Aarti',
          description: 'Evening prayer ceremony at the sacred river banks',
          image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400',
          category: 'Ritual'
        },
        {
          name: 'Local Markets',
          description: 'Traditional bazaars selling religious items and local crafts',
          image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400',
          category: 'Market'
        },
        {
          name: 'Folk Music',
          description: 'Traditional Maharashtrian music and devotional songs',
          image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400',
          category: 'Music'
        },
        {
          name: 'Handloom Weaving',
          description: 'Traditional textile crafts passed down through generations',
          image: 'https://images.unsplash.com/photo-1585543805890-6051f7829f98?w=400',
          category: 'Craft'
        }
      ]
    },
    {
      id: 'nature',
      title: 'Nature & Peaceful Spots',
      description: 'Natural beauty and quiet places for reflection',
      items: [
        {
          name: 'Godavari River Banks',
          description: 'Peaceful riverside walks and meditation spots',
          image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400',
          category: 'River'
        },
        {
          name: 'Brahmagiri Hill',
          description: 'Sacred hill where river Godavari originates',
          image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400',
          category: 'Hill'
        },
        {
          name: 'Anjaneri Hill',
          description: 'Birthplace of Lord Hanuman, peaceful trekking spot',
          image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400',
          category: 'Trek'
        },
        {
          name: 'Pandavleni Caves',
          description: 'Ancient Buddhist caves carved into hillside',
          image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400',
          category: 'Caves'
        }
      ]
    },
    {
      id: 'experiences',
      title: 'Local Experiences',
      description: 'Authentic ways to connect with Nashik\'s daily life',
      items: [
        {
          name: 'Traditional Thali',
          description: 'Complete Maharashtrian meal served on banana leaf',
          image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
          category: 'Food'
        },
        {
          name: 'Grape Harvest',
          description: 'Seasonal grape picking in surrounding vineyards',
          image: 'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?w=400',
          category: 'Seasonal'
        },
        {
          name: 'Pottery Making',
          description: 'Learn traditional clay pot making from local artisans',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
          category: 'Craft'
        },
        {
          name: 'Morning Prayers',
          description: 'Join early morning prayers at local temples',
          image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=400',
          category: 'Spiritual'
        }
      ]
    }
  ];

  return (
    <div className="explore-nashik-page">
      <div className="explore-header">
        <h1 className="page-title">Explore Nashik</h1>
        <p className="page-subtitle">
          Discover the spiritual heart of Maharashtra, where ancient traditions meet natural beauty
        </p>
      </div>

      <div className="explore-content">
        {sections.map((section) => (
          <section key={section.id} className="explore-section">
            <div className="section-header">
              <h2 className="section-title">{section.title}</h2>
              <p className="section-description">{section.description}</p>
            </div>
            
            <div className="places-grid">
              {section.items.map((item, index) => (
                <div key={index} className="place-card">
                  <div className="place-image-container">
                    <img src={item.image} alt={item.name} className="place-image" />
                    <span className="place-category">{item.category}</span>
                  </div>
                  <div className="place-content">
                    <h3 className="place-name">{item.name}</h3>
                    <p className="place-description">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="explore-footer">
        <div className="footer-note">
          <p>
            Nashik welcomes all visitors with respect and reverence. 
            Please honor local customs and traditions during your visit.
          </p>
          <p className="image-disclaimer">
            Images are representative of location types and experiences available in Nashik.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExploreNashikPage;