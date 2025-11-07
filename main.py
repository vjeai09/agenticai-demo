"""
FastAPI Backend for Personal Research Assistant
================================================

Main entry point that imports the FastAPI app from the api package
and runs the server.
"""

from api.app import app
from api.config import settings


if __name__ == "__main__":
    import uvicorn
    
    print("\n" + "="*60)
    print("  🚀 Starting Personal Research Assistant API")
    print("="*60)
    print(f"  📡 Server: http://{settings.host}:{settings.port}")
    print(f"  📚 Docs:   http://{settings.host}:{settings.port}/docs")
    print("="*60 + "\n")
    
    uvicorn.run(
        "api.app:app",
        host=settings.host,
        port=settings.port,
        reload=settings.debug
    )
