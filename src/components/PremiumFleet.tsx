import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Car, Star, Shield, Zap, Award, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Featured premium vehicles
const premiumCars = [
  {
    id: 1,
    name: "BMW 5 Series",
    image: "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?q=80&w=1000&auto=format&fit=crop",
    price: 2500,
    category: "Luxury Sedan"
  },
  {
    id: 2,
    name: "Audi Q7",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1000&auto=format&fit=crop",
    price: 3200,
    category: "Luxury SUV"
  },
  {
    id: 3,
    name: "Mercedes-Benz C-Class",
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1000&auto=format&fit=crop",
    price: 2600,
    category: "Luxury Sedan"
  },
  {
    id: 4,
    name: "Mahindra Thar",
    image: "https://images.unsplash.com/photo-1679921046507-d0d9ab3f3964?q=80&w=1000&auto=format&fit=crop",
    price: 3499,
    category: "Adventure SUV"
  }
];

const PremiumFleet = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const section = document.getElementById('premium-fleet');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const premiumFeatures = [
    {
      icon: Car,
      title: "Luxury Collection",
      description: "Experience our collection of 16 premium cars, each maintained to the highest standards"
    },
    {
      icon: Star,
      title: "Superior Comfort",
      description: "Enjoy plush interiors, climate control, and premium audio systems in every vehicle"
    },
    {
      icon: Shield,
      title: "Safety Assured",
      description: "All vehicles undergo rigorous safety checks and are fully insured for your peace of mind"
    },
    {
      icon: Zap,
      title: "Premium Performance",
      description: "Feel the power and precision of our high-performance luxury vehicles"
    }
  ];
  return (
    <section 
      id="premium-fleet" 
      className="py-20 bg-gradient-to-br from-[#152a4a] via-[#1e3a63] to-[#152a4a] relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        {/* Floating Particles - Similar to WhyChooseUs */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-amber-400 rounded-full animate-float-1"></div>
        <div className="absolute top-20 right-20 w-3 h-3 bg-amber-400 rounded-full animate-float-2"></div>
        <div className="absolute bottom-20 left-20 w-2 h-2 bg-amber-400 rounded-full animate-float-3"></div>
        <div className="absolute bottom-10 right-10 w-1 h-1 bg-amber-400 rounded-full animate-float-1"></div>
        
        {/* Blur Effects */}
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-amber-400/20 blur-[120px]"></div>
        <div className="absolute top-[60%] -right-[5%] w-[30%] h-[40%] rounded-full bg-blue-600/30 blur-[120px]"></div>
        <div className="absolute top-[40%] left-[20%] w-[25%] h-[25%] rounded-full bg-blue-400/20 blur-[100px]"></div>
        
        {/* Geometric Shapes */}
        <div className="absolute top-20 left-1/4 w-32 h-32 border border-amber-400 rounded-full opacity-20 animate-spin-slow"></div>
        <div className="absolute bottom-20 right-1/4 w-24 h-24 border border-amber-400 opacity-30 animate-pulse-slow"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Heading */}
        <div 
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
          }`}
        >
          <div className="inline-block mb-4">
            <Award className="w-12 h-12 text-amber-400 mx-auto" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Experience Our <span className="text-amber-400">Premium Fleet</span>
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Discover luxury, comfort, and performance with our exclusive collection of premium vehicles.
          </p>
        </div>        {/* Premium Cars Showcase */}
        <div 
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
          }`}
        >
          {premiumCars.map((car, index) => (
            <div 
              key={car.id}
              className={`group rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/20 transform transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-amber-400/10 hover:border-amber-400/30 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ 
                transitionDelay: `${300 + index * 100}ms`,
                boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.3)' 
              }}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={car.image} 
                  alt={car.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="inline-block px-3 py-1 text-xs font-semibold bg-amber-400 text-[#152a4a] rounded-full mb-2">
                    {car.category}
                  </span>
                  <h3 className="text-lg font-bold">{car.name}</h3>
                </div>
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  <span className="text-amber-400 font-bold">₹{car.price}</span>
                  <span className="text-white/70 text-sm">/day</span>
                </div>
              </div>
            </div>
          ))}
        </div>{/* Features */}
        <div 
          className={`mb-16 transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {premiumFeatures.map((feature, index) => (
              <div 
                key={index}
                className={`p-6 rounded-xl transition-all duration-500 bg-white/10 backdrop-blur-sm border ${
                  activeFeature === index ? 'border-amber-400/40' : 'border-white/20'
                } relative overflow-hidden group cursor-pointer hover:shadow-lg hover:shadow-amber-400/10 hover:-translate-y-1`}
                onClick={() => setActiveFeature(index)}
              >
                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className={`rounded-full w-16 h-16 flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110 ${
                  activeFeature === index ? 'bg-amber-400/20' : 'bg-white/5'
                }`}>
                  <feature.icon className={`w-8 h-8 ${activeFeature === index ? 'text-amber-400' : 'text-white/70'}`} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-white/70 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>        {/* CTA */}
        <div 
          className={`text-center transition-all duration-1000 delay-900 ${
            isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
          }`}
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-8 inline-block">
            <Link to="/cars">
              <Button 
                size="lg"
                className="bg-amber-400 hover:bg-amber-500 text-[#152a4a] font-semibold group px-8 py-6 text-lg shadow-lg shadow-amber-400/20 transition-all duration-300 hover:shadow-amber-400/40"
              >
                Explore Our Full Collection
                <ChevronRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
            <p className="text-white/70 mt-4">
              16 premium vehicles available for your luxury travel needs
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumFleet;
