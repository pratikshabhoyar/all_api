const express = require('express');
const router = express.Router();
//const authController = require('../controllers/authController');
const signupController = require('../controllers/signupController');
// Route for creating an account
router.post('/create',signupController.createAccount);
module.exports= router;
