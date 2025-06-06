
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
    <section className="py-20 bg-gradient-to-br from-carwala-black to-carwala-dark-gray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl font-bold text-carwala-white mb-4">
            Simple <span className="text-primary">Booking Process</span>
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
              <CardContent className="p-8 text-center">
                <div className="relative mb-6">
                  <div className="bg-primary rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-10 h-10 text-carwala-black" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-carwala-black text-primary rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-carwala-white mb-3">
                  {step.title}
                </h3>
                
                <p className="text-gray-300">
                  {step.description}
                </p>

                {/* Connector Line (except last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary transform -translate-y-1/2">
                    <div className="absolute right-0 top-1/2 w-2 h-2 bg-primary rounded-full transform translate-x-1 -translate-y-1/2"></div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-primary/10 backdrop-blur-sm rounded-2xl p-8 border border-primary/20">
            <h3 className="text-2xl font-bold text-carwala-white mb-4">
              Ready to Book Your Premium Car?
            </h3>
            <p className="text-gray-300 mb-6">
              Pay only 50% now, rest on pickup. Flexible timing options available.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary hover:bg-primary/90 text-carwala-black font-bold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
                Start Booking Now
              </button>
              <button className="border-2 border-primary text-primary hover:bg-primary hover:text-carwala-black px-8 py-3 rounded-lg transition-all duration-300">
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
