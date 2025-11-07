import { motion } from 'framer-motion'
import { Cloud, Database, Sparkles, BookOpen } from 'lucide-react'

const tabs = [
  { 
    id: 'journey', 
    label: 'Learning Journey', 
    icon: BookOpen, 
    color: 'from-indigo-500 to-purple-500',
    description: 'Interactive tutorial & progression'
  },
  { 
    id: 'api', 
    label: 'API Integration', 
    icon: Cloud, 
    color: 'from-blue-500 to-cyan-500',
    description: 'External API calls & orchestration'
  },
  { 
    id: 'rag', 
    label: 'RAG System', 
    icon: Database, 
    color: 'from-purple-500 to-pink-500',
    description: 'Retrieval-Augmented Generation'
  },
  { 
    id: 'mcp', 
    label: 'MCP Agents', 
    icon: Sparkles, 
    color: 'from-orange-500 to-red-500',
    description: 'Model Context Protocol'
  },
]

export default function Navigation({ activeTab, setActiveTab }) {
  return (
    <nav className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <div className="glass-card p-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id

            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-6 py-4 rounded-xl font-semibold
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
                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </div>
                  <p className="text-xs opacity-75">{tab.description}</p>
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
