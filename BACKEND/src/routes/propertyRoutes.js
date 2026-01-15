const express = require('express');
const {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
  getMyProperties
} = require('../controllers/propertyController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getProperties);
router.get('/:id', getProperty);

// Protected routes
router.use(protect); // All routes after this middleware are protected

router.post('/', createProperty);
router.get('/my/properties', getMyProperties);
router.put('/:id', updateProperty);
router.delete('/:id', deleteProperty);

module.exports = router;