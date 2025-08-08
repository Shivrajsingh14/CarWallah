
import { Car, Phone, Map, Mail, Facebook, Instagram, Twitter, Youtube, Calendar, Shield, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If we're not on the homepage, navigate there first
      window.location.href = `/#${sectionId}`;
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-carwala-black text-carwala-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-8 mb-12 shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Get the Latest <span className="text-primary">Offers</span></h3>
              <p className="text-gray-400">Subscribe to our newsletter for exclusive deals and updates.</p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-primary transition-colors w-full md:w-64"
              />
              <Button className="bg-primary hover:bg-primary/90 text-carwala-black font-semibold whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-primary text-carwala-black px-3 py-2 rounded-lg font-bold text-xl">
                C
              </div>
              <h3 className="text-3xl font-bold">
                Car<span className="text-primary">wallah</span>
              </h3>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Premium car rental service in Udaipur, Rajasthan. Experience luxury with our fleet of 16 premium vehicles, all available for pickup from our office.
            </p>
            <div className="space-y-2">
              <p className="text-primary font-semibold">Yashpal Singh Jhala</p>
              <p className="text-gray-400">Owner & Founder</p>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4 mt-6">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary/20 transition-colors">
                <Facebook className="w-5 h-5 text-primary" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary/20 transition-colors">
                <Instagram className="w-5 h-5 text-primary" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary/20 transition-colors">
                <Twitter className="w-5 h-5 text-primary" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary/20 transition-colors">
                <Youtube className="w-5 h-5 text-primary" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-primary mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => scrollToSection('home')} 
                  className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  Home
                </button>
              </li>
              <li>
                <Link to="/cars" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  Our Cars
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('booking')} 
                  className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  Book Now
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')} 
                  className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  Contact
                </button>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-primary mb-4">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Call Us</p>
                  <p className="text-white hover:text-primary transition-colors">+91 6376390767</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mt-1">
                  <Map className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Our Location</p>
                  <div className="text-white hover:text-primary transition-colors">
                    <p>Carwallah Office</p>
                    <p>Udaipur, Rajasthan</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email Us</p>
                  <p className="text-white hover:text-primary transition-colors">info@carwallah.in</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="border-t border-carwala-dark-gray mt-12 pt-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h5 className="font-semibold text-primary mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Rental Options
              </h5>
              <ul className="text-gray-400 text-sm space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full"></span>
                  9 AM - 12 PM
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full"></span>
                  12 PM - 3 PM
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full"></span>
                  3 PM - 6 PM
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full"></span>
                  6 PM - 9 PM
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full"></span>
                  Full Day Rental
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-primary mb-3 flex items-center gap-2">
                <Car className="w-4 h-4" />
                Car Types
              </h5>
              <ul className="text-gray-400 text-sm space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full"></span>
                  Luxury Sedans
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full"></span>
                  Premium SUVs
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full"></span>
                  Compact Cars
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full"></span>
                  5-7 Seater Options
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full"></span>
                  All Black Fleet
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-primary mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Payment
              </h5>
              <ul className="text-gray-400 text-sm space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full"></span>
                  Pay 50% Now
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full"></span>
                  Rest on Pickup
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full"></span>
                  Secure Payment
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full"></span>
                  Multiple Options
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full"></span>
                  Instant Confirmation
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-primary mb-3 flex items-center gap-2">
                <Star className="w-4 h-4" />
                Support
              </h5>
              <ul className="text-gray-400 text-sm space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full"></span>
                  24/7 Phone Support
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full"></span>
                  WhatsApp Chat
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full"></span>
                  Local Assistance
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full"></span>
                  Roadside Help
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full"></span>
                  Customer First
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-carwala-dark-gray mt-8 pt-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
            <div>
              © {currentYear} Carwallah. All rights reserved.
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
