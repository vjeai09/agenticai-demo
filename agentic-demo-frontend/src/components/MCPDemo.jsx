import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Wrench, Play, CheckCircle2, Loader2, Eye, Zap, Database, Code, Calendar, MapPin, Plane, Building } from 'lucide-react'

export default function MCPDemo() {
  const [selectedTool, setSelectedTool] = useState(null)
  const [loading, setLoading] = useState(false)
  const [executionResult, setExecutionResult] = useState(null)
  const [taskInput, setTaskInput] = useState("Plan a 5-day Tokyo family trip in December with $2000 budget")
  const [executionLog, setExecutionLog] = useState([])
  const [activeTools, setActiveTools] = useState([]) // Track which tools are being used
  const [currentPhase, setCurrentPhase] = useState('') // 'planning', 'executing', 'synthesizing'

  // Available MCP Tools for Tokyo Travel Agent
  const mcpTools = [
    {
      id: 'weather_tool',
      name: 'Weather API',
      icon: MapPin,
      color: 'from-blue-500 to-cyan-500',
      description: 'Get weather forecasts and climate data',
      schema: {
        parameters: ['city', 'month'],
        returns: 'temperature, conditions, recommendations'
      },
      example: { city: 'Tokyo', month: 'December' }
    },
    {
      id: 'currency_tool',
      name: 'Currency Converter',
      icon: Database,
      color: 'from-green-500 to-emerald-500',
      description: 'Convert currencies and get exchange rates',
      schema: {
        parameters: ['from_currency', 'to_currency', 'amount'],
        returns: 'converted_amount, exchange_rate'
      },
      example: { from: 'USD', to: 'JPY', amount: 2000 }
    },
    {
      id: 'hotel_search',
      name: 'Hotel Search',
      icon: Building,
      color: 'from-purple-500 to-pink-500',
      description: 'Search for hotels and accommodations',
      schema: {
        parameters: ['city', 'checkin', 'checkout', 'guests'],
        returns: 'hotels_list, prices, availability'
      },
      example: { city: 'Tokyo', guests: 4, nights: 5 }
    },
    {
      id: 'flight_search',
      name: 'Flight Search',
      icon: Plane,
      color: 'from-orange-500 to-red-500',
      description: 'Find flights and compare prices',
      schema: {
        parameters: ['from', 'to', 'date', 'passengers'],
        returns: 'flights, prices, airlines'
      },
      example: { from: 'LAX', to: 'NRT', passengers: 4 }
    },
    {
      id: 'activity_search',
      name: 'Activity Finder',
      icon: Calendar,
      color: 'from-yellow-500 to-orange-500',
      description: 'Discover activities and attractions',
      schema: {
        parameters: ['city', 'category', 'age_group'],
        returns: 'activities, prices, schedules'
      },
      example: { city: 'Tokyo', category: 'family', ages: '6-9' }
    },
    {
      id: 'rag_query',
      name: 'Knowledge Base',
      icon: Code,
      color: 'from-indigo-500 to-purple-500',
      description: 'Query travel knowledge database (RAG)',
      schema: {
        parameters: ['query', 'context'],
        returns: 'relevant_info, sources'
      },
      example: { query: 'Tokyo family activities' }
    }
  ]

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
        thought: 'Breaking down the task: Need weather, budget conversion, hotels, activities',
        action: 'Analyzing user request and identifying which tools to use',
        toolsNeeded: ['weather_tool', 'currency_tool', 'hotel_search', 'rag_query'],
        explanation: 'The AI first thinks about what information it needs to complete your request'
      },
      {
        step: 2,
        agent: 'Execution Agent',
        thought: 'Calling Weather API to check December conditions in Tokyo',
        action: 'MCP Tool Call: weather_tool',
        toolUsed: 'weather_tool',
        explanation: 'The agent uses the Weather API tool to get real-time climate data',
        result: {
          temperature: '8-12°C',
          conditions: 'Cold & dry',
          recommendation: 'Pack warm layers, jackets'
        }
      },
      {
        step: 3,
        agent: 'Execution Agent',
        thought: 'Converting $2000 USD to JPY for budget planning',
        action: 'MCP Tool Call: currency_tool',
        toolUsed: 'currency_tool',
        explanation: 'The Currency Converter tool calculates the budget in Japanese Yen',
        result: {
          amount: '¥299,000',
          rate: '149.5 JPY/USD',
          breakdown: 'Hotels: ¥100k, Food: ¥60k, Activities: ¥80k, Misc: ¥59k'
        }
      },
      {
        step: 4,
        agent: 'Execution Agent',
        thought: 'Searching for family-friendly activities using RAG knowledge base',
        action: 'MCP Tool Call: rag_query',
        toolUsed: 'rag_query',
        explanation: 'The Knowledge Base tool searches travel documents for relevant information',
        result: {
          activities: ['Tokyo Disneyland', 'teamLab Borderless', 'Ueno Zoo'],
          costs: '¥15,000-20,000 per day',
          familyFriendly: true
        }
      },
      {
        step: 5,
        agent: 'Execution Agent',
        thought: 'Finding hotels suitable for family of 4',
        action: 'MCP Tool Call: hotel_search',
        toolUsed: 'hotel_search',
        explanation: 'The Hotel Search tool finds accommodations that match your requirements',
        result: {
          hotels: ['Tokyo Bay Hotel', 'Shinjuku Family Inn', 'Odaiba Grand Hotel'],
          avgPrice: '¥18,000/night',
          totalCost: '¥90,000 (5 nights)'
        }
      },
      {
        step: 6,
        agent: 'Synthesis Agent',
        thought: 'Compiling all tool results into comprehensive travel plan',
        action: 'Generating final itinerary',
        explanation: 'The AI combines all the information into one complete travel plan',
        result: {
          status: 'Complete',
          toolsCalled: 4,
          confidenceScore: '95%'
        }
      }
    ]

    for (let i = 0; i < steps.length; i++) {
      // Update phase
      if (steps[i].step === 1) setCurrentPhase('planning')
      else if (steps[i].step === 6) setCurrentPhase('synthesizing')
      else setCurrentPhase('executing')
      
      // Highlight active tool
      if (steps[i].toolUsed) {
        setActiveTools([steps[i].toolUsed])
      } else {
        setActiveTools([])
      }
      
      await new Promise(resolve => setTimeout(resolve, 2000)) // Slower for better comprehension
      setExecutionLog(prev => [...prev, steps[i]])
    }
    
    setActiveTools([])
    setCurrentPhase('')

    // Final result
    const finalPlan = {
      title: 'Tokyo Family Trip - 5 Days',
      budget: {
        total: '¥299,000 ($2000 USD)',
        breakdown: {
          accommodation: '¥90,000 (5 nights at family hotel)',
          activities: '¥80,000 (Disneyland, museums, zoo)',
          food: '¥60,000 (Mix of restaurants & convenience)',
          transportation: '¥30,000 (JR Pass & local trains)',
          miscellaneous: '¥39,000 (Shopping, emergencies)'
        }
      },
      weather: '8-12°C, pack warm clothes',
      itinerary: [
        { day: 1, activities: 'Arrival, Shibuya & Harajuku exploration' },
        { day: 2, activities: 'Tokyo Disneyland (full day)' },
        { day: 3, activities: 'Ueno Zoo, Asakusa Temple, teamLab Borderless' },
        { day: 4, activities: 'Odaiba (Miraikan Museum, shopping)' },
        { day: 5, activities: 'Last minute shopping, Departure' }
      ],
      hotels: ['Tokyo Bay Hotel (¥18,000/night)', 'Near JR station', '2 connecting rooms'],
      toolsUsed: ['Weather API', 'Currency Converter', 'RAG Query', 'Hotel Search']
    }

    setExecutionResult(finalPlan)
    setLoading(false)
  }

  const renderExecutionLog = () => {
    if (executionLog.length === 0) return null

    return (
      <div className="space-y-3">
        {executionLog.map((log, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-5 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 
                            flex items-center justify-center font-bold text-base shadow-lg">
                {log.step}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-blue-400 text-base">{log.agent}</span>
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                </div>
                
                {log.explanation && (
                  <div className="mb-3 p-3 bg-blue-500/10 border-l-4 border-blue-500 rounded">
                    <p className="text-sm text-blue-300">💡 <strong>What's happening:</strong> {log.explanation}</p>
                  </div>
                )}
                
                {log.thought && (
                  <p className="text-sm text-gray-300 mb-2 italic">💭 "{log.thought}"</p>
                )}
                
                <p className="text-sm text-purple-300 font-semibold mb-3">▸ {log.action}</p>
                
                {log.result && (
                  <div className="mt-3 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <p className="text-xs text-green-400 font-semibold mb-2">✓ Response from tool:</p>
                    <pre className="text-green-400 text-xs whitespace-pre-wrap font-mono">
                      {JSON.stringify(log.result, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  const renderFinalResult = () => {
    if (!executionResult) return null

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-6 border-2 border-green-500/30"
      >
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 className="w-6 h-6 text-green-400" />
          <h3 className="text-xl font-bold text-green-400">Plan Generated Successfully! 🎉</h3>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-lg mb-2">{executionResult.title}</h4>
            <p className="text-gray-400 text-sm">Weather: {executionResult.weather}</p>
          </div>

          <div className="p-4 bg-blue-500/10 rounded-lg">
            <h5 className="font-semibold text-blue-400 mb-2">Budget Breakdown</h5>
            <p className="text-sm text-gray-300 mb-2">Total: {executionResult.budget.total}</p>
            <div className="space-y-1 text-xs">
              {Object.entries(executionResult.budget.breakdown).map(([key, value]) => (
                <div key={key} className="flex justify-between text-gray-400">
                  <span className="capitalize">{key}:</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-purple-500/10 rounded-lg">
            <h5 className="font-semibold text-purple-400 mb-2">5-Day Itinerary</h5>
            <div className="space-y-2">
              {executionResult.itinerary.map((day) => (
                <div key={day.day} className="text-xs text-gray-400">
                  <span className="text-purple-300 font-semibold">Day {day.day}:</span> {day.activities}
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-orange-500/10 rounded-lg">
            <h5 className="font-semibold text-orange-400 mb-2">Accommodation</h5>
            {executionResult.hotels.map((hotel, idx) => (
              <p key={idx} className="text-xs text-gray-400">{hotel}</p>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-gray-500">MCP Tools Used:</span>
            {executionResult.toolsUsed.map((tool, idx) => (
              <span key={idx} className="px-2 py-1 bg-indigo-500/20 text-indigo-300 text-xs rounded">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 text-center"
      >
        <Sparkles className="w-16 h-16 mx-auto mb-4 text-orange-400" />
        <h2 className="text-3xl font-bold mb-3 gradient-text">Model Context Protocol (MCP)</h2>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-4">
          Experience how <strong className="text-orange-400">MCP</strong> enables AI agents to use 
          powerful tools and take real-world actions. Watch as multiple tools work together to 
          plan your perfect Tokyo trip!
        </p>
        <div className="inline-block px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-lg">
          <p className="text-sm text-orange-300">
            <Wrench className="w-4 h-4 inline mr-1" />
            Use Case: AI Agent with 6 MCP Tools for Travel Planning
          </p>
        </div>
      </motion.div>

      {/* Available MCP Tools */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-8"
      >
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Wrench className="w-6 h-6 text-blue-400" />
          Available MCP Tools
        </h3>
        <p className="text-gray-400 text-sm mb-6">
          These are the tools the AI agent can choose from. Click on any tool to see its schema.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mcpTools.map((tool, index) => {
            const Icon = tool.icon
            const isSelected = selectedTool?.id === tool.id
            const isActive = activeTools.includes(tool.id)
            
            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ 
                  opacity: 1, 
                  scale: isActive ? 1.05 : 1,
                  boxShadow: isActive ? '0 0 20px rgba(168, 85, 247, 0.6)' : '0 0 0 rgba(0,0,0,0)'
                }}
                transition={{ delay: 0.3 + index * 0.05 }}
                onClick={() => setSelectedTool(isSelected ? null : tool)}
                className={`p-4 rounded-xl cursor-pointer transition-all border-2 relative
                          ${isActive 
                            ? 'bg-purple-500/20 border-purple-400 ring-2 ring-purple-500' 
                            : isSelected 
                            ? 'bg-white/10 border-purple-500' 
                            : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
              >
                {isActive && (
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
                    IN USE
                  </div>
                )}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} 
                              flex items-center justify-center mb-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-white mb-1 text-sm">{tool.name}</h4>
                <p className="text-xs text-gray-400">{tool.description}</p>
                
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3 pt-3 border-t border-white/10"
                  >
                    <p className="text-xs text-purple-300 mb-2">Schema:</p>
                    <div className="text-xs text-gray-500 space-y-1">
                      <div>📥 Params: {tool.schema.parameters.join(', ')}</div>
                      <div>📤 Returns: {tool.schema.returns}</div>
                    </div>
                    <div className="mt-2 p-2 bg-black/30 rounded text-xs text-green-400">
                      Example: {JSON.stringify(tool.example)}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Current Phase Indicator */}
      {currentPhase && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 border-2 border-yellow-500/50"
        >
          <div className="flex items-center justify-center gap-3">
            <Loader2 className="w-6 h-6 text-yellow-400 animate-spin" />
            <div>
              <p className="text-lg font-bold text-yellow-400">
                {currentPhase === 'planning' && '🧠 Planning Phase: Analyzing your request...'}
                {currentPhase === 'executing' && '⚡ Execution Phase: Calling MCP tools...'}
                {currentPhase === 'synthesizing' && '✨ Synthesis Phase: Combining results...'}
              </p>
              <p className="text-sm text-gray-400">
                {currentPhase === 'planning' && 'The AI is figuring out which tools it needs to use'}
                {currentPhase === 'executing' && 'The AI is using external tools to gather information'}
                {currentPhase === 'synthesizing' && 'The AI is creating your final travel plan'}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Task Input & Execution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-8"
      >
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Zap className="w-6 h-6 text-yellow-400" />
          Try It Yourself: Watch the Agent Work
        </h3>
        
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            📝 Your Travel Planning Task:
          </label>
          <p className="text-xs text-gray-500 mb-3">
            Type what you want to plan, and watch the AI break it down and use different tools to help you!
          </p>
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-orange-500 text-base"
            placeholder="Example: Plan a 5-day Tokyo family trip in December with $2000 budget"
          />
        </div>

        <button
          onClick={simulateAgentExecution}
          disabled={loading || !taskInput}
          className="px-10 py-5 bg-gradient-to-r from-orange-500 to-red-600 
                   hover:from-orange-600 hover:to-red-700 rounded-xl font-bold text-xl
                   disabled:opacity-50 disabled:cursor-not-allowed
                   flex items-center gap-3 mx-auto transition-all shadow-xl
                   hover:shadow-2xl hover:scale-105"
        >
          {loading ? (
            <><Loader2 className="w-6 h-6 animate-spin" /> AI Agent is Working...</>
          ) : (
            <><Play className="w-6 h-6" /> 🚀 Start AI Agent</>
          )}
        </button>
        
        {!loading && executionLog.length === 0 && (
          <p className="text-center text-sm text-gray-400 mt-4">
            👆 Click the button above to watch the AI agent use MCP tools step-by-step!
          </p>
        )}

        {/* Execution Log */}
        {executionLog.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-10"
          >
            <div className="mb-6 p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-500/30">
              <h4 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Code className="w-6 h-6 text-green-400" />
                📊 Step-by-Step Execution Log
              </h4>
              <p className="text-sm text-gray-300">
                Watch how the AI agent thinks, chooses tools, and builds your travel plan piece by piece!
              </p>
            </div>
            {renderExecutionLog()}
          </motion.div>
        )}

        {/* Final Result */}
        {executionResult && (
          <div className="mt-8">
            {renderFinalResult()}
          </div>
        )}
      </motion.div>

      {/* MCP Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card p-8"
      >
        <h3 className="text-2xl font-bold mb-6 text-center">🎓 Why is MCP Important for Students?</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/30">
            <h4 className="font-bold text-white mb-3 text-lg flex items-center gap-2">
              <span className="text-2xl">🔧</span> Real-World Actions
            </h4>
            <p className="text-sm text-gray-300 leading-relaxed">
              Instead of just <strong>chatting</strong>, AI can now <strong>DO THINGS</strong> - like checking weather, 
              booking hotels, or searching databases. It's like giving the AI hands to work with!
            </p>
          </div>
          <div className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/30">
            <h4 className="font-bold text-white mb-3 text-lg flex items-center gap-2">
              <span className="text-2xl">🧠</span> Smart Decisions
            </h4>
            <p className="text-sm text-gray-300 leading-relaxed">
              The AI <strong>thinks about which tools to use</strong>. Just like you choose a calculator for math 
              or Google Maps for directions, AI picks the right tool for each task automatically!
            </p>
          </div>
          <div className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/30">
            <h4 className="font-bold text-white mb-3 text-lg flex items-center gap-2">
              <span className="text-2xl">🔄</span> Step-by-Step Work
            </h4>
            <p className="text-sm text-gray-300 leading-relaxed">
              Watch how AI breaks big problems into <strong>small steps</strong>. First weather, then budget, 
              then hotels - just like how you'd plan a trip yourself, but faster!
            </p>
          </div>
          <div className="p-6 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl border border-orange-500/30">
            <h4 className="font-bold text-white mb-3 text-lg flex items-center gap-2">
              <span className="text-2xl">✨</span> Combining Information
            </h4>
            <p className="text-sm text-gray-300 leading-relaxed">
              The AI <strong>combines results from different tools</strong> into one perfect answer. 
              It's like doing group work where everyone contributes their part!
            </p>
          </div>
        </div>
      </motion.div>

      {/* How MCP Works - Simplified */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="glass-card p-8 bg-gradient-to-br from-indigo-500/5 to-purple-500/5"
      >
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 justify-center">
          <Wrench className="w-7 h-7 text-blue-400" />
          How MCP Works (Simple Explanation)
        </h3>
        <div className="space-y-4 max-w-3xl mx-auto">
          <div className="flex gap-4 items-start p-4 bg-blue-500/10 rounded-lg border-l-4 border-blue-500">
            <span className="text-3xl">1️⃣</span>
            <div>
              <p className="font-bold text-blue-400 mb-1">You Give the AI a Goal</p>
              <p className="text-sm text-gray-300">"Plan a Tokyo trip" - You tell the AI what you want</p>
            </div>
          </div>
          
          <div className="flex gap-4 items-start p-4 bg-green-500/10 rounded-lg border-l-4 border-green-500">
            <span className="text-3xl">2️⃣</span>
            <div>
              <p className="font-bold text-green-400 mb-1">AI Makes a Plan</p>
              <p className="text-sm text-gray-300">The Planning Agent thinks: "I need weather info, budget calculation, and hotel data"</p>
            </div>
          </div>
          
          <div className="flex gap-4 items-start p-4 bg-orange-500/10 rounded-lg border-l-4 border-orange-500">
            <span className="text-3xl">3️⃣</span>
            <div>
              <p className="font-bold text-orange-400 mb-1">AI Uses Tools One-by-One</p>
              <p className="text-sm text-gray-300">First weather API, then currency converter, then hotel search - each tool does one specific job</p>
            </div>
          </div>
          
          <div className="flex gap-4 items-start p-4 bg-yellow-500/10 rounded-lg border-l-4 border-yellow-500">
            <span className="text-3xl">4️⃣</span>
            <div>
              <p className="font-bold text-yellow-400 mb-1">Each Tool Returns Information</p>
              <p className="text-sm text-gray-300">Weather tool says "8-12°C", currency tool says "¥299,000", etc.</p>
            </div>
          </div>
          
          <div className="flex gap-4 items-start p-4 bg-purple-500/10 rounded-lg border-l-4 border-purple-500">
            <span className="text-3xl">5️⃣</span>
            <div>
              <p className="font-bold text-purple-400 mb-1">AI Puts Everything Together</p>
              <p className="text-sm text-gray-300">The Synthesis Agent combines weather + budget + hotels into one complete travel plan</p>
            </div>
          </div>
          
          <div className="flex gap-4 items-start p-4 bg-pink-500/10 rounded-lg border-l-4 border-pink-500">
            <span className="text-3xl">6️⃣</span>
            <div>
              <p className="font-bold text-pink-400 mb-1">You Get Your Answer!</p>
              <p className="text-sm text-gray-300">A complete 5-day itinerary with budget, activities, and recommendations ✨</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg border border-green-500/30 text-center">
          <p className="text-base text-white font-semibold">
            💡 <strong>Key Idea:</strong> MCP lets AI use tools like you use apps on your phone - 
            each tool has a specific purpose, and AI knows when to use which one!
          </p>
        </div>
      </motion.div>
    </div>
  )
}
