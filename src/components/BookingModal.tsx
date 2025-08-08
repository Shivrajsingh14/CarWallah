
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from '@/components/ui/use-toast';
import { CalendarIcon, Car, Clock, Users, Fuel, Settings, X, CheckCircle, CreditCard } from 'lucide-react';
import { format, differenceInDays, isAfter, isBefore, addDays } from 'date-fns';
import { cn } from '@/lib/utils';

interface CarProps {
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

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  car: CarProps | null;
  existingBookings: Booking[];
  onBookingComplete: (booking: Booking) => void;
}

const BookingModal = ({ isOpen, onClose, car, existingBookings, onBookingComplete }: BookingModalProps) => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Calculate total days and price
  const totalDays = startDate && endDate ? differenceInDays(endDate, startDate) + 1 : 0;
  const totalPrice = car ? car.price * totalDays : 0;
  const advancePayment = totalPrice * 0.5;

  // Validate booking dates
  const isDateValid = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return isAfter(date, addDays(today, -1));
  };

  const checkDateAvailability = (carId: string, start: Date, end: Date) => {
    const carBookings = existingBookings.filter(booking => booking.carId === carId);
    
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
    if (!car) return;

    // Validation
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

    // Ensure calculations are valid
    if (totalDays <= 0) {
      toast({
        title: "Invalid date selection",
        description: "Please select valid start and end dates",
        variant: "destructive"
      });
      return;
    }

    if (totalPrice <= 0) {
      toast({
        title: "Invalid pricing",
        description: "Unable to calculate total price",
        variant: "destructive"
      });
      return;
    }

    // Check availability
    if (!checkDateAvailability(car._id, startDate, endDate)) {
      toast({
        title: "Car not available",
        description: "This car is already booked for the selected dates",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // Prepare booking data
      const bookingData = {
        carId: car._id,
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        customerPhone: customerInfo.phone,
        startDate: format(startDate, 'yyyy-MM-dd'),
        endDate: format(endDate, 'yyyy-MM-dd'),
        totalDays,
        totalPrice,
        advancePayment: advancePayment,
        paymentMethod: 'card',
        notes: 'Booked through website'
      };

      console.log('Sending booking data:', bookingData);

      // Send booking request to server
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Booking failed');
      }

      const bookingResponse = await response.json();
      
      const newBooking: Booking = {
        id: bookingResponse.bookingId || bookingResponse._id,
        carId: car._id,
        carName: car.name,
        startDate: format(startDate, 'yyyy-MM-dd'),
        endDate: format(endDate, 'yyyy-MM-dd'),
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        customerPhone: customerInfo.phone,
        totalDays,
        totalPrice,
        bookingDate: bookingResponse.createdAt || format(new Date(), 'yyyy-MM-dd HH:mm:ss')
      };

      onBookingComplete(newBooking);
      setShowConfirmation(true);

      toast({
        title: "Booking Confirmed! 🎉",
        description: `Your ${car.name} is booked for ${totalDays} days. Booking ID: ${newBooking.id}`,
      });

    } catch (error: any) {
      toast({
        title: "Booking Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetModal = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setCustomerInfo({ name: '', email: '', phone: '' });
    setShowConfirmation(false);
    onClose();
  };

  if (!car) return null;

  return (
    <Dialog open={isOpen} onOpenChange={resetModal}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-carwala-white to-gray-50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl font-bold text-carwala-black">
            <Car className="w-6 h-6 text-primary" />
            Book Your {car.name}
          </DialogTitle>
        </DialogHeader>

        {showConfirmation ? (
          <div className="text-center py-8 space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-carwala-black mb-2">Booking Confirmed!</h3>
              <p className="text-gray-600 mb-4">Your {car.name} is reserved for {totalDays} days</p>
              <div className="bg-primary/10 p-6 rounded-lg max-w-md mx-auto">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Car:</span>
                    <span className="font-semibold">{car.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span>{totalDays} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dates:</span>
                    <span>{startDate && format(startDate, 'MMM dd')} - {endDate && format(endDate, 'MMM dd')}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-bold text-primary">
                      <span>Total Amount:</span>
                      <span>₹{totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Button onClick={resetModal} className="bg-primary hover:bg-primary/90 text-carwala-black">
              Book Another Car
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Car Info */}
            <div className="bg-carwala-black text-carwala-white p-6 rounded-lg">
              <div className="flex items-start gap-4">
                <img 
                  src={car.image.startsWith('http') ? car.image : `http://localhost:5000${car.image}`} 
                  alt={car.name}
                  className="w-24 h-16 object-cover rounded bg-gray-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                  }}
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-primary">{car.name}</h3>
                  <p className="text-gray-300 mb-3">{car.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-primary" />
                      <span>{car.seating} Seater</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Fuel className="w-4 h-4 text-primary" />
                      <span>{car.fuel}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Settings className="w-4 h-4 text-primary" />
                      <span>{car.transmission}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-primary font-bold">₹{car.price}/day</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Date Selection */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-base font-semibold">Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal mt-2",
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
                <Label className="text-base font-semibold">End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal mt-2",
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

            {/* Duration & Price Display */}
            {startDate && endDate && (
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-green-800">
                    <Clock className="w-5 h-5" />
                    <span className="font-medium">Duration: {totalDays} days</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">₹{totalPrice.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Pay now: ₹{advancePayment.toLocaleString()} (50%)</div>
                  </div>
                </div>
              </div>
            )}

            {/* Customer Information */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Your Information</h4>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                    placeholder="Enter your full name"
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                      placeholder="your.email@example.com"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                      placeholder="+91 9876543210"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={resetModal}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleBooking}
                disabled={!startDate || !endDate || !customerInfo.name || !customerInfo.email || !customerInfo.phone || isLoading}
                className="flex-1 bg-primary hover:bg-primary/90 text-carwala-black font-semibold"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-carwala-black border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Book Now - ₹{advancePayment.toLocaleString()}
                  </div>
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
