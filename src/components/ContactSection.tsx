
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Map, Clock, Car } from 'lucide-react';

const ContactSection = () => {  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-[#152a4a] via-[#1e3a63] to-[#152a4a] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Particles */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-amber-400 rounded-full animate-float-1"></div>
        <div className="absolute top-20 right-20 w-3 h-3 bg-amber-400 rounded-full animate-float-2"></div>
        <div className="absolute bottom-20 left-20 w-2 h-2 bg-amber-400 rounded-full animate-float-3"></div>
        <div className="absolute bottom-10 right-10 w-1 h-1 bg-amber-400 rounded-full animate-float-1"></div>

        {/* Geometric Shapes */}
        <div className="absolute top-20 left-1/4 w-32 h-32 border border-amber-400 rounded-full opacity-20 animate-spin-slow"></div>
        <div className="absolute bottom-20 right-1/4 w-24 h-24 border border-amber-400 opacity-30 animate-pulse-slow"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Contact <span className="text-amber-400">Carwala</span>
          </h2>
          <p className="text-gray-300 text-lg">
            Get in touch with us for bookings, queries, or support
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contact Info */}
          <div className="space-y-6">            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:border-amber-400/30 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-amber-400 rounded-lg p-3">
                    <Phone className="w-6 h-6 text-[#0a1a35]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Call Us</h3>
                    <p className="text-amber-400 text-xl font-bold">+91 6376390767</p>
                    <p className="text-gray-300 text-sm">Yashpal Singh Jhala - Owner</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:border-amber-400/30 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-amber-400 rounded-lg p-3">
                    <Map className="w-6 h-6 text-[#0a1a35]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Pickup Location</h3>
                    <p className="text-gray-300">
                      Carwala Office<br />
                      Udaipur, Rajasthan<br />
                      (Exact address shared on booking)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-carwala-white/10 backdrop-blur-sm border-carwala-white/20">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary rounded-lg p-3">
                    <Clock className="w-6 h-6 text-carwala-black" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-carwala-white mb-2">Operating Hours</h3>
                    <div className="text-gray-300 space-y-1">
                      <p>9:00 AM - 12:00 PM</p>
                      <p>12:00 PM - 3:00 PM</p>
                      <p>3:00 PM - 6:00 PM</p>
                      <p>6:00 PM - 9:00 PM</p>
                      <p className="text-primary">Full Day Available</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card className="bg-primary/10 backdrop-blur-sm border-primary/20">
              <CardContent className="p-8 text-center">
                <Car className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-carwala-white mb-4">
                  Ready to Book?
                </h3>
                <p className="text-gray-300 mb-6">
                  Choose your car, select timing, and pay 50% now. Simple and secure booking process.
                </p>
                <div className="space-y-4">
                  <Button 
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-carwala-black font-bold text-lg py-4"
                  >
                    Book Your Car Now
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-carwala-black text-lg py-4"
                  >
                    WhatsApp Chat
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card className="bg-carwala-white/10 backdrop-blur-sm border-carwala-white/20">
              <CardContent className="p-0">
                <div className="h-64 bg-carwala-dark-gray rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <Map className="w-12 h-12 mx-auto mb-2" />
                    <p>Interactive Map</p>
                    <p className="text-sm">Carwala Office Location</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 pt-8 border-t border-carwala-white/20">
          <p className="text-gray-300 mb-4">
            Have questions? Call us directly for instant support
          </p>
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary/90 text-carwala-black font-bold px-8 py-3"
          >
            Call +91 6376390767
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
