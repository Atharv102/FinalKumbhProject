const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a property title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a description']
  },
  type: {
    type: String,
    required: [true, 'Please specify property type'],
    enum: ['hotel', 'homestay', 'tent', 'dormitory']
  },
  location: {
    address: {
      type: String,
      required: [true, 'Please provide address']
    },
    city: {
      type: String,
      required: [true, 'Please provide city']
    },
    state: {
      type: String,
      required: [true, 'Please provide state']
    },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  pricing: {
    basePrice: {
      type: Number,
      required: [true, 'Please provide base price']
    },
    currency: {
      type: String,
      default: 'INR'
    }
  },
  capacity: {
    maxGuests: {
      type: Number,
      required: [true, 'Please specify maximum guests'],
      min: 1
    },
    bedrooms: Number,
    bathrooms: Number
  },
  amenities: [{
    type: String,
    enum: ['wifi', 'parking', 'kitchen', 'ac', 'tv', 'pool', 'gym', 'spa', 'restaurant', 'laundry']
  }],
  images: [{
    url: String,
    caption: String
  }],
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'pending'],
    default: 'active'
  },
  ratings: {
    average: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
propertySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Property', propertySchema);