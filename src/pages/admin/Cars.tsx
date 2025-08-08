import { useState, useEffect } from 'react';
import { 
  Car, 
  Plus, 
  Edit, 
  Trash2, 
  AlertCircle, 
  Search,
  CheckCircle2,
  XCircle,
  ArrowUpDown,
  Download,
  Users,
  Fuel,
  Settings
} from 'lucide-react';

// The icons are already imported in the lucide-react import above
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
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

const carSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
  brand: z.string().min(1, { message: 'Brand is required' }),
  model: z.string().min(1, { message: 'Model is required' }),
  type: z.string({
    required_error: 'Please select a car type',
  }),
  price: z.coerce.number().positive({ message: 'Price must be a positive number' }),
  transmission: z.string({
    required_error: 'Please select a transmission type',
  }),  fuel: z.string({
    required_error: 'Please select a fuel type',
  }),
  seats: z.coerce.number().int().min(1).max(10),
  stock: z.coerce.number().int().min(1).default(1),
  description: z.string().optional(),
  features: z.string().optional(),
  isActive: z.boolean().default(true),
});

type Car = {
  _id: string;
  name: string;
  brand: string;
  model: string;
  type: string;
  price: number;
  transmission: string;
  fuel: string;
  seats: number;
  stock: number;
  isBooked: boolean;
  isActive: boolean;
  image: string;
  description?: string;
  features: string[];
  createdAt: string;
};

