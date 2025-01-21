//const db = require('./models/db');
const db=require('../config/db');

const findUserByMobile = async (mobileNumber, countryCode) => {
  const query = 'SELECT * FROM user WHERE mobileNumber = ? AND countryCode = ?';
  const [rows] = await db.execute(query, [mobileNumber, countryCode]);
  return rows[0];
};

const createUser = async (mobileNumber, countryCode) => {
  const query = 'INSERT INTO user (mobileNumber, countryCode) VALUES (?, ?)';
  const [result] = await db.execute(query, [mobileNumber, countryCode]);
  return result.insertId;
};

module.exports = {
  findUserByMobile,
  createUser,
};
