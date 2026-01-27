'use client'

import React from 'react';
import { useParams } from 'next/navigation';
import {
  MapPin,
  Clock,
  Package,
  CheckCircle,
  Navigation as NavigationIcon,
  Phone,
  ArrowLeft,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import { Navigation, Footer } from '@/components/landing';

interface LocationData {
  name: string;
  slug: string;
  address: string;
  fullAddress: string;
  status: string;
  hours: string;
  lockers: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  features: string[];
  description: string;
  nearbyAreas: string[];
  seoTitle: string;
  heroDescription: string;
}

const locations: Record<string, LocationData> = {
  'nairobi-cbd': {
    name: 'Nairobi CBD',
    slug: 'nairobi-cbd',
    address: 'Ronald Ngala St, adjacent to Bata, Shop 401',
    fullAddress: 'Ronald Ngala Street, Shop 401, adjacent to Bata, Nairobi Central Business District',
    status: 'Active',
    hours: '24/7',
    lockers: 28,
    coordinates: { lat: -1.285868, lng: 36.827896 },
    features: ['M-PESA Payment', 'SMS Notifications', 'High Traffic Area', 'Business District', '24/7 Access', 'Security Cameras'],
    description: 'Our Nairobi CBD location is strategically positioned on Ronald Ngala Street, adjacent to Bata shop. This is the perfect drop-off and storage point for office workers, business people, and anyone visiting the Central Business District. With 28 secure smart lockers, you can safely store and retrieve your parcels at any time of day or night.',
    nearbyAreas: ['Tom Mboya Street', 'River Road', 'Moi Avenue', 'City Centre', 'Kenyatta Avenue', 'Kimathi Street'],
    seoTitle: 'Parcel Drop-off & Storage Point in Nairobi CBD',
    heroDescription: 'Secure 24/7 parcel drop-off, pickup, and storage lockers in the heart of Nairobi CBD. Located on Ronald Ngala Street for convenient access.'
  },
  'garden-city-mall': {
    name: 'Garden City Mall',
    slug: 'garden-city-mall',
    address: 'Thika Road, Nairobi',
    fullAddress: 'Garden City Mall, Thika Road, Nairobi, Kenya',
    status: 'Active',
    hours: '24/7',
    lockers: 48,
    coordinates: { lat: -1.231904, lng: 36.878941 },
    features: ['M-PESA Payment', 'SMS Notifications', 'Security Camera', 'Indoor Location', '24/7 Access', 'Parking Available'],
    description: 'Located at the main entrance of Garden City Mall on Thika Road, our locker station offers 48 secure compartments for parcel drop-off, pickup, and temporary storage. The indoor location provides weather protection and is easily accessible from both the parking area and the main mall entrance.',
    nearbyAreas: ['Roysambu', 'Kasarani', 'Garden Estate', 'Thika Road', 'Mirema', 'Zimmerman'],
    seoTitle: 'Parcel Drop-off & Pickup Point at Garden City Mall',
    heroDescription: 'Secure 24/7 parcel drop-off, pickup, and storage lockers at Garden City Mall. 48 lockers available with convenient parking access.'
  }
};

export default function LocationPage() {
  const params = useParams();
  const locationSlug = params.location as string;
  const location = locations[locationSlug];

  if (!location) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Location Not Found</h1>
          <p className="text-muted-foreground mb-8">The location you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/lockers" className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium">
            View All Locations
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const openDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${location.coordinates.lat},${location.coordinates.lng}`;
    window.open(url, '_blank');
  };

  const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988!2d${location.coordinates.lng}!3d${location.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTcnMDkuMSJTIDM2wrA0OSc0MC40IkU!5e0!3m2!1sen!2ske!4v1234567890`;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <div className="bg-card border-b border-border pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <Link href="/lockers" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to All Locations
          </Link>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold border bg-success/10 text-success border-success/20">
                  {location.status}
                </span>
                <span className="text-muted-foreground text-sm">{location.lockers} lockers available</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                {location.seoTitle}
              </h1>

              <p className="text-xl text-muted-foreground mb-6">
                {location.heroDescription}
              </p>

              <div className="flex items-start gap-2 text-muted-foreground mb-6">
                <MapPin className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                <span>{location.fullAddress}</span>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/booking"
                  className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium inline-flex items-center gap-2"
                >
                  <Package className="h-5 w-5" />
                  Book a Locker
                </Link>
                <button
                  onClick={openDirections}
                  className="border border-primary text-foreground px-8 py-3 rounded-lg hover:bg-secondary transition-colors font-medium inline-flex items-center gap-2"
                >
                  <NavigationIcon className="h-5 w-5" />
                  Get Directions
                </button>
              </div>
            </div>

            {/* Map */}
            <div className="w-full lg:w-96 h-64 lg:h-80 rounded-xl overflow-hidden border border-border">
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map of ${location.name}`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <section className="bg-card rounded-2xl border border-border p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">About This Location</h2>
              <p className="text-muted-foreground leading-relaxed">
                {location.description}
              </p>
            </section>

            {/* Features */}
            <section className="bg-card rounded-2xl border border-border p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Features & Amenities</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {location.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 py-2">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Services */}
            <section className="bg-card rounded-2xl border border-border p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Services Available</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-4 bg-secondary rounded-lg text-center">
                  <Package className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold text-foreground">Parcel Drop-off</h3>
                  <p className="text-sm text-muted-foreground">Secure package deposit</p>
                </div>
                <div className="p-4 bg-secondary rounded-lg text-center">
                  <NavigationIcon className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold text-foreground">Parcel Pickup</h3>
                  <p className="text-sm text-muted-foreground">24/7 collection</p>
                </div>
                <div className="p-4 bg-secondary rounded-lg text-center">
                  <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold text-foreground">Temporary Storage</h3>
                  <p className="text-sm text-muted-foreground">Flexible duration</p>
                </div>
              </div>
            </section>

            {/* Nearby Areas */}
            <section className="bg-card rounded-2xl border border-border p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Nearby Areas</h2>
              <p className="text-muted-foreground mb-4">
                This drop-off and storage point conveniently serves people from the following areas:
              </p>
              <div className="flex flex-wrap gap-2">
                {location.nearbyAreas.map((area, index) => (
                  <span key={index} className="px-3 py-1 bg-secondary rounded-full text-sm text-muted-foreground">
                    {area}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Quick Info</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Hours</span>
                  <span className="font-semibold text-foreground">{location.hours}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Total Lockers</span>
                  <span className="font-semibold text-foreground">{location.lockers}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Payment</span>
                  <span className="font-semibold text-foreground">M-PESA</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-muted-foreground">Starting Price</span>
                  <span className="font-semibold text-foreground">KES 50</span>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Need Help?</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Contact our support team for assistance with this location.
              </p>
              <button
                onClick={() => window.open(`https://wa.me/254759777587?text=I need help with the ParcelPoint locker at ${encodeURIComponent(location.name)}`, '_blank')}
                className="w-full border border-primary text-foreground py-3 px-4 rounded-lg hover:bg-secondary transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Phone className="h-4 w-4" />
                Contact Support
              </button>
            </div>

            {/* CTA */}
            <div className="bg-primary rounded-2xl p-6 text-center">
              <h3 className="text-lg font-bold text-primary-foreground mb-2">Ready to Book?</h3>
              <p className="text-primary-foreground/80 text-sm mb-4">
                Reserve your locker now and get instant access.
              </p>
              <Link
                href="/booking"
                className="w-full bg-white text-primary py-3 px-4 rounded-lg hover:bg-white/90 transition-colors font-medium flex items-center justify-center gap-2"
              >
                Book Now
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
