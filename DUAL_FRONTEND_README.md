# Dual Frontend Setup - Agentic AI Demo Project

This project now includes **TWO separate frontend applications** running simultaneously:

## 🌐 Frontend Applications

### 1. **Agentic AI Demo Frontend** (Port 3001)
**Location:** `/agentic-demo-frontend/`  
**URL:** http://localhost:3001  
**Purpose:** Educational showcase of Agentic AI concepts

#### Features:
- 🔌 **API Integration Demo** - Live demonstration of weather, news, and currency APIs
- 🧠 **RAG System Explanation** - Comprehensive guide to Retrieval-Augmented Generation
- 🤖 **MCP Agents Overview** - Model Context Protocol and multi-agent systems
- Interactive demos with real API calls
- Educational content about AI technologies
- Modern glass-morphism UI design

---

### 2. **S V Banquet Halls Website** (Port 3000)
**Location:** `/frontend-app/`  
**URL:** http://localhost:3000  
**Purpose:** Business website for banquet hall bookings in Hyderabad

#### Features:
- 📅 **Smart Booking System** - AI-powered booking inquiry form
- 🏛️ **Venue Showcase** - Three premium venues with detailed info
- 💎 **Services & Packages** - Complete event planning services
- Professional business branding
- Real business contact information
- SEO-optimized meta tags

---

## 🚀 Quick Start

### Start Both Frontends

#### Option 1: Manual Start (Recommended)

**Terminal 1 - Agentic AI Demo (Port 3001):**
```bash
cd agentic-demo-frontend
npx vite
```

**Terminal 2 - S V Banquet Halls (Port 3000):**
```bash
cd frontend-app
npm run dev
```

**Terminal 3 - Backend API (Port 8000):**
```bash
# Activate virtual environment first
source .venv/bin/activate
python main.py
```

#### Option 2: Start Script (Creates one terminal for all)
```bash
chmod +x start-all.sh
./start-all.sh
```

---

## 📂 Project Structure

```
agenticai-demo/
├── api/                          # Backend FastAPI application
│   ├── app.py                    # Main API routes
│   ├── clients.py                # External API integrations
│   └── config.py                 # Environment configuration
│
├── agentic-demo-frontend/        # AI DEMO FRONTEND (Port 3001)
│   ├── src/
│   │   ├── components/
│   │   │   ├── APIDemo.jsx       # Interactive API testing
│   │   │   ├── RAGDemo.jsx       # RAG system explanation
│   │   │   ├── MCPDemo.jsx       # MCP agents overview
│   │   │   ├── Navigation.jsx    # Tab navigation
│   │   │   └── BackgroundParticles.jsx
│   │   ├── App.jsx               # Main app component
│   │   ├── main.jsx              # React entry point
│   │   └── index.css             # Global styles
│   ├── index.html                # HTML template
│   ├── package.json              # Dependencies
│   ├── vite.config.js            # Vite config (port 3001)
│   └── tailwind.config.js        # Tailwind config
│
├── frontend-app/                 # BANQUET HALLS WEBSITE (Port 3000)
│   ├── src/
│   │   ├── components/
│   │   │   ├── BanquetBookingDemo.jsx   # Booking form
│   │   │   ├── VenuesDemo.jsx           # Venue showcase
│   │   │   ├── ServicesDemo.jsx         # Services listing
│   │   │   ├── Navigation.jsx           # Tab navigation
│   │   │   └── BackgroundParticles.jsx
│   │   ├── App.jsx               # Main app component
│   │   ├── main.jsx              # React entry point
│   │   └── index.css             # Global styles
│   ├── index.html                # HTML template
│   ├── package.json              # Dependencies
│   ├── vite.config.js            # Vite config (port 3000)
│   └── tailwind.config.js        # Tailwind config
│
├── main.py                       # Backend entry point
├── requirements.txt              # Python dependencies
├── .env                          # API keys (gitignored)
└── README.md                     # This file
```

---

## 🔌 API Endpoints (Port 8000)

Both frontends connect to the same backend API:

- `GET /` - Welcome message
- `GET /health` - System health check
- `GET /weather/{city}` - Get weather data
- `GET /news?query={query}` - Search news articles
- `GET /exchange` - Currency conversion
- `POST /research` - Parallel API orchestration
- `GET /api-explanation` - API documentation

API Documentation: http://localhost:8000/docs

---

## 🎨 Design Differences

### Agentic AI Demo (3001)
- **Theme:** Educational & Technical
- **Colors:** Blue, Purple, Orange gradients
- **Navigation:** API Integration | RAG System | MCP Agents
- **Target Audience:** Developers, AI enthusiasts
- **Content:** Technical explanations, demos, code examples

### S V Banquet Halls (3000)
- **Theme:** Business & Professional
- **Colors:** Blue, Purple, Pink gradients
- **Navigation:** Book Now | Our Venues | Services
- **Target Audience:** Event planners, customers
- **Content:** Booking forms, venue details, pricing

---

## 🛠️ Technology Stack

### Frontend (Both)
- React 18.3.1
- Vite 5.4.6
- Tailwind CSS 3.4.11
- Framer Motion 11.5.4
- Lucide React (icons)
- Axios (HTTP client)

