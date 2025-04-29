
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingForm from '@/components/BookingForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, CreditCard, CheckCircle, Calendar } from 'lucide-react';

const Booking = () => {
  const [currentStep, setCurrentStep] = useState(1);
  
  // Animation on mount
  useEffect(() => {
    const elementsToAnimate = document.querySelectorAll('.animate-on-mount');
    elementsToAnimate.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('animate-fade-up');
        element.classList.remove('opacity-0');
      }, 100 * index);
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold mb-2">Book a Parking Spot</h1>
            <p className="text-muted-foreground">Reserve your parking space in advance</p>
          </div>
          
          {/* Booking process steps */}
          <div className="mb-10">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                {[
                  { step: 1, title: 'Select Details', icon: Calendar },
                  { step: 2, title: 'Review & Payment', icon: CreditCard },
                  { step: 3, title: 'Confirmation', icon: CheckCircle }
                ].map((item) => (
                  <div key={item.step} className="flex flex-col items-center animate-on-mount opacity-0">
                    <div 
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center mb-2
                        ${currentStep === item.step ? 'bg-primary text-white' : 
                          currentStep > item.step ? 'bg-green-100 text-green-600' : 'bg-secondary text-muted-foreground'}
                      `}
                    >
                      {currentStep > item.step ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <item.icon className="w-5 h-5" />
                      )}
                    </div>
                    <span className={`text-sm font-medium ${currentStep === item.step ? 'text-primary' : 'text-muted-foreground'}`}>
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Step lines */}
              <div className="hidden sm:flex items-center justify-between max-w-lg mx-auto -mt-20 mb-12">
                <div 
                  className={`h-0.5 w-full ${currentStep > 1 ? 'bg-primary' : 'bg-muted'}`}
                ></div>
                <div 
                  className={`h-0.5 w-full ${currentStep > 2 ? 'bg-primary' : 'bg-muted'}`}
                ></div>
              </div>
            </div>
          </div>
          
          {/* Booking content */}
          <div className="max-w-6xl mx-auto">
            {currentStep === 1 && (
              <div className="animate-fade-in">
                <Tabs defaultValue="form" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="form">Book by Form</TabsTrigger>
                    <TabsTrigger value="map">Book on Map</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="form" className="mt-0">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2">
                        <BookingForm />
                      </div>
                      
                      <div className="space-y-6">
                        <Card className="shadow-elegant">
                          <CardHeader>
                            <CardTitle className="text-lg">Need Assistance?</CardTitle>
                            <CardDescription>We're here to help with your parking needs</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="flex items-start space-x-3">
                                <div className="bg-primary/10 p-2 rounded-full">
                                  <Clock className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                  <h3 className="text-sm font-medium">24/7 Support</h3>
                                  <p className="text-xs text-muted-foreground">Our team is available anytime</p>
                                </div>
                              </div>
                              
                              <div className="pt-3 border-t text-sm">
                                <p className="font-medium mb-1">Contact us:</p>
                                <p className="text-muted-foreground">support@parkease.com</p>
                                <p className="text-muted-foreground">+92 (051) 1234567</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card className="shadow-elegant">
                          <CardHeader>
                            <CardTitle className="text-lg">Booking Tips</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-start space-x-2">
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>Book in advance for guaranteed spots.</span>
                              </li>
                              <li className="flex items-start space-x-2">
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>EV charging spots are marked with an icon.</span>
                              </li>
                              <li className="flex items-start space-x-2">
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>Special rates available for long-term bookings.</span>
                              </li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="map" className="mt-0">
                    <Card className="shadow-elegant">
                      <CardContent className="p-6">
                        <div className="h-[500px] flex items-center justify-center bg-secondary/50 rounded-lg border border-dashed">
                          <div className="text-center p-6">
                            <h3 className="text-lg font-medium mb-2">Interactive Map Coming Soon</h3>
                            <p className="text-muted-foreground">
                              Our interactive parking map is under development. Please use the booking form for now.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            )}
            
            {/* Step 2 and 3 placeholders */}
            {currentStep === 2 && (
              <Card className="shadow-elegant animate-fade-in">
                <CardHeader>
                  <CardTitle>Review & Payment</CardTitle>
                  <CardDescription>Review your booking details and complete payment</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="h-[400px] flex items-center justify-center bg-secondary/50 rounded-lg border border-dashed">
                    <div className="text-center p-6">
                      <h3 className="text-lg font-medium mb-2">Payment System Coming Soon</h3>
                      <p className="text-muted-foreground">
                        Our payment processing system is under development.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {currentStep === 3 && (
              <Card className="shadow-elegant animate-fade-in">
                <CardHeader>
                  <CardTitle>Booking Confirmation</CardTitle>
                  <CardDescription>Your parking spot has been successfully reserved</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="h-[400px] flex items-center justify-center bg-secondary/50 rounded-lg border border-dashed">
                    <div className="text-center p-6">
                      <h3 className="text-lg font-medium mb-2">Confirmation System Coming Soon</h3>
                      <p className="text-muted-foreground">
                        The booking confirmation system is under development.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Booking;
