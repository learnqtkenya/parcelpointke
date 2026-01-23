'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Mail, Phone, MessageCircle, Send, ArrowRight } from 'lucide-react'

const contactMethods = [
  {
    icon: Mail,
    iconColor: 'text-red-500',
    iconBg: 'bg-red-500/10',
    label: 'Email',
    value: 'hello@squared.co.ke',
    href: 'mailto:hello@squared.co.ke',
  },
  {
    icon: Phone,
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-500/10',
    label: 'Phone',
    value: '+254 759 777 587',
    href: 'tel:+254759777587',
  },
  {
    icon: MessageCircle,
    iconColor: 'text-emerald-500',
    iconBg: 'bg-emerald-500/10',
    label: 'WhatsApp',
    value: '+254 759 777 587',
    href: 'https://wa.me/254759777587',
  },
]

export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all fields')
      return
    }
    const subject = encodeURIComponent('ParcelPoint Inquiry')
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )
    window.location.href = `mailto:hello@squared.co.ke?subject=${subject}&body=${body}`
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="py-12 lg:py-14 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Get In Touch
            </h2>
            <p className="text-muted-foreground mb-6">
              Ready to bring ParcelPoint to your location? Let&apos;s discuss how we can work
              together.
            </p>

            <div className="space-y-3">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={index}
                  href={method.href}
                  target={method.href.startsWith('http') ? '_blank' : undefined}
                  rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all group"
                >
                  <div className={`w-10 h-10 ${method.iconBg} rounded-lg flex items-center justify-center`}>
                    <method.icon className={`h-5 w-5 ${method.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground">{method.label}</div>
                    <div className="text-sm font-medium text-foreground">{method.value}</div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Tell us about your needs..."
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={handleSubmit}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  <Send className="h-4 w-4" />
                  Send Message
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
