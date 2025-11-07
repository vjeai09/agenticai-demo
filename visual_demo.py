"""
Visual API Demonstration
========================

Run this script to see a visual representation of how APIs work
"""

from rich.console import Console
from rich.panel import Panel
from rich.table import Table
from rich.layout import Layout
from rich.text import Text
from rich import box
import time

console = Console()


def show_api_explanation():
    """Visual explanation of what an API is"""
    
    console.clear()
    console.print("\n")
    
    # Title
    title = Text("🎯 What is an API?", style="bold magenta", justify="center")
    console.print(Panel(title, box=box.DOUBLE))
    
    console.print("\n")
    
    # Restaurant Analogy
    restaurant = Table(show_header=False, box=box.ROUNDED, expand=True)
    restaurant.add_column(style="cyan", width=20)
    restaurant.add_column(style="yellow", width=60)
    
    restaurant.add_row(
        "🍽️ RESTAURANT",
        "API (Application Programming Interface)"
    )
    restaurant.add_row("", "")
    restaurant.add_row(
        "👤 You (Customer)",
        "→  CLIENT APPLICATION (Your code, AI agent, web browser)"
    )
    restaurant.add_row(
        "📋 Menu",
        "→  API DOCUMENTATION (What endpoints are available)"
    )
    restaurant.add_row(
        "🙋 Your Order",
        "→  API REQUEST (GET /weather/Tokyo)"
    )
    restaurant.add_row(
        "🚶 Waiter",
        "→  API ENDPOINT (The URL that receives requests)"
    )
    restaurant.add_row(
        "👨‍🍳 Kitchen",
        "→  SERVER (Processes your request, queries database)"
    )
    restaurant.add_row(
        "🍕 Your Food",
        "→  API RESPONSE (JSON data with weather info)"
    )
    
    console.print(Panel(restaurant, title="[bold]The Restaurant Analogy[/bold]", border_style="green"))
    
    console.print("\n" + "="*80 + "\n")


def show_api_flow():
    """Show the API request/response flow"""
    
    # Request Flow
    console.print(Panel.fit(
        "[bold cyan]API REQUEST FLOW[/bold cyan]",
        border_style="cyan"
    ))
    
    steps = [
        ("1️⃣", "CLIENT", "You want weather data", "Your app/script"),
        ("2️⃣", "REQUEST", "GET api.weather.com/tokyo", "HTTP Request sent"),
        ("3️⃣", "SERVER", "Receives request", "Authenticates API key"),
        ("4️⃣", "PROCESS", "Fetches from database", "Retrieves weather data"),
        ("5️⃣", "RESPONSE", "Returns JSON data", '{"temp": 22, "condition": "sunny"}'),
        ("6️⃣", "CLIENT", "Receives response", "Displays weather to user"),
    ]
    
    for emoji, stage, action, detail in steps:
        console.print(f"\n{emoji} [bold yellow]{stage}[/bold yellow]: {action}")
        console.print(f"   └─ [dim]{detail}[/dim]")
        time.sleep(0.3)
    
    console.print("\n" + "="*80 + "\n")


def show_http_methods():
    """Show different HTTP methods"""
    
    console.print(Panel.fit(
        "[bold magenta]HTTP METHODS[/bold magenta]",
        border_style="magenta"
    ))
    
    methods = Table(box=box.ROUNDED)
    methods.add_column("Method", style="cyan", width=10)
    methods.add_column("Purpose", style="yellow", width=25)
    methods.add_column("Example", style="green", width=40)
    
    methods.add_row(
        "GET",
        "Fetch/Read data",
        "GET /weather/Tokyo → Get weather"
    )
    methods.add_row(
        "POST",
        "Create/Send data",
        "POST /research → Submit search query"
    )
    methods.add_row(
        "PUT",
        "Update data",
        "PUT /settings → Update user settings"
    )
    methods.add_row(
        "DELETE",
        "Remove data",
        "DELETE /user/123 → Delete user"
    )
    
    console.print(methods)
    console.print("\n" + "="*80 + "\n")


def show_status_codes():
    """Show HTTP status codes"""
    
    console.print(Panel.fit(
        "[bold blue]HTTP STATUS CODES[/bold blue]",
        border_style="blue"
    ))
    
    codes = Table(box=box.ROUNDED)
    codes.add_column("Code", style="cyan", width=10)
    codes.add_column("Meaning", style="yellow", width=20)
    codes.add_column("Example", style="green", width=45)
    
    codes.add_row(
        "200",
        "✅ OK",
        "Request successful, data returned"
    )
    codes.add_row(
        "201",
        "✅ Created",
        "Resource created successfully"
    )
    codes.add_row(
        "400",
        "❌ Bad Request",
        "Invalid parameters or malformed request"
    )
    codes.add_row(
        "401",
        "🔒 Unauthorized",
        "Invalid or missing API key"
    )
    codes.add_row(
        "404",
        "❌ Not Found",
        "Endpoint or resource doesn't exist"
    )
    codes.add_row(
        "429",
        "⏱️ Too Many Requests",
        "Rate limit exceeded"
    )
    codes.add_row(
        "500",
        "💥 Server Error",
        "Something broke on the server side"
    )
    
    console.print(codes)
    console.print("\n" + "="*80 + "\n")


