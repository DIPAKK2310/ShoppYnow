const express = require('express');
const { adminLogin, getAllUsers } = require('../controller/Admin-controller');
const authMiddleware = require('../middleware/auth-middleware');
const roleMiddleware = require('../middleware/Role-middleware');

const router = express.Router();

router.post('/login', adminLogin);
router.get('/users', authMiddleware, roleMiddleware('admin'), getAllUsers);

module.exports = router;
