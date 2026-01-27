'use client'

import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  Package,
  CheckCircle,
  Navigation as NavigationIcon,
  Phone,
  Search,
  Filter,
  Grid,
  List,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import { Navigation, Footer } from '@/components/landing';

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
  features?: string[];
  description?: string;
}

const LockersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const locations: Location[] = [
    {
      name: "Garden City Mall",
      address: "Thika Road, Nairobi",
      status: "Active",
      hours: "24/7",
      lockers: 48,
      coordinates: { lat: -1.231904, lng: 36.878941 },
      features: ["M-PESA Payment", "SMS Notifications", "Security Camera", "Indoor Location"],
      description: "Located in the main entrance area of Garden City Mall, easily accessible from both the parking area and main mall entrance."
    },
    {
      name: "Nairobi CBD",
      address: "Ronald Ngala St, adjacent to Bata, Shop 401",
      status: "Active",
      hours: "24/7",
      lockers: 28,
      coordinates: { lat: -1.285868, lng: 36.827896 },
      features: ["M-PESA Payment", "SMS Notifications", "High Traffic Area", "Business District"],
      description: "Strategic location on Ronald Ngala Street in Nairobi's Central Business District, adjacent to Bata shop. Ideal for office workers and convenient drop-off storage."
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-success/10 text-success border-success/20';
      case 'Coming Soon':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
      case 'Planning':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const filteredLocations = locations.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || location.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openDirections = (location: Location) => {
    const coordinatesUrl = `https://www.google.com/maps/dir/?api=1&destination=${location.coordinates.lat},${location.coordinates.lng}`;
    const fallbackUrl = `https://www.google.com/maps/search/${encodeURIComponent(location.name + ' ' + location.address)}`;

    try {
      window.open(coordinatesUrl, '_blank');
    } catch (error) {
      window.open(fallbackUrl, '_blank');
      console.error(error);
    }
  };

  const LocationCard = ({ location, isListView = false }: { location: Location; isListView?: boolean }) => (
    <div className={`bg-card rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 overflow-hidden ${isListView ? 'flex' : ''}`}>
      {/* Header with status */}
      <div className={`p-6 ${isListView ? 'flex-1' : ''}`}>
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-card-foreground mb-2">{location.name}</h3>
            <div className="flex items-center text-muted-foreground mb-2">
              <MapPin className="h-4 w-4 mr-2 text-foreground" />
              <span className="text-sm">{location.address}</span>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(location.status)}`}>
            {location.status}
          </span>
        </div>

        {/* Description */}
        {location.description && (
          <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
            {location.description}
          </p>
        )}

        {/* Details Grid */}
        <div className={`grid ${isListView ? 'grid-cols-2' : 'grid-cols-1'} gap-3 mb-4`}>
          <div className="flex items-center justify-between py-2 px-3 bg-secondary rounded-lg">
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-foreground mr-2" />
              <span className="text-sm font-medium text-muted-foreground">Hours</span>
            </div>
            <span className="text-sm font-semibold text-card-foreground">{location.hours}</span>
          </div>

          <div className="flex items-center justify-between py-2 px-3 bg-secondary rounded-lg">
            <div className="flex items-center">
              <Package className="h-4 w-4 text-foreground mr-2" />
              <span className="text-sm font-medium text-muted-foreground">Lockers</span>
            </div>
            <span className="text-sm font-semibold text-card-foreground">{location.lockers}</span>
          </div>
        </div>

        {/* Features */}
        {location.features && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-muted-foreground mb-2">Features</h4>
            <div className="flex flex-wrap gap-2">
              {location.features.map((feature, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-secondary text-secondary-foreground"
                >
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className={`flex gap-3 ${isListView ? 'flex-col sm:flex-row' : ''}`}>
          {location.status === 'Active' && (
            <button
              onClick={() => openDirections(location)}
              className="flex-1 bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <NavigationIcon className="h-4 w-4" />
              Get Directions
            </button>
          )}

          <button
            onClick={() => window.open('https://wa.me/254759777587?text=I need help with the ParcelPoint locker at ' + encodeURIComponent(location.name), '_blank')}
            className="flex-1 border border-primary text-foreground py-2 px-4 rounded-lg hover:bg-secondary transition-colors font-medium flex items-center justify-center gap-2"
          >
            <Phone className="h-4 w-4" />
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <div className="bg-card border-b border-border pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="mb-6">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-2">
              Parcel Drop-off, Pickup & Storage Lockers in Nairobi
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Find secure drop-off, pickup, and storage points near you. 24/7 parcel lockers in Nairobi CBD and Garden City Mall with M-PESA payment.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <input
                type="text"
                placeholder="Search locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-colors"
              />
            </div>

            <div className="flex items-center gap-4">
              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-colors"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Coming Soon">Coming Soon</option>
                  <option value="Planning">Planning</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex items-center bg-secondary rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list'
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <p className="text-muted-foreground mb-6">
          Showing {filteredLocations.length} of {locations.length} locations
        </p>

        {/* Locations Grid/List */}
        <div className={viewMode === 'grid'
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          : "space-y-6"
        }>
          {filteredLocations.map((location, index) => (
            <LocationCard
              key={index}
              location={location}
              isListView={viewMode === 'list'}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredLocations.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No locations found
            </h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search terms or filters
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('All');
              }}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* SEO Content Section */}
        <section className="mt-16 bg-card rounded-2xl border border-border p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Parcel Drop-off and Pickup Points in Nairobi
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Nairobi CBD Drop-off & Storage Point
              </h3>
              <p className="text-muted-foreground mb-4">
                Our Nairobi CBD location on Ronald Ngala Street (adjacent to Bata, Shop 401) is the ideal drop-off point for office workers and anyone in the Central Business District. With 28 secure lockers, it&apos;s perfect for parcel pickup and temporary storage in the heart of Nairobi.
              </p>
              <p className="text-muted-foreground text-sm">
                <strong>Nearby areas:</strong> Tom Mboya Street, River Road, Moi Avenue, City Centre
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Garden City Mall Pickup Point
              </h3>
              <p className="text-muted-foreground mb-4">
                Our Garden City Mall location on Thika Road offers 48 lockers for convenient parcel drop-off, pickup, and storage. Located at the main entrance, it&apos;s easily accessible with parking and perfect for residents of Roysambu, Kasarani, and surrounding areas looking for a storage point near them.
              </p>
              <p className="text-muted-foreground text-sm">
                <strong>Nearby areas:</strong> Roysambu, Kasarani, Garden Estate, Thika Road
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Why Choose ParcelPoint for Drop-off and Storage?
            </h3>
            <ul className="grid sm:grid-cols-2 gap-3 text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                24/7 access to all pickup and drop-off points
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                Secure storage with SMS notifications
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                Convenient M-PESA payment
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                Multiple locker sizes for all parcel types
              </li>
            </ul>
          </div>
        </section>

        {/* Call to Action */}
        <div className="mt-16 bg-secondary rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Want ParcelPoint at Your Location?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We're always looking for strategic locations to expand our network. Partner with us to bring convenient parcel services to your community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.open('https://wa.me/254759777587?text=I have a location that would be perfect for ParcelPoint lockers. I\'d like to discuss partnership opportunities.', '_blank')}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium inline-flex items-center justify-center gap-2"
            >
              Suggest a Location
              <ExternalLink className="h-4 w-4" />
            </button>
            <Link
              href="/#services"
              className="border border-primary text-foreground px-8 py-3 rounded-lg hover:bg-secondary transition-colors font-medium inline-flex items-center justify-center gap-2"
            >
              Partnership Models
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LockersPage;
