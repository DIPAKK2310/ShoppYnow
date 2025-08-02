const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY || '12345';

// @desc Admin login controller
// @route POST /api/admin/login
const admin = async (req, res) => {
  const adminUser = {
    email: 'admin@example.com',
    password: '$2a$10$WVwBfmNJmiJoqQnR5qH3B.WgOAkirDxdknDOumSx9YfnFZ3xCLscS', // hashed: admin123
    role: 'admin'
  };

  const { email, password } = req.body;
  console.log('👉 Incoming login:', { email, password });

  if (email !== adminUser.email) {
    return res.status(401).json({ message: 'Invalid credentials (email)' });
  }

  const match = await bcrypt.compare(password, adminUser.password);
  if (!match) {
    return res.status(401).json({ message: 'Invalid credentials (password)' });
  }

  const token = jwt.sign(
    { email: adminUser.email, role: adminUser.role },
    secretKey,
    { expiresIn: '1h' }
  );

  res.status(200).json({
    message: '🟢 Admin logged in successfully',
    token,
    role: adminUser.role,
  });
};

module.exports = admin;
