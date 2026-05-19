const express = require('express');
const { adminLogin, getAllUsers, deleteUser, updateUser } = require('../controller/Admin-controller');
const authMiddleware = require('../middleware/Auth-middleware');
const roleMiddleware = require('../middleware/Role-middleware');

const router = express.Router();

// Admin login (public)
router.post('/login', adminLogin);

// User management (admin only)
router.get('/users', authMiddleware, roleMiddleware('admin'), getAllUsers);
router.delete('/users/:userId', authMiddleware, roleMiddleware('admin'), deleteUser);
router.put('/users/:userId', authMiddleware, roleMiddleware('admin'), updateUser);

module.exports = router;
