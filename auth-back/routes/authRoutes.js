const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Route to register a new user
router.post('/register', authController.register);

// Route to login a user
router.post('/login', authController.login);

// Route to verify the token
router.get('/verify-token', verifyToken, authController.verifyToken);

module.exports = router;
