
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Car, Calendar } from 'lucide-react';

interface Car {
  id: number;
  name: string;
  type: string;
  seating: number;
  transmission: string;
  fuel: string;
  status: 'available' | 'booked' | 'maintenance';
  price: number;
  image: string;
}

const cars: Car[] = [
  {
    id: 1,
    name: "BMW 5 Series",
    type: "Luxury Sedan",
    seating: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    status: "available",
    price: 2500,
    image: "/api/placeholder/300/200"
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
    image: "/api/placeholder/300/200"
  },
  {
    id: 3,
    name: "Mercedes E-Class",
    type: "Premium Sedan",
    seating: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    status: "booked",
    price: 3000,
    image: "/api/placeholder/300/200"
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
    image: "/api/placeholder/300/200"
  },
  {
    id: 5,
    name: "Honda City",
    type: "Sedan",
    seating: 5,
    transmission: "Manual",
    fuel: "Petrol",
    status: "maintenance",
    price: 1500,
    image: "/api/placeholder/300/200"
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
    image: "/api/placeholder/300/200"
  }
];

const CarShowcase = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

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

  const filteredCars = selectedFilter === 'all' 
    ? cars 
    : cars.filter(car => car.type.toLowerCase().includes(selectedFilter.toLowerCase()));

  return (
    <section id="cars" className="py-20 bg-carwala-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl font-bold text-carwala-black mb-4">
            Our Premium <span className="text-primary">Fleet</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Choose from our collection of 16 premium vehicles, all maintained to the highest standards for your comfort and safety.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['all', 'sedan', 'suv', 'luxury'].map((filter) => (
            <Button
              key={filter}
              variant={selectedFilter === filter ? "default" : "outline"}
              className={`capitalize ${
                selectedFilter === filter 
                  ? 'bg-primary text-carwala-black' 
                  : 'border-primary text-primary hover:bg-primary hover:text-carwala-black'
              }`}
              onClick={() => setSelectedFilter(filter)}
            >
              {filter === 'all' ? 'All Cars' : filter}
            </Button>
          ))}
        </div>

        {/* Cars Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car, index) => (
            <Card 
              key={car.id} 
              className="overflow-hidden hover-lift border-0 shadow-lg"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative">
                <img 
                  src={car.image} 
                  alt={car.name}
                  className="w-full h-48 object-cover bg-carwala-black"
                />
                <div className="absolute top-4 right-4">
                  <span className={getStatusBadge(car.status)}>
                    {car.status}
                  </span>
                </div>
                {car.status === 'available' && (
                  <div className="absolute top-4 left-4 bg-primary text-carwala-black px-2 py-1 rounded text-xs font-semibold">
                    Available Now
                  </div>
                )}
              </div>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-carwala-black">{car.name}</h3>
                    <p className="text-gray-600">{car.type}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Car className="w-4 h-4 text-primary" />
                      <span>{car.seating} Seater</span>
                    </div>
                    <div>
                      <span className="font-medium">Fuel:</span> {car.fuel}
                    </div>
                    <div>
                      <span className="font-medium">Transmission:</span> {car.transmission}
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
                      className={`${
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

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button 
            size="lg"
            className="bg-carwala-black hover:bg-carwala-dark-gray text-carwala-white px-8 py-3"
          >
            View All 16 Cars
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CarShowcase;
