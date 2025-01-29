// Suvichar Model
const pool = require("../config/db");

// Add Suvichar Image
const addAvatarImage = async (imagePath) => {
  const query = `INSERT INTO avatar (image_path) VALUES (?)`;
  try {
    const [result] = await pool.query(query, [imagePath]);
    return result.insertId; // Return the ID of the inserted record
  } catch (err) {
    throw new Error("Failed to add avatar image: " + err.message);
  }
};

// Delete Suvichar Image
const deleteAvatarImage = async (imageId) => {
  const query = `DELETE FROM avatar WHERE id = ?`;
  try {
    const [result] = await pool.query(query, [imageId]);
    return result.affectedRows; // Return number of rows deleted
  } catch (err) {
    throw new Error("Failed to delete avatar image: " + err.message);
  }
};

// Fetch User's Selected Avatar
const getUserAvatar = async (userId) => {
  try {
    const [rows] = await db.execute(
      "SELECT u.id AS user_id, a.id AS avatar_id, a.image_path FROM users u LEFT JOIN avatar a ON u.avatar_id = a.id WHERE u.id = ?",
      [userId]
    );
    return rows.length ? rows[0] : null;
  } catch (error) {
    throw error;
  }
};

// Fetch All Available Avatars
const getAllAvatars = async () => {
  try {
    const [rows] = await db.execute("SELECT id, image_path FROM avatar");
    return rows;
  } catch (error) {
    throw error;
  }
};

// Update User's Selected Avatar
const updateUserAvatar = async (userId, avatarId) => {
  try {
    const [result] = await db.execute("UPDATE users SET avatar_id = ? WHERE id = ?", [avatarId, userId]);
    return result.affectedRows;
  } catch (error) {
    throw error;
  }
};



module.exports = {
  addAvatarImage,
  deleteAvatarImage,
  getUserAvatar,
  getAllAvatars,
  updateUserAvatar,
  
};