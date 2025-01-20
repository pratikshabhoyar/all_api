const jwt = require('jsonwebtoken');

const generateOTP = (mobileNumber, countryCode) => {
  const otpPayload = {
    mobileNumber,
    countryCode,
    otp: Math.floor(100000 + Math.random() * 900000), // Generate a 6-digit OTP
  };
  const otpToken = jwt.sign(otpPayload, 'your-secret-key', { expiresIn: '5m' }); // Replace 'your-secret-key' with an environment variable in production
  return otpToken;
};

const verifyOTP = (otpToken) => {
  try {
    const decoded = jwt.verify(otpToken, 'your-secret-key'); // Use the same secret key
    return decoded;
  } catch (err) {
    throw new Error('Invalid or expired OTP');
  }
};

module.exports = {
  generateOTP, // Ensure this is exported
  verifyOTP,   // Ensure this is exported
};
