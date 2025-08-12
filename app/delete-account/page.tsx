'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Package, 
  ArrowLeft, 
  AlertTriangle, 
  Trash2, 
  Shield, 
  Clock, 
  Mail, 
  Smartphone,
  CheckCircle,
  X
} from 'lucide-react';

const DeleteAccountPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    reason: '',
    confirmText: '',
    agreeToDelete: false
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('parcelpoint-theme') as 'light' | 'dark' || 'light';
      document.documentElement.className = savedTheme;
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.confirmText.toLowerCase() !== 'delete my account') {
      alert('Please type "DELETE MY ACCOUNT" exactly as shown to confirm.');
      return;
    }

    if (!formData.agreeToDelete) {
      alert('Please confirm that you understand this action is irreversible.');
      return;
    }

    setIsSubmitting(true);

    // Simulate processing time
    setTimeout(() => {
      setIsSubmitting(false);
      setShowConfirmation(true);
      
      // Prepare email with deletion request
      const subject = encodeURIComponent('ParcelPoint Account Deletion Request');
      const body = encodeURIComponent(
        `Account Deletion Request

Email: ${formData.email}
Reason: ${formData.reason}

I confirm that I want to permanently delete my ParcelPoint account and understand that this action cannot be undone.

Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}`
      );

      // Open email client
      window.location.href = `mailto:hello@squared.co.ke?subject=${subject}&body=${body}`;
    }, 2000);
  };

  const resetForm = () => {
    setFormData({
      email: '',
      reason: '',
      confirmText: '',
      agreeToDelete: false
    });
    setShowConfirmation(false);
  };

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20">
          <div className="text-center">
            <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-emerald-600 dark:text-emerald-500" />
            </div>
            
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Deletion Request Submitted
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Your account deletion request has been submitted. We&apos;ve opened your email client with the request details. 
              Please send the email to complete the process.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">What happens next?</h3>
              <ul className="text-blue-800 dark:text-blue-400 text-sm space-y-1 text-left">
                <li>• We&apos;ll process your request within 2-3 business days</li>
                <li>• You&apos;ll receive a confirmation email once completed</li>
                <li>• All your data will be permanently removed from our systems</li>
                <li>• You can contact us if you have any questions</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetForm}
                className="border-2 border-emerald-600 dark:border-emerald-500 text-emerald-600 dark:text-emerald-500 px-6 py-3 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors font-medium"
              >
                Submit Another Request
              </button>
              
              <Link 
                href="/"
                className="bg-emerald-600 dark:bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors font-medium text-center"
              >
                Back to ParcelPoint
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Header */}
      <div className="bg-red-600 dark:bg-red-700 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-4">
            <Package className="h-8 w-8" />
            <span className="text-xl font-bold">ParcelPoint</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <Trash2 className="h-8 w-8" />
            <h1 className="text-3xl font-bold">Delete Your Account</h1>
          </div>
                        <p className="text-red-100">Permanently remove your ParcelPoint account and data</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Warning Banner */}
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-500 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-lg font-semibold text-red-900 dark:text-red-300 mb-2">
                ⚠️ This Action Cannot Be Undone
              </h2>
              <p className="text-red-800 dark:text-red-400">
                Deleting your account will permanently remove all your data, including your profile, 
                delivery history, saved locations, and preferences. This action is irreversible.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Deletion Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Account Deletion Request
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-colors"
                    placeholder="your.email@example.com"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Must match the email associated with your ParcelPoint account
                  </p>
                </div>

                {/* Reason Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Reason for Deletion (Optional)
                  </label>
                  <select
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-colors"
                  >
                    <option value="">Select a reason (optional)</option>
                    <option value="no-longer-needed">No longer need the service</option>
                    <option value="privacy-concerns">Privacy concerns</option>
                    <option value="found-alternative">Found alternative solution</option>
                    <option value="app-issues">App technical issues</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Confirmation Text */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Type &quot;DELETE MY ACCOUNT&quot; to confirm *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.confirmText}
                    onChange={(e) => setFormData({ ...formData, confirmText: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-colors"
                    placeholder="DELETE MY ACCOUNT"
                  />
                </div>

                {/* Agreement Checkbox */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="agreeToDelete"
                    required
                    checked={formData.agreeToDelete}
                    onChange={(e) => setFormData({ ...formData, agreeToDelete: e.target.checked })}
                    className="mt-1 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 dark:border-gray-600 rounded"
                  />
                  <label htmlFor="agreeToDelete" className="text-sm text-gray-700 dark:text-gray-300">
                    I understand that this action is permanent and irreversible. All my data will be permanently deleted and cannot be recovered.
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 dark:bg-red-700 text-white py-4 rounded-lg hover:bg-red-700 dark:hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold text-lg shadow-lg"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing Request...
                    </div>
                  ) : (
                    'Delete My Account Permanently'
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar Information */}
          <div className="space-y-6">
            {/* Alternative Options */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-emerald-600 dark:text-emerald-500" />
                Delete from Mobile App
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                You can also delete your account directly from the ParcelPoint mobile app:
              </p>
              <ol className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                <li>1. Open the ParcelPoint app</li>
                <li>2. Go to Profile → Settings</li>
                <li>3. Scroll to &quot;Account Management&quot;</li>
                <li>4. Tap &quot;Delete Account&quot;</li>
                <li>5. Follow the confirmation steps</li>
              </ol>
            </div>

            {/* What Gets Deleted */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-red-600 dark:text-red-500" />
                What Gets Deleted
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                <li className="flex items-center gap-2">
                  <X className="h-4 w-4 text-red-500" />
                  Your profile and account information
                </li>
                <li className="flex items-center gap-2">
                  <X className="h-4 w-4 text-red-500" />
                  Delivery and pickup history
                </li>
                <li className="flex items-center gap-2">
                  <X className="h-4 w-4 text-red-500" />
                  Saved locations and preferences
                </li>
                <li className="flex items-center gap-2">
                  <X className="h-4 w-4 text-red-500" />
                  Payment information and receipts
                </li>
                <li className="flex items-center gap-2">
                  <X className="h-4 w-4 text-red-500" />
                  All app data and settings
                </li>
              </ul>
            </div>

            {/* Timeline */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600 dark:text-blue-500" />
                Deletion Timeline
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Immediate</div>
                    <div className="text-gray-600 dark:text-gray-300">Account access disabled</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Within 24 hours</div>
                    <div className="text-gray-600 dark:text-gray-300">Data deletion begins</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Within 30 days</div>
                    <div className="text-gray-600 dark:text-gray-300">Complete data removal</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-300 mb-4 flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Need Help?
              </h3>
              <p className="text-emerald-800 dark:text-emerald-400 text-sm mb-4">
                If you have questions or need assistance with account deletion, please contact us:
              </p>
              <a
                href="mailto:hello@squared.co.ke"
                className="text-emerald-700 dark:text-emerald-300 hover:text-emerald-800 dark:hover:text-emerald-200 font-medium text-sm underline"
              >
                hello@squared.co.ke
              </a>
            </div>
          </div>
        </div>

        {/* Back Navigation */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
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
  );
};

export default DeleteAccountPage;