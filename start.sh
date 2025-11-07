#!/bin/bash

# Agentic AI Demo - Start Script
# This script starts both backend and frontend servers

echo "🚀 Starting Agentic AI Demo..."
echo ""

# Check if backend is running
if lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null ; then
    echo "✅ Backend already running on port 8000"
else
    echo "🔧 Starting backend server..."
    cd "$(dirname "$0")"
    source .venv/bin/activate 2>/dev/null || python3 -m venv .venv && source .venv/bin/activate
    python main.py &
    BACKEND_PID=$!
    echo "✅ Backend started (PID: $BACKEND_PID)"
fi

echo ""
echo "🎨 Starting frontend server..."
cd frontend-app

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

echo ""
echo "================================"
echo "  🎉 Servers Starting!"
echo "================================"
echo "  Backend:  http://localhost:8000"
echo "  Frontend: http://localhost:3000"
echo "  Docs:     http://localhost:8000/docs"
echo "================================"
echo ""

npm run dev
