
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Menu, X, LogIn, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-carwala-black text-carwala-white fixed w-full top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300">
            <div className="bg-primary text-carwala-black px-3 py-2 rounded-lg font-bold text-xl animate-pulse-glow">
              C
            </div>
            <h1 className="text-2xl font-bold">
              Car<span className="text-primary">wala</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="hover:text-primary transition-colors">Home</a>
            <Link to="/cars" className="hover:text-primary transition-colors">Our Cars</Link>
            <a href="#booking" className="hover:text-primary transition-colors">Book Now</a>
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </nav>

          {/* Contact & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <Phone className="w-4 h-4 text-primary" />
              <span>+91 6376390767</span>
            </div>
            <Link to="/login">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-carwala-black">
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-primary hover:bg-primary/90 text-carwala-black font-semibold px-6">
                <UserPlus className="w-4 h-4 mr-2" />
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-carwala-black border-t border-carwala-dark-gray">
            <nav className="flex flex-col space-y-4 py-4">
              <a href="#home" className="hover:text-primary transition-colors">Home</a>
              <Link to="/cars" className="hover:text-primary transition-colors">Our Cars</Link>
              <a href="#booking" className="hover:text-primary transition-colors">Book Now</a>
              <a href="#about" className="hover:text-primary transition-colors">About</a>
              <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
              <div className="flex items-center space-x-2 text-sm pt-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>+91 6376390767</span>
              </div>
              <div className="flex flex-col space-y-2">
                <Link to="/login">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-carwala-black w-full">
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-primary hover:bg-primary/90 text-carwala-black font-semibold w-full">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Sign Up
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
