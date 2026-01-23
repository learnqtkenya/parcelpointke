'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Wanjiku',
    role: 'Small Business Owner',
    content:
      'ParcelPoint has revolutionized how I drop off packages for my clients. No more waiting in queues at bus stations!',
    rating: 5,
  },
  {
    name: 'David Ochieng',
    role: 'Office Worker',
    content:
      'I love that I can pick up my packages anytime after work. The M-PESA payment is so convenient.',
    rating: 5,
  },
  {
    name: 'Lee',
    role: 'Tourist',
    content:
      "I'm used to this in my country. It was a great relief finding ParcelPoint in Kenya. Always accessible!",
    rating: 5,
  },
]

export function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section className="py-16 lg:py-20 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            What Our Users Say
          </h2>
          <p className="text-muted-foreground">Trusted by customers across Nairobi</p>
        </motion.div>

        <div className="hidden md:grid grid-cols-3 gap-4">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-card rounded-xl p-6 border border-border shadow-md hover:shadow-xl hover:border-primary/30 transition-all duration-300 relative"
            >
              <Quote className="absolute top-4 right-4 h-8 w-8 text-muted/10" />
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div>
                <div className="font-semibold text-foreground text-sm">{testimonial.name}</div>
                <div className="text-xs text-muted-foreground">{testimonial.role}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:hidden"
        >
          <div className="bg-card rounded-xl p-6 border border-border shadow-md relative">
            <Quote className="absolute top-4 right-4 h-8 w-8 text-muted/10" />
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              &ldquo;{testimonials[current].content}&rdquo;
            </p>
            <div>
              <div className="font-semibold text-foreground">{testimonials[current].name}</div>
              <div className="text-sm text-muted-foreground">{testimonials[current].role}</div>
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-4">
            <button
              onClick={prev}
              className="p-2 rounded-lg bg-secondary hover:bg-muted transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === current ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-2 rounded-lg bg-secondary hover:bg-muted transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
