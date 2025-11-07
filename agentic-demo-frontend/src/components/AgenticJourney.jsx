import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
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
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  
  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

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
          "One consistent use case: Travel Planning Assistant",
          "Watch the same problem solved at each level",
          "Understand how AI capabilities compound over time"
        ],
        useCase: {
          title: "🌍 Our Journey: Building a Travel Planning Assistant",
          description: "Throughout this tutorial, we'll build the same feature - helping users plan a trip to Tokyo - but watch how it evolves from simple data fetching to a fully autonomous AI assistant.",
          scenario: "User Goal: 'I want to plan a 5-day trip to Tokyo in December'"
        }
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
        scenario: {
          user: "What's the weather in Tokyo?",
          system: "User must ask separate questions for each piece of information"
        },
        architecture: [
          { step: "User Request", desc: "What's the weather in Tokyo?" },
          { step: "API Call", desc: "fetch('/weather/Tokyo')" },
          { step: "Data Response", desc: "Returns ONLY weather data" }
        ],
        example: {
          title: "Level 1: Travel Planning with Simple APIs",
          code: `// User has to make SEPARATE requests for each data point

// Request 1: Get weather
const weatherResponse = await fetch('/weather/Tokyo');
const weather = await weatherResponse.json();
console.log(weather);
// Output: { temperature: 12°C, condition: "Clear" }

// Request 2: Get news (separate call)
const newsResponse = await fetch('/news?query=Tokyo tourism');
const news = await newsResponse.json();
console.log(news);
// Output: { articles: [...] }

// Request 3: Get exchange rate (another separate call)
const currencyResponse = await fetch('/exchange?from=USD&to=JPY');
const rates = await currencyResponse.json();
console.log(rates);
// Output: { rate: 149.5 }

// ❌ Problem: User must manually combine all this information
// ❌ Problem: 3 separate requests, no relationship between them
// ❌ Problem: No context about why they're asking`,
          limitations: [
            "❌ User must ask 3+ separate questions",
            "❌ No connection between requests",
            "❌ Manual data combination required",
            "❌ No understanding of user's goal (trip planning)"
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
        scenario: {
          user: "Help me plan a trip to Tokyo",
          system: "System automatically calls multiple APIs in a fixed sequence"
        },
        architecture: [
          { step: "User Request", desc: "Plan trip to Tokyo" },
          { step: "Parallel API Calls", desc: "Weather + News + Currency all at once" },
          { step: "Data Aggregation", desc: "Combine all responses" },
          { step: "Unified Response", desc: "Return travel package" }
        ],
        example: {
          title: "Level 2: Travel Planning with Orchestration",
          code: `// ONE request triggers MULTIPLE coordinated API calls

const planTrip = async (destination) => {
  // Execute all APIs in parallel (faster!)
  const [weather, news, currency] = await Promise.all([
    fetch(\`/weather/\${destination}\`),
    fetch(\`/news?query=\${destination} tourism\`),
    fetch(\`/exchange?from=USD&to=JPY\`)
  ]);
  
  // Automatically combine results
  return {
    destination: destination,
    weather: await weather.json(),
    // Output: { temp: 12°C, condition: "Clear" }
    
    localNews: await news.json(),
    // Output: { articles: ["Cherry blossom season...", ...] }
    
    budget: await currency.json()
    // Output: { rate: 149.5, estimate: "$100 = ¥14,950" }
  };
}

// User makes ONE call
const tripPlan = await planTrip("Tokyo");

// ✅ Gets everything needed in one response
// ✅ Faster execution (parallel calls)
// ⚠️  But still follows fixed pattern - always calls ALL three APIs`,
          improvements: [
            "✅ Single request gets ALL travel info",
            "✅ Automated multi-step workflow",
            "✅ Parallel execution = faster",
            "⚠️ Always fetches same data (no adaptation)",
            "⚠️ Can't adjust based on user preferences"
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
        scenario: {
          user: "What are the best family-friendly activities in Tokyo in December?",
          system: "Searches uploaded travel guides, past trip reviews, and local tips to provide personalized answers"
        },
        architecture: [
          { step: "Upload Knowledge", desc: "Travel guides, reviews, tips stored as vectors" },
          { step: "User Question", desc: "Asks about Tokyo activities" },
          { step: "Semantic Search", desc: "Finds relevant document chunks" },
          { step: "Context Retrieval", desc: "Gets top 3-5 relevant sections" },
          { step: "AI Generation", desc: "Generates answer WITH sources" }
        ],
        example: {
          title: "Level 3: Travel Planning with RAG",
          code: `// RAG System with Travel Knowledge Base

// First, upload your travel documents (one-time setup)
const travelKnowledge = await uploadDocuments([
  "tokyo-winter-guide.pdf",      // Tokyo winter travel guide
  "japan-cultural-tips.pdf",     // Cultural etiquette
  "family-activities-tokyo.pdf", // Family-friendly spots
  "budget-travel-japan.pdf"      // Budget tips
]);

// Now, users can ask natural language questions
const answerQuestion = async (question) => {
  // 1. Find relevant document chunks using semantic search
  const relevantDocs = await vectorDB.search(
    question, 
    k=5  // Get top 5 most relevant sections
  );
  
  // Retrieved: 
  // - "December in Tokyo: Cherry blossoms are gone, but..."
  // - "Top family activities: teamLab Borderless museum..."
  // - "Winter festivals: Tokyo Illumination at Roppongi..."
  
  // 2. Build context from retrieved documents
  const context = relevantDocs.map(doc => doc.content).join('\\n\\n');
  
  // 3. Generate answer with AI using retrieved context
  const prompt = \`
    Context from travel guides:
    \${context}
    
    Question: \${question}
    
    Provide a detailed answer based on the context above.
    Include specific recommendations and cite sources.
  \`;
  
  const answer = await llm.generate(prompt);
  
  return {
    answer: answer,
    sources: relevantDocs.map(d => ({
      title: d.filename,
      excerpt: d.content.substring(0, 100)
    }))
  };
}

// User: "What are the best family activities in Tokyo in December?"
const response = await answerQuestion(
  "What are the best family activities in Tokyo in December?"
);

/* Response:
{
  answer: "Based on your uploaded travel guides, here are the top 
    family-friendly activities in Tokyo during December:
    
    1. teamLab Borderless Museum - Interactive digital art that kids love
    2. Tokyo Skytree - Great views and winter illuminations
    3. Ueno Zoo - See pandas and winter animal behavior
    4. DisneySea - Special Christmas events in December
    
    December weather averages 12°C, so dress warmly. The winter 
    illuminations are spectacular throughout the city.",
    
  sources: [
    { title: "family-activities-tokyo.pdf", excerpt: "teamLab..." },
    { title: "tokyo-winter-guide.pdf", excerpt: "December weather..." }
  ]
}
*/

// ✅ AI answers questions about YOUR specific documents
// ✅ Provides source citations for trust
// ✅ Semantic understanding (not just keyword matching)
// ⚠️ Still reactive - user must ask the right questions`,
          capabilities: [
            "✅ Answers questions about YOUR travel docs",
            "✅ Semantic search finds relevant info even with different wording",
            "✅ Provides sources and citations for trust",
            "✅ Can handle complex, natural language questions",
            "✅ Knowledge base grows with uploaded documents",
            "⚠️ User must still ask explicit questions",
            "⚠️ Doesn't proactively plan or suggest"
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
        scenario: {
          user: "Plan a 5-day Tokyo trip for under $2000 with my family",
          system: "AI analyzes the request, determines it needs weather, budget, and family activities, then autonomously calls appropriate APIs"
        },
        architecture: [
          { step: "User Goal", desc: "Plan Tokyo trip < $2000" },
          { step: "AI Analysis", desc: "Break down: need weather, budget, activities, hotels" },
          { step: "Autonomous Tool Selection", desc: "AI chooses which APIs to call" },
          { step: "Tool Execution", desc: "Calls selected tools in smart order" },
          { step: "Intelligent Synthesis", desc: "Combines results into a complete plan" }
        ],
        example: {
          title: "Level 4: Travel Planning with MCP Agent",
          code: `// MCP Agent with Available Tools

const travelAgent = new MCPAgent({
  name: "TravelPlanningAgent",
  tools: [
    weatherAPI,           // Get weather forecasts
    newsAPI,             // Get local events and news
    currencyAPI,         // Currency conversion
    hotelSearchAPI,      // Find accommodation
    flightSearchAPI,     // Find flights
    restaurantAPI,       // Find restaurants
    travelDocsRAG        // Query travel knowledge base
  ],
  llm: "gpt-4"  // AI brain that decides
});

// User gives HIGH-LEVEL goal (not specific API calls)
const userRequest = \`
  I want to plan a 5-day family trip to Tokyo in December 
  for under $2000. We have 2 adults and 2 kids (ages 6 and 9).
  We love museums and outdoor activities.
\`;

const plan = await travelAgent.execute(userRequest);

/* Agent's Internal Reasoning (automated):

AI thinks: "Let me break this down:
  - Need: Tokyo December weather (weatherAPI)
  - Need: Budget in JPY (currencyAPI) 
  - Need: Family activities (travelDocsRAG + newsAPI)
  - Need: Hotel costs (hotelSearchAPI)
  - Optional: Flight prices (can skip if user didn't ask)
  
Let me call these in smart order..."

// Step 1: Get weather (determines clothing advice)
weatherData = await weatherAPI.call({ city: "Tokyo", month: "December" })
// Result: 8-12°C, bring warm clothes

// Step 2: Convert budget
budgetInfo = await currencyAPI.call({ 
  from: "USD", 
  to: "JPY", 
  amount: 2000 
})
// Result: ¥299,000 total budget

// Step 3: Query knowledge base for family activities
activities = await travelDocsRAG.query(
  "family-friendly activities in Tokyo for kids ages 6-9"
)
// Found: teamLab, DisneySea, Ueno Zoo

// Step 4: Get hotel prices
hotels = await hotelSearchAPI.call({
  city: "Tokyo",
  guests: 4,
  familyFriendly: true,
  maxPrice: 100  // per night in USD
})
// Found: 3 family hotels, $80-120/night

// Step 5: Check current events
events = await newsAPI.call({ query: "Tokyo December events" })
// Found: Winter illuminations, Christmas markets

AI synthesizes everything:
*/

/* Final Response:
{
  feasibility: "Yes, achievable within budget",
  
  summary: "5-day Tokyo family trip for ~$1,850",
  
  breakdown: {
    accommodation: "$450 (5 nights × $90)",
    activities: "$600 (DisneySea, museums, zoo)",
    food: "$500 ($25/person/day)",
    transport: "$200 (JR Pass + metro)",
    buffer: "$100 contingency"
  },
  
  itinerary: [
    {
      day: 1,
      activities: ["Ueno Zoo", "teamLab Borderless"],
      reason: "Easy day after arrival, kid-friendly"
    },
    {
      day: 2,
      activities: ["Tokyo DisneySea"],
      reason: "Full day at theme park, special December events"
    }
    // ... more days
  ],
  
  weatherAdvice: "Pack warm layers, avg 10°C",
  
  costSavings: [
    "Buy combo tickets for museums (save 20%)",
    "Eat at convenience stores for breakfast (save $100)"
  ],
  
  toolsUsed: ["weatherAPI", "currencyAPI", "travelDocsRAG", 
              "hotelSearchAPI", "newsAPI"]
}
*/

// ✅ AI autonomously decided which tools to use
// ✅ Called 5 different APIs without being told which ones
// ✅ Ordered calls intelligently (weather first, then budget-dependent items)
// ✅ Synthesized everything into a coherent plan
// ✅ Adapted based on user constraints (budget, family, preferences)`,
          capabilities: [
            "✅ AI autonomously selects which tools to use",
            "✅ Understands user intent from natural language",
            "✅ Chains multiple tools intelligently",
            "✅ Adapts based on intermediate results",
            "✅ Handles complex, open-ended requests",
            "✅ Explains its reasoning and tool choices",
            "⚠️ Still single-agent, processes sequentially",
            "⚠️ No long-term memory across sessions"
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
        scenario: {
          user: "Plan and book our complete Tokyo family vacation, handling everything",
          system: "Multiple specialized AI agents collaborate, remember preferences, handle booking, send reminders, and adapt to changes over weeks"
        },
        architecture: [
          { step: "Goal Setting", desc: "User: Plan complete Tokyo vacation" },
          { step: "Strategic Planning", desc: "Break into: research, booking, logistics, monitoring" },
          { step: "Multi-Agent Deploy", desc: "Specialist agents work in parallel" },
          { step: "Iterative Execution", desc: "Agents collaborate, learn, adapt over days/weeks" },
          { step: "Memory & Learning", desc: "Remember preferences, past trips, user feedback" },
          { step: "Goal Achievement", desc: "Complete trip planned, booked, and managed" }
        ],
        example: {
          title: "Level 5: Full Agentic Travel System",
          code: `// Multi-Agent Agentic System

const travelSystem = new AgenticSystem({
  goal: "Plan, book, and manage complete Tokyo family vacation",
  
  agents: [
    new ResearchAgent({
      role: "Gather information and options",
      tools: [weatherAPI, newsAPI, reviewsAPI, travelDocsRAG],
      memory: conversationalMemory
    }),
    
    new BudgetAgent({
      role: "Optimize costs and track spending",
      tools: [currencyAPI, priceComparisonAPI, dealsAPI],
      memory: userPreferencesMemory
    }),
    
    new BookingAgent({
      role: "Make reservations and purchases",
      tools: [hotelBookingAPI, flightBookingAPI, activityBookingAPI],
      permissions: ["book_with_approval"]
    }),
    
    new LogisticsAgent({
      role: "Plan schedules and transportation",
      tools: [mapsAPI, transitAPI, weatherAPI],
      memory: tripContextMemory
    }),
    
    new ConciergeAgent({
      role: "Handle questions and changes",
      tools: [allAPIs, travelDocsRAG],
      memory: conversationalMemory
    })
  ],
  
  coordinator: new AgentCoordinator(),
  memory: new LongTermMemory(),
  adaptivePlanning: true
});

// User's initial request
const userRequest = \`
  Plan a family trip to Tokyo in December. 
  Budget: $2000, 5 days, 2 adults + 2 kids (6, 9).
  We love museums and want authentic Japanese experiences.
  I'm vegetarian, kids are picky eaters.
\`;

// System starts working (this happens over days, not seconds)
await travelSystem.execute(userRequest);

/* What happens internally (Week 1):

=== Day 1: Research Phase ===
ResearchAgent:
  - Queries weather: "December in Tokyo: 8-12°C, clear skies"
  - Searches family activities: "50+ options found"
  - Checks reviews: "Filtered for vegetarian-friendly"
  - Stores in memory: User preference for authentic experiences

BudgetAgent (working in parallel):
  - Converts budget: "$2000 = ¥299,000"
  - Analyzes price trends: "Flights 20% cheaper if booked now"
  - Finds deals: "Museum combo pass saves ¥2000"
  - Alerts system: "Book flights NOW to save $180"

LogisticsAgent (also in parallel):
  - Plans route optimization for museum visits
  - Checks transit passes: "5-day JR Pass = $110/person"
  - Maps walking distances for kids
  - Creates daily schedule drafts

Coordinator:
  - Sees flight price urgency from BudgetAgent
  - Prioritizes flight research
  - Assigns ResearchAgent to find flight options

=== Day 2: Approval & Booking ===
System sends to user:
  "I found 3 flight options. Option B is $180 cheaper if booked 
   today. Should I proceed?"

User: "Yes, book Option B"

BookingAgent:
  - Books flights: Confirmed, $720 total
  - Updates shared memory: "$1,280 remaining budget"
  - Sends confirmation to user

BudgetAgent (automatically adjusts):
  - Recalculates remaining budget
  - Adjusts hotel price range: "Max $90/night now"
  - Finds 5 hotels within new range

=== Day 3-4: Iterative Planning ===
LogisticsAgent:
  - Creates detailed itinerary based on flight times
  - Optimizes for kids (shorter walking, rest time)
  - Checks museum hours, books timed entries

ResearchAgent:
  - Searches "vegetarian restaurants near Shibuya"
  - Finds "kid-friendly ramen shops"
  - Adds to recommendations with ratings

ConciergeAgent (proactive):
  - Notices December 15 is a festival day
  - Suggests: "Would you like to attend Hagoita-Ichi market?"
  - User: "Yes!" → Adds to itinerary

=== Day 5: Final Bookings ===
BookingAgent:
  - Books hotel: Richmond Hotel Asakusa, $85/night × 5
  - Books DisneySea tickets: $240 total
  - Pre-books museum entries: $80 total
  - Total spent: $1,850 (under budget!)

System learns from this trip:
  - Family prefers cultural sites over shopping
  - Vegetarian options are important
  - Kids need breaks between activities
  - User appreciates proactive suggestions

=== Ongoing: Trip Management ===

Week before trip:
ConciergeAgent:
  - Sends packing list: "Warm clothes for 8-12°C"
  - Reminder: "Download offline maps"
  - Checks weather update: "Still clear, no changes needed"

During trip:
- Monitors flight status, sends gate changes
- Suggests restaurants near current location
- Adjusts schedule if something closes
- Answers questions: "Where's nearest pharmacy?"

After trip:
- Asks for feedback: "How was teamLab Borderless?"
- Stores preferences: "Kids loved interactive museums"
- Learns: "Ueno Zoo was too cold, avoid outdoor zoos in winter"
- Uses for next trip: "Remember family likes indoor activities in winter"

*/

/* Final Output to User:

✅ Complete 5-Day Tokyo Itinerary
✅ All bookings confirmed (flights, hotel, activities)
✅ Vegetarian restaurants mapped
✅ Daily schedules optimized for kids
✅ Transit passes purchased
✅ Weather-appropriate packing list
✅ Emergency contacts and phrases
✅ Real-time trip support during travel
✅ Under budget: $1,850 / $2,000

Memory stored for future trips:
- Family preferences and constraints
- What worked and what didn't
- Dining preferences
- Kids' interests and attention spans
*/

// ✅ Multiple specialized agents working in parallel
// ✅ Autonomous over days/weeks, not just seconds  
// ✅ Long-term memory across entire planning process
// ✅ Learns from user feedback and applies to future
// ✅ Proactive suggestions and problem-solving
// ✅ Handles real-time changes during trip
// ✅ Coordinated decision-making across agents
// ✅ Goal-oriented: doesn't stop until trip is fully planned
// 🚀 This is true artificial intelligence - autonomous, adaptive, intelligent`,
          capabilities: [
            "✅ Multiple specialist agents collaborate autonomously",
            "✅ Works over days/weeks, not just instant responses",
            "✅ Long-term memory: remembers preferences, learns from feedback",
            "✅ Proactive: suggests improvements without being asked",
            "✅ Adaptive: adjusts plans based on new information",
            "✅ Goal-oriented: persists until objective achieved",
            "✅ Handles uncertainty and changes gracefully",
            "✅ Real-time support during trip execution",
            "🚀 Complete autonomous AI system"
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

  // Touch event handlers for swipe gestures
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && currentSlide < totalSlides - 1) {
      nextSlide();
    }
    if (isRightSwipe && currentSlide > 0) {
      prevSlide();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-3 sm:p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-4 sm:mb-6 md:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 text-center">
          The Agentic AI Journey
        </h1>
        <p className="text-purple-200 text-center text-sm sm:text-base md:text-lg">
          Interactive Learning Experience
        </p>
        {/* Mobile swipe hint */}
        <p className="text-purple-300/60 text-center text-xs sm:text-sm mt-2 md:hidden">
          👈 Swipe to navigate 👉
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
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            className="bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 border border-white/20 shadow-2xl touch-pan-y select-none"
          >
            {/* Slide Header */}
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
              <div className={`p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r ${currentSlideData.color} flex-shrink-0`}>
                <currentSlideData.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-semibold text-purple-300">
                  {currentSlideData.level}
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white truncate">
                  {currentSlideData.title}
                </h2>
                <p className="text-purple-200 text-sm sm:text-base md:text-lg">
                  {currentSlideData.subtitle}
                </p>
              </div>
            </div>

            {/* Slide Content */}
            <SlideContent content={currentSlideData.content} color={currentSlideData.color} setActiveTab={setActiveTab} />
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-4 sm:mt-6 md:mt-8 flex items-center justify-between gap-2 sm:gap-4">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl font-semibold transition-all text-sm sm:text-base min-w-[80px] sm:min-w-[100px] justify-center ${
              currentSlide === 0
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-white/20 text-white hover:bg-white/30 active:scale-95'
            }`}
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Previous</span>
            <span className="sm:hidden">Prev</span>
          </button>

          {/* Progress Dots */}
          <div className="flex gap-1.5 sm:gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`transition-all rounded-full ${
                  index === currentSlide
                    ? 'w-6 sm:w-8 h-2.5 sm:h-3 bg-purple-400'
                    : 'w-2.5 sm:w-3 h-2.5 sm:h-3 bg-white/30 hover:bg-white/50 active:bg-white/60'
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
            className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl font-semibold transition-all text-sm sm:text-base min-w-[80px] sm:min-w-[100px] justify-center ${
              currentSlide === totalSlides - 1
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 active:scale-95'
            }`}
          >
            <span className="hidden sm:inline">Next</span>
            <span className="sm:hidden">Next</span>
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Slide Counter */}
        <div className="text-center mt-3 sm:mt-4 text-purple-200 text-sm sm:text-base">
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
      <div className="space-y-4 sm:space-y-6">
        <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed">
          {content.description}
        </p>
        
        {/* Use Case Highlight */}
        {content.useCase && (
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-4 sm:p-5 md:p-6 rounded-xl border border-blue-400/30 mt-4 sm:mt-6">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 flex items-center gap-2">
              {content.useCase.title}
            </h3>
            <p className="text-white/80 text-sm sm:text-base md:text-lg mb-3">
              {content.useCase.description}
            </p>
            <div className="bg-white/10 p-3 sm:p-4 rounded-lg border border-white/20">
              <p className="text-yellow-300 font-semibold text-sm sm:text-base">
                {content.useCase.scenario}
              </p>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6 md:mt-8">
          {content.keyPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-2 sm:gap-3 bg-white/5 p-3 sm:p-4 rounded-xl border border-white/10"
            >
              <div className={`mt-1 w-2 h-2 flex-shrink-0 rounded-full bg-gradient-to-r ${color}`} />
              <span className="text-white/80 text-sm sm:text-base">{point}</span>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (content.type === 'level') {
    return (
      <div className="space-y-4 sm:space-y-6 md:space-y-8">
        {/* Description */}
        <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed">
          {content.description}
        </p>

        {/* Scenario Box */}
        {content.scenario && (
          <div className="bg-gradient-to-r from-orange-500/10 to-pink-500/10 p-3 sm:p-4 md:p-5 rounded-xl border border-orange-400/20">
            <div className="space-y-2 sm:space-y-3">
              <div>
                <span className="text-orange-300 font-semibold text-sm sm:text-base">👤 User: </span>
                <span className="text-white/90 text-sm sm:text-base">"{content.scenario.user}"</span>
              </div>
              <div>
                <span className="text-pink-300 font-semibold text-sm sm:text-base">🤖 System: </span>
                <span className="text-white/90 text-sm sm:text-base">{content.scenario.system}</span>
              </div>
            </div>
          </div>
        )}

        {/* Architecture Flow */}
        <div>
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
            <Cpu className="w-4 h-4 sm:w-5 sm:h-5" />
            How It Works
          </h3>
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 sm:gap-3">
            {content.architecture.map((step, index) => (
              <div key={index} className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                <div className="bg-white/10 backdrop-blur px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-white/20 flex-1 sm:flex-initial">
                  <div className="font-semibold text-white text-xs sm:text-sm">{step.step}</div>
                  <div className="text-xs text-purple-200 mt-0.5">{step.desc}</div>
                </div>
                {index < content.architecture.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-purple-300 hidden sm:block flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Code Example */}
        <div>
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
            <Code className="w-4 h-4 sm:w-5 sm:h-5" />
            {content.example.title}
          </h3>
          <div className="bg-slate-950/50 p-3 sm:p-4 md:p-6 rounded-xl overflow-x-auto border border-white/10">
            <pre className="text-xs sm:text-sm">
              <code className="text-green-400 font-mono leading-relaxed">
                {content.example.code}
              </code>
            </pre>
          </div>
        </div>

        {/* Capabilities/Limitations */}
        <div>
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 sm:mb-4">
            {content.example.limitations ? 'Limitations' : 
             content.example.improvements ? 'Improvements' : 'Capabilities'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            {(content.example.limitations || content.example.improvements || content.example.capabilities || []).map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-2 bg-white/5 p-2.5 sm:p-3 rounded-lg border border-white/10"
              >
                <span className="text-white/90 text-xs sm:text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Demo Button */}
        {content.liveDemo && (
          <div className="flex justify-center pt-2 sm:pt-4">
            <button
              onClick={() => setActiveTab(content.liveDemo)}
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg sm:rounded-xl hover:from-purple-600 hover:to-pink-600 active:scale-95 transition-all text-sm sm:text-base"
            >
              Try Live Demo →
            </button>
          </div>
        )}
      </div>
    );
  }

  if (content.type === 'comparison') {
    return (
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="inline-block min-w-full align-middle px-4 sm:px-0">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/20">
                <th className="p-2 sm:p-3 md:p-4 text-white font-bold text-xs sm:text-sm md:text-base sticky left-0 bg-slate-900/95 backdrop-blur">Feature</th>
                <th className="p-2 sm:p-3 md:p-4 text-white font-bold text-xs sm:text-sm md:text-base">
                  Level 1<br/>
                  <span className="text-xs font-normal text-purple-200 hidden sm:inline">Simple API</span>
                </th>
                <th className="p-2 sm:p-3 md:p-4 text-white font-bold text-xs sm:text-sm md:text-base">
                  Level 2<br/>
                  <span className="text-xs font-normal text-purple-200 hidden sm:inline">Orchestration</span>
                </th>
                <th className="p-2 sm:p-3 md:p-4 text-white font-bold text-xs sm:text-sm md:text-base">
                  Level 3<br/>
                  <span className="text-xs font-normal text-purple-200 hidden sm:inline">RAG</span>
                </th>
                <th className="p-2 sm:p-3 md:p-4 text-white font-bold text-xs sm:text-sm md:text-base">
                  Level 4<br/>
                  <span className="text-xs font-normal text-purple-200 hidden sm:inline">MCP</span>
                </th>
                <th className="p-2 sm:p-3 md:p-4 text-white font-bold text-xs sm:text-sm md:text-base">
                  Level 5<br/>
                  <span className="text-xs font-normal text-purple-200 hidden sm:inline">Full Agentic</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {content.table.map((row, index) => (
                <tr key={index} className="border-b border-white/10 hover:bg-white/5">
                  <td className="p-2 sm:p-3 md:p-4 font-semibold text-purple-200 text-xs sm:text-sm sticky left-0 bg-slate-900/95 backdrop-blur">{row.feature}</td>
                  <td className="p-2 sm:p-3 md:p-4 text-white/80 text-xs sm:text-sm">{row.level1}</td>
                  <td className="p-2 sm:p-3 md:p-4 text-white/80 text-xs sm:text-sm">{row.level2}</td>
                  <td className="p-2 sm:p-3 md:p-4 text-white/80 text-xs sm:text-sm">{row.level3}</td>
                  <td className="p-2 sm:p-3 md:p-4 text-white/80 text-xs sm:text-sm">{row.level4}</td>
                  <td className="p-2 sm:p-3 md:p-4 text-white/80 font-semibold text-xs sm:text-sm">{row.level5}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-purple-300/60 text-center mt-3 sm:hidden">
          👉 Scroll horizontally to view all levels
        </p>
      </div>
    );
  }

  if (content.type === 'cta') {
    return (
      <div className="space-y-4 sm:space-y-6">
        <p className="text-base sm:text-lg md:text-xl text-white/90 text-center mb-4 sm:mb-6 md:mb-8">
          Ready to see these concepts in action? Try our interactive demos!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {content.demos.map((demo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 sm:p-5 md:p-6 rounded-xl border-2 ${
                demo.available
                  ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-400 hover:border-purple-300 cursor-pointer active:scale-95 transition-transform'
                  : 'bg-white/5 border-white/10'
              }`}
            >
              <div className="text-xs sm:text-sm font-semibold text-purple-300 mb-2">
                {demo.level}
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">
                {demo.title}
              </h3>
              <p className="text-white/70 mb-3 sm:mb-4 text-sm sm:text-base">
                {demo.description}
              </p>
              {demo.available ? (
                <button 
                  onClick={() => setActiveTab(demo.link)}
                  className="w-full py-2 sm:py-2.5 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 active:scale-95 transition-all text-sm sm:text-base"
                >
                  Try Now →
                </button>
              ) : (
                <div className="w-full py-2 sm:py-2.5 px-4 bg-white/10 text-white/50 font-semibold rounded-lg text-center text-sm sm:text-base">
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
