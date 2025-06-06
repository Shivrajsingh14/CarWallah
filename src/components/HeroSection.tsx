
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

          {/* Contact Info */}
          <div className="border-t border-carwala-dark-gray pt-6">
            <p className="text-gray-400 text-sm mb-2">Call us directly:</p>
            <p className="text-primary text-xl font-semibold">+91 9876543210</p>
            <p className="text-gray-400 text-sm">Yashpal Singh Jhala - Owner</p>
          </div>
        </div>

        {/* Right Content - Car Animation */}
        <div className="relative animate-slide-in-right">
          <div className="relative">
            {/* Car SVG Animation */}
            <div className="car-drive-in">
              <svg 
                viewBox="0 0 400 200" 
                className="w-full max-w-md mx-auto"
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Car Body */}
                <path 
                  d="M50 120 L80 80 L120 70 L280 70 L320 80 L350 120 L350 140 L320 140 L320 160 L280 160 L280 140 L120 140 L120 160 L80 160 L80 140 L50 140 Z" 
                  fill="#FFD700"
                />
                {/* Car Windows */}
                <path 
                  d="M90 80 L110 75 L270 75 L310 80 L310 115 L90 115 Z" 
                  fill="#000000"
                />
                {/* Car Wheels */}
                <circle cx="100" cy="150" r="20" fill="#000000"/>
                <circle cx="100" cy="150" r="12" fill="#FFD700"/>
                <circle cx="300" cy="150" r="20" fill="#000000"/>
                <circle cx="300" cy="150" r="12" fill="#FFD700"/>
                {/* Car Details */}
                <rect x="130" y="90" width="60" height="3" fill="#FFD700"/>
                <rect x="210" y="90" width="60" height="3" fill="#FFD700"/>
              </svg>
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
