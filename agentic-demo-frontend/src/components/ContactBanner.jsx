import { motion } from 'framer-motion'
import { Mail, Sparkles } from 'lucide-react'

export default function ContactBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center justify-center gap-3 text-white text-sm">
          <Sparkles className="w-4 h-4 animate-pulse hidden md:block" />
          <p className="font-semibold">
            Production-Ready AI Solutions
          </p>
          <span className="hidden md:inline text-white/80">|</span>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <a
              href="mailto:vjeai.tech@gmail.com"
              className="font-bold hover:underline"
            >
              vjeai.tech@gmail.com
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
