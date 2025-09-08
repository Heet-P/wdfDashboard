// Utility functions shared across modules

export const utils = {
    // Format date for display
    formatDate: (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    },

    // Debounce function calls
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Check if element is in viewport
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Sanitize user input to prevent XSS
    sanitizeInput: (input) => {
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    },

    // Show error toast notification
    showErrorToast: (message) => {
        const toast = document.createElement('div');
        toast.className = 'error-toast';
        toast.textContent = message;
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'assertive');
        
        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => toast.classList.add('show'), 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => document.body.removeChild(toast), 300);
        }, 5000);
    },

    // Show success toast notification
    showSuccessToast: (message) => {
        const toast = document.createElement('div');
        toast.className = 'success-toast';
        toast.textContent = message;
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'polite');
        
        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => toast.classList.add('show'), 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => document.body.removeChild(toast), 300);
        }, 3000);
    },

    // Focus trap for modals
    trapFocus: (element) => {
        const focusableElements = element.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        const handleTabKey = (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        };

        element.addEventListener('keydown', handleTabKey);
        firstElement?.focus();

        return () => {
            element.removeEventListener('keydown', handleTabKey);
        };
    },

    // Keyboard shortcuts handler
    handleKeyboardShortcuts: (e) => {
        // Escape key to close modals
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                activeModal.classList.remove('active');
                e.preventDefault();
            }
        }
        
        // Ctrl/Cmd + D for dark mode toggle
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
            const themeToggle = document.querySelector('.theme-toggle');
            if (themeToggle) {
                themeToggle.click();
                e.preventDefault();
            }
        }
    },

    // Intersection Observer for animations
    createAnimationObserver: (callback, options = {}) => {
        const defaultOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        return new IntersectionObserver(callback, { ...defaultOptions, ...options });
    },

    // Image loading with fallback
    loadImageWithFallback: (img, fallbackSrc = './assets/images/placeholder.svg') => {
        return new Promise((resolve) => {
            const tempImg = new Image();
            
            tempImg.onload = () => {
                img.src = tempImg.src;
                img.classList.add('loaded');
                resolve(true);
            };
            
            tempImg.onerror = () => {
                img.src = fallbackSrc;
                img.classList.add('loaded', 'fallback');
                resolve(false);
            };
            
            tempImg.src = img.dataset.src || img.src;
        });
    },

    // Simple pub/sub system for component communication
    createEventBus: () => {
        const events = {};
        
        return {
            on: (event, callback) => {
                if (!events[event]) events[event] = [];
                events[event].push(callback);
            },
            
            off: (event, callback) => {
                if (events[event]) {
                    events[event] = events[event].filter(cb => cb !== callback);
                }
            },
            
            emit: (event, data) => {
                if (events[event]) {
                    events[event].forEach(callback => callback(data));
                }
            }
        };
    }
};

// Global event bus instance
export const eventBus = utils.createEventBus();