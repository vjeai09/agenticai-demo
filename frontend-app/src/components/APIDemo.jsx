import { useState } from 'react'
import { motion } from 'framer-motion'
import { Cloud, Newspaper, DollarSign, Loader2, CheckCircle2, XCircle, ArrowRight } from 'lucide-react'
import axios from 'axios'

const API_BASE = '/api'

export default function APIDemo() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)
  const [activeDemo, setActiveDemo] = useState(null)

  // Demo configurations
  const demos = [
    {
      id: 'weather',
      title: 'Weather API',
      description: 'Get real-time weather data from any city',
      icon: Cloud,
      color: 'from-blue-400 to-cyan-500',
      placeholder: 'Enter city name (e.g., Tokyo)',
      action: async (input) => {
        const response = await axios.get(`${API_BASE}/weather/${input}`)
        return response.data
      }
    },
    {
      id: 'news',
      title: 'News API',
      description: 'Search latest news articles',
      icon: Newspaper,
      color: 'from-purple-400 to-pink-500',
      placeholder: 'Enter search topic (e.g., artificial intelligence)',
      action: async (input) => {
        const response = await axios.get(`${API_BASE}/news`, {
          params: { query: input, page_size: 5 }
        })
        return response.data
      }
    },
    {
      id: 'exchange',
      title: 'Currency Exchange',
      description: 'Get real-time exchange rates',
      icon: DollarSign,
      color: 'from-orange-400 to-red-500',
      placeholder: 'From-To (e.g., USD-EUR)',
      action: async (input) => {
        const [from, to] = input.toUpperCase().split('-')
        const response = await axios.get(`${API_BASE}/exchange`, {
          params: { from_currency: from, to_currency: to }
        })
        return response.data
      }
    }
  ]

  const handleDemo = async (demo, input) => {
    if (!input.trim()) return

    setLoading(true)
    setError(null)
    setResults(null)
    setActiveDemo(demo.id)

    try {
      const data = await demo.action(input)
      setResults(data)
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleResearch = async () => {
    setLoading(true)
    setError(null)
    setResults(null)
    setActiveDemo('research')

    try {
      const response = await axios.post(`${API_BASE}/research`, {
        city: 'Paris',
        currency: 'EUR'
      })
      setResults(response.data)
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'An error occurred')
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
        <h2 className="text-4xl font-bold mb-4 gradient-text">
          API Integration Demo
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Experience how AI agents interact with external APIs to fetch real-time data. 
          Watch the magic happen as multiple services work together seamlessly.
        </p>
      </motion.div>

      {/* Individual API Demos */}
      <div className="grid md:grid-cols-3 gap-6">
        {demos.map((demo, index) => (
          <APICard
            key={demo.id}
            demo={demo}
            index={index}
            onSubmit={handleDemo}
            isActive={activeDemo === demo.id}
            loading={loading && activeDemo === demo.id}
          />
        ))}
      </div>

      {/* Parallel API Orchestration Demo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-8"
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <span className="text-3xl">⚡</span>
              Parallel API Orchestration
            </h3>
            <p className="text-gray-400">
              The most powerful feature: Call multiple APIs simultaneously!
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-blue-300">Sequential (Old Way)</span>
            <span className="text-red-400">6 seconds</span>
          </div>
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <ArrowRight className="w-4 h-4" />
              Weather API (2s) → News API (2s) → Currency API (2s)
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-green-300">Parallel (New Way)</span>
            <span className="text-green-400">2 seconds ✨</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <ArrowRight className="w-4 h-4" />
              Weather + News + Currency APIs (all at once!)
            </div>
          </div>
        </div>

        <button
          onClick={handleResearch}
          disabled={loading && activeDemo === 'research'}
          className="w-full btn-primary flex items-center justify-center gap-2"
        >
          {loading && activeDemo === 'research' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Calling Multiple APIs...
            </>
          ) : (
            <>
              <span>🚀</span>
              Research Paris Trip (3 APIs in Parallel)
            </>
          )}
        </button>
      </motion.div>

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
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 text-green-400 mb-4">
                <CheckCircle2 className="w-6 h-6" />
                <h4 className="font-semibold text-lg">Success!</h4>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 overflow-auto max-h-96">
                <pre className="text-xs text-gray-300">
                  {JSON.stringify(results, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}

function APICard({ demo, index, onSubmit, isActive, loading }) {
  const [input, setInput] = useState('')
  const Icon = demo.icon

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(demo, input)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`glass-card glass-card-hover p-6 ${isActive ? 'ring-2 ring-blue-500' : ''}`}
    >
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${demo.color} flex items-center justify-center mb-4`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      
      <h3 className="text-xl font-bold mb-2">{demo.title}</h3>
      <p className="text-gray-400 text-sm mb-4">{demo.description}</p>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={demo.placeholder}
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     transition-all duration-200"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600
                     hover:from-blue-600 hover:to-purple-700
                     rounded-lg font-semibold transition-all duration-200
                     disabled:opacity-50 disabled:cursor-not-allowed
                     flex items-center justify-center gap-2"
        >
          {loading && isActive ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading...
            </>
          ) : (
            'Try It'
          )}
        </button>
      </form>
    </motion.div>
  )
}
