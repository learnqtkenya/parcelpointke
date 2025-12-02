'use client'

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Building2 } from 'lucide-react';
import { BreadcrumbStructuredData } from '@/components/StructuredData';

export default function PartnershipsContent() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: 'https://parcelpoint.co.ke' },
          { name: 'Partnership Models', url: 'https://parcelpoint.co.ke/partnerships' }
        ]}
      />
      <header className="bg-gradient-to-r from-emerald-600 to-emerald-700 dark:from-emerald-700 dark:to-emerald-900 text-white py-16 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-emerald-50 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
              <Building2 size={40} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Partnership Models</h1>
          </div>
          <p className="text-xl text-emerald-50 max-w-3xl">
            Choose from three flexible partnership models designed to match your investment capacity and income goals.
          </p>
        </div>
      </header>

      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 border-2 border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600 transition-colors shadow-lg">
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  We Pay You Rent
                </h3>
                <p className="text-emerald-600 dark:text-emerald-500 font-medium">Passive Income | Zero Investment</p>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">How It Works:</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    No investment required. ParcelPoint funds, owns, and manages everything while you receive guaranteed monthly rent.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Partner Responsibilities:</h4>
                  <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-1">
                    <li>• Provide suitable space for installation</li>
                    <li>• No financial or operational involvement</li>
                    <li>• Collect guaranteed monthly rent</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">ParcelPoint Handles:</h4>
                  <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-1">
                    <li>• Purchase, install, and own equipment</li>
                    <li>• All operations and customer service</li>
                    <li>• Technology management</li>
                    <li>• Pay fixed rent consistently</li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Income Type:</h4>
                  <div className="text-center">
                    <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-500">Fixed Monthly Rent</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center">Income guaranteed and not affected by usage</p>
                </div>
              </div>

              <button
                className="w-full bg-gray-900 dark:bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-500 transition-colors font-medium"
                onClick={() => window.open('https://wa.me/254759777587?text=I\'m interested in your "We Pay You Rent" model where I receive guaranteed monthly rent with zero investment. I\'d like to learn more about the requirements and rental rates.', '_blank')}
              >
                Rent My Space
              </button>
            </div>

            <div className="bg-emerald-50 dark:bg-gray-800 rounded-xl p-6 sm:p-8 border-2 border-emerald-200 dark:border-emerald-700 relative shadow-lg">
              <div className="absolute top-4 right-4 sm:block hidden bg-emerald-600 dark:bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <div className="sm:hidden flex justify-center mb-4">
                <div className="bg-emerald-600 dark:bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Managed Service Partnership
                </h3>
                <p className="text-emerald-600 dark:text-emerald-500 font-medium">Premium Partnership | High Returns</p>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">How It Works:</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Own the locker equipment as a valuable asset while ParcelPoint handles operations. Earn majority revenue with equity building.
                  </p>
                </div>

                <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Investment Required:</h4>
                  <div className="text-center">
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">KES 150k - 500k</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center">Depending on size and number of compartments</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Partner Responsibilities:</h4>
                  <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-1">
                    <li>• Invest upfront in locker equipment</li>
                    <li>• Pay monthly management fee + small revenue share</li>
                    <li>• Provide space for installation</li>
                    <li>• Enjoy majority revenue share and long-term asset value</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">ParcelPoint Handles:</h4>
                  <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-1">
                    <li>• Daily operations and customer service</li>
                    <li>• Platform, brand access, and system updates</li>
                    <li>• Technology management</li>
                    <li>• Service reliability and customer satisfaction</li>
                  </ul>
                </div>

                <div className="bg-emerald-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Your Benefits:</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    <strong>Own equipment as asset + Earn majority of transaction revenue + Build long-term equity</strong>
                  </p>
                </div>
              </div>

              <button
                className="w-full bg-emerald-600 dark:bg-emerald-500 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors font-medium"
                onClick={() => window.open('https://wa.me/254759777587?text=I\'m interested in your Managed Service Partnership where I can invest in the locker equipment and earn majority revenue while building equity. Could you please provide pricing details and expected returns?', '_blank')}
              >
                Get Quote
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 border-2 border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600 transition-colors shadow-lg">
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Revenue Partnership
                </h3>
                <p className="text-emerald-600 dark:text-emerald-500 font-medium">Shared Growth | Performance-Based</p>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">How It Works:</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    No upfront investment required. Earn through revenue sharing based on transactions with local promotion opportunities.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Partner Responsibilities:</h4>
                  <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-1">
                    <li>• Provide space for installation</li>
                    <li>• Promote the service locally to boost usage</li>
                    <li>• Earn a percentage of transaction revenue</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">ParcelPoint Handles:</h4>
                  <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-1">
                    <li>• Fund and install the locker equipment</li>
                    <li>• Operate lockers under ParcelPoint brand</li>
                    <li>• Technology, service, and customer support</li>
                    <li>• Share revenue with transparency</li>
                  </ul>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Income Type:</h4>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">Revenue Sharing</div>
                    <p className="text-xs text-gray-600 dark:text-gray-300">Growth-focused, performance-based income</p>
                  </div>
                </div>
              </div>

              <button
                className="w-full bg-blue-600 dark:bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-medium"
                onClick={() => window.open('https://wa.me/254759777587?text=I\'m interested in your Revenue Partnership model with performance-based income sharing. I have a good location and would like to know more about the revenue split and promotion requirements.', '_blank')}
              >
                Become Partner
              </button>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Not sure which partnership model is right for you? We'll help you choose the best option based on your investment capacity and income goals.
            </p>
            <button
              className="bg-emerald-600 dark:bg-emerald-500 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors font-medium inline-flex items-center gap-2"
              onClick={() => window.open('https://wa.me/254759777587?text=I\'m interested in ParcelPoint and would like to discuss the different partnership models to find the best fit for my needs.', '_blank')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
              Get Free Consultation
            </button>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl text-gray-900 dark:text-white font-bold mb-4">
              Why Partner with ParcelPoint?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Join Kenya's leading smart locker network and benefit from our proven business model
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 text-center">
              <div className="bg-emerald-100 dark:bg-emerald-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Proven Technology</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Reliable, tested smart locker systems with 24/7 monitoring</p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 text-center">
              <div className="bg-emerald-100 dark:bg-emerald-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Fast Setup</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Quick installation and onboarding process to start earning</p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 text-center">
              <div className="bg-emerald-100 dark:bg-emerald-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Full Support</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Ongoing technical support and maintenance included</p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 text-center">
              <div className="bg-emerald-100 dark:bg-emerald-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Flexible Terms</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Multiple partnership options to fit your business needs</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-100 dark:bg-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © 2025 ParcelPoint Kenya. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center gap-6 text-sm">
            <Link href="/privacy-policy" className="text-emerald-600 dark:text-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="text-emerald-600 dark:text-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
