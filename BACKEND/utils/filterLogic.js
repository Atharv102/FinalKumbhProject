// Filter and sort logic for accommodations
const applyFilters = (accommodations, filters) => {
  let result = [...accommodations];

  // Price range filter
  if (filters.priceMin !== undefined || filters.priceMax !== undefined) {
    const min = filters.priceMin || 0;
    const max = filters.priceMax || Infinity;
    result = result.filter(item => 
      item.pricePerNight >= min && item.pricePerNight <= max
    );
  }

  // Rating filter (minimum rating)
  if (filters.minRating) {
    result = result.filter(item => item.rating >= filters.minRating);
  }

  // Distance filter
  if (filters.maxDistance) {
    result = result.filter(item => item.distanceFromKumbh <= filters.maxDistance);
  }

  // Facilities filter (must have all selected facilities)
  if (filters.facilities && filters.facilities.length > 0) {
    result = result.filter(item => 
      filters.facilities.every(facility => item.facilities.includes(facility))
    );
  }

  // Quality filter
  if (filters.quality && filters.quality.length > 0) {
    result = result.filter(item => filters.quality.includes(item.qualityTag));
  }

  // Location zone filter
  if (filters.locationZone && filters.locationZone.length > 0) {
    result = result.filter(item => filters.locationZone.includes(item.locationZone));
  }

  // Duration filter
  if (filters.duration && filters.duration.length > 0) {
    result = result.filter(item => 
      filters.duration.some(dur => item.availableDurations.includes(dur))
    );
  }

  // Type filter
  if (filters.types && filters.types.length > 0) {
    result = result.filter(item => filters.types.includes(item.type));
  }

  return result;
};

const applySorting = (accommodations, sortBy) => {
  const result = [...accommodations];
  
  switch (sortBy) {
    case 'price-low':
      return result.sort((a, b) => a.pricePerNight - b.pricePerNight);
    case 'price-high':
      return result.sort((a, b) => b.pricePerNight - a.pricePerNight);
    case 'rating':
      return result.sort((a, b) => b.rating - a.rating);
    case 'distance':
      return result.sort((a, b) => a.distanceFromKumbh - b.distanceFromKumbh);
    case 'trust':
      return result.sort((a, b) => b.rating - a.rating); // Same as rating for now
    default:
      return result.sort((a, b) => a.pricePerNight - b.pricePerNight);
  }
};

const searchAccommodations = (accommodations, searchTerm) => {
  if (!searchTerm) return accommodations;
  
  const term = searchTerm.toLowerCase();
  return accommodations.filter(item => 
    item.name.toLowerCase().includes(term) ||
    item.location.toLowerCase().includes(term) ||
    item.locationZone.toLowerCase().includes(term)
  );
};

module.exports = {
  applyFilters,
  applySorting,
  searchAccommodations
};