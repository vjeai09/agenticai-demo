| col1                                                                                                                                                                                              | col2 | col3 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | ---- |
| The full visual upgrade has been committed and pushed (commit hash: b77bb22). If you need to revert to the previous state, just let me know and I can help you roll back to this specific commit. |      |      |
|                                                                                                                                                                                                   |      |      |

# Personal Research Assistant API - Backend Demo

A Python FastAPI backend demonstrating how APIs work in an AI agentic system.

## 🎯 What This Demo Shows

This project demonstrates **API (Application Programming Interface)** concepts through a practical Personal Research Assistant that:

1. **Calls External APIs** - Weather, News, Currency Exchange
2. **Orchestrates Multiple APIs** - Combines data from different sources
3. **Provides REST API Endpoints** - Acts as a backend for AI agents or frontends

---

## 🧠 What is an API?

**API (Application Programming Interface)** is a way for software applications to communicate with each other over the internet.

### Real-World Analogy

Think of an API like a **restaurant**:

- 📋 **Menu** = API Documentation (what you can order)
- 👤 **You** = Client Application (making requests)
- 🍽️ **Waiter** = API Endpoint (takes your order)
- 👨‍🍳 **Kitchen** = Server (processes your request)
- 🍕 **Food** = API Response (data you receive)

### Key API Concepts Demonstrated

| Concept                    | Example in This Demo                     | Explanation                                  |
| -------------------------- | ---------------------------------------- | -------------------------------------------- |
| **Endpoint**         | `/weather/Tokyo`                       | URL where you send requests                  |
| **HTTP Methods**     | `GET`, `POST`                        | Type of request (GET = fetch, POST = create) |
| **Query Parameters** | `?city=Tokyo&units=metric`             | Extra data in URL                            |
| **Headers**          | `Authorization: Bearer token`          | Metadata (API keys, content type)            |
| **Request Body**     | `{"city": "Paris", "currency": "EUR"}` | Data sent to API (JSON format)               |
| **Response**         | `{"temperature": 22, "humidity": 65}`  | Data returned from API                       |
| **Status Codes**     | `200`, `404`, `500`                | Success/error indicators                     |

---

## 🚀 Getting Started

### Prerequisites

- Python 3.9 or higher
- pip (Python package manager)

### Installation

1. **Clone or navigate to the project directory**

```bash
cd /Users/tusshar/agenticai-demo
```

2. **Create a virtual environment** (recommended)

```bash
python -m venv venv
source venv/bin/activate  # On macOS/Linux
```

3. **Install dependencies**

```bash
pip install -r requirements.txt
```

4. **Set up environment variables**

```bash
cp .env.example .env
```

5. **Get FREE API Keys** (optional but recommended)

   - **OpenWeatherMap** (Weather data): https://openweathermap.org/api

     - Sign up → API keys → Copy your key
   - **NewsAPI** (News articles): https://newsapi.org/

     - Register → Get API Key
   - **ExchangeRate-API** (Currency): https://www.exchangerate-api.com/

     - Free tier, no credit card needed
6. **Edit `.env` file** with your API keys

```bash
OPENWEATHER_API_KEY=your_actual_key_here
NEWS_API_KEY=your_actual_key_here
EXCHANGE_RATE_API_KEY=your_actual_key_here
```

---

## 🎮 Running the Demo

### Option 1: Run the API Examples (Standalone)

This shows how individual APIs work with detailed console output:

```bash
python api_examples.py
```

**What you'll see:**

- ✅ Each API request being made
- 📊 Request details (URL, parameters, headers)
- 📥 Response data in JSON format
- 🎨 Pretty-printed, color-coded output

### Option 2: Run the FastAPI Server

This starts a web server with interactive API documentation:

```bash
python main.py
```

**What you get:**

- 🌐 Web server at: http://localhost:8000
- 📚 Interactive docs at: http://localhost:8000/docs
- 🧪 Test API endpoints directly in browser

---

## 📡 API Endpoints

Once the server is running, visit http://localhost:8000/docs for interactive documentation.

### 1. **Weather API**

```bash
GET /weather/Tokyo
```

**Demonstrates:** Simple GET request, query parameters, API key authentication

**Response:**

```json
{
  "success": true,
  "data": {
    "city": "Tokyo",
    "temperature": 22,
    "humidity": 65,
    "description": "clear sky"
  },
  "api_used": "OpenWeatherMap"
}
```

### 2. **News Search API**

```bash
GET /news?query=artificial%20intelligence&page_size=5
```

**Demonstrates:** Multiple query parameters, pagination, data filtering

**Response:**

```json
{
  "success": true,
  "data": {
    "total_results": 1250,
    "articles": [
      {
        "title": "AI Breakthrough...",
        "source": "TechCrunch",
        "url": "https://..."
      }
    ]
  },
  "api_used": "NewsAPI"
}
```

### 3. **Currency Exchange API**

```bash
GET /exchange?from_currency=USD&to_currency=JPY
```

