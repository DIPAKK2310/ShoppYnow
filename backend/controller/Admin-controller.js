// Fixed Admin Controller (controllers/Admin-controller.js)
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Auth-user');
const { get } = require('mongoose');
const secretKey = process.env.JWT_SECRET_KEY || '12345';

// @desc Admin login controller
// @route POST /api/admin/login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    
    // Input validation
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Email and password are required' 
      });
    }


    const admin = await User.findOne({ 
      email: email.toLowerCase(),
      role: 'admin'
    });

    if (!admin) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid admin credentials' 
      });
    }

    // Compare password with the hashed password in database
    const isMatch = await bcrypt.compare(password, admin.password);
    
    if (!isMatch) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid admin credentials' 
      });
    }

    // Generate JWT token
  
    const token = admin.generateToken(); // ✅ now uses Admin model method

    res.status(200).json({
      success: true,
      message: '🟢 Admin logged in successfully',
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role
      }
    });

  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during admin login'
    });
  }
};


// Example: Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {adminLogin, getAllUsers};