import { motion } from 'framer-motion'
import { Mail, Sparkles } from 'lucide-react'

export default function ContactBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-indigo-600 to-pink-500"
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-md flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-sm font-extrabold text-white uppercase tracking-wider">Production-Ready AI Solutions</div>
              <div className="text-xs text-white/90">Get curated Data Science & AI solutions for your business</div>
            </div>
          </div>

          {/* Inline email only, no Contact button as requested */}
          <div className="text-sm text-white/90 tabular-nums">
            vjeai.tech@gmail.com
          </div>
        </div>
      </div>
    </motion.div>
  )
}
