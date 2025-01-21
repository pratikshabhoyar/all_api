const mysql = require('mysql2');
require('dotenv').config();
const UserController = require('../controllers/userlistController');
// MySQL connection
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'add_mandir',
//   });
  
//   db.connect((err) => {
//     if (err) {
//       console.error('Error connecting to the database:', err);
//       process.exit(1);
//     }
//     console.log('Connected to the database.');
//   });
//   module.exports=db;
const db = require("../config/db");
  
const User = {
    getAllUsers: (callback) => {
        const query = 'SELECT id, name, email, role FROM user'; 
        db.query(query, callback); // Executes the query
    },
 };

module.exports=User;