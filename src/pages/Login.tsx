
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Car, ArrowRight, Star } from 'lucide-react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
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
            <h2 className="text-2xl font-bold text-carwala-white mb-2">Welcome Back</h2>
            <p className="text-gray-400">Sign in to access premium car rentals</p>
          </div>

          {/* Login Form */}
          <div className="bg-carwala-white/10 backdrop-blur-lg border border-carwala-white/20 rounded-2xl p-8 shadow-2xl animate-slide-up">
            <form className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2 animate-fade-in-up animation-delay-200">
                <Label htmlFor="email" className="text-carwala-white font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-carwala-white/5 border-carwala-white/30 text-carwala-white placeholder:text-gray-400 focus:border-primary focus:ring-primary h-12 rounded-xl transition-all duration-300 hover:bg-carwala-white/10"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2 animate-fade-in-up animation-delay-400">
                <Label htmlFor="password" className="text-carwala-white font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-carwala-white/5 border-carwala-white/30 text-carwala-white placeholder:text-gray-400 focus:border-primary focus:ring-primary h-12 rounded-xl pr-12 transition-all duration-300 hover:bg-carwala-white/10"
                    placeholder="Enter your password"
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

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between animate-fade-in-up animation-delay-600">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-carwala-white/30 bg-carwala-white/5 text-primary focus:ring-primary" />
                  <span className="text-sm text-gray-400">Remember me</span>
                </label>
                <Link to="#" className="text-sm text-primary hover:text-carwala-yellow transition-colors duration-300">
                  Forgot password?
                </Link>
              </div>

              {/* Login Button */}
              <Button 
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-carwala-black font-bold text-lg h-12 rounded-xl transition-all duration-300 transform hover:scale-105 animate-pulse-glow animate-fade-in-up animation-delay-800"
              >
                Sign In
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              {/* Divider */}
              <div className="relative animate-fade-in-up animation-delay-1000">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-carwala-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-carwala-black px-4 text-gray-400">Or continue with</span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-4 animate-fade-in-up animation-delay-1200">
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

            {/* Sign Up Link */}
            <div className="text-center mt-6 animate-fade-in-up animation-delay-1400">
              <p className="text-gray-400">
                Don't have an account?{' '}
                <Link to="/signup" className="text-primary hover:text-carwala-yellow transition-colors duration-300 font-medium">
                  Sign up now
                </Link>
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="mt-8 grid grid-cols-3 gap-4 animate-fade-in-up animation-delay-1600">
            <div className="text-center text-carwala-white opacity-80 hover:opacity-100 transition-opacity duration-300">
              <Star className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm">Premium Cars</p>
            </div>
            <div className="text-center text-carwala-white opacity-80 hover:opacity-100 transition-opacity duration-300">
              <Car className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm">Easy Booking</p>
            </div>
            <div className="text-center text-carwala-white opacity-80 hover:opacity-100 transition-opacity duration-300">
              <ArrowRight className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm">Quick Service</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
