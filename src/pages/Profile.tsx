
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Car, CreditCard, Clock, Calendar, User, Settings, Bell, Shield, LogOut, ChevronRight } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

// Mock booking history data
const bookingHistory = [
  {
    id: 'booking-1',
    spotId: 'A2',
    location: 'Downtown Parking Garage',
    date: '2023-06-15',
    timeRange: '9:00 AM - 11:30 AM',
    price: 8.75,
    status: 'completed'
  },
  {
    id: 'booking-2',
    spotId: 'C5',
    location: 'City Center Parking',
    date: '2023-06-10',
    timeRange: '2:00 PM - 5:00 PM',
    price: 12.50,
    status: 'completed'
  },
  {
    id: 'booking-3',
    spotId: 'B1',
    location: 'Central Plaza Parking',
    date: '2023-06-22',
    timeRange: '8:00 AM - 6:00 PM',
    price: 32.00,
    status: 'upcoming'
  },
];

// Mock vehicles data
const vehicles = [
  {
    id: 'vehicle-1',
    licensePlate: 'ABC-123',
    make: 'Toyota',
    model: 'Camry',
    year: '2019',
    type: 'Sedan',
    isDefault: true
  },
  {
    id: 'vehicle-2',
    licensePlate: 'XYZ-789',
    make: 'Tesla',
    model: 'Model 3',
    year: '2021',
    type: 'Electric',
    isDefault: false
  }
];

// Mock payment methods
const paymentMethods = [
  {
    id: 'payment-1',
    type: 'credit',
    last4: '4242',
    expiry: '05/25',
    brand: 'Visa',
    isDefault: true
  },
  {
    id: 'payment-2',
    type: 'paypal',
    email: 'user@example.com',
    isDefault: false
  }
];

