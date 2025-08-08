import mongoose from 'mongoose';

const CarSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a car name'],
    trim: true
  },
  brand: {
    type: String,
    required: [true, 'Please provide a brand'],
    trim: true
  },
  model: {
    type: String,
    required: [true, 'Please provide a model'],
    trim: true
  },
  type: {
    type: String,
    required: [true, 'Please provide a car type'],
    enum: ['SUV', 'Sedan', 'Hatchback', 'MPV'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price per day']
  },
  transmission: {
    type: String,
    required: [true, 'Please provide transmission type'],
    enum: ['Manual', 'Automatic'],
    trim: true
  },
  fuel: {
    type: String,
    required: [true, 'Please provide fuel type'],
    enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
    trim: true
  },  seats: {
    type: Number,
    required: [true, 'Please provide seating capacity'],
    min: 2,
    max: 10
  },
  stock: {
    type: Number,
    required: [true, 'Please provide number of cars available'],
    default: 1,
    min: 0
  },
  isBooked: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  image: {
    type: String,
    required: [true, 'Please provide an image']
  },
  description: {
    type: String,
    trim: true
  },
  features: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Car = mongoose.model('Car', CarSchema);
export default Car;
