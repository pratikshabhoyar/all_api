const mysql = require('mysql2');
const router = require('../routes/notificationSettingsRoutes');
const notificationSettingsController = require('../controllers/notificationSettingsController');
// Database connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'user_db',
});

// Log a message when connected
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    throw err;
  }
  console.log('Connected to MySQL database!');
});

// Function to fetch notification settings for a user
const getNotificationSettings = (userId) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT 
        mandir_arti, suvichar, new_event, other_notifications
      FROM 
        notification_settings 
      WHERE 
        user_id = ?`;
    db.query(sql, [userId], (err, results) => {
      if (err) {
        reject(err);
      } else if (results.length === 0) {
        // If no settings found, return default values
        resolve({
          mandir_arti: true,
          suvichar: true,
          new_event: true,
          other_notifications: true,
        });
      } else {
        resolve(results[0]);
      }
    });
  });
};

// Function to update notification settings for a user
const updateNotificationSettings = (userId, settings) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO notification_settings (user_id, mandir_arti, suvichar, new_event, other_notifications)
      VALUES (?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE 
        mandir_arti = VALUES(mandir_arti), 
        suvichar = VALUES(suvichar), 
        new_event = VALUES(new_event), 
        other_notifications = VALUES(other_notifications)
    `;
    db.query(
      sql,
      [
        userId,
        settings.mandir_arti,
        settings.suvichar,
        settings.new_event,
        settings.other_notifications,
      ],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
};

module.exports = {
  db, // Export the database connection
  getNotificationSettings,
  updateNotificationSettings,
};

