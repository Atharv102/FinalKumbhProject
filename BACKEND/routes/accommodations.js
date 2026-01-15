const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { applyFilters, applySorting, searchAccommodations } = require('../utils/filterLogic');

// Load accommodations data
const loadAccommodations = () => {
  try {
    const dataPath = path.join(__dirname, '../data/accommodations.json');
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading accommodations:', error);
    return { hotels: [], homestays: [], tents: [], dormitories: [] };
  }
};

// GET /api/accommodations - Get all accommodations with optional filters
router.get('/', (req, res) => {
  try {
    const accommodationsData = loadAccommodations();
    
    // Flatten all accommodations into single array
    const allAccommodations = [
      ...accommodationsData.hotels,
      ...accommodationsData.homestays,
      ...accommodationsData.tents,
      ...accommodationsData.dormitories
    ];

    let result = allAccommodations;

    // Apply search if provided
    if (req.query.search) {
      result = searchAccommodations(result, req.query.search);
    }

    // Apply filters if provided
    const filters = {
      priceMin: req.query.priceMin ? parseInt(req.query.priceMin) : undefined,
      priceMax: req.query.priceMax ? parseInt(req.query.priceMax) : undefined,
      minRating: req.query.minRating ? parseFloat(req.query.minRating) : undefined,
      maxDistance: req.query.maxDistance ? parseFloat(req.query.maxDistance) : undefined,
      facilities: req.query.facilities ? req.query.facilities.split(',') : undefined,
      quality: req.query.quality ? req.query.quality.split(',') : undefined,
      locationZone: req.query.locationZone ? req.query.locationZone.split(',') : undefined,
      duration: req.query.duration ? req.query.duration.split(',') : undefined,
      types: req.query.types ? req.query.types.split(',') : undefined
    };

    result = applyFilters(result, filters);

    // Apply sorting
    const sortBy = req.query.sortBy || 'price-low';
    result = applySorting(result, sortBy);

    // Group results back by type for frontend compatibility
    const groupedResult = {
      hotels: result.filter(item => item.type === 'hotel'),
      homestays: result.filter(item => item.type === 'homestay'),
      tents: result.filter(item => item.type === 'tent'),
      dormitories: result.filter(item => item.type === 'dormitory')
    };

    res.json({
      success: true,
      data: groupedResult,
      total: result.length,
      filters: filters,
      sortBy: sortBy
    });

  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      data: { hotels: [], homestays: [], tents: [], dormitories: [] }
    });
  }
});

// GET /api/accommodations/:type - Get accommodations by type
router.get('/:type', (req, res) => {
  try {
    const { type } = req.params;
    const accommodationsData = loadAccommodations();
    
    if (!accommodationsData[type]) {
      return res.status(404).json({
        success: false,
        message: 'Accommodation type not found'
      });
    }

    let result = accommodationsData[type];

    // Apply search if provided
    if (req.query.search) {
      result = searchAccommodations(result, req.query.search);
    }

    // Apply filters and sorting (same logic as above)
    const filters = {
      priceMin: req.query.priceMin ? parseInt(req.query.priceMin) : undefined,
      priceMax: req.query.priceMax ? parseInt(req.query.priceMax) : undefined,
      minRating: req.query.minRating ? parseFloat(req.query.minRating) : undefined,
      maxDistance: req.query.maxDistance ? parseFloat(req.query.maxDistance) : undefined,
      facilities: req.query.facilities ? req.query.facilities.split(',') : undefined,
      quality: req.query.quality ? req.query.quality.split(',') : undefined,
      locationZone: req.query.locationZone ? req.query.locationZone.split(',') : undefined,
      duration: req.query.duration ? req.query.duration.split(',') : undefined
    };

    result = applyFilters(result, filters);

    const sortBy = req.query.sortBy || 'price-low';
    result = applySorting(result, sortBy);

    res.json({
      success: true,
      data: result,
      total: result.length,
      type: type
    });

  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      data: []
    });
  }
});

module.exports = router;