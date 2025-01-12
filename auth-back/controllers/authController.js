const User = require('../models/User');
const { generateToken } = require('../services/authService');
const bcrypt = require('bcryptjs');

// Register a new user
exports.register = async (req, res) => {
    try {
        const { username, email, password, roles } = req.body;
        
        // Check if the email or username already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Email or Username already exists.' });
        }

        // Create a new user
        const user = new User({
            username,
            email,
            password,
            roles,
        });

        // Save user to the database
        await user.save();
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Login a user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // Compare provided password with hashed password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // Generate a JWT token
        const token = generateToken(user._id);

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Verify token
exports.verifyToken = (req, res) => {
    try {
        res.status(200).json({ message: 'Token is valid', user: req.user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
