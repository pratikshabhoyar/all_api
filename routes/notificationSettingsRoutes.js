// const express = require("express");
// const router = express.Router();
// const { toggleNotificationSetting } = require("../controllers/notificationSettingsController");

// // Route for toggling notifications by user ID
// router.patch("/notifications/:id", toggleNotificationSetting);

// module.exports = router;
////////////////////////////////
const express = require("express");
const {
  getUserNotificationSettings,
  updateUserNotificationSettings,
} = require("../controllers/notificationSettingsController");

const router = express.Router();

router.get("/:user_id", getUserNotificationSettings);
router.put("/:user_id", updateUserNotificationSettings);

module.exports = router;

