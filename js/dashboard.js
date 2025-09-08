// Dashboard functionality
import { utils, eventBus } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    loadDashboard();
    
    // Listen for professor login events
    eventBus.on('professorLogin', () => {
        loadDashboard();
    });
});

function loadDashboard() {
    // Check if user is logged in as professor
    const isProfessor = sessionStorage.getItem('isProfessor') === 'true';
    
    // Load dashboard data
    loadDashboardData()
        .then(data => {
            renderDashboardCards(data, isProfessor);
        })
        .catch(error => {
            console.error('Error loading dashboard data:', error);
            // Fallback to sample data if loading fails
            const sampleData = getSampleDashboardData();
            renderDashboardCards(sampleData, isProfessor);
        });
}

// Function to load dashboard data from JSON or API
async function loadDashboardData() {
    // Always use sample data (Supabase removed)
    return getSampleDashboardData();
}

// Sample dashboard data for development
function getSampleDashboardData() {
    return [
        {
            id: 1,
            title: 'HTML Basics Practical',
            description: 'Created a simple webpage using semantic HTML5 elements.',
            image: './assets/images/practical1.png',
            demoUrl: '#',
            pdfUrl: '#',
            date: '2023-09-05'
        },
        {
            id: 2,
            title: 'CSS Styling Practical',
            description: 'Applied CSS3 styling to create a responsive layout with flexbox and grid.',
            image: './assets/images/practical2.png',
            demoUrl: '#',
            pdfUrl: '#',
            date: '2023-09-12'
        },
        {
            id: 3,
            title: 'JavaScript Basics',
            description: 'Implemented interactive features using vanilla JavaScript.',
            image: './assets/images/practical3.jpg.svg',
            demoUrl: '#',
            pdfUrl: '#',
            date: '2023-09-19'
        },
        {
            id: 4,
            title: 'DOM Manipulation',
            description: 'Created dynamic content by manipulating the DOM with JavaScript.',
            image: './assets/images/practical4.jpg.svg',
            demoUrl: '#',
            pdfUrl: '#',
            date: '2023-09-26'
        },
        {
            id: 5,
            title: 'Form Validation',
            description: 'Implemented client-side form validation using JavaScript.',
            image: './assets/images/practical5.jpg.svg',
            demoUrl: '#',
            pdfUrl: '#',
            date: '2023-10-03'
        },
        {
            id: 6,
            title: 'API Integration',
            description: 'Connected to external APIs to fetch and display data.',
            image: './assets/images/practical6.jpg.svg',
            demoUrl: '#',
            pdfUrl: '#',
            date: '2023-10-10'
        },
        {
            id: 7,
            title: 'Responsive Web Design',
            description: 'Created a fully responsive website that adapts to different screen sizes.',
            image: './assets/images/practical1.jpg.svg',
            demoUrl: '#',
            pdfUrl: '#',
            date: '2023-10-17'
        },
        {
            id: 8,
            title: 'CSS Animations',
            description: 'Implemented complex animations and transitions using CSS3.',
            image: './assets/images/practical2.jpg.svg',
            demoUrl: '#',
            pdfUrl: '#',
            date: '2023-10-24'
        },
        {
            id: 9,
            title: 'Local Storage',
            description: 'Built a web application that persists data using browser local storage.',
            image: './assets/images/practical3.jpg.svg',
            demoUrl: '#',
            pdfUrl: '#',
            date: '2023-10-31'
        },
        {
            id: 10,
            title: 'Fetch API',
            description: 'Used the Fetch API to retrieve and display data from external sources.',
            image: './assets/images/practical4.jpg.svg',
            demoUrl: '#',
            pdfUrl: '#',
            date: '2023-11-07'
        },
        {
            id: 11,
            title: 'ES6 Features',
            description: 'Implemented modern JavaScript features including arrow functions, destructuring, and modules.',
            image: './assets/images/practical5.jpg.svg',
            demoUrl: '#',
            pdfUrl: '#',
            date: '2023-11-14'
        },
        {
            id: 12,
            title: 'Async/Await',
            description: 'Built asynchronous functionality using async/await patterns.',
            image: './assets/images/practical6.jpg.svg',
            demoUrl: '#',
            pdfUrl: '#',
            date: '2023-11-21'
        },
        {
            id: 13,
            title: 'CSS Grid Layout',
            description: 'Created complex grid-based layouts using CSS Grid.',
            image: './assets/images/practical1.jpg.svg',
            demoUrl: '#',
            pdfUrl: '#',
            date: '2023-11-28'
        },
        {
            id: 14,
            title: 'Web Accessibility',
            description: 'Implemented accessibility features to make web content more inclusive.',
            image: './assets/images/practical2.jpg.svg',
            demoUrl: '#',
            pdfUrl: '#',
            date: '2023-12-05'
        },
        {
            id: 15,
            title: 'Final Project',
            description: 'Comprehensive web application showcasing all learned skills and techniques.',
            image: './assets/images/practical3.jpg.svg  ',
            demoUrl: '#',
            pdfUrl: '#',
            date: '2023-12-12'
        }
    ];
}

