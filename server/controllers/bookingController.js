import Booking from '../models/Booking.js';
import Car from '../models/Car.js';
import { format } from 'date-fns';

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate('car', 'name brand model image')
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private/Admin
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('car', 'name brand model type transmission fuel seats price image')
      .populate('user', 'name email phone');
    
    if (booking) {
      res.json(booking);
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
  try {
    const {
      carId,
      userId,
      customerName,
      customerEmail,
      customerPhone,
      startDate,
      endDate,
      totalDays,
      totalPrice,
      advancePayment,
      paymentMethod,
      notes
    } = req.body;
    
    // Validate required fields
    if (!carId || !customerName || !customerEmail || !customerPhone || !startDate || !endDate || !totalDays || !totalPrice) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
      // Check if car exists
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    
    // Check if car is in stock
    if (car.stock <= 0) {
      return res.status(400).json({ message: 'This car is currently out of stock' });
    }
    
    // Check if car is available for the given dates
    const isAvailable = await Booking.checkAvailability(
      carId,
      new Date(startDate),
      new Date(endDate)
    );
    
    if (!isAvailable) {
      return res.status(400).json({ message: 'Car is not available for the selected dates' });
    }
    
    // Generate a unique booking ID
    const bookingId = 'BK' + Date.now().toString().slice(-8) + Math.floor(Math.random() * 1000);
    
    // Create booking
    const booking = await Booking.create({
      bookingId,
      car: carId,
      carName: car.name,
      user: userId || null,
      customerName,
      customerEmail,
      customerPhone,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      totalDays,
      totalPrice,
      advancePayment: advancePayment || 0,
      paymentMethod: paymentMethod || 'cash',
      notes,
      status: 'pending',
      paymentStatus: advancePayment > 0 ? 'partial' : 'unpaid'
    });
      if (booking) {
      // Decrement car stock on successful booking
      car.stock = Math.max(0, car.stock - 1);
      await car.save();
      
      res.status(201).json(booking);
    } else {
      res.status(400).json({ message: 'Invalid booking data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private/Admin
const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    const { status, paymentStatus } = req.body;      // Update status
      if (status) {
        booking.status = status;
        
        // Update car availability if booking is confirmed or cancelled
        if (status === 'confirmed' || status === 'cancelled') {
          const car = await Car.findById(booking.car);
          if (car) {
            const today = new Date();
            const startDate = new Date(booking.startDate);
            const endDate = new Date(booking.endDate);
            
            // If today is between start and end dates, update car availability
            if (status === 'confirmed' && startDate <= today && endDate >= today) {
              car.isBooked = true;
              await car.save();
            } else if (status === 'cancelled') {
              // Return the car to stock
              car.stock += 1;
              
              // Check if there are other confirmed bookings for this car
              const otherBookings = await Booking.find({
                car: booking.car,
                _id: { $ne: booking._id },
                status: 'confirmed',
                startDate: { $lte: today },
                endDate: { $gte: today }
              });
              
              if (otherBookings.length === 0) {
                car.isBooked = false;
              }
              
              await car.save();
            }
          }
        }
      }
    
    // Update payment status
    if (paymentStatus) {
      booking.paymentStatus = paymentStatus;
    }
    
    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update booking
// @route   PUT /api/bookings/:id
// @access  Private/Admin
const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    const {
      startDate,
      endDate,
      totalDays,
      totalPrice,
      advancePayment,
      status,
      paymentStatus,
      paymentMethod,
      notes
    } = req.body;
    
    // Check availability if dates are changed
    if ((startDate && startDate !== booking.startDate.toISOString().substring(0, 10)) || 
        (endDate && endDate !== booking.endDate.toISOString().substring(0, 10))) {
      
      const isAvailable = await Booking.checkAvailability(
        booking.car,
        startDate ? new Date(startDate) : booking.startDate,
        endDate ? new Date(endDate) : booking.endDate,
        booking._id
      );
      
      if (!isAvailable) {
        return res.status(400).json({ message: 'Car is not available for the selected dates' });
      }
    }
    
    // Update fields
    if (startDate) booking.startDate = new Date(startDate);
    if (endDate) booking.endDate = new Date(endDate);
    if (totalDays) booking.totalDays = totalDays;
    if (totalPrice) booking.totalPrice = totalPrice;
    if (advancePayment !== undefined) booking.advancePayment = advancePayment;
    if (status) booking.status = status;
    if (paymentStatus) booking.paymentStatus = paymentStatus;
    if (paymentMethod) booking.paymentMethod = paymentMethod;
    if (notes !== undefined) booking.notes = notes;
    
    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete booking
// @route   DELETE /api/bookings/:id
// @access  Private/Admin
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    await Booking.deleteOne({ _id: req.params.id });
    res.json({ message: 'Booking removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get booking statistics
// @route   GET /api/bookings/stats
// @access  Private/Admin
const getBookingStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const endOfToday = new Date(today);
    endOfToday.setHours(23, 59, 59, 999);
    
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999);
    
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    
    // Get daily stats
    const dailyBookings = await Booking.find({
      createdAt: { $gte: today, $lte: endOfToday }
    });
    
    const dailyRevenue = dailyBookings.reduce((sum, booking) => sum + booking.advancePayment, 0);
    
    // Get monthly stats
    const monthlyBookings = await Booking.find({
      createdAt: { $gte: startOfMonth, $lte: endOfMonth }
    });
    
    const monthlyRevenue = monthlyBookings.reduce((sum, booking) => sum + booking.advancePayment, 0);
    
    // Get top rented cars
    const topCars = await Booking.aggregate([
      { $match: { status: { $in: ['confirmed', 'completed'] } } },
      { $group: { _id: '$car', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);
    
    // Populate car details
    const topCarsWithDetails = await Car.populate(topCars, {
      path: '_id',
      select: 'name brand model image'
    });
    
    // Get booking trends for past 7 days
    const bookingTrends = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const nextDate = new Date(date);
      nextDate.setDate(date.getDate() + 1);
      nextDate.setHours(0, 0, 0, 0);
      
      const count = await Booking.countDocuments({
        createdAt: { $gte: date, $lt: nextDate }
      });
      
      bookingTrends.push({
        date: format(date, 'yyyy-MM-dd'),
        label: format(date, 'EEE'),
        count
      });
    }
    
    res.json({
      dailyBookings: dailyBookings.length,
      dailyRevenue,
      monthlyBookings: monthlyBookings.length,
      monthlyRevenue,
      topCars: topCarsWithDetails.map(item => ({
        car: item._id,
        count: item.count
      })),
      bookingTrends
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export {
  getBookings,
  getBookingById,
  createBooking,
  updateBookingStatus,
  updateBooking,
  deleteBooking,
  getBookingStats
};
