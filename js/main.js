// Main JavaScript file for general functionality
import { utils, eventBus } from './utils.js';

// Global error handling
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    utils.showErrorToast('Something went wrong. Please refresh the page.');
});

window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    utils.showErrorToast('An unexpected error occurred.');
});

document.addEventListener('DOMContentLoaded', () => {
    // Initialize the application
    initNavigation();
    initProfessorLogin();
    initAccessibility();
    initKeyboardShortcuts();
    initImageLoading();
    initPerformanceOptimizations();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Prevent body scrolling when menu is open
        document.body.classList.toggle('menu-open');
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });

    // Add active class to nav links on scroll
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Shrink navbar on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Professor login modal functionality
function initProfessorLogin() {
    const loginBtn = document.getElementById('professor-login-btn');
    const loginModal = document.getElementById('login-modal');
    const closeModal = document.querySelector('.close-modal');
    const loginForm = document.getElementById('login-form');

    // Open modal
    loginBtn.addEventListener('click', () => {
        loginModal.classList.add('active');
        // Trap focus in modal
        const removeFocusTrap = utils.trapFocus(loginModal);
        loginModal.setAttribute('data-focus-trap', 'active');
        
        // Store cleanup function
        loginModal._removeFocusTrap = removeFocusTrap;
    });

    // Close modal function
    const closeLoginModal = () => {
        loginModal.classList.remove('active');
        // Remove focus trap
        if (loginModal._removeFocusTrap) {
            loginModal._removeFocusTrap();
            loginModal._removeFocusTrap = null;
        }
        loginModal.removeAttribute('data-focus-trap');
        // Return focus to login button
        loginBtn.focus();
    };

    // Close modal
    closeModal.addEventListener('click', closeLoginModal);

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            closeLoginModal();
        }
    });

    // Handle login form submission
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Simple demo login check (Supabase removed)
        if (email === 'professor@example.com' && password === 'password123') {
            utils.showSuccessToast('Login successful! Welcome, Professor.');
            closeLoginModal();
            // Set a session flag to indicate professor is logged in
            sessionStorage.setItem('isProfessor', 'true');
            // Show logout button
            const logoutBtn = document.getElementById('logout-btn');
            if (logoutBtn) logoutBtn.style.display = 'block';
            // Refresh dashboard to show professor view
            eventBus.emit('professorLogin', { isProfessor: true });
        } else {
            utils.showErrorToast('Invalid credentials. Please try again.');
        }
    });
    
    // Initialize logout functionality
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            // Clear session
            sessionStorage.removeItem('isProfessor');
            logoutBtn.style.display = 'none';
            
            // Show success message
            utils.showSuccessToast('Logged out successfully');
            
            // Emit logout event
            eventBus.emit('professorLogout', { isProfessor: false });
        });
    }
    
    // Check if professor is already logged in
    const isProfessor = sessionStorage.getItem('isProfessor') === 'true';
    if (isProfessor && logoutBtn) {
        logoutBtn.style.display = 'block';
    }
    
    // No Supabase session check needed
}

// Accessibility features
function initAccessibility() {
    // Skip to content functionality
    const skipLink = document.createElement('a');
    skipLink.setAttribute('id', 'skip-link');
    skipLink.setAttribute('href', '#introduction');
    skipLink.textContent = 'Skip to content';
    skipLink.style.position = 'absolute';
    skipLink.style.top = '-40px';
    skipLink.style.left = '0';
    skipLink.style.padding = '8px';
    skipLink.style.zIndex = '9999';
    skipLink.style.backgroundColor = 'var(--accent)';
    skipLink.style.color = 'white';
    skipLink.style.transition = 'top 0.3s ease';
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '0';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add ARIA labels to elements that need them
    const unlabeledElements = document.querySelectorAll('[aria-label=""], [aria-labelledby=""]');
    unlabeledElements.forEach(element => {
        if (element.textContent.trim()) {
            element.setAttribute('aria-label', element.textContent.trim());
        }
    });
    
    // Enable keyboard navigation for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    interactiveElements.forEach(element => {
        if (!element.getAttribute('tabindex')) {
            element.setAttribute('tabindex', '0');
        }
    });
}

// Helper function to check if an element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Helper function to animate elements when they come into view
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        if (isInViewport(element)) {
            element.classList.add('animated');
        }
    });
}

// Add scroll event listener for animations
window.addEventListener('scroll', animateOnScroll);

// Initialize keyboard shortcuts
function initKeyboardShortcuts() {
    document.addEventListener('keydown', utils.handleKeyboardShortcuts);
    
    // Additional app-specific shortcuts
    document.addEventListener('keydown', (e) => {
        // 'T' key to scroll to timeline
        if (e.key.toLowerCase() === 't' && !e.ctrlKey && !e.metaKey) {
            const timeline = document.getElementById('animated_timeline');
            if (timeline) {
                timeline.scrollIntoView({ behavior: 'smooth' });
                e.preventDefault();
            }
        }
        
        // 'D' key to scroll to dashboard
        if (e.key.toLowerCase() === 'd' && !e.ctrlKey && !e.metaKey) {
            const dashboard = document.getElementById('dashboard_professor_view');
            if (dashboard) {
                dashboard.scrollIntoView({ behavior: 'smooth' });
                e.preventDefault();
            }
        }
    });
}

// Initialize image loading with fallbacks
function initImageLoading() {
    const images = document.querySelectorAll('img[data-src], img:not([src])');
    
    images.forEach(img => {
        // Add loading class
        img.classList.add('loading');
        
        // Load image with fallback
        utils.loadImageWithFallback(img).then((success) => {
            img.classList.remove('loading');
            if (!success) {
                console.warn('Failed to load image:', img.dataset.src || img.src);
            }
        });
    });
}

// Initialize performance optimizations
function initPerformanceOptimizations() {
    // Debounced scroll handler for navbar
    const debouncedScrollHandler = utils.debounce(() => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, 10);
    
    window.addEventListener('scroll', debouncedScrollHandler);
    
    // Intersection Observer for animations instead of scroll events
    const animationObserver = utils.createAnimationObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Unobserve after animation to improve performance
                animationObserver.unobserve(entry.target);
            }
        });
    });
    
    // Observe elements that should animate
    const animateElements = document.querySelectorAll('.animate-on-scroll, .timeline-item, .dashboard-card');
    animateElements.forEach(el => animationObserver.observe(el));
}

// Call once on load to check for elements already in viewport
window.addEventListener('load', () => {
    // Initial animation check
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(element => {
        if (utils.isInViewport(element)) {
            element.classList.add('animated');
        }
    });
});