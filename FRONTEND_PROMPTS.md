# Prompts for Agentic AI Demo - Frontend Development

## 🎨 Creating the Frontend UI from Scratch

### Initial Setup Prompt
```
Create a modern, minimalist yet addictive frontend UI for an Agentic AI demo application using:
- React 18 with Vite
- Tailwind CSS for styling
- Framer Motion for animations
- Glass-morphism design (frosted glass effects)
- Dark gradient background (slate to blue tones)
- Animated particle background
- Responsive design for all devices

The UI should have three main sections accessible via tab navigation:
1. API Demo - Interactive testing of REST APIs
2. RAG System - Vector search and document Q&A (placeholder)
3. MCP Agents - Model Context Protocol tools (placeholder)

Use these design principles:
- Color palette: Blue to Cyan gradients (primary), Purple to Pink (secondary), Orange to Red (accent)
- Glass-morphic cards with backdrop blur
- Smooth transitions (300ms duration)
- Hover effects with scale and glow
- Gradient text for headings
- Neon borders with subtle glow
- Loading states with spinners
- Clean, professional typography
```

---

## 🔧 Modifying Existing Components

### Adding a New API Demo Card
```
Add a new API demo card to the APIDemo component that:
- Fetches data from [API_ENDPOINT]
- Has a [COLOR] gradient icon (from-[color1] to-[color2])
- Uses [ICON_NAME] icon from lucide-react
- Accepts input: [INPUT_DESCRIPTION]
- Displays results in JSON format
- Has loading state with spinner
- Shows error messages if API fails

Follow the existing card design pattern with glass-morphism and hover effects.
```

### Creating a New Demo Section
```
Create a new demo section component called [ComponentName]Demo.jsx that:
- Follows the same visual design as APIDemo
- Has a hero section with:
  - Large gradient icon (w-20 h-20)
  - Gradient text heading
  - Description paragraph
  - Status badge
- Contains [NUMBER] feature cards in a grid
- Each card shows:
  - Icon with gradient background
  - Title and description
  - List of features with bullet points
- Uses framer-motion for entrance animations
- Matches the glass-card styling

Color scheme: [PRIMARY_COLOR] to [SECONDARY_COLOR] gradients
```

### Updating Color Scheme
```
Update the color scheme in tailwind.config.js to use:
- Primary: [COLOR_HEX] shades
- Secondary: [COLOR_HEX] shades
- Accent: [COLOR_HEX] shades

Update all gradient classes in:
- Navigation.jsx tabs
- APIDemo.jsx cards
- Hero sections
- Button styles

Maintain consistency across all components.
```

---

## 🚀 Adding New Features

### Adding Real-time Updates
```
Add WebSocket support to the frontend to:
- Connect to ws://localhost:8000/ws
- Display real-time updates from the backend
- Show notifications when events occur
- Update the UI without page refresh
- Handle connection errors gracefully
- Show connection status indicator

Use the existing glass-card design for notification toasts.
```

### Adding File Upload for RAG
```
Implement file upload functionality in RAGDemo.jsx:
- Drag-and-drop zone with glass-morphism styling
- Support for PDF, TXT, DOCX files
- Show upload progress with animated bar
- Display uploaded files in a list
- Allow file deletion
- Send files to /api/rag/upload endpoint
- Show success/error messages

Design should match existing card styling with blue-purple gradients.
```

### Adding Chat Interface
```
Create a chat interface component that:
- Has a full-height layout with glass-card background
- Shows message history with alternating bubbles
- User messages: right-aligned, blue gradient
- AI messages: left-aligned, purple gradient
- Input box at bottom with send button
- Typing indicator while AI is responding
- Smooth scroll to latest message
- Copy button for code blocks
- Markdown rendering support

Use framer-motion for message entrance animations.
```

---

## 🎭 Animation Enhancements

### Adding Micro-interactions
```
Enhance the existing components with micro-interactions:
- Add scale animation on button clicks
- Add ripple effect on card interactions
- Implement stagger animations for lists
- Add spring physics to modal entrances
- Create bounce effect on success messages
- Add shake animation on errors
- Implement smooth page transitions

Use framer-motion variants for consistency.
```

### Custom Loading Animation
```
Create a custom loading component that:
- Shows animated circles forming an AI brain icon
- Uses gradient colors (blue-purple-pink)
- Pulses and rotates smoothly
- Has optional text below ("Thinking...", "Processing...", etc.)
- Can be used globally across components
- Follows glass-morphism design
```

---

## 📱 Responsive Design Updates

### Mobile Optimization
```
Optimize the UI for mobile devices:
- Stack navigation tabs vertically on small screens
- Adjust grid layouts to single column below 768px
- Increase touch target sizes to 44x44px minimum
- Reduce animation complexity on mobile
- Optimize font sizes for readability
- Add mobile-friendly drawer navigation
- Test on iPhone and Android devices

Maintain the visual design quality on all screen sizes.
```

---

## 🐛 Troubleshooting Prompts

