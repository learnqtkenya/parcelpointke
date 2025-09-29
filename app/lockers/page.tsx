'use client'

import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  Package,
  CheckCircle,
  Navigation,
  Phone,
  Search,
  Filter,
  Grid,
  List,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';

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
      name: "Doonholm",
      address: "Donholm Savannah Rd",
      status: "Active",
      hours: "24/7",
      lockers: 15,
      coordinates: { lat: -1.2990613, lng: 36.8889069 },
      features: ["M-PESA Payment", "SMS Notifications", "Well-lit Area", "Residential Area"],
      description: "Conveniently located in the heart of Donholm residential area, perfect for local community deliveries."
    },
    {
      name: "CBD",
      address: "Kenya National Archives",
      status: "Coming Soon",
      hours: "24/7",
      lockers: 48,
      coordinates: { lat: -1.28487, lng: 36.82565 },
      features: ["M-PESA Payment", "SMS Notifications", "High Traffic Area", "Business District"],
      description: "Strategic location in Nairobi's Central Business District, ideal for office workers and business deliveries."
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 border-green-200 dark:border-green-800';
      case 'Coming Soon':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
      case 'Planning':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-600';
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
    <div className={`bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 overflow-hidden ${isListView ? 'flex' : ''}`}>
      {/* Header with status */}
      <div className={`p-6 ${isListView ? 'flex-1' : ''}`}>
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{location.name}</h3>
            <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
              <MapPin className="h-4 w-4 mr-2 text-emerald-600 dark:text-emerald-500" />
              <span className="text-sm">{location.address}</span>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(location.status)}`}>
            {location.status}
          </span>
        </div>

        {/* Description */}
        {location.description && (
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
            {location.description}
          </p>
        )}

        {/* Details Grid */}
        <div className={`grid ${isListView ? 'grid-cols-2' : 'grid-cols-1'} gap-3 mb-4`}>
          <div className="flex items-center justify-between py-2 px-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-emerald-600 dark:text-emerald-500 mr-2" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Hours</span>
            </div>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">{location.hours}</span>
          </div>

          <div className="flex items-center justify-between py-2 px-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center">
              <Package className="h-4 w-4 text-emerald-600 dark:text-emerald-500 mr-2" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Lockers</span>
            </div>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">{location.lockers}</span>
          </div>
        </div>

        {/* Features */}
        {location.features && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Features</h4>
            <div className="flex flex-wrap gap-2">
              {location.features.map((feature, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400"
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
              className="flex-1 bg-emerald-600 dark:bg-emerald-500 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Navigation className="h-4 w-4" />
              Get Directions
            </button>
          )}

          <button
            onClick={() => window.open('https://wa.me/254759777587?text=I need help with the ParcelPoint locker at ' + encodeURIComponent(location.name), '_blank')}
            className="flex-1 border border-emerald-600 dark:border-emerald-500 text-emerald-600 dark:text-emerald-500 py-2 px-4 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <Phone className="h-4 w-4" />
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Link
                href="/"
                className="inline-flex items-center text-emerald-600 dark:text-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors mb-4"
              >
                ← Back to Home
              </Link>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                ParcelPoint Lockers
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
                Find secure, convenient parcel pickup locations across Nairobi. Available 24/7 with M-PESA payment integration.
              </p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent outline-none transition-colors"
              />
            </div>

            <div className="flex items-center gap-4">
              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent outline-none transition-colors"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Coming Soon">Coming Soon</option>
                  <option value="Planning">Planning</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex items-center bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-gray-600 text-emerald-600 dark:text-emerald-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list'
                      ? 'bg-white dark:bg-gray-600 text-emerald-600 dark:text-emerald-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
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
        <p className="text-gray-600 dark:text-gray-300 mb-6">
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
            <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No locations found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Try adjusting your search terms or filters
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('All');
              }}
              className="bg-emerald-600 dark:bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors font-medium"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Want ParcelPoint at Your Location?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            We're always looking for strategic locations to expand our network. Partner with us to bring convenient parcel services to your community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.open('https://wa.me/254759777587?text=I have a location that would be perfect for ParcelPoint lockers. I\'d like to discuss partnership opportunities.', '_blank')}
              className="bg-emerald-600 dark:bg-emerald-500 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors font-medium inline-flex items-center justify-center gap-2"
            >
              Suggest a Location
              <ExternalLink className="h-4 w-4" />
            </button>
            <Link
              href="/#services"
              className="border border-emerald-600 dark:border-emerald-500 text-emerald-600 dark:text-emerald-500 px-8 py-3 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors font-medium inline-flex items-center justify-center gap-2"
            >
              Partnership Models
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LockersPage;