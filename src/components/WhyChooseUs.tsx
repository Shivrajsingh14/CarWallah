
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Car, Phone, Map } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: Car,
      title: "16 Premium Cars",
      description: "Luxury sedans and SUVs, all black and well-maintained",
      color: "text-blue-500"
    },
    {
      icon: Map,
      title: "Local Udaipur Service",
      description: "Based in Udaipur, we know the city and serve locals",
      color: "text-green-500"
    },
    {
      icon: Clock,
      title: "Flexible Timing",
      description: "Choose from 4 time slots or full day rental options",
      color: "text-purple-500"
    },
    {
      icon: Phone,
      title: "Personal Support",
      description: "Direct contact with owner Yashpal Singh Jhala",
      color: "text-orange-500"
    }
  ];

  return (
    <section className="py-20 bg-carwala-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl font-bold text-carwala-black mb-4">
            Why Choose <span className="text-primary">Carwala</span>?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Experience the difference with Udaipur's most trusted local car rental service.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="text-center hover-lift border-0 shadow-lg"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className={`${feature.color} bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                
                <h3 className="text-xl font-bold text-carwala-black mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-gradient-to-r from-carwala-black to-carwala-dark-gray rounded-2xl p-8">
          <div className="grid md:grid-cols-4 gap-8 text-center text-carwala-white">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">16</div>
              <div className="text-gray-300">Premium Cars</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-gray-300">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">3</div>
              <div className="text-gray-300">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-gray-300">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
