// const { getUserById, updateNotificationSetting } = require("../models/userModel");

// // Toggle notification setting for a user
// const toggleNotificationSetting = async (req, res) => {
//   const { id } = req.params;

//   try {
//     // Fetch user by ID
//     const user = await getUserById(id);

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Toggle the notifications_enabled value (or status field if using it)
//     const newSetting = user.notifications_enabled ? false : true;

//     // Update the setting in the database
//     await updateNotificationSetting(id, newSetting);

//     res.status(200).json({
//       message: `Notifications ${newSetting ? "enabled" : "disabled"} for user with ID: ${id}.`,
//       notifications_enabled: newSetting,
//     });
//   } catch (error) {
//     console.error("Error toggling notification setting:", error);
//     res.status(500).json({ error: "Internal server error", message: error.message });
//   }
// };

// module.exports = {
//   toggleNotificationSetting,
// };
///////////////////////////////////////
const { getUserNotifications, updateUserNotifications } = require("../models/notificationModel");

// Fetch user notification settings
// const getUserNotificationSettings = async (req, res) => {
//   try {
//     const { user_id } = req.params;
//     const notifications = await getUserNotifications(user_id);

//     if (!notifications) {
//       return res.status(404).json({ message: "User not found or no notifications set" });
//     }

//     res.status(200).json(notifications);
//   } catch (error) {
//     console.error("Error fetching notifications:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };
const getUserNotificationSettings = async (req, res) => {
  try {
    const { user_id } = req.params;

    // Fetch user notifications from database
    const notifications = await getUserNotifications(user_id);

    // If no notifications found for the user, return 404
    if (!notifications || Object.keys(notifications).length === 0) {
      return res.status(404).json({
        error: true,
        message: "No notification settings found for this user.",
      });
    }

    // Success response
    res.status(200).json({
      error: false,
      message: "Notification settings retrieved successfully.",
      notifications,
    });
  } catch (error) {
    console.error("Error fetching user notifications:", error);
    res.status(500).json({
      error: true,
      message: "Internal Server Error. Unable to fetch notification settings.",
    });
  }
};



// Update user notification settings
const updateUserNotificationSettings = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { mandir_aarti, suvichar, new_event, other_notification } = req.body;

    const updatedRows = await updateUserNotifications(user_id, {
      mandir_aarti,
      suvichar,
      new_event,
      other_notification,
    });

    if (updatedRows === 0) {
      return res.status(404).json({ message: "User not found or no updates made" });
    }

    res.status(200).json({  error: false,message: "Notification settings updated successfully" });
  } catch (error) {
    console.error("Error updating notifications:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getUserNotificationSettings,
  updateUserNotificationSettings,
};
