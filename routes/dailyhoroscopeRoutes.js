const express = require('express');
const router = express.Router();
const { addDailyHoroscope } = require('../controllers/dailyhoroscopeController');

router.post('/add', addDailyHoroscope);

module.exports = router;
