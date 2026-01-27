import type { Metadata } from 'next';

interface LocationMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
}

const locationMetadata: Record<string, LocationMetadata> = {
  'nairobi-cbd': {
    title: 'Parcel Drop-off & Storage Point in Nairobi CBD - Ronald Ngala Street',
    description: '24/7 secure parcel drop-off, pickup, and storage lockers in Nairobi CBD on Ronald Ngala Street, adjacent to Bata. 28 smart lockers with M-PESA payment. Ideal drop-off point in the Central Business District.',
    keywords: [
      'drop off in CBD',
      'storage point CBD',
      'pickup point CBD',
      'storage point in CBD',
      'drop-off point Nairobi CBD',
      'parcel locker CBD',
      'CBD storage Nairobi',
      'Ronald Ngala Street locker',
      'parcel pickup CBD',
      'Nairobi CBD drop-off',
      'package storage CBD',
      'collection point CBD'
    ],
    ogImage: '/images/parcelpoint/2.jpeg'
  },
  'garden-city-mall': {
    title: 'Parcel Drop-off & Pickup Point at Garden City Mall - Thika Road',
    description: '24/7 secure parcel drop-off, pickup, and storage lockers at Garden City Mall, Thika Road. 48 smart lockers with M-PESA payment. Convenient pickup point for Roysambu, Kasarani, and surrounding areas.',
    keywords: [
      'Garden City Mall locker',
      'parcel drop-off Garden City',
      'pickup point Thika Road',
      'storage point Garden City',
      'drop-off near Roysambu',
      'parcel locker Kasarani',
      'Garden City storage',
      'Thika Road parcel pickup',
      'storage point near me Thika Road',
      'package drop-off Garden City Mall'
    ],
    ogImage: '/images/parcelpoint/1.jpeg'
  }
};

type Props = {
  params: Promise<{ location: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const location = locationMetadata[resolvedParams.location];

  if (!location) {
    return {
      title: 'Location Not Found',
      description: 'The requested location could not be found.'
    };
  }

  return {
    title: location.title,
    description: location.description,
    keywords: location.keywords,
    openGraph: {
      title: location.title,
      description: location.description,
      url: `https://parcelpoint.co.ke/lockers/${resolvedParams.location}`,
      type: 'website',
      images: [
        {
          url: location.ogImage,
          width: 1200,
          height: 630,
          alt: location.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: location.title,
      description: location.description,
      images: [location.ogImage]
    },
    alternates: {
      canonical: `https://parcelpoint.co.ke/lockers/${resolvedParams.location}`
    }
  };
}

export async function generateStaticParams() {
  return [
    { location: 'nairobi-cbd' },
    { location: 'garden-city-mall' }
  ];
}

export default function LocationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
