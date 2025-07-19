import React from 'react';
import Link from 'next/link';
import { Package, ArrowLeft } from 'lucide-react';

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Header */}
      <div className="bg-emerald-600 dark:bg-emerald-700 text-white py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-4">
            <Package className="h-8 w-8" />
            <span className="text-xl font-bold">ParcelPoint</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Terms & Conditions</h1>
          <p className="text-emerald-100">Last updated: December 2024</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            Welcome to ParcelPoint! These Terms and Conditions govern your use of the ParcelLockerAdmin app and related services.
            By using the app, you agree to comply with these terms.
          </p>

          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Use of the App</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            You must provide a valid email address for authentication. You are responsible for keeping your login credentials secure.
          </p>

          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Limitation of Liability</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            We are not liable for any indirect, incidental, or consequential damages resulting from the use or inability to use the app.
          </p>

          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Changes to Terms</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            We may modify these Terms and Conditions at any time. Updates will be posted on this page.
          </p>

          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Contact Us</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            If you have questions about these Terms, please contact us at:{' '}
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

export default TermsConditions;