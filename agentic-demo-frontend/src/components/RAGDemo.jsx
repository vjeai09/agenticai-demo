import { motion } from 'framer-motion'
import { Database, Search, BookOpen, Zap, FileText, Brain, ArrowRight } from 'lucide-react'

export default function RAGDemo() {
  const features = [
    {
      icon: Database,
      title: 'Vector Database',
      description: 'Store and index documents as embeddings using ChromaDB, Pinecone, or Weaviate',
      color: 'from-blue-500 to-cyan-500',
      examples: ['PDF documents', 'Knowledge bases', 'Code repositories']
    },
    {
      icon: Search,
      title: 'Semantic Search',
      description: 'Find relevant information using meaning-based search instead of keywords',
      color: 'from-purple-500 to-pink-500',
      examples: ['Question answering', 'Context retrieval', 'Similar document finding']
    },
    {
      icon: Brain,
      title: 'LLM Integration',
      description: 'Combine retrieved context with large language models for accurate responses',
      color: 'from-orange-500 to-red-500',
      examples: ['GPT-4', 'Claude', 'Llama 2']
    }
  ]

  const workflow = [
    { step: 1, title: 'Document Ingestion', description: 'Load and chunk documents into manageable pieces' },
    { step: 2, title: 'Embedding Generation', description: 'Convert text chunks into vector embeddings' },
    { step: 3, title: 'Vector Storage', description: 'Store embeddings in a vector database' },
    { step: 4, title: 'Query Processing', description: 'Convert user query into embeddings' },
    { step: 5, title: 'Similarity Search', description: 'Find most relevant document chunks' },
    { step: 6, title: 'Context Augmentation', description: 'Inject retrieved context into LLM prompt' },
    { step: 7, title: 'Response Generation', description: 'LLM generates answer based on context' }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 text-center"
      >
        <Database className="w-16 h-16 mx-auto mb-4 text-purple-400" />
        <h2 className="text-3xl font-bold mb-3 gradient-text">RAG System Demo</h2>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-4">
          <strong className="text-purple-400">Retrieval-Augmented Generation (RAG)</strong> combines 
          the power of vector databases with large language models to provide accurate, 
          context-aware responses based on your own documents.
        </p>
        <div className="inline-block px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg">
          <p className="text-sm text-purple-300">
            <Zap className="w-4 h-4 inline mr-1" />
            Perfect for: Knowledge bases, Documentation Q&A, Enterprise search
          </p>
        </div>
      </motion.div>

      {/* Core Features */}
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card glass-card-hover p-6"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{feature.description}</p>
              <div className="space-y-1">
                {feature.examples.map((example, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="w-1 h-1 rounded-full bg-green-400"></div>
                    {example}
                  </div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Workflow Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-8"
      >
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <ArrowRight className="w-6 h-6 text-blue-400" />
          RAG Workflow Pipeline
        </h3>
        <div className="space-y-3">
          {workflow.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              className="flex items-start gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 
                            flex items-center justify-center font-bold text-sm">
                {item.step}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                <p className="text-sm text-gray-400">{item.description}</p>
              </div>
              {index < workflow.length - 1 && (
                <ArrowRight className="w-5 h-5 text-gray-600 flex-shrink-0 mt-1" />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Use Cases */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="glass-card p-8"
      >
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-green-400" />
          Real-World Use Cases
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <UseCase
            title="📚 Documentation Assistant"
            description="Answer questions about your product docs, API references, or technical manuals"
            metrics={['95% accuracy', 'Instant responses', 'Always up-to-date']}
          />
          <UseCase
            title="🏢 Enterprise Knowledge Base"
            description="Search across company policies, procedures, and internal documents"
            metrics={['Secure & private', 'Multi-user support', 'Version control']}
          />
          <UseCase
            title="📖 Research Assistant"
            description="Analyze research papers, academic articles, and scientific literature"
            metrics={['Citation tracking', 'Cross-referencing', 'Summary generation']}
          />
          <UseCase
            title="💼 Customer Support"
            description="Provide instant, accurate answers from your knowledge base"
            metrics={['24/7 availability', 'Reduced wait times', 'Consistent responses']}
          />
        </div>
      </motion.div>

      {/* Technical Stack */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="glass-card p-6"
      >
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <FileText className="w-6 h-6 text-blue-400" />
          Technologies & Tools
        </h3>
        <div className="grid md:grid-cols-3 gap-3 text-sm">
          <TechBadge name="ChromaDB" description="Open-source vector DB" />
          <TechBadge name="Pinecone" description="Managed vector DB" />
          <TechBadge name="LangChain" description="LLM orchestration" />
          <TechBadge name="OpenAI Embeddings" description="text-embedding-3" />
          <TechBadge name="Sentence Transformers" description="Open-source embeddings" />
          <TechBadge name="FAISS" description="Facebook AI similarity search" />
        </div>
      </motion.div>

      {/* Coming Soon Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2 }}
        className="glass-card p-8 text-center border-2 border-purple-500/30"
      >
        <Zap className="w-12 h-12 mx-auto mb-3 text-yellow-400 animate-pulse" />
        <h3 className="text-2xl font-bold mb-2">Interactive RAG Demo Coming Soon!</h3>
        <p className="text-gray-400 mb-4">
          Upload your documents, ask questions, and see RAG in action with real-time results
        </p>
        <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 
                         hover:from-purple-600 hover:to-pink-700 rounded-lg font-semibold">
          Notify Me When Ready
        </button>
      </motion.div>
    </div>
  )
}

function UseCase({ title, description, metrics }) {
  return (
    <div className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
      <h4 className="font-semibold text-white mb-2">{title}</h4>
      <p className="text-sm text-gray-400 mb-3">{description}</p>
      <div className="flex flex-wrap gap-2">
        {metrics.map((metric, idx) => (
          <span key={idx} className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">
            ✓ {metric}
          </span>
        ))}
      </div>
    </div>
  )
}

function TechBadge({ name, description }) {
  return (
    <div className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
      <p className="font-semibold text-blue-400 text-sm">{name}</p>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  )
}
