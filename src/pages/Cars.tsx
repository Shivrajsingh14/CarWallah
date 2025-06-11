
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Car, Calendar, Users, Fuel, Settings, ArrowLeft, Search, Filter, Star, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';

interface CarType {
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

const initialCars: CarType[] = [
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

const Cars = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [cars, setCars] = useState(initialCars);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedCar, setSelectedCar] = useState<CarType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide";
    
    switch (status) {
      case 'available':
        return `${baseClasses} bg-green-100 text-green-800 border border-green-300`;
      case 'booked':
        return `${baseClasses} bg-red-100 text-red-800 border border-red-300`;
      case 'maintenance':
        return `${baseClasses} bg-yellow-100 text-yellow-800 border border-yellow-300`;
      default:
        return baseClasses;
    }
  };

  const handleBookNow = (car: CarType) => {
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

  const filteredCars = cars.filter(car => {
    const matchesType = selectedFilter === 'all' || car.type.toLowerCase().includes(selectedFilter.toLowerCase());
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         car.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || car.status === statusFilter;
    
    return matchesType && matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-carwala-white">
      <Header />
      
      {/* Enhanced Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-carwala-black via-carwala-dark-gray to-carwala-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FFD700' fill-opacity='0.1'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20v20h40V20H20z'/%3E%3C/g%3E%3C/svg%3E\")"
        }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-carwala-white mb-8">
            <div className="flex items-center justify-center mb-6">
              <Link to="/" className="flex items-center text-primary hover:text-carwala-white transition-colors mr-4 group">
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in-up">
              Our Premium <span className="text-primary">Fleet</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in-up animation-delay-200 mb-8">
              Discover our complete collection of 16 premium vehicles, each maintained to perfection for your journey
            </p>
            
            {/* Feature highlights */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Star className="w-6 h-6 text-primary" />
                <span className="text-white font-medium">Premium Quality</span>
              </div>
              <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Shield className="w-6 h-6 text-primary" />
                <span className="text-white font-medium">Fully Insured</span>
              </div>
              <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Zap className="w-6 h-6 text-primary" />
                <span className="text-white font-medium">Instant Booking</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Filters Section */}
      <section className="py-8 bg-white shadow-lg sticky top-20 z-40 border-b border-primary/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search cars..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all hover:border-primary/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Type Filters */}
            <div className="flex flex-wrap gap-3">
              {['all', 'sedan', 'suv', 'luxury', 'mpv'].map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? "default" : "outline"}
                  className={`capitalize transition-all hover:scale-105 ${
                    selectedFilter === filter 
                      ? 'bg-primary text-carwala-black shadow-lg' 
                      : 'border-primary text-primary hover:bg-primary hover:text-carwala-black'
                  }`}
                  onClick={() => setSelectedFilter(filter)}
                >
                  {filter === 'all' ? 'All Cars' : filter}
                </Button>
              ))}
            </div>

            {/* Status Filter */}
            <div className="flex gap-2 items-center">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all hover:border-primary/50"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="booked">Booked</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Cars Grid */}
      <section className="py-16 bg-gradient-to-br from-carwala-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-carwala-black mb-4">
              Found {filteredCars.length} Vehicle{filteredCars.length !== 1 ? 's' : ''}
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredCars.map((car, index) => (
              <Card 
                key={car.id} 
                className="overflow-hidden hover-lift border-0 shadow-lg bg-white group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative">
                  <img 
                    src={car.image} 
                    alt={car.name}
                    className="w-full h-48 object-cover bg-carwala-black group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={getStatusBadge(car.status)}>
                      {car.status}
                    </span>
                  </div>
                  {car.status === 'available' && (
                    <div className="absolute top-4 left-4 bg-primary text-carwala-black px-3 py-1 rounded-full text-xs font-semibold animate-pulse">
                      Available Now
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {car.status === 'available' && (
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button 
                        onClick={() => handleBookNow(car)}
                        className="w-full bg-primary hover:bg-primary/90 text-carwala-black font-semibold transform scale-95 hover:scale-100 transition-transform"
                      >
                        Quick Book
                      </Button>
                    </div>
                  )}
                </div>
                
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-carwala-black group-hover:text-primary transition-colors">{car.name}</h3>
                      <p className="text-gray-600">{car.type}</p>
                    </div>

                    <p className="text-sm text-gray-700 line-clamp-2">{car.description}</p>

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
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>Flexible</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t">
                      <div>
                        <span className="text-2xl font-bold text-carwala-black">₹{car.price}</span>
                        <span className="text-gray-600 text-sm">/day</span>
                      </div>
                      <Button 
                        onClick={() => handleBookNow(car)}
                        className={`transition-all hover:scale-105 ${
                          car.status === 'available' 
                            ? 'bg-primary hover:bg-primary/90 text-carwala-black' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        disabled={car.status !== 'available'}
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

          {filteredCars.length === 0 && (
            <div className="text-center py-12">
              <Car className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No cars found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        car={selectedCar}
        existingBookings={bookings}
        onBookingComplete={handleBookingComplete}
      />

      <Footer />
    </div>
  );
};

export default Cars;
