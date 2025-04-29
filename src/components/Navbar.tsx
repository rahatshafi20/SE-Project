
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Car, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link as RouterLink } from "react-router-dom";


const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Track scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Book Parking', path: '/booking' },
    { name: 'Profile', path: '/profile' },
    { name: 'Parking Slots', path: '/parking-slots' },  // Added this
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-10',
        isScrolled ? 'glass shadow-elegant' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-2 animate-fade-in"
        >
          <Car className="h-6 w-6 text-primary" />
          <span className="font-medium text-lg">ParkEase</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                'text-sm font-medium relative transition-colors hover:text-primary',
                isActive(link.path) 
                  ? 'text-primary after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full' 
                  : 'text-foreground/80'
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Auth buttons on desktop */}
        <div className="hidden md:flex items-center space-x-4 animate-fade-in">
          <Button 
            variant="outline"
            size="sm"
            className="px-4 transition-all"
            aria-label="Log in"
          >
            Log in
          </Button>
          <Button 
            size="sm" 
            className="px-4 shadow-sm transition-all"
            aria-label="Sign up"
          >
            Sign up
          </Button>
        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass absolute top-full left-0 right-0 shadow-elegant animate-fade-in p-4">
          <nav className="flex flex-col space-y-4 py-4">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-md transition-colors',
                  isActive(link.path) ? 'bg-primary/10 text-primary' : 'hover:bg-secondary',
                  `animate-[fade-up_0.3s_ease_forwards_${index * 0.05}s]`,
                  'opacity-0'
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col space-y-2 pt-2 border-t">
              <Button variant="outline" className="justify-center">
                Log in
              </Button>
              <Button className="justify-center">
                Sign up
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
