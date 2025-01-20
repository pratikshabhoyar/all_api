const { getAllTemples, saveSelectedTemple } = require('../models/templeModel');
const db = require('../config/db');
// Fetch all temples
const fetchAllTemples = async (req, res) => {
  try {
    //const temples = await getAllTemples();
    const temples = await db.query('SELECT * FROM temples');
    res.status(200).json(temples);
  } catch (error) {
    console.error('Error fetching temples:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Select a temple for a user
const selectTemple = async (req, res) => {
  try {
    const { userId, templeId } = req.body;

    if (!userId || !templeId) {
      return res.status(400).json({ message: 'User ID and Temple ID are required' });
    }

   // await saveSelectedTemple(userId, templeId);
   await db.query('INSERT INTO user_temples (user_id, temple_id) VALUES (?, ?)', [userId, templeId]);
    res.status(200).json({ message: 'Temple selected successfully' });
  } catch (error) {
    console.error('Error selecting temple:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  fetchAllTemples,
  selectTemple,
};
