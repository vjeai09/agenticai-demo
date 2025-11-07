import { useState } from 'react'
import { motion } from 'framer-motion'
import APIDemo from './components/APIDemo'
import RAGDemo from './components/RAGDemo'
import MCPDemo from './components/MCPDemo'
import Navigation from './components/Navigation'
import BackgroundParticles from './components/BackgroundParticles'
import { Brain, Zap } from 'lucide-react'

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
              className="mb-4 flex items-center justify-center gap-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Brain className="w-12 h-12 text-blue-400 animate-pulse-slow" />
              <h1 className="text-5xl md:text-7xl font-bold">
                <span className="gradient-text">Agentic AI</span>
              </h1>
              <Zap className="w-12 h-12 text-purple-400 animate-pulse-slow animation-delay-2000" />
            </motion.div>
            <motion.p 
              className="text-xl text-blue-300 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Interactive Demo Platform
            </motion.p>
            <motion.p 
              className="text-sm text-gray-400 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Explore the power of AI-driven automation through API Integration, 
              RAG Systems, and Model Context Protocol agents
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
          {activeTab === 'api' && <APIDemo />}
          {activeTab === 'rag' && <RAGDemo />}
          {activeTab === 'mcp' && <MCPDemo />}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="w-5 h-5 text-blue-400" />
            <span className="text-sm text-gray-400">Powered by Advanced AI Technology</span>
          </div>
          <div className="border-t border-white/10 pt-4">
            <p className="text-gray-500 text-sm">
              Built with React, FastAPI & Modern AI Tools • 2025
            </p>
            <p className="text-gray-600 text-xs mt-2">
              Demonstrating API Integration • RAG Systems • MCP Agents
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
