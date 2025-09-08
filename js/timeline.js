// Timeline functionality
import { utils, eventBus } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    initTimeline();
});

function initTimeline() {
    // Load timeline data
    loadTimelineData()
        .then(data => {
            renderTimelineItems(data);
            initTimelineScroll();
        })
        .catch(error => {
            console.error('Error loading timeline data:', error);
            // Fallback to sample data if loading fails
            const sampleData = getSampleTimelineData();
            renderTimelineItems(sampleData);
            initTimelineScroll();
        });
}

// Function to load timeline data from JSON or API
async function loadTimelineData() {
    // Always use sample data (Supabase removed)
    return getSampleTimelineData();
}

// Sample timeline data for development
function getSampleTimelineData() {
    return [
        {
            id: 1,
            date: '2025-06-25',
            title: 'HTML Basics Practical - 1',
            description: 'Created a simple webpage using basic HTML5 elements and some styling',
            image: './assets/images/practical1.png',
            demoUrl: 'http://heetparikh.me/Practical-1',
            pdfUrl: './assets/pdfs/24CS058_WDFPrac1.pdf'
        },
        {
            id: 2,
            date: '2025-07-07',
            title: 'CSS Styling Practical',
            description: 'Applied CSS3 styling to create a responsive layout with flexbox and grid.',
            image: './assets/images/practical2.png',
            demoUrl: '#',
            pdfUrl: './assets/pdfs/24CS058_WDFPrac2.pdf' 
        },
        {
            id: 3,
            date: '2025-09-19',
            title: 'JavaScript Basics',
            description: 'Implemented interactive features using vanilla JavaScript.',
            image: './assets/images/practical3.jpg.svg  ',
            demoUrl: '#',
            pdfUrl: '#'
        },
        {
            id: 4,
            date: '2025-09-26',
            title: 'DOM Manipulation',
            description: 'Created dynamic content by manipulating the DOM with JavaScript.',
            image: './assets/images/practical4.jpg.svg',
            demoUrl: '#',
            pdfUrl: '#'
        },
        {
            id: 5,
            date: '2025-10-03',
            title: 'Form Validation',
            description: 'Implemented client-side form validation using JavaScript.',
            image: './assets/images/practical5.jpg.svg',
            demoUrl: '#',
            pdfUrl: '#'
        },
        {
            id: 6,
            date: '2025-10-10',
            title: 'API Integration',
            description: 'Connected to external APIs to fetch and display data.',
            image: './assets/images/practical6.jpg.svg',
            demoUrl: '#',
            pdfUrl: '#'
        },
        {
            id: 7,
            date: '2025-10-17',
            title: 'Responsive Web Design',
            description: 'Created a fully responsive website that adapts to different screen sizes.',
            image: './assets/images/practical1.jpg.svg',
            demoUrl: '#',
            pdfUrl: '#'
        },
        {
            id: 8,
            date: '2025-10-24',
            title: 'CSS Animations',
            description: 'Implemented complex animations and transitions using CSS3.',
            image: './assets/images/practical2.jpg.svg',
            demoUrl: '#',
            pdfUrl: '#'
        },
        {
            id: 9,
            date: '2025-10-31',
            title: 'Local Storage',
            description: 'Built a web application that persists data using browser local storage.',
            image: './assets/images/practical3.jpg.svg',
            demoUrl: '#',
            pdfUrl: '#'
        },
        {
            id: 10,
            date: '2025-11-07',
            title: 'Fetch API',
            description: 'Used the Fetch API to retrieve and display data from external sources.',
            image: './assets/images/practical4.jpg.svg',
            demoUrl: '#',
            pdfUrl: '#'
        },
        {
            id: 11,
            date: '2025-11-14',
            title: 'ES6 Features',
            description: 'Implemented modern JavaScript features including arrow functions, destructuring, and modules.',
            image: './assets/images/practical5.jpg.svg',
            demoUrl: '#',
            pdfUrl: '#'
        },
        {
            id: 12,
            date: '2025-11-21',
            title: 'Async/Await',
            description: 'Built asynchronous functionality using async/await patterns.',
            image: './assets/images/practical6.jpg.svg',
            demoUrl: '#',
            pdfUrl: '#'
        },
        {
            id: 13,
            date: '2025-11-28',
            title: 'CSS Grid Layout',
            description: 'Created complex grid-based layouts using CSS Grid.',
            image: './assets/images/practical1.jpg.svg',
            demoUrl: '#',
            pdfUrl: '#'
        },
        {
            id: 14,
            date: '2025-12-05',
            title: 'Web Accessibility',
            description: 'Implemented accessibility features to make web content more inclusive.',
            image: './assets/images/practical2.jpg.svg',
            demoUrl: '#',
            pdfUrl: '#'
        },
        {
            id: 15,
            date: '2025-12-12',
            title: 'Final Project',
            description: 'Comprehensive web application showcasing all learned skills and techniques.',
            image: './assets/images/practical3.jpg.svg',
            demoUrl: '#',
            pdfUrl: '#'
        }
    ];
}

