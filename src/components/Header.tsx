
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, LogIn, UserPlus, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    
    // If we're not on the homepage, navigate there first and then scroll
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#0a1a35] shadow-lg py-2' 
        : 'bg-gradient-to-b from-[#0a1a35] to-transparent py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300">
            <div className={`bg-amber-400 text-[#0a1a35] px-3 py-2 rounded-lg font-bold text-xl ${scrolled ? '' : 'animate-pulse-glow'}`}>
              C
            </div>
            <h1 className="text-2xl font-bold text-white">
              Car<span className="text-amber-400">wallah</span>
            </h1>
          </Link>          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-white">
            <button 
              onClick={() => scrollToSection('home')}
              className={`hover:text-amber-400 transition-colors ${location.pathname === '/' && !location.hash ? 'text-amber-400 font-medium' : ''}`}
            >
              Home
            </button>
            <Link 
              to="/cars" 
              className={`hover:text-amber-400 transition-colors ${location.pathname === '/cars' ? 'text-amber-400 font-medium' : ''}`}
            >
              Our Cars
            </Link>
            <button 
              onClick={() => scrollToSection('booking')}
              className={`hover:text-amber-400 transition-colors ${location.hash === '#booking' ? 'text-amber-400 font-medium' : ''}`}
            >
              Book Now
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className={`hover:text-amber-400 transition-colors ${location.hash === '#about' ? 'text-amber-400 font-medium' : ''}`}
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className={`hover:text-amber-400 transition-colors ${location.hash === '#contact' ? 'text-amber-400 font-medium' : ''}`}
            >
              Contact
            </button>
          </nav>          {/* Contact & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-white">
              <Phone className="w-4 h-4 text-amber-400" />
              <span>+91 6376390767</span>
            </div>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <div className="text-white mr-2">
                  <span className="text-sm text-gray-400 mr-1">Hello,</span>
                  <span className="font-medium">{user?.name.split(' ')[0]}</span>
                </div>
                <Button 
                  variant="outline" 
                  className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-[#0a1a35]"
                  onClick={logout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-[#0a1a35]">
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-amber-400 hover:bg-amber-500 text-[#0a1a35] font-semibold px-6">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#0a1a35]/95 backdrop-blur-sm border-t border-white/10 rounded-b-xl shadow-xl mt-2 animate-fade-in-up">
            <nav className="flex flex-col space-y-4 py-6 px-4 text-white">
              <button 
                onClick={() => scrollToSection('home')}
                className={`hover:text-amber-400 transition-colors text-left px-2 py-2 rounded-lg ${location.pathname === '/' && !location.hash ? 'bg-white/10 text-amber-400 font-medium' : ''}`}
              >
                Home
              </button>
              <Link 
                to="/cars" 
                className={`hover:text-amber-400 transition-colors px-2 py-2 rounded-lg ${location.pathname === '/cars' ? 'bg-white/10 text-amber-400 font-medium' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Our Cars
              </Link>
              <button 
                onClick={() => scrollToSection('booking')}
                className={`hover:text-amber-400 transition-colors text-left px-2 py-2 rounded-lg ${location.hash === '#booking' ? 'bg-white/10 text-amber-400 font-medium' : ''}`}
              >
                Book Now
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className={`hover:text-amber-400 transition-colors text-left px-2 py-2 rounded-lg ${location.hash === '#about' ? 'bg-white/10 text-amber-400 font-medium' : ''}`}
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className={`hover:text-amber-400 transition-colors text-left px-2 py-2 rounded-lg ${location.hash === '#contact' ? 'bg-white/10 text-amber-400 font-medium' : ''}`}
              >
                Contact
              </button>              <div className="flex items-center space-x-2 text-sm pt-2 px-2 py-2">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>+91 6376390767</span>
              </div>
              
              <div className="flex flex-col space-y-3 pt-2">
                {isAuthenticated ? (
                  <>
                    <div className="text-white mb-1 px-2">
                      <span className="text-sm text-gray-400 mr-1">Hello,</span>
                      <span className="font-medium">{user?.name.split(' ')[0]}</span>
                    </div>
                    <Button 
                      variant="outline" 
                      className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-[#0a1a35] w-full"
                      onClick={() => {
                        setIsMenuOpen(false);
                        logout();
                      }}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsMenuOpen(false)} className="w-full">
                      <Button variant="outline" className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-[#0a1a35] w-full">
                        <LogIn className="w-4 h-4 mr-2" />
                        Login
                      </Button>
                    </Link>
                    <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="w-full">
                      <Button className="bg-amber-400 hover:bg-amber-500 text-[#0a1a35] font-semibold w-full">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
