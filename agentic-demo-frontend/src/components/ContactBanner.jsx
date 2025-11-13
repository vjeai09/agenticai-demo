import { motion } from 'framer-motion'
import { Mail, Sparkles, ArrowRight } from 'lucide-react'

export default function ContactBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-white">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 animate-pulse" />
            <p className="text-sm md:text-base font-semibold">
              🚀 Want Production-Ready AI Solutions?
            </p>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-xs md:text-sm">
               vjeai.tech@gmail.com
            </p>
            <a
              href="mailto:vjeai.tech@gmail.com"
              className="flex items-center gap-2 px-4 py-2 bg-white text-purple-700 rounded-full font-bold text-xs md:text-sm hover:bg-gray-100 transition-all shadow-lg hover:scale-105 active:scale-95"
            >
              <Mail className="w-4 h-4" />
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