// Render timeline items to the DOM
function renderTimelineItems(items) {
    const timelineContainer = document.querySelector('.timeline-items');
    timelineContainer.innerHTML = '';
    
    items.forEach((item) => {
        const timelineItem = document.createElement('div');
        timelineItem.classList.add('timeline-item', 'animate-on-scroll');
        timelineItem.setAttribute('data-date', item.date);
        // Make all items visible by default
        timelineItem.classList.add('visible');
        // Format the date for display
        const formattedDate = utils.formatDate(item.date);
        
        timelineItem.innerHTML = `
            <div class="timeline-content">
                <div class="timeline-date-capsule">${formattedDate}</div>
                <div class="timeline-full-content">
                    <div class="timeline-date">${formattedDate}</div>
                    <h3 class="timeline-title">${utils.sanitizeInput(item.title)}</h3>
                    <p class="timeline-description">${utils.sanitizeInput(item.description)}</p>
                    <div class="timeline-image">
                        <img data-src="${item.image}" alt="${utils.sanitizeInput(item.title)}" loading="lazy" class="loading">
                    </div>
                    <div class="card-buttons">
                        <a href="${item.demoUrl}" class="btn primary" target="_blank" rel="noopener noreferrer">Live Demo</a>
                        <a href="${item.pdfUrl}" class="btn secondary" download>Download PDF</a>
                    </div>
                </div>
            </div>
        `;
        timelineContainer.appendChild(timelineItem);
        
        // Load image with fallback
        const img = timelineItem.querySelector('img');
        utils.loadImageWithFallback(img);
    });
}

// Initialize timeline scroll effects
function initTimelineScroll() {
    const timelineTrack = document.querySelector('.timeline-track');
    const timelineBall = document.querySelector('.timeline-ball');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineSection = document.getElementById('animated_timeline');
    
    if (!timelineTrack || !timelineBall || !timelineSection) return;
    
    // Set the height of the timeline track
    if (timelineItems.length > 0) {
        const lastItem = timelineItems[timelineItems.length - 1];
        const trackHeight = lastItem.offsetTop + lastItem.offsetHeight - timelineItems[0].offsetTop;
        timelineTrack.style.height = `${trackHeight}px`;
    }
    
    // Debounced scroll handler for timeline ball
    const debouncedTimelineScroll = utils.debounce(() => {
        const rect = timelineSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        if (isVisible) {
            const sectionTop = timelineSection.offsetTop;
            const scrollPosition = window.scrollY - sectionTop + window.innerHeight / 2;
            const sectionHeight = timelineSection.offsetHeight;
            const scrollPercentage = Math.min(Math.max(scrollPosition / sectionHeight, 0), 1);
            const trackHeight = timelineTrack.offsetHeight;
            const ballPosition = scrollPercentage * trackHeight;
            timelineBall.style.top = `${ballPosition}px`;
        }
    }, 16); // ~60fps
    
    window.addEventListener('scroll', debouncedTimelineScroll);
    
    // Initial position
    debouncedTimelineScroll();
}

// Listen for professor login events
eventBus.on('professorLogin', (data) => {
    // Refresh timeline if needed for professor view
    console.log('Professor logged in, timeline updated');
});