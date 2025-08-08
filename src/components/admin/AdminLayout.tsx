import { useState, ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { 
  LayoutDashboard, 
  Car, 
  Calendar, 
  User, 
  Users,
  Settings, 
  LogOut, 
  Menu, 
  X, 
  ChevronDown 
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type AdminLayoutProps = {
  children: ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { path: '/admin/cars', label: 'Cars', icon: <Car className="h-5 w-5" /> },
    { path: '/admin/bookings', label: 'Bookings', icon: <Calendar className="h-5 w-5" /> },
    { path: '/admin/users', label: 'Admin Users', icon: <Users className="h-5 w-5" /> },
    { path: '/admin/profile', label: 'Profile', icon: <User className="h-5 w-5" /> },
    { path: '/admin/settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white shadow-sm py-4 px-6 flex justify-between items-center">
        <Link to="/admin" className="flex items-center space-x-2">
          <span className="font-bold text-xl text-primary">Carwala Admin</span>
        </Link>

        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <div className="flex flex-col h-full">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xl text-primary">Carwala</span>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="flex-1 overflow-auto py-4">
                <nav className="space-y-1 px-2">
                  {menuItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${
                        isActive(item.path)
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  ))}
                  <button
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-md transition-colors text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleLogout();
                    }}
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </nav>
              </div>

              <div className="p-4 border-t">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary/20 text-primary">
                      {user?.name?.charAt(0).toUpperCase() || 'A'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </header>

      <div className="flex h-[calc(100vh-0px)]">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-white border-r">
          <div className="p-6 border-b">
            <Link to="/admin" className="flex items-center space-x-2">
              <span className="font-bold text-xl text-primary">Carwala Admin</span>
            </Link>
          </div>

          <div className="flex-1 overflow-auto py-6">
            <nav className="space-y-1 px-3">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${
                    isActive(item.path)
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="p-4 border-t">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full flex items-center justify-between px-3">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-primary/20 text-primary">
                        {user?.name?.charAt(0).toUpperCase() || 'A'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-gray-500 truncate max-w-[120px]">{user?.email}</p>
                    </div>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/admin/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/admin/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-slate-50">
          <div className="hidden lg:flex items-center justify-end h-16 px-6 border-b bg-white">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary/20 text-primary">
                      {user?.name?.charAt(0).toUpperCase() || 'A'}
                    </AvatarFallback>
                  </Avatar>
                  <span>{user?.name}</span>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/admin/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/admin/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/')}>
                  <Car className="mr-2 h-4 w-4" />
                  <span>Visit Website</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
