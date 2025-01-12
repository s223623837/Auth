const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1]; // Expecting 'Bearer <token>'
        
        if (!token) {
            return res.status(403).json({ message: 'Token is required.' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // You should have JWT_SECRET in environment
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized.' });
        }

        req.user = user; // Attach user data to request object
        next(); // Continue to next middleware or route handler
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token.' });
    }
};

module.exports = { verifyToken };
