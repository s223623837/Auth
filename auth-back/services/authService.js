const jwt = require('jsonwebtoken');

// Generate JWT token
exports.generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '18h' }); // 18 hour expiry
};
