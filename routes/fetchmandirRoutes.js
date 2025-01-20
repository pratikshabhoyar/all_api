const express = require('express');
const { getUserTempleImages } = require('../controllers/fetchmandirController');

const router = express.Router();

// Fetch only temple images selected by a user
router.get('/user/:userId/temple-images', getUserTempleImages);

module.exports = router;
