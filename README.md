# Personal WDF Lab Dashboard Website

A personal portfolio and WDF (Web Development and Framework) practical dashboard website built using only HTML, CSS, and vanilla JavaScript. This project features an interactive animated timeline showing practicals and a professor view for reviewing them.

## Features

- **Responsive Design**: Mobile, tablet, and desktop friendly layouts
- **Dark/Light Mode**: Toggle between color themes with persistent preference
- **Interactive Timeline**: Animated timeline with parallax scrolling effects
- **Dashboard View**: Grid layout of practical cards with preview images
- **Professor Access**: Secure login for professors to view and provide feedback
- **Accessibility**: Keyboard navigation, ARIA labels, and high contrast design

## Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with flexbox, grid, transitions, and animations
- **JavaScript**: ES6+ vanilla JS with no frameworks or libraries
- **Design**: Glassmorphism aesthetic with smooth blur effects and rounded corners

## Project Structure

```
├── index.html              # Main HTML file
├── css/
│   ├── styles.css         # Main stylesheet
│   └── dark-mode.css      # Dark mode specific styles
├── js/
│   ├── main.js            # General functionality
│   ├── timeline.js        # Timeline functionality
│   ├── dashboard.js       # Dashboard functionality
│   └── dark-mode.js       # Theme toggle functionality
└── assets/
    └── images/            # Project images
```

## Getting Started

### Quick Start
1. Clone or download this repository
2. Open `index.html` in your web browser

### Development Server
For a better development experience with proper MIME types and error handling:

```bash
# Using Node.js (recommended)
npm install
npm run dev

# Or using Python
python -m http.server 8000

# Or using any static file server
```

## Usage

### Navigation
- Navigate through sections using the navbar or keyboard shortcuts
- **Keyboard Shortcuts:**
  - `T` - Jump to Timeline section
  - `D` - Jump to Dashboard section  
  - `Ctrl/Cmd + D` - Toggle dark/light mode
  - `Esc` - Close modals
  - `H` - Go to home (on 404 page)
  - `B` - Go back (on 404 page)

### Features
- Toggle between light and dark mode using the sun/moon icon
- Scroll through the timeline to see practicals in chronological order
- View the dashboard grid for a complete overview of all practicals
- Professors can log in using the button in the footer
- Responsive design works on all device sizes
- Accessibility features including keyboard navigation and screen reader support

## Professor Login (Demo)

- Email: in-progress
- Password: admin123

## Customization

To personalize this dashboard:

1. Update your profile information in `index.html`
2. Replace placeholder images in the `assets/images` folder
3. Modify the sample data in `timeline.js` and `dashboard.js` with your own practical information

## New Features Added

### Performance & UX
- **Intersection Observer**: Efficient scroll-based animations
- **Image Lazy Loading**: Improved page load times with fallback images
- **Debounced Events**: Optimized scroll and resize handlers
- **Loading States**: Visual feedback during image loading
- **Error Handling**: Global error boundaries with user-friendly notifications

### Accessibility & Usability
- **Focus Trapping**: Proper modal focus management
- **Keyboard Shortcuts**: Quick navigation and actions
- **Screen Reader Support**: Enhanced ARIA labels and announcements
- **Reduced Motion**: Respects user motion preferences
- **Toast Notifications**: Non-intrusive success/error messages

### Security & Performance
- **Content Security Policy**: XSS protection headers
- **Input Sanitization**: Prevents malicious content injection
- **Optimized Assets**: Preloading, font-display swap, caching headers
- **404 Page**: Custom error page with helpful navigation

### Development Experience
- **Modular Architecture**: ES6 modules with utility functions
- **Event Bus System**: Component communication pattern
- **ESLint Configuration**: Code quality and consistency
- **Development Server**: Local server with proper MIME types
- **Deployment Ready**: Netlify, Vercel, and GitHub Pages configurations

## Future Enhancements

- Integration with Supabase for data storage
- PDF upload and download functionality
- Enhanced professor feedback system
- Progressive Web App (PWA) features
- Advanced analytics and monitoring

## License

This project is available for personal and educational use.

## Author

[Heet Parikh]
