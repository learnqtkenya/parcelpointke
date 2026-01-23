'use client'

import { Package } from 'lucide-react'
import Link from 'next/link'

const quickLinks = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Locations', href: '#locations' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

const resources = [
  { label: 'All Lockers', href: '/lockers' },
  { label: 'Partnerships', href: '/partnerships' },
  { label: 'Integrations', href: '/integrations' },
  { label: 'Book Now', href: '/booking' },
]

export function Footer() {
  const scrollTo = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href)
      element?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-primary-foreground rounded-lg flex items-center justify-center">
                <Package className="h-4 w-4 text-primary" />
              </div>
              <span className="font-bold">ParcelPoint</span>
            </Link>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              Smart parcel delivery solutions across Kenya. Secure, convenient, 24/7.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3">Resources</h4>
            <ul className="space-y-2">
              {resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>
                <a href="mailto:hello@squared.co.ke" className="hover:text-primary-foreground transition-colors">
                  hello@squared.co.ke
                </a>
              </li>
              <li>
                <a href="tel:+254759777587" className="hover:text-primary-foreground transition-colors">
                  +254 759 777 587
                </a>
              </li>
              <li>Nairobi, Kenya</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/60">
            &copy; {new Date().getFullYear()} ParcelPoint. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy-policy" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
