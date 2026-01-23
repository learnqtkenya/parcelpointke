'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Package, Smartphone, CreditCard, Clock } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Drop Off',
    description: 'Couriers deposit parcels at any ParcelPoint location',
    icon: Package,
    color: 'bg-blue-500',
  },
  {
    number: '02',
    title: 'Get Code',
    description: 'Receive a unique 6-digit access code via SMS instantly',
    icon: Smartphone,
    color: 'bg-purple-500',
  },
  {
    number: '03',
    title: 'Pay & Collect',
    description: 'Enter your code and pay securely with M-PESA',
    icon: CreditCard,
    color: 'bg-emerald-500',
  },
  {
    number: '04',
    title: 'Anytime Access',
    description: 'Pick up your parcels 24/7 at your convenience',
    icon: Clock,
    color: 'bg-orange-500',
  },
]

export function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="how-it-works" className="py-16 lg:py-20 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Simple, secure parcel management in four easy steps
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="relative group"
            >
              <div className="bg-card p-6 rounded-2xl border border-border shadow-md hover:shadow-xl hover:border-primary/30 transition-all duration-300 h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 ${step.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-4xl font-bold text-muted/20">{step.number}</span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
