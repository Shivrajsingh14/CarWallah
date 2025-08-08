
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Car, ArrowRight, Star, Loader } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/use-toast';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      toast({
        title: "Missing Information",
        description: "Please enter both email and password",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await login(email, password);
      // AuthContext will handle success toast and navigation
    } catch (error) {
      // Errors are handled in the AuthContext
      console.error('Login form error:', error);
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
      </div>      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Logo Section */}
          <div className="text-center mb-8 animate-fade-in-up">
            <Link to="/" className="inline-flex items-center space-x-3 mb-6 hover:scale-105 transition-transform duration-300">
              <div className="bg-amber-400 text-[#0a1a35] p-3 rounded-xl font-bold text-xl animate-pulse-glow">
                <Car className="w-8 h-8" />
              </div>
              <h1 className="text-3xl font-bold text-white">
                Car<span className="text-amber-400">wallah</span>
              </h1>
            </Link>
            <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-300">Sign in to access premium car rentals</p>
          </div>          {/* Login Form */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl animate-slide-up">
            <form className="space-y-6" onSubmit={handleSubmit}>              {/* Email Field */}
              <div className="space-y-2 animate-fade-in-up animation-delay-200">
                <Label htmlFor="email" className="text-white font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/5 border-white/30 text-white placeholder:text-gray-300 focus:border-amber-400 focus:ring-amber-400 h-12 rounded-xl transition-all duration-300 hover:bg-white/10"
                  placeholder="Enter your email"
                  required
                />
              </div>              {/* Password Field */}
              <div className="space-y-2 animate-fade-in-up animation-delay-400">
                <Label htmlFor="password" className="text-white font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/5 border-white/30 text-white placeholder:text-gray-300 focus:border-amber-400 focus:ring-amber-400 h-12 rounded-xl pr-12 transition-all duration-300 hover:bg-white/10"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors duration-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between animate-fade-in-up animation-delay-600">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="rounded border-white/30 bg-white/5 text-amber-400 focus:ring-amber-400" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="text-sm text-gray-300">Remember me</span>
                </label>
                <Link to="#" className="text-sm text-amber-400 hover:text-amber-300 transition-colors duration-300">
                  Forgot password?
                </Link>
              </div>              {/* Login Button */}
              <Button 
                type="submit"
                className="w-full bg-amber-400 hover:bg-amber-500 text-[#0a1a35] font-bold text-lg h-12 rounded-xl transition-all duration-300 transform hover:scale-105 animate-pulse-glow animate-fade-in-up animation-delay-800"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 mr-2 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>              {/* Divider */}
              <div className="relative animate-fade-in-up animation-delay-1000">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-[#0a1a35] px-4 text-gray-300">Or continue with</span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-4 animate-fade-in-up animation-delay-1200">
                <Button
                  type="button"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 h-12 rounded-xl transition-all duration-300 hover:scale-105"
                >
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 h-12 rounded-xl transition-all duration-300 hover:scale-105"
                >
                  Facebook
                </Button>
              </div>
            </form>

            {/* Sign Up Link */}
            <div className="text-center mt-6 animate-fade-in-up animation-delay-1400">
              <p className="text-gray-300">
                Don't have an account?{' '}
                <Link to="/signup" className="text-amber-400 hover:text-amber-300 transition-colors duration-300 font-medium">
                  Sign up now
                </Link>
              </p>
            </div>          </div>

          {/* Features */}
          <div className="mt-8 grid grid-cols-3 gap-4 animate-fade-in-up animation-delay-1600">
            <div className="text-center text-white opacity-80 hover:opacity-100 transition-opacity duration-300">
              <Star className="w-6 h-6 text-amber-400 mx-auto mb-2" />
              <p className="text-sm">Premium Cars</p>
            </div>
            <div className="text-center text-white opacity-80 hover:opacity-100 transition-opacity duration-300">
              <Car className="w-6 h-6 text-amber-400 mx-auto mb-2" />
              <p className="text-sm">Easy Booking</p>
            </div>
            <div className="text-center text-white opacity-80 hover:opacity-100 transition-opacity duration-300">
              <ArrowRight className="w-6 h-6 text-amber-400 mx-auto mb-2" />
              <p className="text-sm">Quick Service</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
