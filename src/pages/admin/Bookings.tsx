import { useState, useEffect } from 'react';
import {
  Calendar,
  Search,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  FileText,
  ArrowUpDown,
  Edit,
  Trash2,
  ChevronDown,
  Info
} from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

type Booking = {
  _id: string;
  bookingId: string;
  car: {
    _id: string;
    name: string;
    brand: string;
    model: string;
    image: string;
  };
  carName: string;
  user?: {
    _id: string;
    name: string;
    email: string;
  };
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  totalPrice: number;
  advancePayment: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'unpaid' | 'partial' | 'paid';
  paymentMethod: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

const bookingSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'cancelled', 'completed']),
  paymentStatus: z.enum(['unpaid', 'partial', 'paid']),
  advancePayment: z.coerce.number().min(0),
  notes: z.string().optional(),
});

const AdminBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  // Form setup
  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      status: 'pending',
      paymentStatus: 'unpaid',
      advancePayment: 0,
      notes: '',
    },
  });

  // Fetch bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        const response = await fetch('http://localhost:5000/api/bookings', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        
        const data = await response.json();
        setBookings(data);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError('Failed to load bookings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookings();
  }, []);

  // Filter and sort bookings
  const filteredBookings = bookings
    .filter(booking => {
      const matchesSearch = 
        booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.customerPhone.includes(searchQuery) ||
        booking.bookingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.carName.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' ? true : booking.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let fieldA: any = a[sortField as keyof Booking];
      let fieldB: any = b[sortField as keyof Booking];
      
      // Handle nested objects
      if (sortField === 'car.name') {
        fieldA = a.car?.name || '';
        fieldB = b.car?.name || '';
      }
      
      // Handle date strings
      if (typeof fieldA === 'string' && (sortField === 'createdAt' || sortField === 'startDate' || sortField === 'endDate')) {
        fieldA = new Date(fieldA).getTime();
        fieldB = new Date(fieldB).getTime();
      }
      
      // Handle string fields
      if (typeof fieldA === 'string' && typeof fieldB === 'string') {
        fieldA = fieldA.toLowerCase();
        fieldB = fieldB.toLowerCase();
      }
      
      if (fieldA < fieldB) return sortOrder === 'asc' ? -1 : 1;
      if (fieldA > fieldB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  // Handle status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge variant="default" className="bg-green-500">Confirmed</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      case 'completed':
        return <Badge variant="default" className="bg-blue-500">Completed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Handle payment status badge color
  const getPaymentBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Paid</Badge>;
      case 'partial':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Partial</Badge>;
      case 'unpaid':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Unpaid</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Open edit dialog
  const handleEditClick = (booking: Booking) => {
    setSelectedBooking(booking);
    
    form.reset({
      status: booking.status,
      paymentStatus: booking.paymentStatus,
      advancePayment: booking.advancePayment,
      notes: booking.notes || '',
    });
    
    setIsEditDialogOpen(true);
  };

  // Open view dialog
  const handleViewClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsViewDialogOpen(true);
  };

  // Open delete dialog
  const handleDeleteClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsDeleteDialogOpen(true);
  };

  // Update booking
  const handleUpdateBooking = async (values: z.infer<typeof bookingSchema>) => {
    try {
      if (!selectedBooking) return;
      
      const token = localStorage.getItem('token');
      
      const response = await fetch(`http://localhost:5000/api/bookings/${selectedBooking._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update booking');
      }
      
      const updatedBooking = await response.json();
      
      setBookings(prev => prev.map(booking => 
        booking._id === updatedBooking._id ? updatedBooking : booking
      ));
      
      toast({
        title: "Booking Updated",
        description: `Booking #${selectedBooking.bookingId} has been updated successfully`,
      });
      
      setIsEditDialogOpen(false);
      setSelectedBooking(null);
    } catch (err) {
      console.error('Error updating booking:', err);
      toast({
        title: "Error",
        description: "Failed to update booking. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Update booking status directly
  const handleStatusChange = async (booking: Booking, status: 'confirmed' | 'cancelled' | 'completed') => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`http://localhost:5000/api/bookings/${booking._id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update booking status');
      }
      
      const updatedBooking = await response.json();
      
      setBookings(prev => prev.map(b => 
        b._id === updatedBooking._id ? updatedBooking : b
      ));
      
      toast({
        title: "Status Updated",
        description: `Booking #${booking.bookingId} status changed to ${status}`,
      });
    } catch (err) {
      console.error('Error updating booking status:', err);
      toast({
        title: "Error",
        description: "Failed to update booking status. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Delete booking
  const handleDeleteBooking = async () => {
    try {
      if (!selectedBooking) return;
      
      const token = localStorage.getItem('token');
      
      const response = await fetch(`http://localhost:5000/api/bookings/${selectedBooking._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete booking');
      }
      
      setBookings(prev => prev.filter(booking => booking._id !== selectedBooking._id));
      
      toast({
        title: "Booking Deleted",
        description: `Booking #${selectedBooking.bookingId} has been deleted successfully`,
      });
      
      setIsDeleteDialogOpen(false);
      setSelectedBooking(null);
    } catch (err) {
      console.error('Error deleting booking:', err);
      toast({
        title: "Error",
        description: "Failed to delete booking. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Export bookings to CSV
  const exportToCSV = () => {
    try {
      // Create CSV content
      const headers = [
        'Booking ID', 
        'Customer Name', 
        'Car', 
        'Start Date', 
        'End Date', 
        'Total Days', 
        'Total Price', 
        'Status', 
        'Payment Status'
      ];
      
      const csvContent = [
        headers.join(','),
        ...filteredBookings.map(booking => [
          booking.bookingId,
          booking.customerName,
          booking.carName,
          format(parseISO(booking.startDate), 'yyyy-MM-dd'),
          format(parseISO(booking.endDate), 'yyyy-MM-dd'),
          booking.totalDays,
          booking.totalPrice,
          booking.status,
          booking.paymentStatus
        ].join(','))
      ].join('\n');
      
      // Create download link
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `bookings_export_${format(new Date(), 'yyyy-MM-dd')}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Export Successful",
        description: "Booking data has been exported to CSV",
      });
    } catch (err) {
      console.error('Error exporting to CSV:', err);
      toast({
        title: "Export Failed",
        description: "Failed to export booking data",
        variant: "destructive",
      });
    }
  };

  // Booking counts by status
  const statusCounts = {
    all: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
    completed: bookings.filter(b => b.status === 'completed').length,
  };

  if (error) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Booking Management</h1>
            <p className="text-muted-foreground">
              Manage all car rental bookings
            </p>
          </div>
          
          <Button
            className="h-8 gap-1"
            onClick={exportToCSV}
          >
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        </div>

        <Tabs defaultValue="all" onValueChange={setStatusFilter} value={statusFilter}>
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="all">
              All ({statusCounts.all})
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending ({statusCounts.pending})
            </TabsTrigger>
            <TabsTrigger value="confirmed">
              Confirmed ({statusCounts.confirmed})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({statusCounts.completed})
            </TabsTrigger>
            <TabsTrigger value="cancelled">
              Cancelled ({statusCounts.cancelled})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="m-0">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
                  <CardTitle>All Bookings</CardTitle>
                  
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search bookings..."
                      className="pl-8 w-full sm:w-[300px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                {loading ? (
                  <div className="space-y-4">
                    {Array(5).fill(0).map((_, i) => (
                      <div key={i} className="flex items-center space-x-4">
                        <Skeleton className="h-12 w-12 rounded-md" />
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-4 w-full max-w-[200px]" />
                          <Skeleton className="h-4 w-full max-w-[150px]" />
                        </div>
                        <Skeleton className="h-8 w-16 rounded-md" />
                      </div>
                    ))}
                  </div>
                ) : filteredBookings.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No Bookings Found</h3>
                    <p className="text-sm text-muted-foreground mt-1 mb-4">
                      {searchQuery
                        ? "Try changing your search query"
                        : "No bookings available for this status"}
                    </p>
                    {searchQuery && (
                      <Button
                        variant="outline"
                        onClick={() => setSearchQuery('')}
                      >
                        Clear Search
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="rounded-md border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="cursor-pointer" onClick={() => {
                            if (sortField === 'bookingId') {
                              setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                            } else {
                              setSortField('bookingId');
                              setSortOrder('asc');
                            }
                          }}>
                            Booking ID
                            {sortField === 'bookingId' && (
                              <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                            )}
                          </TableHead>
                          <TableHead className="cursor-pointer" onClick={() => {
                            if (sortField === 'customerName') {
                              setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                            } else {
                              setSortField('customerName');
                              setSortOrder('asc');
                            }
                          }}>
                            Customer
                            {sortField === 'customerName' && (
                              <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                            )}
                          </TableHead>
                          <TableHead className="cursor-pointer" onClick={() => {
                            if (sortField === 'carName') {
                              setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                            } else {
                              setSortField('carName');
                              setSortOrder('asc');
                            }
                          }}>
                            Car
                            {sortField === 'carName' && (
                              <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                            )}
                          </TableHead>
                          <TableHead className="cursor-pointer" onClick={() => {
                            if (sortField === 'startDate') {
                              setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                            } else {
                              setSortField('startDate');
                              setSortOrder('asc');
                            }
                          }}>
                            Dates
                            {sortField === 'startDate' && (
                              <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                            )}
                          </TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="cursor-pointer" onClick={() => {
                            if (sortField === 'totalPrice') {
                              setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                            } else {
                              setSortField('totalPrice');
                              setSortOrder('asc');
                            }
                          }}>
                            Amount
                            {sortField === 'totalPrice' && (
                              <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                            )}
                          </TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredBookings.map((booking) => (
                          <TableRow key={booking._id}>
                            <TableCell 
                              className="font-medium"
                              onClick={() => handleViewClick(booking)}
                            >
                              <Button variant="link" className="p-0 h-auto">
                                {booking.bookingId}
                              </Button>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p>{booking.customerName}</p>
                                <p className="text-sm text-muted-foreground">{booking.customerPhone}</p>
                              </div>
                            </TableCell>
                            <TableCell>{booking.carName}</TableCell>
                            <TableCell>
                              <div className="text-sm">
                                <p>{format(parseISO(booking.startDate), 'MMM dd, yyyy')}</p>
                                <p className="text-muted-foreground">to {format(parseISO(booking.endDate), 'MMM dd, yyyy')}</p>
                                <p className="text-xs text-muted-foreground">({booking.totalDays} days)</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col gap-1">
                                {getStatusBadge(booking.status)}
                                {getPaymentBadge(booking.paymentStatus)}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p>₹{booking.totalPrice.toLocaleString('en-IN')}</p>
                                {booking.advancePayment > 0 && (
                                  <p className="text-xs text-muted-foreground">
                                    Advance: ₹{booking.advancePayment.toLocaleString('en-IN')}
                                  </p>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <ChevronDown className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleViewClick(booking)}>
                                    <FileText className="mr-2 h-4 w-4" />
                                    <span>View Details</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleEditClick(booking)}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    <span>Edit</span>
                                  </DropdownMenuItem>
                                  {booking.status === 'pending' && (
                                    <DropdownMenuItem onClick={() => handleStatusChange(booking, 'confirmed')}>
                                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                      <span>Confirm</span>
                                    </DropdownMenuItem>
                                  )}
                                  {booking.status === 'confirmed' && (
                                    <DropdownMenuItem onClick={() => handleStatusChange(booking, 'completed')}>
                                      <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />
                                      <span>Mark as Completed</span>
                                    </DropdownMenuItem>
                                  )}
                                  {(booking.status === 'pending' || booking.status === 'confirmed') && (
                                    <DropdownMenuItem onClick={() => handleStatusChange(booking, 'cancelled')}>
                                      <XCircle className="mr-2 h-4 w-4 text-red-500" />
                                      <span>Cancel</span>
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem onClick={() => handleDeleteClick(booking)} className="text-red-600">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    <span>Delete</span>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Other tabs with similar content */}
          {['pending', 'confirmed', 'completed', 'cancelled'].map((status) => (
            <TabsContent key={status} value={status} className="m-0">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
                    <CardTitle>{status.charAt(0).toUpperCase() + status.slice(1)} Bookings</CardTitle>
                    
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search bookings..."
                        className="pl-8 w-full sm:w-[300px]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  {/* Same table content as 'all' tab */}
                  {loading ? (
                    <div className="space-y-4">
                      {Array(5).fill(0).map((_, i) => (
                        <div key={i} className="flex items-center space-x-4">
                          <Skeleton className="h-12 w-12 rounded-md" />
                          <div className="space-y-2 flex-1">
                            <Skeleton className="h-4 w-full max-w-[200px]" />
                            <Skeleton className="h-4 w-full max-w-[150px]" />
                          </div>
                          <Skeleton className="h-8 w-16 rounded-md" />
                        </div>
                      ))}
                    </div>
                  ) : filteredBookings.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">No Bookings Found</h3>
                      <p className="text-sm text-muted-foreground mt-1 mb-4">
                        {searchQuery
                          ? "Try changing your search query"
                          : `No ${status} bookings available`}
                      </p>
                      {searchQuery && (
                        <Button
                          variant="outline"
                          onClick={() => setSearchQuery('')}
                        >
                          Clear Search
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="rounded-md border overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Booking ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Car</TableHead>
                            <TableHead>Dates</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredBookings.map((booking) => (
                            <TableRow key={booking._id}>
                              <TableCell 
                                className="font-medium"
                                onClick={() => handleViewClick(booking)}
                              >
                                <Button variant="link" className="p-0 h-auto">
                                  {booking.bookingId}
                                </Button>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <p>{booking.customerName}</p>
                                  <p className="text-sm text-muted-foreground">{booking.customerPhone}</p>
                                </div>
                              </TableCell>
                              <TableCell>{booking.carName}</TableCell>
                              <TableCell>
                                <div className="text-sm">
                                  <p>{format(parseISO(booking.startDate), 'MMM dd, yyyy')}</p>
                                  <p className="text-muted-foreground">to {format(parseISO(booking.endDate), 'MMM dd, yyyy')}</p>
                                  <p className="text-xs text-muted-foreground">({booking.totalDays} days)</p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-col gap-1">
                                  {getStatusBadge(booking.status)}
                                  {getPaymentBadge(booking.paymentStatus)}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <p>₹{booking.totalPrice.toLocaleString('en-IN')}</p>
                                  {booking.advancePayment > 0 && (
                                    <p className="text-xs text-muted-foreground">
                                      Advance: ₹{booking.advancePayment.toLocaleString('en-IN')}
                                    </p>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <ChevronDown className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => handleViewClick(booking)}>
                                      <FileText className="mr-2 h-4 w-4" />
                                      <span>View Details</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleEditClick(booking)}>
                                      <Edit className="mr-2 h-4 w-4" />
                                      <span>Edit</span>
                                    </DropdownMenuItem>
                                    {booking.status === 'pending' && (
                                      <DropdownMenuItem onClick={() => handleStatusChange(booking, 'confirmed')}>
                                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                        <span>Confirm</span>
                                      </DropdownMenuItem>
                                    )}
                                    {booking.status === 'confirmed' && (
                                      <DropdownMenuItem onClick={() => handleStatusChange(booking, 'completed')}>
                                        <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />
                                        <span>Mark as Completed</span>
                                      </DropdownMenuItem>
                                    )}
                                    {(booking.status === 'pending' || booking.status === 'confirmed') && (
                                      <DropdownMenuItem onClick={() => handleStatusChange(booking, 'cancelled')}>
                                        <XCircle className="mr-2 h-4 w-4 text-red-500" />
                                        <span>Cancel</span>
                                      </DropdownMenuItem>
                                    )}
                                    <DropdownMenuItem onClick={() => handleDeleteClick(booking)} className="text-red-600">
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      <span>Delete</span>
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* View Booking Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>
              {selectedBooking && `Booking ID: ${selectedBooking.bookingId}`}
            </DialogDescription>
          </DialogHeader>
          
          {selectedBooking && (
            <div className="space-y-6">
              <div className="rounded-lg border bg-card p-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium">Status</h3>
                  <div className="flex flex-col items-end gap-1">
                    {getStatusBadge(selectedBooking.status)}
                    {getPaymentBadge(selectedBooking.paymentStatus)}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Booking Date:</span>
                    <span>{format(parseISO(selectedBooking.createdAt), 'MMM dd, yyyy HH:mm')}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pickup Date:</span>
                    <span>{format(parseISO(selectedBooking.startDate), 'MMM dd, yyyy')}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Return Date:</span>
                    <span>{format(parseISO(selectedBooking.endDate), 'MMM dd, yyyy')}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span>{selectedBooking.totalDays} days</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border bg-card p-4">
                  <h3 className="font-medium mb-3">Customer Details</h3>
                  
                  <div className="space-y-2 text-sm">
                    <p><span className="text-muted-foreground">Name:</span> {selectedBooking.customerName}</p>
                    <p><span className="text-muted-foreground">Email:</span> {selectedBooking.customerEmail}</p>
                    <p><span className="text-muted-foreground">Phone:</span> {selectedBooking.customerPhone}</p>
                  </div>
                </div>
                
                <div className="rounded-lg border bg-card p-4">
                  <h3 className="font-medium mb-3">Car Details</h3>
                  
                  <div className="space-y-2 text-sm">
                    <p><span className="text-muted-foreground">Car:</span> {selectedBooking.carName}</p>
                    <p><span className="text-muted-foreground">Daily Rate:</span> ₹{selectedBooking.totalPrice / selectedBooking.totalDays}</p>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg border bg-card p-4">
                <h3 className="font-medium mb-3">Payment Details</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Amount:</span>
                    <span className="font-medium">₹{selectedBooking.totalPrice.toLocaleString('en-IN')}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Advance Paid:</span>
                    <span>₹{selectedBooking.advancePayment.toLocaleString('en-IN')}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Balance:</span>
                    <span>₹{(selectedBooking.totalPrice - selectedBooking.advancePayment).toLocaleString('en-IN')}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment Method:</span>
                    <span>{selectedBooking.paymentMethod.toUpperCase()}</span>
                  </div>
                </div>
              </div>
              
              {selectedBooking.notes && (
                <div className="rounded-lg border bg-card p-4">
                  <h3 className="font-medium mb-3">Notes</h3>
                  <p className="text-sm text-muted-foreground">{selectedBooking.notes}</p>
                </div>
              )}
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                  Close
                </Button>
                
                <Button onClick={() => {
                  setIsViewDialogOpen(false);
                  handleEditClick(selectedBooking);
                }}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Booking
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Booking Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Booking</DialogTitle>
            <DialogDescription>
              {selectedBooking && `Update details for booking #${selectedBooking.bookingId}`}
            </DialogDescription>
          </DialogHeader>
          
          {selectedBooking && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleUpdateBooking)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Booking Status</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="paymentStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Status</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select payment status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="unpaid">Unpaid</SelectItem>
                          <SelectItem value="partial">Partial</SelectItem>
                          <SelectItem value="paid">Paid</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="advancePayment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Advance Payment (₹)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="0" 
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Add notes about this booking" 
                          {...field}
                          rows={3}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => {
                    setIsEditDialogOpen(false);
                    setSelectedBooking(null);
                  }}>
                    Cancel
                  </Button>
                  <Button type="submit">Update Booking</Button>
                </div>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete booking #{selectedBooking?.bookingId}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setIsDeleteDialogOpen(false);
              setSelectedBooking(null);
            }}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteBooking} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminBookings;
