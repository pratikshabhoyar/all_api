const express = require('express');
const router = express.Router();
const notificationSettingsController = require('../controllers/notificationSettingsController');
router.get('/',notificationSettingsController.getSettings);
router.put('/', notificationSettingsController.updateSettings);

module.exports = router;