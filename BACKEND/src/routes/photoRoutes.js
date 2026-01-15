const express = require('express');
const { protect } = require('../middleware/auth');
const { upload, verifyLocation, uploadPhotos, deletePhoto } = require('../controllers/photoController');

const router = express.Router();

// All routes are protected
router.use(protect);

// Location verification
router.post('/verify-location', verifyLocation);

// Photo upload for specific property
router.post('/:id/photos', upload.array('photos', 10), uploadPhotos);

// Delete specific photo
router.delete('/:id/photos/:photoId', deletePhoto);

module.exports = router;