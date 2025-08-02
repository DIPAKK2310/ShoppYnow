const jwt = require('jsonwebtoken');
const User = require('../models/Auth-user.js'); //require models for auth
require('dotenv').config();
const secretKey = process.env.JWT_SECRET_KEY
// Middleware to authenticate and get user data
const getUserData = async (req, res, next) => {
  try {
    // Get the token from the Authorization header
    const token = req.headers.authorization?.split(' ')[1];  // Bearer <token>

    // If no token is provided
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify the token
    const decoded = jwt.verify(token,secretKey ); // Use the same secret key as when you signed the token

    // Find the user based on the userId from the decoded token
    const user = await User.findById(decoded.userId).select("-password");

    // If user is not found
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Attach user data to the request object
    req.user = user;

    // Pass control to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = getUserData;
