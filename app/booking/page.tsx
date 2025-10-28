'use client'

import React, { useState, useEffect, Suspense } from 'react';
import {
  MapPin,
  Package,
  CheckCircle,
  ArrowLeft,
  Calculator,
  Smartphone,
  AlertCircle,
  Clock as ClockIcon
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { getDevicesOverview, checkExistingBooking, initiateBookingPayment, getBookingDetails, initiateExtensionPayment, decodeExtensionUrl } from '@/lib/api/services';
import type { DeviceOverview } from '@/lib/api/types';

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

function BookingPageContent() {
  const searchParams = useSearchParams();

  let isExtensionMode = false;
  let extensionDeviceId: string | null = null;
  let extensionLockerId: string | null = null;

  const extParam = searchParams.get('ext');
  if (extParam) {
    const decoded = decodeExtensionUrl(extParam);
    if (decoded) {
      isExtensionMode = true;
      extensionDeviceId = decoded.deviceId;
      extensionLockerId = decoded.lockerId;
    }
  } else {
    isExtensionMode = searchParams.get('extend') === 'true';
    extensionDeviceId = searchParams.get('device');
    extensionLockerId = searchParams.get('locker');
  }

  const [currentStep, setCurrentStep] = useState(isExtensionMode ? 2 : 1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [locationId, setLocationId] = useState(extensionDeviceId || '');
  const [lockerSize, setLockerSize] = useState('medium');
  const [hours, setHours] = useState(24);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    if (isExtensionMode) {
      if (!extensionDeviceId || !extensionLockerId) {
        setError('Invalid extension link. Missing device or locker information.');
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } else {
      loadDevicesOverview();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadDevicesOverview = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const devicesData = await getDevicesOverview();

      const transformedLocations: Location[] = devicesData
        .filter(device => device.status === 0) // Only active devices
        .map(device => ({
          id: device.id,
          name: device.name,
          address: getDeviceAddress(device),
          coordinates: {
            lat: device.location?.latitude || 0,
            lng: device.location?.longitude || 0
          },
          isActive: device.status === 0,
          available: {
            small: device.locker_metrics.small.available,
            medium: device.locker_metrics.medium.available,
            large: device.locker_metrics.large.available
          }
        }));

      setLocations(transformedLocations);
    } catch (err) {
      console.error('Failed to load devices:', err);
      setError('Failed to load available locations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to extract address from device name or use a default
  const getDeviceAddress = (device: DeviceOverview): string => {
    const addressMap: Record<string, string> = {
      'Garden City': 'Thika Road, Nairobi',
      'Doonholm': 'Donholm Savannah Rd',
      'CBD': 'Kenya National Archives',
    };

    for (const [key, value] of Object.entries(addressMap)) {
      if (device.name.includes(key)) {
        return value;
      }
    }

    return 'Nairobi, Kenya';
  };

  const calculateTotalCost = () => {
    return 50 + Math.max(0, hours - 1) * 10;
  };

  const formatPhoneNumber = (input: string): string => {
    const cleaned = input.replace(/\D/g, '');

    if (cleaned.startsWith('0')) {
      return '254' + cleaned.substring(1);
    }

    if (cleaned.startsWith('254')) {
      return cleaned;
    }

    if (cleaned.startsWith('7') || cleaned.startsWith('1')) {
      return '254' + cleaned;
    }

    return cleaned;
  };

  const validatePhoneNumber = (phone: string): boolean => {
    const formatted = formatPhoneNumber(phone);
    const phoneRegex = /^254[71]\d{8}$/;
    return phoneRegex.test(formatted);
  };

  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value);
    setPhoneError(null);
  };

  const handleBookingSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    setPhoneError(null);

    const formattedPhone = formatPhoneNumber(phoneNumber);

    if (!validatePhoneNumber(phoneNumber)) {
      setPhoneError('Please enter a valid Kenyan phone number (07XX XXX XXX or 254XXX XXX XXX)');
      setIsSubmitting(false);
      return;
    }

    try {
      if (isExtensionMode && extensionDeviceId && extensionLockerId) {
        const booking = await getBookingDetails(extensionDeviceId, formattedPhone);

        if (!booking) {
          setError('No active booking found for this phone number.');
          setIsSubmitting(false);
          return;
        }

        if (booking.locker_id !== parseInt(extensionLockerId)) {
          setError('Booking does not match the specified locker.');
          setIsSubmitting(false);
          return;
        }

        if (booking.status !== 0) {
          setError('This booking is no longer active.');
          setIsSubmitting(false);
          return;
        }

        await initiateExtensionPayment(
          extensionDeviceId,
          parseInt(extensionLockerId),
          formattedPhone,
          calculateTotalCost()
        );
      } else {
        const existingBooking = await checkExistingBooking(locationId, formattedPhone);

        if (existingBooking) {
          setError('You already have an active booking. Please collect your parcel before making a new booking.');
          setIsSubmitting(false);
          return;
        }

        await initiateBookingPayment(
          locationId,
          formattedPhone,
          calculateTotalCost(),
          lockerSize as 'small' | 'medium' | 'large',
          hours
        );
      }

      setCurrentStep(3);
    } catch (err) {
      console.error('Booking submission failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to initiate payment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return locationId && lockerSize;
      case 2:
        return phoneNumber && hours > 0 && validatePhoneNumber(phoneNumber);
      default:
        return true;
    }
  };

  const StepIndicator = () => {
    if (isExtensionMode) {
      return (
        <div className="flex items-center justify-center mb-8">
          {[2, 3].map((step, index) => (
            <div key={step} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                step <= currentStep ? 'bg-emerald-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}>
                {step < currentStep ? <CheckCircle className="h-6 w-6" /> : index + 1}
              </div>
              {index < 1 && (
                <div className={`w-16 h-1 mx-2 ${step < currentStep ? 'bg-emerald-600' : 'bg-gray-200 dark:bg-gray-700'}`} />
              )}
            </div>
          ))}
        </div>
      );
    }

    return (
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
  };

  const StepLabels = () => {
    if (isExtensionMode) {
      return (
        <div className="grid grid-cols-2 gap-4 mb-12 text-center text-sm">
          <div className={currentStep >= 2 ? 'text-emerald-600 dark:text-emerald-400 font-medium' : 'text-gray-500'}>
            Duration & Payment
          </div>
          <div className={currentStep >= 3 ? 'text-emerald-600 dark:text-emerald-400 font-medium' : 'text-gray-500'}>
            Confirmation
          </div>
        </div>
      );
    }

    return (
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
  };

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

          {error && (
            <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                <div>
                  <p className="text-red-800 dark:text-red-200 font-medium">Error</p>
                  <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
                </div>
              </div>
              <button
                onClick={loadDevicesOverview}
                className="mt-3 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
              >
                Try Again
              </button>
            </div>
          )}

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Select Location & Locker Size</h2>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Choose ParcelPoint Location
                </label>
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
                  </div>
                ) : locations.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No locations available at the moment. Please try again later.
                  </div>
                ) : (
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
                )}
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
              {isExtensionMode ? 'Extend Your Booking' : 'Book a Locker'}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {isExtensionMode
                ? 'Add more time to your current booking'
                : 'Secure your package storage in just a few simple steps'}
            </p>
          </div>
          <StepIndicator />
          <StepLabels />

          {error && (
            <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                <div>
                  <p className="text-red-800 dark:text-red-200 font-medium">Error</p>
                  <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <div className="space-y-6">
              {isExtensionMode && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <ClockIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-blue-800 dark:text-blue-200 font-medium">Extending Booking</p>
                      <p className="text-blue-700 dark:text-blue-300 text-sm">
                        You are extending your booking for Locker #{extensionLockerId}. Enter your phone number to verify and select extension duration.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {isExtensionMode ? 'Extension Duration & Payment' : 'Duration & Payment'}
              </h2>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  {isExtensionMode ? 'Extension Duration (Hours)' : 'Booking Duration (Hours)'}
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
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none ${
                      phoneError
                        ? 'border-red-500 dark:border-red-500'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="0712 345 678 or 254712 345 678"
                    autoComplete="tel"
                  />
                  {phoneError ? (
                    <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                      {phoneError}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {isExtensionMode
                        ? "You'll receive STK push to extend your booking"
                        : "You'll receive STK push and booking code via SMS"}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-green-900 dark:text-green-100">Ready to Pay</h4>
                      <p className="text-sm text-green-800 dark:text-green-200">
                        STK push will be sent to {phoneNumber ? formatPhoneNumber(phoneNumber) : 'your phone number'}
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
            {!isExtensionMode && (
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Previous
                </button>
              </div>
            )}
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
            {isExtensionMode ? 'Extend Your Booking' : 'Book a Locker'}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {isExtensionMode
              ? 'Add more time to your current booking'
              : 'Secure your package storage in just a few simple steps'}
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
                {isExtensionMode
                  ? 'Complete payment on your phone to extend your booking'
                  : 'Complete payment on your phone to receive your booking code'}
              </p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl text-left">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Next Steps</h3>
              {isExtensionMode ? (
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
                    <span>Your booking for Locker #{extensionLockerId} will be extended by {hours} hours</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold text-blue-600 mr-2">4.</span>
                    <span>You'll receive a confirmation SMS to {formatPhoneNumber(phoneNumber)}</span>
                  </li>
                </ol>
              ) : (
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
                    <span>You'll receive your 6-digit booking code via SMS to {formatPhoneNumber(phoneNumber)}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold text-blue-600 mr-2">4.</span>
                    <span>Use the code at {locations.find(loc => loc.id === locationId)?.name} for {hours} hours</span>
                  </li>
                </ol>
              )}
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

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    }>
      <BookingPageContent />
    </Suspense>
  );
}