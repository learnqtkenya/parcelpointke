'use client'

import React from 'react';
import { Building2, Package, Users, BarChart3, Shield, Clock, CheckCircle2, ArrowRight, MessageCircle } from 'lucide-react';
import { Navigation, Footer } from '@/components/landing';

export default function IntegrationsPage() {
  const benefits = [
    {
      icon: Package,
      title: "Locker Reservations",
      description: "Reserve lockers across our network of smart locker devices. Choose sizes and quantities that match your delivery volume."
    },
    {
      icon: Users,
      title: "Team Management",
      description: "Add your delivery carriers to your organization. They get instant access to your reserved lockers through our mobile app."
    },
    {
      icon: BarChart3,
      title: "Real-Time Tracking",
      description: "Monitor all your parcels in one dashboard. Track deliveries, collections, and locker utilization across all devices."
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Every parcel is protected with unique unlock codes. Recipients receive SMS notifications for seamless collection."
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Our smart lockers operate around the clock. Your customers can collect parcels at their convenience, any time."
    },
    {
      icon: Building2,
      title: "Scalable Solution",
      description: "Start with a few lockers and scale as you grow. Add more reservations and devices as your business expands."
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Register Your Organization",
      description: "Contact our team to set up your organization account. We'll configure your access and provide login credentials for your management dashboard."
    },
    {
      number: "02",
      title: "Create Reservations",
      description: "Use the dashboard to reserve lockers at any device in our network. Select the device location, locker sizes, quantities, and reservation period."
    },
    {
      number: "03",
      title: "Onboard Your Carriers",
      description: "Your delivery drivers download the ParcelLockerAdmin app and register. Add them to your organization through the dashboard to grant access to your reservations."
    },
    {
      number: "04",
      title: "Start Delivering",
      description: "Carriers scan device QR codes, select available lockers from your reservations, and deposit parcels. Recipients get notified automatically."
    }
  ];

  const useCases = [
    {
      title: "E-Commerce & Retail",
      description: "Offer flexible last-mile delivery options. Customers choose locker pickup at checkout and collect at their convenience.",
      features: ["Reduce failed deliveries", "Lower last-mile costs", "Improve customer satisfaction"]
    },
    {
      title: "Logistics & Courier Services",
      description: "Extend your delivery network with secure pickup points. Handle more volume without adding delivery attempts.",
      features: ["Increase delivery success rate", "Optimize driver routes", "Scale without fleet expansion"]
    },
    {
      title: "Corporate & Enterprise",
      description: "Streamline internal mail and package handling. Employees collect items securely without reception bottlenecks.",
      features: ["Contactless package handling", "Audit trail for all deliveries", "Reduce operational overhead"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground pt-16">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Partner With ParcelPoint
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8 leading-relaxed">
              Transform your last-mile delivery with Kenya's smart locker network.
              Reserve lockers, manage your team, and track every parcel—all from one dashboard.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#get-started"
                className="inline-flex items-center gap-2 bg-primary-foreground text-primary px-8 py-4 rounded-xl font-semibold hover:bg-primary-foreground/90 transition-all shadow-lg hover:shadow-xl"
              >
                Get Started
                <ArrowRight size={20} />
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 bg-primary-foreground/20 text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:bg-primary-foreground/30 transition-all border border-primary-foreground/30"
              >
                See How It Works
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Manage Deliveries
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform gives you complete control over your locker reservations and delivery operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-border"
              >
                <div className="bg-secondary w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                  <benefit.icon className="text-foreground" size={28} />
                </div>
                <h3 className="text-xl font-bold text-card-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get up and running in four simple steps. Our team handles the setup so you can focus on your business.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-6 mb-12 last:mb-0">
                <div className="shrink-0">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg">
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-0.5 h-16 bg-border mx-auto mt-4" />
                  )}
                </div>
                <div className="pt-2">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Built for Your Industry
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Organizations across sectors use ParcelPoint to streamline their delivery operations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-8 shadow-lg border border-border"
              >
                <h3 className="text-xl font-bold text-card-foreground mb-4">
                  {useCase.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {useCase.description}
                </p>
                <ul className="space-y-3">
                  {useCase.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-muted-foreground">
                      <CheckCircle2 className="text-success shrink-0" size={20} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-3xl p-8 md:p-12 text-primary-foreground">
            <div className="max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Your Command Center
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8 leading-relaxed">
                The ParcelPoint Dashboard puts you in control. View device availability in real-time,
                create and manage reservations, track all your parcels, and manage your delivery team—all in one place.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4 border border-primary-foreground/20">
                  <div className="font-semibold mb-1">Device Overview</div>
                  <div className="text-sm text-primary-foreground/70">See locker availability across all locations</div>
                </div>
                <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4 border border-primary-foreground/20">
                  <div className="font-semibold mb-1">Reservation Management</div>
                  <div className="text-sm text-primary-foreground/70">Create, modify, and track reservations</div>
                </div>
                <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4 border border-primary-foreground/20">
                  <div className="font-semibold mb-1">Parcel Tracking</div>
                  <div className="text-sm text-primary-foreground/70">Monitor delivery and collection status</div>
                </div>
                <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4 border border-primary-foreground/20">
                  <div className="font-semibold mb-1">Team Management</div>
                  <div className="text-sm text-primary-foreground/70">Add carriers and manage access</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="get-started" className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              Contact our partnerships team to set up your organization account.
              We'll help you configure your dashboard access and get your first reservations running.
            </p>

            <div className="bg-card rounded-2xl p-8 shadow-xl border border-border">
              <h3 className="text-xl font-bold text-card-foreground mb-6">
                Contact Our Partnerships Team
              </h3>
              <a
                href="https://wa.me/254759777587?text=Hi%2C%20I'm%20interested%20in%20partnering%20with%20ParcelPoint%20for%20our%20delivery%20operations."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-primary text-primary-foreground px-6 py-4 rounded-xl font-semibold hover:bg-primary/90 transition-all"
              >
                <MessageCircle size={20} />
                Chat with us on WhatsApp
              </a>
              <p className="text-sm text-muted-foreground mt-6">
                Our team typically responds within 24 hours on business days.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
