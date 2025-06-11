
import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { CalendarIcon, Car, Clock, MapPin, Phone, User, Mail, CreditCard } from 'lucide-react';
import { format, differenceInDays, isAfter, isBefore, addDays } from 'date-fns';
import { cn } from '@/lib/utils';

// Car data with pricing
const cars = [
  { id: 1, name: 'Mahindra Thar', type: 'SUV', price: 2500, image: '🚙', fuel: 'Diesel', seats: 4 },
  { id: 2, name: 'Hyundai Creta', type: 'SUV', price: 2200, image: '🚗', fuel: 'Petrol', seats: 5 },
  { id: 3, name: 'Toyota Innova', type: 'MPV', price: 2800, image: '🚐', fuel: 'Diesel', seats: 7 },
  { id: 4, name: 'Maruti Swift', type: 'Hatchback', price: 1500, image: '🚗', fuel: 'Petrol', seats: 4 },
  { id: 5, name: 'Honda City', type: 'Sedan', price: 2000, image: '🚗', fuel: 'Petrol', seats: 5 },
  { id: 6, name: 'Mahindra Scorpio', type: 'SUV', price: 2600, image: '🚙', fuel: 'Diesel', seats: 7 },
  { id: 7, name: 'Tata Nexon', type: 'SUV', price: 1800, image: '🚗', fuel: 'Petrol', seats: 5 },
  { id: 8, name: 'Ford EcoSport', type: 'SUV', price: 1900, image: '🚗', fuel: 'Petrol', seats: 5 },
];

const BookingSection = () => {
  const [selectedCar, setSelectedCar] = useState<typeof cars[0] | null>(null);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  // Calculate total days and price
  const totalDays = startDate && endDate ? differenceInDays(endDate, startDate) + 1 : 0;
  const totalPrice = selectedCar ? selectedCar.price * totalDays : 0;
  const advancePayment = totalPrice * 0.5;

  // Validate booking dates
  const isDateValid = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return isAfter(date, addDays(today, -1));
  };

  const handleCarSelect = (carId: string) => {
    const car = cars.find(c => c.id === parseInt(carId));
    setSelectedCar(car || null);
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

    setIsLoading(true);

    try {
      // Simulate booking process
      await new Promise(resolve => setTimeout(resolve, 2000));

      // In a real app, this would send data to backend
      const bookingData = {
        carId: selectedCar.id,
        carName: selectedCar.name,
        startDate: format(startDate, 'yyyy-MM-dd'),
        endDate: format(endDate, 'yyyy-MM-dd'),
        totalDays,
        totalPrice,
        advancePayment,
        customer: customerInfo,
        bookingId: Math.random().toString(36).substr(2, 9).toUpperCase(),
        status: 'confirmed'
      };

      console.log('Booking Data:', bookingData);

      toast({
        title: "Booking Confirmed! 🎉",
        description: `Your ${selectedCar.name} is booked for ${totalDays} days. Booking ID: ${bookingData.bookingId}`,
      });

      // Reset form
      setSelectedCar(null);
      setStartDate(undefined);
      setEndDate(undefined);
      setCustomerInfo({ name: '', email: '', phone: '', address: '' });

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

  return (
    <section id="booking" className="py-20 bg-gradient-to-br from-carwala-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-carwala-black mb-4">
            Book Your <span className="text-primary">Dream Ride</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select your perfect car, choose your dates, and get ready for an unforgettable journey in Udaipur
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Car Selection */}
          <Card className="hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="w-5 h-5 text-primary" />
                Choose Your Vehicle
              </CardTitle>
              <CardDescription>Select from our premium fleet</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select onValueChange={handleCarSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a car" />
                </SelectTrigger>
                <SelectContent>
                  {cars.map((car) => (
                    <SelectItem key={car.id} value={car.id.toString()}>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{car.image}</span>
                        <div>
                          <div className="font-medium">{car.name}</div>
                          <div className="text-sm text-gray-500">
                            {car.type} • {car.fuel} • {car.seats} seats • ₹{car.price}/day
                          </div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedCar && (
                <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <span className="text-2xl">{selectedCar.image}</span>
                    {selectedCar.name}
                  </h3>
                  <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                    <div>Type: {selectedCar.type}</div>
                    <div>Fuel: {selectedCar.fuel}</div>
                    <div>Seats: {selectedCar.seats}</div>
                    <div className="font-semibold text-primary">₹{selectedCar.price}/day</div>
                  </div>
                </div>
              )}

              {/* Date Selection */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "PPP") : "Pick start date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          disabled={(date) => !isDateValid(date)}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label>End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "PPP") : "Pick end date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          disabled={(date) => !startDate || !isDateValid(date) || isBefore(date, startDate)}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {startDate && endDate && (
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 text-green-800">
                      <Clock className="w-4 h-4" />
                      <span className="font-medium">Duration: {totalDays} days</span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Customer Information & Booking */}
          <Card className="hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Your Information
              </CardTitle>
              <CardDescription>Fill in your details to complete the booking</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                  placeholder="Your address in Udaipur"
                />
              </div>

              {/* Pricing Summary */}
              {selectedCar && totalDays > 0 && (
                <div className="bg-carwala-black text-carwala-white p-6 rounded-lg space-y-3">
                  <h3 className="font-semibold text-lg text-primary">Booking Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Car: {selectedCar.name}</span>
                      <span>₹{selectedCar.price}/day</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span>{totalDays} days</span>
                    </div>
                    <div className="border-t border-gray-600 pt-2">
                      <div className="flex justify-between font-semibold">
                        <span>Total Amount:</span>
                        <span>₹{totalPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-primary">
                        <span>Pay Now (50%):</span>
                        <span>₹{advancePayment.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-gray-400 text-xs">
                        <span>Balance on Pickup:</span>
                        <span>₹{(totalPrice - advancePayment).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Contact Info */}
              <div className="bg-primary/10 p-4 rounded-lg">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Need Help?
                </h4>
                <p className="text-sm text-gray-600">
                  Call us at <span className="font-semibold text-primary">+91 6376390767</span> for instant assistance
                </p>
              </div>

              <Button 
                onClick={handleBooking}
                disabled={!selectedCar || !startDate || !endDate || !customerInfo.name || !customerInfo.email || !customerInfo.phone || isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-carwala-black font-semibold py-3 text-lg"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-carwala-black border-t-transparent rounded-full animate-spin"></div>
                    Processing Booking...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Book Now - Pay ₹{advancePayment.toLocaleString()}
                  </div>
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                By booking, you agree to our terms and conditions. Secure payment processing.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Pickup Location</h3>
            <p className="text-sm text-gray-600">Carwala Office, Udaipur, Rajasthan</p>
          </div>
          <div className="text-center">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Flexible Timing</h3>
            <p className="text-sm text-gray-600">9 AM - 9 PM pickup & return</p>
          </div>
          <div className="text-center">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">24/7 Support</h3>
            <p className="text-sm text-gray-600">Round-the-clock assistance</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
