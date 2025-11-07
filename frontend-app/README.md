# Agentic AI Demo - Frontend

A visually stunning, minimalist yet addictive UI showcasing API, RAG, and MCP demos.

## 🎨 Features

- **Modern Glass-morphism Design** - Beautiful frosted glass effects
- **Smooth Animations** - Powered by Framer Motion
- **Responsive Layout** - Works on all devices
- **Interactive Demos** - Real-time API testing
- **Particle Effects** - Animated background
- **Tab Navigation** - Seamless switching between demos

## 🚀 Quick Start

### Install Dependencies

```bash
cd frontend-app
npm install
```

### Start Development Server

```bash
npm run dev
```

The app will run at: **http://localhost:3000**

Make sure the backend API is running at: **http://localhost:8000**

## 📁 Project Structure

```
frontend-app/
├── src/
│   ├── components/
│   │   ├── APIDemo.jsx          # API integration demos
│   │   ├── RAGDemo.jsx          # RAG system (coming soon)
│   │   ├── MCPDemo.jsx          # MCP agents (coming soon)
│   │   ├── Navigation.jsx       # Tab navigation
│   │   └── BackgroundParticles.jsx  # Animated particles
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles + Tailwind
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🎯 Demo Sections

### 1. API Demo (✅ Active)
- **Weather API** - Real-time weather data
- **News API** - Latest news search
- **Currency Exchange** - Live exchange rates
- **Parallel Orchestration** - Multiple APIs at once

### 2. RAG Demo (🚧 Coming Soon)
- Vector Search
- Hybrid Search
- Document Q&A
- Advanced RAG features

### 3. MCP Demo (🚧 Coming Soon)
- File Operations
- Git Integration
- Multi-Agent System
- Custom Tools

## 🎨 Design Principles

### Color Palette
- **Primary**: Blue to Cyan gradients
- **Secondary**: Purple to Pink gradients
- **Accent**: Orange to Red gradients
- **Background**: Dark slate with blue tones

### Key Features
- **Glass-morphism** - Frosted glass cards with blur effects
- **Gradient Text** - Eye-catching color transitions
- **Neon Borders** - Subtle glow effects
- **Smooth Transitions** - 300ms duration for all interactions
- **Responsive Grid** - Adapts to all screen sizes

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library
- **Axios** - HTTP client
- **Lucide React** - Icon library

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎭 Animations

- **Page Transitions** - Fade and slide effects
- **Hover Effects** - Scale and glow
- **Loading States** - Spinner animations
- **Background Particles** - Floating elements
- **Tab Switching** - Smooth layout animations

## 🔧 Configuration

### Vite Proxy
The frontend proxies `/api` requests to `http://localhost:8000`

### Tailwind
Custom animations and colors defined in `tailwind.config.js`

## 🚀 Build for Production

```bash
npm run build
```

Output in `dist/` folder

## 🎨 Customization

### Change Colors
Edit `tailwind.config.js`:
```js
colors: {
  primary: { ... },
  accent: { ... }
}
```

### Add New Demos
Create a new component in `src/components/` and add to `App.jsx`

### Modify Animations
Edit `src/index.css` for custom keyframes

## 📝 Notes

- Ensure backend is running before starting frontend
- API keys must be configured in backend `.env`
- Port 3000 must be available

## 🎉 What's Next?

- Implement RAG demo with vector search
- Add MCP agents demonstration
- Real-time WebSocket updates
- Chat interface for AI interaction
- File upload for document processing

---

**Built with ❤️ using React, Tailwind, and Framer Motion**
