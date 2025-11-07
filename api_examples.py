"""
API Examples Module
===================

This module demonstrates how to interact with external APIs.
Each class shows a different API integration with clear explanations.

WHAT IS AN API?
---------------
API (Application Programming Interface) is a way for different software
applications to communicate with each other over the internet.

Think of it like a restaurant:
- You (the client) look at a menu (API documentation)
- You make a request (API call) to the waiter (API endpoint)
- The kitchen (server) prepares your order (processes request)
- The waiter brings your food (API response)

KEY API CONCEPTS:
1. Endpoint: The URL where you send requests (e.g., api.weather.com/current)
2. HTTP Methods: GET (fetch data), POST (create), PUT (update), DELETE (remove)
3. Headers: Metadata about the request (authentication, content type)
4. Request Body: Data you send to the API (for POST/PUT)
5. Response: Data the API sends back (usually JSON format)
6. Status Codes: 200 (success), 404 (not found), 500 (server error)
"""

import httpx
import asyncio
from typing import Dict, Any, Optional
from datetime import datetime
from config import settings
from rich.console import Console
from rich.panel import Panel
from rich.json import JSON

console = Console()


class WeatherAPI:
    """
    OpenWeatherMap API Integration
    
    Demonstrates: GET requests, query parameters, API keys
    Free tier: https://openweathermap.org/api
    """
    
    BASE_URL = "https://api.openweathermap.org/data/2.5"
    
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or settings.openweather_api_key
        
    async def get_weather(self, city: str) -> Dict[str, Any]:
        """
        Fetch current weather for a city
        
        API Endpoint: GET /weather
        Parameters:
            - q: city name
            - appid: API key for authentication
            - units: metric/imperial
        
        Returns:
            Dictionary with weather data
        """
        if not self.api_key:
            return {"error": "OpenWeather API key not configured"}
        
        # Build the complete URL with query parameters
        endpoint = f"{self.BASE_URL}/weather"
        params = {
            "q": city,
            "appid": self.api_key,
            "units": "metric"  # Use Celsius
        }
        
        console.print(f"\n[bold blue]📡 Making API Request:[/bold blue]")
        console.print(f"URL: {endpoint}")
        console.print(f"Method: GET")
        console.print(f"Parameters: {params}")
        
        # Make the HTTP GET request
        async with httpx.AsyncClient() as client:
            try:
                response = await client.get(endpoint, params=params, timeout=10.0)
                
                console.print(f"\n[bold green]✅ API Response:[/bold green]")
                console.print(f"Status Code: {response.status_code}")
                
                response.raise_for_status()  # Raise exception for 4xx/5xx
                data = response.json()
                
                # Extract relevant information
                result = {
                    "city": data.get("name"),
                    "country": data.get("sys", {}).get("country"),
                    "temperature": data.get("main", {}).get("temp"),
                    "feels_like": data.get("main", {}).get("feels_like"),
                    "humidity": data.get("main", {}).get("humidity"),
                    "description": data.get("weather", [{}])[0].get("description"),
                    "wind_speed": data.get("wind", {}).get("speed"),
                    "timestamp": datetime.now().isoformat()
                }
                
                return result
                
            except httpx.HTTPStatusError as e:
                console.print(f"[bold red]❌ HTTP Error: {e.response.status_code}[/bold red]")
                return {"error": f"API returned error: {e.response.status_code}"}
            except httpx.RequestError as e:
                console.print(f"[bold red]❌ Request Error: {str(e)}[/bold red]")
                return {"error": f"Failed to connect: {str(e)}"}


class NewsAPI:
    """
    NewsAPI Integration
    
    Demonstrates: GET requests with multiple parameters, pagination
    Free tier: https://newsapi.org/
    """
    
    BASE_URL = "https://newsapi.org/v2"
    
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or settings.news_api_key
    
    async def search_news(self, query: str, language: str = "en", page_size: int = 5) -> Dict[str, Any]:
        """
        Search news articles by keyword
        
        API Endpoint: GET /everything
        Parameters:
            - q: search query
            - apiKey: authentication
            - language: article language
            - pageSize: number of results
            - sortBy: relevancy/popularity/publishedAt
        """
        if not self.api_key:
            return {"error": "News API key not configured"}
        
        endpoint = f"{self.BASE_URL}/everything"
        params = {
            "q": query,
            "apiKey": self.api_key,
            "language": language,
            "pageSize": page_size,
            "sortBy": "relevancy"
        }
        
        console.print(f"\n[bold blue]📡 Making API Request:[/bold blue]")
        console.print(f"URL: {endpoint}")
        console.print(f"Method: GET")
        console.print(f"Query: {query}")
        
        async with httpx.AsyncClient() as client:
            try:
                response = await client.get(endpoint, params=params, timeout=10.0)
                console.print(f"\n[bold green]✅ Response Status: {response.status_code}[/bold green]")
                
                response.raise_for_status()
                data = response.json()
                
                # Extract article summaries
                articles = []
                for article in data.get("articles", [])[:page_size]:
                    articles.append({
                        "title": article.get("title"),
                        "source": article.get("source", {}).get("name"),
                        "author": article.get("author"),
                        "description": article.get("description"),
                        "url": article.get("url"),
                        "published_at": article.get("publishedAt")
                    })
                
                return {
                    "total_results": data.get("totalResults"),
                    "articles": articles,
                    "query": query
                }
                
            except httpx.HTTPStatusError as e:
                console.print(f"[bold red]❌ HTTP Error: {e.response.status_code}[/bold red]")
                return {"error": f"API error: {e.response.status_code}"}
            except httpx.RequestError as e:
                console.print(f"[bold red]❌ Request Error: {str(e)}[/bold red]")
                return {"error": f"Connection failed: {str(e)}"}


