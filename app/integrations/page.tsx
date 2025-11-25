'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { Book, Code, Key, Package, MapPin, Users, ChevronDown, ChevronRight, Copy, Check, Mail, ExternalLink } from 'lucide-react';

export default function DevelopersPage() {
  const [activeTab, setActiveTab] = useState<'process' | 'integration'>('process');
  const [openSection, setOpenSection] = useState<string>('authentication');
  const [copiedCode, setCopiedCode] = useState<string>('');

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const baseUrl = 'https://learnqt.alwaysdata.net/api/v1';

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? '' : section);
  };

  const CodeBlock = ({ code, language = 'bash', id }: { code: string; language?: string; id: string }) => (
    <div className="relative bg-gray-900 dark:bg-gray-800 rounded-lg p-4 my-4">
      <button
        onClick={() => copyToClipboard(code, id)}
        className="absolute top-2 right-2 p-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
      >
        {copiedCode === id ? <Check size={16} className="text-green-400" /> : <Copy size={16} className="text-gray-400" />}
      </button>
      <pre className="text-sm text-gray-100 overflow-x-auto">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );

  const EndpointCard = ({
    method,
    path,
    description,
    auth = 'JWT',
    requestBody,
    responseExample,
    queryParams
  }: {
    method: string;
    path: string;
    description: string;
    auth?: string;
    requestBody?: string;
    responseExample?: string;
    queryParams?: { name: string; type: string; description: string; required?: boolean }[];
  }) => (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-5 mb-4 bg-white dark:bg-gray-800/50 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4 mb-2 flex-wrap">
        <span className={`px-3 py-1 rounded-lg text-sm font-semibold shadow-sm ${method === 'GET' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' :
            method === 'POST' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' :
              method === 'PUT' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300' :
                'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
          }`}>
          {method}
        </span>
        <code className="text-sm flex-1 font-mono bg-gray-100 dark:bg-gray-900 px-3 py-1.5 rounded-lg">{path}</code>
        <span className="px-3 py-1 text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 rounded-lg font-medium shadow-sm">
          {auth}
        </span>
      </div>
      <p className="text-gray-700 dark:text-gray-300 mb-3">{description}</p>

      {queryParams && queryParams.length > 0 && (
        <div className="mb-3">
          <h5 className="font-semibold mb-2">Query Parameters:</h5>
          <div className="space-y-2">
            {queryParams.map((param) => (
              <div key={param.name} className="pl-4 border-l-2 border-gray-300 dark:border-gray-600">
                <code className="text-sm font-mono">{param.name}</code>
                <span className="text-xs text-gray-500 ml-2">({param.type})</span>
                {param.required && <span className="text-xs text-red-500 ml-2">required</span>}
                <p className="text-sm text-gray-600 dark:text-gray-400">{param.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {requestBody && (
        <div>
          <h5 className="font-semibold mb-2">Request Body:</h5>
          <CodeBlock code={requestBody} language="json" id={`req-${path}`} />
        </div>
      )}

      {responseExample && (
        <div>
          <h5 className="font-semibold mb-2">Response Example:</h5>
          <CodeBlock code={responseExample} language="json" id={`res-${path}`} />
        </div>
      )}
    </div>
  );

  const Section = ({ id, title, icon: Icon, children }: { id: string; title: string; icon: React.ElementType; children: React.ReactNode }) => (
    <div className="mb-6">
      <button
        onClick={() => toggleSection(id)}
        className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl hover:bg-emerald-50 dark:hover:bg-gray-700 transition-all shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center gap-3">
          <Icon className="text-emerald-600 dark:text-emerald-400" size={24} />
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        {openSection === id ? <ChevronDown size={20} className="text-emerald-600 dark:text-emerald-400" /> : <ChevronRight size={20} className="text-emerald-600 dark:text-emerald-400" />}
      </button>
      {openSection === id && (
        <div className="mt-4 pl-4 border-l-4 border-emerald-500 dark:border-emerald-600">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white dark:from-gray-900 to-emerald-50 dark:to-emerald-950 text-gray-900 dark:text-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 dark:from-emerald-700 dark:to-emerald-900 text-white py-16 shadow-xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
              <Book size={40} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Integration Documentation</h1>
          </div>
          <p className="text-xl text-emerald-50">Learn how to integrate ParcelPoint smart locker services</p>
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20 shadow-lg">
              <div className="text-sm text-emerald-100 font-medium">Base URL</div>
              <code className="text-white font-mono text-sm">{baseUrl}</code>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20 shadow-lg">
              <div className="text-sm text-emerald-100 font-medium">Version</div>
              <code className="text-white font-mono text-sm">v1</code>
            </div>
          </div>
        </div>
      </div>

      {/* Content with Sidebar */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:w-64 shrink-0">
            <nav className="sticky top-4 space-y-3">
              <button
                onClick={() => setActiveTab('process')}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all shadow-md hover:shadow-lg ${
                  activeTab === 'process'
                    ? 'bg-emerald-600 dark:bg-emerald-600 text-white'
                    : 'bg-white dark:bg-gray-800 hover:bg-emerald-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Package size={20} />
                  <span className="font-semibold">Process</span>
                </div>
                <p className="text-xs mt-1 opacity-80">How it works</p>
              </button>
              <button
                onClick={() => setActiveTab('integration')}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all shadow-md hover:shadow-lg ${
                  activeTab === 'integration'
                    ? 'bg-emerald-600 dark:bg-emerald-600 text-white'
                    : 'bg-white dark:bg-gray-800 hover:bg-emerald-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Code size={20} />
                  <span className="font-semibold">Integration</span>
                </div>
                <p className="text-xs mt-1 opacity-80">API Reference</p>
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {activeTab === 'process' && (
              <div>
                <h2 className="text-3xl font-bold mb-6">How ParcelPoint Integration Works</h2>
                <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">
                  This guide explains the complete workflow for partner organizations using ParcelPoint smart locker services.
                </p>

                {/* Step 1: Create Reservations */}
                <div className="mb-8">
                  <div className="bg-emerald-600 dark:bg-emerald-700 text-white inline-block px-5 py-2 rounded-xl mb-4 shadow-md">
                    <h3 className="text-xl font-bold">Step 1: Create Locker Reservations</h3>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
                    <p className="mb-4">
                      Your organization uses the ParcelPoint API to reserve lockers at specific devices. When you create a reservation via API:
                    </p>
                    <ul className="space-y-2 ml-6 list-disc">
                      <li>Specify the <strong>device ID</strong>, <strong>locker size</strong> (small, medium, or large), <strong>quantity</strong>, and <strong>expiration date</strong></li>
                      <li>Our web service receives your reservation request and validates it</li>
                      <li>The device is notified of the reservation in real-time</li>
                      <li>The specified quantity of lockers for that size becomes <strong>reserved</strong> and unavailable to the public</li>
                      <li>Your organization can now use these reserved lockers exclusively</li>
                    </ul>
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 mt-4">
                      <p className="text-sm">
                        <strong>Example:</strong> If you reserve 10 small lockers at Device DEV001 until end of month, those 10 small compartments are marked as reserved on the device and can only be used by your carriers.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 2: Carrier Setup */}
                <div className="mb-8">
                  <div className="bg-emerald-600 dark:bg-emerald-700 text-white inline-block px-5 py-2 rounded-xl mb-4 shadow-md">
                    <h3 className="text-xl font-bold">Step 2: Carrier Setup & Registration</h3>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
                    <p className="mb-4">
                      Your delivery carriers (drivers, couriers) need to download and set up the ParcelLockerAdmin mobile app:
                    </p>
                    <ol className="space-y-3 ml-6 list-decimal">
                      <li>
                        <strong>Download the App:</strong> Carriers download <a href="https://play.google.com/store/apps/details?id=ke.co.squared.parcellockeradmin" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 underline hover:text-emerald-700 dark:hover:text-emerald-300">ParcelLockerAdmin</a> from Google Play Store
                      </li>
                      <li>
                        <strong>Sign Up:</strong> Carriers create an account using their email and phone number
                      </li>
                      <li>
                        <strong>Get User ID:</strong> After signup, carriers navigate to the <strong>Profile section</strong> in the app to find their unique <strong>User ID</strong>
                      </li>
                      <li>
                        <strong>Share User ID:</strong> Carriers share this User ID with your organization
                      </li>
                      <li>
                        <strong>Organization Adds Carrier:</strong> You use the ParcelPoint API to assign the carrier (by User ID) to your organization, giving them access to your reservations
                      </li>
                    </ol>
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 mt-4">
                      <p className="text-sm">
                        <strong>Note:</strong> Only carriers assigned to your organization can view and use your reserved lockers. This ensures security and prevents unauthorized access.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 3: Depositing Parcels */}
                <div className="mb-8">
                  <div className="bg-emerald-600 dark:bg-emerald-700 text-white inline-block px-5 py-2 rounded-xl mb-4 shadow-md">
                    <h3 className="text-xl font-bold">Step 3: Depositing Parcels in Lockers</h3>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
                    <p className="mb-4">
                      When a carrier arrives at a smart locker device to deposit parcels:
                    </p>
                    <ol className="space-y-3 ml-6 list-decimal">
                      <li>
                        <strong>Get Device ID:</strong> The carrier <strong>swipes down on the device's home screen</strong> to reveal a QR code containing the device ID
                      </li>
                      <li>
                        <strong>Open App Reservations:</strong> In the ParcelLockerAdmin app, the carrier navigates to the <strong>Reservations tab</strong>
                      </li>
                      <li>
                        <strong>Scan Device QR Code:</strong> The carrier taps to scan and points their phone at the device's QR code
                      </li>
                      <li>
                        <strong>View Reservations:</strong> The app fetches and displays all active reservations for that device belonging to your organization, showing available quantities by size (e.g., "5 Small lockers available", "3 Medium lockers available")
                      </li>
                      <li>
                        <strong>Select Size & Scan Parcel:</strong> The carrier selects the appropriate size (e.g., Small) and then scans the parcel's barcode
                      </li>
                      <li>
                        <strong>Locker Opens:</strong> The app sends a request to the device, which automatically opens an available reserved locker of that size
                      </li>
                      <li>
                        <strong>Deposit Parcel:</strong> The carrier places the parcel inside the open locker and closes the door
                      </li>
                      <li>
                        <strong>Parcel Recorded:</strong> The parcel information (parcel ID, device ID, locker ID, timestamp, etc.) is sent back to our web service and stored
                      </li>
                    </ol>
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 mt-4">
                      <p className="text-sm">
                        <strong>Behind the scenes:</strong> When a parcel is deposited, the device updates its internal state, marks the locker as occupied, generates an unlocking code, and decreases your reservation's available quantity by 1.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 4: Tracking Parcels */}
                <div className="mb-8">
                  <div className="bg-emerald-600 dark:bg-emerald-700 text-white inline-block px-5 py-2 rounded-xl mb-4 shadow-md">
                    <h3 className="text-xl font-bold">Step 4: Tracking Parcel Status</h3>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
                    <p className="mb-4">
                      Once parcels are deposited, your organization has multiple ways to track them:
                    </p>

                    <h4 className="font-semibold mb-3 text-emerald-700 dark:text-emerald-400">Real-Time Webhooks (Recommended):</h4>
                    <ul className="space-y-2 ml-6 list-disc mb-6">
                      <li>
                        <strong>Parcel Created:</strong> When a carrier deposits a parcel, our system immediately sends a webhook to your configured URL with full parcel details (parcel ID, device ID, locker ID, unlocking code, timestamps, status, etc.)
                      </li>
                      <li>
                        <strong>Parcel Collected:</strong> When the recipient collects the parcel (status changes to "Collected"), you receive another webhook notification
                      </li>
                      <li>
                        <strong>Parcel Discarded:</strong> If a parcel is removed without collection (status "Discarded"), you're notified
                      </li>
                      <li>
                        <strong>Parcel Updated:</strong> Any updates to parcel information trigger a webhook
                      </li>
                    </ul>

                    <h4 className="font-semibold mb-3 text-emerald-700 dark:text-emerald-400">API Polling (Alternative):</h4>
                    <ul className="space-y-2 ml-6 list-disc">
                      <li>Use the <code className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">/devices/:id/org/parcels</code> or <code className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">/organizations/parcels</code> endpoints to fetch parcel lists</li>
                      <li>Filter by device, status, date range, etc.</li>
                      <li>Poll periodically to check for status changes</li>
                    </ul>

                    <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 mt-4">
                      <p className="text-sm mb-2">
                        <strong>Parcel Statuses:</strong>
                      </p>
                      <ul className="text-sm space-y-1 ml-4">
                        <li><code>0 - Stored:</code> Parcel is in the locker awaiting collection</li>
                        <li><code>1 - Collected:</code> Parcel has been collected by recipient</li>
                        <li><code>2 - Discarded:</code> Parcel was removed without collection (expired/damaged)</li>
                        <li><code>3 - Reserved:</code> Locker reserved but parcel not yet deposited</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Complete Workflow Diagram */}
                <div className="mb-8">
                  <div className="bg-emerald-600 dark:bg-emerald-700 text-white inline-block px-5 py-2 rounded-xl mb-4 shadow-md">
                    <h3 className="text-xl font-bold">Complete Workflow Summary</h3>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-xl p-6 border-2 border-emerald-200 dark:border-emerald-700 shadow-lg">
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="bg-emerald-600 dark:bg-emerald-700 text-white rounded-full w-8 h-8 flex items-center justify-center shrink-0 font-bold shadow-md">1</div>
                        <div>
                          <strong>Organization creates reservations</strong> → API call reserves lockers on device
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="bg-emerald-600 dark:bg-emerald-700 text-white rounded-full w-8 h-8 flex items-center justify-center shrink-0 font-bold shadow-md">2</div>
                        <div>
                          <strong>Carriers download app & sign up</strong> → Share User ID → Organization assigns them
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="bg-emerald-600 dark:bg-emerald-700 text-white rounded-full w-8 h-8 flex items-center justify-center shrink-0 font-bold shadow-md">3</div>
                        <div>
                          <strong>Carrier at device</strong> → Scan device QR → View reservations → Scan parcel → Locker opens → Deposit parcel
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="bg-emerald-600 dark:bg-emerald-700 text-white rounded-full w-8 h-8 flex items-center justify-center shrink-0 font-bold shadow-md">4</div>
                        <div>
                          <strong>System notifies organization</strong> → Webhook sent with parcel details → Organization tracks status
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="bg-emerald-600 dark:bg-emerald-700 text-white rounded-full w-8 h-8 flex items-center justify-center shrink-0 font-bold shadow-md">5</div>
                        <div>
                          <strong>Recipient collects parcel</strong> → Status updates to "Collected" → Organization receives webhook notification
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Next Steps */}
                <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 dark:from-emerald-700 dark:to-emerald-900 text-white rounded-xl p-8 shadow-xl">
                  <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
                  <p className="mb-6 text-emerald-50">
                    Contact our team to set up your organization account and receive your API credentials. Then head over to the <strong>Integration</strong> tab to see detailed API documentation.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => setActiveTab('integration')}
                      className="bg-white text-emerald-700 px-8 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      View API Documentation
                    </button>
                    <a
                      href="mailto:developers@parcelpoint.co.ke"
                      className="bg-emerald-800 dark:bg-emerald-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-emerald-900 dark:hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      Contact Us
                    </a>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'integration' && (
              <div>
        {/* Quick Start */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4">API Reference</h2>
          <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-6">
            <p className="mb-4">
              The ParcelPoint API provides programmatic access to our smart locker network for partner organizations.
            </p>
            <h3 className="font-semibold mb-3">Onboarding Process:</h3>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>Contact ParcelPoint to request API access for your organization</li>
              <li>Our admin team will create your organization account and provide:
                <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                  <li><strong>Organization ID</strong> - Your unique organization identifier</li>
                  <li><strong>API Key</strong> - Used to authenticate all API requests</li>
                  <li><strong>Webhook Secret</strong> (optional) - Used to sign webhooks you send to our API</li>
                </ul>
              </li>
              <li>We'll configure your webhook URL if you want to receive real-time parcel notifications</li>
              <li>Start making API calls using your API key</li>
            </ol>
          </div>
        </div>

        {/* Authentication */}
        <Section id="authentication" title="Authentication" icon={Key}>
          <p className="mb-4">
            All API requests must be authenticated using an API key provided by ParcelPoint. Include your API key in the <code>X-API-Key</code> header.
          </p>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 my-4">
            <h4 className="font-semibold mb-2">Making Authenticated Requests</h4>
            <CodeBlock code={`GET https://api.parcelpoint.co.ke/api/v1/devices/overview
X-API-Key: your-api-key-here
Content-Type: application/json`} language="http" id="api-key-example" />
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 my-4">
            <h4 className="font-semibold mb-2">Example with cURL</h4>
            <CodeBlock code={`curl -X GET https://api.parcelpoint.co.ke/api/v1/devices/overview \\
  -H "X-API-Key: your-api-key-here" \\
  -H "Content-Type: application/json"`} language="bash" id="curl-example" />
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 my-4">
            <h4 className="font-semibold mb-2">Example with JavaScript/Node.js</h4>
            <CodeBlock code={`const axios = require('axios');

const apiKey = process.env.PARCELPOINT_API_KEY;

const response = await axios.get(
  'https://api.parcelpoint.co.ke/api/v1/devices/overview',
  {
    headers: {
      'X-API-Key': apiKey,
      'Content-Type': 'application/json'
    }
  }
);

console.log(response.data);`} language="javascript" id="js-example" />
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 my-4">
            <h4 className="font-semibold mb-2">Security Best Practices</h4>
            <ul className="text-sm space-y-2 list-disc list-inside ml-2">
              <li>Store your API key securely as an environment variable</li>
              <li>Never commit API keys to version control</li>
              <li>Never expose API keys in client-side code</li>
              <li>Rotate your API keys periodically (contact admin for key rotation)</li>
              <li>Use HTTPS for all API requests</li>
            </ul>
          </div>
        </Section>

        {/* Devices */}
        <Section id="devices" title="Devices" icon={MapPin}>
          <p className="mb-4">
            Access information about smart locker devices, including their locations, capacity, and real-time availability.
          </p>

          <EndpointCard
            method="GET"
            path="/devices/overview"
            description="Get an overview of all devices with their metrics"
            auth="API Key"
            responseExample={`{
  "devices": [
    {
      "id": "DEV001",
      "name": "Westlands Hub",
      "location": {
        "latitude": -1.2694,
        "longitude": 36.8107
      },
      "capacity": 50,
      "status": 0,
      "last_seen": "2025-01-20T10:00:00Z",
      "locker_metrics": {
        "small": {
          "available": 8,
          "total": 20
        },
        "medium": {
          "available": 12,
          "total": 20
        },
        "large": {
          "available": 7,
          "total": 10
        },
        "total_available": 27,
        "total_occupied": 23,
        "total": 50
      },
      "created_at": "2025-01-01T00:00:00Z",
      "updated_at": "2025-01-20T10:00:00Z"
    }
  ]
}`}
          />

          <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 my-4">
            <h4 className="font-semibold mb-2">Device Status</h4>
            <ul className="text-sm space-y-1">
              <li><code>0</code> - Active: Device is online and operational</li>
              <li><code>1</code> - Inactive: Device is offline or under maintenance</li>
            </ul>
          </div>
        </Section>

        {/* Locker Reservations */}
        <Section id="reservations" title="Locker Reservations" icon={Package}>
          <p className="mb-4">
            Manage locker reservations for your organization. Reservations allow you to pre-book lockers of specific sizes for a defined period.
          </p>

          <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 my-4">
            <h4 className="font-semibold mb-2">Locker Sizes</h4>
            <ul className="text-sm space-y-1">
              <li><code>0</code> - Small</li>
              <li><code>1</code> - Medium</li>
              <li><code>2</code> - Large</li>
            </ul>
          </div>

          <EndpointCard
            method="POST"
            path="/devices/:id/org/reservations"
            description="Create a new locker reservation for a specific device"
            auth="API Key"
            requestBody={`{
  "device_id": "DEV001",
  "size": 1,
  "quantity": 5,
  "expires_at": "2025-12-31T23:59:59Z"
}`}
            responseExample={`{
  "id": 1,
  "device_id": "DEV001",
  "organization_id": 1,
  "size": 1,
  "quantity": 5,
  "quantity_used": 0,
  "status": 0,
  "reserved_at": "2025-01-20T10:00:00Z",
  "expires_at": "2025-12-31T23:59:59Z",
  "created_at": "2025-01-20T10:00:00Z",
  "updated_at": "2025-01-20T10:00:00Z"
}`}
          />

          <EndpointCard
            method="GET"
            path="/devices/:id/org/reservations"
            description="List all reservations for your organization on a specific device"
            auth="API Key"
            queryParams={[
              { name: 'limit', type: 'integer', description: 'Maximum number of results (default: 20)' },
              { name: 'offset', type: 'integer', description: 'Number of results to skip (default: 0)' }
            ]}
            responseExample={`{
  "data": [
    {
      "id": 1,
      "device_id": "DEV001",
      "organization_id": 1,
      "size": 1,
      "quantity": 5,
      "quantity_used": 2,
      "status": 0,
      "reserved_at": "2025-01-20T10:00:00Z",
      "expires_at": "2025-12-31T23:59:59Z",
      "created_at": "2025-01-20T10:00:00Z",
      "updated_at": "2025-01-20T10:00:00Z"
    }
  ],
  "pagination": {
    "total": 1,
    "limit": 20,
    "offset": 0
  }
}`}
          />

          <EndpointCard
            method="GET"
            path="/devices/:id/org/reservations/:reservation_id"
            description="Get details of a specific reservation"
            auth="API Key"
            responseExample={`{
  "id": 1,
  "device_id": "DEV001",
  "organization_id": 1,
  "size": 1,
  "quantity": 5,
  "quantity_used": 2,
  "status": 0,
  "reserved_at": "2025-01-20T10:00:00Z",
  "expires_at": "2025-12-31T23:59:59Z",
  "created_at": "2025-01-20T10:00:00Z",
  "updated_at": "2025-01-20T10:00:00Z"
}`}
          />

          <EndpointCard
            method="PUT"
            path="/devices/:id/org/reservations/:reservation_id"
            description="Update a reservation"
            auth="API Key"
            requestBody={`{
  "size": 1,
  "quantity": 10,
  "expires_at": "2025-12-31T23:59:59Z",
  "status": 0
}`}
            responseExample={`{
  "id": 1,
  "device_id": "DEV001",
  "organization_id": 1,
  "size": 1,
  "quantity": 10,
  "quantity_used": 2,
  "status": 0,
  "reserved_at": "2025-01-20T10:00:00Z",
  "expires_at": "2025-12-31T23:59:59Z",
  "created_at": "2025-01-20T10:00:00Z",
  "updated_at": "2025-01-20T10:00:00Z"
}`}
          />

          <EndpointCard
            method="DELETE"
            path="/devices/:id/org/reservations/:reservation_id"
            description="Cancel a reservation"
            auth="API Key"
            responseExample={`{
  "message": "Reservation cancelled successfully"
}`}
          />

          <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 my-4">
            <h4 className="font-semibold mb-2">Reservation Status</h4>
            <ul className="text-sm space-y-1">
              <li><code>0</code> - Active: Reservation is active and can be used</li>
              <li><code>1</code> - Used: All reserved lockers have been used</li>
              <li><code>2</code> - Cancelled: Reservation has been cancelled</li>
            </ul>
          </div>
        </Section>

        {/* Parcels */}
        <Section id="parcels" title="Parcels" icon={Package}>
          <p className="mb-4">
            Track and manage parcels stored in smart lockers. Parcels represent individual items stored in locker compartments.
          </p>

          <EndpointCard
            method="GET"
            path="/devices/:id/org/parcels"
            description="List all parcels for your organization on a specific device"
            auth="API Key"
            queryParams={[
              { name: 'limit', type: 'integer', description: 'Maximum number of results (default: 20)' },
              { name: 'offset', type: 'integer', description: 'Number of results to skip (default: 0)' }
            ]}
            responseExample={`{
  "data": [
    {
      "id": 1,
      "parcel_id": "PKG001",
      "device_id": "DEV001",
      "locker_id": 5,
      "unlocking_code": "1234",
      "sender_phone_no": "+254712345678",
      "recipient_phone_no": "+254798765432",
      "receipt_time": "2025-01-20T10:00:00Z",
      "collected_time": null,
      "status": 0,
      "organization_id": 1,
      "created_at": "2025-01-20T10:00:00Z",
      "updated_at": "2025-01-20T10:00:00Z"
    }
  ],
  "pagination": {
    "total": 1,
    "limit": 20,
    "offset": 0
  }
}`}
          />

          <EndpointCard
            method="GET"
            path="/organizations/parcels"
            description="List all parcels for your organization across all devices"
            auth="API Key"
            queryParams={[
              { name: 'limit', type: 'integer', description: 'Maximum number of results (default: 20)' },
              { name: 'offset', type: 'integer', description: 'Number of results to skip (default: 0)' }
            ]}
            responseExample={`{
  "data": [
    {
      "id": 1,
      "parcel_id": "PKG001",
      "device_id": "DEV001",
      "locker_id": 5,
      "unlocking_code": "1234",
      "sender_phone_no": "+254712345678",
      "recipient_phone_no": "+254798765432",
      "receipt_time": "2025-01-20T10:00:00Z",
      "collected_time": null,
      "status": 0,
      "organization_id": 1,
      "created_at": "2025-01-20T10:00:00Z",
      "updated_at": "2025-01-20T10:00:00Z"
    }
  ],
  "pagination": {
    "total": 1,
    "limit": 20,
    "offset": 0
  }
}`}
          />

          <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 my-4">
            <h4 className="font-semibold mb-2">Parcel Status</h4>
            <ul className="text-sm space-y-1">
              <li><code>0</code> - Active: Parcel is in the locker waiting for collection</li>
              <li><code>1</code> - Collected: Parcel has been collected by recipient</li>
              <li><code>2</code> - Discarded: Parcel was not collected and has been removed</li>
              <li><code>3</code> - Reserved: Locker is reserved but parcel not yet deposited</li>
            </ul>
          </div>
        </Section>

        {/* Webhooks */}
        <Section id="webhooks" title="Webhooks" icon={Code}>
          <p className="mb-4">
            The ParcelPoint API supports bidirectional webhook integration. The API sends webhooks TO your organization when parcel events occur,
            and your organization can send webhooks TO the API to update parcel information.
          </p>

          <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 my-4">
            <h4 className="font-semibold mb-2">Setting Up Webhooks</h4>
            <ol className="text-sm space-y-2 list-decimal list-inside">
              <li>Contact your administrator to configure a <code>webhook_url</code> and <code>webhook_secret</code> for your organization</li>
              <li>Implement a POST endpoint on your server to receive incoming webhooks from ParcelPoint</li>
              <li>Verify webhook signatures using the provided secret</li>
              <li>Optionally respond with phone numbers to update parcel information</li>
            </ol>
          </div>

          <h3 className="text-2xl font-bold mt-8 mb-4">1. Receiving Webhooks from ParcelPoint</h3>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 my-4">
            <h4 className="font-semibold mb-2">Webhook Events</h4>
            <p className="text-sm mb-2">ParcelPoint sends webhooks for the following events:</p>
            <ul className="text-sm space-y-1 list-disc list-inside ml-4">
              <li><strong>Parcel Created</strong> - When a new parcel is assigned to a locker</li>
              <li><strong>Parcel Collected</strong> - When a parcel is collected from the locker (status changes to 1)</li>
              <li><strong>Parcel Discarded</strong> - When an uncollected parcel is removed (status changes to 2)</li>
              <li><strong>Parcel Updated</strong> - When any parcel information is modified</li>
            </ul>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 my-4">
            <h4 className="font-semibold mb-2">Incoming Webhook Request Format</h4>
            <p className="text-sm mb-2">ParcelPoint will send a POST request to your configured webhook URL:</p>
            <CodeBlock code={`POST https://your-webhook-url.com/webhooks/parcels
Content-Type: application/json
X-Webhook-Event: parcel.created
X-Webhook-Signature: a1b2c3d4e5f6...

{
  "parcel_id": "PKG001",
  "device_id": "DEV001",
  "locker_id": 5,
  "unlocking_code": "1234",
  "sender_phone_no": "+254712345678",
  "recipient_phone_no": "+254798765432",
  "receipt_time": "2025-01-20T10:00:00Z",
  "collected_time": null,
  "status": 0,
  "organization_id": 1
}`} language="http" id="webhook-incoming-request" />
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 my-4">
            <h4 className="font-semibold mb-2">Verifying Webhook Signatures</h4>
            <p className="text-sm mb-2">
              Each webhook includes an <code>X-Webhook-Signature</code> header containing an HMAC SHA-256 hex signature.
              Verify this signature to ensure the request came from ParcelPoint:
            </p>
            <CodeBlock code={`// Example verification in Node.js
const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

// In your webhook endpoint
app.post('/webhooks/parcels', express.json(), (req, res) => {
  const signature = req.headers['x-webhook-signature'];
  const eventType = req.headers['x-webhook-event'];
  const webhookSecret = process.env.WEBHOOK_SECRET;

  // Verify signature
  if (!verifyWebhookSignature(req.body, signature, webhookSecret)) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  // Process the webhook
  const parcel = req.body;
  console.log('Event:', eventType);
  console.log('Parcel:', parcel.parcel_id, 'Status:', parcel.status);

  // Optionally return phone numbers to update the parcel
  res.status(200).json({
    sender_phone_no: "+254700000000",
    recipient_phone_no: "+254711111111"
  });
});`} language="javascript" id="webhook-verification" />
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 my-4">
            <h4 className="font-semibold mb-2">Optional Response Format</h4>
            <p className="text-sm mb-2">
              Your webhook endpoint can optionally return phone numbers in the response body. If provided, ParcelPoint will
              update the parcel with these phone numbers (only if they are currently null):
            </p>
            <CodeBlock code={`{
  "sender_phone_no": "+254700000000",
  "recipient_phone_no": "+254711111111"
}`} language="json" id="webhook-optional-response" />
            <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
              Both fields are optional. If the parcel already has phone numbers set, they will not be overwritten.
            </p>
          </div>

          <h3 className="text-2xl font-bold mt-8 mb-4">2. Sending Webhooks to ParcelPoint</h3>

          <EndpointCard
            method="POST"
            path="/webhooks/organizations/:org_id/parcels"
            description="Update parcel phone numbers from your organization"
            auth="Webhook Secret"
            requestBody={`{
  "device_id": "DEV001",
  "parcel_id": "PKG001",
  "sender_phone_no": "+254700000000",
  "recipient_phone_no": "+254711111111"
}`}
            responseExample={`{
  "message": "Parcel updated successfully",
  "parcel_id": "PKG001"
}`}
          />

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 my-4">
            <h4 className="font-semibold mb-2">Sending Webhooks to ParcelPoint</h4>
            <p className="text-sm mb-2">
              Your organization can send webhooks to ParcelPoint to update parcel phone numbers.
              Include the <code>X-Webhook-Signature</code> header with an HMAC SHA-256 signature:
            </p>
            <CodeBlock code={`// Example sending webhook to ParcelPoint
const crypto = require('crypto');
const axios = require('axios');

async function updateParcel(orgId, deviceId, parcelId, phones) {
  const payload = {
    device_id: deviceId,
    parcel_id: parcelId,
    sender_phone_no: phones.sender,
    recipient_phone_no: phones.recipient
  };

  const webhookSecret = process.env.WEBHOOK_SECRET;
  const signature = crypto
    .createHmac('sha256', webhookSecret)
    .update(JSON.stringify(payload))
    .digest('hex');

  const response = await axios.post(
    \`https://api.parcelpoint.co.ke/api/v1/webhooks/organizations/\${orgId}/parcels\`,
    payload,
    {
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Signature': signature
      }
    }
  );

  console.log('Response:', response.data);
}

// Update a parcel
updateParcel(1, 'DEV001', 'PKG001', {
  sender: '+254700000000',
  recipient: '+254711111111'
});`} language="javascript" id="webhook-send" />
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 my-4">
            <h4 className="font-semibold mb-2">Important Notes</h4>
            <ul className="text-sm space-y-2 list-disc list-inside ml-2">
              <li>Your webhook endpoint must return a 200 OK status within 30 seconds</li>
              <li>Failed webhook deliveries will be retried automatically with exponential backoff</li>
              <li>Always verify the webhook signature before processing the payload</li>
              <li>The signature is a plain hex string (not prefixed with "sha256=")</li>
              <li>Store the webhook secret securely (never commit it to version control)</li>
              <li>Handle webhook requests idempotently (you may receive duplicate events)</li>
              <li>Phone numbers can only be set if they are currently null (won't overwrite existing values)</li>
              <li>At least one phone number must be provided when sending webhooks to ParcelPoint</li>
            </ul>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 my-4">
            <h4 className="font-semibold mb-2">Testing Webhooks</h4>
            <p className="text-sm mb-2">
              To test your webhook integration during development, you can use tools like ngrok to expose your local server:
            </p>
            <CodeBlock code={`# Install ngrok
npm install -g ngrok

# Expose your local server
ngrok http 3000

# Use the generated URL as your webhook_url
# Example: https://abc123.ngrok.io/webhooks/parcels`} language="bash" id="webhook-testing" />
          </div>
        </Section>

        {/* User Management */}
        <Section id="users" title="User Management" icon={Users}>
          <p className="mb-4">
            Manage users within your organization (API Key authentication required).
          </p>

          <EndpointCard
            method="GET"
            path="/organizations/users"
            description="List all users in your organization"
            auth="API Key"
            queryParams={[
              { name: 'limit', type: 'integer', description: 'Maximum number of results (default: 20)' },
              { name: 'offset', type: 'integer', description: 'Number of results to skip (default: 0)' }
            ]}
            responseExample={`{
  "data": [
    {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe",
      "phone_number": "+254712345678",
      "role": "employee",
      "organization_id": 1,
      "active": true,
      "email_verified": true,
      "created_at": "2025-01-20T10:00:00Z",
      "updated_at": "2025-01-20T10:00:00Z"
    }
  ],
  "pagination": {
    "total": 1,
    "limit": 20,
    "offset": 0
  }
}`}
          />

          <EndpointCard
            method="PUT"
            path="/organizations/users/:id/role"
            description="Update a user's role within your organization"
            auth="API Key"
            requestBody={`{
  "role": "logistics"
}`}
            responseExample={`{
  "id": 1,
  "email": "user@example.com",
  "name": "John Doe",
  "phone_number": "+254712345678",
  "role": "logistics",
  "organization_id": 1,
  "active": true,
  "email_verified": true,
  "created_at": "2025-01-20T10:00:00Z",
  "updated_at": "2025-01-20T10:00:00Z"
}`}
          />

          <EndpointCard
            method="PUT"
            path="/organizations/users/:id/organization"
            description="Assign a user to your organization"
            auth="API Key"
            requestBody={`{
  "organization_id": 1
}`}
            responseExample={`{
  "id": 1,
  "email": "user@example.com",
  "name": "John Doe",
  "phone_number": "+254712345678",
  "role": "employee",
  "organization_id": 1,
  "active": true,
  "email_verified": true,
  "created_at": "2025-01-20T10:00:00Z",
  "updated_at": "2025-01-20T10:00:00Z"
}`}
          />

          <EndpointCard
            method="DELETE"
            path="/organizations/users/:id"
            description="Remove a user from your organization"
            auth="API Key"
            responseExample={`{
  "message": "User deleted successfully"
}`}
          />

          <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 my-4">
            <h4 className="font-semibold mb-2">User Roles</h4>
            <ul className="text-sm space-y-1">
              <li><code>admin</code> - Full system access</li>
              <li><code>support</code> - Customer support role</li>
              <li><code>employee</code> - Standard employee access</li>
              <li><code>partner</code> - Partner organization access</li>
              <li><code>logistics</code> - Logistics management access</li>
              <li><code>carrier</code> - Delivery carrier access</li>
            </ul>
          </div>
        </Section>

        {/* Error Codes */}
        <div className="mt-12 mb-8">
          <h2 className="text-3xl font-bold mb-4">Error Handling</h2>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <p className="mb-4">The API uses standard HTTP status codes:</p>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-600">
                  <th className="text-left py-2">Status Code</th>
                  <th className="text-left py-2">Description</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-2"><code>200 OK</code></td>
                  <td className="py-2">Request successful</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-2"><code>201 Created</code></td>
                  <td className="py-2">Resource created successfully</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-2"><code>400 Bad Request</code></td>
                  <td className="py-2">Invalid request parameters</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-2"><code>401 Unauthorized</code></td>
                  <td className="py-2">Missing or invalid authentication</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-2"><code>403 Forbidden</code></td>
                  <td className="py-2">Insufficient permissions</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-2"><code>404 Not Found</code></td>
                  <td className="py-2">Resource not found</td>
                </tr>
                <tr>
                  <td className="py-2"><code>500 Internal Server Error</code></td>
                  <td className="py-2">Server error</td>
                </tr>
              </tbody>
            </table>

            <div className="mt-6">
              <h4 className="font-semibold mb-2">Error Response Format</h4>
              <CodeBlock code={`{
  "error": "Description of the error"
}`} language="json" id="error-format" />
            </div>
          </div>
        </div>
              </div>
            )}
          </main>
        </div>

        {/* Support */}
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border border-emerald-200 dark:border-emerald-700 rounded-xl p-8 text-center mt-12 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
          <p className="mb-6 text-gray-700 dark:text-gray-300">
            Our developer support team is here to help you integrate with the ParcelPoint API.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:developers@parcelpoint.co.ke" className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 font-semibold">
              <Mail size={20} />
              Email Support
            </a>
            <Link href="/" className="inline-flex items-center gap-2 px-8 py-3 border-2 border-emerald-600 text-emerald-600 dark:text-emerald-400 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 font-semibold">
              <ExternalLink size={20} />
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-100 dark:bg-gray-800 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© 2025 ParcelPoint Kenya. All rights reserved.</p>
          <p className="mt-2">API Version 1.0 | Last Updated: January 2025</p>
        </div>
      </div>
    </div>
  );
}
