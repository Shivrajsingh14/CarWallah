import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import { 
  getCars, 
  getCarById, 
  createCar, 
  updateCar, 
  deleteCar, 
  updateCarAvailability,
  updateCarStock 
} from '../controllers/carController.js';
import { protect, admin } from '../middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Ensure the directory exists
    const uploadDir = path.join(__dirname, '../../public/uploads/');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueFilename);
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|webp/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Images only! Please upload an image (jpeg, jpg, png, webp)'));
  }
};

const upload = multer({ 
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Public routes
router.get('/', getCars);
router.get('/:id', getCarById);

// Admin routes
router.post('/', protect, admin, (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      console.error('Multer error:', err);
      return res.status(400).json({ 
        message: 'Image upload failed', 
        error: err.message 
      });
    }
    next();
  });
}, createCar);

router.put('/:id', protect, admin, (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      console.error('Multer error:', err);
      return res.status(400).json({ 
        message: 'Image upload failed', 
        error: err.message 
      });
    }
    next();
  });
}, updateCar);
router.delete('/:id', protect, admin, deleteCar);
router.put('/:id/availability', protect, admin, updateCarAvailability);
router.put('/:id/stock', protect, admin, updateCarStock);

export default router;
