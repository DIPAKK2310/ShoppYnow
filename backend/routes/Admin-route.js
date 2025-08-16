const express = require('express');
const Admin = require('../models/Admin-model');
const authenticateAdmin = require('../middleware/Admin-middleware');
const {adminLogin} = require('../controller/Admin-controller');

const router = express.Router();

// @desc Admin Login (GET token)
// @route POST /api/admin/login
router.post("/login", adminLogin); // 🔐 Admin login to get JWT token

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
router.get('/admins', authenticateAdmin, async (req, res) => {
  try {
    const admins = await Admin.find().select('-password');//Exclude password
    res.status(200).json(admins);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// @desc Delete User by ID
// @route DELETE /api/admin/users/:userId
router.delete('/admins/:adminId', authenticateAdmin, async (req, res) => {
  try {
    const deleteAdmin = await Admin.findByIdAndDelete(req.params.adminId);
    if (!deleteAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.status(200).json({ message: '🗑️ Admin deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc Update User by ID
// @route PUT /api/admin/users/:userId
router.put('/admins/:adminId', authenticateAdmin, async (req, res) => {
  try {
    const { username, email,} = req.body;

    if (password) {
      const bcrypt = require('bcryptjs');
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.params.adminId,
       updateData,
      { new: true, runValidators: true }
    ).select('-password');//password excluded
    if (!updatedAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.status(200).json({ message: 'Admin updated', updatedAdmin });
  } catch (err) {
    console.error('Error updating admin:', err.message);
    res.status(500).json({ message: 'Server error while updating user' });
  }
});

module.exports = router;
