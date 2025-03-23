
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, MapPin, Filter, Clock, Car } from 'lucide-react';
import ParkingSpot, { ParkingSpotStatus } from '@/components/ParkingSpot';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Mock data for parking spots
const mockParkingSpots = [
  {
    id: 'spot-1',
    status: 'available' as ParkingSpotStatus,
    spotNumber: 'A1',
    floor: '1',
    price: 3.50,
    isAccessible: false,
    isCharging: false
  },
  {
    id: 'spot-2',
    status: 'available' as ParkingSpotStatus,
    spotNumber: 'A2',
    floor: '1',
    price: 3.50,
    isAccessible: true,
    isCharging: false
  },
  {
    id: 'spot-3',
    status: 'occupied' as ParkingSpotStatus,
    spotNumber: 'A3',
    floor: '1',
    occupiedUntil: '14:30',
    isAccessible: false,
    isCharging: false
  },
  {
    id: 'spot-4',
    status: 'available' as ParkingSpotStatus,
    spotNumber: 'B1',
    floor: '2',
    price: 4.00,
    isAccessible: false,
    isCharging: true
  },
  {
    id: 'spot-5',
    status: 'reserved' as ParkingSpotStatus,
    spotNumber: 'B2',
    floor: '2',
    occupiedUntil: '17:00',
    isAccessible: false,
    isCharging: false
  },
  {
    id: 'spot-6',
    status: 'available' as ParkingSpotStatus,
    spotNumber: 'B3',
    floor: '2',
    price: 4.00,
    isAccessible: false,
    isCharging: false
  },
  {
    id: 'spot-7',
    status: 'charging' as ParkingSpotStatus,
    spotNumber: 'C1',
    floor: '3',
    occupiedUntil: '16:45',
    isAccessible: false,
    isCharging: true
  },
  {
    id: 'spot-8',
    status: 'available' as ParkingSpotStatus,
    spotNumber: 'C2',
    floor: '3',
    price: 4.50,
    isAccessible: false,
    isCharging: true
  },
];

// Mock data for locations
const locations = [
  { id: 'loc-1', name: 'Downtown Parking Garage', address: '123 Main St', totalSpots: 120, availableSpots: 45 },
  { id: 'loc-2', name: 'Central Plaza Parking', address: '456 Market Ave', totalSpots: 85, availableSpots: 12 },
  { id: 'loc-3', name: 'City Center Parking', address: '789 Park Rd', totalSpots: 200, availableSpots: 78 },
];

// Stats data
const statsData = [
  { 
    title: 'Available Spots', 
    value: '135', 
    change: '+12', 
    icon: <Car className="h-5 w-5 text-green-500" />
  },
  { 
    title: 'Current Occupancy', 
    value: '68%', 
    change: '-5%', 
    icon: <Clock className="h-5 w-5 text-amber-500" />
  },
  { 
    title: 'Avg Parking Time', 
    value: '2.3 hrs', 
    change: '+0.2', 
    icon: <Clock className="h-5 w-5 text-blue-500" />
  },
];

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('loc-1');
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  // Filter parking spots based on search term and selected filter
  const filteredSpots = mockParkingSpots.filter(spot => {
    const matchesSearch = spot.spotNumber.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          spot.floor.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedFilter === 'all') return matchesSearch;
    if (selectedFilter === 'available') return matchesSearch && spot.status === 'available';
    if (selectedFilter === 'accessible') return matchesSearch && spot.isAccessible;
    if (selectedFilter === 'charging') return matchesSearch && spot.isCharging;
    
    return matchesSearch;
  });

  const selectedLocationData = locations.find(loc => loc.id === selectedLocation);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold mb-2">Parking Dashboard</h1>
            <p className="text-muted-foreground">Find and book available parking spots in real-time</p>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-fade-up">
            {statsData.map((stat, index) => (
              <Card key={index} className="shadow-elegant">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                      <div className="flex items-baseline">
                        <h3 className="text-2xl font-bold">{stat.value}</h3>
                        <span className={`ml-2 text-xs font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                          {stat.change}
                        </span>
                      </div>
                    </div>
                    <div className="p-2 rounded-full bg-secondary">
                      {stat.icon}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Parking Garage Selection */}
          <Card className="mb-8 shadow-elegant animate-fade-up">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">Select Parking Location</CardTitle>
              <CardDescription>
                Choose a location to view available parking spots
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow">
                  <Select 
                    defaultValue={selectedLocation} 
                    onValueChange={setSelectedLocation}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map(location => (
                        <SelectItem key={location.id} value={location.id}>
                          {location.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Button className="flex items-center gap-2 whitespace-nowrap">
                  <MapPin className="h-4 w-4" />
                  <span>View on Map</span>
                </Button>
              </div>
              
              {selectedLocationData && (
                <div className="mt-4 pt-4 border-t flex flex-col sm:flex-row justify-between text-sm text-muted-foreground">
                  <p>{selectedLocationData.address}</p>
                  <p className="mt-1 sm:mt-0">
                    <span className="text-green-600 font-medium">{selectedLocationData.availableSpots}</span> of {selectedLocationData.totalSpots} spots available
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Filter Controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-6 animate-fade-up">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                type="text" 
                placeholder="Search by spot number or floor..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select 
                defaultValue={selectedFilter} 
                onValueChange={setSelectedFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter spots" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Spots</SelectItem>
                  <SelectItem value="available">Available Only</SelectItem>
                  <SelectItem value="accessible">Accessible</SelectItem>
                  <SelectItem value="charging">EV Charging</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Tabs for different floors */}
          <Tabs defaultValue="all" className="animate-fade-up">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Floors</TabsTrigger>
              <TabsTrigger value="floor-1">Floor 1</TabsTrigger>
              <TabsTrigger value="floor-2">Floor 2</TabsTrigger>
              <TabsTrigger value="floor-3">Floor 3</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredSpots.length > 0 ? (
                  filteredSpots.map((spot) => (
                    <ParkingSpot 
                      key={spot.id} 
                      {...spot} 
                      className="animate-fade-in"
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground">No parking spots match your criteria.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="floor-1" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredSpots
                  .filter(spot => spot.floor === '1')
                  .map((spot) => (
                    <ParkingSpot 
                      key={spot.id} 
                      {...spot} 
                      className="animate-fade-in"
                    />
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="floor-2" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredSpots
                  .filter(spot => spot.floor === '2')
                  .map((spot) => (
                    <ParkingSpot 
                      key={spot.id} 
                      {...spot} 
                      className="animate-fade-in"
                    />
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="floor-3" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredSpots
                  .filter(spot => spot.floor === '3')
                  .map((spot) => (
                    <ParkingSpot 
                      key={spot.id} 
                      {...spot} 
                      className="animate-fade-in"
                    />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
