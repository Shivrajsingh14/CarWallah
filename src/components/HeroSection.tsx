
import { Button } from '@/components/ui/button';
import { Car, Clock, Phone } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen bg-gradient-to-br from-carwala-black via-carwala-dark-gray to-carwala-black flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-primary rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border-2 border-primary rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-primary rounded-full"></div>
      </div>

      {/* Animated Road Lines */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden opacity-20">
        <div className="road-lines"></div>
      </div>

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <div className="text-carwala-white space-y-8 animate-slide-in-left">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-primary">Premium Car Rentals in Udaipur</h2>
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              Rent a Car in 
              <span className="text-primary block">Udaipur</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-lg">
              Pay 50% Now, Rest Later. Premium luxury cars available for pickup from our Udaipur office.
            </p>
          </div>

          {/* Key Features */}
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center space-x-2">
              <Car className="w-5 h-5 text-primary" />
              <span>16 Premium Cars</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-primary" />
              <span>Flexible Timing</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-primary" />
              <span>Local Support</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-carwala-black font-bold text-lg px-8 py-4 hover-lift"
            >
              Book Now - Pay 50%
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-carwala-black text-lg px-8 py-4"
            >
              View Our Cars
            </Button>
          </div>

          {/* Owner Info with Image */}
          <div className="border-t border-carwala-dark-gray pt-6">
            <div className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/3190a23b-f24b-465b-a428-4bc1c14266c1.png" 
                alt="Yashpal Singh Jhala - Owner"
                className="w-16 h-16 rounded-full object-cover border-2 border-primary"
              />
              <div>
                <p className="text-gray-400 text-sm mb-1">Call us directly:</p>
                <p className="text-primary text-xl font-semibold">+91 9876543210</p>
                <p className="text-gray-400 text-sm">Yashpal Singh Jhala - Owner</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - Enhanced Car Animation */}
        <div className="relative animate-slide-in-right">
          <div className="relative">
            {/* Realistic Car Animation */}
            <div className="car-container relative">
              {/* Car SVG with enhanced details */}
              <div className="car-drive-animation">
                <svg 
                  viewBox="0 0 500 250" 
                  className="w-full max-w-lg mx-auto"
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Car Shadow */}
                  <ellipse cx="250" cy="220" rx="120" ry="15" fill="#000000" opacity="0.3"/>
                  
                  {/* Car Body - Main */}
                  <path 
                    d="M80 160 L120 120 L140 110 L360 110 L380 120 L420 160 L420 180 L400 180 L400 200 L360 200 L360 180 L140 180 L140 200 L100 200 L100 180 L80 180 Z" 
                    fill="#1a1a1a"
                    stroke="#333333"
                    strokeWidth="2"
                  />
                  
                  {/* Car Body - Top */}
                  <path 
                    d="M130 120 L150 105 L350 105 L370 120 L370 155 L130 155 Z" 
                    fill="#2a2a2a"
                    stroke="#444444"
                    strokeWidth="1"
                  />
                  
                  {/* Car Windows */}
                  <path 
                    d="M140 115 L160 108 L340 108 L360 115 L360 150 L140 150 Z" 
                    fill="#000000"
                    opacity="0.8"
                  />
                  
                  {/* Car Lights - Headlights */}
                  <circle cx="400" cy="140" r="8" fill="#FFD700" opacity="0.9"/>
                  <circle cx="400" cy="160" r="6" fill="#FFD700" opacity="0.7"/>
                  
                  {/* Car Lights - Taillights */}
                  <circle cx="100" cy="140" r="6" fill="#ff4444" opacity="0.8"/>
                  <circle cx="100" cy="160" r="4" fill="#ff4444" opacity="0.6"/>
                  
                  {/* Car Wheels */}
                  <circle cx="150" cy="190" r="25" fill="#000000"/>
                  <circle cx="150" cy="190" r="20" fill="#333333"/>
                  <circle cx="150" cy="190" r="15" fill="#FFD700"/>
                  <circle cx="150" cy="190" r="8" fill="#000000"/>
                  
                  <circle cx="350" cy="190" r="25" fill="#000000"/>
                  <circle cx="350" cy="190" r="20" fill="#333333"/>
                  <circle cx="350" cy="190" r="15" fill="#FFD700"/>
                  <circle cx="350" cy="190" r="8" fill="#000000"/>
                  
                  {/* Car Details - Door handles */}
                  <rect x="180" y="135" width="8" height="3" fill="#FFD700" rx="1"/>
                  <rect x="280" y="135" width="8" height="3" fill="#FFD700" rx="1"/>
                  
                  {/* Car Details - Front grille */}
                  <rect x="390" y="125" width="15" height="2" fill="#FFD700"/>
                  <rect x="390" y="130" width="15" height="2" fill="#FFD700"/>
                  <rect x="390" y="135" width="15" height="2" fill="#FFD700"/>
                  
                  {/* Speed lines */}
                  <g className="speed-lines" opacity="0.6">
                    <line x1="50" y1="130" x2="20" y2="130" stroke="#FFD700" strokeWidth="2"/>
                    <line x1="45" y1="145" x2="10" y2="145" stroke="#FFD700" strokeWidth="1.5"/>
                    <line x1="40" y1="160" x2="5" y2="160" stroke="#FFD700" strokeWidth="1"/>
                  </g>
                </svg>
              </div>

              {/* Wheel Rotation Animation */}
              <div className="absolute bottom-8 left-12 w-8 h-8 border-4 border-primary rounded-full animate-spin"></div>
              <div className="absolute bottom-8 right-16 w-8 h-8 border-4 border-primary rounded-full animate-spin"></div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-primary text-carwala-black p-3 rounded-full animate-bounce-slow">
              <Car className="w-6 h-6" />
            </div>
            
            {/* Stats Cards */}
            <div className="absolute -bottom-8 left-0 bg-carwala-white text-carwala-black p-4 rounded-lg shadow-xl hover-lift">
              <div className="text-2xl font-bold text-primary">16</div>
              <div className="text-sm">Premium Cars</div>
            </div>
            
            <div className="absolute -bottom-8 right-0 bg-carwala-white text-carwala-black p-4 rounded-lg shadow-xl hover-lift">
              <div className="text-2xl font-bold text-primary">100%</div>
              <div className="text-sm">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse-slow"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