**Demonstrates:** Currency conversion, rate limiting considerations

**Response:**

```json
{
  "success": true,
  "data": {
    "base": "USD",
    "target": "JPY",
    "rate": 149.82
  },
  "api_used": "ExchangeRate-API"
}
```

### 4. **Research Orchestration** (🌟 Most Important!)

```bash
POST /research
Body: {
  "city": "Paris",
  "currency": "EUR"
}
```

**Demonstrates:**

- ⚡ **Parallel API calls** (3 APIs called simultaneously)
- 🔄 **Data aggregation** (combining results)
- 🤖 **What an AI agent does internally**

**Response:**

```json
{
  "success": true,
  "data": {
    "destination": "Paris",
    "weather": { /* current weather */ },
    "latest_news": { /* tourism news */ },
    "currency_info": { /* USD to EUR rate */ }
  },
  "apis_used": ["OpenWeatherMap", "NewsAPI", "ExchangeRate-API"],
  "processing_type": "parallel_async"
}
```

---

## 🧪 Testing the APIs

### Using cURL (Command Line)

```bash
# Test weather
curl http://localhost:8000/weather/London

# Test news search
curl "http://localhost:8000/news?query=technology&page_size=3"

# Test exchange rate
curl "http://localhost:8000/exchange?from_currency=USD&to_currency=EUR"

# Test research (POST request)
curl -X POST http://localhost:8000/research \
  -H "Content-Type: application/json" \
  -d '{"city": "Tokyo", "currency": "JPY"}'
```

### Using the Interactive Docs

1. Start the server: `python main.py`
2. Open: http://localhost:8000/docs
3. Click on any endpoint → "Try it out" → Fill parameters → "Execute"
4. See real-time request/response!

---

## 📚 Code Structure

```
agenticai-demo/
├── main.py              # FastAPI application with REST endpoints
├── api_examples.py      # Individual API clients with detailed comments
├── config.py            # Configuration and environment variables
├── requirements.txt     # Python dependencies
├── .env.example         # Template for environment variables
└── README.md           # This file
```

### Key Files Explained

**`api_examples.py`** - Shows how to:

- Make HTTP GET requests
- Handle authentication with API keys
- Parse JSON responses
- Handle errors and timeouts
- Make parallel API calls

**`main.py`** - Shows how to:

- Create REST API endpoints with FastAPI
- Validate request/response data with Pydantic
- Generate automatic API documentation
- Handle CORS for frontend integration
- Orchestrate multiple APIs

---

## 🎓 Learning Path

### For Beginners:

1. Run `python api_examples.py` to see APIs in action
2. Read the detailed comments in `api_examples.py`
3. Visit the `/api-explanation` endpoint for concepts

### For Intermediate:

1. Start the FastAPI server: `python main.py`
2. Test endpoints using the interactive docs
3. Modify `main.py` to add new endpoints
4. Try adding a new external API

### For Advanced:

1. Study the parallel API orchestration in `/research` endpoint
2. Add error handling and retry logic
3. Implement caching with Redis
4. Add rate limiting
5. Integrate with an LLM (OpenAI GPT) for AI responses

---

## 🔮 Next Steps (Future Demos)

This is **Part 1: APIs**. Coming next:

- **Part 2: MCP (Model Context Protocol)** - Tool use, file operations, agent actions
- **Part 3: RAG (Retrieval Augmented Generation)** - Vector databases, embeddings, semantic search
- **Part 4: Advanced RAG** - Reranking, hybrid search, query rewriting
- **Part 5: Multi-Agent System** - Orchestrating multiple AI agents

---

## ❓ FAQ

**Q: Do I need API keys to run this?**
A: The code will run without API keys but will return error messages. Get free keys to see real data.

**Q: Why FastAPI instead of Flask?**
A: FastAPI provides automatic API documentation, built-in data validation, and native async support - perfect for modern AI systems.

**Q: How does this relate to AI agents?**
A: AI agents use APIs to fetch real-time data and perform actions. This demo shows the "tools" an agent would call internally.

**Q: Can I use this in production?**
A: This is a demo/learning project. For production, add: authentication, rate limiting, caching, error logging, monitoring.

---

## 🤝 Contributing

This is an educational demo. Feel free to:

- Add more API integrations
- Improve error handling
- Add tests
- Enhance documentation

---

## 📄 License

MIT License - Free to use for learning and teaching.

---

## 🎉 What You've Learned

By running this demo, you now understand:

- ✅ What APIs are and how they work
- ✅ HTTP methods, endpoints, and status codes
- ✅ Authentication with API keys
- ✅ Query parameters and request bodies
- ✅ Async/parallel API calls
- ✅ API orchestration (combining multiple APIs)
- ✅ Building REST APIs with FastAPI
- ✅ How AI agents use APIs internally

**Next:** Let's add MCP (Model Context Protocol) to give agents more powerful tools!

---

**Made with ❤️ for AI learners worldwide**
