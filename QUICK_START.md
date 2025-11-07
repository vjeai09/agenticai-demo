# 🎯 API Demo - Quick Start Guide

## ✅ What We've Built

A **Personal Research Assistant Backend** that demonstrates how APIs work in real-world applications.

## 🚀 Server is Running!

Your FastAPI server is now live at:
- **API Server:** http://localhost:8000
- **Interactive Docs:** http://localhost:8000/docs ← Open this in your browser!

## 📚 What is an API? (Simple Explanation)

**API = Application Programming Interface**

It's like a **waiter in a restaurant**:
1. You (client) → Ask for something (request)
2. Waiter (API) → Takes order to kitchen (server)
3. Kitchen → Prepares food (processes data)
4. Waiter → Brings food back (response)

### Real Example from Our Demo:

```
YOU:      "What's the weather in Tokyo?"
          ↓
API:      GET http://api.weather.com/tokyo
          ↓
SERVER:   { "temperature": 22, "condition": "sunny" }
          ↓
YOU:      Gets the answer!
```

## 🎮 Try It Now!

### Option 1: Interactive Docs (Easiest!)

1. Open: http://localhost:8000/docs
2. Click on any endpoint (e.g., `/weather/{city}`)
3. Click "Try it out"
4. Enter a city name: `Tokyo`
5. Click "Execute"
6. See the result!

### Option 2: Command Line (cURL)

```bash
# Test the root endpoint
curl http://localhost:8000/

# Test weather API (will show "not configured" without API key)
curl http://localhost:8000/weather/Tokyo

# Test the API explanation
curl http://localhost:8000/api-explanation
```

### Option 3: Python Script

```python
import requests

# Call your API
response = requests.get("http://localhost:8000/weather/London")
print(response.json())
```

## 🔑 Getting API Keys (Optional but Recommended)

To see **real data** instead of error messages:

### 1. OpenWeatherMap (Weather)
- Go to: https://openweathermap.org/api
- Sign up (free)
- Copy your API key
- Add to `.env`: `OPENWEATHER_API_KEY=your_key_here`

### 2. NewsAPI (News Articles)
- Go to: https://newsapi.org/
- Register (free)
- Get your API key
- Add to `.env`: `NEWS_API_KEY=your_key_here`

### 3. ExchangeRate-API (Currency)
- Go to: https://www.exchangerate-api.com/
- Free tier, no credit card
- Get API key
- Add to `.env`: `EXCHANGE_RATE_API_KEY=your_key_here`

## 📡 Available Endpoints

### 1. **GET /** - Welcome
```bash
curl http://localhost:8000/
```
Returns info about the API

### 2. **GET /health** - Health Check
```bash
curl http://localhost:8000/health
```
Shows which APIs are configured

### 3. **GET /weather/{city}** - Weather Data
```bash
curl http://localhost:8000/weather/Paris
```
Shows current weather for a city

### 4. **GET /news** - Search News
```bash
curl "http://localhost:8000/news?query=AI&page_size=3"
```
Search news articles by keyword

### 5. **GET /exchange** - Currency Exchange
```bash
curl "http://localhost:8000/exchange?from_currency=USD&to_currency=EUR"
```
Get exchange rates between currencies

### 6. **POST /research** - Combined Research ⭐
```bash
curl -X POST http://localhost:8000/research \
  -H "Content-Type: application/json" \
  -d '{"city": "Tokyo", "currency": "JPY"}'
```
**This is the most important!** Shows how to combine multiple APIs in parallel.

### 7. **GET /api-explanation** - Learn More
```bash
curl http://localhost:8000/api-explanation
```
Detailed explanation of API concepts

## 🧠 Key Concepts Demonstrated

### 1. **HTTP Methods**
- `GET` → Fetch data (like searching)
- `POST` → Send data (like submitting a form)

### 2. **Endpoints**
- `/weather/Tokyo` → Path parameter (part of URL)
- `/news?query=AI` → Query parameter (after `?`)

### 3. **Request Flow**
```
Client → HTTP Request → Server → Process → Response → Client
```

### 4. **Response Format (JSON)**
```json
{
  "success": true,
  "data": {
    "temperature": 22,
    "city": "Tokyo"
  }
}
```

### 5. **Status Codes**
- `200` → Success
- `404` → Not Found
- `500` → Server Error

### 6. **Parallel API Calls** (Most Important!)
Instead of:
```
Weather (2s) → News (2s) → Currency (2s) = 6 seconds total
```

We do:
```
Weather (2s) ┐
News (2s)    ├→ All at once = 2 seconds total!
Currency (2s)┘
```

This is what the `/research` endpoint does!

## 🎓 How This Relates to AI Agents

When you ask an AI agent: **"Help me plan a trip to Paris"**

The agent internally:
1. **Calls Weather API** → Gets current weather
2. **Calls News API** → Finds latest travel news
3. **Calls Flight API** → Searches flights
4. **Calls Hotel API** → Finds accommodations
5. **Uses LLM** → Combines all data into a helpful response

**Our demo shows steps 1-3!** (Without the LLM part yet)

## 📂 Project Files

```
agenticai-demo/
├── main.py              ← FastAPI server (your API)
├── api_examples.py      ← External API clients
├── config.py            ← Configuration
├── .env                 ← Your API keys
├── requirements.txt     ← Dependencies
└── README.md           ← Full documentation
```

## 🔥 Next Steps

1. **Play with the interactive docs** at http://localhost:8000/docs
2. **Add your API keys** to see real data
3. **Study `api_examples.py`** to understand how APIs work
4. **Modify `main.py`** to add new endpoints
5. **Next Demo:** Add MCP (Model Context Protocol) for agent tools!

## 🆘 Troubleshooting

**Server not starting?**
```bash
# Check if port 8000 is in use
lsof -ti:8000 | xargs kill -9

# Restart server
python main.py
```

**Getting errors?**
- Without API keys, you'll see "not configured" messages
- This is normal! Add real API keys to see actual data

**Want to stop the server?**
- Press `Ctrl+C` in the terminal

## 🎉 What You've Learned

✅ What APIs are and how they work  
✅ HTTP methods (GET, POST)  
✅ Endpoints and parameters  
✅ Request/response cycle  
✅ JSON data format  
✅ API authentication  
✅ Parallel API calls  
✅ Building REST APIs with FastAPI  
✅ How AI agents use APIs internally  

**Congratulations!** You now understand the foundation of how AI agents interact with the world! 🚀

---

**Next Demo:** MCP (Model Context Protocol) - Giving agents powerful tools to take actions!
