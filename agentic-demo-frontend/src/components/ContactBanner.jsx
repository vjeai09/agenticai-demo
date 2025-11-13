import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'

export default function ContactBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="text-sm font-semibold text-slate-900 truncate">🚀 Production-Ready AI Solutions</div>
            <div className="hidden sm:block text-sm text-slate-600 truncate">Get curated Data Science & AI solutions for your business</div>
          </div>

          <a
            href="mailto:vjeai.tech@gmail.com"
            aria-label="Contact us by email"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full text-sm shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300"
          >
            <Mail className="w-4 h-4" />
            Contact Us
          </a>
        </div>
      </div>
    </motion.div>
  )
}
