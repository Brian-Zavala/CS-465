require('dotenv').config();
const mongoose = require('mongoose');
require('./db');
const User = mongoose.model('users');

const seedUser = async () => {
  try {
    await User.deleteMany({ email: 'admin@travlr.com' });
    
    const user = new User();
    user.name = 'Admin';
    user.email = 'admin@travlr.com';
    user.setPassword('password123');
    
    await user.save();
    console.log('Test user seeded: admin@travlr.com / password123');
  } catch (err) {
    console.error('Error seeding user:', err);
  } finally {
    mongoose.connection.close();
  }
};

seedUser();
