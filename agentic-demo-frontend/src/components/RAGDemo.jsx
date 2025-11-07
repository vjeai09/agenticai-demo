import { useState } from 'react'
import { motion } from 'framer-motion'
import { Database, Brain, Play, CheckCircle2, Loader2, Eye, Sparkles, Zap } from 'lucide-react'

export default function RAGDemo() {
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [stepResults, setStepResults] = useState({})
  const [query, setQuery] = useState("What are family-friendly activities in Tokyo with kids?")
  
  // Tokyo Travel Knowledge Base
  const knowledgeBase = [
    {
      id: 1,
      title: "Tokyo Family Activities",
      content: "Tokyo offers many family-friendly activities. Tokyo Disneyland and DisneySea are top attractions. teamLab Borderless digital art museum is perfect for kids. Ueno Zoo houses pandas and is very affordable. Odaiba has interactive museums like Miraikan."
    },
    {
      id: 2,
      title: "Tokyo December Weather",
      content: "December in Tokyo is cold with temperatures ranging from 4°C to 12°C. It's mostly dry with occasional rain. Pack warm layers, jackets, and comfortable walking shoes. Snow is rare but possible."
    },
    {
      id: 3,
      title: "Tokyo Budget Planning",
      content: "A budget of $2000 USD can cover a week-long Tokyo trip for one person. Accommodation: $500-700 (mid-range hotel). Food: $300-400. Transportation: $100 (JR Pass). Activities: $400-500. Shopping & misc: $300-400."
    },
    {
      id: 4,
      title: "Tokyo Transportation",
      content: "Tokyo has excellent public transportation. JR Pass offers unlimited JR train travel. Suica/Pasmo cards work on all trains, buses, and even vending machines. Trains run from 5am to midnight. Taxis are expensive but readily available."
    },
    {
      id: 5,
      title: "Tokyo Dining Recommendations",
      content: "Tokyo is a food paradise. Try ramen in Shibuya, sushi at Tsukiji Outer Market, tempura in Asakusa, and yakitori in Shinjuku. Convenience stores like 7-Eleven have surprisingly good food. Many restaurants have English menus or picture menus."
    }
  ]
  
  const steps = [
    {
      id: 0,
      title: "📚 Knowledge Base",
      description: "View the documents in our Tokyo Travel knowledge base",
      action: "View Documents",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 1,
      title: "🔍 Embedding Generation",
      description: "Convert documents into vector embeddings for semantic search",
      action: "Generate Embeddings",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 2,
      title: "💾 Vector Storage",
      description: "Store embeddings in a vector database",
      action: "Store in Database",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 3,
      title: "❓ User Query",
      description: "Enter your question about Tokyo travel",
      action: "Process Query",
      color: "from-orange-500 to-red-500"
    },
    {
      id: 4,
      title: "🎯 Semantic Search",
      description: "Find most relevant documents using similarity search",
      action: "Search Documents",
      color: "from-yellow-500 to-orange-500"
    },
    {
      id: 5,
      title: "🤖 Generate Response",
      description: "Use LLM with retrieved context to answer the question",
      action: "Generate Answer",
      color: "from-indigo-500 to-purple-500"
    }
  ]

  const executeStep = async (stepId) => {
    setLoading(true)
    
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    let result = {}
    
    switch(stepId) {
      case 0:
        result = {
          type: 'documents',
          data: knowledgeBase,
          message: `✓ Loaded ${knowledgeBase.length} documents from Tokyo Travel knowledge base`
        }
        break
        
      case 1:
        result = {
          type: 'embeddings',
          data: knowledgeBase.map(doc => ({
            id: doc.id,
            title: doc.title,
            embedding: `[${Array(5).fill(0).map(() => Math.random().toFixed(3)).join(', ')}...]`,
            dimensions: 1536
          })),
          message: `✓ Generated ${knowledgeBase.length} embeddings using text-embedding-3-small (1536 dimensions)`
        }
        break
        
      case 2:
        result = {
          type: 'storage',
          data: {
            database: 'ChromaDB',
            collection: 'tokyo_travel_docs',
            stored: knowledgeBase.length,
            indexType: 'HNSW',
            status: 'indexed'
          },
          message: `✓ Stored ${knowledgeBase.length} vectors in ChromaDB with HNSW indexing`
        }
        break
        
      case 3:
        result = {
          type: 'query',
          data: {
            original: query,
            embedding: `[${Array(5).fill(0).map(() => Math.random().toFixed(3)).join(', ')}...]`,
            dimensions: 1536
          },
          message: '✓ Query converted to embedding vector'
        }
        break
        
      case 4:
        const relevantDocs = [
          { ...knowledgeBase[0], similarity: 0.92 },
          { ...knowledgeBase[4], similarity: 0.78 },
          { ...knowledgeBase[2], similarity: 0.65 }
        ]
        result = {
          type: 'search',
          data: relevantDocs,
          message: `✓ Found ${relevantDocs.length} relevant documents (similarity > 0.6)`
        }
        break
        
      case 5:
        result = {
          type: 'response',
          data: {
            context: "Tokyo Family Activities, Tokyo Dining Recommendations, Tokyo Budget Planning",
            answer: "Tokyo offers excellent family-friendly activities for kids! Here are the top recommendations:\n\n1. **Theme Parks**: Tokyo Disneyland and DisneySea are must-visit attractions that kids absolutely love.\n\n2. **Interactive Museums**: teamLab Borderless digital art museum provides an immersive, interactive experience perfect for children.\n\n3. **Ueno Zoo**: Home to giant pandas and very affordable - great for a day out with kids.\n\n4. **Odaiba**: Features interactive museums like Miraikan (National Museum of Emerging Science) with hands-on exhibits.\n\n5. **Dining**: Tokyo has many family-friendly restaurants with picture menus. Try ramen in Shibuya or visit the Tsukiji Outer Market for fresh sushi.\n\nWith your $2000 budget, you can comfortably enjoy these activities while staying in a mid-range hotel and using the excellent public transportation system.",
            model: "GPT-4",
            tokens: 256
          },
          message: '✓ Generated context-aware response using retrieved documents'
        }
        break
    }
    
    setStepResults({ ...stepResults, [stepId]: result })
    setLoading(false)
  }

  const renderStepResult = (stepId) => {
    const result = stepResults[stepId]
    if (!result) return null

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg"
      >
        <div className="flex items-start gap-2 mb-3">
          <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
          <p className="text-green-400 font-semibold text-sm">{result.message}</p>
        </div>
        
        {result.type === 'documents' && (
          <div className="space-y-2">
            {result.data.map(doc => (
              <div key={doc.id} className="p-3 bg-slate-900/50 rounded border border-white/5">
                <p className="text-blue-400 font-semibold text-sm mb-1">{doc.title}</p>
                <p className="text-gray-400 text-xs">{doc.content}</p>
              </div>
            ))}
          </div>
        )}
        
        {result.type === 'embeddings' && (
          <div className="space-y-2">
            {result.data.map(emb => (
              <div key={emb.id} className="p-2 bg-slate-900/50 rounded text-xs">
                <span className="text-purple-400 font-semibold">{emb.title}</span>
                <span className="text-gray-500 ml-2">→ {emb.embedding}</span>
                <span className="text-gray-600 ml-2">({emb.dimensions}d)</span>
              </div>
            ))}
          </div>
        )}
        
        {result.type === 'storage' && (
          <div className="p-3 bg-slate-900/50 rounded">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div><span className="text-gray-500">Database:</span> <span className="text-green-400 font-semibold">{result.data.database}</span></div>
              <div><span className="text-gray-500">Collection:</span> <span className="text-green-400 font-semibold">{result.data.collection}</span></div>
              <div><span className="text-gray-500">Vectors:</span> <span className="text-green-400 font-semibold">{result.data.stored}</span></div>
              <div><span className="text-gray-500">Index Type:</span> <span className="text-green-400 font-semibold">{result.data.indexType}</span></div>
            </div>
          </div>
        )}
        
        {result.type === 'query' && (
          <div className="p-3 bg-slate-900/50 rounded">
            <p className="text-sm text-orange-400 mb-2 font-semibold">"{result.data.original}"</p>
            <p className="text-xs text-gray-500">Embedding: {result.data.embedding}</p>
          </div>
        )}
        
        {result.type === 'search' && (
          <div className="space-y-2">
            {result.data.map(doc => (
              <div key={doc.id} className="p-3 bg-slate-900/50 rounded border border-yellow-500/20">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-yellow-400 font-semibold text-sm">{doc.title}</p>
                  <span className="text-xs px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded">
                    {(doc.similarity * 100).toFixed(0)}% match
                  </span>
                </div>
                <p className="text-gray-400 text-xs">{doc.content.substring(0, 150)}...</p>
              </div>
            ))}
          </div>
        )}
        
        {result.type === 'response' && (
          <div className="space-y-3">
            <div className="p-3 bg-slate-900/50 rounded">
              <p className="text-xs text-gray-500 mb-1">Retrieved Context:</p>
              <p className="text-indigo-400 text-sm">{result.data.context}</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded border border-indigo-500/30">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <p className="text-indigo-400 font-semibold text-sm">AI Response ({result.data.model})</p>
              </div>
              <p className="text-gray-300 text-sm whitespace-pre-line">{result.data.answer}</p>
              <p className="text-xs text-gray-600 mt-2">Tokens used: {result.data.tokens}</p>
            </div>
          </div>
        )}
      </motion.div>
    )
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 text-center"
      >
        <Database className="w-16 h-16 mx-auto mb-4 text-purple-400" />
        <h2 className="text-3xl font-bold mb-3 gradient-text">Interactive RAG System Demo</h2>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-4">
          Experience <strong className="text-purple-400">Retrieval-Augmented Generation (RAG)</strong> step-by-step!
          See how AI retrieves relevant information from a Tokyo Travel knowledge base to answer your questions accurately.
        </p>
        <div className="inline-block px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg">
          <p className="text-sm text-purple-300">
            <Zap className="w-4 h-4 inline mr-1" />
            Use Case: Tokyo Travel Planning Assistant
          </p>
        </div>
      </motion.div>

      <div className="space-y-4">
        {steps.map((step, index) => {
          const isActive = currentStep === step.id
          const isCompleted = stepResults[step.id] !== undefined
          const isLocked = step.id > 0 && !stepResults[step.id - 1]
          
          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`glass-card p-6 ${isActive ? 'ring-2 ring-purple-500' : ''} ${isLocked ? 'opacity-50' : ''}`}
            >
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} 
                              flex items-center justify-center font-bold text-lg relative`}>
                  {isCompleted ? (
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  ) : (
                    <span>{step.id + 1}</span>
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">{step.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">{step.description}</p>
                  
                  {step.id === 3 && isActive && (
                    <div className="mb-4">
                      <label className="block text-sm text-gray-400 mb-2">Your Question:</label>
                      <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg 
                                 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                        placeholder="Ask about Tokyo travel..."
                      />
                    </div>
                  )}
                  
                  <button
                    onClick={() => {
                      setCurrentStep(step.id)
                      executeStep(step.id)
                    }}
                    disabled={loading || isLocked}
                    className={`px-6 py-2 bg-gradient-to-r ${step.color} 
                             hover:opacity-90 rounded-lg font-semibold text-sm
                             disabled:opacity-50 disabled:cursor-not-allowed
                             flex items-center gap-2 transition-all`}
                  >
                    {loading && isActive ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
                    ) : isCompleted ? (
                      <><Eye className="w-4 h-4" /> View Again</>
                    ) : (
                      <><Play className="w-4 h-4" /> {step.action}</>
                    )}
                  </button>
                  
                  {renderStepResult(step.id)}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {stepResults[5] && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-6 border-2 border-green-500/30"
        >
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-green-400" />
            RAG Pipeline Complete! 🎉
          </h3>
          <div className="grid md:grid-cols-4 gap-4 text-center">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <p className="text-2xl font-bold text-blue-400">{knowledgeBase.length}</p>
              <p className="text-xs text-gray-400">Documents Indexed</p>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <p className="text-2xl font-bold text-purple-400">1536</p>
              <p className="text-xs text-gray-400">Embedding Dimensions</p>
            </div>
            <div className="p-3 bg-yellow-500/10 rounded-lg">
              <p className="text-2xl font-bold text-yellow-400">3</p>
              <p className="text-xs text-gray-400">Relevant Docs Retrieved</p>
            </div>
            <div className="p-3 bg-green-500/10 rounded-lg">
              <p className="text-2xl font-bold text-green-400">256</p>
              <p className="text-xs text-gray-400">Response Tokens</p>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6"
      >
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
          <Brain className="w-6 h-6 text-blue-400" />
          How RAG Works
        </h3>
        <div className="space-y-2 text-sm text-gray-300">
          <p><strong className="text-blue-400">Step 1-2:</strong> Documents are chunked and converted into vector embeddings that capture semantic meaning</p>
          <p><strong className="text-green-400">Step 3:</strong> Embeddings are stored in a vector database (ChromaDB) for fast similarity search</p>
          <p><strong className="text-orange-400">Step 4:</strong> User query is converted to the same embedding space</p>
          <p><strong className="text-yellow-400">Step 5:</strong> Vector database finds documents with highest similarity scores</p>
          <p><strong className="text-indigo-400">Step 6:</strong> Retrieved context is injected into LLM prompt for accurate, grounded responses</p>
        </div>
      </motion.div>
    </div>
  )
}
