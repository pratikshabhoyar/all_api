const express = require('express');
const { fetchAllTemples, selectTemple } = require('../controllers/templeController');

const router = express.Router();
console.log('fetchAllTemples:', fetchAllTemples); // Should not log `undefined`
console.log('selectTemple:', selectTemple); 
// Route to get all temples
router.get('/temples', fetchAllTemples);

// Route to select a temple
router.post('/select-temple', selectTemple);

module.exports = router;
