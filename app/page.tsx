'use client'

import {
  Navigation,
  Hero,
  HowItWorks,
  Stats,
  Locations,
  Testimonials,
  Partnerships,
  FAQ,
  Contact,
  Footer,
} from '@/components/landing'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      <Hero />
      <HowItWorks />
      <Stats />
      <Locations />
      <Testimonials />
      <Partnerships />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  )
}
