import React from 'react';
import type { Metadata } from 'next';
import PartnershipsContent from './PartnershipsContent';

export const metadata: Metadata = {
  title: "Partnership Models - ParcelPoint Kenya",
  description: "Choose from three flexible partnership models: We Pay You Rent (zero investment, passive income), Managed Service Partnership (invest KES 150k-500k, earn majority revenue), or Revenue Partnership (performance-based income sharing). Join Kenya's leading smart locker network.",
  keywords: [
    "ParcelPoint partnership",
    "smart locker investment Kenya",
    "passive income Kenya",
    "business partnership Nairobi",
    "locker rental income",
    "managed service partnership",
    "revenue sharing Kenya",
    "investment opportunity Kenya",
    "ParcelPoint franchise",
    "smart locker business"
  ],
  openGraph: {
    title: "Partnership Models - ParcelPoint Kenya",
    description: "Three flexible partnership models to match your investment capacity and income goals. From zero investment passive income to premium equity-building partnerships.",
    url: "https://parcelpoint.co.ke/partnerships",
    type: "website",
    images: [
      {
        url: "/images/parcelpoint/1.jpeg",
        width: 1200,
        height: 630,
        alt: "ParcelPoint Partnership Opportunities"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Partnership Models - ParcelPoint Kenya",
    description: "Choose from three flexible partnership models to match your investment capacity and income goals.",
    images: ["/images/parcelpoint/1.jpeg"]
  },
  alternates: {
    canonical: "https://parcelpoint.co.ke/partnerships"
  }
};

export default function PartnershipsPage() {
  return <PartnershipsContent />;
}
