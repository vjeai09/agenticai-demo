import { motion } from 'framer-motion'
import { Calendar, Building2, Sparkles } from 'lucide-react'

const tabs = [
  { id: 'api', label: 'Book Now', icon: Calendar, color: 'from-blue-500 to-cyan-500' },
  { id: 'rag', label: 'Our Venues', icon: Building2, color: 'from-purple-500 to-pink-500' },
  { id: 'mcp', label: 'Services', icon: Sparkles, color: 'from-orange-500 to-red-500' },
]

export default function Navigation({ activeTab, setActiveTab }) {
  return (
    <nav className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <div className="glass-card p-2 flex gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-1 px-6 py-4 rounded-xl font-semibold
                transition-all duration-300 relative overflow-hidden
                ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className={`absolute inset-0 bg-gradient-to-r ${tab.color} rounded-xl`}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Icon className="w-5 h-5" />
                {tab.label}
              </span>
            </motion.button>
          )
        })}
      </div>
    </nav>
  )
}
