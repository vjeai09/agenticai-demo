import { motion } from 'framer-motion'
import { Sparkles, Bot, FileCode, GitBranch } from 'lucide-react'

export default function MCPDemo() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 text-center"
      >
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-4xl font-bold mb-4 gradient-text">
          MCP Agents Demo
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-6">
          Model Context Protocol - Give agents powerful tools to take actions
        </p>
        <div className="inline-block px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-lg">
          <span className="text-orange-300">🚧 Coming Soon</span>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <FeatureCard
          icon={FileCode}
          title="File Operations"
          description="Read, write, and search files"
          color="from-orange-400 to-red-500"
          features={['Read Files', 'Write Files', 'Search Content', 'Directory Ops']}
        />
        <FeatureCard
          icon={GitBranch}
          title="Git Operations"
          description="Version control integration"
          color="from-red-400 to-pink-500"
          features={['Commit', 'Push', 'Pull', 'Branch Management']}
        />
        <FeatureCard
          icon={Bot}
          title="Multi-Agent System"
          description="Coordinate multiple AI agents"
          color="from-purple-500 to-pink-500"
          features={['Research Agent', 'Fact Checker', 'Summarizer', 'Orchestrator']}
        />
        <FeatureCard
          icon={Sparkles}
          title="Custom Tools"
          description="Create your own MCP servers"
          color="from-pink-500 to-purple-500"
          features={['Calendar', 'Email', 'Database', 'Custom APIs']}
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
            <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
            {feature}
          </div>
        ))}
      </div>
    </motion.div>
  )
}
