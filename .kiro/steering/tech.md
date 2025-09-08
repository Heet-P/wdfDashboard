# Technology Stack & Build System

## Core Technologies
- **HTML5**: Semantic markup with accessibility attributes
- **CSS3**: Modern styling with custom properties, flexbox, grid, and animations
- **Vanilla JavaScript**: ES6+ features, no external frameworks or libraries
- **Google Fonts**: Poppins font family for consistent typography
- **Material Symbols**: Google's icon system for UI elements

## Architecture Principles
- **No Build Process**: Direct file serving, no compilation or bundling required
- **Modular JavaScript**: Separate files for different functionality areas
- **CSS Custom Properties**: Centralized theming system using CSS variables
- **Progressive Enhancement**: Core functionality works without JavaScript

## File Organization
```
css/
├── styles.css      # Main stylesheet with light mode variables
└── dark-mode.css   # Dark theme overrides and variables

js/
├── main.js         # Core app initialization and navigation
├── timeline.js     # Timeline functionality and animations
├── dashboard.js    # Dashboard grid and card rendering
├── dark-mode.js    # Theme toggle functionality
└── graph-animation.js # Additional animations
```

## Development Commands
Since this is a static website with no build process:

- **Local Development**: Open `index.html` directly in browser or use a local server
- **Live Server**: `python -m http.server 8000` or any static file server
- **Testing**: Manual testing across browsers and devices
- **Deployment**: Direct upload to any static hosting service

## Code Standards
- **CSS**: BEM-like naming, mobile-first responsive design
- **JavaScript**: ES6+ syntax, async/await for promises, modular functions
- **HTML**: Semantic elements, proper ARIA labels, valid markup
- **Performance**: Lazy loading images, efficient animations, minimal DOM manipulation

## Browser Support
- Modern browsers supporting ES6+, CSS Grid, and Flexbox
- Graceful degradation for older browsers
- Mobile-first responsive breakpoints: 480px, 768px, 1024px