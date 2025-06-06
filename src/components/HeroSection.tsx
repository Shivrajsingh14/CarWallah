
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
            <h2 className="text-lg font-semibold text-primary animate-fade-in-up opacity-0 animation-delay-200">Premium Car Rentals in Udaipur</h2>
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              <span className="inline-block animate-fade-in-up opacity-0 animation-delay-400">Rent a Car in</span>
              <span className="text-primary block animate-fade-in-up opacity-0 animation-delay-600 animate-text-glow">Udaipur</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-lg animate-fade-in-up opacity-0 animation-delay-800">
              Pay 50% Now, Rest Later. Premium luxury cars available for pickup from our Udaipur office.
            </p>
          </div>

          {/* Key Features */}
          <div className="flex flex-wrap gap-6 animate-fade-in-up opacity-0 animation-delay-1000">
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
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up opacity-0 animation-delay-1200">
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
          <div className="border-t border-carwala-dark-gray pt-6 animate-fade-in-up opacity-0 animation-delay-1400">
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

        {/* Right Content - Enhanced Realistic Car Animation */}
        <div className="relative animate-slide-in-right">
          <div className="relative">
            {/* Realistic Car Animation */}
            <div className="car-container relative">
              {/* Enhanced Realistic Car SVG */}
              <div className="car-drive-animation">
                <svg 
                  viewBox="0 0 600 300" 
                  className="w-full max-w-2xl mx-auto"
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Car Shadow - Enhanced */}
                  <ellipse cx="300" cy="260" rx="140" ry="20" fill="#000000" opacity="0.4"/>
                  
                  {/* Car Body - Main Body (SUV Style) */}
                  <path 
                    d="M100 180 L140 140 L160 125 L440 125 L460 140 L500 180 L500 210 L480 210 L480 235 L430 235 L430 210 L170 210 L170 235 L120 235 L120 210 L100 210 Z" 
                    fill="#1a1a1a"
                    stroke="#333333"
                    strokeWidth="3"
                  />
                  
                  {/* Car Body - Upper Section (Cabin) */}
                  <path 
                    d="M150 140 L175 120 L425 120 L450 140 L450 175 L150 175 Z" 
                    fill="#2a2a2a"
                    stroke="#444444"
                    strokeWidth="2"
                  />
                  
                  {/* Car Windows - Windshield and Side Windows */}
                  <path 
                    d="M160 135 L185 125 L415 125 L440 135 L440 165 L160 165 Z" 
                    fill="#1a1a2e"
                    opacity="0.9"
                    stroke="#333"
                    strokeWidth="1"
                  />
                  
                  {/* Window Dividers */}
                  <line x1="240" y1="125" x2="240" y2="165" stroke="#333" strokeWidth="2"/>
                  <line x1="300" y1="125" x2="300" y2="165" stroke="#333" strokeWidth="2"/>
                  <line x1="360" y1="125" x2="360" y2="165" stroke="#333" strokeWidth="2"/>
                  
                  {/* Car Hood Details */}
                  <rect x="450" y="140" width="35" height="8" fill="#2a2a2a" rx="2"/>
                  <rect x="450" y="155" width="35" height="8" fill="#2a2a2a" rx="2"/>
                  <rect x="450" y="170" width="35" height="8" fill="#2a2a2a" rx="2"/>
                  
                  {/* Car Lights - LED Headlights */}
                  <circle cx="480" cy="150" r="12" fill="#ffffff" opacity="0.9"/>
                  <circle cx="480" cy="150" r="8" fill="#e6f3ff" opacity="0.8"/>
                  <circle cx="480" cy="175" r="10" fill="#ffffff" opacity="0.7"/>
                  <circle cx="480" cy="175" r="6" fill="#e6f3ff" opacity="0.6"/>
                  
                  {/* Car Lights - LED Taillights */}
                  <rect x="110" y="145" width="15" height="8" fill="#ff4444" opacity="0.9" rx="2"/>
                  <rect x="110" y="160" width="15" height="8" fill="#ff6666" opacity="0.7" rx="2"/>
                  
                  {/* Front Bumper */}
                  <rect x="485" y="185" width="20" height="15" fill="#333333" rx="3"/>
                  
                  {/* Rear Bumper */}
                  <rect x="95" y="185" width="20" height="15" fill="#333333" rx="3"/>
                  
                  {/* Car Wheels - Enhanced with Rims */}
                  <g className="animate-spin" style={{transformOrigin: '180px 225px'}}>
                    <circle cx="180" cy="225" r="30" fill="#000000"/>
                    <circle cx="180" cy="225" r="25" fill="#2a2a2a"/>
                    <circle cx="180" cy="225" r="20" fill="#FFD700"/>
                    <circle cx="180" cy="225" r="15" fill="#333333"/>
                    <circle cx="180" cy="225" r="8" fill="#000000"/>
                    {/* Rim Spokes */}
                    <g stroke="#FFD700" strokeWidth="2">
                      <line x1="165" y1="225" x2="195" y2="225"/>
                      <line x1="180" y1="210" x2="180" y2="240"/>
                      <line x1="169" y1="214" x2="191" y2="236"/>
                      <line x1="191" y1="214" x2="169" y2="236"/>
                    </g>
                  </g>
                  
                  <g className="animate-spin" style={{transformOrigin: '420px 225px'}}>
                    <circle cx="420" cy="225" r="30" fill="#000000"/>
                    <circle cx="420" cy="225" r="25" fill="#2a2a2a"/>
                    <circle cx="420" cy="225" r="20" fill="#FFD700"/>
                    <circle cx="420" cy="225" r="15" fill="#333333"/>
                    <circle cx="420" cy="225" r="8" fill="#000000"/>
                    {/* Rim Spokes */}
                    <g stroke="#FFD700" strokeWidth="2">
                      <line x1="405" y1="225" x2="435" y2="225"/>
                      <line x1="420" y1="210" x2="420" y2="240"/>
                      <line x1="409" y1="214" x2="431" y2="236"/>
                      <line x1="431" y1="214" x2="409" y2="236"/>
                    </g>
                  </g>
                  
                  {/* Car Details - Door Handles */}
                  <rect x="200" y="155" width="12" height="4" fill="#FFD700" rx="2"/>
                  <rect x="280" y="155" width="12" height="4" fill="#FFD700" rx="2"/>
                  <rect x="360" y="155" width="12" height="4" fill="#FFD700" rx="2"/>
                  
                  {/* Car Details - Front Grille */}
                  <rect x="470" y="140" width="20" height="3" fill="#FFD700" opacity="0.8"/>
                  <rect x="470" y="146" width="20" height="3" fill="#FFD700" opacity="0.8"/>
                  <rect x="470" y="152" width="20" height="3" fill="#FFD700" opacity="0.8"/>
                  <rect x="470" y="158" width="20" height="3" fill="#FFD700" opacity="0.8"/>
                  
                  {/* License Plate */}
                  <rect x="440" y="190" width="25" height="12" fill="#ffffff" stroke="#333" strokeWidth="1"/>
                  <text x="452" y="199" fontSize="6" fill="#333" fontFamily="Arial, sans-serif">RJ</text>
                  
                  {/* Side Mirror */}
                  <ellipse cx="145" cy="145" rx="8" ry="5" fill="#2a2a2a" stroke="#FFD700" strokeWidth="1"/>
                  <ellipse cx="455" cy="145" rx="8" ry="5" fill="#2a2a2a" stroke="#FFD700" strokeWidth="1"/>
                  
                  {/* Enhanced Speed Lines */}
                  <g className="speed-lines" opacity="0.7">
                    <line x1="70" y1="140" x2="30" y2="140" stroke="#FFD700" strokeWidth="3" strokeLinecap="round"/>
                    <line x1="65" y1="160" x2="20" y2="160" stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round"/>
                    <line x1="60" y1="180" x2="10" y2="180" stroke="#FFD700" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="55" y1="200" x2="5" y2="200" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round"/>
                  </g>
                  
                  {/* Exhaust Smoke */}
                  <g className="opacity-40">
                    <circle cx="90" cy="205" r="3" fill="#666666"/>
                    <circle cx="85" cy="200" r="2" fill="#888888"/>
                    <circle cx="80" cy="195" r="1.5" fill="#aaaaaa"/>
                  </g>
                </svg>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-primary text-carwala-black p-3 rounded-full animate-bounce-slow hover:animate-spin transition-all duration-300">
              <Car className="w-6 h-6" />
            </div>
            
            {/* Stats Cards */}
            <div className="absolute -bottom-8 left-0 bg-carwala-white text-carwala-black p-4 rounded-lg shadow-xl hover-lift animate-slide-up opacity-0 animation-delay-1600">
              <div className="text-2xl font-bold text-primary animate-count-up">16</div>
              <div className="text-sm">Premium Cars</div>
            </div>
            
            <div className="absolute -bottom-8 right-0 bg-carwala-white text-carwala-black p-4 rounded-lg shadow-xl hover-lift animate-slide-up opacity-0 animation-delay-1800">
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
