
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
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-primary rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border-2 border-primary rounded-full animate-bounce-slow"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-primary rounded-full animate-pulse"></div>
      </div>

      {/* Animated Road Lines */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden opacity-20">
        <div className="road-lines"></div>
      </div>

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <div className="text-carwala-white space-y-8 animate-slide-in-left">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-primary animate-fade-in-up animation-delay-200">Premium Car Rentals in Udaipur</h2>
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              <span className="inline-block animate-fade-in-up animation-delay-400">Rent the Ride.</span>
              <span className="text-primary block animate-fade-in-up animation-delay-600 animate-text-glow font-black text-6xl lg:text-8xl drop-shadow-lg" style={{
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
              <Car className="w-5 h-5 text-primary animate-bounce-subtle" />
              <span>16 Premium Cars</span>
            </div>
            <div className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300 hover:text-primary cursor-pointer">
              <Clock className="w-5 h-5 text-primary animate-bounce-subtle animation-delay-200" />
              <span>Flexible Timing</span>
            </div>
            <div className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300 hover:text-primary cursor-pointer">
              <Phone className="w-5 h-5 text-primary animate-bounce-subtle animation-delay-400" />
              <span>Local Support</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-1200">
            <Button 
              size="lg" 
              onClick={scrollToBooking}
              className="bg-primary hover:bg-primary/90 text-carwala-black font-bold text-lg px-8 py-4 hover-lift transform hover:scale-105 transition-all duration-300 animate-pulse-glow"
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

          {/* Owner Info */}
          <div className="border-t border-carwala-dark-gray pt-6 animate-fade-in-up animation-delay-1400">
            <div className="flex items-center space-x-4 hover:scale-105 transition-transform duration-300">
              <img 
                src="/lovable-uploads/3190a23b-f24b-465b-a428-4bc1c14266c1.png" 
                alt="Yashpal Singh Jhala - Owner"
                className="w-16 h-16 rounded-full object-cover border-2 border-primary animate-border-glow"
              />
              <div>
                <p className="text-gray-400 text-sm mb-1">Call us directly:</p>
                <p className="text-primary text-xl font-semibold hover:text-carwala-yellow transition-colors duration-300 cursor-pointer">+91 6376390767</p>
                <p className="text-gray-400 text-sm">Yashpal Singh Jhala - Owner</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - Interactive Mahindra Thar */}
        <div className="relative animate-slide-in-right">
          <div className="relative group">
            {/* Mahindra Thar SVG */}
            <div className="thar-container relative">
              <div className="svg-thar-animation relative">
                {/* Car Shadow */}
                <div className="car-shadow absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[500px] h-8 bg-black opacity-30 rounded-full blur-sm"></div>
                
                {/* Interactive Mahindra Thar SVG */}
                <div className="thar-body relative svg-car-drive-in group-hover:animate-bounce-subtle">
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
                      <filter id="tharGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge> 
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    
                    {/* Thar Main Body - Rugged Design */}
                    <path 
                      d="M 80 250 L 520 250 L 530 235 L 530 180 L 520 160 L 500 140 L 480 120 L 450 110 L 400 100 L 350 95 L 250 95 L 200 100 L 150 110 L 120 120 L 100 140 L 80 160 L 70 180 L 70 235 Z" 
                      fill="url(#tharBodyGradient)" 
                      stroke="#FFD700" 
                      strokeWidth="2"
                    />
                    
                    {/* Thar Hood with Rugged Lines */}
                    <path 
                      d="M 400 100 L 480 120 L 500 140 L 520 160 L 490 145 L 430 125 Z" 
                      fill="url(#tharBodyGradient)" 
                      stroke="#FFD700" 
                      strokeWidth="1"
                    />
                    
                    {/* Thar Roof with Roll Cage */}
                    <rect x="180" y="85" width="240" height="15" fill="#1a1a1a" stroke="#FFD700" strokeWidth="2" rx="3" />
                    <rect x="200" y="70" width="200" height="25" fill="none" stroke="#FFD700" strokeWidth="3" rx="5" />
                    
                    {/* Thar Windshield */}
                    <path 
                      d="M 350 95 L 400 100 L 420 120 L 380 115 Z" 
                      fill="#4a5568" 
                      stroke="#2d3748" 
                      strokeWidth="1"
                      opacity="0.8"
                    />
                    
                    {/* Thar Side Windows */}
                    <rect x="220" y="115" width="120" height="25" fill="#4a5568" stroke="#2d3748" strokeWidth="1" opacity="0.8" />
                    
                    {/* Iconic Thar Front Grille */}
                    <rect x="490" y="160" width="40" height="70" fill="#0d0d0d" stroke="#FFD700" strokeWidth="3" rx="5" />
                    <rect x="495" y="170" width="30" height="6" fill="#FFD700" />
                    <rect x="495" y="180" width="30" height="6" fill="#FFD700" />
                    <rect x="495" y="190" width="30" height="6" fill="#FFD700" />
                    <rect x="495" y="200" width="30" height="6" fill="#FFD700" />
                    <rect x="495" y="210" width="30" height="6" fill="#FFD700" />
                    
                    {/* Thar Round Headlights */}
                    <g className="group-hover:animate-pulse-glow">
                      <circle cx="505" cy="175" r="15" fill="#ffffff" stroke="#FFD700" strokeWidth="3">
                        <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="505" cy="175" r="8" fill="#FFD700" filter="url(#tharGlow)">
                        <animate attributeName="opacity" values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite" />
                      </circle>
                    </g>
                    
                    <g className="group-hover:animate-pulse-glow animation-delay-200">
                      <circle cx="505" cy="205" r="15" fill="#ffffff" stroke="#FFD700" strokeWidth="3">
                        <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="505" cy="205" r="8" fill="#FFD700" filter="url(#tharGlow)">
                        <animate attributeName="opacity" values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite" />
                      </circle>
                    </g>
                    
                    {/* Thar Taillights */}
                    <rect x="75" y="170" width="20" height="40" fill="#ff2d2d" stroke="#cc0000" strokeWidth="2" rx="5" />
                    <rect x="80" y="180" width="10" height="5" fill="#ff6666" />
                    <rect x="80" y="190" width="10" height="5" fill="#ff6666" />
                    <rect x="80" y="200" width="10" height="5" fill="#ff6666" />
                    
                    {/* Thar Door Handles */}
                    <rect x="170" y="170" width="12" height="6" fill="#FFD700" rx="3" />
                    <rect x="280" y="170" width="12" height="6" fill="#FFD700" rx="3" />
                    <rect x="390" y="170" width="12" height="6" fill="#FFD700" rx="3" />
                    
                    {/* Rugged Side Steps */}
                    <rect x="120" y="240" width="360" height="12" fill="#1a1a1a" stroke="#FFD700" strokeWidth="2" rx="6" />
                    
                    {/* Thar Signature Wheels - Off-road */}
                    <g className="wheel-front group-hover:animate-spin-wheel">
                      <circle cx="420" cy="250" r="35" fill="url(#tharWheelGradient)" stroke="#FFD700" strokeWidth="4" />
                      <circle cx="420" cy="250" r="25" fill="#1a1a1a" stroke="#FFD700" strokeWidth="3" />
                      <g style={{transformOrigin: '420px 250px'}}>
                        <line x1="395" y1="250" x2="445" y2="250" stroke="#FFD700" strokeWidth="4" />
                        <line x1="420" y1="225" x2="420" y2="275" stroke="#FFD700" strokeWidth="4" />
                        <line x1="400" y1="230" x2="440" y2="270" stroke="#FFD700" strokeWidth="3" />
                        <line x1="440" y1="230" x2="400" y2="270" stroke="#FFD700" strokeWidth="3" />
                        <circle cx="405" cy="235" r="3" fill="#FFD700" />
                        <circle cx="435" cy="235" r="3" fill="#FFD700" />
                        <circle cx="405" cy="265" r="3" fill="#FFD700" />
                        <circle cx="435" cy="265" r="3" fill="#FFD700" />
                      </g>
                      <circle cx="420" cy="250" r="10" fill="#FFD700" />
                    </g>
                    
                    <g className="wheel-rear group-hover:animate-spin-wheel">
                      <circle cx="180" cy="250" r="35" fill="url(#tharWheelGradient)" stroke="#FFD700" strokeWidth="4" />
                      <circle cx="180" cy="250" r="25" fill="#1a1a1a" stroke="#FFD700" strokeWidth="3" />
                      <g style={{transformOrigin: '180px 250px'}}>
                        <line x1="155" y1="250" x2="205" y2="250" stroke="#FFD700" strokeWidth="4" />
                        <line x1="180" y1="225" x2="180" y2="275" stroke="#FFD700" strokeWidth="4" />
                        <line x1="160" y1="230" x2="200" y2="270" stroke="#FFD700" strokeWidth="3" />
                        <line x1="200" y1="230" x2="160" y2="270" stroke="#FFD700" strokeWidth="3" />
                        <circle cx="165" cy="235" r="3" fill="#FFD700" />
                        <circle cx="195" cy="235" r="3" fill="#FFD700" />
                        <circle cx="165" cy="265" r="3" fill="#FFD700" />
                        <circle cx="195" cy="265" r="3" fill="#FFD700" />
                      </g>
                      <circle cx="180" cy="250" r="10" fill="#FFD700" />
                    </g>
                    
                    {/* Thar Spare Wheel (Back Mounted) */}
                    <circle cx="95" cy="190" r="25" fill="url(#tharWheelGradient)" stroke="#FFD700" strokeWidth="3" />
                    <circle cx="95" cy="190" r="15" fill="#1a1a1a" stroke="#FFD700" strokeWidth="2" />
                    <circle cx="95" cy="190" r="8" fill="#FFD700" />
                    
                    {/* Thar Side Mirror */}
                    <ellipse cx="470" cy="150" rx="8" ry="12" fill="#1a1a1a" stroke="#FFD700" strokeWidth="2" />
                    
                    {/* Roof Accessories */}
                    <rect x="220" y="65" width="160" height="8" fill="#FFD700" rx="4" opacity="0.9" />
                    <rect x="240" y="60" width="20" height="12" fill="#1a1a1a" stroke="#FFD700" strokeWidth="1" rx="2" />
                    <rect x="280" y="60" width="20" height="12" fill="#1a1a1a" stroke="#FFD700" strokeWidth="1" rx="2" />
                    <rect x="320" y="60" width="20" height="12" fill="#1a1a1a" stroke="#FFD700" strokeWidth="1" rx="2" />
                    <rect x="360" y="60" width="20" height="12" fill="#1a1a1a" stroke="#FFD700" strokeWidth="1" rx="2" />
                  </svg>
                </div>
                
                {/* Enhanced Speed Lines */}
                <div className="speed-lines-container absolute top-1/2 left-0 transform -translate-y-1/2 group-hover:opacity-100 opacity-50 transition-opacity duration-300">
                  <div className="speed-line opacity-70 absolute w-28 h-1 bg-primary blur-sm animate-speed-line-1" style={{top: '-40px'}}></div>
                  <div className="speed-line opacity-60 absolute w-24 h-1 bg-primary blur-sm animate-speed-line-2" style={{top: '-20px'}}></div>
                  <div className="speed-line opacity-50 absolute w-20 h-1 bg-primary blur-sm animate-speed-line-3" style={{top: '0px'}}></div>
                  <div className="speed-line opacity-40 absolute w-16 h-1 bg-primary blur-sm animate-speed-line-1" style={{top: '20px'}}></div>
                  <div className="speed-line opacity-30 absolute w-12 h-1 bg-primary blur-sm animate-speed-line-2" style={{top: '40px'}}></div>
                </div>
                
                {/* Dust Particles */}
                <div className="dust-particles absolute bottom-12 left-12 group-hover:opacity-100 opacity-30 transition-opacity duration-300">
                  <div className="dust-particle w-3 h-3 bg-amber-400 rounded-full opacity-60 animate-smoke-1"></div>
                  <div className="dust-particle w-4 h-4 bg-amber-500 rounded-full opacity-40 animate-smoke-2" style={{marginTop: '-15px', marginLeft: '12px'}}></div>
                  <div className="dust-particle w-2 h-2 bg-amber-600 rounded-full opacity-30 animate-smoke-3" style={{marginTop: '-10px', marginLeft: '8px'}}></div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-primary text-carwala-black p-3 rounded-full animate-bounce-slow hover:animate-spin transition-all duration-300">
              <Car className="w-6 h-6" />
            </div>
            
            {/* Enhanced Stats Cards */}
            <div className="absolute -bottom-8 left-0 bg-carwala-white text-carwala-black p-4 rounded-lg shadow-xl hover-lift animate-slide-up animation-delay-1600 group-hover:scale-110 transition-transform duration-300">
              <div className="text-2xl font-bold text-primary animate-count-up">16</div>
              <div className="text-sm">Premium Cars</div>
            </div>
            
            <div className="absolute -bottom-8 right-0 bg-carwala-white text-carwala-black p-4 rounded-lg shadow-xl hover-lift animate-slide-up animation-delay-1800 group-hover:scale-110 transition-transform duration-300">
              <div className="text-2xl font-bold text-primary animate-count-up">100%</div>
              <div className="text-sm">Adventure</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-smooth">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center hover:border-carwala-yellow transition-colors duration-300 cursor-pointer" onClick={scrollToBooking}>
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse-slow"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
