const userModel = require('../models/signupModel');
const otpService = require('../services/otpService');

const createAccount = async (req, res) => {
  const { name, email, country, gender, age, countryCode, mobileNumber} = req.body;

  try {
    // Check for required fields
    if (!name || !email || !country || !gender || !age || !countryCode || !mobileNumber) {
      return res.status(400).json({
        error: true,
        message: "All fields are required",
      });
    }

    // // Validate OTP (just a placeholder for actual OTP validation logic)
    // const decoded = otpService.verifyOTP(otpToken);

    // if (!decoded || decoded.mobileNumber !== mobileNumber || decoded.countryCode !== countryCode) {
    //   return res.status(400).json({ message: 'Invalid OTP' });
    // }

    // Create the user
    const userDetails = { name, email, country, gender, age, countryCode, mobileNumber, status: 1 };
    const result = await userModel.createUser(userDetails);

    // return res.status(201).json({ message: 'User created successfully', userId: result.insertId });
    return res.status(201).json({ error: false, message: "User created successfully", userId: result.insertId });
  } catch (error) {
    console.error('Error creating account:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createAccount,
};
