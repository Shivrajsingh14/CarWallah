// filepath: src/pages/admin/Settings.tsx
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { 
  Bell, 
  Mail, 
  Shield, 
  Database, 
  UploadCloud,
  Download,
  Trash2,
  HardDrive
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const AdminSettings = () => {
  const [loadingGeneral, setLoadingGeneral] = useState(false);
  const [loadingBackup, setLoadingBackup] = useState(false);
  
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'Carwallah Rentals',
    siteDescription: 'Premium car rental service in Udaipur',
    contactEmail: 'admin@carwallah.com',
    phoneNumber: '+91 1234567890',
    address: 'Lake Palace Road, Udaipur, Rajasthan, India',
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    bookingAlerts: true,
    marketingEmails: false,
    systemUpdates: true,
    lowInventoryAlerts: true,
  });

  const handleGeneralSettingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setGeneralSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleNotificationToggle = (setting: string) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof notificationSettings],
    }));
  };

  const handleGeneralSettingsSave = async () => {
    setLoadingGeneral(true);
    
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Settings Saved",
        description: "Your general settings have been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Failed to Save",
        description: "There was a problem saving your settings.",
        variant: "destructive",
      });
    } finally {
      setLoadingGeneral(false);
    }
  };

  const handleBackupDatabase = async () => {
    setLoadingBackup(true);
    
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Backup Created",
        description: "Database backup has been created successfully.",
      });
    } catch (error) {
      toast({
        title: "Backup Failed",
        description: "There was a problem creating the database backup.",
        variant: "destructive",
      });
    } finally {
      setLoadingBackup(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your application settings and preferences.
        </p>
      </div>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 md:grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Configure your website's general information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    name="siteName"
                    value={generalSettings.siteName}
                    onChange={handleGeneralSettingChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea
                    id="siteDescription"
                    name="siteDescription"
                    value={generalSettings.siteDescription}
                    onChange={handleGeneralSettingChange}
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    value={generalSettings.contactEmail}
                    onChange={handleGeneralSettingChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={generalSettings.phoneNumber}
                    onChange={handleGeneralSettingChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={generalSettings.address}
                    onChange={handleGeneralSettingChange}
                    rows={3}
                  />
                </div>
                
                <Button onClick={handleGeneralSettingsSave} disabled={loadingGeneral}>
                  {loadingGeneral ? 'Saving...' : 'Save Changes'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Configure how you receive notifications and alerts.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Receive emails for important system events
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={() => handleNotificationToggle('emailNotifications')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Bell className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Booking Alerts</p>
                      <p className="text-sm text-muted-foreground">
                        Get notified when new bookings are made
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationSettings.bookingAlerts}
                    onCheckedChange={() => handleNotificationToggle('bookingAlerts')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Marketing Emails</p>
                      <p className="text-sm text-muted-foreground">
                        Receive marketing and promotional emails
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationSettings.marketingEmails}
                    onCheckedChange={() => handleNotificationToggle('marketingEmails')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Bell className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">System Updates</p>
                      <p className="text-sm text-muted-foreground">
                        Get notified about system updates and maintenance
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationSettings.systemUpdates}
                    onCheckedChange={() => handleNotificationToggle('systemUpdates')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Bell className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Low Inventory Alerts</p>
                      <p className="text-sm text-muted-foreground">
                        Get notified when car availability is low
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationSettings.lowInventoryAlerts}
                    onCheckedChange={() => handleNotificationToggle('lowInventoryAlerts')}
                  />
                </div>
                
                <Button onClick={() => {
                  toast({
                    title: "Notification Settings Saved",
                    description: "Your notification preferences have been updated.",
                  });
                }}>
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Configure security options for your account and application.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Shield className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
                
                <Separator />
                
                <div>
                  <div className="flex items-center space-x-4 mb-4">
                    <Shield className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Session Management</p>
                      <p className="text-sm text-muted-foreground">
                        Manage your active sessions and devices
                      </p>
                    </div>
                  </div>
                  
                  <div className="rounded-md border p-4 mb-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Current Session</p>
                        <p className="text-sm text-muted-foreground">
                          Windows • Chrome • Last active now
                        </p>
                      </div>
                      <div className="text-sm px-2 py-1 rounded bg-green-100 text-green-800">
                        Active
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Logout from All Other Devices
                  </Button>
                </div>
                
                <Separator />
                
                <div>
                  <div className="flex items-center space-x-4 mb-4">
                    <Shield className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">API Access</p>
                      <p className="text-sm text-muted-foreground">
                        Manage API keys and access
                      </p>
                    </div>
                  </div>
                  
                  <Button variant="outline">Manage API Keys</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="system" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Maintenance</CardTitle>
                <CardDescription>
                  Manage database backups and system maintenance.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center space-x-4 mb-4">
                    <Database className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Database Backup</p>
                      <p className="text-sm text-muted-foreground">
                        Create and manage database backups
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      variant="outline" 
                      className="flex items-center justify-center"
                      onClick={handleBackupDatabase}
                      disabled={loadingBackup}
                    >
                      <UploadCloud className="mr-2 h-4 w-4" />
                      {loadingBackup ? 'Creating...' : 'Create Backup'}
                    </Button>
                    
                    <Button variant="outline" className="flex items-center justify-center">
                      <Download className="mr-2 h-4 w-4" />
                      Download Latest
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <div className="flex items-center space-x-4 mb-4">
                    <HardDrive className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Storage Management</p>
                      <p className="text-sm text-muted-foreground">
                        Manage image uploads and system storage
                      </p>
                    </div>
                  </div>
                  
                  <div className="rounded-md border p-4 mb-4">
                    <div className="mb-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Storage Used</span>
                        <span>45% (450MB / 1GB)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full w-[45%]"></div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Mostly used by car images and system files
                    </p>
                  </div>
                  
                  <Button variant="outline" className="flex items-center justify-center text-red-600 hover:bg-red-50 hover:text-red-700">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear Temporary Files
                  </Button>
                </div>
                
                <Separator />
                
                <div>
                  <div className="flex items-center space-x-4 mb-4">
                    <div>
                      <p className="font-medium">System Information</p>
                      <p className="text-sm text-muted-foreground">
                        Technical details about the application
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-1 border-b">
                      <span className="font-medium">Node.js Version:</span>
                      <span>v18.17.0</span>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                      <span className="font-medium">MongoDB Version:</span>
                      <span>6.0.6</span>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                      <span className="font-medium">React Version:</span>
                      <span>18.2.0</span>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                      <span className="font-medium">Last Updated:</span>
                      <span>Today at 10:45 AM</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="font-medium">Environment:</span>
                      <span className="px-2 py-0.5 rounded text-xs bg-green-100 text-green-800">Production</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
