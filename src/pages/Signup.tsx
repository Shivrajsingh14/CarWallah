
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Car, ArrowRight, User, Mail, Phone, CheckCircle } from 'lucide-react';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-carwala-black via-carwala-dark-gray to-carwala-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Particles */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-primary rounded-full animate-float-1"></div>
        <div className="absolute top-20 right-20 w-3 h-3 bg-primary rounded-full animate-float-2"></div>
        <div className="absolute bottom-20 left-20 w-2 h-2 bg-primary rounded-full animate-float-3"></div>
        <div className="absolute bottom-10 right-10 w-1 h-1 bg-primary rounded-full animate-float-1"></div>
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-primary rounded-full animate-float-2"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-primary rounded-full animate-float-3"></div>

        {/* Geometric Shapes */}
        <div className="absolute top-20 left-1/4 w-32 h-32 border border-primary rounded-full opacity-20 animate-spin-slow"></div>
        <div className="absolute bottom-20 right-1/4 w-24 h-24 border border-primary opacity-30 animate-pulse-slow"></div>
        <div className="absolute top-1/2 right-10 w-16 h-16 border-2 border-primary transform rotate-45 animate-bounce-slow"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo Section */}
          <div className="text-center mb-8 animate-fade-in-up">
            <Link to="/" className="inline-flex items-center space-x-3 mb-6 hover:scale-105 transition-transform duration-300">
              <div className="bg-primary text-carwala-black p-3 rounded-xl font-bold text-xl animate-pulse-glow">
                <Car className="w-8 h-8" />
              </div>
              <h1 className="text-3xl font-bold text-carwala-white">
                Car<span className="text-primary">wala</span>
              </h1>
            </Link>
            <h2 className="text-2xl font-bold text-carwala-white mb-2">Create Account</h2>
            <p className="text-gray-400">Join us for premium car rental experience</p>
          </div>

          {/* Signup Form */}
          <div className="bg-carwala-white/10 backdrop-blur-lg border border-carwala-white/20 rounded-2xl p-8 shadow-2xl animate-slide-up">
            <form className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4 animate-fade-in-up animation-delay-200">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-carwala-white font-medium">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="bg-carwala-white/5 border-carwala-white/30 text-carwala-white placeholder:text-gray-400 focus:border-primary focus:ring-primary h-12 rounded-xl transition-all duration-300 hover:bg-carwala-white/10"
                    placeholder="First name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-carwala-white font-medium">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="bg-carwala-white/5 border-carwala-white/30 text-carwala-white placeholder:text-gray-400 focus:border-primary focus:ring-primary h-12 rounded-xl transition-all duration-300 hover:bg-carwala-white/10"
                    placeholder="Last name"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2 animate-fade-in-up animation-delay-400">
                <Label htmlFor="email" className="text-carwala-white font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-carwala-white/5 border-carwala-white/30 text-carwala-white placeholder:text-gray-400 focus:border-primary focus:ring-primary h-12 rounded-xl pl-12 transition-all duration-300 hover:bg-carwala-white/10"
                    placeholder="Enter your email"
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Phone Field */}
              <div className="space-y-2 animate-fade-in-up animation-delay-600">
                <Label htmlFor="phone" className="text-carwala-white font-medium">
                  Phone Number
                </Label>
                <div className="relative">
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="bg-carwala-white/5 border-carwala-white/30 text-carwala-white placeholder:text-gray-400 focus:border-primary focus:ring-primary h-12 rounded-xl pl-12 transition-all duration-300 hover:bg-carwala-white/10"
                    placeholder="+91 9876543210"
                  />
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2 animate-fade-in-up animation-delay-800">
                <Label htmlFor="password" className="text-carwala-white font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="bg-carwala-white/5 border-carwala-white/30 text-carwala-white placeholder:text-gray-400 focus:border-primary focus:ring-primary h-12 rounded-xl pr-12 transition-all duration-300 hover:bg-carwala-white/10"
                    placeholder="Create password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors duration-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2 animate-fade-in-up animation-delay-1000">
                <Label htmlFor="confirmPassword" className="text-carwala-white font-medium">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="bg-carwala-white/5 border-carwala-white/30 text-carwala-white placeholder:text-gray-400 focus:border-primary focus:ring-primary h-12 rounded-xl pr-12 transition-all duration-300 hover:bg-carwala-white/10"
                    placeholder="Confirm password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors duration-300"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="animate-fade-in-up animation-delay-1200">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" className="rounded border-carwala-white/30 bg-carwala-white/5 text-primary focus:ring-primary" />
                  <span className="text-sm text-gray-400">
                    I agree to the{' '}
                    <Link to="#" className="text-primary hover:text-carwala-yellow transition-colors duration-300">
                      Terms of Service
                    </Link>
                    {' '}and{' '}
                    <Link to="#" className="text-primary hover:text-carwala-yellow transition-colors duration-300">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
              </div>

              {/* Signup Button */}
              <Button 
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-carwala-black font-bold text-lg h-12 rounded-xl transition-all duration-300 transform hover:scale-105 animate-pulse-glow animate-fade-in-up animation-delay-1400"
              >
                Create Account
                <CheckCircle className="w-5 h-5 ml-2" />
              </Button>

              {/* Divider */}
              <div className="relative animate-fade-in-up animation-delay-1600">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-carwala-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-carwala-black px-4 text-gray-400">Or sign up with</span>
                </div>
              </div>

              {/* Social Signup */}
              <div className="grid grid-cols-2 gap-4 animate-fade-in-up animation-delay-1800">
                <Button
                  type="button"
                  variant="outline"
                  className="border-carwala-white/30 text-carwala-white hover:bg-carwala-white/10 h-12 rounded-xl transition-all duration-300 hover:scale-105"
                >
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="border-carwala-white/30 text-carwala-white hover:bg-carwala-white/10 h-12 rounded-xl transition-all duration-300 hover:scale-105"
                >
                  Facebook
                </Button>
              </div>
            </form>

            {/* Login Link */}
            <div className="text-center mt-6 animate-fade-in-up animation-delay-2000">
              <p className="text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:text-carwala-yellow transition-colors duration-300 font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
