import { useState, useEffect } from 'react';
import { useNavigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import AdminDashboard from './admin/Dashboard';
import AdminCars from './admin/Cars';
import AdminBookings from './admin/Bookings';
import AdminProfile from './admin/Profile';
import AdminSettings from './admin/Settings';
import AdminUsers from './admin/AdminUsers';
import AdminLogin from './admin/Login';
import AdminLayout from '@/components/admin/AdminLayout';
import ProtectedAdminRoute from '@/components/ProtectedAdminRoute';
import { toast } from '@/components/ui/use-toast';

const Admin = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated but not an admin
    if (isAuthenticated && user && user.role !== 'admin') {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin panel.",
        variant: "destructive",
      });
      navigate('/');
    }
    
    setLoading(false);
  }, [isAuthenticated, user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      <Route
        path="/*"
        element={
          <ProtectedAdminRoute>
            <AdminLayout>
              <Routes>                <Route index element={<AdminDashboard />} />
                <Route path="cars" element={<AdminCars />} />
                <Route path="bookings" element={<AdminBookings />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="profile" element={<AdminProfile />} />
                <Route path="settings" element={<AdminSettings />} />
              </Routes>
            </AdminLayout>
          </ProtectedAdminRoute>
        }
      />
    </Routes>
  );
};

export default Admin;
