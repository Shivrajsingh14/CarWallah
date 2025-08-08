import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    required: true,
    unique: true
  },
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: true
  },
  carName: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // For anonymous bookings
  },
  customerName: {
    type: String,
    required: true
  },
  customerEmail: {
    type: String,
    required: true,
    lowercase: true
  },
  customerPhone: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  totalDays: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  advancePayment: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'partial', 'paid'],
    default: 'unpaid'
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'upi', 'bank-transfer'],
    default: 'cash'
  },
  notes: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Pre-save middleware to update timestamps
BookingSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Method to check if booking dates overlap with existing bookings
BookingSchema.statics.checkAvailability = async function(carId, startDate, endDate, excludeBookingId = null) {
  console.log('Checking availability for car:', carId);
  console.log('Requested dates:', { startDate, endDate });
  
  const query = {
    car: carId,
    status: { $in: ['pending', 'confirmed'] },
    $and: [
      { startDate: { $lt: endDate } },
      { endDate: { $gt: startDate } }
    ]
  };
  
  // Exclude current booking when updating
  if (excludeBookingId) {
    query._id = { $ne: excludeBookingId };
  }
  
  console.log('Availability query:', JSON.stringify(query, null, 2));
  
  const existingBookings = await this.find(query);
  console.log('Found conflicting bookings:', existingBookings.length);
  
  if (existingBookings.length > 0) {
    console.log('Conflicting booking details:', existingBookings.map(b => ({
      id: b._id,
      startDate: b.startDate,
      endDate: b.endDate,
      status: b.status
    })));
  }
  
  const isAvailable = existingBookings.length === 0;
  console.log('Is available:', isAvailable);
  
  return isAvailable;
};

const Booking = mongoose.model('Booking', BookingSchema);
export default Booking;
