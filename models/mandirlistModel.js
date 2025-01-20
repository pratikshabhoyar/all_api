const mysql = require('mysql2');
require('dotenv').config();
const MandirController = require('../controllers/mandirlistController');
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
  const Mandir = {
    getAllMandirs: (callback) => {
        const query = `SELECT id, name, location, status FROM mandir`; // Replace 'mandir' with your table name
        db.query(query, callback); // Executes the query
    },
 };

module.exports =Mandir ;

