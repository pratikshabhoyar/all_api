const { fetchTempleImages } = require('../models/fetchmandirModel');
const db = require('../config/db');
// Fetch only temple images selected by a user
const getUserTempleImages = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const images = await fetchTempleImages(userId);

    if (images.length === 0) {
      return res.status(404).json({ message: 'No temple images found for this user' });
    }

    res.status(200).json({ images });
  } catch (error) {
    console.error('Error fetching temple images:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getUserTempleImages };
