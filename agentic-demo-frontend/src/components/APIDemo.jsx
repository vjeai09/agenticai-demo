import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cloud, Newspaper, DollarSign, Zap, Loader2, CheckCircle2, XCircle, Play, Home, ChevronLeft, ChevronRight } from 'lucide-react'

export default function APIDemo({ setActiveTab }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
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

  const minSwipeDistance = 50

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentSlide])

  const slides = [
    {
      id: 'weather',
      title: 'Weather API',
      subtitle: 'Get real-time weather data',
      icon: Cloud,
      color: 'from-blue-500 to-cyan-500',
      description: 'Fetch current weather conditions for any city'
    },
    {
      id: 'news',
      title: 'News API',
      subtitle: 'Search latest travel news',
      icon: Newspaper,
      color: 'from-green-500 to-emerald-500',
      description: 'Get the latest news articles about your destination'
    },
    {
      id: 'exchange',
      title: 'Currency Exchange API',
      subtitle: 'Convert currencies instantly',
      icon: DollarSign,
      color: 'from-purple-500 to-pink-500',
      description: 'Real-time currency conversion rates'
    },
    {
      id: 'parallel',
      title: 'Parallel API Orchestration',
      subtitle: 'Run all APIs simultaneously',
      icon: Zap,
      color: 'from-orange-500 to-red-500',
      description: 'Combine multiple API calls for comprehensive results'
    }
  ]

  const totalSlides = slides.length
  const currentSlideData = slides[currentSlide]

  const handleInputChange = (field, value) => {
    setInputs({ ...inputs, [field]: value })
  }

  const simulateAPICall = async (resultKey, mockData) => {
    setLoading({ ...loading, [resultKey]: true })
    setErrors({ ...errors, [resultKey]: null })
    
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
      await new Promise(resolve => setTimeout(resolve, 1200))
      
      const mockData = {
        weather: {
          city: inputs.city,
          temperature: inputs.city.toLowerCase() === 'tokyo' ? '8-12°C' : '15-20°C',
          condition: 'Partly Cloudy',
          humidity: '65%'
        },
        news: {
          articles: [
            { title: 'Tokyo Travel Guide 2025', source: 'Travel Weekly' },
            { title: 'Best Family Activities in Tokyo', source: 'Family Travel' },
            { title: 'Tokyo Weather December Update', source: 'Weather Channel' }
          ],
          total_results: 3
        },
        exchange: {
          from: inputs.fromCurrency,
          to: inputs.toCurrency,
          rate: 149.5,
          original_amount: inputs.amount,
          converted_amount: (parseFloat(inputs.amount) * 149.5).toFixed(2)
        },
        execution_time: '1.2s',
        apis_called: 3,
        success: true
      }
      
      setResults({ ...results, parallel: mockData })
    } catch (error) {
      setErrors({ ...errors, parallel: error.message })
    } finally {
      setLoading({ ...loading, parallel: false })
    }
  }

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    
    if (isLeftSwipe) {
      nextSlide()
    }
    if (isRightSwipe) {
      prevSlide()
    }
  }

  const renderSlideContent = () => {
    const slideId = currentSlideData.id
    const isLoading = loading[slideId]
    const result = results[slideId]
    const error = errors[slideId]

    const inputClass = "w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-base"
    const labelClass = "block text-sm font-semibold text-gray-700 mb-2"
    const buttonClass = `w-full px-6 py-4 bg-gradient-to-r ${currentSlideData.color} hover:opacity-90 rounded-xl font-semibold text-white text-lg flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95`

    switch (slideId) {
      case 'weather':
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm text-blue-900">
                <strong>What it does:</strong> Fetches current weather conditions, temperature, and forecasts for any city worldwide.
              </p>
            </div>

            <div>
              <label className={labelClass}>Enter City Name</label>
              <input
                type="text"
                value={inputs.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className={inputClass}
                placeholder="e.g., Tokyo, Paris, New York"
              />
            </div>

            <button
              onClick={fetchWeather}
              disabled={isLoading}
              className={buttonClass}
            >
              {isLoading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Fetching Weather...</>
              ) : (
                <><Play className="w-5 h-5" /> Get Weather</>
              )}
            </button>

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-300 rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                  <h3 className="text-xl font-bold text-gray-900">Weather Results</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-semibold">Location:</span>
                    <span className="text-gray-900 font-bold text-lg">{result.city}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-semibold">Temperature:</span>
                    <span className="text-blue-600 font-bold text-2xl">{result.temperature}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-semibold">Condition:</span>
                    <span className="text-gray-900">{result.condition}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-semibold">Humidity:</span>
                    <span className="text-gray-900">{result.humidity}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-semibold">Wind:</span>
                    <span className="text-gray-900">{result.wind}</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-blue-200">
                    <p className="text-sm text-gray-700 italic">{result.description}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )

      case 'news':
        return (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="text-sm text-green-900">
                <strong>What it does:</strong> Searches and retrieves the latest news articles related to your travel destination.
              </p>
            </div>

            <div>
              <label className={labelClass}>Search Query</label>
              <input
                type="text"
                value={inputs.newsQuery}
                onChange={(e) => handleInputChange('newsQuery', e.target.value)}
                className={inputClass}
                placeholder="e.g., Tokyo travel December"
              />
            </div>

            <button
              onClick={fetchNews}
              disabled={isLoading}
              className={buttonClass}
            >
              {isLoading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Searching News...</>
              ) : (
                <><Play className="w-5 h-5" /> Search News</>
              )}
            </button>

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                  <h3 className="text-xl font-bold text-gray-900">Found {result.articles.length} Articles</h3>
                </div>
                {result.articles.map((article, idx) => (
                  <div key={idx} className="bg-white border-2 border-green-200 rounded-xl p-4 shadow-md">
                    <h4 className="font-bold text-gray-900 mb-2">{article.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <span className="bg-green-100 px-2 py-1 rounded text-green-700">{article.source}</span>
                      <span>•</span>
                      <span>{article.published}</span>
                    </div>
                    <p className="text-sm text-gray-700">{article.description}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        )

      case 'exchange':
        return (
          <div className="space-y-6">
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
              <p className="text-sm text-purple-900">
                <strong>What it does:</strong> Converts currency amounts using real-time exchange rates.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>From</label>
                <input
                  type="text"
                  value={inputs.fromCurrency}
                  onChange={(e) => handleInputChange('fromCurrency', e.target.value)}
                  className={inputClass}
                  placeholder="USD"
                />
              </div>
              <div>
                <label className={labelClass}>To</label>
                <input
                  type="text"
                  value={inputs.toCurrency}
                  onChange={(e) => handleInputChange('toCurrency', e.target.value)}
                  className={inputClass}
                  placeholder="JPY"
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Amount</label>
              <input
                type="number"
                value={inputs.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
                className={inputClass}
                placeholder="2000"
              />
            </div>

            <button
              onClick={fetchExchange}
              disabled={isLoading}
              className={buttonClass}
            >
              {isLoading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Converting...</>
              ) : (
                <><Play className="w-5 h-5" /> Convert Currency</>
              )}
            </button>

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300 rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                  <h3 className="text-xl font-bold text-gray-900">Conversion Result</h3>
                </div>
                <div className="text-center space-y-4">
                  <div className="bg-white rounded-xl p-4 border border-purple-200">
                    <p className="text-sm text-gray-600 mb-1">You send</p>
                    <p className="text-3xl font-bold text-gray-900">{result.original_amount} {result.from}</p>
                  </div>
                  <div className="text-2xl text-purple-600">↓</div>
                  <div className="bg-white rounded-xl p-4 border border-purple-200">
                    <p className="text-sm text-gray-600 mb-1">They receive</p>
                    <p className="text-3xl font-bold text-purple-600">{result.converted_amount} {result.to}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-purple-200">
                    <p className="text-sm text-gray-700">
                      <strong>Exchange Rate:</strong> 1 {result.from} = {result.rate} {result.to}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )

      case 'parallel':
        return (
          <div className="space-y-6">
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
              <p className="text-sm text-orange-900">
                <strong>What it does:</strong> Executes all three APIs simultaneously and combines results for comprehensive travel planning data.
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <h4 className="font-bold text-gray-900 mb-2">🔄 APIs to Execute:</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>✓ Weather API - Current conditions for {inputs.city}</li>
                <li>✓ News API - Latest articles about {inputs.newsQuery}</li>
                <li>✓ Currency API - Convert {inputs.amount} {inputs.fromCurrency} to {inputs.toCurrency}</li>
              </ul>
            </div>

            <button
              onClick={runParallelDemo}
              disabled={isLoading}
              className={buttonClass}
            >
              {isLoading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Running All APIs...</>
              ) : (
                <><Zap className="w-5 h-5" /> Run All APIs in Parallel</>
              )}
            </button>

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                  <h3 className="text-xl font-bold text-gray-900">All APIs Completed! 🎉</h3>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="bg-blue-100 border border-blue-300 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-blue-600">{result.apis_called}</p>
                    <p className="text-xs text-gray-700">APIs Called</p>
                  </div>
                  <div className="bg-green-100 border border-green-300 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-green-600">{result.execution_time}</p>
                    <p className="text-xs text-gray-700">Exec Time</p>
                  </div>
                  <div className="bg-orange-100 border border-orange-300 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-orange-600">✓</p>
                    <p className="text-xs text-gray-700">Success</p>
                  </div>
                </div>

                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Cloud className="w-5 h-5 text-blue-600" />
                    Weather Data
                  </h4>
                  <div className="text-sm space-y-1 text-gray-700">
                    <p><strong>City:</strong> {result.weather.city}</p>
                    <p><strong>Temperature:</strong> {result.weather.temperature}</p>
                    <p><strong>Condition:</strong> {result.weather.condition}</p>
                  </div>
                </div>

                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Newspaper className="w-5 h-5 text-green-600" />
                    News Results
                  </h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Found <strong>{result.news.total_results} articles</strong>
                  </p>
                  <div className="space-y-2">
                    {result.news.articles.map((article, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-2 text-xs">
                        <p className="font-semibold text-gray-900">{article.title}</p>
                        <p className="text-gray-600">{article.source}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-purple-600" />
                    Currency Conversion
                  </h4>
                  <div className="text-center">
                    <p className="text-sm text-gray-700">
                      {result.exchange.original_amount} {result.exchange.from} = 
                      <span className="text-2xl font-bold text-purple-600 mx-2">
                        {result.exchange.converted_amount}
                      </span>
                      {result.exchange.to}
                    </p>
                    <p className="text-xs text-gray-600 mt-2">Rate: {result.exchange.rate}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-4 shadow-xl">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setActiveTab('api')}
            className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg active:scale-95 transition-transform"
          >
            <Home className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1 mx-3">
            <h1 className="text-base font-bold text-white">API Integration</h1>
            <p className="text-xs text-blue-100">Demo {currentSlide + 1} of {totalSlides}</p>
          </div>
          <div className={`w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg`}>
            <currentSlideData.icon className="w-6 h-6 text-white" />
          </div>
        </div>
        
        <div className="mt-3 w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-white rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block max-w-6xl mx-auto pt-8 mb-8">
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2 text-center">
          API Integration Demos
        </h1>
        <p className="text-purple-200 text-center text-lg">
          Interactive API Testing Experience
        </p>
      </div>

      {/* Main Slide Area */}
      <div className="md:max-w-6xl md:mx-auto">
        {/* Mobile View */}
        <div className="md:hidden pt-24 pb-24 px-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              className="bg-white min-h-[calc(100vh-12rem)] rounded-t-[2rem] shadow-2xl touch-pan-y select-none overflow-hidden"
            >
              <div className={`bg-gradient-to-r ${currentSlideData.color} px-5 py-6 rounded-t-[2rem]`}>
                <div className="text-xs font-bold text-white/80 uppercase tracking-wider mb-1">
                  API Demo {currentSlide + 1}
                </div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  {currentSlideData.title}
                </h2>
                <p className="text-white/90 text-sm">
                  {currentSlideData.subtitle}
                </p>
              </div>

              <div className="px-5 py-6 bg-white text-gray-900 overflow-y-auto max-h-[calc(100vh-20rem)]">
                {renderSlideContent()}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Desktop View */}
        <div className="hidden md:block px-4 pb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 lg:p-12 border border-white/20 shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className={`p-4 rounded-2xl bg-gradient-to-r ${currentSlideData.color} flex-shrink-0`}>
                  <currentSlideData.icon className="w-8 h-8 text-white" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-purple-300">
                    API Demo {currentSlide + 1}
                  </div>
                  <h2 className="text-3xl font-bold text-white">
                    {currentSlideData.title}
                  </h2>
                  <p className="text-purple-200 text-lg">
                    {currentSlideData.subtitle}
                  </p>
                </div>
              </div>

              <div className="text-white">
                {renderSlideContent()}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-4 shadow-xl">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="px-6 py-3 bg-white/20 backdrop-blur-md rounded-xl font-semibold text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg active:scale-95 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm">Back</span>
          </button>

          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide 
                    ? 'bg-white w-8' 
                    : 'bg-white/40'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
            className="px-6 py-3 bg-white/20 backdrop-blur-md rounded-xl font-semibold text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg active:scale-95 transition-all"
          >
            <span className="text-sm">Next</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex max-w-6xl mx-auto justify-between items-center px-4 pb-8">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
          Previous
        </button>

        <div className="flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide 
                  ? 'bg-white w-12' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === totalSlides - 1}
          className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
        >
          Next
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
