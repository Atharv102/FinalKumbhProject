import React, { useState, useEffect } from 'react';
import './AccommodationPage.css';
import AccommodationCard from '../components/shared/AccommodationCard';
import { accommodations } from '../data/accommodations';

const AccommodationPage = ({ onCardClick, onBack }) => {
  const [showBackBtn, setShowBackBtn] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('price-low');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredData, setFilteredData] = useState(accommodations);
  const [loading, setLoading] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  
  // Filter state
  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    minRating: '',
    maxDistance: '',
    facilities: [],
    quality: [],
    locationZone: [],
    duration: [],
    types: []
  });

  const [showSearchControls, setShowSearchControls] = useState(true);

  useEffect(() => {
    // Listen to scroll on accommodation content
    const accommodationContent = document.querySelector('.accommodation-content');
    const handleScroll = () => {
      if (accommodationContent) {
        const contentScroll = accommodationContent.scrollTop;
        setShowSearchControls(contentScroll < 50);
      }
    };
    
    if (accommodationContent) {
      accommodationContent.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      if (accommodationContent) {
        accommodationContent.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // Apply filters and search
  const applyFiltersAndSearch = async () => {
    setLoading(true);
    try {
      // Build query parameters
      const params = new URLSearchParams();
      
      if (searchTerm) params.append('search', searchTerm);
      if (sortBy) params.append('sortBy', sortBy);
      if (filters.priceMin) params.append('priceMin', filters.priceMin);
      if (filters.priceMax) params.append('priceMax', filters.priceMax);
      if (filters.minRating) params.append('minRating', filters.minRating);
      if (filters.maxDistance) params.append('maxDistance', filters.maxDistance);
      if (filters.facilities.length) params.append('facilities', filters.facilities.join(','));
      if (filters.quality.length) params.append('quality', filters.quality.join(','));
      if (filters.locationZone.length) params.append('locationZone', filters.locationZone.join(','));
      if (filters.duration.length) params.append('duration', filters.duration.join(','));
      if (filters.types.length) params.append('types', filters.types.join(','));

      // Try API call, fallback to local data
      try {
        const response = await fetch(`http://localhost:5000/api/accommodations?${params}`);
        if (response.ok) {
          const data = await response.json();
          setFilteredData(data.data);
        } else {
          throw new Error('API failed');
        }
      } catch (apiError) {
        // Fallback to local filtering
        console.log('Using local data filtering');
        let result = { ...accommodations };
        
        // Apply local search and sort
        if (searchTerm) {
          Object.keys(result).forEach(category => {
            result[category] = result[category].filter(item => 
              (item.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
              (item.location || '').toLowerCase().includes(searchTerm.toLowerCase())
            );
          });
        }
        
        // Apply local sorting
        Object.keys(result).forEach(category => {
          result[category] = [...result[category]].sort((a, b) => {
            const priceA = parseInt((a.price || '0').replace(/[^0-9]/g, '')) || 0;
            const priceB = parseInt((b.price || '0').replace(/[^0-9]/g, '')) || 0;
            const ratingA = a.rating || 0;
            const ratingB = b.rating || 0;
            
            switch(sortBy) {
              case 'price-low': return priceA - priceB;
              case 'price-high': return priceB - priceA;
              case 'rating': return ratingB - ratingA;
              case 'distance': return 0;
              case 'trust': return ratingB - ratingA;
              default: return priceA - priceB;
            }
          });
        });
        
        setFilteredData(result);
      }
      
      // Update active filters display
      updateActiveFilters();
      
    } catch (error) {
      console.error('Filter error:', error);
      setFilteredData(accommodations);
    } finally {
      setLoading(false);
    }
  };

  // Update active filters for display
  const updateActiveFilters = () => {
    const active = [];
    if (filters.priceMin || filters.priceMax) {
      active.push(`Price: ₹${filters.priceMin || 0} - ₹${filters.priceMax || '∞'}`);
    }
    if (filters.minRating) active.push(`Rating: ${filters.minRating}+ stars`);
    if (filters.maxDistance) active.push(`Distance: ${filters.maxDistance}km`);
    if (filters.facilities.length) active.push(`Facilities: ${filters.facilities.length} selected`);
    if (filters.quality.length) active.push(`Quality: ${filters.quality.join(', ')}`);
    if (filters.locationZone.length) active.push(`Location: ${filters.locationZone.length} zones`);
    if (filters.duration.length) active.push(`Duration: ${filters.duration.join(', ')}`);
    if (filters.types.length) active.push(`Types: ${filters.types.join(', ')}`);
    setActiveFilters(active);
  };

  // Handle filter changes
  const handleFilterChange = (filterType, value, checked = true) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      
      if (Array.isArray(newFilters[filterType])) {
        if (checked) {
          newFilters[filterType] = [...newFilters[filterType], value];
        } else {
          newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
        }
      } else {
        newFilters[filterType] = value;
      }
      
      return newFilters;
    });
  };

  const clearFilters = () => {
    setFilters({
      priceMin: '',
      priceMax: '',
      minRating: '',
      maxDistance: '',
      facilities: [],
      quality: [],
      locationZone: [],
      duration: [],
      types: []
    });
    setSearchTerm('');
    setActiveFilters([]);
    setFilteredData(accommodations);
  };

  // Auto-apply filters when search term or sort changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      applyFiltersAndSearch();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, sortBy]);

  const categories = [
    { id: 'hotels', title: 'Hotels', items: filteredData.hotels || [] },
    { id: 'homestays', title: 'Homestays', items: filteredData.homestays || [] },
    { id: 'tents', title: 'Tents', items: filteredData.tents || [] },
    { id: 'dormitories', title: 'Dormitories', items: filteredData.dormitories || [] }
  ];

  const totalResults = categories.reduce((sum, cat) => sum + cat.items.length, 0);

  return (
    <div className="accommodation-page">
      <div className="accommodation-header">
        <h1 className="page-title">Accommodation</h1>
        <p className="page-subtitle">Verified stay options for Kumbh Mela 2027 in Nashik</p>
      </div>

      <div className={`accommodation-container ${!showSearchControls ? 'expanded' : ''}`}>
        {/* Filters Sidebar */}
        <div className={`filters-sidebar ${showFilters ? 'open' : ''}`}>
          <div className="filters-header">
            <div>
              <h3>Filters</h3>
            </div>
            <button className="clear-filters" onClick={clearFilters}>Clear All</button>
          </div>
          
          <div className="filters-content">
            <div className="filter-group">
              <h4>Price Range (per night)</h4>
              <div className="price-inputs">
                <input 
                  type="number" 
                  placeholder="Min" 
                  className="price-input"
                  value={filters.priceMin}
                  onChange={(e) => handleFilterChange('priceMin', e.target.value)}
                />
                <span>-</span>
                <input 
                  type="number" 
                  placeholder="Max" 
                  className="price-input"
                  value={filters.priceMax}
                  onChange={(e) => handleFilterChange('priceMax', e.target.value)}
                />
              </div>
            </div>
            
            <div className="filter-group">
              <h4>Minimum Rating</h4>
              <select 
                className="filter-select"
                value={filters.minRating}
                onChange={(e) => handleFilterChange('minRating', e.target.value)}
              >
                <option value="">Any rating</option>
                <option value="3">3+ stars</option>
                <option value="4">4+ stars</option>
                <option value="4.5">4.5+ stars</option>
              </select>
            </div>
            
            <div className="filter-group">
              <h4>Distance from Kumbh</h4>
              <select 
                className="filter-select"
                value={filters.maxDistance}
                onChange={(e) => handleFilterChange('maxDistance', e.target.value)}
              >
                <option value="">Any distance</option>
                <option value="1">Within 1 km</option>
                <option value="2">Within 2 km</option>
                <option value="5">Within 5 km</option>
              </select>
            </div>
            
            <div className="filter-group">
              <h4>Facilities</h4>
              {['wifi', 'parking', 'restaurant', 'bathroom', 'food', 'ac'].map(facility => (
                <label key={facility} className="filter-checkbox">
                  <input 
                    type="checkbox" 
                    checked={filters.facilities.includes(facility)}
                    onChange={(e) => handleFilterChange('facilities', facility, e.target.checked)}
                  />
                  <span>{facility.charAt(0).toUpperCase() + facility.slice(1)}</span>
                </label>
              ))}
            </div>
            
            <div className="filter-group">
              <h4>Quality Level</h4>
              {['basic', 'standard', 'premium'].map(quality => (
                <label key={quality} className="filter-checkbox">
                  <input 
                    type="checkbox" 
                    checked={filters.quality.includes(quality)}
                    onChange={(e) => handleFilterChange('quality', quality, e.target.checked)}
                  />
                  <span>{quality.charAt(0).toUpperCase() + quality.slice(1)}</span>
                </label>
              ))}
            </div>
            
            <button className="apply-filters-btn" onClick={applyFiltersAndSearch}>
              Apply Filters
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="accommodation-main">
          {/* Search and Controls */}
          <div className={`search-controls ${showSearchControls ? '' : 'hidden'}`}>
            <div className="search-bar">
              <i className="fas fa-search"></i>
              <input 
                type="text" 
                placeholder="Search by name, area, or landmark..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="controls-row">
              <button 
                className="filter-toggle"
                onClick={() => setShowFilters(!showFilters)}
              >
                <i className="fas fa-filter"></i>
                Filters
                {activeFilters.length > 0 && (
                  <span className="filter-count">{activeFilters.length}</span>
                )}
              </button>
              
              <select 
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating: High to Low</option>
                <option value="distance">Distance: Nearest First</option>
                <option value="trust">Trust Score: High to Low</option>
              </select>
              
              <span className="results-count">
                {loading ? 'Searching...' : `${totalResults} stays found`}
              </span>
            </div>
            
            {/* Active Filters */}
            {activeFilters.length > 0 && (
              <div className="active-filters">
                <span className="active-filters-label">Active filters:</span>
                {activeFilters.map((filter, index) => (
                  <span key={index} className="filter-chip">
                    {filter}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Accommodation Sections */}
          <div className="accommodation-content">
            {categories.map((category) => (
              category.items.length > 0 && (
                <section key={category.id} className="accommodation-section">
                  <h2 className="section-title">{category.title} ({category.items.length})</h2>
                  
                  <div className="accommodation-grid">
                    {category.items.slice(0, 12).map((item) => (
                      <AccommodationCard 
                        key={item.id || item._id || Math.random()}
                        accommodation={item}
                        onClick={() => onCardClick && onCardClick(item)}
                      />
                    ))}
                  </div>
                </section>
              )
            ))}
            
            {totalResults === 0 && !loading && (
              <div className="no-results">
                <i className="fas fa-search"></i>
                <p>No accommodations found matching your criteria</p>
                <button onClick={clearFilters} className="clear-filters-btn">Clear filters and try again</button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Filter Overlay */}
      {showFilters && (
        <div className="filter-overlay" onClick={() => setShowFilters(false)}>
          <div className="filter-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <h3>Filters</h3>
              <button onClick={() => setShowFilters(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="drawer-content">
              {/* Same filter content as sidebar */}
              <div className="filter-group">
                <h4>Price Range (per night)</h4>
                <div className="price-inputs">
                  <input 
                    type="number" 
                    placeholder="Min" 
                    className="price-input"
                    value={filters.priceMin}
                    onChange={(e) => handleFilterChange('priceMin', e.target.value)}
                  />
                  <span>-</span>
                  <input 
                    type="number" 
                    placeholder="Max" 
                    className="price-input"
                    value={filters.priceMax}
                    onChange={(e) => handleFilterChange('priceMax', e.target.value)}
                  />
                </div>
              </div>
              
              <button className="apply-filters-btn" onClick={() => {
                applyFiltersAndSearch();
                setShowFilters(false);
              }}>
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccommodationPage;