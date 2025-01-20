const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


// Route for login with mobile and country code

router.post('/login', authController.loginWithOTP);

// Route to verify the OTP
router.post('/verify', authController.verifyOTP);

//resend
router.post('/resend', authController.resendOTP);
console.log(authController);
module.exports= router;
