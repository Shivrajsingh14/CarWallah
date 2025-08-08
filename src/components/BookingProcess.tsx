
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Car, Phone } from 'lucide-react';

const BookingProcess = () => {
  const steps = [
    {
      icon: Car,
      title: "Choose Your Car",
      description: "Select from our premium fleet of 16 luxury vehicles",
      step: "01"
    },
    {
      icon: Calendar,
      title: "Select Time & Pay",
      description: "Pick your time slot and pay 50% now, rest on pickup",
      step: "02"
    },
    {
      icon: Phone,
      title: "Pickup from Office",
      description: "Collect your car from our Udaipur office location",
      step: "03"
    }
  ];
  return (
    <section className="py-20 bg-gradient-to-br from-[#0a1a35] via-[#152a4a] to-[#0a1a35] relative overflow-hidden">
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
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl font-bold text-white mb-4">
            Simple <span className="text-amber-400">Booking Process</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Get your premium car in just 3 easy steps. Fast, secure, and hassle-free booking experience.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card 
              key={index}
              className="bg-carwala-white/10 backdrop-blur-sm border-carwala-white/20 hover-lift"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-8 text-center">                <div className="relative mb-6">
                  <div className="bg-amber-400 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-10 h-10 text-[#0a1a35]" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-[#0a1a35] text-amber-400 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-carwala-white mb-3">
                  {step.title}
                </h3>
                
                <p className="text-gray-300">
                  {step.description}
                </p>                {/* Connector Line (except last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-amber-400 transform -translate-y-1/2">
                    <div className="absolute right-0 top-1/2 w-2 h-2 bg-amber-400 rounded-full transform translate-x-1 -translate-y-1/2"></div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-amber-400/30 transition-all duration-300">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Book Your Premium Car?
            </h3>
            <p className="text-gray-300 mb-6">
              Pay only 50% now, rest on pickup. Flexible timing options available.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-amber-400 hover:bg-amber-500 text-[#0a1a35] font-bold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
                Start Booking Now
              </button>
              <button className="border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-[#0a1a35] px-8 py-3 rounded-lg transition-all duration-300">
                Call +91 9876543210
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingProcess;
