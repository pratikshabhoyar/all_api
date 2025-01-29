const mysql = require('mysql2');
const signupController = require('../controllers/signupController');
require('dotenv').config();
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'root',
//   database: 'user_db',
// });

// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to the database:', err.message);
//     process.exit(1);
//   }
//   console.log('Connected to the database.');
// });

// module.exports =db.promise();
const db = require("../config/db");
// Create user in the database
const createUser = async (userDetails) => {
  try {
    const { name, email, country, gender, age, countryCode, mobileNumber, status } = userDetails;
    const query = `
      INSERT INTO users (name, email, country, gender, age, country_code, mobile_number, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await db.execute(query, [
      name, email, country, gender, age, countryCode, mobileNumber, status || 1
    ]);
    return result;
  } catch (error) {
    console.error('Error in createUser:', error.message);
    throw new Error('Error creating user');
  }
};

module.exports = {
  createUser,
};
