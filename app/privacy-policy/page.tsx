import React from 'react';
import Link from 'next/link';
import { Package, ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Header */}
      <div className="bg-emerald-600 dark:bg-emerald-700 text-white py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-4">
            <Package className="h-8 w-8" />
            <span className="text-xl font-bold">ParcelPoint</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-emerald-100">Last updated: December 2024</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            ParcelPoint (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to protecting your privacy.
            This Privacy Policy explains how we collect, use, and protect the information you provide when using our mobile app and services.
          </p>

          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Information We Collect</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            We only collect your email address when you sign up or log in to the ParcelLockerAdmin app.
            We do not use, share, or store this email address for any other purpose.
          </p>

          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">How We Use Your Information</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            Your email is used solely for authentication and to manage your access to the app.
            We do not send promotional emails or share your email with third parties.
          </p>

          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Data Security</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            We implement standard security measures to protect your email address from unauthorized access or disclosure.
          </p>

          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Changes to this Policy</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            We may update this Privacy Policy occasionally. Changes will be posted on this page.
          </p>

          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Contact Us</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            If you have any questions about this Privacy Policy, please contact us at:{' '}
            <a 
              className="text-emerald-600 dark:text-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 underline" 
              href="mailto:hello@squared.co.ke"
            >
              hello@squared.co.ke
            </a>
          </p>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to ParcelPoint
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;