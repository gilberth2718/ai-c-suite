// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavbar();
    initializeScrollAnimations();
    initializeCTAButtons();
    initializeParallaxEffect();
    initializeTypewriterEffect();
});

// Navbar functionality
function initializeNavbar() {
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(26, 26, 26, 0.95)';
            header.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.3)';
        } else {
            header.style.background = 'rgba(26, 26, 26, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .role-card, .section-title');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add CSS for scroll animations
    const style = document.createElement('style');
    style.textContent = `
        .feature-card, .role-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .feature-card.animate-in, .role-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .section-title {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.8s ease;
        }
        
        .section-title.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

// CTA Button functionality
function initializeCTAButtons() {
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Handle different button actions
            switch(buttonText) {
                case 'Join Waitlist':
                    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
                    break;
                case 'Learn More':
                    scrollToSection('#about');
                    break;
            }
        });
    });
}

// Parallax effect for hero section
function initializeParallaxEffect() {
    const heroSection = document.querySelector('.hero-section');
    const aiVisual = document.querySelector('.hero-visual');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (heroSection && scrolled < heroSection.offsetHeight) {
            if (aiVisual) {
                aiVisual.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        }
    });
}

// Typewriter effect for hero title
function initializeTypewriterEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    // Extract text content while preserving the gradient span structure
    const fullText = 'Replace Your Entire C-Suite with AI C-Suite';
    const beforeGradient = 'Replace Your Entire ';
    const gradientText = 'C-Suite';
    const afterGradient = ' with AI C-Suite';
    
    // Clear the title and set up for animation
    heroTitle.innerHTML = '';
    heroTitle.style.opacity = '1';
    
    let index = 0;
    const speed = 80;
    
    function typeWriter() {
        if (index < fullText.length) {
            const currentChar = fullText[index];
            const currentText = fullText.slice(0, index + 1);
            
            // Build the HTML with proper gradient span placement
            if (index < beforeGradient.length) {
                // Still typing the beginning part
                heroTitle.innerHTML = currentText;
            } else if (index < beforeGradient.length + gradientText.length) {
                // Typing the gradient part
                const gradientPart = currentText.slice(beforeGradient.length);
                heroTitle.innerHTML = beforeGradient + '<span class="gradient-text">' + gradientPart + '</span>';
            } else {
                // Typing the end part
                const endPart = currentText.slice(beforeGradient.length + gradientText.length);
                heroTitle.innerHTML = beforeGradient + '<span class="gradient-text">' + gradientText + '</span>' + endPart;
            }
            
            index++;
            setTimeout(typeWriter, speed);
        }
    }
    
    // Start typewriter effect after a delay
    setTimeout(typeWriter, 1200);
}

// Modal functionality
function showWaitlistModal() {
    const modal = createModal('Join Our Waitlist', `
        <div class="modal-content">
            <h3>Get Early Access to AI C-Suite</h3>
            <p>Be among the first to experience the future of executive leadership.</p>
            <form class="waitlist-form">
                <input type="text" placeholder="Company Name" required>
                <input type="email" placeholder="Email Address" required>
                <select required>
                    <option value="">Company Size</option>
                    <option value="startup">Startup (1-50 employees)</option>
                    <option value="medium">Medium (51-500 employees)</option>
                    <option value="large">Large (500+ employees)</option>
                </select>
                <button type="submit" class="cta-button primary">Join Waitlist</button>
            </form>
        </div>
    `);
    
    const form = modal.querySelector('.waitlist-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        showSuccessMessage('Thanks for joining! We\'ll be in touch soon.');
        closeModal(modal);
    });
}

function showDemoModal() {
    const modal = createModal('Request a Demo', `
        <div class="modal-content">
            <h3>See AI C-Suite in Action</h3>
            <p>Schedule a personalized demonstration of our AI executive platform.</p>
            <form class="demo-form">
                <input type="text" placeholder="Full Name" required>
                <input type="email" placeholder="Email Address" required>
                <input type="text" placeholder="Company Name" required>
                <input type="tel" placeholder="Phone Number" required>
                <textarea placeholder="Tell us about your executive challenges" rows="3"></textarea>
                <button type="submit" class="cta-button primary">Request Demo</button>
            </form>
        </div>
    `);
    
    const form = modal.querySelector('.demo-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        showSuccessMessage('Demo request submitted! Our team will contact you within 24 hours.');
        closeModal(modal);
    });
}

// Modal helper functions
function createModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h2>${title}</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            opacity: 0;
            animation: fadeIn 0.3s ease forwards;
        }
        
        .modal {
            background: white;
            border-radius: 1rem;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
            transform: scale(0.9);
            animation: scaleIn 0.3s ease forwards;
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem;
            border-bottom: 1px solid #e5e7eb;
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #6b7280;
            padding: 0.5rem;
            border-radius: 0.5rem;
            transition: background-color 0.2s ease;
        }
        
        .modal-close:hover {
            background-color: #f3f4f6;
        }
        
        .modal-body {
            padding: 1.5rem;
        }
        
        .modal-content h3 {
            margin-bottom: 0.5rem;
            color: #1f2937;
        }
        
        .modal-content p {
            margin-bottom: 1.5rem;
            color: #6b7280;
        }
        
        .waitlist-form, .demo-form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        
        .waitlist-form input, .waitlist-form select,
        .demo-form input, .demo-form select, .demo-form textarea {
            padding: 0.75rem;
            border: 1px solid #d1d5db;
            border-radius: 0.5rem;
            font-size: 1rem;
            transition: border-color 0.3s ease;
        }
        
        .waitlist-form input:focus, .waitlist-form select:focus,
        .demo-form input:focus, .demo-form select:focus, .demo-form textarea:focus {
            outline: none;
            border-color: #6366f1;
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }
        
        @keyframes fadeIn {
            to { opacity: 1; }
        }
        
        @keyframes scaleIn {
            to { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(modal);
    
    // Close modal handlers
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => closeModal(modal));
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
    
    return modal;
}

function closeModal(modal) {
    modal.style.animation = 'fadeOut 0.3s ease forwards';
    setTimeout(() => {
        modal.remove();
    }, 300);
    
    // Add fadeOut animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    const style = document.createElement('style');
    style.textContent = `
        .success-message {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
            z-index: 10001;
            animation: slideInRight 0.3s ease;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// Utility function for smooth scrolling
function scrollToSection(selector) {
    const element = document.querySelector(selector);
    if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Add some interactive features for the AI brain
document.addEventListener('DOMContentLoaded', function() {
    const brainCore = document.querySelector('.brain-core');
    const neurons = document.querySelectorAll('.neuron');
    
    if (brainCore) {
        brainCore.addEventListener('mouseenter', function() {
            this.style.animationDuration = '0.5s';
            neurons.forEach(neuron => {
                neuron.style.animationDuration = '1s';
            });
        });
        
        brainCore.addEventListener('mouseleave', function() {
            this.style.animationDuration = '2s';
            neurons.forEach(neuron => {
                neuron.style.animationDuration = '4s';
            });
        });
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // Existing scroll handlers will be throttled
}, 16)); // ~60fps