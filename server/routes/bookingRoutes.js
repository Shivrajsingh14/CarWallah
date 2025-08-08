import express from 'express';
import { 
  getBookings, 
  getBookingById, 
  createBooking, 
  updateBookingStatus, 
  updateBooking, 
  deleteBooking, 
  getBookingStats 
} from '../controllers/bookingController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Admin routes
router.get('/', protect, admin, getBookings);
router.get('/stats', protect, admin, getBookingStats);
router.get('/:id', protect, admin, getBookingById);
router.put('/:id/status', protect, admin, updateBookingStatus);
router.put('/:id', protect, admin, updateBooking);
router.delete('/:id', protect, admin, deleteBooking);

// Public/User routes
router.post('/', createBooking);

export default router;
