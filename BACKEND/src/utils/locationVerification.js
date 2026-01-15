// Location verification for Kumbh Mela area
const NASHIK_COORDINATES = {
  lat: 19.9975,
  lng: 73.7898
};

const KUMBH_MELA_RADIUS_KM = 50; // 50km radius around Nashik

// Calculate distance between two coordinates using Haversine formula
const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// Verify if location is within Kumbh Mela area
const isWithinKumbhArea = (userLat, userLng) => {
  const distance = calculateDistance(
    userLat, 
    userLng, 
    NASHIK_COORDINATES.lat, 
    NASHIK_COORDINATES.lng
  );
  
  return {
    isValid: distance <= KUMBH_MELA_RADIUS_KM,
    distance: Math.round(distance * 100) / 100,
    maxDistance: KUMBH_MELA_RADIUS_KM
  };
};

// Get location name from coordinates (mock implementation)
const getLocationName = (lat, lng) => {
  // In production, use Google Maps Geocoding API
  const distance = calculateDistance(lat, lng, NASHIK_COORDINATES.lat, NASHIK_COORDINATES.lng);
  
  if (distance <= 10) return "Nashik";
  if (distance <= 25) return "Near Nashik";
  if (distance <= 50) return "Nashik Region";
  return "Outside Kumbh Area";
};

module.exports = {
  isWithinKumbhArea,
  getLocationName,
  NASHIK_COORDINATES,
  KUMBH_MELA_RADIUS_KM
};