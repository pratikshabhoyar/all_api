const express = require('express');
const MandirController = require('../controllers/mandirlistController');

const router = express.Router();

// Route to fetch Mandir list
router.get('/mandirs', MandirController.getMandirList);

module.exports = router;
