
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, MapPin, Clock, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

const Index = () => {
  const navigate = useNavigate();
  const featuresRef = useRef<HTMLDivElement>(null);
  
  // Animation observer setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
            entry.target.classList.remove('opacity-0');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 lg:pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-pretty leading-tight mb-6">
              Smart Parking for the <span className="text-primary">Modern City</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Find, book, and manage parking spaces with ease. Save time and avoid the stress of finding parking in busy areas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="shadow-sm"
                onClick={() => navigate('/dashboard')}
              >
                Find Parking
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={scrollToFeatures}
              >
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="lg:w-1/2 mt-12 lg:mt-0 pl-0 lg:pl-10">
            <div className="relative animate-fade-in">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-lg blur opacity-50"></div>
              <img 
                src="https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" 
                alt="Urban parking facility" 
                className="relative rounded-lg shadow-elegant object-cover h-[400px] w-full object-center"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section 
        ref={featuresRef} 
        className="py-20 px-6 bg-secondary/50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 animate-on-scroll opacity-0">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto animate-on-scroll opacity-0">
              Our platform makes parking hassle-free with just a few simple steps.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <MapPin className="h-10 w-10 text-primary" />,
                title: "Find Parking",
                description: "Easily locate available parking spots near your destination with real-time availability."
              },
              {
                icon: <Clock className="h-10 w-10 text-primary" />,
                title: "Reserve in Advance",
                description: "Book your parking space ahead of time to guarantee availability when you arrive."
              },
              {
                icon: <CreditCard className="h-10 w-10 text-primary" />,
                title: "Pay Securely",
                description: "Make contactless payments through our secure platform with multiple payment options."
              },
              {
                icon: <Car className="h-10 w-10 text-primary" />,
                title: "Park Worry-Free",
                description: "Arrive at your reserved spot and park with confidence, knowing your space is waiting."
              }
            ].map((feature, index) => (
              <Card key={index} className="border-none shadow-elegant animate-on-scroll opacity-0">
                <CardContent className="p-6">
                  <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-primary text-white p-8 lg:p-12 shadow-elegant">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.1),transparent)]"></div>
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between">
              <div className="max-w-2xl mb-8 lg:mb-0">
                <h2 className="text-3xl font-bold mb-4">Ready to simplify your parking experience?</h2>
                <p className="text-white/80">
                  Join thousands of drivers who have already made parking stress-free with our platform.
                </p>
              </div>
              <Button 
                size="lg" 
                variant="secondary"
                className="whitespace-nowrap"
                onClick={() => navigate('/dashboard')}
              >
                Get Started Now
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 animate-on-scroll opacity-0">What Our Users Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto animate-on-scroll opacity-0">
              Here's what people are saying about their experience with our parking platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Finding parking in the city used to be my biggest headache. Now I just open the app and have a spot waiting for me. Game changer!",
                name: "Sarah Johnson",
                title: "Daily Commuter"
              },
              {
                quote: "As a business traveler, I need reliability. This service has never let me down and has saved me countless hours of circling parking garages.",
                name: "Michael Chen",
                title: "Business Executive"
              },
              {
                quote: "The ability to reserve parking before events has made such a difference. I no longer stress about where to park when going downtown.",
                name: "Emily Rodriguez",
                title: "Event Attendee"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="bg-background border animate-on-scroll opacity-0">
                <CardContent className="p-6">
                  <div className="mb-4 text-primary">
                    {Array(5).fill(0).map((_, i) => (
                      <span key={i} className="mr-1">★</span>
                    ))}
                  </div>
                  <p className="italic mb-6 text-foreground/90">{testimonial.quote}</p>
                  <div>
                    <h3 className="font-medium">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
