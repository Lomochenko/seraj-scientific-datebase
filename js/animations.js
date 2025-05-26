// Seraj Scientific Database - Animations JavaScript

// Animation configurations
const animationConfig = {
    duration: 800,
    easing: 'ease-in-out',
    delay: 100,
    offset: 100,
    once: true
};

// Initialize Animations
function initializeAnimations() {
    // Initialize AOS with custom settings
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: animationConfig.duration,
            easing: animationConfig.easing,
            delay: animationConfig.delay,
            offset: animationConfig.offset,
            once: animationConfig.once,
            mirror: false,
            anchorPlacement: 'top-bottom'
        });
    }
    
    // Initialize custom animations
    initializeScrollAnimations();
    initializeHoverAnimations();
    initializeLoadingAnimations();
    initializeParallaxEffects();
}

// Initialize Scroll Animations
function initializeScrollAnimations() {
    // Create intersection observer for custom animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add stagger effect for grouped elements
                if (entry.target.hasAttribute('data-stagger')) {
                    addStaggerEffect(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('[data-aos], .animate-on-scroll');
    animatedElements.forEach(element => {
        scrollObserver.observe(element);
    });
}

// Add Stagger Effect
function addStaggerEffect(container) {
    const children = container.children;
    Array.from(children).forEach((child, index) => {
        setTimeout(() => {
            child.classList.add('stagger-animate');
        }, index * 100);
    });
}

// Initialize Hover Animations
function initializeHoverAnimations() {
    // Card hover effects
    const cards = document.querySelectorAll('.tutorial-card, .top-card, .stat-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover-animate');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover-animate');
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            createRippleEffect(this);
        });
    });
    
    // Navigation link hover effects
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.classList.add('nav-hover');
        });
        
        link.addEventListener('mouseleave', function() {
            this.classList.remove('nav-hover');
        });
    });
}

// Create Ripple Effect
function createRippleEffect(element) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (event.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (event.clientY - rect.top - size / 2) + 'px';
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Initialize Loading Animations
function initializeLoadingAnimations() {
    // Page load animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Animate hero section
        animateHeroSection();
        
        // Animate statistics
        setTimeout(() => {
            animateStatistics();
        }, 500);
    });
    
    // Loading skeleton for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadImage(entry.target);
                imageObserver.unobserve(entry.target);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Animate Hero Section
function animateHeroSection() {
    const heroTitle = document.querySelector('.hero-section h1');
    const heroSubtitle = document.querySelector('.hero-section .lead');
    const searchContainer = document.querySelector('.search-container');
    
    if (heroTitle) {
        heroTitle.classList.add('animate-fade-in-up');
    }
    
    if (heroSubtitle) {
        setTimeout(() => {
            heroSubtitle.classList.add('animate-fade-in-up');
        }, 200);
    }
    
    if (searchContainer) {
        setTimeout(() => {
            searchContainer.classList.add('animate-fade-in-up');
        }, 400);
    }
}

// Animate Statistics
function animateStatistics() {
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animate-scale-in');
        }, index * 100);
    });
}

// Load Image with Animation
function loadImage(img) {
    const src = img.getAttribute('data-src');
    if (src) {
        img.classList.add('loading');
        
        const newImg = new Image();
        newImg.onload = function() {
            img.src = src;
            img.classList.remove('loading');
            img.classList.add('loaded');
        };
        newImg.src = src;
    }
}

// Initialize Parallax Effects
function initializeParallaxEffects() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', throttle(updateParallax, 16));
    }
}

// Update Parallax
function updateParallax() {
    const scrollTop = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-parallax') || 0.5;
        const yPos = -(scrollTop * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}

// Smooth Scroll Animation
function smoothScrollTo(target, duration = 800) {
    const targetElement = typeof target === 'string' ? document.querySelector(target) : target;
    
    if (!targetElement) return;
    
    const targetPosition = targetElement.offsetTop - 80; // Account for fixed navbar
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Typing Animation
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Fade In Animation
function fadeIn(element, duration = 500) {
    element.style.opacity = 0;
    element.style.display = 'block';
    
    let start = null;
    
    function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const opacity = Math.min(progress / duration, 1);
        
        element.style.opacity = opacity;
        
        if (progress < duration) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

// Fade Out Animation
function fadeOut(element, duration = 500) {
    let start = null;
    const initialOpacity = parseFloat(getComputedStyle(element).opacity);
    
    function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const opacity = Math.max(initialOpacity - (progress / duration), 0);
        
        element.style.opacity = opacity;
        
        if (progress < duration) {
            requestAnimationFrame(animate);
        } else {
            element.style.display = 'none';
        }
    }
    
    requestAnimationFrame(animate);
}

// Slide Animation
function slideToggle(element, duration = 300) {
    if (element.style.display === 'none' || !element.style.display) {
        slideDown(element, duration);
    } else {
        slideUp(element, duration);
    }
}

function slideDown(element, duration = 300) {
    element.style.display = 'block';
    element.style.height = '0px';
    element.style.overflow = 'hidden';
    
    const targetHeight = element.scrollHeight + 'px';
    
    element.animate([
        { height: '0px' },
        { height: targetHeight }
    ], {
        duration: duration,
        easing: 'ease-out'
    }).onfinish = function() {
        element.style.height = 'auto';
        element.style.overflow = 'visible';
    };
}

function slideUp(element, duration = 300) {
    const currentHeight = element.offsetHeight + 'px';
    element.style.height = currentHeight;
    element.style.overflow = 'hidden';
    
    element.animate([
        { height: currentHeight },
        { height: '0px' }
    ], {
        duration: duration,
        easing: 'ease-out'
    }).onfinish = function() {
        element.style.display = 'none';
        element.style.height = 'auto';
        element.style.overflow = 'visible';
    };
}

// Pulse Animation
function pulse(element, duration = 1000) {
    element.animate([
        { transform: 'scale(1)', opacity: 1 },
        { transform: 'scale(1.05)', opacity: 0.8 },
        { transform: 'scale(1)', opacity: 1 }
    ], {
        duration: duration,
        easing: 'ease-in-out'
    });
}

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', initializeAnimations);

// Export animation functions
window.SerajAnimations = {
    smoothScrollTo,
    typeWriter,
    fadeIn,
    fadeOut,
    slideToggle,
    slideDown,
    slideUp,
    pulse,
    createRippleEffect
};
