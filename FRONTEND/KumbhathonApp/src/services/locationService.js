// Location and Photo Upload Service
const API_BASE_URL = 'http://localhost:5000/api';

// Get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`
  };
};

export const locationService = {
  // Get user's current location
  getCurrentLocation: () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
        },
        (error) => {
          let message = 'Location access denied';
          switch(error.code) {
            case error.PERMISSION_DENIED:
              message = 'Location access denied by user';
              break;
            case error.POSITION_UNAVAILABLE:
              message = 'Location information unavailable';
              break;
            case error.TIMEOUT:
              message = 'Location request timed out';
              break;
          }
          reject(new Error(message));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    });
  },

  // Verify location with backend
  verifyLocation: async (latitude, longitude) => {
    try {
      const response = await fetch(`${API_BASE_URL}/photos/verify-location`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify({ latitude, longitude })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    } catch (error) {
      throw error;
    }
  }
};

export const photoService = {
  // Upload photos for a property
  uploadPhotos: async (propertyId, files, location, caption = '') => {
    try {
      const formData = new FormData();
      
      // Add files
      files.forEach(file => {
        formData.append('photos', file);
      });
      
      // Add location data
      if (location) {
        formData.append('latitude', location.latitude);
        formData.append('longitude', location.longitude);
      }
      
      // Add caption
      if (caption) {
        formData.append('caption', caption);
      }

      const response = await fetch(`${API_BASE_URL}/photos/${propertyId}/photos`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: formData
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    } catch (error) {
      throw error;
    }
  },

  // Delete a photo
  deletePhoto: async (propertyId, photoId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/photos/${propertyId}/photos/${photoId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    } catch (error) {
      throw error;
    }
  }
};