### Fixing Build Errors
```
I'm getting [ERROR_MESSAGE] when building the frontend. The error occurs in [FILE_NAME].
- Check package.json dependencies
- Verify import statements
- Look for syntax errors
- Check Tailwind class names
- Validate JSX structure
Please help fix this issue while maintaining the existing design.
```

### Performance Optimization
```
The frontend is loading slowly. Optimize performance by:
- Implementing code splitting for components
- Lazy loading demo sections
- Memoizing expensive calculations
- Reducing animation complexity
- Optimizing images and assets
- Analyzing bundle size
- Removing unused dependencies

Maintain current functionality and visual design.
```

---

## 📦 Installation & Setup Prompts

### Fresh Installation
```
Set up the frontend from scratch:
1. Create React app with Vite
2. Install dependencies: react, react-dom, framer-motion, axios, lucide-react, tailwindcss
3. Configure Tailwind with custom theme (glass-morphism, gradients, animations)
4. Set up Vite proxy to backend at localhost:8000
5. Create component structure: App, Navigation, APIDemo, RAGDemo, MCPDemo, BackgroundParticles
6. Implement dark theme with gradient background
7. Add custom CSS for particles and scrollbar

Follow ES modules pattern with "type": "module" in package.json.
```

### Fixing npm Install Issues
```
npm install is failing with [ERROR]. Fix this by:
- Use: npm install --ignore-scripts --legacy-peer-deps
- Update package.json to use exact versions (no ^ or ~)
- Change postcss.config.js to use ES module syntax (export default)
- Clear cache: npm cache clean --force
- Remove node_modules and package-lock.json
- Reinstall from clean state

Dependencies should include: vite@5.4.6, react@18.3.1, framer-motion@11.5.4, tailwindcss@3.4.11
```

---

## 🎨 Design System Prompts

### Component Library
```
Create a reusable component library with:
- GlassCard: Frosted glass container with variants (default, hover, active)
- GradientButton: Button with gradient background and hover effects
- GradientText: Text with color gradient
- LoadingSpinner: Animated spinner matching theme
- StatusBadge: Colored badge with icon
- InputField: Styled input with focus states
- IconCard: Card with gradient icon background

Export from components/ui/ folder. Document props with JSDoc comments.
```

### Theme Configuration
```
Document the complete theme configuration:
- Colors: All gradient combinations
- Spacing: Custom spacing scale
- Typography: Font sizes, weights, line heights
- Shadows: Shadow variations for depth
- Borders: Border styles and colors
- Animations: All keyframes and durations
- Breakpoints: Responsive breakpoints

Create a THEME.md file with examples and usage guidelines.
```

---

## 🚀 Deployment Prompts

### Production Build
```
Prepare the frontend for production:
- Run: npm run build
- Optimize assets and images
- Generate source maps
- Configure environment variables
- Set up CORS for production API
- Test build locally with: npm run preview
- Deploy to [Vercel/Netlify/AWS]

Ensure all API endpoints point to production backend URL.
```

### Environment Configuration
```
Set up environment variables:
- Create .env.local for development
- Create .env.production for production
- Configure: VITE_API_URL, VITE_WS_URL
- Update vite.config.js to use env vars
- Update axios base URL
- Document required variables in README

Never commit .env files to git.
```

---

## 📝 Documentation Prompts

### Component Documentation
```
Document all components with:
- Purpose and usage
- Props with types and descriptions
- Example code snippets
- Screenshots of component
- Design decisions
- Performance considerations
- Accessibility notes

Create docs/ folder with markdown files for each major component.
```

---

## 🎯 Quick Reference

### Common Commands
```bash
# Start dev server
cd frontend-app && npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Install dependencies (if issues)
npm install --ignore-scripts --legacy-peer-deps

# Clean install
rm -rf node_modules package-lock.json && npm install --ignore-scripts
```

### File Locations
```
frontend-app/
├── src/
│   ├── App.jsx                    # Main app with navigation
│   ├── components/
│   │   ├── APIDemo.jsx           # Edit for API changes
│   │   ├── RAGDemo.jsx           # Edit for RAG features
│   │   ├── MCPDemo.jsx           # Edit for MCP features
│   │   └── Navigation.jsx        # Edit for tabs
│   └── index.css                 # Edit for global styles
├── tailwind.config.js            # Edit for theme changes
└── vite.config.js                # Edit for proxy/build config
```

---

## 💡 Tips for Future Development

1. **Always maintain the glass-morphism aesthetic** - Don't add solid backgrounds
2. **Keep animations smooth** - 300ms is the sweet spot
3. **Test on mobile** - Responsive design is crucial
4. **Use gradients consistently** - Follow the color system
5. **Add loading states** - Every async action needs visual feedback
6. **Error handling** - Show friendly error messages
7. **Accessibility** - Add ARIA labels and keyboard navigation
8. **Performance** - Lazy load heavy components

---

**Made with ❤️ for future developers**
*Last updated: November 7, 2025*
