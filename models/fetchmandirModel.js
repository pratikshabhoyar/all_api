const db = require('../config/db');

// Fetch only temple images for a specific user
const fetchTempleImages = async (userId) => {
  const query = `
    SELECT t.image_url 
    FROM temples t
    JOIN user_selected_temple ut ON t.id = ut.temple_id
    WHERE ut.user_id = ?
  `;
  const [results] = await db.query(query, [userId]);
  return results.map((row) => row.image); // Return only images
};

module.exports = { fetchTempleImages };