class ExchangeRateAPI:
    """
    ExchangeRate API Integration
    
    Demonstrates: Simple REST API, rate limiting, caching
    Free tier: https://www.exchangerate-api.com/
    """
    
    BASE_URL = "https://v6.exchangerate-api.com/v6"
    
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or settings.exchange_rate_api_key
    
    async def get_exchange_rate(self, from_currency: str = "USD", to_currency: str = "EUR") -> Dict[str, Any]:
        """
        Get exchange rate between two currencies
        
        API Endpoint: GET /latest/{base_currency}
        Returns: Conversion rates for all currencies
        """
        if not self.api_key:
            return {"error": "Exchange Rate API key not configured"}
        
        endpoint = f"{self.BASE_URL}/{self.api_key}/latest/{from_currency}"
        
        console.print(f"\n[bold blue]📡 Making API Request:[/bold blue]")
        console.print(f"URL: {endpoint}")
        console.print(f"Converting: {from_currency} → {to_currency}")
        
        async with httpx.AsyncClient() as client:
            try:
                response = await client.get(endpoint, timeout=10.0)
                console.print(f"\n[bold green]✅ Response Status: {response.status_code}[/bold green]")
                
                response.raise_for_status()
                data = response.json()
                
                if data.get("result") == "success":
                    rates = data.get("conversion_rates", {})
                    return {
                        "base": from_currency,
                        "target": to_currency,
                        "rate": rates.get(to_currency),
                        "last_update": data.get("time_last_update_utc"),
                        "all_rates": rates  # All available currency rates
                    }
                else:
                    return {"error": "Failed to fetch exchange rates"}
                    
            except httpx.HTTPStatusError as e:
                console.print(f"[bold red]❌ HTTP Error: {e.response.status_code}[/bold red]")
                return {"error": f"API error: {e.response.status_code}"}
            except httpx.RequestError as e:
                console.print(f"[bold red]❌ Request Error: {str(e)}[/bold red]")
                return {"error": f"Connection failed: {str(e)}"}


class DemoAPIOrchestrator:
    """
    Orchestrates multiple API calls to demonstrate how APIs work together
    in a real-world research assistant
    """
    
    def __init__(self):
        self.weather_api = WeatherAPI()
        self.news_api = NewsAPI()
        self.exchange_api = ExchangeRateAPI()
    
    async def research_travel_destination(self, city: str, budget_currency: str = "USD") -> Dict[str, Any]:
        """
        Combine multiple APIs to research a travel destination
        
        This demonstrates:
        1. Parallel API calls (making multiple requests at once)
        2. Combining data from different sources
        3. Error handling across services
        """
        console.print(Panel.fit(
            f"[bold cyan]🔍 Researching Travel Destination: {city}[/bold cyan]",
            border_style="cyan"
        ))
        
        # Make all API calls in parallel for efficiency
        weather_task = self.weather_api.get_weather(city)
        news_task = self.news_api.search_news(f"{city} travel OR tourism", page_size=3)
        exchange_task = self.exchange_api.get_exchange_rate("USD", budget_currency)
        
        # Wait for all to complete
        weather_data, news_data, exchange_data = await asyncio.gather(
            weather_task, news_task, exchange_task
        )
        
        # Combine the results
        result = {
            "destination": city,
            "weather": weather_data,
            "latest_news": news_data,
            "currency_info": exchange_data,
            "research_timestamp": datetime.now().isoformat()
        }
        
        return result


# Example usage and testing
async def demo_apis():
    """
    Run a demonstration of all API integrations
    """
    console.print("\n[bold magenta]═══════════════════════════════════════════[/bold magenta]")
    console.print("[bold magenta]    API DEMONSTRATION - Personal Research Assistant[/bold magenta]")
    console.print("[bold magenta]═══════════════════════════════════════════[/bold magenta]\n")
    
    orchestrator = DemoAPIOrchestrator()
    
    # Example 1: Weather API
    console.print(Panel("[bold]Example 1: Weather API (GET Request)[/bold]", style="blue"))
    weather = await orchestrator.weather_api.get_weather("Tokyo")
    console.print(JSON.from_data(weather))
    
    await asyncio.sleep(1)
    
    # Example 2: News API
    console.print(Panel("[bold]Example 2: News API (Search with Parameters)[/bold]", style="blue"))
    news = await orchestrator.news_api.search_news("artificial intelligence", page_size=3)
    console.print(JSON.from_data(news))
    
    await asyncio.sleep(1)
    
    # Example 3: Exchange Rate API
    console.print(Panel("[bold]Example 3: Exchange Rate API[/bold]", style="blue"))
    exchange = await orchestrator.exchange_api.get_exchange_rate("USD", "JPY")
    console.print(JSON.from_data(exchange))
    
    await asyncio.sleep(1)
    
    # Example 4: Combined Research (Multiple APIs)
    console.print(Panel("[bold]Example 4: Combined Research (Multiple APIs in Parallel)[/bold]", style="blue"))
    research = await orchestrator.research_travel_destination("Paris", "EUR")
    console.print(JSON.from_data(research))
    
    console.print("\n[bold green]✅ API Demonstration Complete![/bold green]\n")


if __name__ == "__main__":
    # Run the demo
    asyncio.run(demo_apis())
