import { motion } from 'framer-motion'
import { Utensils, Music, Camera, Sparkles, Gift, Car, Users, Settings, CheckCircle2, ArrowRight } from 'lucide-react'

export default function ServicesDemo() {
  const services = [
    {
      id: 1,
      name: 'Catering Services',
      icon: Utensils,
      description: 'Multi-cuisine delights from expert chefs',
      features: [
        'North & South Indian cuisine',
        'Chinese & Continental options',
        'Live counter experiences',
        'Custom menu planning',
        'Dietary accommodation',
        'Professional service staff'
      ],
      color: 'from-blue-500 to-cyan-500',
      price: 'Starting ₹800/plate'
    },
    {
      id: 2,
      name: 'Decoration & Lighting',
      icon: Sparkles,
      description: 'Transform spaces into magical experiences',
      features: [
        'Theme-based decorations',
        'Floral arrangements',
        'Stage & backdrop design',
        'LED & uplighting',
        'Ceiling draping',
        'Entrance archways'
      ],
      color: 'from-purple-500 to-pink-500',
      price: 'Starting ₹50,000'
    },
    {
      id: 3,
      name: 'Photography & Videography',
      icon: Camera,
      description: 'Capture every precious moment professionally',
      features: [
        'HD & 4K video coverage',
        'Drone photography',
        'Candid photography',
        'Pre-wedding shoots',
        'Same-day edits',
        'Album & photobook design'
      ],
      color: 'from-orange-500 to-red-500',
      price: 'Starting ₹40,000'
    },
    {
      id: 4,
      name: 'Music & Entertainment',
      icon: Music,
      description: 'Keep guests entertained throughout the event',
      features: [
        'Live band performances',
        'DJ with sound system',
        'Traditional musicians',
        'Dance floor setup',
        'Karaoke setup',
        'Artist management'
      ],
      color: 'from-green-500 to-teal-500',
      price: 'Starting ₹30,000'
    },
    {
      id: 5,
      name: 'Event Planning',
      icon: Settings,
      description: 'End-to-end event management services',
      features: [
        'Event coordination',
        'Timeline planning',
        'Vendor management',
        'Guest list management',
        'Invitation design',
        'Day-of coordination'
      ],
      color: 'from-yellow-500 to-orange-500',
      price: 'Starting ₹25,000'
    },
    {
      id: 6,
      name: 'Additional Services',
      icon: Gift,
      description: 'Everything you need for a perfect event',
      features: [
        'Valet parking service',
        'Guest accommodation',
        'Return gift planning',
        'Mehendi artists',
        'Makeup & styling',
        'Transportation'
      ],
      color: 'from-pink-500 to-red-500',
      price: 'Custom pricing'
    }
  ]

  const packages = [
    {
      name: 'Silver Package',
      price: '₹3,50,000',
      description: 'Perfect for intimate gatherings',
      capacity: 'Up to 200 guests',
      includes: [
        'Venue rental (4 hours)',
        'Basic decoration',
        'Vegetarian catering',
        'Sound system',
        'Basic lighting',
        'Event coordinator'
      ],
      color: 'from-gray-400 to-gray-500'
    },
    {
      name: 'Gold Package',
      price: '₹6,50,000',
      description: 'Most popular for weddings',
      capacity: 'Up to 500 guests',
      includes: [
        'Venue rental (6 hours)',
        'Premium decoration',
        'Multi-cuisine catering',
        'DJ + sound system',
        'LED lighting',
        'Photography (basic)',
        'Valet parking',
        'Event management'
      ],
      color: 'from-yellow-500 to-orange-500',
      popular: true
    },
    {
      name: 'Platinum Package',
      price: '₹12,00,000+',
      description: 'Luxury experience for grand events',
      capacity: 'Up to 1000 guests',
      includes: [
        'Venue rental (8 hours)',
        'Luxury decoration',
        'Premium catering options',
        'Live band + DJ',
        'Professional lighting',
        'Photography + videography',
        'Drone coverage',
        'Valet + security',
        'Complete event management',
        'Complimentary stay'
      ],
      color: 'from-purple-500 to-pink-500'
    }
  ]

  return (
    <div className="space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-4xl font-bold mb-4 gradient-text">
          Our Services
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Comprehensive event services to make your celebration stress-free and memorable.
        </p>
      </motion.div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => {
          const Icon = service.icon
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card glass-card-hover p-6"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4`}>
                <Icon className="w-7 h-7 text-white" />
              </div>
              
              <h3 className="text-xl font-bold mb-2">{service.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{service.description}</p>
              
              <div className="space-y-2 mb-4">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="pt-4 border-t border-white/10">
                <p className="text-sm text-blue-400 font-semibold">{service.price}</p>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Packages Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-6"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-3 gradient-text">
            Complete Event Packages
          </h2>
          <p className="text-gray-300">
            All-inclusive packages designed to fit your budget and requirements
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className={`glass-card p-6 relative ${pkg.popular ? 'ring-2 ring-yellow-500' : ''}`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}
              
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pkg.color} flex items-center justify-center mb-4`}>
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
              <p className="text-3xl font-bold mb-1">
                <span className={`bg-gradient-to-r ${pkg.color} bg-clip-text text-transparent`}>
                  {pkg.price}
                </span>
              </p>
              <p className="text-gray-400 text-sm mb-1">{pkg.description}</p>
              <p className="text-blue-400 text-sm font-semibold mb-4">{pkg.capacity}</p>
              
              <div className="space-y-2 mb-6">
                {pkg.includes.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
              
              <button className={`w-full py-3 px-4 bg-gradient-to-r ${pkg.color} rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2`}>
                Choose Package
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Custom Package CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="glass-card p-8 text-center"
      >
        <Users className="w-12 h-12 text-blue-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-3">Need a Custom Package?</h3>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Every event is unique. Let's create a personalized package that perfectly matches your vision and budget.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg font-semibold transition-all">
            Speak with Event Planner
          </button>
          <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg font-semibold transition-all">
            Get Custom Quote
          </button>
        </div>
      </motion.div>
    </div>
  )
}
