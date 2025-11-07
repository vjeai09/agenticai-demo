#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔══════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║     Starting Dual Frontend + Backend Servers        ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════╝${NC}"
echo ""

# Function to check if port is in use
check_port() {
    lsof -ti:$1 > /dev/null 2>&1
}

# Kill processes on ports if they exist
kill_port() {
    if check_port $1; then
        echo -e "${YELLOW}⚠️  Port $1 is in use. Killing existing process...${NC}"
        lsof -ti:$1 | xargs kill -9 2>/dev/null
        sleep 1
    fi
}

# Check and kill existing processes
kill_port 8000  # Backend
kill_port 3000  # S V Banquet Halls
kill_port 3001  # Agentic AI Demo

echo ""
echo -e "${GREEN}✓ Cleared all ports${NC}"
echo ""

# Check if virtual environment exists
if [ ! -d ".venv" ]; then
    echo -e "${YELLOW}⚠️  Virtual environment not found. Creating...${NC}"
    python -m venv .venv
fi

# Activate virtual environment and start backend
echo -e "${BLUE}🚀 Starting Backend API (Port 8000)...${NC}"
source .venv/bin/activate
python main.py &
BACKEND_PID=$!
sleep 2

# Check if backend started successfully
if check_port 8000; then
    echo -e "${GREEN}✓ Backend API running at http://localhost:8000${NC}"
else
    echo -e "${RED}✗ Backend failed to start${NC}"
    exit 1
fi

echo ""

# Start S V Banquet Halls Frontend
echo -e "${BLUE}🏛️  Starting S V Banquet Halls (Port 3000)...${NC}"
cd frontend-app
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}   Installing dependencies...${NC}"
    npm install --ignore-scripts --legacy-peer-deps > /dev/null 2>&1
fi
npx vite &
BUSINESS_PID=$!
cd ..
sleep 2

if check_port 3000; then
    echo -e "${GREEN}✓ S V Banquet Halls running at http://localhost:3000${NC}"
else
    echo -e "${YELLOW}⚠️  S V Banquet Halls may still be starting...${NC}"
fi

echo ""

# Start Agentic AI Demo Frontend
echo -e "${BLUE}🤖 Starting Agentic AI Demo (Port 3001)...${NC}"
cd agentic-demo-frontend
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}   Installing dependencies...${NC}"
    npm install --ignore-scripts --legacy-peer-deps > /dev/null 2>&1
fi
npx vite &
DEMO_PID=$!
cd ..
sleep 2

if check_port 3001; then
    echo -e "${GREEN}✓ Agentic AI Demo running at http://localhost:3001${NC}"
else
    echo -e "${YELLOW}⚠️  Agentic AI Demo may still be starting...${NC}"
fi

echo ""
echo -e "${BLUE}╔══════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║              All Services Started!                   ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${GREEN}📱 Access Your Applications:${NC}"
echo -e "   ${BLUE}→${NC} Backend API:          ${YELLOW}http://localhost:8000${NC}"
echo -e "   ${BLUE}→${NC} API Docs:             ${YELLOW}http://localhost:8000/docs${NC}"
echo -e "   ${BLUE}→${NC} S V Banquet Halls:    ${YELLOW}http://localhost:3000${NC}"
echo -e "   ${BLUE}→${NC} Agentic AI Demo:      ${YELLOW}http://localhost:3001${NC}"
echo ""
echo -e "${YELLOW}💡 Tips:${NC}"
echo -e "   • Press ${RED}Ctrl+C${NC} to stop all servers"
echo -e "   • Check logs in respective terminal windows"
echo -e "   • Both frontends share the same backend API"
echo ""
echo -e "${GREEN}Process IDs:${NC}"
echo -e "   Backend: $BACKEND_PID"
echo -e "   Business Site: $BUSINESS_PID"
echo -e "   AI Demo: $DEMO_PID"
echo ""

# Wait for Ctrl+C
trap "echo '' && echo -e '${RED}🛑 Stopping all servers...${NC}' && kill $BACKEND_PID $BUSINESS_PID $DEMO_PID 2>/dev/null && echo -e '${GREEN}✓ All servers stopped${NC}' && exit" INT

echo -e "${BLUE}📊 Server logs will appear below. Press Ctrl+C to stop all services.${NC}"
echo ""

# Wait for all background processes
wait
