import { motion } from 'framer-motion'
import { Sparkles, Workflow, MessageSquare, Settings, Zap, GitBranch, Users, Box } from 'lucide-react'

export default function MCPDemo() {
  const capabilities = [
    {
      icon: MessageSquare,
      title: 'Context Management',
      description: 'Intelligent context switching and state management across interactions',
      color: 'from-blue-500 to-cyan-500',
      features: ['Memory persistence', 'Context windows', 'State tracking']
    },
    {
      icon: Workflow,
      title: 'Multi-Agent Orchestration',
      description: 'Coordinate multiple specialized agents for complex task execution',
      color: 'from-purple-500 to-pink-500',
      features: ['Agent routing', 'Task delegation', 'Result aggregation']
    },
    {
      icon: Settings,
      title: 'Tool Integration',
      description: 'Seamlessly connect agents with external tools and APIs',
      color: 'from-orange-500 to-red-500',
      features: ['API calls', 'Database access', 'File operations']
    }
  ]

  const agentTypes = [
    {
      name: 'Research Agent',
      emoji: '🔍',
      description: 'Gathers information from multiple sources',
      skills: ['Web search', 'Data extraction', 'Source validation'],
      color: 'from-blue-400 to-cyan-500'
    },
    {
      name: 'Analysis Agent',
      emoji: '📊',
      description: 'Processes and analyzes collected data',
      skills: ['Data processing', 'Pattern recognition', 'Insight generation'],
      color: 'from-purple-400 to-pink-500'
    },
    {
      name: 'Writing Agent',
      emoji: '✍️',
      description: 'Creates content based on research and analysis',
      skills: ['Content generation', 'Formatting', 'Style adaptation'],
      color: 'from-green-400 to-emerald-500'
    },
    {
      name: 'Code Agent',
      emoji: '💻',
      description: 'Writes and reviews code across languages',
      skills: ['Code generation', 'Bug fixing', 'Optimization'],
      color: 'from-orange-400 to-red-500'
    },
    {
      name: 'Planning Agent',
      emoji: '🎯',
      description: 'Creates strategies and action plans',
      skills: ['Task breakdown', 'Timeline creation', 'Resource allocation'],
      color: 'from-yellow-400 to-orange-500'
    },
    {
      name: 'Validation Agent',
      emoji: '✅',
      description: 'Verifies outputs and ensures quality',
      skills: ['Fact checking', 'Quality assurance', 'Error detection'],
      color: 'from-red-400 to-pink-500'
    }
  ]

  const mcpProtocol = [
    {
      phase: 'Initialization',
      description: 'Agent registers capabilities and establishes communication channels',
      icon: Box
    },
    {
      phase: 'Context Injection',
      description: 'Relevant context and constraints are provided to the agent',
      icon: MessageSquare
    },
    {
      phase: 'Task Execution',
      description: 'Agent performs assigned task using available tools',
      icon: Zap
    },
    {
      phase: 'Result Validation',
      description: 'Output is validated against requirements and constraints',
      icon: Settings
    },
    {
      phase: 'Context Update',
      description: 'Shared context is updated with new information',
      icon: GitBranch
    }
  ]

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
          <strong className="text-orange-400">MCP</strong> enables multiple AI agents to work together 
          seamlessly, sharing context and coordinating actions to solve complex problems that single 
          agents cannot handle alone.
        </p>
        <div className="inline-block px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-lg">
          <p className="text-sm text-orange-300">
            <Users className="w-4 h-4 inline mr-1" />
            Collaborative AI: Multiple specialized agents working as a team
          </p>
        </div>
      </motion.div>

      {/* Core Capabilities */}
      <div className="grid md:grid-cols-3 gap-6">
        {capabilities.map((capability, index) => {
          const Icon = capability.icon
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card glass-card-hover p-6"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${capability.color} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">{capability.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{capability.description}</p>
              <div className="space-y-1">
                {capability.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="w-1 h-1 rounded-full bg-green-400"></div>
                    {feature}
                  </div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Agent Types */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-8"
      >
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Users className="w-6 h-6 text-purple-400" />
          Specialized Agent Types
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agentTypes.map((agent, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              className="p-5 bg-white/5 rounded-xl hover:bg-white/10 transition-all border border-white/10"
            >
              <div className="flex items-start gap-3 mb-3">
                <span className="text-3xl">{agent.emoji}</span>
                <div className="flex-1">
                  <h4 className="font-bold text-white mb-1">{agent.name}</h4>
                  <p className="text-xs text-gray-400">{agent.description}</p>
                </div>
              </div>
              <div className="space-y-1">
                {agent.skills.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${agent.color}`}></div>
                    <span className="text-xs text-gray-500">{skill}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* MCP Protocol Flow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="glass-card p-8"
      >
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Workflow className="w-6 h-6 text-blue-400" />
          MCP Protocol Flow
        </h3>
        <div className="space-y-4">
          {mcpProtocol.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.05 }}
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-white/5 to-transparent rounded-lg
                         hover:from-white/10 transition-all"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 
                              flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-white mb-1">{step.phase}</h4>
                  <p className="text-sm text-gray-400">{step.description}</p>
                </div>
                {index < mcpProtocol.length - 1 && (
                  <div className="flex-shrink-0 text-gray-600">→</div>
                )}
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Example Workflow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        className="glass-card p-8"
      >
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <GitBranch className="w-6 h-6 text-green-400" />
          Example: Multi-Agent Research Workflow
        </h3>
        <div className="space-y-4">
          <WorkflowStep
            number={1}
            agent="Planning Agent"
            action="Breaks down research task into subtasks"
            output="Task list with dependencies and priorities"
            color="from-yellow-400 to-orange-500"
          />
          <WorkflowStep
            number={2}
            agent="Research Agent"
            action="Gathers information from multiple sources"
            output="Raw data, articles, and references"
            color="from-blue-400 to-cyan-500"
          />
          <WorkflowStep
            number={3}
            agent="Analysis Agent"
            action="Processes and analyzes collected data"
            output="Insights, patterns, and key findings"
            color="from-purple-400 to-pink-500"
          />
          <WorkflowStep
            number={4}
            agent="Writing Agent"
            action="Creates structured report with findings"
            output="Well-formatted research document"
            color="from-green-400 to-emerald-500"
          />
          <WorkflowStep
            number={5}
            agent="Validation Agent"
            action="Reviews for accuracy and completeness"
            output="Final validated research report"
            color="from-red-400 to-pink-500"
          />
        </div>
      </motion.div>

      {/* Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6 }}
        className="glass-card p-8"
      >
        <h3 className="text-2xl font-bold mb-6 text-center">Why Use MCP?</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <BenefitCard
            title="🎯 Specialization"
            description="Each agent focuses on what it does best, leading to higher quality outputs"
          />
          <BenefitCard
            title="⚡ Parallel Processing"
            description="Multiple agents work simultaneously, reducing overall task completion time"
          />
          <BenefitCard
            title="🔄 Flexibility"
            description="Easily add, remove, or modify agents without affecting the entire system"
          />
          <BenefitCard
            title="🛡️ Error Handling"
            description="If one agent fails, others can continue or compensate for the failure"
          />
        </div>
      </motion.div>

      {/* Coming Soon Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.8 }}
        className="glass-card p-8 text-center border-2 border-orange-500/30"
      >
        <Zap className="w-12 h-12 mx-auto mb-3 text-yellow-400 animate-pulse" />
        <h3 className="text-2xl font-bold mb-2">Live MCP Demo Coming Soon!</h3>
        <p className="text-gray-400 mb-4">
          Watch multiple agents collaborate in real-time to solve complex tasks
        </p>
        <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 
                         hover:from-orange-600 hover:to-red-700 rounded-lg font-semibold">
          Join Waitlist
        </button>
      </motion.div>
    </div>
  )
}

function WorkflowStep({ number, agent, action, output, color }) {
  return (
    <div className="flex gap-4 items-start">
      <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r ${color} 
                      flex items-center justify-center font-bold text-sm`}>
        {number}
      </div>
      <div className="flex-1 p-4 bg-white/5 rounded-lg">
        <h4 className="font-semibold text-white mb-1">{agent}</h4>
        <p className="text-sm text-gray-400 mb-2">{action}</p>
        <div className="text-xs text-gray-500 bg-black/30 rounded px-2 py-1 inline-block">
          → {output}
        </div>
      </div>
    </div>
  )
}

function BenefitCard({ title, description }) {
  return (
    <div className="p-5 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
      <h4 className="font-bold text-white mb-2 text-lg">{title}</h4>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  )
}
