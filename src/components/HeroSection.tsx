
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Car, Clock, MapPin, Phone, Shield, Star } from 'lucide-react';
import { useState, useEffect } from 'react';

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  
  useEffect(() => {
    setIsLoaded(true);
    
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 3);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const featuredCars = [
    { 
      name: "Mahindra Thar", 
      image: "https://images.unsplash.com/photo-1679921046507-d0d9ab3f3964?q=80&w=1000&auto=format&fit=crop",
      price: "₹3,499",
      features: ["4x4 Drive", "Convertible Top", "Adventure Ready"]
    },
    { 
      name: "Toyota Fortuner", 
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1000&auto=format&fit=crop",
      price: "₹5,999",
      features: ["7 Seater", "Luxury SUV", "Premium Comfort"]
    },
    { 
      name: "Hyundai Creta", 
      image: "https://images.unsplash.com/photo-1549399542-7e8f2e928464?q=80&w=1000&auto=format&fit=crop",
      price: "₹2,499",
      features: ["Fuel Efficient", "Spacious", "Family Friendly"]
    }
  ];
  return (
    <section id="home" className="relative min-h-screen bg-gradient-to-br from-[#050a18] via-[#0c1630] to-[#050a18] overflow-hidden">
      {/* Animated Road */}
      <div className="absolute inset-x-0 bottom-0 h-36 perspective-1000">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
        <div className="road w-full h-40 bg-[#111] border-t border-b border-amber-400/50 relative overflow-hidden transform rotate-x-10 scale-y-50 origin-bottom">
          <div className="lane-divider flex justify-center space-x-16 animate-[translateY_10s_linear_infinite]">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i} 
                className="w-10 h-5 bg-amber-400 my-10"
                style={{ marginTop: `${i * 100}px` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
      
      {/* City Skyline Silhouette */}
      <div className="absolute inset-x-0 bottom-28 z-0">
        <svg viewBox="0 0 1440 320" className="w-full opacity-30">
          <path
            fill="#111827"
            fillOpacity="1"
            d="M0,192L48,181.3C96,171,192,149,288,154.7C384,160,480,192,576,197.3C672,203,768,181,864,154.7C960,128,1056,96,1152,96C1248,96,1344,128,1392,144L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Basic particles */}
        {[...Array(40)].map((_, i) => (
          <div 
            key={`basic-${i}`} 
            className="absolute rounded-full bg-amber-400"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 5 + 2}px`,
              height: `${Math.random() * 5 + 2}px`,
              opacity: Math.random() * 0.5 + 0.1,
              animation: `pulse ${Math.random() * 4 + 2}s ease-in-out infinite alternate`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}

        {/* Floating particles with drift animation */}
        {[...Array(20)].map((_, i) => (
          <div 
            key={`float-${i}`} 
            className="absolute rounded-full bg-white/30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 8 + 3}px`,
              height: `${Math.random() * 8 + 3}px`,
              filter: 'blur(1px)',
              animation: `drift ${Math.random() * 10 + 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 10}s`
            }}
          ></div>
        ))}        {/* Sparkling particles */}
        {[...Array(15)].map((_, i) => (
          <div 
            key={`sparkle-${i}`} 
            className="absolute"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              background: 'radial-gradient(circle, #FFC107 0%, rgba(255,255,255,0) 70%)',
              animation: `sparkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          ></div>
        ))}

        {/* Larger glowing orbs */}
        {[...Array(10)].map((_, i) => (
          <div 
            key={`orb-${i}`} 
            className="absolute rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 80 + 30}px`,
              height: `${Math.random() * 80 + 30}px`,
              background: `radial-gradient(circle, hsla(${Math.random() * 60 + 30}, 80%, 60%, 0.04) 0%, transparent 70%)`,
              boxShadow: '0 0 30px rgba(255, 215, 0, 0.05)',
              animation: `float ${Math.random() * 8 + 12}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}

        {/* Road dust particles */}
        {[...Array(20)].map((_, i) => (
          <div 
            key={`dust-${i}`} 
            className="absolute rounded-full bg-gray-400/10"
            style={{
              bottom: `${Math.random() * 15 + 5}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              filter: 'blur(1px)',
              opacity: Math.random() * 0.4 + 0.1,
              animation: `pulse-grow ${Math.random() * 4 + 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          ></div>
        ))}

        {/* Star-like distant particles */}
        {[...Array(25)].map((_, i) => {
          const size = Math.random() * 2 + 0.5;
          return (
            <div 
              key={`star-${i}`} 
              className="absolute bg-white"
              style={{
                top: `${Math.random() * 60}%`,
                left: `${Math.random() * 100}%`,
                width: `${size}px`,
                height: `${size}px`,
                opacity: Math.random() * 0.5 + 0.1,
                animation: `sparkle ${Math.random() * 5 + 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          );
        })}
        
        {/* Fast moving horizontal particles (like cars in distance) */}
        {[...Array(5)].map((_, i) => (
          <div 
            key={`car-particle-${i}`} 
            className="absolute"
            style={{
              bottom: `${Math.random() * 20 + 15}%`,
              left: `-50px`,
              width: `${Math.random() * 15 + 10}px`,
              height: `${Math.random() * 5 + 2}px`,
              backgroundColor: `hsla(${Math.random() * 60}, 100%, 70%, ${Math.random() * 0.3 + 0.1})`,
              borderRadius: '2px',
              animation: `drive-by ${Math.random() * 10 + 15}s linear infinite`,
              animationDelay: `${Math.random() * 10}s`,
              boxShadow: '0 0 5px rgba(255, 255, 255, 0.5)'
            }}
          ></div>
        ))}
          {/* Shimmering road effect particles */}
        {[...Array(15)].map((_, i) => (
          <div 
            key={`road-shimmer-${i}`} 
            className="absolute rounded-full bg-amber-400/20"
            style={{
              bottom: `${Math.random() * 10 + 2}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              filter: 'blur(1px)',
              opacity: Math.random() * 0.3 + 0.1,
              animation: `pulse ${Math.random() * 3 + 2}s ease-in-out infinite alternate`,
              animationDelay: `${Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-4 pt-32 pb-28 flex flex-col h-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center h-full">          {/* Left Content - Text and CTA */}
          <div className={`text-white space-y-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-1 w-12 bg-amber-400 rounded-full"></div>
              <span className="text-sm uppercase font-bold tracking-wider text-amber-400">Udaipur's Premier Car Rental</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-none">
              <div className="overflow-hidden">
                <span 
                  className="block transform transition-transform duration-700" 
                  style={{ 
                    transitionDelay: '200ms',
                    transform: isLoaded ? 'translateY(0)' : 'translateY(100%)'
                  }}
                >
                  Drive Your
                </span>
              </div>
              <div className="overflow-hidden">
                <span 
                  className="text-amber-400 block font-black text-6xl lg:text-8xl drop-shadow-lg transform transition-transform duration-700" 
                  style={{ 
                    transitionDelay: '400ms',
                    transform: isLoaded ? 'translateY(0)' : 'translateY(100%)',
                    textShadow: '0 0 15px rgba(255, 215, 0, 0.6)'
                  }}
                >
                  Adventure
                </span>
              </div>
              <div className="overflow-hidden">
                <span 
                  className="block transform transition-transform duration-700" 
                  style={{ 
                    transitionDelay: '600ms',
                    transform: isLoaded ? 'translateY(0)' : 'translateY(100%)'
                  }}
                >
                  in Udaipur
                </span>
              </div>
            </h1>
            
            <p 
              className="text-xl text-gray-300 max-w-lg leading-relaxed transform transition-opacity duration-1000" 
              style={{ 
                transitionDelay: '800ms',
                opacity: isLoaded ? 1 : 0
              }}
            >
              Explore the City of Lakes with our premium fleet of cars. From rugged Thars to luxurious sedans, we have the perfect ride for your journey.
            </p>
              {/* Featured Benefits */}
            <div 
              className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2"
              style={{ 
                transitionDelay: '1000ms',
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 1s, transform 1s'
              }}
            >
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm p-3 rounded-lg border border-white/10 hover:border-amber-400/50 transition-all duration-300 hover:bg-white/10">
                <Shield className="text-amber-400 w-6 h-6" />
                <div className="text-sm font-medium">Fully Insured</div>
              </div>
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm p-3 rounded-lg border border-white/10 hover:border-amber-400/50 transition-all duration-300 hover:bg-white/10">
                <Star className="text-amber-400 w-6 h-6" />
                <div className="text-sm font-medium">5-Star Service</div>
              </div>
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm p-3 rounded-lg border border-white/10 hover:border-amber-400/50 transition-all duration-300 hover:bg-white/10">
                <MapPin className="text-amber-400 w-6 h-6" />
                <div className="text-sm font-medium">Free Delivery</div>
              </div>
            </div>
            
            {/* CTA Section */}
            <div 
              className="flex flex-col sm:flex-row gap-4 pt-4"
              style={{ 
                transitionDelay: '1200ms',
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 1s, transform 1s'
              }}
            >              <Button 
                size="lg" 
                onClick={scrollToBooking}
                className="bg-amber-400 hover:bg-amber-500 text-[#0a1a35] font-bold text-lg px-8 py-6 hover:translate-y-[-5px] transition-all duration-300 rounded-xl shadow-lg shadow-amber-400/20 hover:shadow-amber-400/40 group"
              >
                Book Your Ride Now 
                <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10 hover:border-white/30 text-lg px-8 py-6 hover:translate-y-[-5px] transition-all duration-300 rounded-xl backdrop-blur-sm"
                onClick={() => window.location.href = '/cars'}
              >
                Browse Our Fleet
              </Button>
            </div>
            
            {/* Contact Info */}
            <div 
              className="absolute bottom-6 left-0 lg:relative lg:bottom-auto lg:left-auto transform transition-all duration-1000 lg:mt-8" 
              style={{ 
                transitionDelay: '1400ms',
                opacity: isLoaded ? 1 : 0
              }}
            >              <div className="flex items-center gap-4 bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10 hover:border-amber-400/30 transition-all duration-300 hover:bg-white/10 max-w-md">
                <img 
                  src="/lovable-uploads/3190a23b-f24b-465b-a428-4bc1c14266c1.png" 
                  alt="Yashpal Singh Jhala - Owner"
                  className="w-16 h-16 rounded-full object-cover border-2 border-amber-400/50 shadow-lg"
                />
                <div>
                  <p className="text-gray-300 text-xs mb-1">Call us directly:</p>
                  <p className="text-amber-400 text-xl font-bold hover:text-amber-300 transition-colors duration-300 cursor-pointer">+91 6376390767</p>
                  <p className="text-gray-300 text-sm mt-1">24/7 Support Available</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Interactive Car Showcase */}
          <div 
            className={`relative h-full transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
            style={{ transitionDelay: '500ms' }}
          >
            <div className="relative lg:absolute lg:inset-0 flex items-center justify-center">
              {/* 3D Car Carousel */}
              <div className="relative w-full max-w-xl mx-auto">
                {/* Rotating Platform */}
                <div className="relative aspect-[16/9]">
                  {/* Car Display */}
                  {featuredCars.map((car, index) => (
                    <div 
                      key={index} 
                      className={`absolute inset-0 transition-all duration-1000 transform perspective-1000 ${
                        activeSlide === index 
                          ? 'opacity-100 scale-100 z-20' 
                          : activeSlide === (index + 1) % 3 
                            ? 'opacity-0 scale-90 -translate-x-full z-10' 
                            : 'opacity-0 scale-90 translate-x-full z-10'
                      }`}
                    >                      {/* Car Image with 3D Effects */}
                      <div className="relative h-full overflow-hidden rounded-2xl border-2 border-amber-400/20 shadow-2xl shadow-amber-400/10 transform hover:scale-[1.02] transition-transform duration-500">
                        {/* Car Image */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 z-10"></div>
                        <img 
                          src={car.image}
                          alt={car.name}
                          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000"
                        />
                        
                        {/* Car Info Overlay */}
                        <div className="absolute inset-x-0 bottom-0 p-6 z-20 bg-gradient-to-t from-black/90 to-transparent">
                          <div className="flex justify-between items-end">
                            <div>
                              <h3 className="text-2xl font-bold text-white mb-2">{car.name}</h3>
                              <div className="flex gap-2 mb-3">
                                {car.features.map((feature, i) => (
                                  <span key={i} className="text-xs bg-white/10 backdrop-blur-sm px-2 py-1 rounded-full text-white/80">
                                    {feature}
                                  </span>
                                ))}
                              </div>
                              <Button 
                                onClick={scrollToBooking}
                                size="sm" 
                                className="bg-amber-400 hover:bg-amber-500 text-[#0a1a35] font-bold hover:translate-y-[-2px] transition-all duration-300"
                              >
                                Book Now
                              </Button>
                            </div>
                            <div className="text-right">
                              <div className="text-xs text-white/70 mb-1">Starting from</div>
                              <div className="text-2xl font-bold text-amber-400">{car.price}<span className="text-sm text-white/70">/day</span></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                    {/* Navigation Dots */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
                    {featuredCars.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          activeSlide === index ? 'bg-amber-400 w-8' : 'bg-white/30 hover:bg-white/50'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Floating Stats Cards */}                <div className="absolute -top-6 -right-4 z-30 bg-white/10 backdrop-blur-lg p-4 rounded-xl border border-white/20 shadow-lg transform rotate-2 hover:rotate-0 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <Car className="text-amber-400 w-5 h-5" />
                    <div>
                      <div className="text-lg font-bold text-white">16+ Cars</div>
                      <div className="text-xs text-white/70">Premium Fleet</div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-6 -left-4 z-30 bg-white/10 backdrop-blur-lg p-4 rounded-xl border border-white/20 shadow-lg transform -rotate-2 hover:rotate-0 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <Calendar className="text-amber-400 w-5 h-5" />
                    <div>
                      <div className="text-lg font-bold text-white">Easy Booking</div>
                      <div className="text-xs text-white/70">In 2 Minutes</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <div 
          className="w-8 h-12 border-2 border-amber-400/50 rounded-full flex justify-center hover:border-amber-400 transition-colors duration-300 cursor-pointer backdrop-blur-sm bg-white/5" 
          onClick={scrollToBooking}
        >
          <div className="w-1 h-3 bg-amber-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
      
      {/* Animated Gradient Accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-70 animate-pulse"></div>
    </section>
  );
};

export default HeroSection;
