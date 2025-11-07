import { useState } from 'react'
import { motion } from 'framer-motion'
import { Cloud, Newspaper, DollarSign, Zap, Loader2, CheckCircle2, XCircle, Play } from 'lucide-react'

export default function APIDemo() {
  const [loading, setLoading] = useState({})
  const [results, setResults] = useState({})
  const [errors, setErrors] = useState({})
  const [inputs, setInputs] = useState({
    city: 'Tokyo',
    newsQuery: 'Tokyo travel December',
    fromCurrency: 'USD',
    toCurrency: 'JPY',
    amount: '2000'
  })

  const handleInputChange = (field, value) => {
    setInputs({ ...inputs, [field]: value })
  }

  // Simulated API responses for demo purposes
  const simulateAPICall = async (resultKey, mockData) => {
    setLoading({ ...loading, [resultKey]: true })
    setErrors({ ...errors, [resultKey]: null })
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    try {
      setResults({ ...results, [resultKey]: mockData })
    } catch (error) {
      setErrors({ ...errors, [resultKey]: error.message })
    } finally {
      setLoading({ ...loading, [resultKey]: false })
    }
  }

  const fetchWeather = () => {
    const mockData = {
      city: inputs.city,
      temperature: inputs.city.toLowerCase() === 'tokyo' ? '8-12°C' : '15-20°C',
      condition: 'Partly Cloudy',
      humidity: '65%',
      wind: '12 km/h',
      description: inputs.city.toLowerCase() === 'tokyo' 
        ? 'Cold and dry December weather. Perfect for sightseeing but pack warm layers.'
        : 'Pleasant weather conditions expected.'
    }
    simulateAPICall('weather', mockData)
  }

  const fetchNews = () => {
    const mockData = {
      articles: [
        {
          title: 'Tokyo Opens New Family-Friendly Museums in 2025',
          source: 'Travel News',
          published: '2 days ago',
          description: 'Several interactive museums opened in Odaiba and Shibuya districts, perfect for families with children.'
        },
        {
          title: 'Best Time to Visit Tokyo: December Travel Guide',
          source: 'Japan Tourism',
          published: '1 week ago',
          description: 'December offers unique winter illuminations and fewer crowds at major attractions.'
        },
        {
          title: 'Tokyo Metro Announces Extended Hours for Holiday Season',
          source: 'Transportation Weekly',
          published: '3 days ago',
          description: 'JR lines will operate until 1 AM during the holiday season to accommodate travelers.'
        },
        {
          title: 'Top 10 Family Activities in Tokyo Winter 2025',
          source: 'Family Travel',
          published: '5 days ago',
          description: 'From teamLab Borderless to Tokyo Disneyland, discover the best activities for kids.'
        },
        {
          title: 'Tokyo Hotel Prices Drop 15% in Early December',
          source: 'Hotel Insider',
          published: '1 day ago',
          description: 'Great deals on family-friendly accommodations before the peak Christmas season.'
        }
      ]
    }
    simulateAPICall('news', mockData)
  }

  const fetchExchange = () => {
    const rate = inputs.fromCurrency === 'USD' && inputs.toCurrency === 'JPY' ? 149.5 : 1.0
    const convertedAmount = (parseFloat(inputs.amount) * rate).toFixed(2)
    
    const mockData = {
      from: inputs.fromCurrency,
      to: inputs.toCurrency,
      rate: rate,
      original_amount: inputs.amount,
      converted_amount: convertedAmount,
      timestamp: new Date().toISOString()
    }
    simulateAPICall('exchange', mockData)
  }

  const runParallelDemo = async () => {
    setLoading({ ...loading, parallel: true })
    setErrors({ ...errors, parallel: null })
    
    try {
      const response = await axios.post(`${API_BASE}/research`, {
        city: inputs.city,
        news_query: inputs.newsQuery,
        from_currency: inputs.fromCurrency,
        to_currency: inputs.toCurrency,
        amount: parseFloat(inputs.amount)
      })
      setResults({ ...results, parallel: response.data })
    } catch (error) {
      setErrors({ ...errors, parallel: error.response?.data?.detail || error.message })
    } finally {
      setLoading({ ...loading, parallel: false })
    }
  }

  return (
    <div className="space-y-8">
      {/* Intro Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 text-center"
      >
        <Cloud className="w-16 h-16 mx-auto mb-4 text-blue-400" />
        <h2 className="text-3xl font-bold mb-3 gradient-text">API Integration Demo</h2>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
          Experience how AI agents interact with external APIs to plan your Tokyo trip! 
          We're using <span className="text-blue-400 font-semibold">Weather</span>, 
          <span className="text-purple-400 font-semibold"> News</span>, and 
          <span className="text-green-400 font-semibold"> Currency Exchange</span> APIs to gather travel information.
        </p>
      </motion.div>

      {/* API Cards Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Weather API Card */}
        <APICard
          title="Weather API"
          icon={Cloud}
          color="from-blue-500 to-cyan-500"
          description="Get real-time weather data for any city"
        >
          <input
            type="text"
            value={inputs.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            placeholder="Enter city name"
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
          />
          <button
            onClick={fetchWeather}
            disabled={loading.weather}
            className="w-full py-2 bg-gradient-to-r from-blue-500 to-cyan-600 
                     hover:from-blue-600 hover:to-cyan-700 rounded-lg font-semibold
                     disabled:opacity-50 disabled:cursor-not-allowed
                     flex items-center justify-center gap-2"
          >
            {loading.weather ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Loading...</>
            ) : (
              <><Play className="w-4 h-4" /> Fetch Weather</>
            )}
          </button>
          {renderResult(results.weather, errors.weather, 'weather')}
        </APICard>

        {/* News API Card */}
        <APICard
          title="News API"
          icon={Newspaper}
          color="from-purple-500 to-pink-500"
          description="Search latest news articles"
        >
          <input
            type="text"
            value={inputs.newsQuery}
            onChange={(e) => handleInputChange('newsQuery', e.target.value)}
            placeholder="Search topic"
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-purple-500 mb-3"
          />
          <button
            onClick={fetchNews}
            disabled={loading.news}
            className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-600 
                     hover:from-purple-600 hover:to-pink-700 rounded-lg font-semibold
                     disabled:opacity-50 disabled:cursor-not-allowed
                     flex items-center justify-center gap-2"
          >
            {loading.news ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Loading...</>
            ) : (
              <><Play className="w-4 h-4" /> Search News</>
            )}
          </button>
          {renderResult(results.news, errors.news, 'news')}
        </APICard>

        {/* Currency Exchange Card */}
        <APICard
          title="Currency Exchange"
          icon={DollarSign}
          color="from-green-500 to-emerald-500"
          description="Convert currency rates"
        >
          <div className="space-y-2 mb-3">
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={inputs.fromCurrency}
                onChange={(e) => handleInputChange('fromCurrency', e.target.value.toUpperCase())}
                placeholder="From (USD)"
                className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                value={inputs.toCurrency}
                onChange={(e) => handleInputChange('toCurrency', e.target.value.toUpperCase())}
                placeholder="To (JPY)"
                className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <input
              type="number"
              value={inputs.amount}
              onChange={(e) => handleInputChange('amount', e.target.value)}
              placeholder="Amount"
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            onClick={fetchExchange}
            disabled={loading.exchange}
            className="w-full py-2 bg-gradient-to-r from-green-500 to-emerald-600 
                     hover:from-green-600 hover:to-emerald-700 rounded-lg font-semibold
                     disabled:opacity-50 disabled:cursor-not-allowed
                     flex items-center justify-center gap-2"
          >
            {loading.exchange ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Loading...</>
            ) : (
              <><Play className="w-4 h-4" /> Convert</>
            )}
          </button>
          {renderResult(results.exchange, errors.exchange, 'exchange')}
        </APICard>
      </div>

      {/* Parallel Orchestration Demo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-8 h-8 text-yellow-400" />
          <div>
            <h3 className="text-2xl font-bold">⚡ Parallel API Orchestration</h3>
            <p className="text-gray-400 text-sm">Execute all three APIs simultaneously for maximum efficiency</p>
          </div>
        </div>
        
        <button
          onClick={runParallelDemo}
          disabled={loading.parallel}
          className="w-full py-4 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 
                   hover:from-yellow-600 hover:via-orange-600 hover:to-red-600
                   rounded-lg font-bold text-lg
                   disabled:opacity-50 disabled:cursor-not-allowed
                   flex items-center justify-center gap-3 shadow-lg shadow-orange-500/50"
        >
          {loading.parallel ? (
            <><Loader2 className="w-6 h-6 animate-spin" /> Running Parallel Calls...</>
          ) : (
            <><Zap className="w-6 h-6" /> Run All APIs in Parallel</>
          )}
        </button>
        
        {renderResult(results.parallel, errors.parallel, 'parallel')}
      </motion.div>

      {/* Explanation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-6"
      >
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
          <span className="text-2xl">💡</span>
          How It Works
        </h3>
        <div className="space-y-2 text-sm text-gray-300">
          <p><strong className="text-blue-400">1. API Integration:</strong> Backend connects to external APIs using async HTTP requests</p>
          <p><strong className="text-purple-400">2. Data Processing:</strong> Responses are parsed and formatted for display</p>
          <p><strong className="text-green-400">3. Error Handling:</strong> Graceful error handling with user-friendly messages</p>
          <p><strong className="text-yellow-400">4. Parallel Execution:</strong> Multiple APIs called simultaneously using Python asyncio</p>
        </div>
      </motion.div>
    </div>
  )
}

function APICard({ title, icon: Icon, color, description, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card glass-card-hover p-6"
    >
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm mb-4">{description}</p>
      {children}
    </motion.div>
  )
}

function renderResult(result, error, key) {
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg"
      >
        <div className="flex items-start gap-2">
          <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-400 font-semibold text-sm">Error</p>
            <p className="text-red-300 text-xs">{error}</p>
          </div>
        </div>
      </motion.div>
    )
  }

  if (result) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg"
      >
        <div className="flex items-start gap-2 mb-2">
          <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
          <p className="text-green-400 font-semibold text-sm">Success</p>
        </div>
        <div className="bg-slate-900/50 rounded p-2 max-h-40 overflow-auto">
          <pre className="text-xs text-gray-300 whitespace-pre-wrap">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      </motion.div>
    )
  }

  return null
}
