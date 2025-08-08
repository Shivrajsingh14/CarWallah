import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import { connectDB } from '../config/db.js';

// Load env vars
dotenv.config();

// Connect to database
await connectDB();

const createAdminUser = async () => {
  try {
    // Check if admin already exists
    const adminExists = await User.findOne({ role: 'admin' });
    
    if (adminExists) {
      console.log('Admin user already exists.');
      process.exit(0);
    }
    
    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@carwallah.com',
      password: 'admin123',
      role: 'admin'
    });
    
    console.log('Admin user created successfully:');
    console.log({
      name: admin.name,
      email: admin.email,
      role: admin.role
    });
    
    console.log('\nPlease use these credentials to login to the admin panel.');
    console.log('Email: admin@carwallah.com');
    console.log('Password: admin123');
    console.log('\nMake sure to change the password after first login!');
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    // Disconnect from database
    await mongoose.disconnect();
    process.exit(0);
  }
};

createAdminUser();
