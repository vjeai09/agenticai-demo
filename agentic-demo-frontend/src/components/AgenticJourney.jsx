import React, { useState, useEffect } from 'react';
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
  Mail,
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
  const [isAnimating, setIsAnimating] = useState(false);
  const [prevSlideIndex, setPrevSlideIndex] = useState(null);
  const [slideDir, setSlideDir] = useState(0); // 1 forward, -1 backward
  
  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Scroll to top when slide changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentSlide]);

  // Read banner height CSS variable so we can hide the mobile header when banner is visible
  const [bannerH, setBannerH] = useState(() => {
    try {
      if (typeof window === 'undefined' || typeof getComputedStyle !== 'function') return '0px';
      return getComputedStyle(document.documentElement).getPropertyValue('--banner-h') || '0px';
    } catch {
      return '0px';
    }
  });

  useEffect(() => {
    const update = () => {
      try {
        if (typeof window === 'undefined' || typeof getComputedStyle !== 'function') {
          setBannerH('0px');
          return;
        }
        const val = getComputedStyle(document.documentElement).getPropertyValue('--banner-h') || '0px';
        setBannerH(val.trim());
      } catch {
        setBannerH('0px');
      }
    };

    update();
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
    };
  }, []);

  const slides = [
    {
      level: "Welcome",
      title: "🚀 Start Your AI Journey!",
      subtitle: "Build real AI, one step at a time.",
      icon: Brain,
      color: "from-purple-500 to-pink-500",
      content: {
        type: "intro",
        description: "👋 This is your playground. Imagine yourself building an AI that plans your dream trip—no experience needed, just curiosity! You’ll go from zero to real results, step by step. Tap next and see how easy it is!",
        keyPoints: [
          "✨ No experience needed—just curiosity!",
          "🛠️ Build a real travel planner, not just code along",
          "📈 Watch your AI level up with every slide",
          "🔓 Unlock new powers as you go"
        ],
        useCase: {
          title: "🌍 Let’s Build: Your Travel AI Sidekick",
          description: "Start simple. End up with an AI that plans your Tokyo trip. Ready to see the magic?",
          scenario: "🎯 Goal: Plan a 5-day Tokyo adventure in December"
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
    ,
    {
      level: "Contact",
      title: "Get in touch",
      subtitle: "We'd love to hear from you",
      icon: Mail,
      color: "from-slate-700 to-slate-900",
      content: {
        type: 'contact',
        email: 'vjeai.tech@gmail.com'
      }
    }
    ,
    // Success slide shown after successful contact submission
    
  ];

  const currentSlideData = slides[currentSlide];
  const totalSlides = slides.length;

  // index of the Contact slide (used by the persistent floating CTA)
  const contactSlideIndex = slides.findIndex(s => s && s.content && s.content.type === 'contact');
  const [fabMounted, setFabMounted] = React.useState(false);

  // keyboard shortcut: press 'c' to go to contact (unless typing in an input)
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key && e.key.toLowerCase() === 'c') {
        const active = document.activeElement;
        const tag = active && active.tagName && active.tagName.toLowerCase();
        const isTyping = tag === 'input' || tag === 'textarea' || active?.isContentEditable;
        if (!isTyping && contactSlideIndex >= 0) {
          e.preventDefault();
          goToSlide(contactSlideIndex);
        } else if (!isTyping && contactSlideIndex < 0) {
          // fallback: open mailto
          if (typeof window !== 'undefined') window.location.href = 'mailto:vjeai.tech@gmail.com';
        }
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [contactSlideIndex]);

  // mount the FAB with a tiny delay so the entrance animation runs after first paint
  React.useEffect(() => {
    const t = setTimeout(() => setFabMounted(true), 180);
    return () => clearTimeout(t);
  }, []);

  const nextSlide = () => {
    // Immediate, no-motion navigation for premium minimal experience
    if (currentSlide < totalSlides - 1) {
      setSlideDir(1);
      setPrevSlideIndex(currentSlide);
      setCurrentSlide(currentSlide + 1);
      setIsAnimating(true);
    }
  };

  const prevSlide = () => {
    // Immediate, no-motion navigation for premium minimal experience
    if (currentSlide > 0) {
      setSlideDir(-1);
      setPrevSlideIndex(currentSlide);
      setCurrentSlide(currentSlide - 1);
      setIsAnimating(true);
    }
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

  // Helper to navigate to a given slide index (passed into SlideContent)
  const goToSlide = (idx) => setCurrentSlide(idx);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 md:p-8" style={{ paddingTop: 'var(--banner-h, 0px)' }}>
      {/* Contact Banner */}
      <ContactBanner />
      
      {/* Mobile App-like Header (Fixed) */}
  

      {/* Desktop Header */}
      <div className="hidden md:block max-w-6xl mx-auto mb-8">
        <div className="inline-block mx-auto bg-white/6 backdrop-blur-md border border-white/10 rounded-xl px-6 py-4">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight uppercase text-center">
            The Agentic AI Journey
          </h1>
          <p className="text-purple-200 text-center text-sm mt-1">
            Interactive Learning Experience
          </p>
        </div>
      </div>

      {/* Main Slide Area - Mobile App Style */}
      <div className="md:max-w-6xl md:mx-auto">
  <div className="md:hidden pb-24 px-0">
          {/* Hybrid approach: render outgoing + incoming slides simultaneously to avoid any momentary empty frames */}
          <div
            className={`relative w-full bg-white rounded-t-[2rem] overflow-hidden shadow-2xl touch-pan-y select-none`}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            style={{ minHeight: 'calc(100vh - var(--banner-h, 0px) - var(--bottom-nav-h, 0px) - 6rem)' }}
          >
            {/* Previous slide (animates out) */}
            {prevSlideIndex !== null && slides[prevSlideIndex] && (
              <motion.div
                key={`prev-${prevSlideIndex}`}
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.12 }}
                className="absolute inset-0 z-10 bg-white touch-pan-y select-none overflow-hidden"
                style={{ willChange: 'opacity', transform: 'translateZ(0)', WebkitTransform: 'translateZ(0)' }}
              >
                <div className={`bg-gradient-to-r ${slides[prevSlideIndex].color} px-5 py-6 rounded-t-[2rem]`}>
                  <div className="text-xs font-bold text-white/80 uppercase tracking-wider mb-1">
                    {slides[prevSlideIndex].level}
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-1">
                    {slides[prevSlideIndex].title}
                  </h2>
                  <p className="text-white/90 text-sm">
                    {slides[prevSlideIndex].subtitle}
                  </p>
                </div>
                <div className="px-5 py-6 bg-white text-gray-900 overflow-y-auto" style={{ maxHeight: 'calc(100vh - var(--banner-h, 0px) - var(--bottom-nav-h, 0px) - 12rem)' }}>
                  <SlideContent content={slides[prevSlideIndex].content} color={slides[prevSlideIndex].color} setActiveTab={setActiveTab} mobile={true} />
                </div>
              </motion.div>
            )}

            {/* Current slide (animates in) */}
            <motion.div
              key={`cur-${currentSlide}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.12 }}
              onAnimationStart={() => { /* short crossfade start */ }}
              onAnimationComplete={() => { setPrevSlideIndex(null); setIsAnimating(false); }}
              className="absolute inset-0 z-20 bg-white touch-pan-y select-none overflow-hidden"
              style={{ willChange: 'opacity', transform: 'translateZ(0)', WebkitTransform: 'translateZ(0)' }}
            >
              <div className={`bg-gradient-to-r ${currentSlideData.color} px-5 py-6 rounded-t-[2rem]`}>
                <div className="text-xs font-bold text-white/80 uppercase tracking-wider mb-1">
                  {currentSlideData.level}
                </div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  {currentSlideData.title}
                </h2>
                <p className="text-white/90 text-sm">
                  {currentSlideData.subtitle}
                </p>
              </div>

              <div className="px-5 py-6 bg-white text-gray-900 overflow-y-auto" style={{ maxHeight: 'calc(100vh - var(--banner-h, 0px) - var(--bottom-nav-h, 0px) - 12rem)' }}>
                <SlideContent content={currentSlideData.content} color={currentSlideData.color} setActiveTab={setActiveTab} mobile={true} />
              </div>
            </motion.div>
          </div>
        </div>
        {/* Desktop View (short crossfade) */}
        <div className="hidden md:block">
          <motion.div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 lg:p-12 border border-white/20 shadow-2xl" key={currentSlide} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.12 }}>
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
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4 shadow-2xl z-50">
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

      {/* Persistent floating Contact FAB — hidden when Contact slide is active */}
      {typeof contactSlideIndex === 'number' && contactSlideIndex >= 0 && currentSlide !== contactSlideIndex && (
        <button
          aria-label="Contact us"
          title="Contact"
          onClick={() => {
            if (contactSlideIndex >= 0) goToSlide(contactSlideIndex);
            else if (typeof window !== 'undefined') window.location.href = 'mailto:vjeai.tech@gmail.com';
          }}
          onMouseEnter={() => setFabMounted(true)}
          className={`fixed z-60 right-4 md:right-8 bottom-[calc(var(--bottom-nav-h,0px)+1rem)] md:bottom-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full p-3 shadow-lg flex items-center justify-center active:scale-95 transition-transform ${fabMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
          style={{ transition: 'transform 260ms cubic-bezier(.2,.9,.3,1), opacity 220ms ease' }}
        >
          <Mail className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

// Slide Content Component
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

  if (content.type === 'intro') {
    return (
      <div className="space-y-4 sm:space-y-6">
        <p className={`text-base leading-relaxed ${mobile ? 'text-gray-700' : 'text-white/90 md:text-lg'}`}>
          {content.description}
        </p>
        
        {content.useCase && (
          <div className={`${mobileStyles.highlight} p-4 md:p-6 rounded-2xl border ${mobile ? 'shadow-md' : ''}`}>
            <h3 className={`text-lg md:text-xl font-bold ${mobileStyles.heading} mb-2 flex items-center gap-2`}>
              {content.useCase.title}
            </h3>
            <p className={`${mobile ? 'text-gray-600' : 'text-white/80'} text-sm md:text-base mb-3`}>
              {content.useCase.description}
            </p>
            <div className={`${mobile ? 'bg-white' : 'bg-white/10'} p-3 md:p-4 rounded-xl border ${mobile ? 'border-gray-200 shadow-sm' : 'border-white/20'}`}>
              <p className={`${mobile ? 'text-purple-700' : 'text-yellow-300'} font-semibold text-sm md:text-base`}>
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
              className={`flex items-start gap-2 sm:gap-3 ${mobileStyles.card} p-3 sm:p-4 rounded-xl ${mobile ? 'shadow-sm' : ''}`}
            >
              <div className={`mt-1 w-2 h-2 flex-shrink-0 rounded-full bg-gradient-to-r ${color}`} />
              <span className={`${mobileStyles.text} text-sm sm:text-base`}>{point}</span>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (content.type === 'level') {
    return (
      <div className={`space-y-4 md:space-y-6 ${mobile ? 'pt-3' : ''}`}>
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
          <div className="space-y-2 mt-3">
            {content.architecture.map((step, index) => (
              <div key={index} className={`flex items-start gap-2 sm:gap-3 ${mobileStyles.card} px-3 py-2.5 rounded-xl border ${mobile ? 'shadow-sm' : ''} relative z-0`}>
                <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r ${color} flex items-center justify-center text-white text-xs font-bold relative z-10`}>
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
      <div className="space-y-3 sm:space-y-6">
        <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 items-stretch">
          {content.demos.map((demo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              className={`rounded-2xl border-2 overflow-hidden shadow-sm h-full flex flex-col ${demo.available ? (mobile ? 'border-purple-300' : 'border-purple-400') : 'border-gray-200'}`}
            >
              {/* header strip uses demo-specific gradient when available */}
              {(() => {
                const headerMap = {
                  api: 'from-blue-500 to-cyan-500',
                  rag: 'from-orange-500 to-red-500',
                  mcp: 'from-violet-500 to-purple-500'
                };
                const gradient = demo.available ? (headerMap[demo.link] || 'from-purple-600 to-pink-500') : null;
                const headerClass = gradient ? `bg-gradient-to-r ${gradient} text-white` : (mobile ? 'bg-gray-100 text-gray-700' : 'bg-white/5 text-white/70');
                return (
                  <div className={`${headerClass} px-4 py-3 flex items-center justify-between gap-3`} style={{ borderTopLeftRadius: '0.75rem', borderTopRightRadius: '0.75rem' }}>
                    <div className={`text-xs font-semibold ${mobile ? (demo.available ? 'text-white' : 'text-gray-700') : (demo.available ? 'text-white' : 'text-purple-300')}`}>{demo.level}</div>
                    <div className={`text-xs ${mobile ? (demo.available ? 'text-white/90' : 'text-gray-600') : (demo.available ? 'text-white/90' : 'text-purple-200')}`}>{/* spacer */}</div>
                  </div>
                );
              })()}

              <div className={`flex flex-col p-4 ${mobile ? 'bg-white' : 'bg-transparent' } flex-1`}>
                <div>
                  <h3 className={`text-sm sm:text-lg font-bold ${mobileStyles.heading} mb-2`}>{demo.title}</h3>
                  <p className={`${mobile ? 'text-gray-600 text-xs' : 'text-white/70'} mb-3 text-xs sm:text-sm`}>{demo.description}</p>
                </div>

                <div className="mt-auto">
                  {demo.available ? (
                    <button
                      onClick={() => setActiveTab(demo.link)}
                      className={`w-full py-2 px-3 ${mobile ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-md' : 'bg-gradient-to-r from-purple-500 to-pink-500'} text-white font-bold rounded-xl active:scale-95 transition-all text-xs sm:text-sm flex items-center justify-center gap-2`}
                    >
                      <Play className="w-4 h-4" />
                      Try Now
                    </button>
                  ) : (
                    <div className={`w-full py-2.5 px-4 ${mobile ? 'bg-gray-300 text-gray-600' : 'bg-white/10 text-white/50'} font-semibold rounded-xl text-center text-sm`}>Coming Soon</div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (content.type === 'contact') {
    // Contact form: prefer Formspree when configured, otherwise fallback to mailto.
    // Provide client-side submit with success/error UI. Safe for SSR.
    const [name, setName] = useState('');
    const [emailField, setEmailField] = useState('');
    const [message, setMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

  // Try to read a Formspree endpoint from environment (popular names supported).
  // If none is configured, default to the user's provided Formspree endpoint.
  const FORM_ENDPOINT = (typeof process !== 'undefined' && (process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || process.env.REACT_APP_FORMSPREE_ENDPOINT)) || 'https://formspree.io/f/mrbrbbqb';

    const submitForm = async (e) => {
      if (e && e.preventDefault) e.preventDefault();
      setError('');

      // If no FORM_ENDPOINT is configured, fallback to mailto behavior.
      // Honeypot check (simple anti-bot)
      if (typeof window !== 'undefined') {
        const gotcha = document.querySelector('input[name="_gotcha"]')?.value || '';
        if (gotcha) {
          setError('Spam detected');
          return;
        }
      }

      if (!FORM_ENDPOINT) {
        const to = content.email || 'vjeai.tech@gmail.com';
        const subject = encodeURIComponent(name ? `Contact from ${name}` : 'Website contact');
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${emailField}\n\n${message}`);
        const mailto = `mailto:${to}?subject=${subject}&body=${body}`;
        if (typeof window !== 'undefined') window.location.href = mailto;
        return;
      }

      setSubmitting(true);
      try {
        // Post as form-encoded data (classic Formspree flow). Include honeypot field name "_gotcha".
        const params = new URLSearchParams();
        params.append('name', name || '');
        params.append('email', emailField || '');
        params.append('message', message || '');
        params.append('_gotcha', typeof window !== 'undefined' ? (document.querySelector('input[name="_gotcha"]')?.value || '') : '');

        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: params.toString()
        });

        if (res.ok) {
          setSuccess(true);
          setName(''); setEmailField(''); setMessage('');
          // navigate to success slide if provided
          if (typeof onSuccess === 'function') onSuccess();
        } else {
          const json = await res.json().catch(() => null);
          const text = json?.error || JSON.stringify(json) || await res.text();
          setError(`Submission failed (${res.status}): ${String(text).substring(0, 200)}`);
        }
      } catch (err) {
        setError(err.message || 'Network error');
      } finally {
        setSubmitting(false);
      }
    };

    return (
      <div className="space-y-4">
        <p className={`${mobile ? 'text-gray-700' : 'text-white/90'} text-base`}>Have a project or question? Send us a message.</p>

        {success ? (
          <div role="status" className="p-4 rounded-lg bg-green-50 border border-green-200 text-green-800">
            Thanks — your message was sent. We'll get back to you soon.
          </div>
        ) : null}

        {error ? (
          <div role="alert" className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-800">{error}</div>
        ) : null}

        <form onSubmit={submitForm} className="grid grid-cols-1 gap-3">
          <input
            value={name}
            onChange={(e)=>setName(e.target.value)}
            placeholder="Your name"
            name="name"
            className={`w-full p-3 rounded-xl border transition-colors ${mobile ? 'text-gray-900 placeholder-gray-500 bg-white border-gray-200 focus:ring-2 focus:ring-purple-300' : 'text-white placeholder-white/60 bg-white/5 border-white/10 focus:ring-2 focus:ring-purple-600'}`}
          />
          <input
            value={emailField}
            onChange={(e)=>setEmailField(e.target.value)}
            placeholder="Your email"
            name="email"
            className={`w-full p-3 rounded-xl border transition-colors ${mobile ? 'text-gray-900 placeholder-gray-500 bg-white border-gray-200 focus:ring-2 focus:ring-purple-300' : 'text-white placeholder-white/60 bg-white/5 border-white/10 focus:ring-2 focus:ring-purple-600'}`}
          />
          <textarea
            value={message}
            onChange={(e)=>setMessage(e.target.value)}
            placeholder="How can we help?"
            name="message"
            className={`w-full p-3 rounded-xl border h-40 transition-colors ${mobile ? 'text-gray-900 placeholder-gray-500 bg-white border-gray-200 focus:ring-2 focus:ring-purple-300' : 'text-white placeholder-white/60 bg-white/5 border-white/10 focus:ring-2 focus:ring-purple-600'}`}
          />

          {/* Honeypot field - visually hidden but present for bots */}
          <input name="_gotcha" type="text" autoComplete="off" tabIndex={-1} className="sr-only" />

          <div className="flex items-center gap-3">
            <button type="submit" disabled={submitting} className="px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold">
              {submitting ? 'Sending...' : 'Send'}
            </button>

            <a href={`mailto:${content.email || 'vjeai.tech@gmail.com'}`} className="text-sm text-white/80 underline">Or email: {content.email || 'vjeai.tech@gmail.com'}</a>
          </div>
        </form>

        {/* Hidden accessibility region for live feedback */}
        <div aria-live="polite" className="sr-only">
          {submitting ? 'Sending message' : success ? 'Message sent' : error ? `Error: ${error}` : ''}
        </div>
      </div>
    );
  }

  return null;
};

export default AgenticJourney;
