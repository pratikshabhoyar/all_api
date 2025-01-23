const { getUserById, updateNotificationSetting } = require("../models/userModel");

// Toggle notification setting for a user
const toggleNotificationSetting = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch user by ID
    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Toggle the notifications_enabled value (or status field if using it)
    const newSetting = user.notifications_enabled ? false : true;

    // Update the setting in the database
    await updateNotificationSetting(id, newSetting);

    res.status(200).json({
      message: `Notifications ${newSetting ? "enabled" : "disabled"} for user with ID: ${id}.`,
      notifications_enabled: newSetting,
    });
  } catch (error) {
    console.error("Error toggling notification setting:", error);
    res.status(500).json({ error: "Internal server error", message: error.message });
  }
};

module.exports = {
  toggleNotificationSetting,
};
