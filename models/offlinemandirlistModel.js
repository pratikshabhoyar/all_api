const mysql = require('mysql2');
require('dotenv').config();
const OfflinemandirlistController = require('../controllers/offlinemandirlistController');
// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'add_mandir',
  });
  
  db.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      process.exit(1);
    }
    console.log('Connected to the database.');
  });
  module.exports=db;
  // Fetch the mandir list with status offline
const getOfflineMandirs = (callback) => {
    const query = `
      SELECT id, name, location, status
      FROM mandir
      WHERE status = 'offline';
    `;
    db.query(query, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  };
  
  module.exports = { getOfflineMandirs };
