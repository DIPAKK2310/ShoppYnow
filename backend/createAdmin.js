const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const User = require('./models/Auth-user'); // ✅ Correct model

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

const createAdmin = async () => {
  try {
    const email = 'admin@example.com';
    const plainPassword = 'admin123';

    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      // If exists but not admin, upgrade to admin
      if (existingAdmin.role !== 'admin') {
        existingAdmin.role = 'admin';
        await existingAdmin.save();
        console.log('✅ Existing user upgraded to admin role');
      } else {
        console.log('⚠️ Admin already exists');
      }

      const isPasswordCorrect = await bcrypt.compare(plainPassword, existingAdmin.password);
      console.log('Password match?', isPasswordCorrect);
      return process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const newAdmin = await User.create({
      username: 'SuperAdmin',
      email,
      password: hashedPassword,
      role: 'admin', // ✅ Set role explicitly
    });

    console.log('🟢 Admin created successfully:', newAdmin.email, '| role:', newAdmin.role);

    const isPasswordCorrect = await bcrypt.compare(plainPassword, newAdmin.password);
    console.log('Password match?', isPasswordCorrect);

    process.exit(0);
  } catch (err) {
    console.error('Error creating admin:', err);
    process.exit(1);
  }
};

createAdmin();