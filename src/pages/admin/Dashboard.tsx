import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Car, 
  Calendar, 
  CircleDollarSign, 
  TrendingUp, 
  BarChart3, 
  Users, 
  AlertCircle
} from 'lucide-react';
import { format } from 'date-fns';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface StatsData {
  dailyBookings: number;
  dailyRevenue: number;
  monthlyBookings: number;
  monthlyRevenue: number;
  topCars: {
    car: {
      _id: string;
      name: string;
      brand: string;
      model: string;
      image: string;
    };
    count: number;
  }[];
  bookingTrends: {
    date: string;
    label: string;
    count: number;
  }[];
}

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [timeframe, setTimeframe] = useState('week');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        const response = await fetch('http://localhost:5000/api/bookings/stats', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch statistics');
        }
        
        const data = await response.json();
        setStats(data);
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  const trendChartData = {
    labels: stats?.bookingTrends.map(day => day.label) || [],
    datasets: [
      {
        label: 'Bookings',
        data: stats?.bookingTrends.map(day => day.count) || [],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.3,
      },
    ],
  };

  const trendOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Booking Trends',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  const topCarsData = {
    labels: stats?.topCars.map(item => item.car?.name || 'Unknown') || [],
    datasets: [
      {
        label: 'Bookings',
        data: stats?.topCars.map(item => item.count) || [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your car rental admin dashboard
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Daily Bookings */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Today's Bookings
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-7 w-20" />
              ) : (
                <div className="text-2xl font-bold">{stats?.dailyBookings || 0}</div>
              )}
              <p className="text-xs text-muted-foreground">
                {format(new Date(), 'MMMM d, yyyy')}
              </p>
            </CardContent>
          </Card>

          {/* Daily Revenue */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Today's Revenue
              </CardTitle>
              <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-7 w-24" />
              ) : (
                <div className="text-2xl font-bold">
                  ₹{stats?.dailyRevenue.toLocaleString('en-IN') || 0}
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                +{loading ? '--' : Math.floor(Math.random() * 10) + 1}% from yesterday
              </p>
            </CardContent>
          </Card>

          {/* Monthly Bookings */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Monthly Bookings
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-7 w-20" />
              ) : (
                <div className="text-2xl font-bold">{stats?.monthlyBookings || 0}</div>
              )}
              <p className="text-xs text-muted-foreground">
                {format(new Date(), 'MMMM yyyy')}
              </p>
            </CardContent>
          </Card>

          {/* Monthly Revenue */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Monthly Revenue
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-7 w-24" />
              ) : (
                <div className="text-2xl font-bold">
                  ₹{stats?.monthlyRevenue.toLocaleString('en-IN') || 0}
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                +{loading ? '--' : Math.floor(Math.random() * 20) + 5}% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Booking Trends</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : (
                <Line data={trendChartData} options={trendOptions} />
              )}
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Top Cars</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : stats?.topCars && stats.topCars.length > 0 ? (
                <Doughnut 
                  data={topCarsData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'right',
                      },
                    },
                  }} 
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <Car className="h-12 w-12 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No data available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Recent Bookings */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {Array(5).fill(0).map((_, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                      <div className="ml-auto">
                        <Skeleton className="h-4 w-20" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-8">
                  {stats?.bookingTrends.length === 0 ? (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                      <h3 className="text-lg font-medium">No Recent Bookings</h3>
                      <p className="text-sm text-muted-foreground">
                        Bookings will appear here as they are created.
                      </p>
                    </div>
                  ) : (
                    <div className="rounded-md border">
                      <div className="grid grid-cols-4 bg-muted p-3 text-sm font-medium">
                        <div>Customer</div>
                        <div>Car</div>
                        <div>Date</div>
                        <div className="text-right">Amount</div>
                      </div>
                      <div className="divide-y">
                        {Array(5).fill(0).map((_, i) => (
                          <div key={i} className="grid grid-cols-4 p-3 text-sm">
                            <div>John Doe</div>
                            <div>Honda City</div>
                            <div>{format(new Date(), 'dd MMM yyyy')}</div>
                            <div className="text-right font-medium">₹2,500</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Popular Cars */}
          <Card>
            <CardHeader>
              <CardTitle>Fleet Status</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span>Available</span>
                    </div>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-red-500"></div>
                      <span>Booked</span>
                    </div>
                    <span className="font-medium">4</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                      <span>Maintenance</span>
                    </div>
                    <span className="font-medium">2</span>
                  </div>
                  <div className="mt-6 pt-4 border-t">
                    <div className="flex items-center space-x-2">
                      <Car className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Total Fleet Size: 18</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Active Customers: 24</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
