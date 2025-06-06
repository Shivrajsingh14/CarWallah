
import { Car, Phone, Map } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-carwala-black text-carwala-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-primary text-carwala-black px-3 py-2 rounded-lg font-bold text-xl">
                C
              </div>
              <h3 className="text-3xl font-bold">
                Car<span className="text-primary">wala</span>
              </h3>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Premium car rental service in Udaipur, Rajasthan. Experience luxury with our fleet of 16 premium vehicles, all available for pickup from our office.
            </p>
            <div className="space-y-2">
              <p className="text-primary font-semibold">Yashpal Singh Jhala</p>
              <p className="text-gray-400">Owner & Founder</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-primary mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-primary transition-colors">Home</a></li>
              <li><a href="#cars" className="text-gray-400 hover:text-primary transition-colors">Our Cars</a></li>
              <li><a href="#booking" className="text-gray-400 hover:text-primary transition-colors">Book Now</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-primary mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary" />
                <span className="text-gray-400">+91 9876543210</span>
              </div>
              <div className="flex items-start space-x-3">
                <Map className="w-5 h-5 text-primary mt-1" />
                <div className="text-gray-400">
                  <p>Carwala Office</p>
                  <p>Udaipur, Rajasthan</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Car className="w-5 h-5 text-primary" />
                <span className="text-gray-400">16 Premium Cars</span>
              </div>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="border-t border-carwala-dark-gray mt-12 pt-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h5 className="font-semibold text-primary mb-2">Rental Options</h5>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• 9 AM - 12 PM</li>
                <li>• 12 PM - 3 PM</li>
                <li>• 3 PM - 6 PM</li>
                <li>• 6 PM - 9 PM</li>
                <li>• Full Day Rental</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-primary mb-2">Car Types</h5>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• Luxury Sedans</li>
                <li>• Premium SUVs</li>
                <li>• Compact Cars</li>
                <li>• 5-7 Seater Options</li>
                <li>• All Black Fleet</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-primary mb-2">Payment</h5>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• Pay 50% Now</li>
                <li>• Rest on Pickup</li>
                <li>• Secure Payment</li>
                <li>• Multiple Options</li>
                <li>• Instant Confirmation</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-primary mb-2">Support</h5>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• 24/7 Phone Support</li>
                <li>• WhatsApp Chat</li>
                <li>• Local Assistance</li>
                <li>• Owner Contact</li>
                <li>• Instant Response</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-carwala-dark-gray mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Carwala. All rights reserved. Udaipur's Premium Car Rental Service.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">Cancellation Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
