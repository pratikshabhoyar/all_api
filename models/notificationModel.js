const db = require("../config/db");

// Fetch user notification settings
const getUserNotifications = async (user_id) => {
  const [rows] = await db.execute(
    "SELECT mandir_aarti, suvichar, new_event, other_notification FROM notification WHERE user_id = ?",
    [user_id]
  );
  return rows.length ? rows[0] : null;
};

// Update user notification settings
const updateUserNotifications = async (user_id, settings) => {
  const { mandir_aarti, suvichar, new_event, other_notification } = settings;
  const [result] = await db.execute(
    "UPDATE notification SET mandir_aarti = ?, suvichar = ?, new_event = ?, other_notification = ? WHERE user_id = ?",
    [mandir_aarti, suvichar, new_event, other_notification, user_id]
  );
  return result.affectedRows;
};

module.exports = {
  getUserNotifications,
  updateUserNotifications,
};
