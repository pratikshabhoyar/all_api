const db = require('../config/db');

// Get all temples
const getAllTemples = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM temples', (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// Save user's selected temple
const saveSelectedTemple = (userId, templeId) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO user_selected_temple (user_id, temple_id)
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE temple_id = VALUES(temple_id)
    `;
    db.query(sql, [userId, templeId], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = {
  getAllTemples,
  saveSelectedTemple,
};
