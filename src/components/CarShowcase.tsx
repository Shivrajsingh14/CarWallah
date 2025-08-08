import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Car, Users, Fuel, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import BookingModal from './BookingModal';

interface CarProps {
  _id: string;
  name: string;
  type: string;
  seats: number;
  transmission: string;
  fuel: string;
  isBooked: boolean;
  isActive: boolean;
  stock: number;
  price: number;
  image: string;
  description: string;
  features: string[];
  brand: string;
  model: string;
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

const CarShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedCar, setSelectedCar] = useState<CarProps | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const carsPerPage = 4;

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/cars');
        
        if (!response.ok) {
          throw new Error('Failed to fetch cars');
        }
        
        const data = await response.json();
        console.log('All fetched cars:', data);
        // Only show active cars with stock > 0
        const activeCars = data.filter((car: CarProps) => car.isActive && car.stock > 0);
        console.log('Filtered active cars:', activeCars);
        setCars(activeCars);
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCars();
  }, []);

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
    if (!car.isBooked && car.stock > 0) {
      setSelectedCar(car);
      setIsModalOpen(true);
    }
  };
  const handleBookingComplete = (booking: any) => {
    setBookings(prev => [...prev, booking]);
    
    // Update car status if booking covers current date
    const today = new Date();
    const bookingStart = new Date(booking.startDate);
    const bookingEnd = new Date(booking.endDate);
    
    if (bookingStart <= today && bookingEnd >= today) {
      setCars(prev => prev.map(car => 
        car._id === booking.carId 
          ? { ...car, isBooked: true }
          : car
      ));
    }
  };

  const visibleCars = cars.slice(currentIndex, currentIndex + carsPerPage);

  if (loading) {
    return (
      <section id="cars" className="py-20 bg-carwala-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl">Loading cars...</h2>
        </div>
      </section>
    );
  }

  return (
    <section id="cars" className="py-20 bg-carwala-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-carwala-black mb-4">
            Our Premium <span className="text-primary">Fleet</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Choose from our collection of premium vehicles, all maintained to perfection and available for pickup from our Udaipur office.
          </p>
        </div>

        {cars.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-xl text-gray-600">No cars available at the moment. Please check back later.</p>
          </div>
        ) : (
          <>
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
                  key={car._id} 
                  className="overflow-hidden hover-lift border-0 shadow-lg bg-white relative group hover:shadow-2xl transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative">                    <img 
                      src={car.image.startsWith('http') 
                        ? car.image 
                        : `http://localhost:5000${car.image}`} 
                      alt={car.name}
                      className="w-full h-48 object-cover bg-carwala-black group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }}
                    />
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                      !car.isBooked && car.stock > 0
                        ? 'bg-primary text-carwala-black' 
                        : 'bg-red-500 text-white'
                    }`}>
                      {!car.isBooked && car.stock > 0 ? 'Available' : 'Booked'}
                    </div>
                    {car.stock > 1 && (
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-green-500 text-white">
                        {car.stock} in stock
                      </div>
                    )}
                    {!car.isBooked && car.stock > 0 && (
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
                          <span>{car.seats} Seater</span>
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
                          <span>{car.brand}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t">
                        <div>
                          <span className="text-2xl font-bold text-carwala-black">₹{car.price}</span>
                          <span className="text-gray-600 text-sm">/day</span>
                        </div>
                        <Button
                          onClick={() => handleBookNow(car)}
                          disabled={car.isBooked || car.stock <= 0}
                          className={`group-hover:scale-105 transition-transform ${
                            !car.isBooked && car.stock > 0
                              ? 'bg-primary hover:bg-primary/90 text-carwala-black' 
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          {!car.isBooked && car.stock > 0 ? 'Book Now' : 'Booked'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

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
            Explore all our premium vehicles in our collection
          </p>
        </div>        {/* Booking Modal */}
        {selectedCar && (
          <BookingModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            car={{
              _id: selectedCar._id,
              name: selectedCar.name,
              type: selectedCar.type,
              seating: selectedCar.seats,
              transmission: selectedCar.transmission,
              fuel: selectedCar.fuel,
              status: !selectedCar.isBooked && selectedCar.stock > 0 ? 'available' : 'booked',
              price: selectedCar.price,
              image: selectedCar.image.startsWith('http') ? selectedCar.image : `http://localhost:5000${selectedCar.image}`,
              description: selectedCar.description
            }}
            existingBookings={bookings}
            onBookingComplete={handleBookingComplete}
          />
        )}
      </div>
    </section>
  );
};

export default CarShowcase;
