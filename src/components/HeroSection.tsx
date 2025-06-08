
import { Button } from '@/components/ui/button';
import { Car, Clock, Phone } from 'lucide-react';

const HeroSection = () => {
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
              <span className="inline-block animate-fade-in-up animation-delay-400">Rent a Car in</span>
              <span className="text-primary block animate-fade-in-up animation-delay-600 animate-text-glow font-black text-6xl lg:text-8xl drop-shadow-lg" style={{
                textShadow: '0 0 8px #FFD700, 0 0 16px #FFD700'
              }}>Udaipur</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-lg animate-fade-in-up animation-delay-800">
              Pay 50% Now, Rest Later. Premium luxury cars available for pickup from our Udaipur office.
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
              className="bg-primary hover:bg-primary/90 text-carwala-black font-bold text-lg px-8 py-4 hover-lift transform hover:scale-105 transition-all duration-300 animate-pulse-glow"
            >
              Book Now - Pay 50%
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-carwala-black text-lg px-8 py-4 hover-lift transform hover:scale-105 transition-all duration-300"
            >
              View Our Cars
            </Button>
          </div>

          {/* Owner Info with Image */}
          <div className="border-t border-carwala-dark-gray pt-6 animate-fade-in-up animation-delay-1400">
            <div className="flex items-center space-x-4 hover:scale-105 transition-transform duration-300">
              <img 
                src="/lovable-uploads/3190a23b-f24b-465b-a428-4bc1c14266c1.png" 
                alt="Yashpal Singh Jhala - Owner"
                className="w-16 h-16 rounded-full object-cover border-2 border-primary animate-border-glow"
              />
              <div>
                <p className="text-gray-400 text-sm mb-1">Call us directly:</p>
                <p className="text-primary text-xl font-semibold hover:text-carwala-yellow transition-colors duration-300 cursor-pointer">+91 9876543210</p>
                <p className="text-gray-400 text-sm">Yashpal Singh Jhala - Owner</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - High-Quality SVG Car Animation */}
        <div className="relative animate-slide-in-right">
          <div className="relative">
            {/* SVG Car Animation Container */}
            <div className="car-container relative">
              {/* High-Quality Realistic SVG Car */}
              <div className="svg-car-animation relative">
                {/* Car Shadow */}
                <div className="car-shadow absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-8 bg-black opacity-30 rounded-full blur-sm"></div>
                
                {/* Main SVG Car */}
                <div className="car-body relative svg-car-drive-in">
                  <svg 
                    width="500" 
                    height="250" 
                    viewBox="0 0 500 250" 
                    className="w-full max-w-2xl mx-auto relative z-10"
                  >
                    {/* Car Body Main Structure */}
                    <defs>
                      <linearGradient id="carBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#2c3e50" />
                        <stop offset="50%" stopColor="#34495e" />
                        <stop offset="100%" stopColor="#1a252f" />
                      </linearGradient>
                      <linearGradient id="windowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#87ceeb" />
                        <stop offset="100%" stopColor="#4682b4" />
                      </linearGradient>
                      <radialGradient id="wheelGradient" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#2c3e50" />
                        <stop offset="70%" stopColor="#34495e" />
                        <stop offset="100%" stopColor="#1a252f" />
                      </radialGradient>
                      <filter id="carShadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="3" dy="3" stdDeviation="2" floodColor="#000" floodOpacity="0.3"/>
                      </filter>
                    </defs>
                    
                    {/* Car Main Body */}
                    <path 
                      d="M 80 180 L 420 180 L 430 170 L 430 140 L 400 120 L 350 100 L 280 90 L 200 90 L 150 100 L 100 120 L 70 140 L 70 170 Z" 
                      fill="url(#carBodyGradient)" 
                      stroke="#1a252f" 
                      strokeWidth="2"
                      filter="url(#carShadow)"
                    />
                    
                    {/* Car Roof */}
                    <path 
                      d="M 150 100 L 280 90 L 320 100 L 340 120 L 160 120 Z" 
                      fill="url(#carBodyGradient)" 
                      stroke="#1a252f" 
                      strokeWidth="2"
                    />
                    
                    {/* Front Windshield */}
                    <path 
                      d="M 280 90 L 320 100 L 340 120 L 300 110 Z" 
                      fill="url(#windowGradient)" 
                      stroke="#4682b4" 
                      strokeWidth="1"
                      opacity="0.8"
                    />
                    
                    {/* Rear Windshield */}
                    <path 
                      d="M 150 100 L 200 90 L 220 110 L 160 120 Z" 
                      fill="url(#windowGradient)" 
                      stroke="#4682b4" 
                      strokeWidth="1"
                      opacity="0.8"
                    />
                    
                    {/* Side Windows */}
                    <rect x="220" y="110" width="80" height="30" fill="url(#windowGradient)" stroke="#4682b4" strokeWidth="1" opacity="0.8" />
                    
                    {/* Front Grille */}
                    <rect x="400" y="140" width="25" height="25" fill="#1a252f" stroke="#FFD700" strokeWidth="1" />
                    <rect x="405" y="145" width="15" height="3" fill="#FFD700" />
                    <rect x="405" y="150" width="15" height="3" fill="#FFD700" />
                    <rect x="405" y="155" width="15" height="3" fill="#FFD700" />
                    
                    {/* Headlights */}
                    <circle cx="415" cy="152" r="8" fill="#ffffff" stroke="#FFD700" strokeWidth="2">
                      <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
                    </circle>
                    
                    {/* Taillights */}
                    <circle cx="85" cy="152" r="6" fill="#ff4444" stroke="#cc0000" strokeWidth="1" />
                    
                    {/* Door Handles */}
                    <rect x="180" y="145" width="8" height="4" fill="#FFD700" rx="2" />
                    <rect x="320" y="145" width="8" height="4" fill="#FFD700" rx="2" />
                    
                    {/* Front Wheel */}
                    <g className="wheel-front">
                      <circle cx="350" cy="180" r="25" fill="url(#wheelGradient)" stroke="#1a252f" strokeWidth="3" />
                      <circle cx="350" cy="180" r="15" fill="#2c3e50" stroke="#FFD700" strokeWidth="2" />
                      <g className="wheel-spokes animate-spin-wheel" style={{transformOrigin: '350px 180px'}}>
                        <line x1="335" y1="180" x2="365" y2="180" stroke="#FFD700" strokeWidth="2" />
                        <line x1="350" y1="165" x2="350" y2="195" stroke="#FFD700" strokeWidth="2" />
                        <line x1="340" y1="170" x2="360" y2="190" stroke="#FFD700" strokeWidth="1" />
                        <line x1="360" y1="170" x2="340" y2="190" stroke="#FFD700" strokeWidth="1" />
                      </g>
                    </g>
                    
                    {/* Rear Wheel */}
                    <g className="wheel-rear">
                      <circle cx="150" cy="180" r="25" fill="url(#wheelGradient)" stroke="#1a252f" strokeWidth="3" />
                      <circle cx="150" cy="180" r="15" fill="#2c3e50" stroke="#FFD700" strokeWidth="2" />
                      <g className="wheel-spokes animate-spin-wheel" style={{transformOrigin: '150px 180px'}}>
                        <line x1="135" y1="180" x2="165" y2="180" stroke="#FFD700" strokeWidth="2" />
                        <line x1="150" y1="165" x2="150" y2="195" stroke="#FFD700" strokeWidth="2" />
                        <line x1="140" y1="170" x2="160" y2="190" stroke="#FFD700" strokeWidth="1" />
                        <line x1="160" y1="170" x2="140" y2="190" stroke="#FFD700" strokeWidth="1" />
                      </g>
                    </g>
                    
                    {/* Car Details - Side Lines */}
                    <line x1="100" y1="160" x2="380" y2="160" stroke="#FFD700" strokeWidth="1" opacity="0.7" />
                    <line x1="100" y1="165" x2="380" y2="165" stroke="#FFD700" strokeWidth="0.5" opacity="0.5" />
                    
                    {/* Mirror */}
                    <ellipse cx="340" cy="135" rx="4" ry="6" fill="#2c3e50" stroke="#FFD700" strokeWidth="1" />
                  </svg>
                </div>
                
                {/* Enhanced Speed Lines */}
                <div className="speed-lines-container absolute top-1/2 left-0 transform -translate-y-1/2">
                  <div className="speed-line opacity-70 absolute w-20 h-1 bg-primary blur-sm animate-speed-line-1" style={{top: '-20px'}}></div>
                  <div className="speed-line opacity-60 absolute w-16 h-1 bg-primary blur-sm animate-speed-line-2" style={{top: '0px'}}></div>
                  <div className="speed-line opacity-50 absolute w-12 h-1 bg-primary blur-sm animate-speed-line-3" style={{top: '20px'}}></div>
                </div>
                
                {/* Exhaust Smoke */}
                <div className="exhaust-smoke absolute bottom-8 left-4">
                  <div className="smoke-particle w-3 h-3 bg-gray-400 rounded-full opacity-40 animate-smoke-1"></div>
                  <div className="smoke-particle w-2 h-2 bg-gray-500 rounded-full opacity-30 animate-smoke-2" style={{marginTop: '-8px', marginLeft: '6px'}}></div>
                  <div className="smoke-particle w-1 h-1 bg-gray-600 rounded-full opacity-20 animate-smoke-3" style={{marginTop: '-6px', marginLeft: '4px'}}></div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-primary text-carwala-black p-3 rounded-full animate-bounce-slow hover:animate-spin transition-all duration-300">
              <Car className="w-6 h-6" />
            </div>
            
            {/* Stats Cards */}
            <div className="absolute -bottom-8 left-0 bg-carwala-white text-carwala-black p-4 rounded-lg shadow-xl hover-lift animate-slide-up animation-delay-1600">
              <div className="text-2xl font-bold text-primary animate-count-up">16</div>
              <div className="text-sm">Premium Cars</div>
            </div>
            
            <div className="absolute -bottom-8 right-0 bg-carwala-white text-carwala-black p-4 rounded-lg shadow-xl hover-lift animate-slide-up animation-delay-1800">
              <div className="text-2xl font-bold text-primary animate-count-up">100%</div>
              <div className="text-sm">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-smooth">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center hover:border-carwala-yellow transition-colors duration-300">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse-slow"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
