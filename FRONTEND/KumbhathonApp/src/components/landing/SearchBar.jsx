import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = () => {
  const [searchData, setSearchData] = useState({
    location: 'Nashik, Maharashtra',
    checkIn: '',
    checkOut: '',
    guests: '2 guests'
  });

  const handleSearch = () => {
    console.log('Search data:', searchData);
  };

  return (
    <div className="search-container">
      <div className="search-box">
        <div className="search-grid">
          <div className="search-field">
            <input 
              type="text" 
              className="search-input"
              placeholder="Location"
              value={searchData.location}
              onChange={(e) => setSearchData({...searchData, location: e.target.value})}
            />
          </div>
          
          <div className="search-field">
            <input 
              type="date" 
              className="search-input"
              placeholder="Check-in"
              value={searchData.checkIn}
              onChange={(e) => setSearchData({...searchData, checkIn: e.target.value})}
            />
          </div>
          
          <div className="search-field">
            <input 
              type="date" 
              className="search-input"
              placeholder="Check-out"
              value={searchData.checkOut}
              onChange={(e) => setSearchData({...searchData, checkOut: e.target.value})}
            />
          </div>
          
          <div className="search-field">
            <input 
              type="text" 
              className="search-input"
              placeholder="Guests"
              value={searchData.guests}
              onChange={(e) => setSearchData({...searchData, guests: e.target.value})}
            />
          </div>
          
          <button className="search-button" onClick={handleSearch}>
            <i className="fas fa-search"></i>
            <span>Search</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
