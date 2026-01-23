'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Building2, TrendingUp, Handshake, ArrowRight, Check } from 'lucide-react'
import Link from 'next/link'

const models = [
  {
    icon: Building2,
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-500/10',
    title: 'We Pay You Rent',
    subtitle: 'Zero Investment',
    features: ['No upfront costs', 'Guaranteed monthly income', 'We handle everything'],
    highlight: false,
  },
  {
    icon: TrendingUp,
    iconColor: 'text-emerald-500',
    iconBg: 'bg-emerald-500/10',
    title: 'Managed Partnership',
    subtitle: 'KES 150k - 500k',
    features: ['Own the equipment', 'Majority revenue share', 'Build long-term equity'],
    highlight: true,
  },
  {
    icon: Handshake,
    iconColor: 'text-purple-500',
    iconBg: 'bg-purple-500/10',
    title: 'Revenue Share',
    subtitle: 'Performance Based',
    features: ['No investment needed', 'Earn per transaction', 'Growth-focused income'],
    highlight: false,
  },
]

export function Partnerships() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const openWhatsApp = (model: string) => {
    const message = `I'm interested in your ${model} partnership model. I'd like to learn more.`
    window.open(`https://wa.me/254759777587?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <section id="services" className="py-16 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Partnership Models
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Flexible options to match your investment capacity and goals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {models.map((model, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className={`relative rounded-xl p-5 border shadow-md hover:shadow-xl transition-all duration-300 ${
                model.highlight
                  ? 'bg-primary/5 border-primary/30'
                  : 'bg-card border-border hover:border-primary/20'
              }`}
            >
              {model.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className={`w-10 h-10 ${model.iconBg} rounded-lg flex items-center justify-center mb-4`}>
                <model.icon className={`h-5 w-5 ${model.iconColor}`} />
              </div>

              <h3 className="font-bold text-foreground mb-1">{model.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{model.subtitle}</p>

              <ul className="space-y-2 mb-5">
                {model.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => openWhatsApp(model.title)}
                className={`w-full py-2 rounded-lg text-sm font-medium transition-colors ${
                  model.highlight
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'bg-secondary text-foreground hover:bg-muted'
                }`}
              >
                Learn More
              </button>
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
            href="/partnerships"
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
          >
            View detailed partnership info
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