const AdminCars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isStockDialogOpen, setIsStockDialogOpen] = useState<boolean>(false);
  const [newStock, setNewStock] = useState<number>(1);
  const { toast } = useToast();

  // Form setup
  const form = useForm<z.infer<typeof carSchema>>({
    resolver: zodResolver(carSchema),
    defaultValues: {
      name: '',
      brand: '',
      model: '',
      type: '',      price: 0,
      transmission: '',
      fuel: '',
      seats: 4,
      stock: 1,
      description: '',
      features: '',
      isActive: true,
    },
  });

  // Fetch cars
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        const response = await fetch('http://localhost:5000/api/cars', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch cars');
        }
        
        const data = await response.json();
        setCars(data);
      } catch (err) {
        console.error('Error fetching cars:', err);
        setError('Failed to load cars. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCars();
  }, []);

  // Filter and sort cars
  const filteredCars = cars
    .filter(car => {
      const matchesSearch = 
        car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.model.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = filterType === 'all' ? true : car.type === filterType;
      
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      let fieldA: any = a[sortField as keyof Car];
      let fieldB: any = b[sortField as keyof Car];
      
      if (typeof fieldA === 'string') {
        fieldA = fieldA.toLowerCase();
        fieldB = fieldB.toLowerCase();
      }
      
      if (fieldA < fieldB) return sortOrder === 'asc' ? -1 : 1;
      if (fieldA > fieldB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Reset form and dialog state
  const resetFormAndState = () => {
    form.reset();
    setSelectedCar(null);
    setImagePreview(null);
    setSelectedImage(null);
  };

  // Add a new car
  const handleAddCar = async (values: z.infer<typeof carSchema>) => {
    try {
      if (!selectedImage) {
        toast({
          title: "Image Required",
          description: "Please upload an image for the car",
          variant: "destructive",
        });
        return;
      }

      const token = localStorage.getItem('token');
      const formData = new FormData();
        // Append form values to FormData
      Object.entries(values).forEach(([key, value]) => {
        if (key === 'features' && typeof value === 'string') {      // Convert comma-separated features to a string that backend can parse
          formData.append(key, value.trim());
        } else {
          formData.append(key, String(value));
        }
      });
      
      // Append image
      if (selectedImage) {
        formData.append('image', selectedImage);
      }
      
      console.log('Creating car with values:', Object.fromEntries(formData.entries()));
      
      const response = await fetch('http://localhost:5000/api/cars', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
        if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Error response:', errorData);
        throw new Error(errorData.message || 'Failed to add car');
      }
      
      const newCar = await response.json();
      setCars(prev => [...prev, newCar]);
      
      toast({
        title: "Car Added",
        description: `${newCar.name} has been added successfully`,
      });
      
      setIsAddDialogOpen(false);
      resetFormAndState();    } catch (err: any) {
      console.error('Error adding car:', err);
      toast({
        title: "Error",
        description: err.message || "Failed to add car. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Open edit dialog and populate form
  const handleEditClick = (car: Car) => {
    setSelectedCar(car);
    
    form.reset({
      name: car.name,
      brand: car.brand,
      model: car.model,
      type: car.type,
      price: car.price,
      transmission: car.transmission,
      fuel: car.fuel,
      seats: car.seats,
      description: car.description || '',
      features: car.features.join(', '),
      isActive: car.isActive,
    });
    
    setImagePreview(car.image.startsWith('http') 
      ? car.image 
      : `http://localhost:5000${car.image}`);
    
    setIsEditDialogOpen(true);
  };

  // Update a car
  const handleUpdateCar = async (values: z.infer<typeof carSchema>) => {
    try {
      if (!selectedCar) return;
      
      const token = localStorage.getItem('token');
      const formData = new FormData();
        // Append form values to FormData
      Object.entries(values).forEach(([key, value]) => {
        if (key === 'features' && typeof value === 'string') {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      });
      
      // Append image if a new one was selected
      if (selectedImage) {
        formData.append('image', selectedImage);
      }
      
      console.log('Updating car with values:', Object.fromEntries(formData.entries()));
      
      const response = await fetch(`http://localhost:5000/api/cars/${selectedCar._id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to update car');
      }
      
      const updatedCar = await response.json();
      
      setCars(prev => prev.map(car => 
        car._id === updatedCar._id ? updatedCar : car
      ));
      
      toast({
        title: "Car Updated",
        description: `${updatedCar.name} has been updated successfully`,
      });
      
      setIsEditDialogOpen(false);
      resetFormAndState();
    } catch (err) {
      console.error('Error updating car:', err);
      toast({
        title: "Error",
        description: "Failed to update car. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Open delete confirmation dialog
  const handleDeleteClick = (car: Car) => {
    setSelectedCar(car);
    setIsDeleteDialogOpen(true);
  };

  // Delete a car
  const handleDeleteCar = async () => {
    try {
      if (!selectedCar) return;
      
      const token = localStorage.getItem('token');
      
      const response = await fetch(`http://localhost:5000/api/cars/${selectedCar._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete car');
      }
      
      setCars(prev => prev.filter(car => car._id !== selectedCar._id));
      
      toast({
        title: "Car Deleted",
        description: `${selectedCar.name} has been deleted successfully`,
      });
      
      setIsDeleteDialogOpen(false);
      setSelectedCar(null);
    } catch (err) {
      console.error('Error deleting car:', err);
      toast({
        title: "Error",
        description: "Failed to delete car. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Toggle car availability
  const toggleCarAvailability = async (car: Car) => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`http://localhost:5000/api/cars/${car._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isActive: !car.isActive }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update car status');
      }
      
      const updatedCar = await response.json();
      
      setCars(prev => prev.map(c => 
        c._id === updatedCar._id ? updatedCar : c
      ));
      
      toast({
        title: `Car ${updatedCar.isActive ? 'Activated' : 'Deactivated'}`,
        description: `${updatedCar.name} has been ${updatedCar.isActive ? 'activated' : 'deactivated'} successfully`,
      });
    } catch (err) {
      console.error('Error updating car status:', err);
      toast({
        title: "Error",
        description: "Failed to update car status. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Export car data to CSV
  const exportToCSV = () => {
    try {
      // Create CSV content
      const headers = ['Name', 'Brand', 'Model', 'Type', 'Price', 'Transmission', 'Fuel', 'Seats', 'Status'];
      
      const csvContent = [
        headers.join(','),
        ...filteredCars.map(car => [
          car.name,
          car.brand,
          car.model,
          car.type,
          car.price,
          car.transmission,
          car.fuel,
          car.seats,
          car.isActive ? 'Active' : 'Inactive'
        ].join(','))
      ].join('\n');
      
      // Create download link
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `cars_export_${format(new Date(), 'yyyy-MM-dd')}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Export Successful",
        description: "Car data has been exported to CSV",
      });
    } catch (err) {
      console.error('Error exporting to CSV:', err);
      toast({
        title: "Export Failed",
        description: "Failed to export car data",
        variant: "destructive",
      });
    }
  };

  // Handle stock update dialog open
  const handleStockUpdate = (car: Car) => {
    setSelectedCar(car);
    setNewStock(car.stock);
    setIsStockDialogOpen(true);
  };

  // Update car stock
  const updateCarStock = async () => {
    try {
      if (!selectedCar) return;
      
      const token = localStorage.getItem('token');
      
      const response = await fetch(`http://localhost:5000/api/cars/${selectedCar._id}/stock`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ stock: newStock }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update car stock');
      }
      
      const updatedCar = await response.json();
      
      setCars(prev => prev.map(car => 
        car._id === updatedCar._id ? updatedCar : car
      ));
      
      toast({
        title: "Stock Updated",
        description: `${updatedCar.name} stock has been updated to ${updatedCar.stock}`,
      });
      
      setIsStockDialogOpen(false);
      setSelectedCar(null);
    } catch (err) {
      console.error('Error updating car stock:', err);
      toast({
        title: "Error",
        description: "Failed to update car stock. Please try again.",
        variant: "destructive",
      });
    }
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
            <h1 className="text-3xl font-bold tracking-tight">Car Management</h1>
            <p className="text-muted-foreground">
              Manage your fleet of rental cars
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1"
              onClick={exportToCSV}
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
            
            <Button
              className="h-8 gap-1"
              onClick={() => {
                resetFormAndState();
                setIsAddDialogOpen(true);
              }}
            >
              <Plus className="h-4 w-4" />
              Add Car
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <CardTitle>Your Fleet</CardTitle>
              
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search cars..."
                    className="pl-8 w-full sm:w-[200px] lg:w-[300px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="SUV">SUV</SelectItem>
                    <SelectItem value="Sedan">Sedan</SelectItem>
                    <SelectItem value="Hatchback">Hatchback</SelectItem>
                    <SelectItem value="MPV">MPV</SelectItem>
                  </SelectContent>
                </Select>
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
            ) : filteredCars.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Car className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No Cars Found</h3>
                <p className="text-sm text-muted-foreground mt-1 mb-4">
                  {searchQuery || filterType !== 'all'
                    ? "Try changing your search or filters"
                    : "Add your first car to get started"}
                </p>
                {(searchQuery || filterType !== 'all') && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('');
                      setFilterType('all');
                    }}
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]"></TableHead>
                      <TableHead className="cursor-pointer" onClick={() => {
                        if (sortField === 'name') {
                          setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                        } else {
                          setSortField('name');
                          setSortOrder('asc');
                        }
                      }}>
                        Car Info
                        {sortField === 'name' && (
                          <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                        )}
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => {
                        if (sortField === 'price') {
                          setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                        } else {
                          setSortField('price');
                          setSortOrder('asc');
                        }
                      }}>
                        Price
                        {sortField === 'price' && (
                          <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                        )}
                      </TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCars.map((car) => (
                      <TableRow key={car._id}>
                        <TableCell>
                          <div className="h-12 w-12 rounded overflow-hidden">
                            <img
                              src={car.image.startsWith('http') 
                                ? car.image 
                                : `http://localhost:5000${car.image}`}
                              alt={car.name}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/placeholder.svg';
                              }}
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{car.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {car.brand} {car.model}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>₹{car.price}/day</TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1 text-sm">
                            <Badge variant="outline" className="w-fit">
                              {car.type}
                            </Badge>
                            <span className="text-muted-foreground">
                              {car.transmission}, {car.fuel}, {car.seats} seats
                            </span>
                          </div>
                        </TableCell>                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <Badge 
                              variant={car.isActive ? "default" : "secondary"}
                              className="w-fit"
                            >
                              {car.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                            {car.isBooked && (
                              <Badge variant="destructive" className="w-fit">
                                Currently Booked
                              </Badge>
                            )}
                            <Badge 
                              variant={car.stock > 0 ? "outline" : "destructive"} 
                              className="w-fit"
                            >
                              {car.stock > 0 ? `${car.stock} in stock` : 'Out of stock'}
                            </Badge>
                          </div>
                        </TableCell>                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleStockUpdate(car)}
                              className="text-xs"
                            >
                              Stock: {car.stock}
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleEditClick(car)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleDeleteClick(car)}
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>      {/* Add Car Dialog */}      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>        <DialogContent className="max-w-5xl max-h-[95vh] p-0">
          <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 border-b sticky top-0 bg-white z-10">
            <DialogTitle className="text-xl sm:text-2xl font-bold text-primary">Add New Car</DialogTitle>
            <DialogDescription className="text-sm sm:text-base text-gray-600">
              Complete the form below to add a new car to your rental fleet.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddCar)} className="overflow-y-auto px-3 sm:px-6 py-3 sm:py-4" style={{ maxHeight: 'calc(95vh - 140px)' }}>
              {/* Car Preview Card */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 shadow-sm">
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-gray-800">
                  <Car className="h-5 w-5 text-primary" />
                  Car Preview
                </h3>
                <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-start">
                  <div className="w-full lg:w-1/3">
                    <div className="rounded-lg overflow-hidden shadow-md bg-white border border-gray-200">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Car Preview"
                          className="w-full h-40 sm:h-48 object-cover"
                        />
                      ) : (
                        <div className="w-full h-40 sm:h-48 flex items-center justify-center bg-gray-100 border-b">
                          <Car className="h-12 sm:h-16 w-12 sm:w-16 text-gray-300" />
                        </div>
                      )}
                      <div className="p-3 sm:p-4">
                        <p className="font-semibold text-base sm:text-lg truncate">
                          {form.watch('name') || 'Car Name'}
                        </p>
                        <p className="text-gray-600 text-xs sm:text-sm truncate">
                          {form.watch('brand') || 'Brand'} {form.watch('model') || 'Model'}
                        </p>
                        <div className="mt-2 flex justify-between items-center">
                          <span className="text-primary font-bold text-sm sm:text-base">
                            ₹{form.watch('price') || '0'}<span className="text-xs text-gray-500">/day</span>
                          </span>
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            {form.watch('isActive') ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 sm:mt-4">
                      <FormLabel htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Upload Car Image</FormLabel>
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="text-sm border-primary/20 focus:border-primary"
                      />
                      {!imagePreview && (
                        <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          Please upload an image of the car
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="w-full lg:w-2/3">
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      <div className="flex items-center gap-2 text-xs sm:text-sm bg-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-gray-200">
                        <Users className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-primary" />
                        <span>{form.watch('seats') || '0'} Seats</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs sm:text-sm bg-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-gray-200">
                        <Fuel className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-primary" />
                        <span>{form.watch('fuel') || 'Fuel Type'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs sm:text-sm bg-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-gray-200">
                        <Settings className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-primary" />
                        <span>{form.watch('transmission') || 'Transmission'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs sm:text-sm bg-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-gray-200">
                        <Car className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-primary" />
                        <span>{form.watch('type') || 'Car Type'}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 sm:mt-4 bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-3">
                        {form.watch('description') || 'No description provided.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Main Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-3">
                  <h3 className="text-lg font-medium mb-4 text-gray-800 border-b pb-2">Basic Information</h3>
                </div>
                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Car Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Honda City" 
                          {...field} 
                          className="border-gray-300 focus:border-primary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Brand</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Honda" 
                          {...field} 
                          className="border-gray-300 focus:border-primary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Model</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="City ZX" 
                          {...field} 
                          className="border-gray-300 focus:border-primary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="md:col-span-3">
                  <h3 className="text-lg font-medium mb-4 text-gray-800 border-b pb-2">Specifications</h3>
                </div>
                
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Car Type</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-gray-300 focus:border-primary">
                            <SelectValue placeholder="Select car type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="SUV">SUV</SelectItem>
                          <SelectItem value="Sedan">Sedan</SelectItem>
                          <SelectItem value="Hatchback">Hatchback</SelectItem>
                          <SelectItem value="MPV">MPV</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="transmission"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Transmission</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-gray-300 focus:border-primary">
                            <SelectValue placeholder="Select transmission" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Manual">Manual</SelectItem>
                          <SelectItem value="Automatic">Automatic</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="fuel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Fuel Type</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-gray-300 focus:border-primary">
                            <SelectValue placeholder="Select fuel type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Petrol">Petrol</SelectItem>
                          <SelectItem value="Diesel">Diesel</SelectItem>
                          <SelectItem value="Electric">Electric</SelectItem>
                          <SelectItem value="Hybrid">Hybrid</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="seats"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Seating Capacity</FormLabel>
                      <Select 
                        onValueChange={(value) => field.onChange(parseInt(value))} 
                        defaultValue={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger className="border-gray-300 focus:border-primary">
                            <SelectValue placeholder="Select seats" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="2">2 Seats</SelectItem>
                          <SelectItem value="4">4 Seats</SelectItem>
                          <SelectItem value="5">5 Seats</SelectItem>
                          <SelectItem value="7">7 Seats</SelectItem>
                          <SelectItem value="8">8 Seats</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="md:col-span-3">
                  <h3 className="text-lg font-medium mb-4 text-gray-800 border-b pb-2">Rental Details</h3>
                </div>
                
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Price (₹/day)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
                          <Input 
                            type="number" 
                            placeholder="2500" 
                            className="pl-7 border-gray-300 focus:border-primary" 
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Number of Cars</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="0" 
                          className="border-gray-300 focus:border-primary"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        How many of this car model are available for rent
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-primary"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="font-medium">Active Status</FormLabel>
                        <FormDescription className="text-xs">
                          {field.value ? 'This car will be available for booking' : 'This car will be hidden from customers'}
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                
                <div className="md:col-span-3">
                  <h3 className="text-lg font-medium mb-4 text-gray-800 border-b pb-2">Additional Information</h3>
                </div>
                
                <div className="md:col-span-3">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Provide a detailed description of the car including its condition, unique features, and any special notes for renters" 
                            className="border-gray-300 focus:border-primary resize-none min-h-[120px]"
                            {...field}
                            rows={4}
                          />
                        </FormControl>
                        <FormDescription className="text-xs">
                          A good description helps customers make informed decisions
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="md:col-span-3">
                  <FormField
                    control={form.control}
                    name="features"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Features</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="AC, Power Steering, Power Windows, Bluetooth, USB Charger, etc. (comma separated)" 
                            className="border-gray-300 focus:border-primary"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-xs">
                          List the key features that make this car attractive to renters
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>                <div className="px-3 sm:px-6 py-3 sm:py-4 bg-gray-50 border-t sticky bottom-0">
                <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setIsAddDialogOpen(false);
                      resetFormAndState();
                    }}
                    className="w-full sm:w-auto border-gray-300"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Car
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>{/* Edit Car Dialog */}      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] p-0">
          <DialogHeader className="px-6 pt-6 pb-4 border-b">
            <DialogTitle className="text-2xl font-bold text-primary">Edit Car</DialogTitle>
            <DialogDescription className="text-base text-gray-600">
              Update the details of {selectedCar?.name}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdateCar)} className="overflow-y-auto px-6 py-4" style={{ maxHeight: 'calc(90vh - 180px)' }}>
              {/* Car Preview Card */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 shadow-sm">
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-gray-800">
                  <Car className="h-5 w-5 text-primary" />
                  Car Preview
                </h3>
                <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-start">
                  <div className="w-full lg:w-1/3">
                    <div className="rounded-lg overflow-hidden shadow-md bg-white border border-gray-200">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Car Preview"
                          className="w-full h-40 sm:h-48 object-cover"
                        />
                      ) : (
                        <div className="w-full h-40 sm:h-48 flex items-center justify-center bg-gray-100 border-b">
                          <Car className="h-12 sm:h-16 w-12 sm:w-16 text-gray-300" />
                        </div>
                      )}
                      <div className="p-3 sm:p-4">
                        <p className="font-semibold text-base sm:text-lg truncate">
                          {form.watch('name') || 'Car Name'}
                        </p>
                        <p className="text-gray-600 text-xs sm:text-sm truncate">
                          {form.watch('brand') || 'Brand'} {form.watch('model') || 'Model'}
                        </p>
                        <div className="mt-2 flex justify-between items-center">
                          <span className="text-primary font-bold text-sm sm:text-base">
                            ₹{form.watch('price') || '0'}<span className="text-xs text-gray-500">/day</span>
                          </span>
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            {form.watch('isActive') ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 sm:mt-4">
                      <FormLabel htmlFor="editImage" className="block text-sm font-medium text-gray-700 mb-1">Update Car Image</FormLabel>
                      <Input
                        id="editImage"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="border-primary/20 focus:border-primary"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Leave empty to keep current image
                      </p>
                    </div>
                  </div>
                  
                  <div className="w-full lg:w-2/3">
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      <div className="flex items-center gap-2 text-xs sm:text-sm bg-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-gray-200">
                        <Users className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-primary" />
                        <span>{form.watch('seats') || '0'} Seats</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs sm:text-sm bg-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-gray-200">
                        <Fuel className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-primary" />
                        <span>{form.watch('fuel') || 'Fuel Type'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs sm:text-sm bg-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-gray-200">
                        <Settings className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-primary" />
                        <span>{form.watch('transmission') || 'Transmission'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs sm:text-sm bg-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-gray-200">
                        <Car className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-primary" />
                        <span>{form.watch('type') || 'Car Type'}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 sm:mt-4 bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-3">
                        {form.watch('description') || 'No description provided.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Main Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-3">
                  <h3 className="text-lg font-medium mb-4 text-gray-800 border-b pb-2">Basic Information</h3>
                </div>
                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Car Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Honda City" 
                          {...field} 
                          className="border-gray-300 focus:border-primary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Brand</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Honda" 
                          {...field} 
                          className="border-gray-300 focus:border-primary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Model</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="City ZX" 
                          {...field} 
                          className="border-gray-300 focus:border-primary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="md:col-span-3">
                  <h3 className="text-lg font-medium mb-4 text-gray-800 border-b pb-2">Specifications</h3>
                </div>
                
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Car Type</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-gray-300 focus:border-primary">
                            <SelectValue placeholder="Select car type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="SUV">SUV</SelectItem>
                          <SelectItem value="Sedan">Sedan</SelectItem>
                          <SelectItem value="Hatchback">Hatchback</SelectItem>
                          <SelectItem value="MPV">MPV</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="transmission"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Transmission</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-gray-300 focus:border-primary">
                            <SelectValue placeholder="Select transmission" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Manual">Manual</SelectItem>
                          <SelectItem value="Automatic">Automatic</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="fuel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Fuel Type</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-gray-300 focus:border-primary">
                            <SelectValue placeholder="Select fuel type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Petrol">Petrol</SelectItem>
                          <SelectItem value="Diesel">Diesel</SelectItem>
                          <SelectItem value="Electric">Electric</SelectItem>
                          <SelectItem value="Hybrid">Hybrid</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="seats"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Seating Capacity</FormLabel>
                      <Select 
                        onValueChange={(value) => field.onChange(parseInt(value))} 
                        value={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger className="border-gray-300 focus:border-primary">
                            <SelectValue placeholder="Select seats" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="2">2 Seats</SelectItem>
                          <SelectItem value="4">4 Seats</SelectItem>
                          <SelectItem value="5">5 Seats</SelectItem>
                          <SelectItem value="7">7 Seats</SelectItem>
                          <SelectItem value="8">8 Seats</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="md:col-span-3">
                  <h3 className="text-lg font-medium mb-4 text-gray-800 border-b pb-2">Rental Details</h3>
                </div>
                
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Price (₹/day)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
                          <Input 
                            type="number" 
                            placeholder="2500" 
                            className="pl-7 border-gray-300 focus:border-primary" 
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Number of Cars</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="1" 
                          className="border-gray-300 focus:border-primary"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        How many of this car model are available for rent
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-primary"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="font-medium">Active Status</FormLabel>
                        <FormDescription className="text-xs">
                          {field.value ? 'This car will be available for booking' : 'This car will be hidden from customers'}
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                
                <div className="md:col-span-3">
                  <h3 className="text-lg font-medium mb-4 text-gray-800 border-b pb-2">Additional Information</h3>
                </div>
                
                <div className="md:col-span-3">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Provide a detailed description of the car including its condition, unique features, and any special notes for renters" 
                            className="border-gray-300 focus:border-primary resize-none min-h-[120px]"
                            {...field}
                            rows={4}
                          />
                        </FormControl>
                        <FormDescription className="text-xs">
                          A good description helps customers make informed decisions
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="md:col-span-3">
                  <FormField
                    control={form.control}
                    name="features"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Features</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="AC, Power Steering, Power Windows, Bluetooth, USB Charger, etc. (comma separated)" 
                            className="border-gray-300 focus:border-primary"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-xs">
                          List the key features that make this car attractive to renters
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
                <div className="px-6 py-4 bg-gray-50 border-t sticky bottom-0">
                <div className="flex justify-end gap-3">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setIsEditDialogOpen(false);
                      resetFormAndState();
                    }}
                    className="border-gray-300"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-primary hover:bg-primary/90 text-white"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Update Car
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>{/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold text-red-600 flex items-center gap-2">
              <Trash2 className="h-5 w-5" />
              Delete Car
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              Are you sure you want to delete <span className="font-medium text-gray-900">{selectedCar?.name}</span>? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          {selectedCar && (
            <div className="my-4 p-4 bg-gray-50 rounded-lg border border-gray-200 flex items-center space-x-4">
              <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                <img
                  src={selectedCar.image.startsWith('http') 
                    ? selectedCar.image 
                    : `http://localhost:5000${selectedCar.image}`}
                  alt={selectedCar.name}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                  }}
                />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{selectedCar.name}</h4>
                <p className="text-sm text-gray-500">
                  {selectedCar.brand} {selectedCar.model} • {selectedCar.type} • ₹{selectedCar.price}/day
                </p>
                <div className="mt-1 flex items-center">
                  <Badge 
                    variant={selectedCar.isActive ? "default" : "secondary"}
                    className="text-xs mr-2"
                  >
                    {selectedCar.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                  <Badge 
                    variant={selectedCar.stock > 0 ? "outline" : "destructive"} 
                    className="text-xs"
                  >
                    {selectedCar.stock > 0 ? `${selectedCar.stock} in stock` : 'Out of stock'}
                  </Badge>
                </div>
              </div>
            </div>
          )}
          
          <div className="bg-red-50 p-3 rounded-md border border-red-100 text-sm text-red-800 mb-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Warning: Permanent Action</p>
                <p className="mt-1">This will permanently remove the car from your database and all associated booking records.</p>
              </div>
            </div>
          </div>
          
          <AlertDialogFooter>
            <AlertDialogCancel 
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setSelectedCar(null);
              }}
              className="border-gray-300"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteCar} 
              className="bg-red-600 hover:bg-red-700 text-white focus:ring-red-500"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Car
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>{/* Stock Update Dialog */}
      <Dialog open={isStockDialogOpen} onOpenChange={setIsStockDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-primary">Update Car Stock</DialogTitle>
            <DialogDescription className="text-base text-gray-600">
              {selectedCar?.name && `Adjust the available quantity for ${selectedCar.name}`}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            {selectedCar && (
              <div className="flex items-center space-x-4 mb-6 p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="h-14 w-14 rounded-md overflow-hidden flex-shrink-0">
                  <img
                    src={selectedCar.image.startsWith('http') 
                      ? selectedCar.image 
                      : `http://localhost:5000${selectedCar.image}`}
                    alt={selectedCar.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder.svg';
                    }}
                  />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{selectedCar.name}</h4>
                  <p className="text-sm text-gray-500">{selectedCar.brand} {selectedCar.model}</p>
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="stock" className="text-sm font-medium text-gray-700">Current Stock: <span className="font-bold text-primary">{selectedCar?.stock || 0}</span></Label>
                <div className="mt-2 relative">
                  <Input
                    id="stock"
                    type="number"
                    min={0}
                    value={newStock}
                    onChange={(e) => setNewStock(parseInt(e.target.value) || 0)}
                    className="pr-16 border-gray-300 focus:border-primary"
                  />
                  <div className="absolute right-2 top-2.5">
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0 text-gray-400"
                      onClick={() => setNewStock(Math.max(0, newStock - 1))}
                    >
                      <span>-</span>
                    </Button>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0 text-gray-400"
                      onClick={() => setNewStock(newStock + 1)}
                    >
                      <span>+</span>
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="bg-amber-50 p-3 rounded-md border border-amber-100 text-sm text-amber-800">
                {newStock === 0 ? (
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Setting stock to zero will make this car unavailable for booking.</p>
                      <p className="mt-1 text-xs">It will not appear on the customer-facing pages until stock is increased.</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">This car will be available for booking.</p>
                      <p className="mt-1 text-xs">Customers will be able to see and book this car on the website.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsStockDialogOpen(false)}
              className="border-gray-300"
            >
              Cancel
            </Button>
            <Button 
              onClick={updateCarStock}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              Update Stock
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCars;
