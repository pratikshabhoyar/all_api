const mysql = require('mysql2');
const { addDailyHoroscope } = require('../controllers/dailyhoroscopeController');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'user_db', // Replace with your database name
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL database.');
    }
});

const createDaily_HoroscopeTable = () => {
    const query = `
      CREATE TABLE IF NOT EXISTS Daily_Horoscope (
        id INT AUTO_INCREMENT PRIMARY KEY,
        daily_horoscope TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`;
  
    db.query(query, (err) => {
      if (err) {
        console.error('Error creating table:', err);
      } else {
        console.log('Daily_Horoscope table is ready.');
      }
    });
  };
  
  createDaily_HoroscopeTable();

module.exports = db;
