import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Users, MapPin, Phone, Mail, Clock, Sparkles, CheckCircle2, XCircle, Loader2 } from 'lucide-react'
import axios from 'axios'

const API_BASE = '/api'

export default function BanquetBookingDemo() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventDate: '',
    eventType: 'wedding',
    guests: '100'
  })

  const eventTypes = [
    { id: 'wedding', name: 'Wedding', icon: '💒' },
    { id: 'conference', name: 'Conference', icon: '🎤' },
    { id: 'birthday', name: 'Birthday Party', icon: '🎂' },
    { id: 'corporate', name: 'Corporate Event', icon: '💼' },
    { id: 'reception', name: 'Reception', icon: '🥂' },
    { id: 'other', name: 'Other', icon: '🎉' }
  ]

  const venues = [
    {
      id: 1,
      name: 'Grand Palace Hall',
      capacity: '500-1000 guests',
      features: ['Air Conditioned', 'Stage Setup', 'Catering Available', 'Parking: 200 cars'],
      price: 'Premium',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      id: 2,
      name: 'Royal Garden Hall',
      capacity: '200-500 guests',
      features: ['Open Garden', 'Indoor + Outdoor', 'Decoration Service', 'Parking: 100 cars'],
      price: 'Deluxe',
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: 3,
      name: 'Executive Conference Hall',
      capacity: '50-200 guests',
      features: ['AC + WiFi', 'Projector Setup', 'Business Amenities', 'Parking: 50 cars'],
      price: 'Standard',
      color: 'from-orange-400 to-red-500'
    }
  ]

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleQuickCheck = async () => {
    setLoading(true)
    setError(null)
    setResults(null)

    try {
      // Simulate API call - you can replace with real booking API
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setResults({
        success: true,
        message: 'Availability checked successfully!',
        availableVenues: venues,
        bookingDetails: {
          ...formData,
          estimatedCost: formData.guests > 500 ? '₹2,50,000 - ₹5,00,000' : '₹1,00,000 - ₹2,50,000',
          availabilityStatus: 'Available',
          contactNumber: '+91 98765 43210'
        }
      })
    } catch (err) {
      setError('Unable to check availability. Please try again or call us directly.')
    } finally {
      setLoading(false)
    }
  }

  const handleBookingSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.phone || !formData.eventDate) {
      setError('Please fill in all required fields')
      return
    }

    setLoading(true)
    setError(null)
    setResults(null)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setResults({
        success: true,
        message: 'Booking inquiry received! Our team will contact you shortly.',
        bookingId: 'SV' + Math.random().toString(36).substring(7).toUpperCase(),
        ...formData
      })
    } catch (err) {
      setError('Booking failed. Please call us directly at +91 98765 43210')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 text-center"
      >
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-4xl font-bold mb-4 gradient-text">
          Book Your Perfect Venue
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          S V Banquet Halls offers premium event spaces in Hyderabad. 
          Let our AI-powered system find the perfect venue for your special day.
        </p>
      </motion.div>

      {/* Quick Info Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <InfoCard
          icon={MapPin}
          title="Prime Location"
          description="Central Hyderabad with easy access"
          color="from-blue-400 to-cyan-500"
        />
        <InfoCard
          icon={Users}
          title="50-1000 Guests"
          description="Multiple halls for any event size"
          color="from-purple-400 to-pink-500"
        />
        <InfoCard
          icon={Clock}
          title="24/7 Support"
          description="Our team is always available"
          color="from-orange-400 to-red-500"
        />
      </div>

      {/* Booking Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-8"
      >
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-blue-400" />
          Quick Booking Inquiry
        </h3>

        <form onSubmit={handleBookingSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition-all duration-200"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition-all duration-200"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Event Date *
              </label>
              <input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition-all duration-200"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Event Type
              </label>
              <select
                name="eventType"
                value={formData.eventType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition-all duration-200"
              >
                {eventTypes.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.icon} {type.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Expected Guests
              </label>
              <input
                type="number"
                name="guests"
                value={formData.guests}
                onChange={handleInputChange}
                placeholder="100"
                min="50"
                max="1000"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition-all duration-200"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleQuickCheck}
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600
                       hover:from-purple-600 hover:to-pink-700
                       rounded-lg font-semibold transition-all duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Checking...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Check Availability
                </>
              )}
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600
                       hover:from-blue-600 hover:to-purple-700
                       rounded-lg font-semibold transition-all duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Submit Inquiry
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>

      {/* Available Venues */}
      <div className="grid md:grid-cols-3 gap-6">
        {venues.map((venue, index) => (
          <VenueCard key={venue.id} venue={venue} index={index} />
        ))}
      </div>

      {/* Results Display */}
      {(results || error) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-6"
        >
          {error ? (
            <div className="flex items-start gap-3 text-red-400">
              <XCircle className="w-6 h-6 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Error</h4>
                <p className="text-sm">{error}</p>
                <p className="text-sm mt-2">
                  Call us: <a href="tel:+919876543210" className="text-blue-400 hover:underline">+91 98765 43210</a>
                </p>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 text-green-400 mb-4">
                <CheckCircle2 className="w-6 h-6" />
                <h4 className="font-semibold text-lg">{results.message}</h4>
              </div>
              {results.bookingId && (
                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-300">
                    Booking Reference: <span className="font-bold text-blue-400">{results.bookingId}</span>
                  </p>
                </div>
              )}
              <div className="bg-slate-900/50 rounded-lg p-4 overflow-auto max-h-96">
                <pre className="text-xs text-gray-300">
                  {JSON.stringify(results, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Contact Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-6"
      >
        <h3 className="text-xl font-bold mb-4 text-center">Contact S V Banquet Halls</h3>
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div className="flex flex-col items-center gap-2">
            <Phone className="w-6 h-6 text-blue-400" />
            <span className="text-sm text-gray-400">Phone</span>
            <a href="tel:+919876543210" className="text-blue-300 hover:underline">
              +91 98765 43210
            </a>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Mail className="w-6 h-6 text-purple-400" />
            <span className="text-sm text-gray-400">Email</span>
            <a href="mailto:info@svbanquethalls.com" className="text-purple-300 hover:underline">
              info@svbanquethalls.com
            </a>
          </div>
          <div className="flex flex-col items-center gap-2">
            <MapPin className="w-6 h-6 text-pink-400" />
            <span className="text-sm text-gray-400">Location</span>
            <span className="text-pink-300">Hyderabad, India</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function InfoCard({ icon: Icon, title, description, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className="glass-card glass-card-hover p-6"
    >
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </motion.div>
  )
}

function VenueCard({ venue, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-card glass-card-hover p-6"
    >
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${venue.color} flex items-center justify-center mb-4`}>
        <Users className="w-6 h-6 text-white" />
      </div>
      
      <h3 className="text-xl font-bold mb-2">{venue.name}</h3>
      <p className="text-blue-400 text-sm font-semibold mb-3">{venue.capacity}</p>
      
      <div className="space-y-2 mb-4">
        {venue.features.map((feature, idx) => (
          <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
            {feature}
          </div>
        ))}
      </div>
      
      <div className="pt-3 border-t border-white/10">
        <span className="text-xs text-gray-400">Pricing: </span>
        <span className="text-sm font-semibold text-blue-300">{venue.price}</span>
      </div>
    </motion.div>
  )
}
