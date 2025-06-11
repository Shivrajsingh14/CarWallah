
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Car, Users, Fuel, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import BookingModal from './BookingModal';

interface CarProps {
  id: number;
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
  carId: number;
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

const initialCars: CarProps[] = [
  {
    id: 1,
    name: "BMW 5 Series",
    type: "Luxury Sedan",
    seating: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    status: "available",
    price: 2500,
    image: "/api/placeholder/300/200",
    description: "Experience luxury and performance with this premium BMW sedan."
  },
  {
    id: 2,
    name: "Audi Q7",
    type: "Luxury SUV",
    seating: 7,
    transmission: "Automatic", 
    fuel: "Diesel",
    status: "available",
    price: 3500,
    image: "/api/placeholder/300/200",
    description: "Spacious luxury SUV perfect for family trips and business travel."
  },
  {
    id: 3,
    name: "Mercedes E-Class",
    type: "Premium Sedan",
    seating: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    status: "available",
    price: 3000,
    image: "/api/placeholder/300/200",
    description: "Elegant Mercedes with cutting-edge technology and comfort."
  },
  {
    id: 4,
    name: "Toyota Fortuner",
    type: "SUV",
    seating: 7,
    transmission: "Manual",
    fuel: "Diesel",
    status: "available",
    price: 2000,
    image: "/api/placeholder/300/200",
    description: "Reliable and robust SUV for all terrain adventures."
  },
  {
    id: 5,
    name: "Honda City",
    type: "Sedan",
    seating: 5,
    transmission: "Manual",
    fuel: "Petrol",
    status: "available",
    price: 1500,
    image: "/api/placeholder/300/200",
    description: "Efficient and comfortable city car for daily commuting."
  },
  {
    id: 6,
    name: "Hyundai Creta",
    type: "Compact SUV",
    seating: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    status: "available",
    price: 1800,
    image: "/api/placeholder/300/200",
    description: "Modern compact SUV with advanced features and style."
  },
  {
    id: 7,
    name: "BMW X5",
    type: "Luxury SUV",
    seating: 7,
    transmission: "Automatic",
    fuel: "Diesel",
    status: "available",
    price: 4000,
    image: "/api/placeholder/300/200",
    description: "Premium BMW SUV with exceptional performance and luxury."
  },
  {
    id: 8,
    name: "Audi A4",
    type: "Luxury Sedan",
    seating: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    status: "available",
    price: 2800,
    image: "/api/placeholder/300/200",
    description: "Sophisticated Audi sedan with premium interior and technology."
  },
  {
    id: 9,
    name: "Mercedes GLS",
    type: "Luxury SUV",
    seating: 7,
    transmission: "Automatic",
    fuel: "Diesel",
    status: "available",
    price: 4500,
    image: "/api/placeholder/300/200",
    description: "Ultimate luxury SUV with spacious cabin and advanced features."
  },
  {
    id: 10,
    name: "Toyota Camry",
    type: "Premium Sedan",
    seating: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    status: "available",
    price: 2200,
    image: "/api/placeholder/300/200",
    description: "Reliable premium sedan with excellent fuel efficiency."
  },
  {
    id: 11,
    name: "Honda Accord",
    type: "Sedan",
    seating: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    status: "available",
    price: 2100,
    image: "/api/placeholder/300/200",
    description: "Spacious and comfortable sedan with advanced safety features."
  },
  {
    id: 12,
    name: "Hyundai Tucson",
    type: "SUV",
    seating: 5,
    transmission: "Automatic",
    fuel: "Diesel",
    status: "available",
    price: 2300,
    image: "/api/placeholder/300/200",
    description: "Stylish SUV with modern design and excellent performance."
  },
  {
    id: 13,
    name: "BMW 3 Series",
    type: "Luxury Sedan",
    seating: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    status: "available",
    price: 2700,
    image: "/api/placeholder/300/200",
    description: "Dynamic BMW sedan with sporty performance and luxury."
  },
  {
    id: 14,
    name: "Audi Q5",
    type: "Luxury SUV",
    seating: 5,
    transmission: "Automatic",
    fuel: "Diesel",
    status: "available",
    price: 3200,
    image: "/api/placeholder/300/200",
    description: "Premium compact SUV with quattro all-wheel drive."
  },
  {
    id: 15,
    name: "Mercedes C-Class",
    type: "Luxury Sedan",
    seating: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    status: "available",
    price: 2600,
    image: "/api/placeholder/300/200",
    description: "Elegant Mercedes sedan with premium comfort and technology."
  },
  {
    id: 16,
    name: "Toyota Innova",
    type: "MPV",
    seating: 8,
    transmission: "Manual",
    fuel: "Diesel",
    status: "available",
    price: 1900,
    image: "/api/placeholder/300/200",
    description: "Versatile multi-purpose vehicle perfect for large groups."
  }
];

const CarShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cars, setCars] = useState(initialCars);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedCar, setSelectedCar] = useState<CarProps | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const carsPerPage = 4;

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + carsPerPage >= cars.length ? 0 : prev + carsPerPage
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, cars.length - carsPerPage) : prev - carsPerPage
    );
  };

  const handleBookNow = (car: CarProps) => {
    if (car.status === 'available') {
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
        car.id === booking.carId 
          ? { ...car, status: 'booked' as const }
          : car
      ));
    }
  };

  const visibleCars = cars.slice(currentIndex, currentIndex + carsPerPage);

  return (
    <section id="cars" className="py-20 bg-carwala-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-carwala-black mb-4">
            Our Premium <span className="text-primary">Fleet</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Choose from our collection of 16 premium vehicles, all maintained to perfection and available for pickup from our Udaipur office.
          </p>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-between items-center mb-8">
          <Button
            variant="outline"
            onClick={prevSlide}
            className="border-primary text-primary hover:bg-primary hover:text-carwala-black"
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          <div className="text-sm text-gray-600">
            Showing {currentIndex + 1}-{Math.min(currentIndex + carsPerPage, cars.length)} of {cars.length} cars
          </div>
          
          <Button
            variant="outline"
            onClick={nextSlide}
            className="border-primary text-primary hover:bg-primary hover:text-carwala-black"
            disabled={currentIndex + carsPerPage >= cars.length}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Cars Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {visibleCars.map((car, index) => (
            <Card 
              key={car.id} 
              className="overflow-hidden hover-lift border-0 shadow-lg bg-white relative group hover:shadow-2xl transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative">
                <img 
                  src={car.image} 
                  alt={car.name}
                  className="w-full h-48 object-cover bg-carwala-black group-hover:scale-105 transition-transform duration-300"
                />
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                  car.status === 'available' 
                    ? 'bg-primary text-carwala-black' 
                    : car.status === 'booked'
                    ? 'bg-red-500 text-white'
                    : 'bg-yellow-500 text-carwala-black'
                }`}>
                  {car.status === 'available' ? 'Available' : 
                   car.status === 'booked' ? 'Booked' : 'Maintenance'}
                </div>
                {car.status === 'available' && (
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                      <span className="text-primary font-semibold">Click to Book!</span>
                    </div>
                  </div>
                )}
              </div>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-carwala-black group-hover:text-primary transition-colors">{car.name}</h3>
                    <p className="text-gray-600">{car.type}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-primary" />
                      <span>{car.seating} Seater</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Fuel className="w-4 h-4 text-primary" />
                      <span>{car.fuel}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Settings className="w-4 h-4 text-primary" />
                      <span>{car.transmission}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Car className="w-4 h-4 text-primary" />
                      <span>Premium</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <div>
                      <span className="text-2xl font-bold text-carwala-black">₹{car.price}</span>
                      <span className="text-gray-600 text-sm">/day</span>
                    </div>
                    <Button 
                      onClick={() => handleBookNow(car)}
                      disabled={car.status !== 'available'}
                      className={`group-hover:scale-105 transition-transform ${
                        car.status === 'available' 
                          ? 'bg-primary hover:bg-primary/90 text-carwala-black' 
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {car.status === 'available' ? 'Book Now' : 
                       car.status === 'booked' ? 'Booked' : 'Under Maintenance'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Link to="/cars">
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-carwala-black font-bold px-8 py-4 text-lg hover:scale-105 transition-transform"
            >
              View Our Complete Fleet
            </Button>
          </Link>
          <p className="text-gray-600 mt-4">
            Explore all 16 premium vehicles in our collection
          </p>
        </div>

        {/* Booking Modal */}
        <BookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          car={selectedCar}
          existingBookings={bookings}
          onBookingComplete={handleBookingComplete}
        />
      </div>
    </section>
  );
};

export default CarShowcase;
