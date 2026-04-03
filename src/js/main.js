const ASSET_PATH = "src/assets/portfolio-images/";
let mouseX = 0, mouseY = 0;

// Project Data
const projects = [
    {
        title: "NudgePal",
        description: "An AI-powered personal assistant and buddy that helps you stay on track with your goals, alarms, reminders and more. Mainly catered to the needs of neurodivergent individuals.",
        techStack: ["Next.js", "Tailwind CSS", "Zustand", "Supabase", "React Native"],
        background: `${ASSET_PATH}Brain-with-puzzle-pieces.webp`,
        demoLink: "#",
        githubLink: "#",
        size: "large",
        status: "in-progress"
    }
];

// Status configuration object
const statusConfig = {
    'complete': {
        label: 'Complete',
        color: '#4caf50',
        bgColor: 'rgba(76, 175, 80, 0.1)',
        borderColor: 'rgba(76, 175, 80, 0.3)',
        icon: 'fas fa-check-circle'
    },
    'in-progress': {
        label: 'In Progress',
        color: '#ff9800',
        bgColor: 'rgba(255, 152, 0, 0.1)',
        borderColor: 'rgba(255, 152, 0, 0.3)',
        icon: 'fas fa-spinner fa-pulse'
    },
    'coming-soon': {
        label: 'Coming Soon',
        color: '#2196f3',
        bgColor: 'rgba(33, 150, 243, 0.1)',
        borderColor: 'rgba(33, 150, 243, 0.3)',
        icon: 'fas fa-clock'
    },
    'incomplete': {
        label: 'Incomplete',
        color: '#f44336',
        bgColor: 'rgba(244, 67, 54, 0.1)',
        borderColor: 'rgba(244, 67, 54, 0.3)',
        icon: 'fas fa-exclamation-triangle'
    },
    'maintenance': {
        label: 'Maintenance',
        color: '#9c27b0',
        bgColor: 'rgba(156, 39, 176, 0.1)',
        borderColor: 'rgba(156, 39, 176, 0.3)',
        icon: 'fas fa-tools'
    }
};

// Function to create status tag
function createStatusTag(status) {
    const config = statusConfig[status];
    if (!config) return '';
    
    return `
        <div class="status-tag" data-status="${status}" aria-label="${config.label}" style="
            background: ${config.bgColor};
            border: 1px solid ${config.borderColor};
            color: ${config.color};
        ">
            <i class="${config.icon}" aria-hidden="true"></i>
            <span>${config.label}</span>
        </div>
    `;
}

// Function to create project cards
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = `project-card ${project.size}`;
    card.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${project.background})`;

    card.innerHTML = `
        ${createStatusTag(project.status)}
        <div class="project-title">${project.title}</div>
        <div class="project-overlay">
            <div class="project-info">
                <h3>${project.title}</h3>
                <div class="project-description">${project.description}</div>
                <div class="tech-stack">
                    ${project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.demoLink}" class="project-link" target="_blank" title="Live Demo" aria-label="View Live Demo">
                        <i class="fas fa-external-link-alt" aria-hidden="true"></i>
                    </a>
                    <a href="${project.githubLink}" class="project-link" target="_blank" title="View Code" aria-label="View Code on GitHub">
                        <i class="fab fa-github" aria-hidden="true"></i>
                    </a>
                </div>
            </div>
        </div>
    `;

    return card;
}

// Function to render all project cards
function renderProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) return; // Safety check
    
    projectsGrid.innerHTML = '';
    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });
}

// Background Floating Shapes Animation
function createFloatingShapes() {
    const bgAnimation = document.getElementById('bgAnimation');
    if (!bgAnimation) return; // Safety check
    
    const colors = ['#64b5f6', '#00bcd4', '#764ba2', '#667eea', '#4caf50'];
    const numShapes = 15;

    for (let i = 0; i < numShapes; i++) {
        const shape = document.createElement('div');
        shape.classList.add('floating-shape');
        
        // Random properties
        const size = Math.random() * 100 + 50; // 50px - 150px
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100; // % from left
        const delay = Math.random() * 15; // Staggered animation

        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        shape.style.backgroundColor = color;
        shape.style.left = `${left}%`;
        shape.style.top = `${Math.random() * 100}%`;
        shape.style.animationDelay = `${delay}s`;
        shape.style.opacity = '0.1';

        bgAnimation.appendChild(shape);
    }
}

// Interactive Background with Mouse Follow
function initInteractiveBackground() {
    const interactiveBg = document.getElementById('interactiveBg');
    if (!interactiveBg) return; // Safety check
    
    let particleTimeout;

    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.classList.add('interactive-particle');
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        interactiveBg.appendChild(particle);

        // Animate and remove
        setTimeout(() => {
            particle.style.opacity = '0';
            particle.style.transform = `translate(-50%, -50%) scale(2)`;
        }, 100);

        setTimeout(() => {
            if (particle.parentNode) {
                interactiveBg.removeChild(particle);
            }
        }, 400);
    }

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        clearTimeout(particleTimeout);
        particleTimeout = setTimeout(() => {
            createParticle(mouseX, mouseY);
        }, 50); // Throttle for performance
    });
}

// Cursor Follower with Delay
function initCursorFollower() {
    const interactiveBg = document.getElementById("interactiveBg");
    if (!interactiveBg) return; // Safety check

    // Create the cursor follower element
    const cursorFollower = document.createElement("div");
    cursorFollower.classList.add("cursor-follower");
    interactiveBg.appendChild(cursorFollower);

    // Target and current positions
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    // Update target on mouse move
    window.addEventListener("mousemove", (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    });

    // Animate with delay
    function animateFollower() {
        // Lerp (linear interpolation) creates the delay effect
        currentX += (targetX - currentX) * 0.1; // 0.1 = smoothing speed
        currentY += (targetY - currentY) * 0.1;

        cursorFollower.style.left = `${currentX}px`;
        cursorFollower.style.top = `${currentY}px`;

        requestAnimationFrame(animateFollower);
    }

    animateFollower();
}

// Scroll-based fade-in animations
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    if (fadeElements.length === 0) return; // Safety check

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing after animation
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Trigger a bit earlier
    });

    fadeElements.forEach(el => {
        observer.observe(el);
    });
}

// Add smooth scroll behaviour for navigation 
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return; // Safety check
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formMessage = document.getElementById('formMessage');
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;

        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual logic)
        setTimeout(() => {
            formMessage.textContent = 'Thanks for reaching out! I\'ll get back to you within 24 hours.';
            formMessage.className = 'form-message success show';
            
            // Reset form
            this.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.classList.remove('show');
            }, 5000);
        }, 2000);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and behaviors
    createFloatingShapes();
    initInteractiveBackground();
    initCursorFollower();
    renderProjects();
    initScrollAnimations();
    initSmoothScroll();
    initContactForm(); 

    // Optional: Fade in entire page for polish
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Add fade in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);