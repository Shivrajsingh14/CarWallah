import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

// Define types for user and auth context
type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, phone: string) => Promise<void>;
  logout: () => void;
};

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider props
type AuthProviderProps = {
  children: ReactNode;
};

// Create the auth provider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      if (token) {
        try {
          setLoading(true);
          const response = await fetch('http://localhost:5000/api/auth/profile', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
            setIsAuthenticated(true);
          } else {
            // Token is invalid or expired
            localStorage.removeItem('token');
            setToken(null);
            setUser(null);
            setIsAuthenticated(false);
          }
        } catch (err) {
          console.error('Authentication error:', err);
          setError('Authentication failed');
        } finally {
          setLoading(false);
        }
      }
    };

    checkUserLoggedIn();
  }, [token]);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        // Save token and user data
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setUser({
          _id: data._id,
          name: data.name,
          email: data.email,
          role: data.role
        });
        setIsAuthenticated(true);
        
        toast({
          title: "Login Successful",
          description: `Welcome back, ${data.name}!`,
        });
        
        navigate('/');
      } else {
        setError(data.message || 'Login failed');
        toast({
          title: "Login Failed",
          description: data.message || 'Invalid credentials',
          variant: "destructive"
        });
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please try again.');
      toast({
        title: "Login Error",
        description: "An error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string, phone: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, phone })
      });

      const data = await response.json();

      if (response.ok) {
        // Save token and user data
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setUser({
          _id: data._id,
          name: data.name,
          email: data.email,
          role: data.role
        });
        setIsAuthenticated(true);
        
        toast({
          title: "Registration Successful",
          description: `Welcome to Carwala, ${data.name}!`,
        });
        
        navigate('/');
      } else {
        setError(data.message || 'Registration failed');
        toast({
          title: "Registration Failed",
          description: data.message || 'Unable to create account',
          variant: "destructive"
        });
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('Registration failed. Please try again.');
      toast({
        title: "Registration Error",
        description: "An error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isAuthenticated,
      loading,
      error,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
