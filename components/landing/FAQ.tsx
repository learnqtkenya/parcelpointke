'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    question: 'How do I pick up my parcel?',
    answer:
      'Use the unique 6-digit code sent via SMS. Enter it at the locker touchscreen, pay with M-PESA, and your compartment opens automatically.',
  },
  {
    question: 'How long can I store my parcel?',
    answer:
      "Parcels can be stored for up to 3 days. You'll receive SMS reminders. After 3 days, our team will retrieve and contact you for alternatives.",
  },
  {
    question: 'Is my parcel secure?',
    answer:
      'Yes. Our lockers use unique access codes, sturdy construction, and 24/7 monitoring to ensure your parcels are completely safe.',
  },
  {
    question: 'Can I store my own items?',
    answer:
      'Yes! You can use ParcelPoint for personal storage. Deposit items, pay via M-PESA, and receive an access code to retrieve them later.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We use M-PESA for payments, making transactions quick, secure, and convenient. Payment is made at the locker when collecting your parcel.',
  },
]

export function FAQ() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-12 lg:py-14 bg-secondary/50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">Everything you need to know about ParcelPoint</p>
        </motion.div>

        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-card rounded-xl border border-border shadow-sm hover:shadow-md overflow-hidden transition-shadow"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
              >
                <span className="font-medium text-foreground pr-4">{faq.question}</span>
                <div className="shrink-0 w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                  {openIndex === index ? (
                    <Minus className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Plus className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
