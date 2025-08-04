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
