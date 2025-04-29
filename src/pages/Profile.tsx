
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
    firstName: 'Rahat',
    lastName: 'Shafi',
    email: 'i221061@nu.edu.pk',
    phone: '+92 328 8363182',
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
                      <AvatarImage src="data:image/jpeg;base64,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" />
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
