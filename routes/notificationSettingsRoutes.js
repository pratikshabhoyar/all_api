const express = require("express");
const router = express.Router();
const { toggleNotificationSetting } = require("../controllers/notificationSettingsController");

// Route for toggling notifications by user ID
router.patch("/notifications/:id", toggleNotificationSetting);

module.exports = router;
