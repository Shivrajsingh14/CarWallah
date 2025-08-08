import { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { CalendarIcon, Car, Clock, MapPin, Phone, User, Mail, CreditCard, Filter, Check, Search } from 'lucide-react';
import { format, differenceInDays, isAfter, isBefore, addDays } from 'date-fns';
import { cn } from '@/lib/utils';
import BookingModal from './BookingModal';

// Car data with pricing and booking status
const initialCars = [
  { id: 1, name: 'Mahindra Thar', type: 'SUV', price: 2500, image: 'https://images.unsplash.com/photo-1679921046507-d0d9ab3f3964?q=80&w=1000&auto=format&fit=crop', fuel: 'Diesel', seats: 4, isBooked: false, transmission: 'Manual', ac: true, bookedDates: [] },
  { id: 2, name: 'Hyundai Creta', type: 'SUV', price: 2200, image: 'https://images.unsplash.com/photo-1549399542-7e8f2e928464?q=80&w=1000&auto=format&fit=crop', fuel: 'Petrol', seats: 5, isBooked: false, transmission: 'Automatic', ac: true, bookedDates: [] },
  { id: 3, name: 'Toyota Innova', type: 'MPV', price: 2800, image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1000&auto=format&fit=crop', fuel: 'Diesel', seats: 7, isBooked: false, transmission: 'Manual', ac: true, bookedDates: [] },
  { id: 4, name: 'Maruti Swift', type: 'Hatchback', price: 1500, image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=1000&auto=format&fit=crop', fuel: 'Petrol', seats: 4, isBooked: false, transmission: 'Manual', ac: true, bookedDates: [] },
  { id: 5, name: 'Honda City', type: 'Sedan', price: 2000, image: 'https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?q=80&w=1000&auto=format&fit=crop', fuel: 'Petrol', seats: 5, isBooked: false, transmission: 'Automatic', ac: true, bookedDates: [] },
  { id: 6, name: 'Mahindra Scorpio', type: 'SUV', price: 2600, image: 'https://images.unsplash.com/photo-1661956602926-db6b25f75947?q=80&w=1000&auto=format&fit=crop', fuel: 'Diesel', seats: 7, isBooked: false, transmission: 'Manual', ac: true, bookedDates: [] },
  { id: 7, name: 'Tata Nexon', type: 'SUV', price: 1800, image: 'https://images.unsplash.com/photo-1619405399537-b3cf27374e1c?q=80&w=1000&auto=format&fit=crop', fuel: 'Petrol', seats: 5, isBooked: false, transmission: 'Manual', ac: true, bookedDates: [] },
  { id: 8, name: 'Ford EcoSport', type: 'SUV', price: 1900, image: 'https://images.unsplash.com/photo-1594070319944-7c0cbebb6094?q=80&w=1000&auto=format&fit=crop', fuel: 'Petrol', seats: 5, isBooked: false, transmission: 'Automatic', ac: true, bookedDates: [] },
];

interface Booking {
  id: string;
  carId: string;
  carName: string;
  startDate: string;
  endDate: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  totalDays: number;
  totalPrice: number;
  bookingDate: string;
}

// Car interface for BookingModal compatibility
interface CarModalProps {
  _id: string;
  name: string;
  type: string;
  seating: number;
  transmission: string;
  fuel: string;
  status: 'available' | 'booked' | 'maintenance';
  price: number;
  image: string;
  description: string;
}

const BookingSection = () => {
  const [cars, setCars] = useState(initialCars);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedCar, setSelectedCar] = useState<typeof cars[0] | null>(null);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [isLoading, setIsLoading] = useState(false);  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterTransmission, setFilterTransmission] = useState('all');
  const [filterSeats, setFilterSeats] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  // Modal state and handlers
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Filter cars based on search and filters
  const filteredCars = cars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || !filterType ? true : car.type === filterType;
    const matchesTransmission = filterTransmission === 'all' || !filterTransmission ? true : car.transmission === filterTransmission;
    const matchesSeats = filterSeats === 'all' || !filterSeats ? true : car.seats.toString() === filterSeats;
    
    return matchesSearch && matchesType && matchesTransmission && matchesSeats;
  });

  // Calculate total days and price
  const totalDays = startDate && endDate ? Math.max(1, differenceInDays(endDate, startDate) + 1) : 0;
  const totalPrice = selectedCar ? selectedCar.price * totalDays : 0;
  const advancePayment = totalPrice * 0.5;
  
  const handleBookNow = (car: typeof cars[0]) => {
    if (!car.isBooked) {
      setSelectedCar(car);
      setIsModalOpen(true);
    }
  };
  
  const handleBookingComplete = (booking: Booking) => {
    setBookings(prev => [...prev, booking]);
    
    // Update car status if booking covers current date
    const today = new Date();
    const bookingStart = new Date(booking.startDate);
    const bookingEnd = new Date(booking.endDate);
    
    if (bookingStart <= today && bookingEnd >= today) {
      setCars(prev => prev.map(car => 
        car.id.toString() === booking.carId 
          ? { ...car, isBooked: true }
          : car
      ));
    }
    
    toast({
      title: "Booking Confirmed! 🎉",
      description: `Your ${booking.carName} is booked for ${booking.totalDays} days.`,
    });
  };

  // Animate on scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          entry.target.classList.remove('opacity-0');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

    // Slight delay to ensure DOM is ready
    setTimeout(() => {
      const animatedElements = document.querySelectorAll('.animate-on-scroll');
      animatedElements.forEach(el => observer.observe(el));
    }, 100);

    return () => {
      const animatedElements = document.querySelectorAll('.animate-on-scroll');
      animatedElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  // Validate booking dates
  const isDateValid = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return isAfter(date, addDays(today, -1));
  };

  const handleCarSelect = (carId: string) => {
    const car = cars.find(c => c.id.toString() === carId);
    setSelectedCar(car || null);
    setIsFormVisible(true);
    
    // Scroll to booking form
    const bookingForm = document.querySelector('.booking-form');
    if (bookingForm) {
      bookingForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDirectBooking = (car: typeof cars[0]) => {
    setSelectedCar(car);
    setIsFormVisible(true);
    // Scroll to booking form
    const bookingForm = document.querySelector('.booking-form');
    if (bookingForm) {
      bookingForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const checkDateAvailability = (carId: number, start: Date, end: Date) => {
    const carBookings = bookings.filter(booking => booking.carId === carId.toString());
    
    for (const booking of carBookings) {
      const bookingStart = new Date(booking.startDate);
      const bookingEnd = new Date(booking.endDate);
      
      // Check if dates overlap
      if ((start <= bookingEnd) && (end >= bookingStart)) {
        return false;
      }
    }
    return true;
  };

  const handleBooking = async () => {
    // Validation
    if (!selectedCar) {
      toast({
        title: "Please select a car",
        description: "Choose from our available vehicles",
        variant: "destructive"
      });
      return;
    }

    if (!startDate || !endDate) {
      toast({
        title: "Please select dates",
        description: "Both start and end dates are required",
        variant: "destructive"
      });
      return;
    }

    if (isBefore(endDate, startDate)) {
      toast({
        title: "Invalid date range",
        description: "End date must be after start date",
        variant: "destructive"
      });
      return;
    }

    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      toast({
        title: "Please fill in your details",
        description: "Name, email, and phone are required",
        variant: "destructive"
      });
      return;
    }

    // Check availability
    if (!checkDateAvailability(selectedCar.id, startDate, endDate)) {
      toast({
        title: "Car not available",
        description: "This car is already booked for the selected dates",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate booking process
      await new Promise(resolve => setTimeout(resolve, 2000));

      const newBookingId = Math.random().toString(36).substr(2, 9).toUpperCase();
      setBookingId(newBookingId);
      
      const newBooking: Booking = {
        id: newBookingId,
        carId: selectedCar.id.toString(),
        carName: selectedCar.name,
        startDate: format(startDate, 'yyyy-MM-dd'),
        endDate: format(endDate, 'yyyy-MM-dd'),
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        customerPhone: customerInfo.phone,
        totalDays,
        totalPrice,
        bookingDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
      };

      // Add booking to state
      setBookings(prev => [...prev, newBooking]);

      // Update car status if booking covers current date
      const today = new Date();
      if (startDate <= today && endDate >= today) {
        setCars(prev => prev.map(car => 
          car.id.toString() === selectedCar.id.toString() 
            ? { ...car, isBooked: true }
            : car
        ));
      }

      console.log('New Booking:', newBooking);
      console.log('All Bookings:', [...bookings, newBooking]);

      // Show success message
      setShowSuccessMessage(true);

    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedCar(null);
    setStartDate(undefined);
    setEndDate(undefined);
    setCustomerInfo({ name: '', email: '', phone: '', address: '' });
    setShowSuccessMessage(false);
    setIsFormVisible(false);
  };  return (
    <section id="booking" className="py-20 bg-gradient-to-br from-[#0a1a35] via-[#152a4a] to-[#0a1a35] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Particles */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-amber-400 rounded-full animate-float-1"></div>
        <div className="absolute top-20 right-20 w-3 h-3 bg-amber-400 rounded-full animate-float-2"></div>
        <div className="absolute bottom-20 left-20 w-2 h-2 bg-amber-400 rounded-full animate-float-3"></div>
        <div className="absolute bottom-10 right-10 w-1 h-1 bg-amber-400 rounded-full animate-float-1"></div>

        {/* Geometric Shapes */}
        <div className="absolute top-20 left-1/4 w-32 h-32 border border-amber-400 rounded-full opacity-20 animate-spin-slow"></div>
        <div className="absolute bottom-20 right-1/4 w-24 h-24 border border-amber-400 opacity-30 animate-pulse-slow"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 animate-on-scroll opacity-0">
          <h2 className="text-4xl font-bold text-white mb-4">
            Book Your <span className="text-amber-400">Dream Car</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Simple, secure, and hassle-free booking process. Reserve your car in minutes!
          </p>
        </div>        {/* Search & Filter Bar */}
        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg mb-10 animate-on-scroll opacity-0 border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-amber-400" size={18} />
                <Input 
                  placeholder="Search cars..." 
                  className="pl-10 bg-white/5 border-white/30 text-white placeholder:text-gray-300 focus:border-amber-400 focus:ring-amber-400 h-12"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div>              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="Car Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="SUV">SUV</SelectItem>
                  <SelectItem value="Sedan">Sedan</SelectItem>
                  <SelectItem value="Hatchback">Hatchback</SelectItem>
                  <SelectItem value="MPV">MPV</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>              <Select value={filterTransmission} onValueChange={setFilterTransmission}>
                <SelectTrigger>
                  <SelectValue placeholder="Transmission" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Transmissions</SelectItem>
                  <SelectItem value="Manual">Manual</SelectItem>
                  <SelectItem value="Automatic">Automatic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>              <Select value={filterSeats} onValueChange={setFilterSeats}>
                <SelectTrigger>
                  <SelectValue placeholder="Seats" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Seats</SelectItem>
                  <SelectItem value="4">4 Seats</SelectItem>
                  <SelectItem value="5">5 Seats</SelectItem>
                  <SelectItem value="7">7 Seats</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>        {/* Car Grid */}        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Only show first 8 cars on homepage */}
          {filteredCars.slice(0, 8).map((car, index) => (
            <Card 
              key={car.id} 
              className={`overflow-hidden card-hover-effect transition-all duration-300 animate-on-scroll opacity-0 cursor-pointer border border-white/20 bg-white/5 backdrop-blur-sm ${car.isBooked ? 'opacity-70 grayscale' : ''}`}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
              }}
              onClick={() => !car.isBooked && handleBookNow(car)}
            >
              <div className="relative h-48">
                <img 
                  src={car.image} 
                  alt={car.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                
                <div className="absolute bottom-0 w-full p-4 text-white">
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="text-xl font-bold">{car.name}</h3>
                      <p className="text-sm text-gray-200">{car.type}</p>
                    </div>
                    <div className="text-lg font-bold text-amber-400">₹{car.price}<span className="text-xs text-white">/day</span></div>
                  </div>
                </div>
                
                {car.isBooked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold transform -rotate-12">
                      Currently Booked
                    </div>
                  </div>
                )}
              </div>
                <CardContent className="p-4 bg-transparent text-white border-t border-white/10">
                <div className="grid grid-cols-2 gap-y-3 text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4 text-amber-400" />
                    <span>{car.transmission}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-amber-400" />
                    <span>{car.seats} Seats</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-400" />
                    <span>{car.fuel}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>24/7 Support</span>
                  </div>
                </div>
                  <Button 
                  className="w-full bg-amber-400 hover:bg-amber-500 text-[#0a1a35] font-semibold group"
                  disabled={car.isBooked}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookNow(car);
                  }}
                >
                  {car.isBooked ? 'Unavailable' : 'Book Now'}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
          {filteredCars.length === 0 && (
          <div className="text-center py-12 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg my-6 border border-white/20 animate-fade-in-up">
            <Car className="w-16 h-16 text-amber-400/70 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">No Cars Found</h3>
            <p className="text-gray-300 mb-4">Try changing your filters or search query</p>
            <Button 
              variant="outline" 
              className="mt-4 border-amber-400 text-amber-400 hover:bg-amber-400/10"
              onClick={() => {
                setFilterType('all');
                setFilterTransmission('all');
                setFilterSeats('all');
                setSearchQuery('');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}{/* View All Cars Button */}
        <div className="text-center mt-12 animate-on-scroll opacity-0">
          <a href="/cars">
            <Button 
              className="bg-white/10 backdrop-blur-sm hover:bg-amber-400 text-white hover:text-[#0a1a35] border border-amber-400/30 px-8 py-6 text-lg font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-amber-400/20 group"
            >
              View Our Complete Collection
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Button>
          </a>          <p className="text-gray-400 mt-3">
            Explore all 16 premium vehicles in our collection — 8 more cars available
          </p>
        </div>{/* Booking Form */}
        {(selectedCar && isFormVisible) && (
          <div className="booking-form mt-16 bg-white/10 backdrop-blur-sm rounded-xl shadow-xl p-6 lg:p-10 animate-fade-in-up border border-white/20">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left: Car Details */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Your Selected Car</h3>
                
                <Card className="overflow-hidden border-0 shadow-md bg-white/5 backdrop-blur-sm border border-white/10">
                  <div className="relative h-56">
                    <img 
                      src={selectedCar.image} 
                      alt={selectedCar.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    
                    <div className="absolute bottom-0 w-full p-4 text-white">
                      <div className="flex justify-between items-end">
                        <div>
                          <h3 className="text-2xl font-bold">{selectedCar.name}</h3>
                          <p className="text-sm text-gray-200">{selectedCar.type}</p>
                        </div>
                        <div className="text-xl font-bold text-amber-400">₹{selectedCar.price}<span className="text-xs text-white">/day</span></div>
                      </div>
                    </div>
                  </div>
                    <CardContent className="p-4 bg-white/5 backdrop-blur-sm text-white">
                    <div className="grid grid-cols-2 gap-y-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Car className="w-4 h-4 text-amber-400" />
                        <span>{selectedCar.transmission}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-amber-400" />
                        <span>{selectedCar.seats} Seats</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-amber-400" />
                        <span>{selectedCar.fuel}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-amber-400" />
                        <span>24/7 Support</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Date Selection */}
                <div className="mt-6">
                  <h4 className="text-lg font-semibold mb-4 text-white">Select Rental Dates</h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="start-date" className="text-white">Pickup Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal bg-white/5 border-white/30 text-white hover:bg-white/10 hover:border-amber-400/50"
                            id="start-date"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4 text-amber-400" />
                            {startDate ? format(startDate, "PPP") : <span>Select date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={setStartDate}
                            disabled={isDateValid}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                      <div className="space-y-2">
                      <Label htmlFor="end-date" className="text-white">Return Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal bg-white/5 border-white/30 text-white hover:bg-white/10 hover:border-amber-400/50"
                            id="end-date"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4 text-amber-400" />
                            {endDate ? format(endDate, "PPP") : <span>Select date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={setEndDate}
                            disabled={(date) => {
                              if (!startDate) return true;
                              // Allow selecting the same day for one-day rentals
                              return isBefore(date, startDate) || !isDateValid(date);
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
                  {/* Pricing Summary */}
                {startDate && endDate && (
                  <Card className="mt-6 border-amber-400/20 bg-amber-400/5 text-white">
                    <CardContent className="p-4">
                      <h4 className="text-lg font-semibold mb-3">Pricing Summary</h4>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Daily Rate:</span>
                          <span>₹{selectedCar.price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Number of Days:</span>
                          <span>{totalDays} {totalDays === 1 ? 'day' : 'days'}</span>
                        </div>
                        <div className="flex justify-between font-semibold text-base border-t border-white/20 pt-2 mt-2">
                          <span>Total Amount:</span>
                          <span>₹{totalPrice}</span>
                        </div>
                        <div className="flex justify-between text-amber-400 font-semibold">
                          <span>Advance Payment (50%):</span>
                          <span>₹{advancePayment}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
              
              {/* Right: Customer Details Form */}
              <div>                {!showSuccessMessage ? (
                  <>
                    <h3 className="text-2xl font-bold text-white mb-6">Your Details</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name" className="text-white">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 text-amber-400/70" size={16} />
                          <Input 
                            id="name" 
                            placeholder="John Doe" 
                            className="pl-10 bg-white/5 border-white/30 text-white placeholder:text-gray-300 focus:border-amber-400 focus:ring-amber-400 h-12"
                            value={customerInfo.name}
                            onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="email" className="text-white">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 text-amber-400/70" size={16} />
                          <Input 
                            id="email" 
                            type="email" 
                            placeholder="john@example.com" 
                            className="pl-10 bg-white/5 border-white/30 text-white placeholder:text-gray-300 focus:border-amber-400 focus:ring-amber-400 h-12"
                            value={customerInfo.email}
                            onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 text-gray-400" size={16} />
                          <Input 
                            id="phone" 
                            placeholder="+91 9876543210" 
                            className="pl-10"
                            value={customerInfo.phone}
                            onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="address">Address (Optional)</Label>
                        <Input 
                          id="address" 
                          placeholder="Your address" 
                          value={customerInfo.address}
                          onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                        />
                      </div>
                      
                      <div className="pt-4">
                        <h4 className="text-lg font-semibold mb-4">Payment Method</h4>
                        
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <input 
                              type="radio" 
                              id="pay-advance" 
                              name="payment" 
                              className="w-4 h-4 text-primary"
                              defaultChecked
                            />
                            <label htmlFor="pay-advance" className="text-sm">Pay 50% Advance (₹{advancePayment})</label>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <input 
                              type="radio" 
                              id="pay-full" 
                              name="payment" 
                              className="w-4 h-4 text-primary"
                            />
                            <label htmlFor="pay-full" className="text-sm">Pay Full Amount (₹{totalPrice})</label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-sm text-gray-600">
                        <p className="mb-2">
                          <span className="font-semibold">Note:</span> You'll be charged only when your booking is confirmed.
                        </p>
                        <p>
                          A confirmation will be sent to your email with all details.
                        </p>
                      </div>
                      
                      <Button 
                        onClick={handleBooking}
                        disabled={isLoading}
                        className="w-full bg-primary hover:bg-primary/90 text-carwala-black font-semibold h-12 text-lg mt-2"
                      >
                        {isLoading ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </span>
                        ) : 'Confirm Booking'}
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="w-full mt-2"
                        onClick={resetForm}
                      >
                        Cancel
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                      <Check className="w-8 h-8 text-green-600" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-green-600 mb-2">Booking Successful!</h3>
                    <p className="text-gray-600 text-center mb-6">
                      Your booking for <span className="font-semibold">{selectedCar.name}</span> has been confirmed.
                    </p>
                    
                    <div className="bg-gray-50 w-full rounded-lg p-6 mb-6 border border-gray-200">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Booking ID:</span>
                          <span className="font-semibold">{bookingId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Car:</span>
                          <span>{selectedCar.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Pickup Date:</span>
                          <span>{startDate && format(startDate, "PPP")}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Return Date:</span>
                          <span>{endDate && format(endDate, "PPP")}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Total Amount:</span>
                          <span className="font-semibold">₹{totalPrice}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-500 text-center mb-6">
                      A confirmation email has been sent to <span className="font-semibold">{customerInfo.email}</span> with all the details.
                    </p>
                    
                    <div className="flex gap-4 w-full">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={resetForm}
                      >
                        Book Another Car
                      </Button>
                      
                      <Button 
                        className="flex-1 bg-primary hover:bg-primary/90 text-carwala-black font-semibold"
                        onClick={() => window.location.href = '/'}
                      >
                        Return to Home
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        car={selectedCar ? {
          _id: selectedCar.id.toString(),
          name: selectedCar.name,
          type: selectedCar.type,
          seating: selectedCar.seats,
          transmission: selectedCar.transmission,
          fuel: selectedCar.fuel,
          status: selectedCar.isBooked ? 'booked' as const : 'available' as const,
          price: selectedCar.price,
          image: selectedCar.image,
          description: `${selectedCar.name} ${selectedCar.type} with ${selectedCar.transmission} transmission`
        } as CarModalProps : null}
        existingBookings={bookings}
        onBookingComplete={handleBookingComplete}
      />
    </section>
  );
};

export default BookingSection;