// Render dashboard cards to the DOM
function renderDashboardCards(items, isProfessor) {
    const dashboardGrid = document.querySelector('.dashboard-grid');
    dashboardGrid.innerHTML = '';
    
    // Sort items by date (newest first)
    items.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    items.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('dashboard-card');
        
        // Format the date for display
        const formattedDate = utils.formatDate(item.date);
        
        card.innerHTML = `
            <div class="card-image">
                <img data-src="${item.image}" alt="${utils.sanitizeInput(item.title)}" loading="lazy" class="loading">
            </div>
            <div class="card-content">
                <h3 class="card-title">${utils.sanitizeInput(item.title)}</h3>
                <div class="timeline-date">${formattedDate}</div>
                ${isProfessor ? `<p class="timeline-description">${utils.sanitizeInput(item.description)}</p>` : ''}
                <div class="card-buttons">
                    <a href="${item.demoUrl}" class="btn primary" target="_blank" rel="noopener noreferrer">Live Demo</a>
                    <a href="${item.pdfUrl}" class="btn secondary" download>Download PDF</a>
                    ${isProfessor ? `<button class="btn text add-feedback" data-id="${item.id}">Add Feedback</button>` : ''}
                </div>
            </div>
        `;
        
        // Load image with fallback
        const img = card.querySelector('img');
        utils.loadImageWithFallback(img);
        
        dashboardGrid.appendChild(card);
    });
    
    // Add event listeners for professor features if logged in
    if (isProfessor) {
        initProfessorFeatures();
    }
    
    // Initialize animations
    initDashboardAnimations();
}

// Initialize professor-specific features
function initProfessorFeatures() {
    const feedbackButtons = document.querySelectorAll('.add-feedback');
    
    feedbackButtons.forEach(button => {
        button.addEventListener('click', () => {
            const practicalId = button.getAttribute('data-id');
            showFeedbackModal(practicalId);
        });
    });
}

// Show feedback modal for professors
function showFeedbackModal(practicalId) {
    // Create modal for feedback
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.classList.add('active');
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal" aria-label="Close feedback modal">&times;</span>
            <h2>Add Feedback for Practical #${practicalId}</h2>
            <form id="feedback-form">
                <div class="form-group">
                    <label for="feedback">Feedback</label>
                    <textarea id="feedback" rows="5" required aria-describedby="feedback-help"></textarea>
                    <small id="feedback-help">Provide constructive feedback for the student's work.</small>
                </div>
                <div class="form-group">
                    <label for="grade">Grade (0-100)</label>
                    <input type="number" id="grade" min="0" max="100" required aria-describedby="grade-help">
                    <small id="grade-help">Enter a grade between 0 and 100.</small>
                </div>
                <button type="submit" class="btn primary">Submit Feedback</button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Focus trap for modal
    const removeFocusTrap = utils.trapFocus(modal.querySelector('.modal-content'));
    
    // Close modal functionality
    const closeFeedbackModal = () => {
        removeFocusTrap();
        document.body.removeChild(modal);
    };
    
    const closeModal = modal.querySelector('.close-modal');
    closeModal.addEventListener('click', closeFeedbackModal);
    
    // Close when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeFeedbackModal();
        }
    });
    
    // Handle form submission
    const feedbackForm = document.getElementById('feedback-form');
    feedbackForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const feedback = document.getElementById('feedback').value;
        const grade = document.getElementById('grade').value;
        
        // Validate inputs
        const sanitizedFeedback = utils.sanitizeInput(feedback);
        const numericGrade = parseInt(grade);
        
        if (numericGrade < 0 || numericGrade > 100) {
            utils.showErrorToast('Grade must be between 0 and 100.');
            return;
        }
        
        // Save feedback locally (Supabase removed)
        console.log(`Feedback for Practical #${practicalId}:`, { 
            feedback: sanitizedFeedback, 
            grade: numericGrade,
            timestamp: new Date().toISOString()
        });
        
        // Show success message
        utils.showSuccessToast('Feedback submitted successfully!');
        closeFeedbackModal();
    });
}

// Add animation observer for dashboard cards
function initDashboardAnimations() {
    const animationObserver = utils.createAnimationObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                animationObserver.unobserve(entry.target);
            }
        });
    });
    
    const cards = document.querySelectorAll('.dashboard-card');
    cards.forEach(card => {
        card.classList.add('animate-on-scroll');
        animationObserver.observe(card);
    });
}