
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

        {/* Right Content - Black SUV Animation */}
        <div className="relative animate-slide-in-right">
          <div className="relative">
            {/* SUV Animation Container */}
            <div className="car-container relative">
              {/* Premium Black SUV */}
              <div className="svg-car-animation relative">
                {/* Car Shadow */}
                <div className="car-shadow absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[450px] h-8 bg-black opacity-30 rounded-full blur-sm"></div>
                
                {/* Main Black SUV */}
                <div className="car-body relative svg-car-drive-in">
                  <svg 
                    width="600" 
                    height="280" 
                    viewBox="0 0 600 280" 
                    className="w-full max-w-2xl mx-auto relative z-10"
                  >
                    {/* SUV Gradients and Filters */}
                    <defs>
                      <linearGradient id="suvBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#1a1a1a" />
                        <stop offset="30%" stopColor="#2d2d2d" />
                        <stop offset="70%" stopColor="#1a1a1a" />
                        <stop offset="100%" stopColor="#0d0d0d" />
                      </linearGradient>
                      <linearGradient id="suvWindowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4a5568" />
                        <stop offset="50%" stopColor="#2d3748" />
                        <stop offset="100%" stopColor="#1a202c" />
                      </linearGradient>
                      <radialGradient id="suvWheelGradient" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#2d2d2d" />
                        <stop offset="70%" stopColor="#1a1a1a" />
                        <stop offset="100%" stopColor="#0d0d0d" />
                      </radialGradient>
                      <linearGradient id="suvTrimGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#FFD700" />
                        <stop offset="50%" stopColor="#FFA500" />
                        <stop offset="100%" stopColor="#FFD700" />
                      </linearGradient>
                      <filter id="suvShadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="4" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.4"/>
                      </filter>
                      <filter id="suvGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                        <feMerge> 
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    
                    {/* SUV Main Body */}
                    <path 
                      d="M 100 200 L 500 200 L 510 185 L 510 150 L 490 130 L 460 110 L 400 95 L 350 90 L 250 90 L 200 95 L 140 110 L 110 130 L 90 150 L 90 185 Z" 
                      fill="url(#suvBodyGradient)" 
                      stroke="#0d0d0d" 
                      strokeWidth="2"
                      filter="url(#suvShadow)"
                    />
                    
                    {/* SUV Hood */}
                    <path 
                      d="M 400 95 L 490 130 L 510 150 L 480 135 L 420 115 Z" 
                      fill="url(#suvBodyGradient)" 
                      stroke="#0d0d0d" 
                      strokeWidth="1"
                    />
                    
                    {/* SUV Roof */}
                    <path 
                      d="M 140 110 L 200 95 L 400 95 L 460 110 L 440 100 L 380 90 L 220 90 L 160 100 Z" 
                      fill="url(#suvBodyGradient)" 
                      stroke="#0d0d0d" 
                      strokeWidth="2"
                    />
                    
                    {/* Front Windshield */}
                    <path 
                      d="M 380 90 L 440 100 L 460 110 L 420 105 Z" 
                      fill="url(#suvWindowGradient)" 
                      stroke="#2d3748" 
                      strokeWidth="1"
                      opacity="0.9"
                    />
                    
                    {/* Rear Windshield */}
                    <path 
                      d="M 160 100 L 220 90 L 240 105 L 180 110 Z" 
                      fill="url(#suvWindowGradient)" 
                      stroke="#2d3748" 
                      strokeWidth="1"
                      opacity="0.9"
                    />
                    
                    {/* Side Windows */}
                    <rect x="240" y="105" width="140" height="35" fill="url(#suvWindowGradient)" stroke="#2d3748" strokeWidth="1" opacity="0.9" />
                    
                    {/* SUV Front Grille */}
                    <rect x="480" y="150" width="30" height="35" fill="#0d0d0d" stroke="#FFD700" strokeWidth="2" />
                    <rect x="485" y="157" width="20" height="4" fill="#FFD700" />
                    <rect x="485" y="164" width="20" height="4" fill="#FFD700" />
                    <rect x="485" y="171" width="20" height="4" fill="#FFD700" />
                    
                    {/* Premium Headlights */}
                    <ellipse cx="495" cy="167" rx="12" ry="8" fill="#ffffff" stroke="#FFD700" strokeWidth="2">
                      <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
                    </ellipse>
                    <circle cx="495" cy="167" r="4" fill="#FFD700" filter="url(#suvGlow)">
                      <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
                    </circle>
                    
                    {/* LED Taillights */}
                    <rect x="95" y="155" width="15" height="25" fill="#ff2d2d" stroke="#cc0000" strokeWidth="1" rx="3" />
                    <rect x="98" y="158" width="9" height="3" fill="#ff6666" />
                    <rect x="98" y="164" width="9" height="3" fill="#ff6666" />
                    <rect x="98" y="170" width="9" height="3" fill="#ff6666" />
                    
                    {/* SUV Door Handles */}
                    <rect x="180" y="160" width="10" height="5" fill="#FFD700" rx="2" />
                    <rect x="280" y="160" width="10" height="5" fill="#FFD700" rx="2" />
                    <rect x="380" y="160" width="10" height="5" fill="#FFD700" rx="2" />
                    
                    {/* Premium Trim Lines */}
                    <line x1="120" y1="175" x2="480" y2="175" stroke="url(#suvTrimGradient)" strokeWidth="2" opacity="0.8" />
                    <line x1="120" y1="180" x2="480" y2="180" stroke="url(#suvTrimGradient)" strokeWidth="1" opacity="0.6" />
                    
                    {/* Front Wheel */}
                    <g className="wheel-front">
                      <circle cx="400" cy="200" r="30" fill="url(#suvWheelGradient)" stroke="#0d0d0d" strokeWidth="3" />
                      <circle cx="400" cy="200" r="20" fill="#1a1a1a" stroke="#FFD700" strokeWidth="2" />
                      <g className="wheel-spokes animate-spin-wheel" style={{transformOrigin: '400px 200px'}}>
                        <line x1="380" y1="200" x2="420" y2="200" stroke="#FFD700" strokeWidth="3" />
                        <line x1="400" y1="180" x2="400" y2="220" stroke="#FFD700" strokeWidth="3" />
                        <line x1="385" y1="185" x2="415" y2="215" stroke="#FFD700" strokeWidth="2" />
                        <line x1="415" y1="185" x2="385" y2="215" stroke="#FFD700" strokeWidth="2" />
                      </g>
                      <circle cx="400" cy="200" r="8" fill="#FFD700" />
                    </g>
                    
                    {/* Rear Wheel */}
                    <g className="wheel-rear">
                      <circle cx="200" cy="200" r="30" fill="url(#suvWheelGradient)" stroke="#0d0d0d" strokeWidth="3" />
                      <circle cx="200" cy="200" r="20" fill="#1a1a1a" stroke="#FFD700" strokeWidth="2" />
                      <g className="wheel-spokes animate-spin-wheel" style={{transformOrigin: '200px 200px'}}>
                        <line x1="180" y1="200" x2="220" y2="200" stroke="#FFD700" strokeWidth="3" />
                        <line x1="200" y1="180" x2="200" y2="220" stroke="#FFD700" strokeWidth="3" />
                        <line x1="185" y1="185" x2="215" y2="215" stroke="#FFD700" strokeWidth="2" />
                        <line x1="215" y1="185" x2="185" y2="215" stroke="#FFD700" strokeWidth="2" />
                      </g>
                      <circle cx="200" cy="200" r="8" fill="#FFD700" />
                    </g>
                    
                    {/* SUV Side Mirror */}
                    <ellipse cx="460" cy="140" rx="6" ry="8" fill="#1a1a1a" stroke="#FFD700" strokeWidth="1" />
                    
                    {/* Roof Rails */}
                    <rect x="160" y="88" width="240" height="4" fill="#FFD700" rx="2" opacity="0.8" />
                    
                    {/* Running Boards */}
                    <rect x="140" y="185" width="320" height="8" fill="#1a1a1a" stroke="#FFD700" strokeWidth="1" rx="4" />
                  </svg>
                </div>
                
                {/* Enhanced Speed Lines */}
                <div className="speed-lines-container absolute top-1/2 left-0 transform -translate-y-1/2">
                  <div className="speed-line opacity-70 absolute w-24 h-1 bg-primary blur-sm animate-speed-line-1" style={{top: '-30px'}}></div>
                  <div className="speed-line opacity-60 absolute w-20 h-1 bg-primary blur-sm animate-speed-line-2" style={{top: '-10px'}}></div>
                  <div className="speed-line opacity-50 absolute w-16 h-1 bg-primary blur-sm animate-speed-line-3" style={{top: '10px'}}></div>
                  <div className="speed-line opacity-40 absolute w-12 h-1 bg-primary blur-sm animate-speed-line-1" style={{top: '30px'}}></div>
                </div>
                
                {/* Exhaust Smoke */}
                <div className="exhaust-smoke absolute bottom-8 left-8">
                  <div className="smoke-particle w-4 h-4 bg-gray-400 rounded-full opacity-40 animate-smoke-1"></div>
                  <div className="smoke-particle w-3 h-3 bg-gray-500 rounded-full opacity-30 animate-smoke-2" style={{marginTop: '-10px', marginLeft: '8px'}}></div>
                  <div className="smoke-particle w-2 h-2 bg-gray-600 rounded-full opacity-20 animate-smoke-3" style={{marginTop: '-8px', marginLeft: '6px'}}></div>
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
