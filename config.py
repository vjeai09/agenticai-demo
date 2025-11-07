"""
Configuration module for the Agentic AI Demo
Loads environment variables and provides application settings
"""
from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    """Application settings loaded from environment variables"""
    
    # API Keys
    openweather_api_key: Optional[str] = None
    news_api_key: Optional[str] = None
    exchange_rate_api_key: Optional[str] = None
    openai_api_key: Optional[str] = None
    
    # Server settings
    host: str = "0.0.0.0"
    port: int = 8000
    debug: bool = True
    
    class Config:
        env_file = ".env"
        case_sensitive = False


# Global settings instance
settings = Settings()
