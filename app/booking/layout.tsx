import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Book a Parcel Locker - Drop-off & Storage in Nairobi",
  description: "Reserve a secure parcel locker for drop-off, pickup, or storage. Locations at Nairobi CBD (Ronald Ngala Street) and Garden City Mall. 24/7 access with M-PESA payment. Starting at KES 50.",
  keywords: [
    "book parcel locker",
    "reserve storage locker Nairobi",
    "drop-off booking",
    "pickup locker booking",
    "storage point booking",
    "parcel locker CBD",
    "parcel locker Garden City",
    "M-PESA locker payment",
    "book drop-off point",
    "reserve pickup point",
    "locker reservation Nairobi"
  ],
  openGraph: {
    title: "Book a Parcel Locker - ParcelPoint Kenya",
    description: "Reserve a secure parcel locker in Nairobi. 24/7 access, M-PESA payment. Locations in CBD and Garden City Mall. Starting at KES 50.",
    url: "https://parcelpoint.co.ke/booking",
    type: "website",
    images: [
      {
        url: "/images/parcelpoint/1.jpeg",
        width: 1200,
        height: 630,
        alt: "Book a ParcelPoint Locker - Drop-off and Pickup in Nairobi"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Parcel Locker - ParcelPoint Kenya",
    description: "Reserve a secure parcel locker in Nairobi. 24/7 access, M-PESA payment. Starting at KES 50.",
    images: ["/images/parcelpoint/1.jpeg"]
  },
  alternates: {
    canonical: "https://parcelpoint.co.ke/booking"
  }
};

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
