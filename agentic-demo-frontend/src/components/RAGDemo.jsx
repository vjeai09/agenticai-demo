import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Database, Brain, Play, CheckCircle2, Loader2, Eye, Sparkles, Zap, Home, ChevronLeft, ChevronRight } from 'lucide-react'
import ContactBanner from './ContactBanner'

export default function RAGDemo({ setActiveTab }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [loading, setLoading] = useState(false)
  const [stepResults, setStepResults] = useState({})
  const [query, setQuery] = useState("What are family-friendly activities in Tokyo with kids?")
  
  const minSwipeDistance = 50

  // Reset to first slide when component mounts
  useEffect(() => {
    setCurrentSlide(0)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentSlide])

  const knowledgeBase = [
    {
      id: 1,
      title: "Tokyo Family Activities",
      content: "Tokyo offers many family-friendly activities. Tokyo Disneyland and DisneySea are top attractions. teamLab Borderless digital art museum is perfect for kids."
    },
    {
      id: 2,
      title: "Tokyo December Weather",
      content: "December in Tokyo is cold with temperatures ranging from 4°C to 12°C. Pack warm layers and jackets."
    },
    {
      id: 3,
      title: "Tokyo Budget Planning",
      content: "A budget of $2000 USD can cover a week-long Tokyo trip. Accommodation: $500-700. Food: $300-400. Activities: $400-500."
    }
  ]
  
  const slides = [
    { id: 0, step: "knowledge", title: "📚 Knowledge Base", subtitle: "View Documents", icon: Database, color: "from-blue-500 to-cyan-500" },
    { id: 1, step: "embeddings", title: "🔍 Embeddings", subtitle: "Convert to Vectors", icon: Brain, color: "from-purple-500 to-pink-500" },
    { id: 2, step: "storage", title: "💾 Vector Storage", subtitle: "Store in ChromaDB", icon: Database, color: "from-green-500 to-emerald-500" },
    { id: 3, step: "query", title: "❓ User Query", subtitle: "Ask Question", icon: Sparkles, color: "from-orange-500 to-red-500" },
    { id: 4, step: "search", title: "🎯 Semantic Search", subtitle: "Find Relevant Docs", icon: Zap, color: "from-yellow-500 to-orange-500" },
    { id: 5, step: "response", title: "🤖 AI Response", subtitle: "Generate Answer", icon: Brain, color: "from-indigo-500 to-purple-500" }
  ]

  const totalSlides = slides.length
  const currentSlideData = slides[currentSlide]

  const executeStep = async () => {
    const stepId = currentSlideData.step
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    let result = {}
    
    switch(stepId) {
      case 'knowledge':
        result = { type: 'documents', data: knowledgeBase, message: `✓ Loaded ${knowledgeBase.length} documents` }
        break
      case 'embeddings':
        result = { type: 'embeddings', data: knowledgeBase.map(doc => ({ id: doc.id, title: doc.title, embedding: `[${Array(3).fill(0).map(() => Math.random().toFixed(3)).join(', ')}...]` })), message: `✓ Generated embeddings` }
        break
      case 'storage':
        result = { type: 'storage', data: { database: 'ChromaDB', stored: knowledgeBase.length }, message: `✓ Stored in database` }
        break
      case 'query':
        result = { type: 'query', data: { original: query }, message: '✓ Query processed' }
        break
      case 'search':
        result = { 
          type: 'search', 
          data: [{ ...knowledgeBase[0], similarity: 0.92 }], 
          message: `✓ Found relevant docs`,
          queryEmbedding: `[${Array(8).fill(0).map(() => Math.random().toFixed(3)).join(', ')}...]`,
          docEmbeddings: [
            { title: knowledgeBase[0].title, embedding: `[${Array(8).fill(0).map(() => Math.random().toFixed(3)).join(', ')}...]`, similarity: 0.92 },
            { title: knowledgeBase[1].title, embedding: `[${Array(8).fill(0).map(() => Math.random().toFixed(3)).join(', ')}...]`, similarity: 0.67 },
            { title: knowledgeBase[2].title, embedding: `[${Array(8).fill(0).map(() => Math.random().toFixed(3)).join(', ')}...]`, similarity: 0.54 }
          ]
        }
        break
      case 'response':
        result = { type: 'response', data: { answer: "Tokyo offers excellent family-friendly activities! Top recommendations:\n\n1. Tokyo Disneyland and DisneySea\n2. teamLab Borderless digital art museum\n3. Ueno Zoo with pandas\n4. Odaiba interactive museums" }, message: '✓ Generated answer' }
        break
    }
    
    setStepResults({ ...stepResults, [stepId]: result })
    setLoading(false)
  }

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      // After completing RAG Demo, move to MCP Demo
      setActiveTab('mcp')
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

  const renderContent = () => {
    const result = stepResults[currentSlideData.step]
    const buttonClass = `w-full px-6 py-4 bg-gradient-to-r ${currentSlideData.color} hover:opacity-90 rounded-xl font-semibold text-white text-lg flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 disabled:opacity-50`

    return (
      <div className="space-y-6">
        {currentSlideData.step === 'query' && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Your Question:</label>
            <div className="relative">
              <textarea 
                value={query} 
                readOnly
                className="w-full px-4 py-3 bg-gray-100 border-2 border-gray-300 rounded-lg text-gray-900 cursor-not-allowed opacity-75" 
                rows="3" 
              />
              <span className="absolute right-3 bottom-3 text-xs text-gray-500 font-semibold">📍 Demo Query</span>
            </div>
          </div>
        )}

        <button onClick={executeStep} disabled={loading} className={buttonClass}>
          {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</> : result ? <><Eye className="w-5 h-5" /> View Again</> : <><Play className="w-5 h-5" /> Execute</>}
        </button>

        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-green-50 border-2 border-green-300 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <p className="text-green-700 font-semibold text-sm">{result.message}</p>
            </div>
            
            {result.type === 'documents' && result.data.map(doc => (
              <div key={doc.id} className="p-4 bg-white rounded-xl border border-blue-200 mb-3">
                <p className="text-blue-600 font-bold text-sm mb-2">{doc.title}</p>
                <p className="text-gray-700 text-xs">{doc.content}</p>
              </div>
            ))}

            {result.type === 'embeddings' && result.data.map(emb => (
              <div key={emb.id} className="p-3 bg-purple-50 rounded-xl border border-purple-200 mb-2">
                <p className="text-purple-700 font-bold text-xs mb-1">{emb.title}</p>
                <p className="text-gray-600 text-xs font-mono">{emb.embedding}</p>
              </div>
            ))}

            {result.type === 'storage' && (
              <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div><span className="text-gray-600">Database:</span> <span className="text-green-700 font-bold">{result.data.database}</span></div>
                  <div><span className="text-gray-600">Stored:</span> <span className="text-green-700 font-bold">{result.data.stored} vectors</span></div>
                </div>
              </div>
            )}

            {result.type === 'query' && (
              <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                <p className="text-orange-800 font-semibold text-sm mb-1">"{result.data.original}"</p>
                <p className="text-gray-600 text-xs">Query converted to embedding for semantic search</p>
              </div>
            )}

            {result.type === 'search' && (
              <>
                {/* Query Embedding */}
                <div className="mb-4 p-3 bg-orange-50 rounded-xl border-2 border-orange-300">
                  <p className="text-orange-900 font-bold text-xs mb-2">🔍 Query Vector:</p>
                  <p className="text-gray-700 text-[10px] font-mono break-all">{result.queryEmbedding}</p>
                </div>

                {/* Document Embeddings with Similarity */}
                <div className="mb-4 space-y-2">
                  <p className="text-gray-900 font-bold text-xs mb-2">📊 Semantic Similarity Scores:</p>
                  {result.docEmbeddings.map((doc, idx) => (
                    <div key={idx} className={`p-3 rounded-xl border-2 ${
                      doc.similarity > 0.8 ? 'bg-green-50 border-green-300' : 
                      doc.similarity > 0.6 ? 'bg-yellow-50 border-yellow-300' : 
                      'bg-gray-50 border-gray-300'
                    }`}>
                      <div className="flex justify-between items-center mb-2">
                        <p className={`font-bold text-xs ${
                          doc.similarity > 0.8 ? 'text-green-900' : 
                          doc.similarity > 0.6 ? 'text-yellow-900' : 
                          'text-gray-700'
                        }`}>{doc.title}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                          doc.similarity > 0.8 ? 'bg-green-200 text-green-900' : 
                          doc.similarity > 0.6 ? 'bg-yellow-200 text-yellow-900' : 
                          'bg-gray-200 text-gray-700'
                        }`}>
                          {(doc.similarity * 100).toFixed(0)}%
                        </span>
                      </div>
                      <p className="text-gray-600 text-[9px] font-mono break-all">{doc.embedding}</p>
                    </div>
                  ))}
                </div>

                {/* Best Match Document */}
                <div className="p-4 bg-gradient-to-br from-yellow-50 to-green-50 rounded-xl border-2 border-yellow-300">
                  <p className="text-green-700 font-bold text-xs mb-2">✨ Best Match Retrieved:</p>
                  {result.data.map(doc => (
                    <div key={doc.id}>
                      <p className="text-yellow-900 font-bold text-sm mb-1">{doc.title}</p>
                      <p className="text-gray-700 text-xs">{doc.content}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {result.type === 'response' && (
              <div className="p-5 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border-2 border-indigo-300">
                <p className="text-gray-900 text-sm leading-relaxed whitespace-pre-line">{result.data.answer}</p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Contact Banner */}
      <ContactBanner />
      
      <div className="md:hidden fixed top-[60px] left-0 right-0 z-40 bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-4 shadow-xl">
        <div className="flex items-center justify-between">
          <button onClick={() => setActiveTab('journey')} className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg">
            <Home className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1 mx-3">
            <h1 className="text-base font-bold text-white">RAG System</h1>
            <p className="text-xs text-purple-100">Step {currentSlide + 1} of {totalSlides}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <currentSlideData.icon className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="mt-3 w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
          <motion.div className="h-full bg-white rounded-full" animate={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }} transition={{ duration: 0.3 }} />
        </div>
      </div>

      <div className="hidden md:block max-w-6xl mx-auto pt-24 mb-8">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setActiveTab('journey')} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl font-semibold text-white flex items-center gap-2 transition-all">
            <Home className="w-5 h-5" />Back to Journey
          </button>
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2 text-center">RAG System Demo</h1>
        <p className="text-purple-200 text-center text-lg">Interactive Retrieval-Augmented Generation</p>
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
            <motion.div key={currentSlide} initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ duration: 0.3 }} className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 lg:p-12 border border-white/20 shadow-2xl">
              <div className="flex items-center gap-4 mb-8">
                <div className={`p-4 rounded-2xl bg-gradient-to-r ${currentSlideData.color}`}>
                  <currentSlideData.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">{currentSlideData.title}</h2>
                  <p className="text-purple-200 text-lg">{currentSlideData.subtitle}</p>
                </div>
              </div>
              <div className="text-white">{renderContent()}</div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-4 shadow-xl">
        <div className="flex items-center justify-between gap-4">
          <button onClick={prevSlide} disabled={currentSlide === 0} className="px-6 py-3 bg-white/20 rounded-xl font-semibold text-white disabled:opacity-30 flex items-center gap-2">
            <ChevronLeft className="w-5 h-5" /><span className="text-sm">Back</span>
          </button>
          <div className="flex gap-2">{slides.map((_, i) => <button key={i} onClick={() => goToSlide(i)} className={`w-2 h-2 rounded-full transition-all ${i === currentSlide ? 'bg-white w-8' : 'bg-white/40'}`} />)}</div>
          <button onClick={nextSlide} className="px-6 py-3 bg-white/20 rounded-xl font-semibold text-white flex items-center gap-2">
            <span className="text-sm">{currentSlide === totalSlides - 1 ? 'Next: MCP' : 'Next'}</span><ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="hidden md:flex max-w-6xl mx-auto justify-between items-center px-4 pb-8">
        <button onClick={prevSlide} disabled={currentSlide === 0} className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold text-white disabled:opacity-30 flex items-center gap-2">
          <ChevronLeft className="w-5 h-5" />Previous
        </button>
        <div className="flex gap-3">{slides.map((_, i) => <button key={i} onClick={() => goToSlide(i)} className={`w-3 h-3 rounded-full transition-all ${i === currentSlide ? 'bg-white w-12' : 'bg-white/30 hover:bg-white/50'}`} />)}</div>
        <button onClick={nextSlide} className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold text-white flex items-center gap-2">
          {currentSlide === totalSlides - 1 ? 'Continue to MCP Demo' : 'Next'}<ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Floating Home Button */}
      <button
        onClick={() => setActiveTab('journey')}
        className="md:hidden fixed bottom-24 left-6 z-50 w-14 h-14 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
        aria-label="Back to Journey"
      >
        <Home className="w-6 h-6 text-white" />
      </button>
    </div>
  )
}
