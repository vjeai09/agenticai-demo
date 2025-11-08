import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Wrench, Play, CheckCircle2, Loader2, Eye, Zap, Database, Code, Calendar, MapPin, Plane, Building, Home, ChevronLeft, ChevronRight } from 'lucide-react'

export default function MCPDemo({ setActiveTab }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [selectedTool, setSelectedTool] = useState(null)
  const [loading, setLoading] = useState(false)
  const [executionResult, setExecutionResult] = useState(null)
  const [taskInput, setTaskInput] = useState("Plan a 5-day Tokyo family trip in December with $2000 budget")
  const [executionLog, setExecutionLog] = useState([])
  const [activeTools, setActiveTools] = useState([])
  const [currentPhase, setCurrentPhase] = useState('')

  const minSwipeDistance = 50

  // Reset to first slide when component mounts
  useEffect(() => {
    setCurrentSlide(0)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentSlide])

  const mcpTools = [
    {
      id: 'weather_tool',
      name: 'Weather API',
      icon: MapPin,
      color: 'from-blue-500 to-cyan-500',
      description: 'Get weather forecasts',
      schema: { parameters: ['city', 'month'], returns: 'temperature, conditions' },
      example: { city: 'Tokyo', month: 'December' }
    },
    {
      id: 'currency_tool',
      name: 'Currency Converter',
      icon: Database,
      color: 'from-green-500 to-emerald-500',
      description: 'Convert currencies',
      schema: { parameters: ['from', 'to', 'amount'], returns: 'converted_amount, exchange_rate' },
      example: { from: 'USD', to: 'JPY', amount: 2000 }
    },
    {
      id: 'hotel_search',
      name: 'Hotel Search',
      icon: Building,
      color: 'from-purple-500 to-pink-500',
      description: 'Search for hotels',
      schema: { parameters: ['city', 'checkin', 'checkout'], returns: 'hotels_list, prices' },
      example: { city: 'Tokyo', guests: 4, nights: 5 }
    },
    {
      id: 'flight_search',
      name: 'Flight Search',
      icon: Plane,
      color: 'from-orange-500 to-red-500',
      description: 'Find flights',
      schema: { parameters: ['from', 'to', 'date'], returns: 'flights, prices' },
      example: { from: 'LAX', to: 'NRT', passengers: 4 }
    },
    {
      id: 'activity_search',
      name: 'Activity Finder',
      icon: Calendar,
      color: 'from-yellow-500 to-orange-500',
      description: 'Discover activities',
      schema: { parameters: ['city', 'category'], returns: 'activities, prices' },
      example: { city: 'Tokyo', category: 'family', ages: '6-9' }
    },
    {
      id: 'rag_query',
      name: 'Knowledge Base',
      icon: Code,
      color: 'from-indigo-500 to-purple-500',
      description: 'Query travel database',
      schema: { parameters: ['query', 'context'], returns: 'relevant_info' },
      example: { query: 'Tokyo family activities' }
    }
  ]

  const slides = [
    { id: 0, title: "🤖 MCP Agent", subtitle: "Available Tools", icon: Sparkles, color: "from-orange-500 to-red-500" },
    { id: 1, title: "🚀 Execute", subtitle: "Run Agent", icon: Zap, color: "from-purple-500 to-pink-500" },
    { id: 2, title: "🎉 Result", subtitle: "Travel Plan", icon: CheckCircle2, color: "from-green-500 to-emerald-500" }
  ]

  const totalSlides = slides.length
  const currentSlideData = slides[currentSlide]

  const simulateAgentExecution = async () => {
    setLoading(true)
    setExecutionLog([])
    setExecutionResult(null)
    setActiveTools([])
    setCurrentPhase('planning')

    const steps = [
      {
        step: 1,
        agent: 'Planning Agent',
        thought: 'Breaking down task: Need weather, budget, hotels, activities',
        action: 'Analyzing request and identifying tools',
        toolsNeeded: ['weather_tool', 'currency_tool', 'hotel_search', 'rag_query']
      },
      {
        step: 2,
        agent: 'Execution Agent',
        thought: 'Calling Weather API for December Tokyo',
        action: 'MCP Tool Call: weather_tool',
        toolUsed: 'weather_tool',
        result: { temperature: '8-12°C', conditions: 'Cold & dry', recommendation: 'Pack warm layers' }
      },
      {
        step: 3,
        agent: 'Execution Agent',
        thought: 'Converting $2000 USD to JPY',
        action: 'MCP Tool Call: currency_tool',
        toolUsed: 'currency_tool',
        result: { amount: '¥299,000', rate: '149.5 JPY/USD', breakdown: 'Hotels: ¥100k, Food: ¥60k, Activities: ¥80k' }
      },
      {
        step: 4,
        agent: 'Execution Agent',
        thought: 'Searching family-friendly activities',
        action: 'MCP Tool Call: rag_query',
        toolUsed: 'rag_query',
        result: { activities: ['Tokyo Disneyland', 'teamLab Borderless', 'Ueno Zoo'], costs: '¥15,000-20,000/day' }
      },
      {
        step: 5,
        agent: 'Execution Agent',
        thought: 'Finding family hotels',
        action: 'MCP Tool Call: hotel_search',
        toolUsed: 'hotel_search',
        result: { hotels: ['Tokyo Bay Hotel', 'Shinjuku Family Inn'], avgPrice: '¥18,000/night', totalCost: '¥90,000 (5 nights)' }
      },
      {
        step: 6,
        agent: 'Synthesis Agent',
        thought: 'Compiling results into travel plan',
        action: 'Generating final itinerary',
        result: { status: 'Complete', toolsCalled: 4, confidenceScore: '95%' }
      }
    ]

    for (let i = 0; i < steps.length; i++) {
      if (steps[i].step === 1) setCurrentPhase('planning')
      else if (steps[i].step === 6) setCurrentPhase('synthesizing')
      else setCurrentPhase('executing')
      
      if (steps[i].toolUsed) {
        setActiveTools([steps[i].toolUsed])
      } else {
        setActiveTools([])
      }
      
      await new Promise(resolve => setTimeout(resolve, 1800))
      setExecutionLog(prev => [...prev, steps[i]])
    }
    
    setActiveTools([])
    setCurrentPhase('')

    const finalPlan = {
      title: 'Tokyo Family Trip - 5 Days',
      budget: {
        total: '¥299,000 ($2000 USD)',
        breakdown: {
          accommodation: '¥90,000 (5 nights)',
          activities: '¥80,000',
          food: '¥60,000',
          transportation: '¥30,000',
          miscellaneous: '¥39,000'
        }
      },
      weather: '8-12°C, pack warm clothes',
      itinerary: [
        { day: 1, activities: 'Arrival, Shibuya & Harajuku' },
        { day: 2, activities: 'Tokyo Disneyland (full day)' },
        { day: 3, activities: 'Ueno Zoo, Asakusa, teamLab Borderless' },
        { day: 4, activities: 'Odaiba (Miraikan Museum)' },
        { day: 5, activities: 'Shopping, Departure' }
      ],
      hotels: ['Tokyo Bay Hotel (¥18,000/night)', 'Near JR station', '2 connecting rooms'],
      toolsUsed: ['Weather API', 'Currency Converter', 'RAG Query', 'Hotel Search']
    }

    setExecutionResult(finalPlan)
    setLoading(false)
    
    // Don't auto-advance - let user review the execution steps
    // Users can manually click Next to see the final result
  }

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      // After completing MCP Demo, return to Journey
      setActiveTab('journey')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
  const prevSlide = () => currentSlide > 0 && setCurrentSlide(currentSlide - 1)
  const goToSlide = (index) => setCurrentSlide(index)

  const onTouchStart = (e) => { setTouchEnd(null); setTouchStart(e.targetTouches[0].clientX) }
  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX)
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    if (distance > minSwipeDistance) nextSlide()
    if (distance < -minSwipeDistance) prevSlide()
  }

  const renderSlide0 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Sparkles className="w-16 h-16 mx-auto mb-3 text-orange-400" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Model Context Protocol</h3>
        <p className="text-gray-700 text-sm leading-relaxed">
          Watch AI agents use <span className="font-bold text-orange-600">real tools</span> to plan your Tokyo trip!
        </p>
      </div>

      <div>
        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Wrench className="w-5 h-5 text-blue-600" />
          6 Available MCP Tools
        </h4>
        <p className="text-xs text-gray-600 mb-4">Tap any tool to see its details</p>
        <div className="grid grid-cols-2 gap-3">
          {mcpTools.map((tool, index) => {
            const Icon = tool.icon
            const isSelected = selectedTool?.id === tool.id
            
            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedTool(isSelected ? null : tool)}
                className={`p-3 rounded-xl cursor-pointer transition-all border-2 ${
                  isSelected ? 'bg-purple-50 border-purple-400' : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center mb-2`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h5 className="font-bold text-gray-900 text-xs mb-1">{tool.name}</h5>
                <p className="text-[10px] text-gray-600 leading-tight">{tool.description}</p>
                
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-2 pt-2 border-t border-gray-300"
                  >
                    <p className="text-[10px] text-purple-700 mb-1">Example:</p>
                    <div className="text-[9px] text-gray-700 bg-black/5 rounded p-1 font-mono">
                      {JSON.stringify(tool.example)}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>

      <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4">
        <p className="text-sm text-blue-900 font-semibold mb-1">💡 How It Works</p>
        <p className="text-xs text-blue-800 leading-relaxed">
          The AI analyzes requests, chooses tools, calls them in sequence, and combines results into one plan!
        </p>
      </div>
    </div>
  )

  const renderSlide1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <Zap className="w-14 h-14 mx-auto mb-2 text-purple-500" />
        <h3 className="text-xl font-bold text-gray-900 mb-1">Execute AI Agent</h3>
        <p className="text-gray-700 text-sm">Watch the agent work step-by-step</p>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-900 mb-2">📝 Your Task:</label>
        <textarea
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 text-sm"
          rows="3"
          placeholder="What would you like to plan?"
        />
      </div>

      <button
        onClick={simulateAgentExecution}
        disabled={loading || !taskInput}
        className={`w-full px-8 py-5 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 rounded-2xl font-bold text-white text-lg flex items-center justify-center gap-3 transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {loading ? (
          <><Loader2 className="w-6 h-6 animate-spin" /> Agent Working...</>
        ) : (
          <><Play className="w-6 h-6" /> Start AI Agent</>
        )}
      </button>

      {currentPhase && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-4"
        >
          <div className="flex items-center gap-2 mb-1">
            <Loader2 className="w-5 h-5 text-yellow-600 animate-spin" />
            <p className="text-sm font-bold text-yellow-900">
              {currentPhase === 'planning' && '🧠 Planning Phase'}
              {currentPhase === 'executing' && '⚡ Execution Phase'}
              {currentPhase === 'synthesizing' && '✨ Synthesis Phase'}
            </p>
          </div>
          <p className="text-xs text-yellow-800">
            {currentPhase === 'planning' && 'Analyzing your request...'}
            {currentPhase === 'executing' && 'Calling MCP tools...'}
            {currentPhase === 'synthesizing' && 'Creating final plan...'}
          </p>
        </motion.div>
      )}

      {executionLog.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
            <Code className="w-4 h-4 text-green-600" />
            Execution Steps ({executionLog.length})
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {executionLog.map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-300 rounded-lg p-2"
              >
                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center font-bold text-[10px] text-white">
                    {log.step}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold text-purple-700">{log.agent}</p>
                    <p className="text-[9px] text-gray-700 line-clamp-1">▸ {log.action}</p>
                    {log.result && (
                      <div className="mt-1 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-green-600 flex-shrink-0" />
                        <p className="text-[9px] text-green-700 font-semibold line-clamp-1">
                          {typeof log.result === 'object' ? JSON.stringify(log.result).substring(0, 50) + '...' : log.result}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {executionResult && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-400 rounded-2xl p-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
            <p className="font-bold text-green-900 text-sm">✨ Agent Execution Complete!</p>
          </div>
          
          <div className="bg-white rounded-xl p-3 mb-3">
            <p className="text-xs text-gray-700 mb-2 font-semibold">🛠️ MCP Tools Used:</p>
            <div className="flex flex-wrap gap-2">
              {executionResult.toolsUsed.map((tool, idx) => (
                <span key={idx} className="px-2 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-purple-800 text-[10px] rounded-full font-bold border border-purple-300">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-3">
            <p className="text-xs text-gray-700 mb-1"><span className="font-bold">Total Steps:</span> {executionLog.length}</p>
            <p className="text-xs text-gray-700 mb-1"><span className="font-bold">Tools Called:</span> {executionResult.toolsUsed.length}</p>
            <p className="text-xs text-gray-700"><span className="font-bold">Budget:</span> {executionResult.budget.total}</p>
          </div>

          <div className="mt-3 text-center">
            <p className="text-xs text-green-800 font-semibold">👉 Click Next to see the full travel plan!</p>
          </div>
        </motion.div>
      )}
    </div>
  )

  const renderSlide2 = () => {
    if (!executionResult) {
      return (
        <div className="text-center py-12">
          <Eye className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 text-lg font-semibold mb-2">No Plan Yet</p>
          <p className="text-gray-500 text-sm">Go back and run the agent!</p>
        </div>
      )
    }

    return (
      <div className="space-y-5">
        <div className="text-center mb-4">
          <CheckCircle2 className="w-14 h-14 mx-auto mb-2 text-green-600" />
          <h3 className="text-xl font-bold text-gray-900 mb-1">Plan Complete! 🎉</h3>
          <p className="text-gray-700 text-sm">{executionResult.title}</p>
        </div>

        <div className="bg-blue-50 border-2 border-blue-300 rounded-2xl p-4">
          <h4 className="font-bold text-blue-900 mb-2 text-sm">💰 Budget Breakdown</h4>
          <p className="text-sm text-blue-800 mb-2 font-semibold">{executionResult.budget.total}</p>
          <div className="space-y-1">
            {Object.entries(executionResult.budget.breakdown).map(([key, value]) => (
              <div key={key} className="flex justify-between text-xs text-blue-800">
                <span className="capitalize">{key}:</span>
                <span className="font-semibold">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-purple-50 border-2 border-purple-300 rounded-2xl p-4">
          <h4 className="font-bold text-purple-900 mb-2 text-sm">📅 5-Day Itinerary</h4>
          <div className="space-y-2">
            {executionResult.itinerary.map((day) => (
              <div key={day.day} className="text-xs text-purple-800">
                <span className="font-bold">Day {day.day}:</span> {day.activities}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-orange-50 border-2 border-orange-300 rounded-2xl p-4">
          <h4 className="font-bold text-orange-900 mb-2 text-sm">🏨 Accommodation</h4>
          {executionResult.hotels.map((hotel, idx) => (
            <p key={idx} className="text-xs text-orange-800">{hotel}</p>
          ))}
        </div>

        <div className="bg-green-50 border-2 border-green-300 rounded-2xl p-4">
          <h4 className="font-bold text-green-900 mb-2 text-sm">🌤️ Weather Info</h4>
          <p className="text-xs text-green-800">{executionResult.weather}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-[10px] text-gray-600">MCP Tools Used:</span>
          {executionResult.toolsUsed.map((tool, idx) => (
            <span key={idx} className="px-2 py-1 bg-indigo-100 text-indigo-800 text-[10px] rounded-full font-semibold">
              {tool}
            </span>
          ))}
        </div>
      </div>
    )
  }

  const renderContent = () => {
    switch (currentSlide) {
      case 0: return renderSlide0()
      case 1: return renderSlide1()
      case 2: return renderSlide2()
      default: return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-orange-600 to-red-600 px-4 py-4 shadow-xl">
        <div className="flex items-center justify-between">
          <button onClick={() => setActiveTab('journey')} className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg active:scale-95 transition-transform">
            <Home className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1 mx-3">
            <h1 className="text-base font-bold text-white">MCP Agents</h1>
            <p className="text-xs text-orange-100">Step {currentSlide + 1} of {totalSlides}</p>
          </div>
          <div className={`w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg`}>
            <currentSlideData.icon className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="mt-3 w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
          <motion.div className="h-full bg-white rounded-full" initial={{ width: 0 }} animate={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }} transition={{ duration: 0.3 }} />
        </div>
      </div>

      <div className="hidden md:block max-w-6xl mx-auto pt-8 mb-8">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setActiveTab('journey')} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl font-semibold text-white flex items-center gap-2 transition-all">
            <Home className="w-5 h-5" />Back to Journey
          </button>
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2 text-center">MCP Agents Demo</h1>
        <p className="text-orange-200 text-center text-lg">Model Context Protocol in Action</p>
      </div>

      <div className="md:max-w-6xl md:mx-auto">
        <div className="md:hidden pt-24 pb-24 px-0">
          <AnimatePresence mode="wait">
            <motion.div key={currentSlide} initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ duration: 0.25 }} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} className="bg-white min-h-[calc(100vh-12rem)] rounded-t-[2rem] shadow-2xl">
              <div className={`bg-gradient-to-r ${currentSlideData.color} px-5 py-6 rounded-t-[2rem]`}>
                <h2 className="text-2xl font-bold text-white mb-1">{currentSlideData.title}</h2>
                <p className="text-white/90 text-sm">{currentSlideData.subtitle}</p>
              </div>
              <div className="px-5 py-6 bg-white text-gray-900 overflow-y-auto max-h-[calc(100vh-20rem)]">{renderContent()}</div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="hidden md:block px-4 pb-8">
          <AnimatePresence mode="wait">
            <motion.div key={currentSlide} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="glass-card p-10 max-w-5xl mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currentSlideData.color} flex items-center justify-center`}>
                  <currentSlideData.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-1">{currentSlideData.title}</h2>
                  <p className="text-gray-300">{currentSlideData.subtitle}</p>
                </div>
              </div>
              <div className="text-gray-100">{renderContent()}</div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-slate-900 via-slate-900/95 to-transparent px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <button onClick={prevSlide} disabled={currentSlide === 0} className="px-5 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold text-white flex items-center gap-2 transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95">
            <ChevronLeft className="w-5 h-5" />Back
          </button>
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button key={index} onClick={() => goToSlide(index)} className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentSlide ? 'bg-white w-8' : 'bg-white/40'}`} />
            ))}
          </div>
          <button onClick={nextSlide} className="px-5 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold text-white flex items-center gap-2 transition-all active:scale-95">
            {currentSlide === totalSlides - 1 ? 'Complete' : 'Next'}<ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="hidden md:flex justify-center gap-6 py-8">
        <button onClick={prevSlide} disabled={currentSlide === 0} className="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-xl font-semibold text-white flex items-center gap-2 transition-all disabled:opacity-30 disabled:cursor-not-allowed">
          <ChevronLeft className="w-5 h-5" />Previous
        </button>
        <div className="flex items-center gap-3">
          {slides.map((slide, index) => (
            <button key={index} onClick={() => goToSlide(index)} className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white w-12' : 'bg-white/40'}`} />
          ))}
        </div>
        <button onClick={nextSlide} className="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-xl font-semibold text-white flex items-center gap-2 transition-all">
          {currentSlide === totalSlides - 1 ? 'Complete Journey' : 'Next'}<ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Floating Home Button */}
      <button
        onClick={() => setActiveTab('journey')}
        className="md:hidden fixed bottom-24 left-6 z-50 w-14 h-14 bg-gradient-to-br from-orange-600 to-red-600 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
        aria-label="Back to Journey"
      >
        <Home className="w-6 h-6 text-white" />
      </button>
    </div>
  )
}
