// run: node createAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const User = require('./models/User');
const connectDB = require('./config/db');

(async () => {
  await connectDB();
  const exists = await User.findOne({ email: 'admin@site.com' });
  if (exists) {
    console.log('Admin already exists');
    process.exit(0);
  }
  const hash = await bcrypt.hash('admin123', 10);
  const u = new User({ name: 'Admin', email: 'admin@site.com', password: hash, role: 'admin' });
  await u.save();
  console.log('Admin created: admin@site.com / admin123');
  process.exit(0);
})();
