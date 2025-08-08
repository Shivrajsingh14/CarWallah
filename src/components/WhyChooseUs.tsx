
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Car, Phone, Map, Award, Shield, TrendingUp, Zap } from 'lucide-react';

const WhyChooseUs = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const section = document.getElementById('about');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);
  const features = [
    {
      icon: Car,
      title: "Premium Fleet",
      description: "16 luxury cars, all well-maintained with professional drivers available",
      color: "text-amber-400",
      bgColor: "bg-amber-400/10"
    },
    {
      icon: Map,
      title: "Local Expertise",
      description: "Udaipur-based service with extensive local knowledge and personalized routes",
      color: "text-amber-400",
      bgColor: "bg-amber-400/10"
    },
    {
      icon: Clock,
      title: "Flexible Timing",
      description: "Choose from 4 time slots or full day rental options with easy extensions",
      color: "text-amber-400",
      bgColor: "bg-amber-400/10"
    },
    {
      icon: Phone,
      title: "24/7 Support",
      description: "Direct contact with owner Yashpal Singh Jhala anytime you need assistance",
      color: "text-amber-400",
      bgColor: "bg-amber-400/10"
    }
  ];

  const additionalFeatures = [
    {
      icon: Shield,
      title: "Fully Insured",
      description: "All vehicles come with comprehensive insurance coverage for your peace of mind"
    },
    {
      icon: Award,
      title: "Top Rated",
      description: "Highly rated service with excellent customer reviews and satisfaction"
    },
    {
      icon: TrendingUp,
      title: "Transparent Pricing",
      description: "No hidden charges, all taxes and fees clearly mentioned upfront"
    },
    {
      icon: Zap,
      title: "Instant Confirmation",
      description: "Get your booking confirmed instantly with online payment options"
    }
  ];
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-[#152a4a] via-[#1e3a63] to-[#152a4a] relative overflow-hidden">
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
      
      <div className="container mx-auto px-4 relative z-10">        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block bg-amber-400/20 px-4 py-2 rounded-full mb-4">
            <span className="text-sm uppercase font-bold tracking-wider text-amber-400">Why Choose Us</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Experience the <span className="text-amber-400">Carwala</span> Difference
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Udaipur's most trusted local car rental service with a commitment to quality and customer satisfaction.
          </p>
        </div>        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className={`text-center hover-lift bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className={`${feature.color} ${feature.bgColor} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 transition-transform duration-500 hover:scale-110`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-gray-300">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>        {/* Animated Divider */}
        <div className="relative h-0.5 bg-white/20 my-16 overflow-hidden">
          <div className={`absolute h-full w-1/3 bg-amber-400 shimmer-effect ${isVisible ? 'opacity-100' : 'opacity-0'}`}></div>
        </div>

        {/* Additional Features Grid */}
        <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ transitionDelay: '400ms' }}>
          {additionalFeatures.map((feature, index) => (
            <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-amber-400/30 transition-all duration-300">
              <div className="p-3 rounded-full bg-amber-400/20 text-amber-400">
                <feature.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">{feature.title}</h3>
                <p className="text-gray-300 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>        {/* Stats Section */}
        <div className={`mt-16 bg-gradient-to-r from-[#0a1a35] to-[#152a4a] rounded-2xl p-8 shadow-xl border border-white/10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ transitionDelay: '600ms' }}>
          <div className="grid md:grid-cols-4 gap-8 text-center text-carwala-white">
            <div className="group">
              <div className="text-4xl font-bold text-amber-400 mb-2 group-hover:scale-110 transition-transform duration-300">16+</div>
              <div className="text-gray-300">Premium Cars</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-amber-400 mb-2 group-hover:scale-110 transition-transform duration-300">500+</div>
              <div className="text-gray-300">Happy Customers</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-amber-400 mb-2 group-hover:scale-110 transition-transform duration-300">3+</div>
              <div className="text-gray-300">Years Experience</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-amber-400 mb-2 group-hover:scale-110 transition-transform duration-300">24/7</div>
              <div className="text-gray-300">Support Available</div>
            </div>
          </div>
        </div>

        {/* Testimonial Preview */}
        <div className={`mt-16 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ transitionDelay: '800ms' }}>
          <div className="inline-block bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-amber-400/30 transition-all duration-300">
            <div className="flex gap-1 text-amber-400 mb-3 justify-center">
              {[...Array(5)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
              ))}
            </div>
            <p className="text-lg italic text-white max-w-3xl mx-auto">
              "The service was excellent! The car was clean, well-maintained, and the driver was very professional.
              I would highly recommend Carwala to anyone visiting Udaipur."
            </p>
            <div className="mt-4">
              <h4 className="font-semibold text-amber-400">Rahul Sharma</h4>
              <p className="text-sm text-gray-300">Delhi Tourist</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
