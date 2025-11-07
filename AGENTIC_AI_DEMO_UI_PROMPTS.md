# Agentic AI Demo UI - Complete Prompt Guide

## 🎯 Quick Copy-Paste Prompts for Recreating This UI

---

## 📋 Table of Contents

1. [Complete Setup Prompt](#complete-setup-prompt)
2. [Individual Component Prompts](#individual-component-prompts)
3. [Styling & Design Prompts](#styling--design-prompts)
4. [Animation & Interaction Prompts](#animation--interaction-prompts)
5. [Backend Integration Prompts](#backend-integration-prompts)
6. [Troubleshooting Prompts](#troubleshooting-prompts)

---

## 🚀 Complete Setup Prompt

### Full Stack Setup (Use this to recreate everything)

```
Create a modern Agentic AI demo application with the following specifications:

TECH STACK:
- Frontend: React 18.3.1 + Vite 5.4.6
- Styling: Tailwind CSS 3.4.11
- Animations: Framer Motion 11.5.4
- Icons: Lucide React
- HTTP Client: Axios
- Backend: FastAPI (Python) on port 8000
- Frontend Port: 3001

PROJECT STRUCTURE:
/agentic-demo-frontend/
├── src/
│   ├── components/
│   │   ├── APIDemo.jsx
│   │   ├── RAGDemo.jsx
│   │   ├── MCPDemo.jsx
│   │   ├── Navigation.jsx
│   │   └── BackgroundParticles.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js

DESIGN REQUIREMENTS:
1. Glass-morphism UI with dark gradient background (slate-950 to blue-950)
2. Animated particle background with connecting lines
3. Three main tabs: API Integration, RAG System, MCP Agents
4. Smooth tab transitions with Framer Motion
5. Interactive cards with hover effects
6. Real-time API integration demos
7. Educational content for each AI concept
8. Responsive design for all screen sizes

COLOR PALETTE:
- Background: Dark gradient from slate-950 to blue-950
- Primary: Blue (from-blue-400 to-cyan-500)
- Secondary: Purple (from-purple-400 to-pink-500)
- Accent: Orange/Red (from-orange-400 to-red-500)
- Success: Green (text-green-400)
- Error: Red (text-red-400)
- Text: White with gray variants

ANIMATION FEATURES:
- Floating particles in background with canvas
- Smooth tab switching with layout animations
- Card hover effects with scale and glow
- Loading spinners for API calls
- Success/error state animations
- Gradient animations on buttons

API INTEGRATION:
- Weather API endpoint: GET /api/weather/{city}
- News API endpoint: GET /api/news?query={query}
- Currency API endpoint: GET /api/exchange?from_currency={from}&to_currency={to}&amount={amount}
- Parallel orchestration: POST /api/research

Please create:
1. Complete package.json with all dependencies
2. Vite config with port 3001 and API proxy to localhost:8000
3. Tailwind config with custom animations
4. All React components with glass-morphism styling
5. Canvas-based particle animation background
6. Tab navigation with Framer Motion layout animations
7. Interactive API demo cards with real backend integration
8. Educational content for RAG and MCP concepts
```

---

## 🎨 Background Animation Prompt

### Animated Particle Canvas Background

```
Create an animated particle background component using HTML5 Canvas with these specifications:

COMPONENT NAME: BackgroundParticles.jsx

FEATURES:
1. Canvas covers full viewport (fixed position, inset-0, z-0)
2. Dark gradient background: bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950
3. 50 floating particles with the following properties:
   - Random positions across canvas
   - Size: 1-4px circles
   - Speed: Random slow movement (-0.5 to 0.5 pixels per frame)
   - Opacity: 0.2-0.7
   - Color: Blue (rgba(96, 165, 250, opacity))
4. Particle connections:
   - Draw lines between particles within 100px distance
   - Line opacity based on distance (closer = more visible)
   - Color: Purple (rgba(139, 92, 246, opacity))
   - Line width: 1px
5. Particles wrap around screen edges (teleport to opposite side)
6. Smooth animation using requestAnimationFrame
7. Responsive: Resize canvas on window resize

IMPLEMENTATION DETAILS:
- Use useRef for canvas element
- Use useEffect for animation setup and cleanup
- Create Particle class with update() and draw() methods
- Handle window resize events
- Clean up animation frame on component unmount

VISUAL EFFECT: Should create a subtle, mesmerizing network of moving particles that adds depth without being distracting.
```

---

## 🧩 Navigation Component Prompt

### Tab Navigation with Layout Animations

```
Create a tab navigation component with Framer Motion layout animations:

COMPONENT NAME: Navigation.jsx

TABS CONFIGURATION:
1. API Integration
   - Icon: Cloud from lucide-react
   - Description: "External API calls & orchestration"
   - Color gradient: from-blue-500 to-cyan-500
   
2. RAG System
   - Icon: Database from lucide-react
   - Description: "Retrieval-Augmented Generation"
   - Color gradient: from-purple-500 to-pink-500
   
3. MCP Agents
   - Icon: Sparkles from lucide-react
   - Description: "Model Context Protocol"
   - Color gradient: from-orange-500 to-red-500

DESIGN:
- Glass card container with padding
- Grid layout (3 columns on desktop, 1 on mobile)
- Each tab is a button with:
  - Icon + Label in center
  - Small description text below
  - Animated background gradient when active
  - Gray text when inactive, white when active
  - Smooth hover effect (scale: 1.02)
  - Press effect (scale: 0.98)

ANIMATION:
- Use Framer Motion's layoutId="activeTab" for smooth gradient sliding
- Spring animation with bounce: 0.2, duration: 0.6
- Gradient background moves from tab to tab

STYLING:
- Container: glass-card with p-2
- Buttons: px-6 py-4, rounded-xl
- Active state: Full gradient background
- Inactive state: Transparent with hover:bg-white/10

Props: { activeTab, setActiveTab }
```

---

## 🔌 API Demo Component Prompt

### Interactive API Testing Interface

```
Create an interactive API demo component with three API integration examples:

COMPONENT NAME: APIDemo.jsx

STRUCTURE:
1. Hero Section
   - Cloud icon (w-16 h-16)
   - Title: "API Integration Demo"
   - Description explaining API integration purpose
   - Glass card with centered text

2. Three API Cards (Grid layout, 3 columns):
   
   A. WEATHER API CARD
      - Icon: Cloud (blue gradient)
      - Title: "Weather API"
      - Description: "Get real-time weather data for any city"
      - Input field for city name (default: "Hyderabad")
      - Button: "Fetch Weather" (blue-cyan gradient)
      - Loading state with spinner
      - Success/error result display
      
   B. NEWS API CARD
      - Icon: Newspaper (purple gradient)
      - Title: "News API"
      - Description: "Search latest news articles"
      - Input field for search query (default: "technology")
      - Button: "Search News" (purple-pink gradient)
      - Loading state with spinner
      - Success/error result display
      
   C. CURRENCY EXCHANGE CARD
      - Icon: DollarSign (green gradient)
      - Title: "Currency Exchange"
      - Description: "Convert currency rates"
      - Three inputs: From currency, To currency, Amount
      - Button: "Convert" (green-emerald gradient)
      - Loading state with spinner
      - Success/error result display

3. Parallel Orchestration Section
   - Zap icon with yellow gradient
   - Title: "⚡ Parallel API Orchestration"
   - Description: "Execute all three APIs simultaneously"
   - Large button: "Run All APIs in Parallel" (yellow-orange-red gradient)
   - Loading state
   - Combined results display

4. How It Works Explanation
   - Glass card with 4 steps
   - Color-coded explanations
   - Icons for each step

FUNCTIONALITY:
- State management for: loading, results, errors, inputs
- API calls using axios to /api endpoints
- Input change handlers
- Success/error state rendering
- JSON result display in formatted boxes
- Loading spinners during API calls

STYLING:
- Glass cards with hover effects
- Gradient icon backgrounds (w-12 h-12, rounded-xl)
- Input fields: bg-white/5, border-white/10, rounded-lg
- Focus states: ring-2 with matching color
- Buttons: Full width, py-2/3, gradient backgrounds
- Result boxes: Green border for success, red for errors
- JSON display: Dark background with syntax highlighting

API ENDPOINTS:
- GET /api/weather/{city}
- GET /api/news?query={query}&page_size=5
- GET /api/exchange?from_currency={from}&to_currency={to}&amount={amount}
- POST /api/research (with JSON body)
```

---

## 🧠 RAG Demo Component Prompt

### Educational RAG System Showcase

```
Create an educational component explaining RAG (Retrieval-Augmented Generation):

COMPONENT NAME: RAGDemo.jsx

SECTIONS:

1. HEADER
   - Database icon (w-16 h-16, purple)
   - Title: "RAG System Demo"
   - Description: Explain RAG concept in 2-3 sentences
   - Highlighted keywords in purple
   - Info badge: "Perfect for: Knowledge bases, Documentation Q&A, Enterprise search"

2. CORE FEATURES (3 cards grid)
   - Vector Database
     * Icon: Database (blue gradient)
     * Title: "Vector Database"
     * Description: "Store and index documents as embeddings"
     * Examples: PDF docs, Knowledge bases, Code repos
     
   - Semantic Search
     * Icon: Search (purple gradient)
     * Title: "Semantic Search"
     * Description: "Find relevant information using meaning-based search"
     * Examples: Question answering, Context retrieval
     
   - LLM Integration
     * Icon: Brain (orange gradient)
     * Title: "LLM Integration"
     * Description: "Combine retrieved context with LLMs"
     * Examples: GPT-4, Claude, Llama 2

3. WORKFLOW PIPELINE (7 steps)
   - Visual step-by-step process
   - Numbered circles (1-7) with gradient backgrounds
   - Each step has title and description
   - Arrow icons between steps
   - Steps:
     1. Document Ingestion
     2. Embedding Generation
     3. Vector Storage
     4. Query Processing
     5. Similarity Search
     6. Context Augmentation
     7. Response Generation

4. REAL-WORLD USE CASES (4 cards, 2x2 grid)
   - 📚 Documentation Assistant
   - 🏢 Enterprise Knowledge Base
   - 📖 Research Assistant
   - 💼 Customer Support
   - Each with description and metrics badges

5. TECHNOLOGIES & TOOLS
   - Grid of tech badges
   - ChromaDB, Pinecone, LangChain, OpenAI Embeddings, etc.
   - Each badge has name and description

6. COMING SOON BANNER
   - Animated Zap icon
   - Title: "Interactive RAG Demo Coming Soon!"
   - Description and notify button
   - Border with purple gradient

STYLING:
- Progressive opacity and y-offset delays for animations
- Glass cards with hover effects
- Color-coded sections
- Feature bullets with green checkmarks
- Tech badges with hover effects
- Responsive grid layouts

NO API CALLS - This is educational/informational only
```

---

## 🤖 MCP Demo Component Prompt

### Model Context Protocol Explanation

```
Create an educational component explaining MCP (Model Context Protocol):

COMPONENT NAME: MCPDemo.jsx

SECTIONS:

1. HEADER
   - Sparkles icon (w-16 h-16, orange)
   - Title: "Model Context Protocol (MCP)"
   - Description: Explain MCP in 2-3 sentences
   - Highlighted keyword "MCP" in orange
   - Info badge: "Collaborative AI: Multiple specialized agents working as a team"

2. CORE CAPABILITIES (3 cards)
   - Context Management
     * Icon: MessageSquare (blue gradient)
     * Features: Memory persistence, Context windows, State tracking
     
   - Multi-Agent Orchestration
     * Icon: Workflow (purple gradient)
     * Features: Agent routing, Task delegation, Result aggregation
     
   - Tool Integration
     * Icon: Settings (orange gradient)
     * Features: API calls, Database access, File operations

3. SPECIALIZED AGENT TYPES (6 cards, 2x3 grid)
   Each card has emoji, name, description, and 3 skills:
   - 🔍 Research Agent (Blue gradient)
   - 📊 Analysis Agent (Purple gradient)
   - ✍️ Writing Agent (Green gradient)
   - 💻 Code Agent (Orange gradient)
   - 🎯 Planning Agent (Yellow gradient)
   - ✅ Validation Agent (Red gradient)

4. MCP PROTOCOL FLOW (5 phases)
   Visual flow with icons:
   - Initialization (Box icon)
   - Context Injection (MessageSquare icon)
   - Task Execution (Zap icon)
   - Result Validation (Settings icon)
   - Context Update (GitBranch icon)
   Each with gradient background and arrow indicators

5. EXAMPLE WORKFLOW
   - Title: "Multi-Agent Research Workflow"
   - 5-step workflow showing agents collaborating
   - Each step shows: number, agent name, action, output
   - Color-coded gradient for each agent type

6. BENEFITS (4 cards, 2x2 grid)
   - 🎯 Specialization
   - ⚡ Parallel Processing
   - 🔄 Flexibility
   - 🛡️ Error Handling
   Each with title and description

7. COMING SOON BANNER
   - Animated Zap icon
   - Title: "Live MCP Demo Coming Soon!"
   - Description and waitlist button
   - Border with orange gradient

STYLING:
- All elements animated with progressive delays
- Glass cards with hover effects
- Emoji icons for personality
- Color-coded agent types
- Workflow steps with numbered badges
- Gradient borders on special sections
- Responsive layouts

NO API CALLS - Educational content only
```

---

## 💅 Styling & Design Prompts

### Glass-morphism Design System

```
Create a Tailwind CSS design system with glass-morphism effects:

CUSTOM CLASSES (in index.css):

1. .glass-card
   - Background: bg-white/5 (5% white opacity)
   - Backdrop blur: backdrop-blur-xl
   - Border: border border-white/10
   - Border radius: rounded-2xl
   - Shadow: shadow-2xl

2. .glass-card-hover
   - Base: All glass-card properties
   - Transitions: transition-all duration-300
   - Hover state:
     * bg-white/10
     * border-white/20
     * shadow-xl shadow-blue-500/20
     * -translate-y-1

3. .gradient-text
   - Background: bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400
   - Text: bg-clip-text text-transparent

4. .status-dot
   - Size: w-2 h-2
   - Shape: rounded-full
   - Animation: animate-pulse

TAILWIND CONFIG EXTENSIONS:

animations:
  - gradient: Background gradient animation (8s loop)
  - float: Vertical floating (6s ease-in-out)
  - pulse-slow: Slow pulse (4s)

keyframes:
  - gradient: Shifts background position
  - float: Moves element up/down

USAGE PATTERNS:
- All main containers: glass-card
- Interactive cards: glass-card glass-card-hover
- Titles: gradient-text for colorful effect
- Buttons: gradient backgrounds with hover effects
- Status indicators: status-dot with bg-color
```

---

## 🎭 Animation Prompts

### Framer Motion Animation Patterns

```
Implement these Framer Motion animation patterns throughout the app:

1. PAGE ENTRY ANIMATIONS
   initial={{ opacity: 0, y: 20 }}
   animate={{ opacity: 1, y: 0 }}
   transition={{ duration: 0.3 }}
   
   Use for: Main sections, cards, forms

2. STAGGERED CHILDREN
   Parent: initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
   
   Children: transition={{ delay: index * 0.1 }}
   
   Use for: Grid items, list items, feature cards

3. TAB SWITCHING
   key={activeTab}
   initial={{ opacity: 0, x: 20 }}
   animate={{ opacity: 1, x: 0 }}
   exit={{ opacity: 0, x: -20 }}
   transition={{ duration: 0.3 }}
   
   Use for: Content switching between tabs

4. LAYOUT ANIMATIONS
   layoutId="activeTab"
   transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
   
   Use for: Moving highlights, sliding indicators

5. HOVER ANIMATIONS
   whileHover={{ scale: 1.02 }}
   whileTap={{ scale: 0.98 }}
   
   Use for: Buttons, interactive cards

6. LOADING STATES
   <Loader2 className="animate-spin" />
   
   Use for: API call loading indicators

7. SUCCESS/ERROR ANIMATIONS
   initial={{ opacity: 0, scale: 0.95 }}
   animate={{ opacity: 1, scale: 1 }}
   
   Use for: Result display boxes

8. DELAYED ANIMATIONS
   transition={{ delay: 0.4 + index * 0.05 }}
   
   Use for: Sequential reveals
```

---

## 🔧 Configuration Prompts

### Vite Configuration

```
Create vite.config.js with these specifications:

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

Requirements:
1. React plugin enabled
2. Dev server on port 3001
3. Proxy configuration:
   - Route: '/api'
   - Target: 'http://localhost:8000'
   - Change origin: true
   - Rewrite: Remove '/api' prefix from paths

This allows frontend to call /api/weather and it proxies to backend's /weather endpoint.
```

### Tailwind Configuration

```
Create tailwind.config.js with these extensions:

Content: 
- "./index.html"
- "./src/**/*.{js,ts,jsx,tsx}"

Theme extensions needed:
1. Custom animations:
   - gradient: 8s linear infinite background animation
   - float: 6s ease-in-out infinite vertical movement
   - pulse-slow: 4s cubic-bezier pulse

2. Custom keyframes:
   - gradient: Shifts background-position left to right
   - float: Translates Y from 0 to -20px and back

No plugins needed.
```

### Package.json

```
Create package.json for agentic-ai-demo project:

Scripts:
- dev: vite
- build: vite build
- preview: vite preview

Dependencies:
- react: ^18.3.1
- react-dom: ^18.3.1
- framer-motion: ^11.5.4
- lucide-react: ^0.441.0
- axios: ^1.7.7

DevDependencies:
- @vitejs/plugin-react: ^4.3.1
- vite: ^5.4.6
- tailwindcss: ^3.4.11
- postcss: ^8.4.45
- autoprefixer: ^10.4.20

Set "type": "module" for ES modules support.
```

---

## 🐛 Troubleshooting Prompts

### Common Issues & Solutions

```
ISSUE 1: "border-border class does not exist" error in Tailwind

SOLUTION: Remove @apply border-border from index.css
Change:
  * {
    @apply border-border;
  }
To:
  (Remove the entire * selector)

---

ISSUE 2: Vite command not found

SOLUTION: Use npx vite instead of npm run dev
Or: Install packages first with npm install --ignore-scripts --legacy-peer-deps

---

ISSUE 3: API calls failing with CORS errors

SOLUTION: 
1. Ensure backend allows CORS from localhost:3001
2. Check vite.config.js proxy is configured correctly
3. Verify backend is running on port 8000
4. Use /api prefix in frontend axios calls

---

ISSUE 4: Particles not animating

SOLUTION:
1. Check canvas ref is properly set
2. Verify requestAnimationFrame is running
3. Ensure cleanup function stops animation on unmount
4. Check browser console for canvas errors

---

ISSUE 5: Framer Motion animations not working

SOLUTION:
1. Wrap app in <AnimatePresence> for exit animations
2. Ensure motion components have unique keys
3. Check layout animations have layoutId prop
4. Verify initial, animate, exit props are set correctly

---

ISSUE 6: Glass-morphism not showing

SOLUTION:
1. Check backdrop-filter browser support
2. Verify bg-white/5 opacity is set
3. Ensure parent has non-transparent background
4. Check z-index stacking context
```

---

## 🎨 Color Palette Reference

```
BACKGROUND GRADIENTS:
- Main: from-slate-950 via-blue-950 to-slate-950
- Cards: bg-white/5 with backdrop-blur-xl

TEXT COLORS:
- Primary: text-white
- Secondary: text-gray-300
- Tertiary: text-gray-400
- Muted: text-gray-500

FEATURE COLORS:
- API Integration: from-blue-500 to-cyan-500
- RAG System: from-purple-500 to-pink-500
- MCP Agents: from-orange-500 to-red-500
- Success: text-green-400, bg-green-500/20
- Error: text-red-400, bg-red-500/20
- Warning: text-yellow-400, bg-yellow-500/20

INTERACTIVE STATES:
- Hover: bg-white/10
- Focus: ring-2 ring-blue-500
- Active: bg-white/20
- Disabled: opacity-50

BORDERS:
- Default: border-white/10
- Hover: border-white/20
- Focus: border-blue-500/50
```

---

## 🚀 Quick Start Commands

```bash
# 1. Create new React + Vite project
npm create vite@latest agentic-demo-frontend -- --template react
cd agentic-demo-frontend

# 2. Install dependencies
npm install framer-motion lucide-react axios
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 3. Configure Tailwind (add to tailwind.config.js)
content: ["./index.html", "./src/**/*.{js,jsx}"]

# 4. Add Tailwind directives to src/index.css
@tailwind base;
@tailwind components;
@tailwind utilities;

# 5. Update vite.config.js with port and proxy

# 6. Create component files in src/components/

# 7. Start dev server
npm run dev  # or npx vite

# Should run on http://localhost:3001
```

---

## 📦 Component Import Patterns

```javascript
// Standard imports for each component:

import { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { 
  Cloud, 
  Database, 
  Sparkles,
  Loader2,
  CheckCircle2,
  XCircle 
} from 'lucide-react'

// For API calls:
const API_BASE = '/api'
const response = await axios.get(`${API_BASE}/endpoint`)

// For icons with gradients:
<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 
                flex items-center justify-center">
  <Cloud className="w-6 h-6 text-white" />
</div>

// For glass cards:
<div className="glass-card glass-card-hover p-6">
  {/* Content */}
</div>

// For loading states:
{loading ? (
  <Loader2 className="w-5 h-5 animate-spin" />
) : (
  <span>Button Text</span>
)}
```

---

## 🎯 Key Features Checklist

When recreating this UI, ensure these features are included:

**Visual Design:**
- ✅ Dark gradient background (slate to blue)
- ✅ Animated particle canvas with connecting lines
- ✅ Glass-morphism cards with blur
- ✅ Gradient text effects
- ✅ Smooth transitions between tabs
- ✅ Hover effects on interactive elements
- ✅ Loading spinners for async operations
- ✅ Success/error state indicators

**Functionality:**
- ✅ Three-tab navigation system
- ✅ Real API integration with backend
- ✅ Form inputs with state management
- ✅ API call handlers with error handling
- ✅ JSON result display
- ✅ Parallel API orchestration
- ✅ Responsive layout for mobile

**Content:**
- ✅ API Demo with 3 working examples
- ✅ RAG System educational content
- ✅ MCP Agents explanation
- ✅ How It Works sections
- ✅ Use case descriptions
- ✅ Technology stack lists

**Performance:**
- ✅ Optimized animations (60fps)
- ✅ Canvas cleanup on unmount
- ✅ Debounced API calls
- ✅ Lazy loading where appropriate
- ✅ Minimal re-renders

---

## 💡 Pro Tips

1. **Start with the structure first**: Create all component files before styling
2. **Test particles alone**: Get the background animation working before adding content
3. **Build incrementally**: Complete one tab fully before moving to the next
4. **Use constants**: Store colors, API endpoints, and configurations in variables
5. **Mock data first**: Test UI with mock data before connecting real APIs
6. **Mobile-first**: Design for mobile, then enhance for desktop
7. **Accessibility**: Add aria-labels, keyboard navigation, and focus states
8. **Console logs**: Add logging for debugging API calls and state changes

---

## 📚 Additional Resources

**Framer Motion Docs:** https://www.framer.com/motion/  
**Tailwind CSS Docs:** https://tailwindcss.com/docs  
**Lucide Icons:** https://lucide.dev/  
**Vite Docs:** https://vitejs.dev/  
**Canvas API:** https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API  

---

## 🎓 Learning Path

If you're new to these technologies:

1. **Week 1:** Learn React hooks (useState, useEffect, useRef)
2. **Week 2:** Master Tailwind CSS utility classes
3. **Week 3:** Understand Framer Motion basics
4. **Week 4:** Canvas API and particle animations
5. **Week 5:** API integration with axios
6. **Week 6:** Put it all together!

---

**Created:** November 7, 2025  
**Version:** 1.0  
**For:** Agentic AI Demo UI (Port 3001)  
**Status:** ✅ Production Ready

---

_Copy any prompt above and paste it to an AI assistant to recreate this UI from scratch!_
