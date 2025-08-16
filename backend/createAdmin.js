const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const Admin = require('./models/Admin-model'); // Adjust path if needed

// 1️⃣ Connect to MongoDB
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
  
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
        console.log('⚠️ Admin already exists');
  
        // ✅ Example: Check password using bcrypt
        const isPasswordCorrect = await bcrypt.compare(plainPassword, existingAdmin.password);
        console.log('Password match?', isPasswordCorrect); // true or false
  
        return process.exit(0);
      }
  
      const hashedPassword = await bcrypt.hash(plainPassword, 10);
  
      const newAdmin = await Admin.create({
        username: 'SuperAdmin',
        email,
        password: hashedPassword,
      });
  
      console.log('🟢 Admin created successfully:', newAdmin);
  
      // ✅ Optional: Check password immediately
      const isPasswordCorrect = await bcrypt.compare(plainPassword, newAdmin.password);
      console.log('Password match?', isPasswordCorrect); // true
  
      process.exit(0);
    } catch (err) {
      console.error('Error creating admin:', err);
      process.exit(1);
    }
  };
  