const notificationSettingsService = require('../models/notificationSettings');

const getSettings = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you have user authentication middleware

    const settings = await notificationSettingsService.getNotificationSettings(userId);

    res.status(200).json(settings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get notification settings' });
  }
};

const updateSettings = async (req, res) => {
  try {
    const userId = req.user.id;
    const settings = req.body; // Expected format: { mandir_arti: boolean, suvichar: boolean, new_event: boolean, other_notifications: boolean }

    await notificationSettingsService.updateNotificationSettings(userId, settings);

    res.status(200).json({ message: 'Notification settings updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update notification settings' });
  }
};

module.exports = {
  getSettings,
  updateSettings,
};