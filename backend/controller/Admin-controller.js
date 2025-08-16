// Fixed Admin Controller (controllers/Admin-controller.js)
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin-model.js'); // Import your User model
const secretKey = process.env.JWT_SECRET_KEY || '12345';

// @desc Admin login controller
// @route POST /api/admin/login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Don't log password for security
    console.log('👉 Admin login attempt for:', email);

    // Input validation
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Email and password are required' 
      });
    }
console.log("Login body received", req.body)
    // Find user in database with admin role
    const adminUser = await Admin.findOne({ 
      email: email.toLowerCase(),
    });

    if (!adminUser) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid admin credentials' 
      });
    }

    // Compare password with the hashed password in database
    const isMatch = await bcrypt.compare(password, adminUser.password);
    
    if (!isMatch) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid admin credentials' 
      });
    }

    // Generate JWT token
  
    const token = adminUser.generateToken(); // ✅ now uses Admin model method

    res.status(200).json({
      success: true,
      message: '🟢 Admin logged in successfully',
      token,
      admin: {
        id: adminUser._id,
        username: adminUser.username,
        email: adminUser.email,
        role: adminUser.role
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

module.exports = {adminLogin};