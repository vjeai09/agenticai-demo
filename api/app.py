"""
FastAPI Backend for Personal Research Assistant
================================================

This is the main application that creates REST API endpoints
for the Personal Research Assistant demo.

FastAPI is a modern Python web framework for building APIs.
It automatically generates interactive documentation at /docs
"""

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional, Dict, Any
from datetime import datetime
import asyncio

from api.clients import WeatherAPI, NewsAPI, ExchangeRateAPI, DemoAPIOrchestrator
from api.config import settings

# Create the FastAPI application
app = FastAPI(
    title="Personal Research Assistant API",
    description="Demo API showing how external APIs work in an AI agent system",
    version="1.0.0",
    docs_url="/docs",  # Interactive API documentation
    redoc_url="/redoc"  # Alternative documentation
)

# Enable CORS (Cross-Origin Resource Sharing) for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize API clients
weather_api = WeatherAPI()
news_api = NewsAPI()
exchange_api = ExchangeRateAPI()
orchestrator = DemoAPIOrchestrator()


# Pydantic models for request/response validation
class ResearchRequest(BaseModel):
    """Request model for research endpoint"""
    city: str = Field(..., description="City name to research")
    currency: str = Field(default="USD", description="Target currency for budget")


class APIHealthResponse(BaseModel):
    """Response model for health check"""
    status: str
    timestamp: str
    configured_apis: Dict[str, bool]


# ============================================================================
# API ENDPOINTS
# ============================================================================

@app.get("/", tags=["Info"])
async def root():
    """
    Root endpoint - Welcome message
    
    Visit /docs for interactive API documentation
    """
    return {
        "message": "Welcome to Personal Research Assistant API",
        "documentation": "/docs",
        "version": "1.0.0",
        "endpoints": {
            "health": "/health",
            "weather": "/weather/{city}",
            "news": "/news",
            "exchange": "/exchange",
            "research": "/research"
        }
    }


@app.get("/health", response_model=APIHealthResponse, tags=["Info"])
async def health_check():
    """
    Health check endpoint
    
    Shows which external APIs are configured and ready to use
    """
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "configured_apis": {
            "weather": bool(settings.openweather_api_key),
            "news": bool(settings.news_api_key),
            "exchange_rate": bool(settings.exchange_rate_api_key),
            "openai": bool(settings.openai_api_key)
        }
    }


@app.get("/weather/{city}", tags=["External APIs"])
async def get_weather(
    city: str
):
    """
    Get current weather for a city
    
    **What this demonstrates:**
    - Simple GET request to external API
    - Path parameter handling
    - API key authentication
    - Error handling
    
    **External API:** OpenWeatherMap
    
    **Example:** /weather/London
    """
    result = await weather_api.get_weather(city)
    
    if "error" in result:
        raise HTTPException(status_code=500, detail=result["error"])
    
    return {
        "success": True,
        "data": result,
        "api_used": "OpenWeatherMap"
    }


@app.get("/news", tags=["External APIs"])
async def search_news(
    query: str = Query(..., description="Search query"),
    language: str = Query("en", description="Language code"),
    page_size: int = Query(5, ge=1, le=10, description="Number of results")
):
    """
    Search news articles
    
    **What this demonstrates:**
    - GET request with multiple query parameters
    - Parameter validation (page_size between 1-10)
    - Pagination
    - Data filtering and transformation
    
    **External API:** NewsAPI
    
    **Example:** /news?query=artificial%20intelligence&page_size=5
    """
    result = await news_api.search_news(query, language, page_size)
    
    if "error" in result:
        raise HTTPException(status_code=500, detail=result["error"])
    
    return {
        "success": True,
        "data": result,
        "api_used": "NewsAPI"
    }


