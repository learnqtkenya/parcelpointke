export function FAQStructuredData() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I pick up my parcel from a ParcelPoint locker?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Simply use the unique 6-digit code sent to your phone via SMS. Enter the code at the locker touchscreen, make your M-PESA payment, and your compartment will open automatically."
        }
      },
      {
        "@type": "Question",
        "name": "How long can I leave my parcel in the locker?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Parcels can be stored for up to 3 days. You'll receive SMS reminders, and if not collected within 3 days, our team will retrieve the parcel and contact you for alternative arrangements."
        }
      },
      {
        "@type": "Question",
        "name": "Is my parcel secure in the locker?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Our lockers use advanced security features including unique access codes, sturdy construction, and 24/7 monitoring to ensure your parcels are completely safe."
        }
      },
      {
        "@type": "Question",
        "name": "Can I store my own items in a ParcelPoint locker?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! You can use ParcelPoint for personal storage. Simply deposit your items, make an M-PESA payment, and receive your access code to retrieve them later."
        }
      },
      {
        "@type": "Question",
        "name": "Where are ParcelPoint lockers located?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our lockers are strategically placed in high-traffic locations including malls, residential complexes, office buildings, schools, and community centers across major cities in Kenya."
        }
      },
      {
        "@type": "Question",
        "name": "What payment methods do you accept?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We primarily use M-PESA for payments, which makes transactions quick, secure, and convenient for most Kenyans. Payment is made directly at the locker when collecting your parcel."
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}

export function ReviewStructuredData() {
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ParcelPoint Kenya",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "3"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Sarah Mwangi"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "ParcelPoint has made online shopping so much easier for me! I can pick up my packages at any time that's convenient without worrying about missing a delivery."
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "David Ochieng"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "I love that I can pick up my packages anytime after work. The M-PESA payment is so convenient and the process is super quick."
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Lee"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "I have been used to this in my country. It was a great relieve when I found ParcelPoint in Kenya. The locations are convenient and always accessible."
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
    />
  );
}

export function ServiceStructuredData() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Smart Locker Services",
    "provider": {
      "@type": "Organization",
      "name": "ParcelPoint Kenya"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Kenya"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "ParcelPoint Partnership Models",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "We Pay You Rent Model",
            "description": "Zero investment partnership where ParcelPoint pays guaranteed monthly rent to property owners for locker installation space. ParcelPoint handles all equipment, operations, and maintenance.",
            "category": "Passive Income Partnership"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Managed Service Partnership",
            "description": "Premium partnership where partners invest KES 150,000-500,000 in locker equipment, own it as an asset, and earn majority revenue share while ParcelPoint manages operations.",
            "category": "Premium Investment Partnership",
            "offers": {
              "@type": "Offer",
              "price": "150000-500000",
              "priceCurrency": "KES"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Revenue Partnership Model",
            "description": "Performance-based partnership with no upfront investment. Partners provide space and promote locally, earning revenue share based on transaction volume.",
            "category": "Revenue Sharing Partnership"
          }
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
    />
  );
}

export function BreadcrumbStructuredData({ items }: { items: Array<{ name: string; url: string }> }) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  );
}

export function WebSiteStructuredData() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ParcelPoint Kenya",
    "url": "https://parcelpoint.co.ke",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://parcelpoint.co.ke/lockers?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
    />
  );
}
