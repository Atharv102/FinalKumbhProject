const Property = require('../models/Property');

// @desc    Get all properties with search and filters
// @route   GET /api/properties
// @access  Public
exports.getProperties = async (req, res) => {
  try {
    const { search, type, minPrice, maxPrice, guests, city } = req.query;
    
    // Build query
    let query = { status: 'active' };
    
    // Search by title or location
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { 'location.city': { $regex: search, $options: 'i' } },
        { 'location.address': { $regex: search, $options: 'i' } }
      ];
    }
    
    // Filter by property type
    if (type && type !== 'all') {
      query.type = type;
    }
    
    // Filter by city
    if (city) {
      query['location.city'] = { $regex: city, $options: 'i' };
    }
    
    // Filter by price range
    if (minPrice || maxPrice) {
      query['pricing.basePrice'] = {};
      if (minPrice) query['pricing.basePrice'].$gte = Number(minPrice);
      if (maxPrice) query['pricing.basePrice'].$lte = Number(maxPrice);
    }
    
    // Filter by guest capacity
    if (guests) {
      query['capacity.maxGuests'] = { $gte: Number(guests) };
    }
    
    const properties = await Property.find(query).populate('host', 'name email');
    
    res.json({ 
      success: true, 
      count: properties.length,
      data: properties 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single property
// @route   GET /api/properties/:id
// @access  Public
exports.getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('host', 'name email phone');
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json({ success: true, data: property });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create property
// @route   POST /api/properties
// @access  Private (Host only)
exports.createProperty = async (req, res) => {
  try {
    console.log('Received property data:', JSON.stringify(req.body, null, 2));
    req.body.host = req.user.id;
    const property = await Property.create(req.body);
    res.status(201).json({ success: true, data: property });
  } catch (error) {
    console.log('Property creation error:', error.message);
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update property
// @route   PUT /api/properties/:id
// @access  Private (Host only)
exports.updateProperty = async (req, res) => {
  try {
    let property = await Property.findById(req.params.id);
    
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Check if user is the property owner
    if (property.host.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this property' });
    }

    property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({ success: true, data: property });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete property
// @route   DELETE /api/properties/:id
// @access  Private (Host only)
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Check if user is the property owner
    if (property.host.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this property' });
    }

    await Property.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get host's properties
// @route   GET /api/properties/my-properties
// @access  Private (Host only)
exports.getMyProperties = async (req, res) => {
  try {
    const properties = await Property.find({ host: req.user.id });
    res.json({ success: true, data: properties });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};