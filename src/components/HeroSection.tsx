
import { Button } from '@/components/ui/button';
import { Car, Clock, Phone } from 'lucide-react';

const HeroSection = () => {
  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen bg-gradient-to-br from-carwala-black via-carwala-dark-gray to-carwala-black flex items-center overflow-hidden pt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-primary rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border-2 border-primary rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-primary rounded-full animate-pulse"></div>
      </div>

      {/* Animated Road Lines */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden opacity-20">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-30"></div>
      </div>

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <div className="text-carwala-white space-y-8 animate-fade-in-up">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-primary animate-fade-in-up animation-delay-200">Premium Car Rentals in Udaipur</h2>
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              <span className="inline-block animate-fade-in-up animation-delay-400">Rent the Ride.</span>
              <span className="text-primary block animate-fade-in-up animation-delay-600 font-black text-6xl lg:text-8xl drop-shadow-lg" style={{
                textShadow: '0 0 8px #FFD700, 0 0 16px #FFD700'
              }}>Rule the Road.</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-lg animate-fade-in-up animation-delay-800">
              Experience the thrill of adventure with our premium Mahindra Thar and luxury fleet. Pay 50% now, rest on pickup.
            </p>
          </div>

          {/* Key Features */}
          <div className="flex flex-wrap gap-6 animate-fade-in-up animation-delay-1000">
            <div className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300 hover:text-primary cursor-pointer">
              <Car className="w-5 h-5 text-primary animate-bounce" />
              <span>16 Premium Cars</span>
            </div>
            <div className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300 hover:text-primary cursor-pointer">
              <Clock className="w-5 h-5 text-primary animate-bounce animation-delay-200" />
              <span>Flexible Timing</span>
            </div>
            <div className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300 hover:text-primary cursor-pointer">
              <Phone className="w-5 h-5 text-primary animate-bounce animation-delay-400" />
              <span>Local Support</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-1200">
            <Button 
              size="lg" 
              onClick={scrollToBooking}
              className="bg-primary hover:bg-primary/90 text-carwala-black font-bold text-lg px-8 py-4 hover-lift transform hover:scale-105 transition-all duration-300"
            >
              Book Your Car Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-carwala-black text-lg px-8 py-4 hover-lift transform hover:scale-105 transition-all duration-300"
              onClick={() => window.location.href = '/cars'}
            >
              View Our Fleet
            </Button>
          </div>

          {/* Owner Info - Enhanced and Larger */}
          <div className="border-t border-carwala-dark-gray pt-8 animate-fade-in-up animation-delay-1400">
            <div className="flex items-center space-x-6 hover:scale-105 transition-transform duration-300 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-primary/20">
              <img 
                src="/lovable-uploads/3190a23b-f24b-465b-a428-4bc1c14266c1.png" 
                alt="Yashpal Singh Jhala - Owner"
                className="w-20 h-20 rounded-full object-cover border-3 border-primary shadow-lg"
              />
              <div className="flex-1">
                <p className="text-gray-300 text-sm mb-2">Call us directly:</p>
                <p className="text-primary text-2xl font-bold hover:text-carwala-yellow transition-colors duration-300 cursor-pointer mb-1">+91 6376390767</p>
                <p className="text-gray-300 text-base font-medium">Yashpal Singh Jhala - Owner</p>
                <p className="text-gray-400 text-sm mt-1">Available 24/7 for your service</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - Interactive Mahindra Thar */}
        <div className="relative animate-fade-in-up animation-delay-600">
          <div className="relative group">
            {/* Mahindra Thar SVG */}
            <div className="relative">
              <div className="relative group-hover:scale-105 transition-transform duration-500">
                {/* Car Shadow */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[500px] h-8 bg-black opacity-30 rounded-full blur-sm"></div>
                
                {/* Interactive Mahindra Thar SVG */}
                <div className="relative">
                  <svg 
                    width="650" 
                    height="320" 
                    viewBox="0 0 650 320" 
                    className="w-full max-w-2xl mx-auto relative z-10 cursor-pointer"
                  >
                    {/* Thar Gradients and Filters */}
                    <defs>
                      <linearGradient id="tharBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#2d2d2d" />
                        <stop offset="30%" stopColor="#1a1a1a" />
                        <stop offset="70%" stopColor="#0d0d0d" />
                        <stop offset="100%" stopColor="#000000" />
                      </linearGradient>
                      <linearGradient id="tharAccentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#FFD700" />
                        <stop offset="50%" stopColor="#FFA500" />
                        <stop offset="100%" stopColor="#FFD700" />
                      </linearGradient>
                      <radialGradient id="tharWheelGradient" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#2d2d2d" />
                        <stop offset="70%" stopColor="#1a1a1a" />
                        <stop offset="100%" stopColor="#0d0d0d" />
                      </radialGradient>
                    </defs>
                    
                    {/* Thar Main Body */}
                    <path 
                      d="M 80 250 L 520 250 L 530 235 L 530 180 L 520 160 L 500 140 L 480 120 L 450 110 L 400 100 L 350 95 L 250 95 L 200 100 L 150 110 L 120 120 L 100 140 L 80 160 L 70 180 L 70 235 Z" 
                      fill="url(#tharBodyGradient)" 
                      stroke="#FFD700" 
                      strokeWidth="2"
                    />
                    
                    {/* Thar Front Grille */}
                    <rect x="490" y="160" width="40" height="70" fill="#0d0d0d" stroke="#FFD700" strokeWidth="3" rx="5" />
                    <rect x="495" y="170" width="30" height="6" fill="#FFD700" />
                    <rect x="495" y="180" width="30" height="6" fill="#FFD700" />
                    <rect x="495" y="190" width="30" height="6" fill="#FFD700" />
                    <rect x="495" y="200" width="30" height="6" fill="#FFD700" />
                    <rect x="495" y="210" width="30" height="6" fill="#FFD700" />
                    
                    {/* Thar Headlights */}
                    <circle cx="505" cy="175" r="15" fill="#ffffff" stroke="#FFD700" strokeWidth="3">
                      <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="505" cy="175" r="8" fill="#FFD700">
                      <animate attributeName="opacity" values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                    
                    <circle cx="505" cy="205" r="15" fill="#ffffff" stroke="#FFD700" strokeWidth="3">
                      <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="505" cy="205" r="8" fill="#FFD700">
                      <animate attributeName="opacity" values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                    
                    {/* Thar Wheels */}
                    <g>
                      <circle cx="420" cy="250" r="35" fill="url(#tharWheelGradient)" stroke="#FFD700" strokeWidth="4" />
                      <circle cx="420" cy="250" r="25" fill="#1a1a1a" stroke="#FFD700" strokeWidth="3" />
                      <circle cx="420" cy="250" r="10" fill="#FFD700" />
                    </g>
                    
                    <g>
                      <circle cx="180" cy="250" r="35" fill="url(#tharWheelGradient)" stroke="#FFD700" strokeWidth="4" />
                      <circle cx="180" cy="250" r="25" fill="#1a1a1a" stroke="#FFD700" strokeWidth="3" />
                      <circle cx="180" cy="250" r="10" fill="#FFD700" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-primary text-carwala-black p-3 rounded-full animate-bounce hover:animate-spin transition-all duration-300">
              <Car className="w-6 h-6" />
            </div>
            
            {/* Stats Cards */}
            <div className="absolute -bottom-8 left-0 bg-carwala-white text-carwala-black p-4 rounded-lg shadow-xl hover-lift animate-fade-in-up animation-delay-1600 group-hover:scale-110 transition-transform duration-300">
              <div className="text-2xl font-bold text-primary">16</div>
              <div className="text-sm">Premium Cars</div>
            </div>
            
            <div className="absolute -bottom-8 right-0 bg-carwala-white text-carwala-black p-4 rounded-lg shadow-xl hover-lift animate-fade-in-up animation-delay-1800 group-hover:scale-110 transition-transform duration-300">
              <div className="text-2xl font-bold text-primary">100%</div>
              <div className="text-sm">Adventure</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center hover:border-carwala-yellow transition-colors duration-300 cursor-pointer" onClick={scrollToBooking}>
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
