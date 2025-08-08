
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Car, ArrowRight, User, Mail, Phone, CheckCircle, Loader } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/use-toast';

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
  const [termsAgreed, setTermsAgreed] = useState(false);

  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    if (!termsAgreed) {
      toast({
        title: "Terms Agreement Required",
        description: "Please agree to the terms of service and privacy policy",
        variant: "destructive"
      });
      return;
    }

    try {
      // Combine first and last name for the name field required by the API
      const fullName = `${formData.firstName} ${formData.lastName}`;
      
      await register(fullName, formData.email, formData.password, formData.phone);
      // AuthContext will handle success toast and navigation
    } catch (error) {
      // Errors are handled in the AuthContext
      console.error('Registration form error:', error);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1a35] via-[#152a4a] to-[#0a1a35] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Particles */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-amber-400 rounded-full animate-float-1"></div>
        <div className="absolute top-20 right-20 w-3 h-3 bg-amber-400 rounded-full animate-float-2"></div>
        <div className="absolute bottom-20 left-20 w-2 h-2 bg-amber-400 rounded-full animate-float-3"></div>
        <div className="absolute bottom-10 right-10 w-1 h-1 bg-amber-400 rounded-full animate-float-1"></div>
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-amber-400 rounded-full animate-float-2"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-amber-400 rounded-full animate-float-3"></div>

        {/* Geometric Shapes */}
        <div className="absolute top-20 left-1/4 w-32 h-32 border border-amber-400 rounded-full opacity-20 animate-spin-slow"></div>
        <div className="absolute bottom-20 right-1/4 w-24 h-24 border border-amber-400 opacity-30 animate-pulse-slow"></div>
        <div className="absolute top-1/2 right-10 w-16 h-16 border-2 border-amber-400 transform rotate-45 animate-bounce-slow"></div>
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
                Car<span className="text-primary">wallah</span>
              </h1>
            </Link>
            <h2 className="text-2xl font-bold text-carwala-white mb-2">Create Account</h2>
            <p className="text-gray-400">Join us for premium car rental experience</p>
          </div>          {/* Signup Form */}
          <div className="bg-carwala-white/10 backdrop-blur-lg border border-carwala-white/20 rounded-2xl p-8 shadow-2xl animate-slide-up">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Name Fields */}              <div className="grid grid-cols-2 gap-4 animate-fade-in-up animation-delay-200">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-white font-medium">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="bg-white/5 border-white/30 text-white placeholder:text-gray-300 focus:border-amber-400 focus:ring-amber-400 h-12 rounded-xl transition-all duration-300 hover:bg-white/10"
                    placeholder="First name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-white font-medium">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="bg-white/5 border-white/30 text-white placeholder:text-gray-300 focus:border-amber-400 focus:ring-amber-400 h-12 rounded-xl transition-all duration-300 hover:bg-white/10"
                    placeholder="Last name"
                  />
                </div>
              </div>              {/* Email Field */}
              <div className="space-y-2 animate-fade-in-up animation-delay-400">
                <Label htmlFor="email" className="text-white font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-white/5 border-white/30 text-white placeholder:text-gray-300 focus:border-amber-400 focus:ring-amber-400 h-12 rounded-xl pl-12 transition-all duration-300 hover:bg-white/10"
                    placeholder="Enter your email"
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400/70" />
                </div>
              </div>              {/* Phone Field */}
              <div className="space-y-2 animate-fade-in-up animation-delay-600">
                <Label htmlFor="phone" className="text-white font-medium">
                  Phone Number
                </Label>
                <div className="relative">
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="bg-white/5 border-white/30 text-white placeholder:text-gray-300 focus:border-amber-400 focus:ring-amber-400 h-12 rounded-xl pl-12 transition-all duration-300 hover:bg-white/10"
                    placeholder="+91 9876543210"
                  />
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400/70" />
                </div>
              </div>              {/* Password Field */}
              <div className="space-y-2 animate-fade-in-up animation-delay-800">
                <Label htmlFor="password" className="text-white font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="bg-white/5 border-white/30 text-white placeholder:text-gray-300 focus:border-amber-400 focus:ring-amber-400 h-12 rounded-xl pr-12 transition-all duration-300 hover:bg-white/10"
                    placeholder="Create password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-amber-400 transition-colors duration-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>              {/* Confirm Password Field */}
              <div className="space-y-2 animate-fade-in-up animation-delay-1000">
                <Label htmlFor="confirmPassword" className="text-white font-medium">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="bg-white/5 border-white/30 text-white placeholder:text-gray-300 focus:border-amber-400 focus:ring-amber-400 h-12 rounded-xl pr-12 transition-all duration-300 hover:bg-white/10"
                    placeholder="Confirm password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-amber-400 transition-colors duration-300"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>              {/* Terms Agreement */}
              <div className="animate-fade-in-up animation-delay-1200">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="rounded border-white/30 bg-white/5 text-amber-400 focus:ring-amber-400" 
                    checked={termsAgreed}
                    onChange={(e) => setTermsAgreed(e.target.checked)}
                  />
                  <span className="text-sm text-gray-300">
                    I agree to the{' '}
                    <Link to="#" className="text-amber-400 hover:text-amber-300 transition-colors duration-300">
                      Terms of Service
                    </Link>
                    {' '}and{' '}
                    <Link to="#" className="text-amber-400 hover:text-amber-300 transition-colors duration-300">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
              </div>              {/* Signup Button */}
              <Button 
                type="submit"
                className="w-full bg-amber-400 hover:bg-amber-500 text-[#0a1a35] font-bold text-lg h-12 rounded-xl transition-all duration-300 transform hover:scale-105 animate-pulse-glow animate-fade-in-up animation-delay-1400"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 mr-2 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <CheckCircle className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>              {/* Divider */}
              <div className="relative animate-fade-in-up animation-delay-1600">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-[#0a1a35] px-4 text-gray-300">Or sign up with</span>
                </div>
              </div>              {/* Social Signup */}
              <div className="grid grid-cols-2 gap-4 animate-fade-in-up animation-delay-1800">
                <Button
                  type="button"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 h-12 rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 h-12 rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
                  </svg>
                  Facebook
                </Button>
              </div>
            </form>            {/* Login Link */}
            <div className="text-center mt-6 animate-fade-in-up animation-delay-2000">
              <p className="text-gray-300">
                Already have an account?{' '}
                <Link to="/login" className="text-amber-400 hover:text-amber-300 transition-colors duration-300 font-medium">
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
