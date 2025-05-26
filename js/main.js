// Seraj Scientific Database - Main JavaScript

// Language translations
const translations = {
    fa: {
        // Navigation
        'advanced-search': 'جستجوی پیشرفته',
        'current-lang': 'فارسی',
        'login-text': 'ورود / ثبت نام',

        // Hero Section
        'hero-title': 'بزرگترین پایگاه داده علمی ایران',
        'hero-subtitle': 'دسترسی به بیش از ۱۳۵ میلیون مدرک علمی شامل مقالات، کتاب‌ها، پایان‌نامه‌ها و منابع تحقیقاتی',
        'search-placeholder': 'جستجوی مقالات، نویسندگان، موضوعات...',

        // Tutorial Section
        'tutorial-title': 'چگونه از سراج استفاده کنیم؟',
        'tutorial-subtitle': 'در چند مرحله ساده به منابع علمی دسترسی پیدا کنید',

        // Top Section
        'top-title': 'برترین‌ها در سراج',
        'top-subtitle': 'پژوهشگران، موسسات و کشورهای پیشرو در علم',
        'top-researchers-title': 'پژوهشگران برتر',
        'top-institutions-title': 'موسسات برتر',
        'top-countries-title': 'کشورهای برتر',

        // Statistics Section
        'stats-title': 'آمار و تجسم داده‌ها',
        'stats-subtitle': 'نمایش آماری از دسته‌بندی‌ها و موضوعات تحقیقاتی',
        'categories-chart-title': 'دسته‌بندی‌های کلی',
        'topics-chart-title': 'موضوعات تخصصی',

        // Footer
        'footer-about-title': 'درباره سراج',
        'footer-about-text': 'سراج بزرگترین پایگاه داده علمی ایران است که دسترسی به میلیون‌ها مدرک علمی را فراهم می‌کند.',
        'footer-services-title': 'خدمات',
        'footer-support-title': 'پشتیبانی',
        'footer-contact-title': 'تماس با ما',
        'footer-copyright': '© ۲۰۲۴ سراج. تمامی حقوق محفوظ است.'
    },
    en: {
        // Navigation
        'advanced-search': 'Advanced Search',
        'current-lang': 'English',
        'login-text': 'Login / Register',

        // Hero Section
        'hero-title': 'Iran\'s Largest Scientific Database',
        'hero-subtitle': 'Access to over 135 million scientific documents including articles, books, theses and research resources',
        'search-placeholder': 'Search articles, authors, topics...',

        // Tutorial Section
        'tutorial-title': 'How to Use Seraj?',
        'tutorial-subtitle': 'Access scientific resources in a few simple steps',

        // Top Section
        'top-title': 'Top in Seraj',
        'top-subtitle': 'Leading researchers, institutions and countries in science',
        'top-researchers-title': 'Top Researchers',
        'top-institutions-title': 'Top Institutions',
        'top-countries-title': 'Top Countries',

        // Statistics Section
        'stats-title': 'Statistics and Data Visualization',
        'stats-subtitle': 'Statistical display of research categories and topics',
        'categories-chart-title': 'General Categories',
        'topics-chart-title': 'Specialized Topics',

        // Footer
        'footer-about-title': 'About Seraj',
        'footer-about-text': 'Seraj is Iran\'s largest scientific database providing access to millions of scientific documents.',
        'footer-services-title': 'Services',
        'footer-support-title': 'Support',
        'footer-contact-title': 'Contact Us',
        'footer-copyright': '© 2024 Seraj. All rights reserved.'
    }
};

// Current language
let currentLanguage = 'fa';

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Initialize components
    initializeNavbar();
    initializeSearch();
    initializeCounters();
    initializeLanguageSwitch();
    initializeScrollEffects();
    initializeLoadingSkeletons();

    // Set initial language
    updateLanguage(currentLanguage);
});

// Initialize Navbar
function initializeNavbar() {
    const navbar = document.querySelector('.navbar');

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });
    }
}

// Initialize Search
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');

    if (searchInput && searchBtn) {
        // Search button click
        searchBtn.addEventListener('click', function() {
            performSearch();
        });

        // Enter key press
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        // Search suggestions (placeholder for future implementation)
        searchInput.addEventListener('input', function() {
            const query = this.value.trim();
            if (query.length > 2) {
                // Show search suggestions
                showSearchSuggestions(query);
            } else {
                hideSearchSuggestions();
            }
        });
    }
}

// Perform Search
function performSearch() {
    const searchInput = document.getElementById('search-input');
    const query = searchInput.value.trim();

    if (query) {
        // Add loading state
        searchInput.classList.add('loading');

        // Simulate search (replace with actual search implementation)
        setTimeout(() => {
            searchInput.classList.remove('loading');
            alert(`جستجو برای: ${query}`);
        }, 1000);
    }
}

// Show Search Suggestions
function showSearchSuggestions(query) {
    // Placeholder for search suggestions
    console.log('Showing suggestions for:', query);
}

// Hide Search Suggestions
function hideSearchSuggestions() {
    // Placeholder for hiding suggestions
    console.log('Hiding suggestions');
}

// Initialize Counters
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');

    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Animate Counter
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60 FPS
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }

        // Format number with commas
        element.textContent = formatNumber(Math.floor(current));
    }, 16);
}

// Format Number with Commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Initialize Language Switch
function initializeLanguageSwitch() {
    const languageDropdown = document.getElementById('languageDropdown');

    if (languageDropdown) {
        languageDropdown.addEventListener('click', function(e) {
            e.preventDefault();
        });
    }
}

// Change Language
function changeLanguage(lang) {
    currentLanguage = lang;
    updateLanguage(lang);

    // Update HTML attributes
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';

    // Update body class for styling
    document.body.className = document.body.className.replace(/lang-\w+/, '');
    document.body.classList.add(`lang-${lang}`);
}

// Update Language
function updateLanguage(lang) {
    const elements = document.querySelectorAll('[id]');

    elements.forEach(element => {
        const key = element.id;
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'INPUT' && element.type === 'text') {
                element.placeholder = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });

    // Update current language display
    const currentLangElement = document.getElementById('current-lang');
    if (currentLangElement) {
        currentLangElement.textContent = translations[lang]['current-lang'];
    }
}

// Initialize Scroll Effects
function initializeScrollEffects() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');

        if (heroSection) {
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Utility Functions

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
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
    };
}

// Show Loading
function showLoading(element) {
    element.classList.add('loading');
}

// Hide Loading
function hideLoading(element) {
    element.classList.remove('loading');
}

// Show Toast Message
function showToast(message, type = 'info') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    // Add to page
    document.body.appendChild(toast);

    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // You can add error reporting here
});

// Performance Monitoring
window.addEventListener('load', function() {
    // Log page load time
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log(`Page loaded in ${loadTime}ms`);
});

// Export functions for use in other files
window.SerajApp = {
    changeLanguage,
    showToast,
    showLoading,
    hideLoading,
    formatNumber
};
