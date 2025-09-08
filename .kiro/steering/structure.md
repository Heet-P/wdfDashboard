# Project Structure & Organization

## Root Directory Layout
```
├── index.html                    # Main entry point with all sections
├── README.md                     # Project documentation
├── supabase-integration-guide.md # Backend integration guide
├── css/                          # Stylesheets
├── js/                           # JavaScript modules
└── assets/                       # Static assets
```

## Asset Organization
```
assets/
├── images/                       # All image files
│   ├── myphoto.jpeg             # Profile picture
│   ├── practical1.png           # Practical preview images
│   ├── practical2.png
│   └── ...
└── pdfs/                        # PDF documents (future use)
```

## Page Structure
The single-page application is organized into semantic sections:

- **Navigation**: Fixed header with theme toggle and responsive menu
- **Introduction**: Hero section with profile and call-to-action buttons
- **Dashboard**: Grid layout of practical cards with professor features
- **Timeline**: Animated chronological view with interactive elements
- **Contact**: Contact information display
- **Footer**: Professor login access and copyright

## Component Patterns

### CSS Architecture
- **Root Variables**: Theme colors and shared values in `:root`
- **Component Classes**: `.section`, `.btn`, `.card`, `.modal` base classes
- **Modifier Classes**: `.primary`, `.secondary`, `.active` state modifiers
- **Responsive Utilities**: Media queries at component level

### JavaScript Modules
- **Initialization Pattern**: `DOMContentLoaded` event listeners in each module
- **Function Naming**: `init*()` for setup, `load*()` for data, `render*()` for DOM
- **Event Handling**: Centralized in respective modules, proper cleanup
- **Data Flow**: Sample data functions with async/await patterns for future API integration

### HTML Conventions
- **Semantic Structure**: `<section>`, `<nav>`, `<main>`, `<footer>` elements
- **ID Naming**: Kebab-case for sections (`#animated_timeline`)
- **Class Naming**: BEM-inspired with component-modifier pattern
- **Accessibility**: ARIA labels, proper heading hierarchy, keyboard navigation

## Configuration Files
- **Git**: `.git/` directory for version control
- **VS Code**: `.vscode/` for editor settings
- **Kiro**: `.kiro/` for AI assistant configuration and steering rules

## Future Expansion Areas
- **Backend Integration**: Supabase setup documented in integration guide
- **Admin Interface**: Separate admin pages for content management
- **API Layer**: RESTful endpoints for dynamic content
- **Build Process**: Optional bundling and optimization tools