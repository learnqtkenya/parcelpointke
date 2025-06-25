'use client'

import React, { useState, useEffect } from 'react';
import {
  Package,
  ChevronRight,
  ChevronLeft,
  MapPin,
  Menu,
  X,
  Sun,
  Moon,
  CheckCircle,
  Clock,
  Shield,
  Smartphone,
  CreditCard,
  Star,
  Mail,
  Phone,
  MessageCircle
} from 'lucide-react';

// Navigation Component
interface NavItem {
  label: string;
  href: string;
}

interface NavigationProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ theme, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const navItems: NavItem[] = [
    { label: 'Home', href: '#home' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Services', href: '#services' },
    { label: 'Locations', href: '#locations' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' }
  ];

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-emerald-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 dark:bg-emerald-500 rounded-lg flex items-center justify-center">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900 dark:text-white">ParcelPoint</span>
              <span className="text-xs tracking-wider text-emerald-600 dark:text-emerald-500">DROP • PAY • PICK</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(item => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-500"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            {navItems.map(item => (
              <button
                key={item.label}
                onClick={() => {
                  handleNavClick(item.href);
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left py-2 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

// Hero Section Component
const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const images: string[] = [
    '/images/parcelpoint/1.jpeg',
    '/images/parcelpoint/2.jpeg',
    '/images/parcelpoint/3.jpeg'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section id="home" className="pt-20 pb-16 px-4 sm:px-6 bg-gradient-to-br from-white dark:from-gray-900 to-emerald-50 dark:to-emerald-950">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Carousel */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  style={{
                    backgroundImage: `url(${image})`
                  }}
                  role="img"
                  aria-label={`ParcelPoint Locker ${index + 1}`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

              {/* Navigation arrows */}
              <button
                onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-colors"
              >
                <ChevronLeft className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              </button>
              <button
                onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-colors"
              >
                <ChevronRight className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              </button>

              {/* Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${index === currentImageIndex
                        ? 'bg-emerald-500'
                        : 'bg-white/50 dark:bg-gray-600/50'
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Hero Content */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
              Smart Parcel
              <span className="text-emerald-600 dark:text-emerald-500"> Delivery</span>
              <br />Made Simple
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Secure, convenient parcel pickup and delivery anytime, anywhere.
              Experience the future of last-mile logistics.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <button
                onClick={() => {
                  const element = document.querySelector('#locations');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-emerald-600 dark:bg-emerald-500 text-white px-8 py-4 rounded-xl hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg font-semibold text-center"
              >
                Find Locations
              </button>
              <button
                onClick={() => {
                  const element = document.querySelector('#how-it-works');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="border-2 border-emerald-600 dark:border-emerald-500 text-emerald-600 dark:text-emerald-500 px-8 py-4 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors text-lg font-semibold text-center"
              >
                How It Works
              </button>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <Clock className="h-5 w-5 text-emerald-600 dark:text-emerald-500" />
                <span>24/7 Access</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <Shield className="h-5 w-5 text-emerald-600 dark:text-emerald-500" />
                <span>Secure Storage</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <Smartphone className="h-5 w-5 text-emerald-600 dark:text-emerald-500" />
                <span>Mobile Payments</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// How It Works Section
const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      title: "Drop Off",
      subtitle: "Secure Deposit",
      description: "Couriers or individuals deposit parcels securely at convenient ParcelPoint locations across the city.",
      IconComponent: Package
    },
    {
      number: "02",
      title: "Get Code",
      subtitle: "Instant Notification",
      description: "Receive a unique 6-digit access code via SMS immediately when your parcel is stored.",
      IconComponent: Smartphone
    },
    {
      number: "03",
      title: "Pay & Collect",
      subtitle: "Quick M-PESA",
      description: "Use your code to access the locker and pay securely with M-PESA when collecting your parcel.",
      IconComponent: CreditCard
    },
    {
      number: "04",
      title: "24/7 Access",
      subtitle: "Your Schedule",
      description: "Pick up your parcels anytime that suits you - no more missed deliveries or waiting around.",
      IconComponent: Clock
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Simple, secure, and convenient parcel management in just four easy steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-900/20 dark:to-gray-800 p-8 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 h-full">
                {/* Step Number */}
                <div className="text-6xl font-bold text-emerald-100 dark:text-emerald-900/50 absolute top-4 right-4">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 bg-emerald-600 dark:bg-emerald-500 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                  <step.IconComponent className="h-8 w-8" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{step.title}</h3>
                <h4 className="text-emerald-600 dark:text-emerald-500 font-semibold mb-4">{step.subtitle}</h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{step.description}</p>
              </div>

              {/* Connector Arrow */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ChevronRight className="h-8 w-8 text-emerald-300 dark:text-emerald-700" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Statistics Section
const StatsSection = () => {
  const stats = [
    {
      number: "1000+",
      label: "Parcels Delivered",
      IconComponent: Package
    },
    {
      number: "2",
      label: "Active Locations",
      IconComponent: MapPin
    },
    {
      number: "24/7",
      label: "Always Available",
      IconComponent: Clock
    },
    {
      number: "99.9%",
      label: "Uptime Reliability",
      IconComponent: Shield
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 bg-emerald-600 dark:bg-emerald-700 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors">
                <stat.IconComponent className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl font-bold mb-2">{stat.number}</div>
              <div className="text-emerald-100">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Services Section
interface Service {
  title: string;
  subtitle: string;
  price: string;
  description: string;
  features: string[];
  popular: boolean;
  cta: string;
}

const ServicesSection = () => {
  const services: Service[] = [
    {
      title: "We Pay You Rent",
      subtitle: "Hassle-Free Income",
      price: "Monthly Rent",
      description: "We handle everything - equipment, maintenance, and operations. You just provide space and earn steady rental income.",
      features: [
        "No upfront investment required",
        "All maintenance included",
        "Guaranteed monthly payments",
        "Full operational support"
      ],
      popular: true,
      cta: "Rent My Space"
    },
    {
      title: "Buy & Own Complete",
      subtitle: "Full Ownership",
      price: "One-Time Purchase",
      description: "Purchase the complete system and own it forever. Keep 100% of all revenue and customize as needed.",
      features: [
        "Complete system ownership",
        "100% revenue retention",
        "White-label branding",
        "Local data control"
      ],
      popular: false,
      cta: "Get Quote"
    },
    {
      title: "Revenue Partnership",
      subtitle: "Shared Success",
      price: "70/30 Split",
      description: "We manage operations while you provide space and promotion. Share in the revenue with minimal effort.",
      features: [
        "No upfront costs",
        "Shared revenue model",
        "Full technical support",
        "Marketing assistance"
      ],
      popular: false,
      cta: "Become Partner"
    }
  ];

  return (
    <section id="services" className="py-20 px-4 sm:px-6 bg-emerald-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Choose Your Model
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Whether you want rental income, full ownership, or a partnership, we have a solution that fits your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className={`relative bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${service.popular ? 'ring-2 ring-emerald-500 dark:ring-emerald-400' : ''}`}>
              {service.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{service.title}</h3>
                <p className="text-emerald-600 dark:text-emerald-500 font-semibold mb-4">{service.subtitle}</p>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{service.price}</div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">{service.description}</p>

              <ul className="space-y-3 mb-8">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => {
                  let message = '';
                  switch (service.title) {
                    case 'We Pay You Rent':
                      message = 'Hi ParcelPoint! I have space available and I\'m interested in your rental model where you pay monthly rent. I\'d like to learn more about the requirements and rental rates. Can we discuss this opportunity?';
                      break;
                    case 'Buy & Own Complete':
                      message = 'Hi ParcelPoint! I\'m interested in purchasing a complete ParcelPoint system for full ownership. Could you please provide me with pricing details and what\'s included in the package?';
                      break;
                    case 'Revenue Partnership':
                      message = 'Hi ParcelPoint! I\'m interested in your revenue-sharing partnership model (70/30 split). I have a good location and would like to know more about the requirements and how we can work together.';
                      break;
                    default:
                      message = 'Hi ParcelPoint! I\'m interested in learning more about your services and how we can work together.';
                  }
                  const whatsappUrl = `https://wa.me/254700549607?text=${encodeURIComponent(message)}`;
                  window.open(whatsappUrl, '_blank');
                }}
                className={`w-full py-4 rounded-xl font-semibold transition-colors ${service.popular
                    ? 'bg-emerald-600 dark:bg-emerald-500 text-white hover:bg-emerald-700 dark:hover:bg-emerald-600'
                    : 'border-2 border-emerald-600 dark:border-emerald-500 text-emerald-600 dark:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/30'
                  }`}>
                {service.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Locations Section
interface Location {
  name: string;
  address: string;
  status: string;
  hours: string;
  lockers: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}

const LocationsSection = () => {
  const locations: Location[] = [
    {
      name: "Garden City Mall",
      address: "Thika Road, Nairobi",
      status: "Active",
      hours: "24/7",
      lockers: 48, 
      coordinates: { lat: -1.231904, lng: 36.878941 }
    },
    {
      name: "Doonholm",
      address: "Donholm Savannah Rd",
      status: "Coming Soon",
      hours: "24/7",
      lockers: 15, 
      coordinates: { lat: -1.2990613, lng: 36.8889069 }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400';
      case 'Coming Soon':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400';
      case 'Planning':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  return (
    <section id="locations" className="py-20 px-4 sm:px-6 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Our Locations
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Find ParcelPoint lockers at convenient locations across Nairobi, with more locations coming soon.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((location, index) => (
            <div key={index} className="bg-emerald-50 dark:bg-gray-800 rounded-xl p-6 border border-emerald-100 dark:border-emerald-900/30 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300 hover:shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{location.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{location.address}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(location.status)}`}>
                  {location.status}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Hours:</span>
                  <span className="text-gray-900 dark:text-white font-medium">{location.hours}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Lockers:</span>
                  <span className="text-gray-900 dark:text-white font-medium">{location.lockers}</span>
                </div>
              </div>

              {location.status === 'Active' && (
                <button 
                onClick={() => {
                  const coordinatesUrl = `https://www.google.com/maps/dir/?api=1&destination=${location.coordinates.lat},${location.coordinates.lng}`;
                  const fallbackUrl = `https://www.google.com/maps/search/${encodeURIComponent(location.name + ' ' + location.address)}`;
                  
                  // Try coordinates first, with fallback option
                  try {
                    window.open(coordinatesUrl, '_blank');
                  } catch (error) {
                    window.open(fallbackUrl, '_blank');
                    console.error(error)
                  }
                }}
                className="w-full mt-4 bg-emerald-600 dark:bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors font-medium">
                Get Directions
              </button>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Want ParcelPoint at your location? We&apos;re always looking for new locations.
          </p>
          <button
            onClick={() => {
              const message = 'Hi ParcelPoint! I have a location that would be perfect for your smart lockers. I\'d like to suggest this location and discuss the partnership opportunities. Can we arrange a time to talk?';
              const whatsappUrl = `https://wa.me/254700549607?text=${encodeURIComponent(message)}`;
              window.open(whatsappUrl, '_blank');
            }}
            className="bg-emerald-600 dark:bg-emerald-500 text-white px-8 py-3 rounded-xl hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors font-semibold">
            Suggest a Location
          </button>
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
}

const TestimonialsSection = () => {
  const testimonials: Testimonial[] = [
    {
      name: "Sarah Wanjiku",
      role: "Small Business Owner",
      content: "ParcelPoint has revolutionized how I drop off packages for my clients. No more waiting in queues at bus stations!",
      rating: 5
    },
    {
      name: "David Ochieng",
      role: "Office Worker",
      content: "I love that I can pick up my packages anytime after work. The M-PESA payment is so convenient and the process is super quick.",
      rating: 5
    },
    {
      name: "Lee",
      role: "Tourist",
      content: "I have been used to this in my country. It was a great relieve when I found ParcelPoint in Kenya. The locations are convenient and always accessible.",
      rating: 5
    }
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
      );
    }
    return stars;
  };

  return (
    <section className="py-20 px-4 sm:px-6 bg-emerald-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Thousands of satisfied customers trust ParcelPoint for their delivery needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center mb-4">
                {renderStars(testimonial.rating)}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                <p className="text-emerald-600 dark:text-emerald-500 text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// FAQ Section
interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "How do I pick up my parcel from a ParcelPoint locker?",
      answer: "Simply use the unique 6-digit code sent to your phone via SMS. Enter the code at the locker touchscreen, make your M-PESA payment, and your compartment will open automatically."
    },
    {
      question: "How long can I leave my parcel in the locker?",
      answer: "Parcels can be stored for up to 3 days. You'll receive SMS reminders, and if not collected within 3 days, our team will retrieve the parcel and contact you for alternative arrangements."
    },
    {
      question: "Is my parcel secure in the locker?",
      answer: "Absolutely. Our lockers use advanced security features including unique access codes, sturdy construction, and 24/7 monitoring to ensure your parcels are completely safe."
    },
    {
      question: "Can I store my own items in a ParcelPoint locker?",
      answer: "Yes! You can use ParcelPoint for personal storage. Simply deposit your items, make an M-PESA payment, and receive your access code to retrieve them later."
    },
    {
      question: "Where are ParcelPoint lockers located?",
      answer: "Our lockers are strategically placed in high-traffic locations including malls, residential complexes, office buildings, schools, and community centers across major cities in Kenya."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We primarily use M-PESA for payments, which makes transactions quick, secure, and convenient for most Kenyans. Payment is made directly at the locker when collecting your parcel."
    }
  ];

  const handleFAQToggle = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Everything you need to know about ParcelPoint
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-emerald-50 dark:bg-gray-800 rounded-xl border border-emerald-100 dark:border-emerald-900/30 overflow-hidden">
              <button
                onClick={() => handleFAQToggle(index)}
                className="w-full px-6 py-6 text-left flex justify-between items-center hover:bg-emerald-100 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="text-lg font-semibold text-gray-900 dark:text-white pr-4">{faq.question}</span>
                <ChevronRight className={`h-5 w-5 text-emerald-600 dark:text-emerald-500 transform transition-transform ${openFAQ === index ? 'rotate-90' : ''}`} />
              </button>
              {openFAQ === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    message: string;
  }>({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.message) {
      const subject = encodeURIComponent('ParcelPoint Partnership Inquiry');
      const body = encodeURIComponent(
        `Hello ParcelPoint Team,

Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}

Best regards,
${formData.name}`
      );

      const mailtoUrl = `mailto:hello@squared.co.ke?subject=${subject}&body=${body}`;
      window.location.href = mailtoUrl;

      // Clear form after opening email client
      setFormData({ name: '', email: '', message: '' });
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 bg-emerald-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Ready to bring ParcelPoint to your location? Let&apos;s discuss how we can work together.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-600 dark:bg-emerald-500 rounded-lg flex items-center justify-center">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Email</h3>
                  <a
                    href="mailto:hello@squared.co.ke"
                    className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors"
                  >
                    hello@squared.co.ke
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-600 dark:bg-emerald-500 rounded-lg flex items-center justify-center">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Phone</h3>
                  <a
                    href="tel:+254700549607"
                    className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors"
                  >
                    +254 700 549 607
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-600 dark:bg-emerald-500 rounded-lg flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">WhatsApp</h3>
                  <a
                    href="https://wa.me/254700549607"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors"
                  >
                    +254 700 549 607
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent outline-none transition-colors resize-none"
                  placeholder="Tell us about your location and needs..."
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-emerald-600 dark:bg-emerald-500 text-white py-4 rounded-lg hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">ParcelPoint</span>
                <span className="text-xs tracking-wider text-emerald-500">DROP • PAY • PICK</span>
              </div>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Revolutionizing last-mile delivery with secure, convenient smart locker solutions across Kenya.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    const element = document.querySelector('#home');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-emerald-500 transition-colors text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.querySelector('#how-it-works');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-emerald-500 transition-colors text-left"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.querySelector('#services');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-emerald-500 transition-colors text-left"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.querySelector('#locations');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-emerald-500 transition-colors text-left"
                >
                  Locations
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:hello@squared.co.ke"
                  className="text-gray-400 hover:text-emerald-500 transition-colors"
                >
                  hello@squared.co.ke
                </a>
              </li>
              <li>
                <a
                  href="tel:+254700549607"
                  className="text-gray-400 hover:text-emerald-500 transition-colors"
                >
                  +254 700 549 607
                </a>
              </li>
              <li className="text-gray-400">Nairobi, Kenya</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 ParcelPoint. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const ParcelPointWebsite = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('parcelpoint-theme') as 'light' | 'dark' || 'light';
      setTheme(savedTheme);
      document.documentElement.className = savedTheme;
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('parcelpoint-theme', newTheme);
    }
    document.documentElement.className = newTheme;
  };

  return (
    <div className={theme}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 overflow-x-hidden">
        <Navigation theme={theme} toggleTheme={toggleTheme} />
        <HeroSection />
        <HowItWorksSection />
        <StatsSection />
        <ServicesSection />
        <LocationsSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
};

export default ParcelPointWebsite;