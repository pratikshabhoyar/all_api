const mysql = require('mysql2');
require('dotenv').config();
const UserController = require('../controllers/userlistController');
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

  // Fetch the user list from the database
// const getUsers = (callback) => {
//     pool.query('SELECT id, name, email, role FROM users', (err, results) => {
//       if (err) {
//         return callback(err, null);
//       }
//       return callback(null, results);
//     });
//   };
  
//   module.exports = getUsers;
const User = {
    getAllUsers: (callback) => {
        const query = 'SELECT id, name, email, role FROM user'; 
        db.query(query, callback); // Executes the query
    },
 };

module.exports=User;