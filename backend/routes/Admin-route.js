const express = require('express');
const User = require('../models/Auth-user');
const authenticateAdmin = require('../middleware/Admin-middleware');
const admin = require('../controller/Admin-controller');

const router = express.Router();

// @desc Admin Login (GET token)
// @route POST /api/admin/login
router.post("/login", admin); // 🔐 Admin login to get JWT token

// @desc Check Admin Access
// @route GET /api/admin/protected
router.get("/protected", authenticateAdmin, async (req, res) => {
  try {
    res.status(200).json({
      message: '✅ Admin Authenticated Successfully',
      admin: req.admin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc Get All Users (Admin Only)
// @route GET /api/admin/users
router.get('/users', authenticateAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// @desc Delete User by ID
// @route DELETE /api/admin/users/:userId
router.delete('/users/:userId', authenticateAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: '🗑️ User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc Update User by ID
// @route PUT /api/admin/users/:userId
router.put('/users/:userId', authenticateAdmin, async (req, res) => {
  try {
    const { username, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { username, email },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User updated', updatedUser });
  } catch (err) {
    console.error('Error updating user:', err.message);
    res.status(500).json({ message: 'Server error while updating user' });
  }
});

module.exports = router;
