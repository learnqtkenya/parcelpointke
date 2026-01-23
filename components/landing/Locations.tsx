'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { MapPin, Clock, Package, Navigation, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const locations = [
  {
    name: 'Garden City Mall',
    address: 'Thika Road, Nairobi',
    status: 'Active',
    hours: '24/7',
    lockers: 48,
    coordinates: { lat: -1.231904, lng: 36.878941 },
  },
  {
    name: 'Doonholm',
    address: 'Donholm Savannah Rd',
    status: 'Active',
    hours: '24/7',
    lockers: 15,
    coordinates: { lat: -1.2990613, lng: 36.8889069 },
  },
  {
    name: 'CBD',
    address: 'Kenya National Archives',
    status: 'Coming Soon',
    hours: '24/7',
    lockers: 48,
    coordinates: { lat: -1.28487, lng: 36.82565 },
  },
]

export function Locations() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const openDirections = (location: typeof locations[0]) => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${location.coordinates.lat},${location.coordinates.lng}`,
      '_blank'
    )
  }

  return (
    <section id="locations" className="py-16 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Our Locations
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Find ParcelPoint lockers at convenient spots across Nairobi
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {locations.map((location, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-card rounded-xl p-5 border border-border shadow-md hover:shadow-xl hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-foreground">{location.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3 text-red-500" />
                    {location.address}
                  </div>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    location.status === 'Active'
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      : 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400'
                  }`}
                >
                  {location.status}
                </span>
              </div>

              <div className="flex gap-4 mb-4 text-sm">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 text-orange-500" />
                  {location.hours}
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Package className="h-3.5 w-3.5 text-blue-500" />
                  {location.lockers} lockers
                </div>
              </div>

              {location.status === 'Active' && (
                <button
                  onClick={() => openDirections(location)}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  <Navigation className="h-4 w-4" />
                  Get Directions
                </button>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-8"
        >
          <Link
            href="/lockers"
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
          >
            View all locations
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
