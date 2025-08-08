import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Car, Calendar, Users, Fuel, Settings, ArrowLeft, Search, Filter, Star, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';

interface CarType {
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

const Cars = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [cars, setCars] = useState<CarType[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedCar, setSelectedCar] = useState<CarType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch cars from API
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
        const activeCars = data.filter((car: CarType) => car.isActive && car.stock > 0);
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

  const getStatusBadge = (car: CarType) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide";
    
    if (!car.isActive) {
      return `${baseClasses} bg-gray-400 text-white`;
    }
    
    if (car.isBooked || car.stock <= 0) {
      return `${baseClasses} bg-red-400 text-white`;
    }
    
    return `${baseClasses} bg-amber-400 text-[#152a4a]`;
  };

  const getStatusText = (car: CarType) => {
    if (!car.isActive) {
      return 'Inactive';
    }
    
    if (car.isBooked) {
      return 'Booked';
    }
    
    if (car.stock <= 0) {
      return 'Out of Stock';
    }
    
    return 'Available';
  };

  const handleBookNow = (car: CarType) => {
    if (!car.isBooked && car.stock > 0 && car.isActive) {
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

  // Filter cars based on selection
  const filteredCars = cars.filter(car => {
    const matchesSearch = searchTerm === '' || 
      car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedFilter === 'all' || car.type.includes(selectedFilter);
    
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'available' && !car.isBooked && car.stock > 0) ||
      (statusFilter === 'booked' && (car.isBooked || car.stock <= 0));
    
    return matchesSearch && matchesType && matchesStatus;
  });

  if (loading) {
    return (
      <div>
        <Header />
        <section className="py-24 bg-[#152a4a]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl text-white">Loading cars...</h2>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-24 bg-[#152a4a] overflow-hidden">
        {/* Animated Particles */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-10 left-10 w-4 h-4 bg-amber-400 rounded-full animate-float"></div>
          <div className="absolute bottom-20 left-20 w-6 h-6 bg-amber-400/50 rounded-full animate-float-2"></div>
          <div className="absolute top-20 right-20 w-3 h-3 bg-amber-400 rounded-full animate-float-2"></div>
          <div className="absolute bottom-40 right-40 w-5 h-5 bg-amber-400/30 rounded-full animate-float"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Link to="/" className="flex items-center text-amber-400 hover:text-white transition-colors mr-4 group">
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in-up">
              Our Premium <span className="text-amber-400">Fleet</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in-up animation-delay-200 mb-8">
              Discover our complete collection of premium vehicles, each maintained to perfection for your journey
            </p>
            
            {/* Feature highlights */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="flex items-center gap-3 text-white">
                <div className="bg-amber-400/20 rounded-full p-2.5">
                  <Star className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Top Brands</h3>
                  <p className="text-sm text-gray-300">Premium selection</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-white">
                <div className="bg-amber-400/20 rounded-full p-2.5">
                  <Shield className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Fully Insured</h3>
                  <p className="text-sm text-gray-300">Drive with confidence</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-white">
                <div className="bg-amber-400/20 rounded-full p-2.5">
                  <Zap className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-semibold">24/7 Support</h3>
                  <p className="text-sm text-gray-300">Always there for you</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Search & Filter Controls */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 mb-10 flex flex-col md:flex-row items-center gap-5">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by car name, brand or model..."
                className="w-full pl-10 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-3 flex-wrap md:flex-nowrap">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white"
              >
                <option value="all">All Types</option>
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Hatchback">Hatchback</option>
                <option value="MPV">MPV</option>
                <option value="Luxury">Luxury</option>
              </select>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white"
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="booked">Booked</option>
              </select>
              
              <Button 
                variant="outline" 
                className="flex items-center gap-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-[#152a4a]"
              >
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Cars Grid Section */}
      <section className="py-16 bg-[#152a4a] min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-4">
              Found {filteredCars.length} Vehicle{filteredCars.length !== 1 ? 's' : ''}
            </h2>
            <div className="w-20 h-1 bg-amber-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredCars.map((car) => (
              <Card 
                key={car._id} 
                className="overflow-hidden hover-lift border border-white/20 bg-white/5 backdrop-blur-sm group hover:border-amber-400/30 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg hover:shadow-amber-400/10"
              >
                <div className="relative h-44 overflow-hidden">
                  <img 
                    src={car.image.startsWith('http') ? car.image : `http://localhost:5000${car.image}`} 
                    alt={car.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder.svg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 text-white">
                    <h3 className="text-lg font-bold mb-1">{car.name}</h3>
                    <span className="inline-block px-2 py-0.5 text-xs font-semibold bg-amber-400 text-[#152a4a] rounded-full">
                      {car.type}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className={getStatusBadge(car)}>
                      {getStatusText(car)}
                    </span>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center space-x-1 text-white/70">
                        <Users className="w-3.5 h-3.5 text-amber-400" />
                        <span>{car.seats} Seater</span>
                      </div>
                      <div className="flex items-center space-x-1 text-white/70">
                        <Fuel className="w-3.5 h-3.5 text-amber-400" />
                        <span>{car.fuel}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-white/70">
                        <Settings className="w-3.5 h-3.5 text-amber-400" />
                        <span>{car.transmission}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-white/70">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        <span>Flexible</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-white/10">
                      <div>
                        <span className="text-xl font-bold text-amber-400">₹{car.price}</span>
                        <span className="text-white/70 text-xs">/day</span>
                      </div>
                      <Button 
                        size="sm"
                        onClick={() => handleBookNow(car)}
                        className={`transition-all hover:scale-105 ${
                          !car.isBooked && car.stock > 0 && car.isActive
                            ? 'bg-amber-400 hover:bg-amber-500 text-[#152a4a] shadow shadow-amber-400/20' 
                            : 'bg-gray-600/50 text-gray-300 cursor-not-allowed'
                        }`}
                        disabled={car.isBooked || car.stock <= 0 || !car.isActive}
                      >
                        {!car.isBooked && car.stock > 0 && car.isActive ? 'Book Now' : 
                         car.isBooked ? 'Booked' : car.stock <= 0 ? 'Out of Stock' : 'Inactive'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredCars.length === 0 && (
            <div className="text-center py-10 bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6">
              <Car className="w-14 h-14 text-amber-400 mx-auto mb-3" />
              <h3 className="text-xl font-semibold text-white mb-2">No cars found</h3>
              <p className="text-white/70">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Booking Modal */}      {selectedCar && (
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
          existingBookings={[]}
          onBookingComplete={handleBookingComplete}
        />
      )}

      <Footer />
    </div>
  );
};

export default Cars;
