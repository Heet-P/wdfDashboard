// 404 Page functionality
import { utils } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    init404Page();
});

function init404Page() {
    // Add keyboard shortcuts
    document.addEventListener('keydown', utils.handleKeyboardShortcuts);
    
    // Add additional 404-specific shortcuts
    document.addEventListener('keydown', (e) => {
        // 'H' key to go home
        if (e.key.toLowerCase() === 'h' && !e.ctrlKey && !e.metaKey) {
            window.location.href = './index.html';
        }
        
        // 'B' key to go back
        if (e.key.toLowerCase() === 'b' && !e.ctrlKey && !e.metaKey) {
            history.back();
        }
    });
    
    // Add some interactive elements
    addInteractiveEffects();
    
    // Log 404 for analytics (in a real app)
    logPageNotFound();
}

function addInteractiveEffects() {
    const errorIcon = document.querySelector('.error-icon');
    const errorNumbers = document.querySelectorAll('.error-number');
    
    // Add hover effects to error numbers
    errorNumbers.forEach(number => {
        number.addEventListener('mouseenter', () => {
            number.style.transform = 'scale(1.1) rotate(5deg)';
            number.style.transition = 'transform 0.3s ease';
        });
        
        number.addEventListener('mouseleave', () => {
            number.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Add click effect to error icon
    if (errorIcon) {
        errorIcon.addEventListener('click', () => {
            errorIcon.style.animation = 'none';
            setTimeout(() => {
                errorIcon.style.animation = 'float 3s ease-in-out infinite';
            }, 100);
            
            // Show a fun message
            utils.showSuccessToast('🎉 You found the secret click! But the page is still missing...');
        });
    }
}

function logPageNotFound() {
    // In a real application, you might want to log 404s for analytics
    const currentUrl = window.location.href;
    const referrer = document.referrer;
    
    console.log('404 Page accessed:', {
        url: currentUrl,
        referrer: referrer,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
    });
    
    // You could send this to an analytics service
    // analytics.track('404_page_view', { url: currentUrl, referrer });
}