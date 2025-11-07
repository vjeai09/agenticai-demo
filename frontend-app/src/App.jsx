import { useState } from 'react'
import { motion } from 'framer-motion'
import BanquetBookingDemo from './components/BanquetBookingDemo'
import VenuesDemo from './components/VenuesDemo'
import ServicesDemo from './components/ServicesDemo'
import Navigation from './components/Navigation'
import BackgroundParticles from './components/BackgroundParticles'

function App() {
  const [activeTab, setActiveTab] = useState('api')

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundParticles />
      
      {/* Header */}
      <header className="relative z-10 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="text-center">
            <motion.div
              className="mb-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-2">
                <span className="gradient-text">S V Banquet Halls</span>
              </h1>
              <p className="text-lg md:text-xl text-blue-200 mb-1">
                Premium Event Venues in Hyderabad
              </p>
            </motion.div>
            <motion.p 
              className="text-xl text-blue-300 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Powered by AI-Driven Smart Booking System
            </motion.p>
            <motion.div 
              className="flex items-center justify-center gap-2 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="status-dot bg-green-400"></div>
              <span className="text-sm text-gray-400">All Systems Operational</span>
            </motion.div>
          </div>
        </motion.div>
      </header>

      {/* Navigation */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'api' && <BanquetBookingDemo />}
          {activeTab === 'rag' && <VenuesDemo />}
          {activeTab === 'mcp' && <ServicesDemo />}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <h3 className="text-xl font-bold gradient-text mb-3">S V Banquet Halls</h3>
              <p className="text-gray-400 text-sm mb-4">
                Premium event venues in Hyderabad for weddings, conferences, and special celebrations.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all">
                  <span className="text-lg">📘</span>
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all">
                  <span className="text-lg">📸</span>
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all">
                  <span className="text-lg">📱</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-3 text-gray-200">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Book Now</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Our Venues</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Services & Packages</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Gallery</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Testimonials</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Contact Us</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-3 text-gray-200">Contact Us</h4>
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-start gap-2">
                  <span>📍</span>
                  <span>Hyderabad, Telangana, India</span>
                </div>
                <div className="flex items-start gap-2">
                  <span>📞</span>
                  <a href="tel:+919876543210" className="hover:text-blue-400 transition-colors">
                    +91 98765 43210
                  </a>
                </div>
                <div className="flex items-start gap-2">
                  <span>📧</span>
                  <a href="mailto:info@svbanquethalls.com" className="hover:text-blue-400 transition-colors">
                    info@svbanquethalls.com
                  </a>
                </div>
                <div className="flex items-start gap-2">
                  <span>🕐</span>
                  <span>Mon-Sun: 9:00 AM - 9:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 text-center">
            <p className="text-gray-500 text-sm mb-2">
              © 2025 S V Banquet Halls. All rights reserved.
            </p>
            <p className="text-gray-600 text-xs">
              Powered by AI Technology • Built with ❤️
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
