//const db = require('./models/db');
const db=require('../config/db');



// Find user by mobile number and country code
const findUserByMobile = async (mobileNumber, countryCode) => {
  try {
    const query = `SELECT * FROM users WHERE mobile_number = ? AND country_code = ?`;
    const [rows] = await db.execute(query, [mobileNumber, countryCode]);

    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("Error in findUserByMobile:", error.message);
    throw new Error("Error finding user by mobile");
  }
};

// Create user in the database
const createUser = async (userDetails) => {
  try {
    const { mobileNumber, countryCode, status } = userDetails;

    const query = `
      INSERT INTO users (mobile_number, country_code, status)
      VALUES (?, ?, ?)`;

    const [result] = await db.execute(query, [mobileNumber, countryCode, status || 1]);
    return result;
  } catch (error) {
    console.error("Error in createUser:", error.message);
    throw new Error("Error creating user");
  }
};

module.exports = {
  findUserByMobile,
  createUser,
};

