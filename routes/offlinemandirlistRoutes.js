const express = require('express');
const OfflinemandirlistController = require('../controllers/offlinemandirlistController');

const router = express.Router();

// Route to fetch Mandir list
// Route to fetch offline mandirs
router.get('/mandirs/offline', OfflinemandirlistController.getOfflineMandirList);

module.exports = router;
