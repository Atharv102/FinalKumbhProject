import React, { useState, useEffect } from 'react';
import { mockLocationService as locationService, mockPhotoService as photoService } from '../services/mockLocationService';
import './PhotoUpload.css';

const PhotoUpload = ({ propertyId, onPhotosUploaded, onClose }) => {
  const [step, setStep] = useState('location'); // location, photos, uploading
  const [location, setLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  // Step 1: Get and verify location
  const handleLocationVerification = async () => {
    setLocationStatus('Getting your location...');
    setError('');

    try {
      // Get current location
      const userLocation = await locationService.getCurrentLocation();
      setLocationStatus('Verifying location...');

      // Verify with backend
      const verification = await locationService.verifyLocation(
        userLocation.latitude, 
        userLocation.longitude
      );

      if (verification.success) {
        setLocation({
          ...userLocation,
          locationName: verification.data.locationName,
          distance: verification.data.distance
        });
        setLocationStatus(`✓ Location verified: ${verification.data.locationName} (${verification.data.distance}km from Nashik)`);
        setStep('photos');
      } else {
        setError(verification.message);
      }
    } catch (err) {
      setError(err.message);
      setLocationStatus('');
    }
  };

  // Step 2: Handle file selection
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length > 10) {
      setError('Maximum 10 photos allowed');
      return;
    }

    setSelectedFiles(files);
    
    // Create previews
    const newPreviews = files.map(file => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name
    }));
    
    setPreviews(newPreviews);
    setError('');
  };

  // Step 3: Upload photos
  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setError('Please select at least one photo');
      return;
    }

    setUploading(true);
    setStep('uploading');

    try {
      const result = await photoService.uploadPhotos(
        propertyId,
        selectedFiles,
        location
      );

      if (onPhotosUploaded) {
        onPhotosUploaded(result.data.images);
      }
      
      onClose();
    } catch (err) {
      setError(err.message);
      setStep('photos');
    } finally {
      setUploading(false);
    }
  };

  // Cleanup previews
  useEffect(() => {
    return () => {
      previews.forEach(preview => URL.revokeObjectURL(preview.url));
    };
  }, [previews]);

  return (
    <div className="photo-upload-overlay" onClick={onClose}>
      <div className="photo-upload-modal" onClick={(e) => e.stopPropagation()}>
        <div className="upload-header">
          <h2>Add Property Photos</h2>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Step 1: Location Verification */}
        {step === 'location' && (
          <div className="location-step">
            <div className="step-icon">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <h3>Verify Your Location</h3>
            <p>To prevent fraud, we need to verify that your property is within the Kumbh Mela area (50km radius of Nashik).</p>
            
            {locationStatus && (
              <div className="location-status">
                <i className="fas fa-spinner fa-spin"></i>
                {locationStatus}
              </div>
            )}

            {error && (
              <div className="error-message">
                <i className="fas fa-exclamation-triangle"></i>
                {error}
              </div>
            )}

            <button 
              className="verify-location-btn"
              onClick={handleLocationVerification}
              disabled={locationStatus.includes('Getting') || locationStatus.includes('Verifying')}
            >
              <i className="fas fa-location-arrow"></i>
              Verify My Location
            </button>

            <div className="location-info">
              <p><strong>Why do we verify location?</strong></p>
              <ul>
                <li>Ensures properties are genuinely in the Kumbh Mela area</li>
                <li>Prevents fraudulent listings from distant locations</li>
                <li>Maintains quality and authenticity for pilgrims</li>
              </ul>
            </div>
          </div>
        )}

        {/* Step 2: Photo Selection */}
        {step === 'photos' && (
          <div className="photos-step">
            <div className="location-confirmed">
              <i className="fas fa-check-circle"></i>
              Location verified: {location?.locationName}
            </div>

            <h3>Select Property Photos</h3>
            <p>Upload high-quality photos of your property (max 10 photos, 5MB each)</p>

            <div className="file-input-container">
              <input
                type="file"
                id="photo-input"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="file-input"
              />
              <label htmlFor="photo-input" className="file-input-label">
                <i className="fas fa-camera"></i>
                Choose Photos
              </label>
            </div>

            {previews.length > 0 && (
              <div className="photo-previews">
                <h4>Selected Photos ({previews.length}/10)</h4>
                <div className="previews-grid">
                  {previews.map((preview, index) => (
                    <div key={index} className="preview-item">
                      <img src={preview.url} alt={preview.name} />
                      <div className="preview-name">{preview.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {error && (
              <div className="error-message">
                <i className="fas fa-exclamation-triangle"></i>
                {error}
              </div>
            )}

            <div className="upload-actions">
              <button className="cancel-btn" onClick={onClose}>
                Cancel
              </button>
              <button 
                className="upload-btn"
                onClick={handleUpload}
                disabled={selectedFiles.length === 0}
              >
                <i className="fas fa-upload"></i>
                Upload Photos
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Uploading */}
        {step === 'uploading' && (
          <div className="uploading-step">
            <div className="upload-progress">
              <i className="fas fa-cloud-upload-alt fa-3x"></i>
              <h3>Uploading Photos...</h3>
              <p>Please wait while we upload your photos</p>
              <div className="progress-bar">
                <div className="progress-fill"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoUpload;