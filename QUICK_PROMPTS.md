# 🚀 Quick Start Prompts - Copy & Paste Ready

## Creating Similar UI from Scratch

```
Create a modern, glass-morphism UI with React, Vite, Tailwind CSS, and Framer Motion.

Requirements:
- Dark gradient background (slate-950 to blue-950)
- Glass-morphic cards with backdrop blur
- Smooth animations (framer-motion)
- Tab navigation with animated underline
- Particle background effect
- Responsive grid layout
- Color scheme: Blue→Cyan (primary), Purple→Pink (secondary), Orange→Red (accent)
- Loading states, hover effects, gradient text
- Mobile-friendly with single column on small screens

Structure:
- Navigation component with 3 tabs
- Demo sections for API, RAG, MCP
- Interactive cards with icons from lucide-react
- Results display with JSON viewer
- Error handling with visual feedback

Tech stack:
- React 18.3.1
- Vite 5.4.6
- Tailwind CSS 3.4.11
- Framer Motion 11.5.4
- Axios 1.7.7
- Lucide React 0.441.0

Setup package.json with "type": "module" and use ES module syntax throughout.
```

---

## Adding New Features

### New API Endpoint
```
Add a new API demo card that calls [ENDPOINT_NAME]:
- Icon: [ICON_NAME] from lucide-react
- Gradient: from-[color1] to-[color2]
- Input: [what user enters]
- Displays JSON response
- Loading spinner during fetch
- Error handling with red alert
Follow existing APIDemo.jsx pattern
```

### New Demo Section
```
Create [SectionName]Demo.jsx component:
- Hero with gradient icon, title, description
- Grid of feature cards (2 columns on desktop)
- Each card: icon, title, description, feature list
- Entrance animations with framer-motion
- Glass-card styling with hover effects
Color: [primary] to [secondary] gradient
```

---

## Fixing Common Issues

### npm Install Fails
```bash
cd frontend-app
rm -rf node_modules package-lock.json
npm cache clean --force
npm install --ignore-scripts --legacy-peer-deps
```

### PostCSS Config Error
```
Change postcss.config.js from:
module.exports = { ... }

To:
export default { ... }
```

### Vite Not Starting
```bash
cd frontend-app
./node_modules/.bin/vite
```

---

## Customization Prompts

### Change Colors
```
Update tailwind.config.js colors:
- Primary: [HEX_CODE]
- Accent: [HEX_CODE]
Update all gradient classes in components
```

### Add Animation
```
Add [ANIMATION_TYPE] animation to [COMPONENT]:
- Use framer-motion
- Duration: 300ms
- Spring physics
- Stagger children by 0.1s
```

### Make Responsive
```
Optimize [COMPONENT] for mobile:
- Stack cards vertically below 768px
- Increase touch targets to 44px
- Adjust font sizes
- Test on iPhone/Android
```

---

## Running the App

```bash
# Backend (Terminal 1)
python main.py

# Frontend (Terminal 2)
cd frontend-app
npm run dev

# Or use the start script
./start.sh
```

**URLs:**
- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- API Docs: http://localhost:8000/docs

---

## File Structure

```
frontend-app/src/
├── App.jsx              ← Main app, edit for new sections
├── components/
│   ├── Navigation.jsx   ← Edit for new tabs
│   ├── APIDemo.jsx      ← Edit for API features
│   ├── RAGDemo.jsx      ← Edit for RAG features
│   └── MCPDemo.jsx      ← Edit for MCP features
└── index.css            ← Edit for global styles
```

---

**Pro Tip:** Always test on both desktop and mobile after changes!
