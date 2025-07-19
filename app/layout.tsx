import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ParcelPoint Kenya - Smart Parcel Delivery & Pickup Lockers",
    template: "%s | ParcelPoint Kenya"
  },
  description: "Secure, convenient parcel pickup and delivery across Kenya. 24/7 smart locker access with M-PESA payments. Find ParcelPoint locations in Nairobi malls and city centers.",
  keywords: [
    "parcel delivery Kenya",
    "smart lockers Nairobi",
    "package pickup Kenya",
    "M-PESA parcel payment",
    "24/7 locker access",
    "secure package delivery",
    "last mile delivery Kenya",
    "ParcelPoint lockers",
    "convenient package collection",
    "Westgate Mall lockers",
    "Garden City Mall delivery"
  ],
  authors: [{ name: "ParcelPoint Kenya" }],
  creator: "ParcelPoint Kenya",
  publisher: "ParcelPoint Kenya",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://parcelpoint.co.ke"
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://parcelpoint.co.ke",
    siteName: "ParcelPoint Kenya",
    title: "ParcelPoint Kenya - Smart Parcel Delivery & Pickup Lockers",
    description: "Secure, convenient parcel pickup and delivery across Kenya. 24/7 smart locker access with M-PESA payments in Nairobi malls and city centers.",
    images: [
      {
        url: "/images/parcelpoint/1.jpeg",
        width: 1200,
        height: 630,
        alt: "ParcelPoint Smart Locker System",
      },
      {
        url: "/images/parcelpoint/2.jpeg", 
        width: 1200,
        height: 630,
        alt: "ParcelPoint Secure Package Delivery",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ParcelPoint Kenya - Smart Parcel Delivery & Pickup Lockers",
    description: "Secure, convenient parcel pickup and delivery across Kenya. 24/7 smart locker access with M-PESA payments.",
    images: ["/images/parcelpoint/1.jpeg"],
    creator: "@ParcelPointKE",
    site: "@ParcelPointKE"
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },

  category: "technology",
  classification: "Business",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://parcelpoint.co.ke"),
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#059669", // emerald-600
      },
    ],
  },
  other: {
    "msapplication-TileColor": "#059669",
    "theme-color": "#059669",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "ParcelPoint",
    "mobile-web-app-capable": "yes",
    "application-name": "ParcelPoint Kenya"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-KE">
      <head>
        {/* Additional SEO and Performance Meta Tags */}
        <meta name="geo.region" content="KE-30" />
        <meta name="geo.placename" content="Nairobi" />
        <meta name="geo.position" content="-1.2921;36.8219" />
        <meta name="ICBM" content="-1.2921, 36.8219" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//wa.me" />
        <link rel="dns-prefetch" href="//maps.google.com" />
        
        {/* Structured Data for Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "ParcelPoint Kenya",
              "description": "Smart parcel delivery and pickup locker services across Kenya with 24/7 access and M-PESA payments",
              "url": "https://parcelpoint.co.ke",
              "logo": "https://parcelpoint.co.ke/images/parcelpoint/logo.png",
              "image": "https://parcelpoint.co.ke/images/parcelpoint/1.jpeg",
              "telephone": "+254759777587",
              "email": "hello@parcelpoint.co.ke",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Westlands",
                "addressLocality": "Nairobi",
                "addressCountry": "KE"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -1.2921,
                "longitude": 36.8219
              },
              "openingHours": "Mo-Su 00:00-23:59",
              "priceRange": "KES",
              "paymentAccepted": "M-PESA",
              "currenciesAccepted": "KES",
              "areaServed": {
                "@type": "Country",
                "name": "Kenya"
              },
              "serviceType": "Parcel Delivery and Storage",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "ParcelPoint Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Smart Locker Rental",
                      "description": "Monthly rental income for location partners"
                    }
                  },
                  {
                    "@type": "Offer", 
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Complete System Purchase",
                      "description": "Full ownership of ParcelPoint locker system"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service", 
                      "name": "Revenue Partnership",
                      "description": "70/30 revenue sharing partnership model"
                    }
                  }
                ]
              },
              "sameAs": [
                "https://wa.me/254759777587",
                "https://twitter.com/ParcelPointKE",
                "https://facebook.com/ParcelPointKenya",
                "https://linkedin.com/company/parcelpoint-kenya"
              ]
            })
          }}
        />
        
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "ParcelPoint Kenya",
              "alternateName": "ParcelPoint",
              "url": "https://parcelpoint.co.ke",
              "logo": "https://parcelpoint.co.ke/images/parcelpoint/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+254759777587",
                "contactType": "customer service",
                "availableLanguage": ["English", "Swahili"],
                "areaServed": "KE"
              },
              "founder": {
                "@type": "Organization",
                "name": "ParcelPoint Kenya"
              },
              "foundingDate": "2024",
              "slogan": "Smart Parcel Delivery Made Simple"
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}