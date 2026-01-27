import type { Metadata } from 'next';
import { LocationsStructuredData } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: "Parcel Drop-off, Pickup & Storage Lockers Near You - Nairobi",
  description: "Find secure 24/7 parcel drop-off, pickup, and storage points near you in Nairobi. Locations in Nairobi CBD (Ronald Ngala Street) and Garden City Mall. M-PESA payment accepted. Book online now.",
  keywords: [
    "drop-off near me",
    "pickup point near me",
    "storage point near me",
    "drop off in CBD",
    "pickup point CBD",
    "storage point CBD",
    "storage point in CBD",
    "pick up point near me",
    "parcel locker Nairobi",
    "parcel drop-off Nairobi",
    "parcel pickup Nairobi",
    "package storage Nairobi",
    "24/7 locker Nairobi",
    "Garden City Mall locker",
    "Nairobi CBD locker",
    "parcel collection point",
    "drop off point Nairobi",
    "storage lockers Kenya"
  ],
  openGraph: {
    title: "Find Parcel Drop-off & Pickup Points Near You - ParcelPoint Nairobi",
    description: "24/7 secure parcel drop-off, pickup, and storage lockers at Nairobi CBD and Garden City Mall. Book online with M-PESA payment.",
    url: "https://parcelpoint.co.ke/lockers",
    type: "website",
    images: [
      {
        url: "/images/parcelpoint/1.jpeg",
        width: 1200,
        height: 630,
        alt: "ParcelPoint Locker Locations - Drop-off and Pickup Points in Nairobi"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Find Parcel Drop-off & Pickup Points Near You - ParcelPoint",
    description: "24/7 secure parcel drop-off, pickup, and storage lockers at Nairobi CBD and Garden City Mall.",
    images: ["/images/parcelpoint/1.jpeg"]
  },
  alternates: {
    canonical: "https://parcelpoint.co.ke/lockers"
  },
  other: {
    "geo.region": "KE-30",
    "geo.placename": "Nairobi",
    "geo.position": "-1.2921;36.8219",
    "ICBM": "-1.2921, 36.8219"
  }
};

export default function LockersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LocationsStructuredData />
      {children}
    </>
  );
}
