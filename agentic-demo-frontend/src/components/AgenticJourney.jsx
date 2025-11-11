      {/* Fixed Educational Banner for Mobile */}
      <div className="fixed top-0 left-0 right-0 z-[60] w-full">
        <div className="bg-gradient-to-r from-yellow-400/90 to-pink-400/90 text-slate-900 font-semibold text-center py-1.5 px-2 shadow-md border-b border-yellow-300/60">
          <span className="inline-flex items-center gap-2 justify-center text-xs sm:text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-pink-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z" /></svg>
            <span>
              <span className="font-bold">Agentic AI Course:</span> Step-by-step, hands-on learning. Build agentic AI apps as you go!
            </span>
          </span>
        </div>
      </div>
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
  Users,
  Play,
  Home
} from 'lucide-react';
import ContactBanner from './ContactBanner';

const AgenticJourney = ({ setActiveTab }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  
  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Scroll to top when slide changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentSlide]);

  const slides = [
    {
      level: "Course Agenda",
      title: "What You'll Learn in This Course",
      subtitle: "Your roadmap from APIs to AI agents and beyond",
      icon: Brain,
      color: "from-purple-500 to-pink-500",
      content: {
        type: "intro",
        description: "Here's what we'll cover together, step by step:",
        agenda: [
          "Start with simple APIs",
          "Add AI and data science features",
          "Use your own data (RAG)",
          "Build AI agents that use tools",
          "Work with multiple models",
          "See how to run on multi-cloud"
        ],
        audience: [
          "Beginners: No AI experience needed!",
          "Developers: See real code and hands-on demos.",
          "Business folks: Understand how agentic AI can help your work."
        ],
        keyPoints: [],
        useCase: null
      }
    },
    {
      level: "Course Intro",
      title: "Let's Get Started!",
      subtitle: "Build a smart travel planner, step by step",
      icon: Brain,
      color: "from-purple-500 to-pink-500",
      content: {
        type: "intro",
        description: "This course will show you, step by step, how to build smart AI apps. You'll start simple and add more features as you go. We'll use a travel planner example, so you can see how things work in real life.",
        agenda: null,
        keyPoints: [],
        useCase: {
          title: "🌍 What you'll build:",
          description: "A travel planner that gets smarter as you learn.",
          scenario: "Goal: By the end, you'll know how to make your own smart AI apps."
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
            description: "Experience interactive RAG pipeline",
            link: "rag",
            available: true
          },
          {
            level: "Level 4",
            title: "MCP Agents",
            description: "Watch AI select and use tools",
            link: "mcp",
            available: true
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

  // Always use crossfade for seamless transitions
  return (
    <div className="relative min-h-screen md:p-8 overflow-x-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 -z-10 animate-gradient bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-900 via-pink-900/80 to-slate-900 opacity-90" />
      {/* Floating Shapes */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 z-0 w-[600px] h-[600px] opacity-30 blur-2xl animate-float-slow" style={{background: 'radial-gradient(circle at 60% 40%, #e0aaff 0%, transparent 70%)'}} />
      <div className="pointer-events-none absolute bottom-0 right-0 z-0 w-[400px] h-[400px] opacity-20 blur-2xl animate-float" style={{background: 'radial-gradient(circle at 40% 60%, #ffd6e0 0%, transparent 70%)'}} />
      {/* Fixed Educational Banner for Mobile */}
      <div className="fixed top-0 left-0 right-0 z-[60] w-full">
        <div className="bg-gradient-to-r from-yellow-400/90 to-pink-400/90 text-slate-900 font-semibold text-center py-1.5 px-2 shadow-md border-b border-yellow-300/60">
          <span className="inline-flex items-center gap-2 justify-center text-xs sm:text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-pink-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z" /></svg>
            <span>
              <span className="font-bold">Agentic AI Course:</span> Step-by-step, hands-on learning. Build agentic AI apps as you go!
            </span>
          </span>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block max-w-6xl mx-auto mb-8">
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2 text-center drop-shadow-[0_2px_24px_rgba(168,85,247,0.45)] animate-fade-in">
          The Agentic AI Journey
        </h1>
        <p className="text-purple-200 text-center text-lg animate-fade-in delay-150">
          Interactive Learning Experience
        </p>
      </div>

      {/* Main Slide Area - Mobile App Style */}
      <div className="md:max-w-6xl md:mx-auto">
        <div className="md:hidden pb-14 px-0 flex flex-col relative min-h-[calc(100vh-12rem)]">
          <AnimatePresence mode="sync">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              className="absolute inset-0 bg-white min-h-[calc(100vh-12rem)] rounded-t-[2rem] shadow-2xl touch-pan-y select-none overflow-hidden flex flex-col"
              style={{ marginTop: '12px' }}
            >
              {/* Mobile Slide Header */}
              <div className={`bg-gradient-to-r ${currentSlideData.color} px-4 py-4 rounded-t-[2rem] flex flex-col items-center`}> 
                <div className="text-xs font-bold text-white/80 uppercase tracking-wider mb-1">
                  {currentSlideData.level}
                </div>
                <h2 className="text-2xl font-bold text-white mb-1 text-center">
                  {currentSlideData.title}
                </h2>
                <p className="text-white/90 text-sm text-center">
                  {currentSlideData.subtitle}
                </p>
              </div>

              {/* Mobile Slide Content */}
              <div className="px-4 py-4 bg-white text-gray-900 overflow-y-auto max-h-[calc(100vh-16rem)] flex-1 flex flex-col items-center justify-start">
                <SlideContent content={currentSlideData.content} color={currentSlideData.color} setActiveTab={setActiveTab} mobile={true} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Desktop View (unchanged) */}
        <div className="hidden md:block relative min-h-[500px]">
          <AnimatePresence mode="sync">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-3xl p-8 lg:p-12 border border-white/20 shadow-2xl"
            >
              {/* Desktop Slide Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className={`p-4 rounded-2xl bg-gradient-to-r ${currentSlideData.color} flex-shrink-0`}>
                  <currentSlideData.icon className="w-8 h-8 text-white" />
                </div>
                <div className="min-w-0">
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

              {/* Desktop Slide Content */}
              <SlideContent content={currentSlideData.content} color={currentSlideData.color} setActiveTab={setActiveTab} mobile={false} />
            </motion.div>
          </AnimatePresence>

          {/* Desktop Navigation */}
          <div className="mt-8 flex items-center justify-between gap-4">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                currentSlide === 0
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-white/20 text-white hover:bg-white/30 active:scale-95'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>

            <div className="flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`transition-all rounded-full ${
                    index === currentSlide
                      ? 'w-8 h-3 bg-purple-400'
                      : 'w-3 h-3 bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              disabled={currentSlide === totalSlides - 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                currentSlide === totalSlides - 1
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 active:scale-95'
              }`}
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="text-center mt-4 text-purple-200">
            Slide {currentSlide + 1} of {totalSlides}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
  <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 shadow-2xl z-50">
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold transition-all ${
              currentSlide === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-gray-700 to-gray-800 text-white active:scale-95 shadow-lg'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>

          <div className="flex gap-1.5">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`transition-all rounded-full ${
                  index === currentSlide
                    ? 'w-7 h-2 bg-gradient-to-r from-purple-500 to-pink-500'
                    : 'w-2 h-2 bg-gray-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
            className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold transition-all ${
              currentSlide === totalSlides - 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white active:scale-95 shadow-lg'
            }`}
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Slide Content Component
import { useRef } from 'react';
const SlideContent = ({ content, color, setActiveTab, mobile = false }) => {
  const mobileStyles = mobile ? {
    text: "text-gray-800",
    heading: "text-gray-900",
    card: "bg-gradient-to-br from-gray-50 to-white border border-gray-200 shadow-sm",
    highlight: "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200",
    code: "bg-gray-900 text-green-400 border-gray-800"
  } : {
    text: "text-white/90",
    heading: "text-white",
    card: "bg-white/5 border-white/10",
    highlight: "bg-gradient-to-r from-orange-500/10 to-pink-500/10 border-orange-400/20",
    code: "bg-slate-950/50 text-green-400 border-white/10"
  };

  // Typewriter effect for intro description (mobile only, first slide)
  const [typed, setTyped] = useState(mobile && content.type === 'intro' ? '' : content.description);
  const typingIndex = useRef(0);
  useEffect(() => {
    if (mobile && content.type === 'intro') {
      setTyped('');
      typingIndex.current = 0;
      const interval = setInterval(() => {
        setTyped((prev) => {
          if (typingIndex.current < content.description.length) {
            const next = content.description.slice(0, typingIndex.current + 1);
            typingIndex.current++;
            return next;
          } else {
            clearInterval(interval);
            return prev;
          }
        });
      }, 18);
      return () => clearInterval(interval);
    } else {
      setTyped(content.description);
    }
  }, [content.description, mobile, content.type]);

  if (content.type === 'intro') {
    // Glassmorphism and geometric arrangement for first slide (Course Agenda)
    const isFirstSlide = content.agenda && content.audience;
    return (
      <div className="space-y-4 sm:space-y-6 w-full">
        <p className={`text-base leading-relaxed ${mobile ? 'text-gray-700' : 'text-gray-900 md:text-lg font-semibold'} animate-fade-in`}>
          {typed}
          {mobile && typed.length < content.description.length && <span className="animate-pulse">|</span>}
        </p>
        {isFirstSlide ? (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-4 md:mt-8">
            {/* Agenda Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative backdrop-blur-3xl bg-white/60 border border-purple-200/80 shadow-2xl rounded-3xl p-6 md:p-10 flex flex-col items-start glass-card transition-all hover:scale-[1.035] hover:shadow-[0_8px_48px_rgba(168,85,247,0.18)] group overflow-hidden"
            >
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-purple-400/30 to-pink-300/20 rounded-full blur-2xl z-0 animate-float" />
              <div className="relative z-10 flex items-center gap-2 mb-3">
                <svg className="w-7 h-7 text-purple-500 drop-shadow-lg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" /></svg>
                <h3 className="font-bold text-purple-800 text-lg md:text-xl tracking-wide">Course Agenda</h3>
              </div>
              <ul className="list-disc pl-5 text-base md:text-lg text-gray-900 space-y-1 relative z-10 font-medium">
                {content.agenda.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </motion.div>
            {/* Audience Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="relative backdrop-blur-3xl bg-white/60 border border-yellow-200/80 shadow-2xl rounded-3xl p-6 md:p-10 flex flex-col items-start glass-card transition-all hover:scale-[1.035] hover:shadow-[0_8px_48px_rgba(251,191,36,0.14)] group overflow-hidden"
            >
              <div className="absolute -top-6 -left-6 w-20 h-20 bg-gradient-to-br from-yellow-300/30 to-pink-200/20 rounded-full blur-2xl z-0 animate-float" />
              <div className="relative z-10 flex items-center gap-2 mb-3">
                <svg className="w-7 h-7 text-yellow-500 drop-shadow-lg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>
                <h3 className="font-bold text-yellow-800 text-lg md:text-xl tracking-wide">Who is this for?</h3>
              </div>
              <ul className="list-disc pl-5 text-base md:text-lg text-gray-900 space-y-1 relative z-10 font-medium">
                {content.audience.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </motion.div>
          </div>
        ) : null}
        {/* Key Points as geometric glassmorphic cards */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6 md:mt-8">
          {content.keyPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.08, duration: 0.6 }}
              className="flex items-start gap-2 sm:gap-3 backdrop-blur-xl bg-white/50 border border-white/40 shadow-lg p-4 sm:p-5 rounded-2xl glass-card hover:scale-105 transition-transform"
            >
              <div className={`mt-1 w-2 h-2 flex-shrink-0 rounded-full bg-gradient-to-r ${color}`} />
              <span className="text-gray-900 text-base sm:text-lg font-semibold">{point}</span>
            </motion.div>
          ))}
        </div>
        {/* Use case card if present */}
        {content.useCase && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="backdrop-blur-3xl bg-white/60 border border-pink-200/80 shadow-2xl rounded-3xl p-6 md:p-10 flex flex-col items-start glass-card mt-4 transition-all overflow-hidden relative"
          >
            <div className="absolute -bottom-6 right-0 w-24 h-24 bg-gradient-to-br from-pink-300/30 to-purple-200/20 rounded-full blur-2xl z-0 animate-float" />
            <h3 className="text-xl md:text-2xl font-bold text-pink-800 mb-2 flex items-center gap-2 relative z-10">
              {content.useCase.title}
            </h3>
            <p className="text-gray-900 text-base md:text-lg mb-3 relative z-10 font-medium">
              {content.useCase.description}
            </p>
            <div className="bg-white/70 p-3 md:p-4 rounded-xl border border-pink-200/40 shadow-sm relative z-10">
              <p className="text-pink-800 font-semibold text-base md:text-lg">
                {content.useCase.scenario}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    );
  }

  if (content.type === 'level') {
    return (
      <div className="space-y-4 md:space-y-6">
        <p className={`text-sm md:text-base leading-relaxed ${mobileStyles.text}`}>
          {content.description}
        </p>

        {content.scenario && (
          <div className={`${mobileStyles.highlight} p-3 md:p-4 rounded-2xl border ${mobile ? 'shadow-md' : ''}`}>
            <div className="space-y-2 sm:space-y-3">
              <div>
                <span className={`${mobile ? 'text-orange-600' : 'text-orange-300'} font-semibold text-sm sm:text-base`}>👤 User: </span>
                <span className={`${mobileStyles.text} text-sm sm:text-base`}>"{content.scenario.user}"</span>
              </div>
              <div>
                <span className={`${mobile ? 'text-pink-600' : 'text-pink-300'} font-semibold text-sm sm:text-base`}>🤖 System: </span>
                <span className={`${mobileStyles.text} text-sm sm:text-base`}>{content.scenario.system}</span>
              </div>
            </div>
          </div>
        )}

        <div>
          <h3 className={`text-base md:text-lg font-bold ${mobileStyles.heading} mb-3 flex items-center gap-2`}>
            <Cpu className="w-4 h-4 sm:w-5 sm:h-5" />
            How It Works
          </h3>
          <div className="space-y-2">
            {content.architecture.map((step, index) => (
              <div key={index} className={`flex items-start gap-2 sm:gap-3 ${mobileStyles.card} px-3 py-2.5 rounded-xl border ${mobile ? 'shadow-sm' : ''}`}>
                <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r ${color} flex items-center justify-center text-white text-xs font-bold`}>
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`font-semibold ${mobileStyles.heading} text-xs sm:text-sm`}>{step.step}</div>
                  <div className={`${mobile ? 'text-gray-600' : 'text-purple-200'} text-xs mt-0.5`}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className={`text-base md:text-lg font-bold ${mobileStyles.heading} mb-3 flex items-center gap-2`}>
            <Code className="w-4 h-4 sm:w-5 sm:h-5" />
            {mobile ? 'Code Example' : content.example.title}
          </h3>
          <div className={`${mobileStyles.code} p-3 md:p-4 rounded-xl overflow-x-auto border ${mobile ? 'shadow-md' : ''}`}>
            <pre className="text-xs leading-relaxed">
              <code className="font-mono">
                {content.example.code}
              </code>
            </pre>
          </div>
        </div>

        <div>
          <h3 className={`text-base md:text-lg font-bold ${mobileStyles.heading} mb-3`}>
            {content.example.limitations ? '⚠️ Limitations' : 
             content.example.improvements ? '✨ Improvements' : '✅ Capabilities'}
          </h3>
          <div className="space-y-2">
            {(content.example.limitations || content.example.improvements || content.example.capabilities || []).map((item, index) => (
              <div
                key={index}
                className={`flex items-start gap-2 ${mobileStyles.card} p-2.5 rounded-xl border ${mobile ? 'shadow-sm' : ''}`}
              >
                <span className={`${mobileStyles.text} text-xs sm:text-sm leading-relaxed`}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {content.liveDemo && (
          <div className="flex justify-center pt-2 sm:pt-4">
            <button
              onClick={() => setActiveTab(content.liveDemo)}
              className={`px-6 py-3 ${mobile ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gradient-to-r from-purple-500 to-pink-500'} text-white font-bold rounded-2xl ${mobile ? 'shadow-lg' : ''} active:scale-95 transition-all text-sm flex items-center gap-2`}
            >
              <Play className="w-4 h-4" />
              Try Live Demo
            </button>
          </div>
        )}
      </div>
    );
  }

  if (content.type === 'comparison') {
    return (
      <div className={mobile ? 'overflow-x-auto -mx-5' : 'overflow-x-auto -mx-4 sm:mx-0'}>
        <div className={`inline-block min-w-full align-middle ${mobile ? 'px-5' : 'px-4 sm:px-0'}`}>
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className={`border-b ${mobile ? 'border-gray-300' : 'border-white/20'}`}>
                <th className={`p-2 sm:p-3 ${mobileStyles.heading} font-bold text-xs sm:text-sm sticky left-0 ${mobile ? 'bg-white z-10' : 'bg-slate-900/95 backdrop-blur'}`}>Feature</th>
                <th className={`p-2 sm:p-3 ${mobileStyles.heading} font-bold text-xs sm:text-sm`}>
                  L1<br/>
                  <span className={`text-xs font-normal ${mobile ? 'text-gray-500' : 'text-purple-200'} hidden sm:inline`}>Simple API</span>
                </th>
                <th className={`p-2 sm:p-3 ${mobileStyles.heading} font-bold text-xs sm:text-sm`}>
                  L2<br/>
                  <span className={`text-xs font-normal ${mobile ? 'text-gray-500' : 'text-purple-200'} hidden sm:inline`}>Orchestration</span>
                </th>
                <th className={`p-2 sm:p-3 ${mobileStyles.heading} font-bold text-xs sm:text-sm`}>
                  L3<br/>
                  <span className={`text-xs font-normal ${mobile ? 'text-gray-500' : 'text-purple-200'} hidden sm:inline`}>RAG</span>
                </th>
                <th className={`p-2 sm:p-3 ${mobileStyles.heading} font-bold text-xs sm:text-sm`}>
                  L4<br/>
                  <span className={`text-xs font-normal ${mobile ? 'text-gray-500' : 'text-purple-200'} hidden sm:inline`}>MCP</span>
                </th>
                <th className={`p-2 sm:p-3 ${mobileStyles.heading} font-bold text-xs sm:text-sm`}>
                  L5<br/>
                  <span className={`text-xs font-normal ${mobile ? 'text-gray-500' : 'text-purple-200'} hidden sm:inline`}>Full Agentic</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {content.table.map((row, index) => (
                <tr key={index} className={`border-b ${mobile ? 'border-gray-200 hover:bg-gray-50' : 'border-white/10 hover:bg-white/5'}`}>
                  <td className={`p-2 sm:p-3 font-semibold ${mobile ? 'text-purple-700' : 'text-purple-200'} text-xs sm:text-sm sticky left-0 ${mobile ? 'bg-white z-10' : 'bg-slate-900/95 backdrop-blur'}`}>{row.feature}</td>
                  <td className={`p-2 sm:p-3 ${mobileStyles.text} text-xs sm:text-sm`}>{row.level1}</td>
                  <td className={`p-2 sm:p-3 ${mobileStyles.text} text-xs sm:text-sm`}>{row.level2}</td>
                  <td className={`p-2 sm:p-3 ${mobileStyles.text} text-xs sm:text-sm`}>{row.level3}</td>
                  <td className={`p-2 sm:p-3 ${mobileStyles.text} text-xs sm:text-sm`}>{row.level4}</td>
                  <td className={`p-2 sm:p-3 ${mobileStyles.text} font-semibold text-xs sm:text-sm`}>{row.level5}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {mobile && (
          <p className="text-xs text-gray-500 text-center mt-3 px-5">
            👉 Scroll right to view all levels
          </p>
        )}
      </div>
    );
  }

  if (content.type === 'cta') {
    return (
      <div className="space-y-4 sm:space-y-6">
        <p className={`text-base md:text-lg ${mobileStyles.text} text-center mb-4 sm:mb-6`}>
          Ready to see these concepts in action? Try our interactive demos!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {content.demos.map((demo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 sm:p-5 rounded-2xl border-2 ${
                demo.available
                  ? mobile 
                    ? 'bg-gradient-to-br from-purple-100 to-pink-100 border-purple-400 active:scale-95 shadow-lg'
                    : 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-400 hover:border-purple-300 cursor-pointer active:scale-95 transition-transform'
                  : mobile
                    ? 'bg-gray-100 border-gray-300'
                    : 'bg-white/5 border-white/10'
              }`}
            >
              <div className={`text-xs sm:text-sm font-semibold ${mobile ? 'text-purple-700' : 'text-purple-300'} mb-2`}>
                {demo.level}
              </div>
              <h3 className={`text-lg sm:text-xl font-bold ${mobileStyles.heading} mb-2`}>
                {demo.title}
              </h3>
              <p className={`${mobile ? 'text-gray-600' : 'text-white/70'} mb-3 sm:mb-4 text-sm sm:text-base`}>
                {demo.description}
              </p>
              {demo.available ? (
                <button 
                  onClick={() => setActiveTab(demo.link)}
                  className={`w-full py-2.5 px-4 ${mobile ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-md' : 'bg-gradient-to-r from-purple-500 to-pink-500'} text-white font-bold rounded-xl active:scale-95 transition-all text-sm flex items-center justify-center gap-2`}
                >
                  <Play className="w-4 h-4" />
                  Try Now
                </button>
              ) : (
                <div className={`w-full py-2.5 px-4 ${mobile ? 'bg-gray-300 text-gray-600' : 'bg-white/10 text-white/50'} font-semibold rounded-xl text-center text-sm`}>
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
