
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

        {/* Right Content - Real Car Animation */}
        <div className="relative animate-slide-in-right">
          <div className="relative">
            {/* Real Car Animation Container */}
            <div className="car-container relative">
              {/* Main Car Image with Realistic Animations */}
              <div className="real-car-animation relative">
                {/* Car Shadow */}
                <div className="car-shadow absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-8 bg-black opacity-30 rounded-full blur-sm"></div>
                
                {/* Main Car Image */}
                <div className="car-body relative">
                  <img 
                    src="https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="Luxury Car"
                    className="w-full max-w-2xl mx-auto relative z-10 car-drive-in"
                  />
                  
                  {/* Front Headlight Glow */}
                  <div className="headlight-glow absolute top-1/2 right-8 w-12 h-6 bg-white opacity-60 rounded-full blur-md animate-pulse-slow"></div>
                  
                  {/* Animated Wheels */}
                  <div className="wheel wheel-front absolute bottom-6 right-20 w-12 h-12 border-4 border-carwala-dark-gray rounded-full bg-black animate-spin-wheel">
                    <div className="wheel-spokes absolute inset-2 border border-primary rounded-full"></div>
                  </div>
                  <div className="wheel wheel-rear absolute bottom-6 left-20 w-12 h-12 border-4 border-carwala-dark-gray rounded-full bg-black animate-spin-wheel">
                    <div className="wheel-spokes absolute inset-2 border border-primary rounded-full"></div>
                  </div>
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
