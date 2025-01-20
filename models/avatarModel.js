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

// Get All Suvichar Images
const getAllAvatarImages = async () => {
  const query = `SELECT id, image_path FROM avatar`;
  try {
    const [rows] = await pool.query(query);
    return rows; // Return all suvichar images
  } catch (err) {
    throw new Error("Failed to fetch avatar images: " + err.message);
  }
};

module.exports = {
  addAvatarImage,
  deleteAvatarImage,
  getAllAvatarImages,
};