@app.get("/exchange", tags=["External APIs"])
async def get_exchange_rate(
    from_currency: str = Query("USD", description="Base currency"),
    to_currency: str = Query("EUR", description="Target currency")
):
    """
    Get exchange rate between currencies
    
    **What this demonstrates:**
    - REST API with query parameters
    - Rate limiting considerations
    - Caching opportunities
    
    **External API:** ExchangeRate-API
    
    **Example:** /exchange?from_currency=USD&to_currency=JPY
    """
    result = await exchange_api.get_exchange_rate(from_currency, to_currency)
    
    if "error" in result:
        raise HTTPException(status_code=500, detail=result["error"])
    
    return {
        "success": True,
        "data": result,
        "api_used": "ExchangeRate-API"
    }


@app.post("/research", tags=["Orchestration"])
async def research_destination(request: ResearchRequest):
    """
    Research a travel destination (combines multiple APIs)
    
    **What this demonstrates:**
    - **API Orchestration**: Calling multiple APIs in parallel
    - **Data Aggregation**: Combining results from different sources
    - **Async Processing**: Non-blocking concurrent requests
    - **Error Handling**: Graceful degradation if one API fails
    
    This is what an AI agent would do internally when you ask:
    "Help me plan a trip to Tokyo"
    
    **APIs Used:** Weather + News + Exchange Rate (all in parallel)
    """
    result = await orchestrator.research_travel_destination(
        request.city,
        request.currency
    )
    
    return {
        "success": True,
        "data": result,
        "apis_used": ["OpenWeatherMap", "NewsAPI", "ExchangeRate-API"],
        "processing_type": "parallel_async"
    }


@app.get("/api-explanation", tags=["Info"])
async def explain_apis():
    """
    Educational endpoint explaining how APIs work
    
    Returns detailed explanation of API concepts demonstrated in this app
    """
    return {
        "what_is_an_api": {
            "definition": "API (Application Programming Interface) is a way for different software applications to communicate over the internet",
            "analogy": "Like a restaurant menu and waiter - you order (request), kitchen prepares (processes), waiter delivers (response)",
            "key_components": {
                "endpoint": "URL where you send requests (e.g., /weather/Tokyo)",
                "http_method": "Type of request - GET (fetch), POST (create), PUT (update), DELETE (remove)",
                "headers": "Metadata like authentication, content type",
                "parameters": "Additional data - query params (?city=Tokyo) or body data",
                "response": "Data returned from API, usually in JSON format",
                "status_code": "200 (success), 404 (not found), 500 (server error)"
            }
        },
        "demonstrated_concepts": {
            "simple_get_request": {
                "endpoint": "/weather/{city}",
                "explanation": "Fetches data using URL parameters",
                "example": "GET /weather/Tokyo"
            },
            "query_parameters": {
                "endpoint": "/news?query=AI&language=en&page_size=5",
                "explanation": "Multiple parameters for filtering and pagination",
                "example": "GET /news?query=AI&page_size=3"
            },
            "authentication": {
                "explanation": "API keys passed in headers or query params to verify access",
                "security": "Never expose API keys in client-side code"
            },
            "parallel_requests": {
                "endpoint": "/research",
                "explanation": "Make multiple API calls simultaneously for faster responses",
                "benefit": "3 APIs in 2 seconds instead of 6 seconds sequentially"
            },
            "error_handling": {
                "explanation": "Gracefully handle API failures, rate limits, timeouts",
                "http_codes": {
                    "200-299": "Success",
                    "400-499": "Client errors (bad request, unauthorized)",
                    "500-599": "Server errors"
                }
            }
        },
        "real_world_usage": {
            "ai_agents": "Agents use APIs to fetch real-time data, perform actions, and integrate with external services",
            "this_demo": "Shows how a research assistant combines weather, news, and currency APIs to help with travel planning",
            "next_steps": "Add more APIs (flights, hotels, restaurants) and AI (LLM) to create intelligent responses"
        }
    }


# Exception handlers
@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    """Custom error response format"""
    return {
        "success": False,
        "error": exc.detail,
        "status_code": exc.status_code
    }
