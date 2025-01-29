//login flow
const otpService = require('../services/otpService');
const userService = require('../services/userService');
const pool = require("../config/db");
const loginWithOTP = async (req, res) => {
  const { mobileNumber, countryCode } = req.body;
  //res.send('Login endpoint works');
  if (!mobileNumber || !countryCode) {
    return res.status(400).json({ message: 'Mobile number and country code are required' });
  }

  try {
    // Check if the user exists
    let user = await userService.findUserByMobile(mobileNumber, countryCode);

    if (!user) {
      // Register the user if not found
      const userId = await userService.createUser(mobileNumber, countryCode);
      user = { id: userId, mobileNumber, countryCode };
    }

    // Generate OTP token
    const otpToken = otpService.generateOTP(mobileNumber, countryCode);

    // Respond with OTP token (in real scenarios, send it via SMS)
    return res.status(200).json({ message: 'OTP sent'});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const verifyOTP = async (req, res) => {
  const { otpToken } = req.body;
  //res.send('Verify OTP endpoint works');
  if (!otpToken) {
    return res.status(400).json({ message: 'OTP token is required' });
  }

  try {
    const decoded = otpService.verifyOTP(otpToken);

    if (!decoded) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // User verified
    return res.status(200).json({ message: 'Login successful', user: decoded });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


const resendOTP = async (req, res) => {
    const { mobileNumber, countryCode } = req.body;
    try {
      const user = await userService.findUserByMobile(mobileNumber, countryCode);
      if (!user) {
        return res.status(404).json({ message: 'User not registered' });
      }
      const otpToken = otpService.generateOTP(mobileNumber, countryCode);
      // Send OTP to user's phone (e.g., via SMS gateway) - Simulating here
      return res.status(200).json({ message: 'OTP resent successfully', otpToken });
    } catch (error) {
      console.error('Error in resendOTP:', error.message);
      return res.status(500).json({ message: 'Server error' });
    }
  };

module.exports = {
  loginWithOTP,
  verifyOTP,
  resendOTP,
};
