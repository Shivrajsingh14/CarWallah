import express from 'express';
import { 
  registerUser, 
  loginUser, 
  getUserProfile, 
  createAdminUser, 
  getAdminUsers 
} from '../controllers/authController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Get user profile
router.get('/profile', protect, getUserProfile);

// Admin routes
router.post('/create-admin', protect, admin, createAdminUser);
router.get('/admins', protect, admin, getAdminUsers);

export default router;
