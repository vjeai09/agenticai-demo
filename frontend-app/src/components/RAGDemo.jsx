import { motion } from 'framer-motion'
import { Database, Search, Sparkles, Zap } from 'lucide-react'

export default function RAGDemo() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 text-center"
      >
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <Database className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-4xl font-bold mb-4 gradient-text">
          RAG System Demo
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-6">
          Retrieval Augmented Generation - The brain of modern AI systems
        </p>
        <div className="inline-block px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg">
          <span className="text-purple-300">🚧 Coming Soon</span>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <FeatureCard
          icon={Search}
          title="Vector Search"
          description="Semantic search through documents using embeddings"
          color="from-purple-400 to-pink-500"
          features={['ChromaDB', 'Pinecone', 'Weaviate']}
        />
        <FeatureCard
          icon={Zap}
          title="Hybrid Search"
          description="Combine keyword (BM25) and semantic search"
          color="from-pink-400 to-red-500"
          features={['BM25 + Vector', 'Reranking', 'Query Rewriting']}
        />
        <FeatureCard
          icon={Sparkles}
          title="Advanced Features"
          description="Query decomposition, HyDE, and more"
          color="from-purple-500 to-blue-500"
          features={['Multi-Query', 'HyDE', 'Step-back Prompting']}
        />
        <FeatureCard
          icon={Database}
          title="Document Q&A"
          description="Upload PDFs and ask questions"
          color="from-blue-500 to-cyan-500"
          features={['Chunking', 'Embeddings', 'Context Retrieval']}
        />
      </div>
    </div>
  )
}

function FeatureCard({ icon: Icon, title, description, color, features }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className="glass-card glass-card-hover p-6"
    >
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm mb-4">{description}</p>
      <div className="space-y-2">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2 text-sm text-gray-300">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
            {feature}
          </div>
        ))}
      </div>
    </motion.div>
  )
}