### Backend
- Python 3.13.5
- FastAPI
- Uvicorn
- httpx (async HTTP)
- pydantic-settings

### External APIs
- OpenWeatherMap API
- NewsAPI
- ExchangeRate-API

---

## 🔧 Configuration

### Port Configuration

**Agentic AI Demo:**
```javascript
// agentic-demo-frontend/vite.config.js
server: {
  port: 3001,
  proxy: {
    '/api': 'http://localhost:8000'
  }
}
```

**S V Banquet Halls:**
```javascript
// frontend-app/vite.config.js
server: {
  port: 3000,
  proxy: {
    '/api': 'http://localhost:8000'
  }
}
```

### Environment Variables
```bash
# .env file
OPENWEATHER_API_KEY=your_key_here
NEWS_API_KEY=your_key_here
EXCHANGE_RATE_API_KEY=your_key_here
```

---

## 📱 Access URLs

| Service | URL | Purpose |
|---------|-----|---------|
| **Agentic AI Demo** | http://localhost:3001 | Educational AI showcase |
| **S V Banquet Halls** | http://localhost:3000 | Business website |
| **Backend API** | http://localhost:8000 | REST API server |
| **API Docs** | http://localhost:8000/docs | OpenAPI documentation |

---

## 🚨 Troubleshooting

### Port Already in Use
```bash
# Find and kill process on port 3001
lsof -ti:3001 | xargs kill -9

# Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Find and kill process on port 8000
lsof -ti:8000 | xargs kill -9
```

### npm Installation Issues
```bash
# Use these flags if installation fails
npm install --ignore-scripts --legacy-peer-deps
```

### Vite Not Found
```bash
# Use npx to run vite
npx vite

# Or install globally
npm install -g vite
```

### Backend Not Responding
```bash
# Make sure virtual environment is activated
source .venv/bin/activate

# Restart backend
python main.py
```

---

## 📊 Feature Comparison

| Feature | Agentic AI Demo | S V Banquet Halls |
|---------|----------------|-------------------|
| **API Demos** | ✅ Interactive | ❌ Not needed |
| **Booking Form** | ❌ N/A | ✅ Full featured |
| **Educational Content** | ✅ Extensive | ❌ Minimal |
| **Business Info** | ❌ N/A | ✅ Complete |
| **Venue Details** | ❌ N/A | ✅ 3 venues |
| **Pricing** | ❌ N/A | ✅ 3 packages |
| **Contact Info** | ❌ Generic | ✅ Real business |
| **SEO Optimization** | ✅ Basic | ✅ Business-focused |

---

## 🔄 Switching Between Frontends

### Development Workflow

1. **For AI Demo Development:**
   - Work in `/agentic-demo-frontend/`
   - Access at http://localhost:3001
   - Test API features and educational content

2. **For Business Website Development:**
   - Work in `/frontend-app/`
   - Access at http://localhost:3000
   - Test booking forms and business features

3. **Both Running Simultaneously:**
   - Keep both servers running
   - Switch between browser tabs
   - Share same backend API

---

## 📝 Development Notes

### Adding Features to AI Demo
```bash
cd agentic-demo-frontend/src/components
# Edit APIDemo.jsx, RAGDemo.jsx, or MCPDemo.jsx
```

### Adding Features to Business Site
```bash
cd frontend-app/src/components
# Edit BanquetBookingDemo.jsx, VenuesDemo.jsx, or ServicesDemo.jsx
```

### Modifying Shared Backend
```bash
cd api
# Edit app.py for new endpoints
# Edit clients.py for new API integrations
```

---

## 🎯 Use Cases

### Agentic AI Demo (Port 3001)
- **Educational presentations**
- **Developer training**
- **AI concept demonstrations**
- **Portfolio showcase**
- **Technical workshops**

### S V Banquet Halls (Port 3000)
- **Business operations**
- **Customer bookings**
- **Venue marketing**
- **Event inquiries**
- **Production website**

---

## 🚀 Deployment Options

### Deploy Both Separately
- **AI Demo:** Vercel/Netlify → demo.yourdomain.com
- **Business Site:** Vercel/Netlify → www.svbanquethalls.com
- **Backend:** Railway/Render → api.yourdomain.com

### Deploy One or Both
You can choose to deploy:
- Only the AI demo (for portfolio)
- Only the business site (for production)
- Both sites (for comprehensive showcase)

---

## 📚 Documentation

- **Backend API:** See `README.md` in root
- **Frontend Setup:** See `FRONTEND_GUIDE.md`
- **Prompt Templates:** See `FRONTEND_PROMPTS.md`
- **Quick Reference:** See `QUICK_PROMPTS.md`
- **Business Site:** See `SV_BANQUET_README.md`

---

## 🤝 Contributing

1. Choose which frontend to work on
2. Make changes in respective directory
3. Test thoroughly on correct port
4. Ensure backend compatibility
5. Update relevant documentation

---

## 📄 License

© 2025 - Dual Frontend Setup
- Agentic AI Demo: Portfolio/Educational use
- S V Banquet Halls: Business application

---

**Built with ❤️ using React, FastAPI, and Modern Web Technologies**
