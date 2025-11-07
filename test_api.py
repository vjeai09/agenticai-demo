#!/usr/bin/env python3
"""
Test script to verify the API is working
Run the FastAPI server first (python main.py) in another terminal
"""

import requests
import json
from rich.console import Console
from rich.panel import Panel
from rich.json import JSON
import time

console = Console()

BASE_URL = "http://localhost:8000"


def test_endpoint(name, url, method="GET", data=None):
    """Test an API endpoint and display results"""
    console.print(f"\n[bold cyan]Testing: {name}[/bold cyan]")
    console.print(f"[dim]{method} {url}[/dim]\n")
    
    try:
        if method == "GET":
            response = requests.get(url, timeout=5)
        elif method == "POST":
            response = requests.post(url, json=data, timeout=5)
        
        console.print(f"[green]✅ Status: {response.status_code}[/green]")
        console.print(JSON.from_data(response.json(), indent=2))
        return True
        
    except requests.exceptions.ConnectionError:
        console.print("[red]❌ Error: Cannot connect to server![/red]")
        console.print("[yellow]Make sure the server is running: python main.py[/yellow]")
        return False
    except Exception as e:
        console.print(f"[red]❌ Error: {str(e)}[/red]")
        return False


def main():
    """Run all API tests"""
    
    console.print(Panel.fit(
        "[bold magenta]API Testing Suite[/bold magenta]\n"
        "Make sure the FastAPI server is running first!",
        border_style="magenta"
    ))
    
    console.print("\n[yellow]Starting tests in 2 seconds...[/yellow]\n")
    time.sleep(2)
    
    # Test 1: Root endpoint
    if not test_endpoint("Root Endpoint", f"{BASE_URL}/"):
        return
    
    time.sleep(1)
    
    # Test 2: Health check
    test_endpoint("Health Check", f"{BASE_URL}/health")
    time.sleep(1)
    
    # Test 3: API Explanation
    test_endpoint("API Explanation", f"{BASE_URL}/api-explanation")
    time.sleep(1)
    
    # Test 4: Weather (will show "not configured" without API key)
    test_endpoint("Weather API", f"{BASE_URL}/weather/Tokyo")
    time.sleep(1)
    
    # Test 5: News Search
    test_endpoint("News Search", f"{BASE_URL}/news?query=technology&page_size=3")
    time.sleep(1)
    
    # Test 6: Exchange Rate
    test_endpoint("Exchange Rate", f"{BASE_URL}/exchange?from_currency=USD&to_currency=EUR")
    time.sleep(1)
    
    # Test 7: Research Endpoint (POST)
    test_endpoint(
        "Research Endpoint (POST)",
        f"{BASE_URL}/research",
        method="POST",
        data={"city": "Paris", "currency": "EUR"}
    )
    
    console.print("\n" + "="*80)
    console.print("[bold green]✅ All tests completed![/bold green]")
    console.print("\n[bold cyan]Next Steps:[/bold cyan]")
    console.print("1. Open http://localhost:8000/docs for interactive API docs")
    console.print("2. Add API keys to .env to see real data")
    console.print("3. Try modifying the endpoints in main.py")
    console.print("="*80 + "\n")


if __name__ == "__main__":
    main()
