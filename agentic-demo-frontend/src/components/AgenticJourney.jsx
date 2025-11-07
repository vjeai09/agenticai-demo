import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Zap, 
  Brain, 
  Network, 
  Layers,
  Target,
  ArrowRight,
  Code,
  Database,
  Cpu,
  GitBranch,
  Users
} from 'lucide-react';

const AgenticJourney = ({ setActiveTab }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      level: "Welcome",
      title: "The Journey to Agentic AI",
      subtitle: "From Simple APIs to Intelligent Autonomous Agents",
      icon: Brain,
      color: "from-purple-500 to-pink-500",
      content: {
        type: "intro",
        description: "Discover how AI systems evolve from basic request-response patterns to intelligent, autonomous agents that can think, plan, and act independently.",
        keyPoints: [
          "5 progressive levels of AI capability",
          "Real examples at each stage",
          "Live demos you can interact with",
          "Understand the technology behind agentic AI"
        ]
      }
    },
    {
      level: "Level 1",
      title: "Simple APIs",
      subtitle: "The Foundation: Request → Response",
      icon: Zap,
      color: "from-blue-500 to-cyan-500",
      content: {
        type: "level",
        description: "Traditional APIs follow a simple pattern: you send a request, you get a response. No intelligence, no decisions, no memory.",
        architecture: [
          { step: "User Request", desc: "User asks for specific data" },
          { step: "API Call", desc: "Direct call to single service" },
          { step: "Data Response", desc: "Returns requested data" }
        ],
        example: {
          title: "Weather API Example",
          code: `// Simple API call
const response = await fetch('/weather/Mumbai');
const data = await response.json();

// Result: Just weather data, nothing more
{
  "temperature": 28,
  "humidity": 60,
  "description": "Partly cloudy"
}`,
          limitations: [
            "❌ No intelligence or reasoning",
            "❌ Cannot make decisions",
            "❌ No memory of previous requests",
            "❌ Requires exact parameters"
          ]
        },
        liveDemo: "weather"
      }
    },
    {
      level: "Level 2",
      title: "API Orchestration",
      subtitle: "Combining Multiple Services",
      icon: Network,
      color: "from-green-500 to-teal-500",
      content: {
        type: "level",
        description: "Orchestration combines multiple APIs in a predefined workflow. Still no intelligence, but now we can automate multi-step processes.",
        architecture: [
          { step: "User Request", desc: "Single request triggers workflow" },
          { step: "Multiple API Calls", desc: "Calls several services in sequence/parallel" },
          { step: "Data Aggregation", desc: "Combines all responses" },
          { step: "Unified Response", desc: "Returns merged result" }
        ],
        example: {
          title: "Trip Planning Orchestration",
          code: `// Orchestrated workflow
const planTrip = async (city) => {
  // Call multiple APIs in parallel
  const [weather, news, currency] = await Promise.all([
    fetch(\`/weather/\${city}\`),
    fetch(\`/news?query=\${city}\`),
    fetch(\`/exchange?from=USD&to=INR\`)
  ]);
  
  // Combine results intelligently
  return {
    weather: await weather.json(),
    localNews: await news.json(),
    budget: await currency.json()
  };
}`,
          improvements: [
            "✅ Automates multi-step workflows",
            "✅ Combines data from multiple sources",
            "✅ Reduces user effort",
            "⚠️ Still follows fixed patterns"
          ]
        },
        liveDemo: "orchestration"
      }
    },
    {
      level: "Level 3",
      title: "RAG Systems",
      subtitle: "AI + Your Custom Knowledge",
      icon: Database,
      color: "from-orange-500 to-red-500",
      content: {
        type: "level",
        description: "RAG (Retrieval-Augmented Generation) lets AI access your specific documents and data, making it a knowledgeable assistant for your domain.",
        architecture: [
          { step: "Document Upload", desc: "Add your knowledge base" },
          { step: "Vector Embedding", desc: "Convert text to searchable vectors" },
          { step: "User Question", desc: "Ask anything about your docs" },
          { step: "Semantic Search", desc: "Find relevant information" },
          { step: "AI Generation", desc: "Generate answer with context" }
        ],
        example: {
          title: "Document Q&A System",
          code: `// RAG workflow
const answerQuestion = async (question) => {
  // 1. Find relevant document chunks
  const relevantDocs = await vectorDB.search(question, k=3);
  
  // 2. Build context from retrieved docs
  const context = relevantDocs.map(d => d.content).join('\\n');
  
  // 3. Ask AI with retrieved context
  const prompt = \`Context: \${context}\\n\\nQuestion: \${question}\`;
  const answer = await llm.generate(prompt);
  
  return {
    answer,
    sources: relevantDocs // Show where info came from
  };
}`,
          capabilities: [
            "✅ Answers questions about YOUR data",
            "✅ Provides sources and citations",
            "✅ Works with any document type",
            "✅ Semantic understanding (not just keyword search)",
            "⚠️ Still needs explicit questions"
          ]
        },
        liveDemo: "rag"
      }
    },
    {
      level: "Level 4",
      title: "MCP - Tool-Using AI",
      subtitle: "AI That Chooses Its Own Tools",
      icon: Layers,
      color: "from-violet-500 to-purple-500",
      content: {
        type: "level",
        description: "Model Context Protocol (MCP) enables AI to autonomously select and use tools. The AI decides WHICH tool to use and WHEN - true decision-making begins here.",
        architecture: [
          { step: "User Goal", desc: "High-level task or question" },
          { step: "AI Analysis", desc: "Understands intent, plans approach" },
          { step: "Tool Selection", desc: "AI chooses appropriate tools" },
          { step: "Tool Execution", desc: "Calls selected APIs/functions" },
          { step: "Result Synthesis", desc: "Combines outputs intelligently" }
        ],
        example: {
          title: "Autonomous Tool Selection",
          code: `// MCP Agent
const agent = new MCPAgent({
  tools: [weatherAPI, newsAPI, currencyAPI, calculatorAPI]
});

// User gives high-level task
const result = await agent.execute(
  "Help me plan a 5-day trip to Tokyo for under $2000"
);

// Agent's internal reasoning:
// 1. "I need weather data" → Calls weatherAPI('Tokyo')
// 2. "I need budget conversion" → Calls currencyAPI('USD', 'JPY')
// 3. "Need local insights" → Calls newsAPI('Tokyo tourism')
// 4. "Calculate costs" → Calls calculatorAPI(...)
// 5. Synthesizes everything into travel plan`,
          capabilities: [
            "✅ AI decides which tools to use",
            "✅ Can chain multiple tools",
            "✅ Handles complex, open-ended queries",
            "✅ Adapts based on partial results",
            "✅ Error handling and retry logic",
            "⚠️ Single-agent, sequential thinking"
          ]
        },
        liveDemo: "mcp"
      }
    },
    {
      level: "Level 5",
      title: "Full Agentic AI",
      subtitle: "Autonomous, Goal-Oriented Intelligence",
      icon: Target,
      color: "from-pink-500 to-rose-500",
      content: {
        type: "level",
        description: "True agentic systems can plan, reason, remember, collaborate with other agents, and work towards complex goals autonomously over extended periods.",
        architecture: [
          { step: "Goal Setting", desc: "User provides high-level objective" },
          { step: "Strategic Planning", desc: "AI breaks down into subtasks" },
          { step: "Multi-Agent Coordination", desc: "Specialized agents collaborate" },
          { step: "Iterative Execution", desc: "Executes, learns, adapts" },
          { step: "Memory & Context", desc: "Remembers across sessions" },
          { step: "Goal Achievement", desc: "Delivers complete solution" }
        ],
        example: {
          title: "Multi-Agent Research System",
          code: `// Agentic System with Multiple Specialized Agents
const researchSystem = new AgenticSystem({
  agents: [
    new ResearcherAgent({ role: 'data gathering' }),
    new AnalystAgent({ role: 'analysis' }),
    new WriterAgent({ role: 'report generation' }),
    new ReviewerAgent({ role: 'quality check' })
  ],
  memory: new ConversationalMemory(),
  coordinator: new AgentCoordinator()
});

// Complex, open-ended task
await researchSystem.execute({
  goal: "Analyze the AI market and create a comprehensive report",
  constraints: {
    deadline: "2 days",
    depth: "detailed",
    sources: "minimum 20"
  }
});

// What happens internally:
// Day 1:
// - Researcher: Gathers 50+ sources, news, papers
// - Analyst: Identifies trends, competitors, opportunities
// - Writer: Drafts sections as data comes in
// - Reviewer: Checks facts, suggests improvements

// Day 2:
// - Agents iterate based on feedback
// - Memory system tracks all findings
// - Coordinator ensures no duplication
// - Final report generated with 25 citations`,
          capabilities: [
            "✅ Goal-oriented behavior",
            "✅ Strategic planning & task breakdown",
            "✅ Multiple specialized agents working together",
            "✅ Long-term memory across sessions",
            "✅ Self-correction and learning",
            "✅ Handles ambiguity and complexity",
            "✅ Autonomous decision-making at every step",
            "🚀 True artificial intelligence"
          ]
        },
        liveDemo: null
      }
    },
    {
      level: "Comparison",
      title: "The Evolution Summary",
      subtitle: "Understanding the Progression",
      icon: GitBranch,
      color: "from-indigo-500 to-blue-500",
      content: {
        type: "comparison",
        table: [
          {
            feature: "Intelligence",
            level1: "None",
            level2: "Fixed logic",
            level3: "Retrieval-based",
            level4: "Tool selection",
            level5: "Full reasoning"
          },
          {
            feature: "Decision Making",
            level1: "User decides",
            level2: "Predefined flow",
            level3: "Search ranking",
            level4: "Autonomous",
            level5: "Strategic planning"
          },
          {
            feature: "Memory",
            level1: "None",
            level2: "None",
            level3: "Document store",
            level4: "Short-term",
            level5: "Long-term + context"
          },
          {
            feature: "Complexity",
            level1: "Single request",
            level2: "Multi-step",
            level3: "Q&A",
            level4: "Multi-tool",
            level5: "Multi-agent, multi-goal"
          },
          {
            feature: "Autonomy",
            level1: "Zero",
            level2: "Low",
            level3: "Medium",
            level4: "High",
            level5: "Full"
          },
          {
            feature: "Use Case",
            level1: "Simple data fetch",
            level2: "Workflow automation",
            level3: "Knowledge assistant",
            level4: "Smart assistant",
            level5: "AI employee"
          }
        ]
      }
    },
    {
      level: "Try It",
      title: "Experience the Difference",
      subtitle: "Interactive Demos Available Now",
      icon: Users,
      color: "from-cyan-500 to-blue-500",
      content: {
        type: "cta",
        demos: [
          {
            level: "Level 1-2",
            title: "API Demos",
            description: "Try simple APIs and orchestration",
            link: "api",
            available: true
          },
          {
            level: "Level 3",
            title: "RAG System",
            description: "Upload docs and ask questions",
            link: "rag",
            available: false,
            comingSoon: true
          },
          {
            level: "Level 4",
            title: "MCP Agents",
            description: "Watch AI select and use tools",
            link: "mcp",
            available: false,
            comingSoon: true
          }
        ]
      }
    }
  ];

  const currentSlideData = slides[currentSlide];
  const totalSlides = slides.length;

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 text-center">
          The Agentic AI Journey
        </h1>
        <p className="text-purple-200 text-center text-lg">
          Interactive Learning Experience
        </p>
      </div>

      {/* Main Slide Area */}
      <div className="max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl"
          >
            {/* Slide Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className={`p-4 rounded-2xl bg-gradient-to-r ${currentSlideData.color}`}>
                <currentSlideData.icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-purple-300">
                  {currentSlideData.level}
                </div>
                <h2 className="text-3xl font-bold text-white">
                  {currentSlideData.title}
                </h2>
                <p className="text-purple-200 text-lg">
                  {currentSlideData.subtitle}
                </p>
              </div>
            </div>

            {/* Slide Content */}
            <SlideContent content={currentSlideData.content} color={currentSlideData.color} setActiveTab={setActiveTab} />
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              currentSlide === 0
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          {/* Progress Dots */}
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all rounded-full ${
                  index === currentSlide
                    ? 'w-8 h-3 bg-purple-400'
                    : 'w-3 h-3 bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              currentSlide === totalSlides - 1
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
            }`}
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Counter */}
        <div className="text-center mt-4 text-purple-200">
          Slide {currentSlide + 1} of {totalSlides}
        </div>
      </div>
    </div>
  );
};

// Slide Content Component
const SlideContent = ({ content, color, setActiveTab }) => {
  if (content.type === 'intro') {
    return (
      <div className="space-y-6">
        <p className="text-xl text-white/90 leading-relaxed">
          {content.description}
        </p>
        <div className="grid md:grid-cols-2 gap-4 mt-8">
          {content.keyPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10"
            >
              <div className={`mt-1 w-2 h-2 rounded-full bg-gradient-to-r ${color}`} />
              <span className="text-white/80">{point}</span>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (content.type === 'level') {
    return (
      <div className="space-y-8">
        {/* Description */}
        <p className="text-lg text-white/90 leading-relaxed">
          {content.description}
        </p>

        {/* Architecture Flow */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Cpu className="w-5 h-5" />
            How It Works
          </h3>
          <div className="flex flex-wrap items-center gap-3">
            {content.architecture.map((step, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="bg-white/10 backdrop-blur px-4 py-3 rounded-lg border border-white/20">
                  <div className="font-semibold text-white text-sm">{step.step}</div>
                  <div className="text-xs text-purple-200">{step.desc}</div>
                </div>
                {index < content.architecture.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-purple-300" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Code Example */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Code className="w-5 h-5" />
            {content.example.title}
          </h3>
          <pre className="bg-slate-950/50 p-6 rounded-xl overflow-x-auto border border-white/10">
            <code className="text-sm text-green-400 font-mono">
              {content.example.code}
            </code>
          </pre>
        </div>

        {/* Capabilities/Limitations */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">
            {content.example.limitations ? 'Limitations' : 
             content.example.improvements ? 'Improvements' : 'Capabilities'}
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {(content.example.limitations || content.example.improvements || content.example.capabilities || []).map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-2 bg-white/5 p-3 rounded-lg border border-white/10"
              >
                <span className="text-white/90">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (content.type === 'comparison') {
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/20">
              <th className="p-4 text-white font-bold">Feature</th>
              <th className="p-4 text-white font-bold">Level 1<br/><span className="text-xs font-normal text-purple-200">Simple API</span></th>
              <th className="p-4 text-white font-bold">Level 2<br/><span className="text-xs font-normal text-purple-200">Orchestration</span></th>
              <th className="p-4 text-white font-bold">Level 3<br/><span className="text-xs font-normal text-purple-200">RAG</span></th>
              <th className="p-4 text-white font-bold">Level 4<br/><span className="text-xs font-normal text-purple-200">MCP</span></th>
              <th className="p-4 text-white font-bold">Level 5<br/><span className="text-xs font-normal text-purple-200">Full Agentic</span></th>
            </tr>
          </thead>
          <tbody>
            {content.table.map((row, index) => (
              <tr key={index} className="border-b border-white/10 hover:bg-white/5">
                <td className="p-4 font-semibold text-purple-200">{row.feature}</td>
                <td className="p-4 text-white/80">{row.level1}</td>
                <td className="p-4 text-white/80">{row.level2}</td>
                <td className="p-4 text-white/80">{row.level3}</td>
                <td className="p-4 text-white/80">{row.level4}</td>
                <td className="p-4 text-white/80 font-semibold">{row.level5}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (content.type === 'cta') {
    return (
      <div className="space-y-6">
        <p className="text-xl text-white/90 text-center mb-8">
          Ready to see these concepts in action? Try our interactive demos!
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {content.demos.map((demo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-xl border-2 ${
                demo.available
                  ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-400 hover:border-purple-300 cursor-pointer'
                  : 'bg-white/5 border-white/10'
              }`}
            >
              <div className="text-sm font-semibold text-purple-300 mb-2">
                {demo.level}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {demo.title}
              </h3>
              <p className="text-white/70 mb-4">
                {demo.description}
              </p>
              {demo.available ? (
                <button 
                  onClick={() => setActiveTab(demo.link)}
                  className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
                >
                  Try Now →
                </button>
              ) : (
                <div className="w-full py-2 px-4 bg-white/10 text-white/50 font-semibold rounded-lg text-center">
                  Coming Soon
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default AgenticJourney;
