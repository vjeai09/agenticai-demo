import { motion } from 'framer-motion'
import { Users, MapPin, Car, Utensils, Music, Camera, Wifi, Wind, CheckCircle2, Star } from 'lucide-react'

export default function VenuesDemo() {
  const venues = [
    {
      id: 1,
      name: 'Grand Palace Hall',
      image: '🏛️',
      capacity: '500-1000 guests',
      size: '15,000 sq ft',
      description: 'Our flagship venue with majestic architecture and world-class amenities. Perfect for grand weddings and large conferences.',
      features: [
        { icon: Users, text: '500-1000 guests capacity' },
        { icon: Wind, text: 'Centralized AC system' },
        { icon: Car, text: 'Parking for 200 vehicles' },
        { icon: Music, text: 'Professional sound system' },
        { icon: Utensils, text: 'In-house catering available' },
        { icon: Wifi, text: 'High-speed WiFi' },
      ],
      highlights: [
        'Grand entrance with chandelier',
        'Elevated stage with lighting',
        'Separate dining area',
        'Bridal preparation room',
        'Generator backup'
      ],
      color: 'from-blue-500 to-cyan-500',
      rating: 4.9
    },
    {
      id: 2,
      name: 'Royal Garden Hall',
      image: '🌺',
      capacity: '200-500 guests',
      size: '8,000 sq ft + Garden',
      description: 'Beautiful indoor-outdoor combination venue with lush gardens. Ideal for intimate weddings and garden parties.',
      features: [
        { icon: Users, text: '200-500 guests capacity' },
        { icon: MapPin, text: 'Indoor + Outdoor spaces' },
        { icon: Car, text: 'Parking for 100 vehicles' },
        { icon: Camera, text: 'Scenic photography spots' },
        { icon: Utensils, text: 'BBQ & buffet options' },
        { icon: Wind, text: 'AC indoor hall' },
      ],
      highlights: [
        'Landscaped garden area',
        'Gazebo for ceremonies',
        'Water fountain feature',
        'Fairy light decorations',
        'Open-air dining section'
      ],
      color: 'from-purple-500 to-pink-500',
      rating: 4.8
    },
    {
      id: 3,
      name: 'Executive Conference Hall',
      image: '💼',
      capacity: '50-200 guests',
      size: '3,000 sq ft',
      description: 'Modern conference facility with business-grade amenities. Perfect for corporate events, seminars, and business meetings.',
      features: [
        { icon: Users, text: '50-200 guests capacity' },
        { icon: Wifi, text: 'High-speed internet' },
        { icon: Car, text: 'Parking for 50 vehicles' },
        { icon: Wind, text: 'Climate controlled AC' },
        { icon: Camera, text: 'AV equipment included' },
        { icon: Utensils, text: 'Coffee & snacks service' },
      ],
      highlights: [
        'Projector & screen setup',
        'White boards & flip charts',
        'Podium with mic system',
        'Break-out rooms',
        'High-speed connectivity'
      ],
      color: 'from-orange-500 to-red-500',
      rating: 4.7
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-4xl font-bold mb-4 gradient-text">
          Our Premium Venues
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Choose from our collection of elegant venues, each designed to make your event unforgettable.
        </p>
      </motion.div>

      {/* Venues Grid */}
      <div className="space-y-8">
        {venues.map((venue, index) => (
          <motion.div
            key={venue.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            className="glass-card glass-card-hover overflow-hidden"
          >
            <div className="grid md:grid-cols-3 gap-6 p-8">
              {/* Left Column - Image & Basic Info */}
              <div className="space-y-4">
                <div className="text-8xl text-center mb-4">{venue.image}</div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">{venue.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="text-lg font-semibold text-yellow-400">{venue.rating}</span>
                    <span className="text-sm text-gray-400">(500+ events)</span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p className="text-blue-400 font-semibold">{venue.capacity}</p>
                    <p className="text-gray-400">{venue.size}</p>
                  </div>
                </div>
                
                <div className={`w-full py-3 px-4 bg-gradient-to-r ${venue.color} rounded-lg font-semibold text-center cursor-pointer hover:opacity-90 transition-opacity`}>
                  Request Tour
                </div>
              </div>

              {/* Middle Column - Features */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-200">Key Features</h4>
                <div className="space-y-3">
                  {venue.features.map((feature, idx) => {
                    const Icon = feature.icon
                    return (
                      <div key={idx} className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${venue.color} flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm text-gray-300">{feature.text}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Right Column - Highlights */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-200">Venue Highlights</h4>
                <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                  {venue.description}
                </p>
                <div className="space-y-2">
                  {venue.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-400">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-8 text-center"
      >
        <h3 className="text-2xl font-bold mb-4">Can't Decide? Let Us Help!</h3>
        <p className="text-gray-300 mb-6">
          Our event planning team will help you choose the perfect venue based on your needs and budget.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg font-semibold transition-all">
            Schedule Venue Visit
          </button>
          <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg font-semibold transition-all">
            Download Brochure
          </button>
        </div>
      </motion.div>
    </div>
  )
}
