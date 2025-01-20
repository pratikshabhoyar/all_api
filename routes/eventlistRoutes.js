const express = require('express');
const EventController = require('../controllers/eventlistController');

const router = express.Router();

// Route to fetch Mandir list
router.get('/events', EventController.getEventList);

module.exports = router;
