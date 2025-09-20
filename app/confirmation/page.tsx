'use client'

import React, { useEffect, useState } from 'react';
import {
  CheckCircle,
  Package,
  Clock,
  Phone,
  Mail,
  MessageCircle,
  ExternalLink,
  Home,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

const ConfirmationPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 dark:from-emerald-900/20 dark:via-gray-900 dark:to-emerald-900/20">
      {/* Header with Logo */}
      <header className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <Link href="/" className="flex items-center gap-3 w-fit">
            <div className="w-10 h-10 bg-emerald-600 dark:bg-emerald-500 rounded-lg flex items-center justify-center">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900 dark:text-white">ParcelPoint</span>
              <span className="text-xs tracking-wider text-emerald-600 dark:text-emerald-500">DROP • PAY • PICK</span>
            </div>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="h-16 w-16 text-emerald-600 dark:text-emerald-500" />
          </div>

          {/* Main Message */}
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Thank You!
          </h1>

          <div className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            <p className="mb-4">
              Your message has been received successfully.
            </p>
            <p>
              We&apos;ll get back to you within 24 hours to discuss your ParcelPoint partnership opportunity.
            </p>
          </div>

          {/* What Happens Next */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-emerald-100 dark:border-emerald-900/30 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              What Happens Next?
            </h2>

            <div className="space-y-4 text-left">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-emerald-600 dark:text-emerald-500 font-bold text-sm">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Review Your Inquiry</h3>
                  <p className="text-gray-600 dark:text-gray-300">Our team will review your location details and partnership preferences.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-emerald-600 dark:text-emerald-500 font-bold text-sm">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Schedule a Call</h3>
                  <p className="text-gray-600 dark:text-gray-300">We&apos;ll contact you to schedule a convenient time to discuss details.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-emerald-600 dark:text-emerald-500 font-bold text-sm">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Site Assessment</h3>
                  <p className="text-gray-600 dark:text-gray-300">If suitable, we&apos;ll arrange a site visit to assess location feasibility.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Need Immediate Assistance?
            </h3>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
              <a
                href="tel:+254759777587"
                className="flex items-center gap-2 text-emerald-600 dark:text-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
              >
                <Phone className="h-4 w-4" />
                +254 759 777 587
              </a>

              <a
                href="mailto:hello@squared.co.ke"
                className="flex items-center gap-2 text-emerald-600 dark:text-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
              >
                <Mail className="h-4 w-4" />
                hello@squared.co.ke
              </a>

              <a
                href="https://wa.me/254759777587"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-600 dark:text-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-emerald-600 dark:bg-emerald-500 text-white px-8 py-4 rounded-xl hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold"
            >
              <Home className="h-5 w-5" />
              Back to Home
            </Link>

            <Link
              href="/#locations"
              className="inline-flex items-center gap-2 border-2 border-emerald-600 dark:border-emerald-500 text-emerald-600 dark:text-emerald-500 px-8 py-4 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors font-semibold"
            >
              View Locations
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          {/* Expected Response Time */}
          <div className="mt-8 flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
            <Clock className="h-5 w-5 text-emerald-600 dark:text-emerald-500" />
            <span className="text-sm">Expected response time: Within 24 hours</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p>&copy; {new Date().getFullYear()} ParcelPoint Kenya. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ConfirmationPage;