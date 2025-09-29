'use client'

import React, { useState } from 'react';
import {
  MapPin,
  Package,
  CheckCircle,
  ArrowLeft,
  Calculator,
  Smartphone
} from 'lucide-react';
import Link from 'next/link';

interface Location {
  id: string;
  name: string;
  address: string;
  coordinates: { lat: number; lng: number };
  isActive: boolean;
  available: { small: number; medium: number; large: number };
}

interface LockerSize {
  size: 'small' | 'medium' | 'large';
  dimensions: string;
  description: string;
}

const lockerSizes: LockerSize[] = [
  {
    size: 'small',
    dimensions: '30cm x 20cm x 15cm',
    description: 'Perfect for documents, small electronics, and accessories'
  },
  {
    size: 'medium',
    dimensions: '45cm x 35cm x 25cm',
    description: 'Ideal for clothing, books, medium packages'
  },
  {
    size: 'large',
    dimensions: '60cm x 50cm x 40cm',
    description: 'Best for large packages, shoes, electronics'
  }
];

const locations: Location[] = [
  {
    id: 'garden-city',
    name: "Garden City Mall",
    address: "Thika Road, Nairobi",
    coordinates: { lat: -1.231904, lng: 36.878941 },
    isActive: true,
    available: { small: 12, medium: 8, large: 3 }
  },
  {
    id: 'doonholm',
    name: "Doonholm",
    address: "Donholm Savannah Rd",
    coordinates: { lat: -1.2990613, lng: 36.8889069 },
    isActive: true,
    available: { small: 5, medium: 3, large: 1 }
  }
];

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [locationId, setLocationId] = useState('');
  const [lockerSize, setLockerSize] = useState('medium');
  const [hours, setHours] = useState(24);
  const [phoneNumber, setPhoneNumber] = useState('');

  const calculateTotalCost = () => {
    return 50 + Math.max(0, hours - 1) * 10;
  };

  const handleBookingSubmit = async () => {
    setIsSubmitting(true);
    const bookingData = {
      locationId,
      lockerSize,
      hours,
      phoneNumber,
      totalCost: calculateTotalCost()
    };
    console.log('Booking submitted:', bookingData);
    setTimeout(() => {
      setCurrentStep(3);
      setIsSubmitting(false);
    }, 2000);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return locationId && lockerSize;
      case 2:
        return phoneNumber && hours > 0;
      default:
        return true;
    }
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
            step <= currentStep ? 'bg-emerald-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
          }`}>
            {step < currentStep ? <CheckCircle className="h-6 w-6" /> : step}
          </div>
          {step < 3 && (
            <div className={`w-16 h-1 mx-2 ${step < currentStep ? 'bg-emerald-600' : 'bg-gray-200 dark:bg-gray-700'}`} />
          )}
        </div>
      ))}
    </div>
  );

  const StepLabels = () => (
    <div className="grid grid-cols-3 gap-4 mb-12 text-center text-sm">
      <div className={currentStep >= 1 ? 'text-emerald-600 dark:text-emerald-400 font-medium' : 'text-gray-500'}>
        Location & Size
      </div>
      <div className={currentStep >= 2 ? 'text-emerald-600 dark:text-emerald-400 font-medium' : 'text-gray-500'}>
        Duration & Payment
      </div>
      <div className={currentStep >= 3 ? 'text-emerald-600 dark:text-emerald-400 font-medium' : 'text-gray-500'}>
        Confirmation
      </div>
    </div>
  );

  if (currentStep === 1) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <div className="text-center mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-emerald-600 dark:text-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Book a Locker
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Secure your package storage in just a few simple steps
            </p>
          </div>
          <StepIndicator />
          <StepLabels />
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Select Location & Locker Size</h2>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Choose ParcelPoint Location
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {locations.filter(loc => loc.isActive).map((location) => (
                    <button
                      key={location.id}
                      onClick={() => setLocationId(location.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        locationId === location.id
                          ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white">{location.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center mt-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            {location.address}
                          </p>
                        </div>
                        {locationId === location.id && <CheckCircle className="h-6 w-6 text-emerald-600" />}
                      </div>
                      <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                        <div className="text-center">
                          <div className="font-medium">Small</div>
                          <div className="text-green-600">{location.available.small} available</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium">Medium</div>
                          <div className="text-green-600">{location.available.medium} available</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium">Large</div>
                          <div className="text-green-600">{location.available.large} available</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              {locationId && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Choose Locker Size
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {lockerSizes.map((locker) => (
                      <button
                        key={locker.size}
                        onClick={() => setLockerSize(locker.size)}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          lockerSize === locker.size
                            ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Package className="h-6 w-6 text-emerald-600" />
                          {lockerSize === locker.size && <CheckCircle className="h-5 w-5 text-emerald-600" />}
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white capitalize mb-1">
                          {locker.size} Locker
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{locker.dimensions}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{locker.description}</p>
                        <div className="text-center">
                          <span className="text-lg font-bold text-emerald-600">Same Price for All Sizes</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                disabled={true}
                className="bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed px-6 py-3 rounded-lg font-medium"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentStep(2)}
                disabled={!isStepValid()}
                className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                  isStepValid()
                    ? 'bg-emerald-600 dark:bg-emerald-500 text-white hover:bg-emerald-700 dark:hover:bg-emerald-600'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
                }`}
              >
                Next Step
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 2) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <div className="text-center mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-emerald-600 dark:text-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Book a Locker
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Secure your package storage in just a few simple steps
            </p>
          </div>
          <StepIndicator />
          <StepLabels />
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Duration & Payment</h2>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Booking Duration (Hours)
                </label>
                <div className="flex items-center space-x-4 mb-4">
                  <input
                    type="range"
                    min="1"
                    max="168"
                    value={hours}
                    onChange={(e) => setHours(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <div className="text-2xl font-bold text-emerald-600 min-w-[80px]">
                    {hours}h
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {[1, 6, 12, 24].map((hourOption) => (
                    <button
                      key={hourOption}
                      onClick={() => setHours(hourOption)}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                        hours === hourOption
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/30'
                      }`}
                    >
                      {hourOption}h
                    </button>
                  ))}
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calculator className="h-5 w-5 text-emerald-600 mr-2" />
                      <span className="font-medium text-gray-900 dark:text-white">Total Cost</span>
                    </div>
                    <span className="text-2xl font-bold text-emerald-600">
                      KES {calculateTotalCost()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                    First hour: KES 50 + {Math.max(0, hours - 1)} additional hours × KES 10/hour
                  </p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">M-PESA Payment</h3>
                <div className="max-w-md">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone Number (for STK Push)
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                    placeholder="+254 7XX XXX XXX"
                    autoComplete="tel"
                  />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    You'll receive STK push and booking code via SMS
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-green-900 dark:text-green-100">Ready to Pay</h4>
                      <p className="text-sm text-green-800 dark:text-green-200">
                        STK push will be sent to {phoneNumber || 'your phone number'}
                      </p>
                    </div>
                    <Smartphone className="h-8 w-8 text-green-600" />
                  </div>
                  <button
                    onClick={handleBookingSubmit}
                    disabled={isSubmitting || !phoneNumber}
                    className="w-full bg-green-600 dark:bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors font-medium disabled:opacity-50"
                  >
                    {isSubmitting ? 'Processing...' : `Send STK Push - Pay KES ${calculateTotalCost()}`}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setCurrentStep(1)}
                className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Previous
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 3 - Confirmation
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-emerald-600 dark:text-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Book a Locker
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Secure your package storage in just a few simple steps
          </p>
        </div>
        <StepIndicator />
        <StepLabels />
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                STK Push Sent!
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Complete payment on your phone to receive your booking code
              </p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl text-left">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Next Steps</h3>
              <ol className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                <li className="flex items-start">
                  <span className="font-semibold text-blue-600 mr-2">1.</span>
                  <span>Check your phone for M-PESA STK push notification</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold text-blue-600 mr-2">2.</span>
                  <span>Enter your M-PESA PIN to complete payment of KES {calculateTotalCost()}</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold text-blue-600 mr-2">3.</span>
                  <span>You'll receive your 6-digit booking code via SMS immediately</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold text-blue-600 mr-2">4.</span>
                  <span>Use the code at {locations.find(loc => loc.id === locationId)?.name} for {hours} hours</span>
                </li>
              </ol>
            </div>
            <div className="text-center">
              <Link
                href="/"
                className="text-emerald-600 dark:text-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 font-medium inline-flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}