def show_our_demo():
    """Show what our demo does"""
    
    console.print(Panel.fit(
        "[bold green]OUR DEMO: Personal Research Assistant[/bold green]",
        border_style="green"
    ))
    
    console.print("\n[bold cyan]Single API Call Example:[/bold cyan]")
    console.print("  You → GET /weather/Tokyo → Weather API → Server → Response")
    console.print("  [dim]Takes ~2 seconds[/dim]\n")
    
    console.print("[bold cyan]Multiple API Calls (Sequential - Slow):[/bold cyan]")
    console.print("  Weather API (2s) → then News API (2s) → then Currency API (2s)")
    console.print("  [dim red]Total: 6 seconds ❌[/dim red]\n")
    
    console.print("[bold cyan]Multiple API Calls (Parallel - Fast!):[/bold cyan]")
    console.print("  Weather API (2s) ┐")
    console.print("  News API (2s)    ├─→ All at the same time!")
    console.print("  Currency API (2s)┘")
    console.print("  [dim green]Total: 2 seconds ✅[/dim green]\n")
    
    console.print("[bold yellow]This is what AI agents do internally![/bold yellow]")
    console.print("When you ask: 'Help me plan a trip to Paris'")
    console.print("The agent calls multiple APIs in parallel to gather all the info.\n")
    
    console.print("="*80 + "\n")


def show_next_steps():
    """Show what's coming next"""
    
    next_demos = Table(box=box.ROUNDED, title="🚀 Coming Next", title_style="bold magenta")
    next_demos.add_column("Demo", style="cyan", width=20)
    next_demos.add_column("What You'll Learn", style="yellow", width=55)
    
    next_demos.add_row(
        "✅ Part 1: APIs",
        "How to call external services (DONE!)"
    )
    next_demos.add_row(
        "🔜 Part 2: MCP",
        "Model Context Protocol - Give agents tools (file ops, actions)"
    )
    next_demos.add_row(
        "🔜 Part 3: RAG Basic",
        "Vector databases, embeddings, semantic search"
    )
    next_demos.add_row(
        "🔜 Part 4: RAG Advanced",
        "Reranking, hybrid search, query rewriting"
    )
    next_demos.add_row(
        "🔜 Part 5: Multi-Agent",
        "Orchestrating multiple AI agents together"
    )
    
    console.print(next_demos)


def main():
    """Run the visual demonstration"""
    
    console.clear()
    
    # ASCII Art Title
    console.print("""
    ╔═══════════════════════════════════════════════════════════════╗
    ║                                                               ║
    ║     █████╗ ██████╗ ██╗    ██████╗ ███████╗███╗   ███╗ ██████╗║
    ║    ██╔══██╗██╔══██╗██║    ██╔══██╗██╔════╝████╗ ████║██╔═══██╗
    ║    ███████║██████╔╝██║    ██║  ██║█████╗  ██╔████╔██║██║   ██║
    ║    ██╔══██║██╔═══╝ ██║    ██║  ██║██╔══╝  ██║╚██╔╝██║██║   ██║
    ║    ██║  ██║██║     ██║    ██████╔╝███████╗██║ ╚═╝ ██║╚██████╔╝
    ║    ╚═╝  ╚═╝╚═╝     ╚═╝    ╚═════╝ ╚══════╝╚═╝     ╚═╝ ╚═════╝ ║
    ║                                                               ║
    ║              Personal Research Assistant - API Demo          ║
    ╚═══════════════════════════════════════════════════════════════╝
    """, style="bold cyan")
    
    console.print("\n[bold]Press Enter to continue through each section...[/bold]\n")
    input()
    
    # Show each section
    show_api_explanation()
    input()
    
    show_api_flow()
    input()
    
    show_http_methods()
    input()
    
    show_status_codes()
    input()
    
    show_our_demo()
    input()
    
    show_next_steps()
    
    console.print("\n\n[bold green]🎉 Congratulations! You now understand how APIs work![/bold green]")
    console.print("\n[bold cyan]Next Steps:[/bold cyan]")
    console.print("1. Check out http://localhost:8000/docs to try the APIs")
    console.print("2. Get free API keys to see real data")
    console.print("3. Read README.md for detailed explanations")
    console.print("4. Ready for Part 2? Let's add MCP (Model Context Protocol)!\n")


if __name__ == "__main__":
    main()