const Profile = () => {
  const [editMode, setEditMode] = useState(false);

  // Mock user data
  const userData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    memberSince: 'June 2022',
    bookings: 15
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-6 animate-fade-in">
                <Card className="shadow-elegant overflow-hidden">
                  <div className="bg-primary/10 p-6 flex flex-col items-center">
                    <Avatar className="h-20 w-20 border-2 border-white">
                      <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <h2 className="mt-4 font-medium text-lg">{userData.firstName} {userData.lastName}</h2>
                    <Badge variant="secondary" className="mt-1">Premium Member</Badge>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between text-sm py-2">
                      <span className="text-muted-foreground">Member since</span>
                      <span className="font-medium">{userData.memberSince}</span>
                    </div>
                    <div className="flex justify-between text-sm py-2">
                      <span className="text-muted-foreground">Total bookings</span>
                      <span className="font-medium">{userData.bookings}</span>
                    </div>
                    <Separator className="my-2" />
                    <nav className="space-y-1 mt-4">
                      {[
                        { name: 'Account', icon: User },
                        { name: 'Notifications', icon: Bell },
                        { name: 'Privacy', icon: Shield },
                        { name: 'Settings', icon: Settings },
                      ].map((item) => (
                        <Button 
                          key={item.name}
                          variant="ghost" 
                          className="w-full justify-start h-10"
                        >
                          <item.icon className="mr-2 h-4 w-4" />
                          {item.name}
                        </Button>
                      ))}
                      <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 h-10">
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign out
                      </Button>
                    </nav>
                  </div>
                </Card>
                
                <Card className="shadow-elegant">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Need Help?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <Button variant="ghost" className="w-full justify-start h-9">
                        Contact Support
                      </Button>
                      <Button variant="ghost" className="w-full justify-start h-9">
                        FAQs
                      </Button>
                      <Button variant="ghost" className="w-full justify-start h-9">
                        Report an Issue
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Main content */}
            <div className="lg:col-span-3 space-y-8 animate-fade-in">
              <Tabs defaultValue="profile">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="bookings">Bookings</TabsTrigger>
                  <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
                  <TabsTrigger value="payment">Payment</TabsTrigger>
                </TabsList>
                
                {/* Profile Tab */}
                <TabsContent value="profile" className="mt-6">
                  <Card className="shadow-elegant">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>Manage your personal details</CardDescription>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setEditMode(!editMode)}
                      >
                        {editMode ? 'Cancel' : 'Edit Profile'}
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input 
                            id="firstName" 
                            readOnly={!editMode} 
                            defaultValue={userData.firstName}
                            className={!editMode ? 'bg-secondary/50' : ''}
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input 
                            id="lastName" 
                            readOnly={!editMode} 
                            defaultValue={userData.lastName}
                            className={!editMode ? 'bg-secondary/50' : ''}
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            readOnly={!editMode} 
                            defaultValue={userData.email}
                            className={!editMode ? 'bg-secondary/50' : ''}
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input 
                            id="phone" 
                            readOnly={!editMode} 
                            defaultValue={userData.phone}
                            className={!editMode ? 'bg-secondary/50' : ''}
                          />
                        </div>
                      </div>
                    </CardContent>
                    {editMode && (
                      <CardFooter className="flex justify-end border-t pt-6">
                        <Button>Save Changes</Button>
                      </CardFooter>
                    )}
                  </Card>
                  
                  <Card className="shadow-elegant mt-6">
                    <CardHeader>
                      <CardTitle>Notification Preferences</CardTitle>
                      <CardDescription>Manage how you receive notifications</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { title: 'Booking Confirmations', description: 'Receive notifications when you book a parking spot' },
                          { title: 'Booking Reminders', description: 'Get reminders before your parking reservation begins' },
                          { title: 'Parking Updates', description: 'Stay informed about changes to your parking reservations' },
                          { title: 'Promotions & Offers', description: 'Receive special deals and promotional offers' },
                        ].map((item, index) => (
                          <div key={index} className="flex items-center justify-between py-3">
                            <div>
                              <h4 className="text-sm font-medium">{item.title}</h4>
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                            <Switch />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Bookings Tab */}
                <TabsContent value="bookings" className="mt-6">
                  <Card className="shadow-elegant">
                    <CardHeader>
                      <CardTitle>Booking History</CardTitle>
                      <CardDescription>View your past and upcoming bookings</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {bookingHistory.map((booking) => (
                          <div 
                            key={booking.id} 
                            className="flex flex-col sm:flex-row justify-between p-4 rounded-lg border"
                          >
                            <div className="flex-grow space-y-1">
                              <div className="flex items-center text-sm">
                                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span>{booking.date}</span>
                                <Clock className="ml-4 mr-2 h-4 w-4 text-muted-foreground" />
                                <span>{booking.timeRange}</span>
                              </div>
                              <h3 className="font-medium">
                                {booking.location} - Spot {booking.spotId}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                Booking #{booking.id.split('-')[1]}
                              </p>
                            </div>
                            
                            <div className="flex flex-col sm:items-end mt-4 sm:mt-0">
                              <Badge className={booking.status === 'upcoming' ? 'bg-blue-500' : 'bg-green-500'}>
                                {booking.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                              </Badge>
                              <p className="font-medium mt-2">${booking.price.toFixed(2)}</p>
                              <Button variant="ghost" size="sm" className="mt-2 h-7 px-2 text-xs">
                                View Details <ChevronRight className="ml-1 h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-center border-t pt-6">
                      <Button variant="outline">View All Bookings</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                {/* Vehicles Tab */}
                <TabsContent value="vehicles" className="mt-6">
                  <Card className="shadow-elegant">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Your Vehicles</CardTitle>
                        <CardDescription>Manage your registered vehicles</CardDescription>
                      </div>
                      <Button size="sm">
                        Add Vehicle
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {vehicles.map((vehicle) => (
                          <div 
                            key={vehicle.id} 
                            className="flex flex-col sm:flex-row justify-between p-4 rounded-lg border"
                          >
                            <div className="flex items-center">
                              <div className="bg-secondary rounded-full p-3 mr-4">
                                <Car className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <div className="flex items-center">
                                  <h3 className="font-medium">{vehicle.make} {vehicle.model} ({vehicle.year})</h3>
                                  {vehicle.isDefault && (
                                    <Badge variant="outline" className="ml-2">Default</Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {vehicle.licensePlate} • {vehicle.type}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2 mt-4 sm:mt-0">
                              <Button variant="outline" size="sm">Edit</Button>
                              {!vehicle.isDefault && (
                                <Button variant="outline" size="sm">
                                  Make Default
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Payment Tab */}
                <TabsContent value="payment" className="mt-6">
                  <Card className="shadow-elegant">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Payment Methods</CardTitle>
                        <CardDescription>Manage your payment options</CardDescription>
                      </div>
                      <Button size="sm">
                        Add Payment Method
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {paymentMethods.map((method) => (
                          <div 
                            key={method.id} 
                            className="flex flex-col sm:flex-row justify-between p-4 rounded-lg border"
                          >
                            <div className="flex items-center">
                              <div className="bg-secondary rounded-full p-3 mr-4">
                                <CreditCard className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <div className="flex items-center">
                                  <h3 className="font-medium">
                                    {method.type === 'credit' 
                                      ? `${method.brand} •••• ${method.last4}` 
                                      : `PayPal (${method.email})`}
                                  </h3>
                                  {method.isDefault && (
                                    <Badge variant="outline" className="ml-2">Default</Badge>
                                  )}
                                </div>
                                {method.type === 'credit' && (
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Expires {method.expiry}
                                  </p>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2 mt-4 sm:mt-0">
                              {!method.isDefault && (
                                <Button variant="outline" size="sm">
                                  Make Default
                                </Button>
                              )}
                              <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                Remove
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="shadow-elegant mt-6">
                    <CardHeader>
                      <CardTitle>Billing History</CardTitle>
                      <CardDescription>View your past payments and receipts</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8 px-4">
                        <Clock className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                        <h3 className="mt-4 font-medium">No billing history yet</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Your payment history will appear here after your first booking
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
