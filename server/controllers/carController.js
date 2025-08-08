import Car from '../models/Car.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// @desc    Get all cars
// @route   GET /api/cars
// @access  Public
const getCars = async (req, res) => {
  try {
    const cars = await Car.find({});
    res.json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get single car by ID
// @route   GET /api/cars/:id
// @access  Public
const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    
    if (car) {
      res.json(car);
    } else {
      res.status(404).json({ message: 'Car not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create a new car
// @route   POST /api/cars
// @access  Private/Admin
const createCar = async (req, res) => {  try {
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);
    
    const { 
      name, brand, model, type, price, 
      transmission, fuel, seats, stock,
      description, features 
    } = req.body;

    // Handle file upload
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image' });
    }

    // Parse features properly
    let featuresArray = [];
    if (features) {
      if (typeof features === 'string') {
        featuresArray = features.split(',').map(item => item.trim()).filter(Boolean);
      } else if (Array.isArray(features)) {
        featuresArray = features;
      }
    }

    // Create car
    const car = await Car.create({
      name,
      brand,
      model,
      type,
      price,
      transmission,
      fuel,
      seats: parseInt(seats),
      stock: parseInt(stock || 1),
      isBooked: false,
      isActive: true,
      image: `/uploads/${req.file.filename}`,
      description,
      features: featuresArray
    });

    if (car) {
      res.status(201).json(car);
    } else {
      res.status(400).json({ message: 'Invalid car data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update a car
// @route   PUT /api/cars/:id
// @access  Private/Admin
const updateCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
      const { 
      name, brand, model, type, price, 
      transmission, fuel, seats, isActive, stock,
      description, features 
    } = req.body;
    
    // Update fields
    car.name = name || car.name;
    car.brand = brand || car.brand;
    car.model = model || car.model;
    car.type = type || car.type;
    car.price = price || car.price;
    car.transmission = transmission || car.transmission;
    car.fuel = fuel || car.fuel;
    car.seats = seats ? parseInt(seats) : car.seats;
    car.stock = stock ? parseInt(stock) : car.stock;
    car.isActive = isActive !== undefined ? isActive : car.isActive;
    car.description = description || car.description;
    car.features = features ? features.split(',').map(item => item.trim()) : car.features;
    
    // Handle file upload if there's a new image
    if (req.file) {
      // Delete previous image if it exists
      if (car.image && car.image !== '/placeholder.svg') {
        const imagePath = path.join(__dirname, '../../public', car.image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
      car.image = `/uploads/${req.file.filename}`;
    }
    
    const updatedCar = await car.save();
    res.json(updatedCar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete a car
// @route   DELETE /api/cars/:id
// @access  Private/Admin
const deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    
    // Delete image if it exists
    if (car.image && car.image !== '/placeholder.svg') {
      const imagePath = path.join(__dirname, '../../public', car.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    await Car.deleteOne({ _id: req.params.id });
    res.json({ message: 'Car removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update car availability
// @route   PUT /api/cars/:id/availability
// @access  Private/Admin
const updateCarAvailability = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    
    car.isBooked = req.body.isBooked;
    
    const updatedCar = await car.save();
    res.json(updatedCar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update car stock
// @route   PUT /api/cars/:id/stock
// @access  Private/Admin
const updateCarStock = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    
    const { stock } = req.body;
    
    if (stock !== undefined) {
      car.stock = parseInt(stock);
    }
    
    const updatedCar = await car.save();
    res.json(updatedCar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export {
  getCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
  updateCarAvailability,
  updateCarStock
};
