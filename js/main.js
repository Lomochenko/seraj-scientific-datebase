// Seraj Scientific Database - Main JavaScript

// Language translations
const translations = {
    fa: {
        // Navigation
        'current-lang': 'فارسی',
        'login-text': 'ورود / ثبت نام',

        // Hero Section
        'hero-title': 'بزرگترین پایگاه داده علمی ایران',
        'hero-subtitle': 'دسترسی به بیش از ۱۳۵ میلیون مدرک علمی شامل مقالات، کتاب‌ها، پایان‌نامه‌ها و منابع تحقیقاتی',
        'search-placeholder': 'جستجوی مقالات، نویسندگان، موضوعات...',
        'search-input-mobile': 'جستجو در سراج...',

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
        'current-lang': 'English',
        'login-text': 'Login / Register',

        // Hero Section
        'hero-title': 'Iran\'s Largest Scientific Database',
        'hero-subtitle': 'Access to over 135 million scientific documents including articles, books, theses and research resources',
        'search-placeholder': 'Search articles, authors, topics...',
        'search-input-mobile': 'Search in Seraj...',

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

    // Login button functionality
    const loginBtn = document.getElementById('login-btn');

    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }
}

// Handle Login Action
function handleLogin() {
    showToast('صفحه ورود/ثبت نام در حال توسعه است', 'info');
}

// Initialize Search
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');

    if (searchInput && searchBtn) {
        // Set responsive placeholder
        updateSearchPlaceholder();

        // Update placeholder on window resize
        window.addEventListener('resize', updateSearchPlaceholder);

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

// Update Search Placeholder based on screen size
function updateSearchPlaceholder() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        const isMobile = window.innerWidth <= 767;
        const placeholderKey = isMobile ? 'search-input-mobile' : 'search-placeholder';

        if (translations[currentLanguage] && translations[currentLanguage][placeholderKey]) {
            searchInput.placeholder = translations[currentLanguage][placeholderKey];
        }
    }
}



// Show Search Suggestions
function showSearchSuggestions(query) {
    // Placeholder for search suggestions
    // TODO: Implement search suggestions
}

// Hide Search Suggestions
function hideSearchSuggestions() {
    // Placeholder for hiding suggestions
    // TODO: Implement hiding suggestions
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

// Initialize Loading Skeletons
function initializeLoadingSkeletons() {
    // Create intersection observer for skeleton sections
    const skeletonObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;
                const sectionType = getSectionType(section);

                if (sectionType) {
                    // Start loading animation for this section
                    startSectionLoading(sectionType);
                    // Stop observing this section
                    skeletonObserver.unobserve(section);
                }
            }
        });
    }, {
        threshold: 0.2, // Trigger when 20% of section is visible
        rootMargin: '50px 0px' // Start loading 50px before section comes into view
    });

    // Observe all sections with skeletons using data attributes
    const sectionsToObserve = document.querySelectorAll('[data-skeleton-section]');

    sectionsToObserve.forEach(section => {
        if (section) {
            skeletonObserver.observe(section);
        }
    });

    // Show stats immediately since it's in hero section
    setTimeout(() => {
        showContent('stats');
    }, 1500);
}

// Get section type from element
function getSectionType(element) {
    // Use data attribute for cleaner detection
    const sectionType = element.getAttribute('data-skeleton-section');
    if (sectionType) {
        return sectionType;
    }

    // Fallback to old method
    if (element.classList.contains('stats-container')) {
        return 'stats';
    }
    if (element.querySelector('.skeleton-researchers')) {
        return 'researchers';
    }
    if (element.querySelector('.skeleton-institutions')) {
        return 'institutions';
    }
    if (element.querySelector('.skeleton-countries')) {
        return 'countries';
    }
    if (element.id === 'statistics') {
        return 'charts';
    }

    return null;
}

// Start loading animation for specific section
function startSectionLoading(sectionType) {
    const loadingDuration = 2000; // 2 seconds loading time

    // Add visual indicator that loading has started
    const skeletonElement = document.querySelector(`.skeleton-${sectionType}`);
    if (skeletonElement) {
        skeletonElement.classList.add('loading-active');
    }

    setTimeout(() => {
        showContent(sectionType);
    }, loadingDuration);
}

// Show Content and Hide Skeleton
function showContent(section) {
    const skeletonElement = document.querySelector(`.skeleton-${section}`);
    const contentElement = document.querySelector(`.${section}-content`);

    if (skeletonElement && contentElement) {
        // Fade out skeleton
        skeletonElement.style.transition = 'opacity 0.3s ease';
        skeletonElement.style.opacity = '0';

        setTimeout(() => {
            skeletonElement.style.display = 'none';
            contentElement.style.display = 'block';

            // Fade in content
            contentElement.style.opacity = '0';
            contentElement.style.transition = 'opacity 0.5s ease';

            setTimeout(() => {
                contentElement.style.opacity = '1';

                // Trigger animations for the newly shown content
                if (section === 'stats') {
                    initializeCounters();
                }
            }, 50);
        }, 300);
    }

    // Special handling for charts
    if (section === 'charts') {
        const categoriesSkeletonElement = document.querySelector('.skeleton-categories-chart');
        const categoriesContentElement = document.querySelector('.categories-chart-content');
        const topicsSkeletonElement = document.querySelector('.skeleton-topics-chart');
        const topicsContentElement = document.querySelector('.topics-chart-content');

        // Show categories chart
        if (categoriesSkeletonElement && categoriesContentElement) {
            categoriesSkeletonElement.style.transition = 'opacity 0.3s ease';
            categoriesSkeletonElement.style.opacity = '0';

            setTimeout(() => {
                categoriesSkeletonElement.style.display = 'none';
                categoriesContentElement.style.display = 'block';
                categoriesContentElement.style.opacity = '0';
                categoriesContentElement.style.transition = 'opacity 0.5s ease';

                setTimeout(() => {
                    categoriesContentElement.style.opacity = '1';
                }, 50);
            }, 300);
        }

        // Show topics chart
        if (topicsSkeletonElement && topicsContentElement) {
            topicsSkeletonElement.style.transition = 'opacity 0.3s ease';
            topicsSkeletonElement.style.opacity = '0';

            setTimeout(() => {
                topicsSkeletonElement.style.display = 'none';
                topicsContentElement.style.display = 'block';
                topicsContentElement.style.opacity = '0';
                topicsContentElement.style.transition = 'opacity 0.5s ease';

                setTimeout(() => {
                    topicsContentElement.style.opacity = '1';
                }, 50);
            }, 300);
        }
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

// Stats Section Animation
const initStatsAnimation = () => {
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;

    const showStatsOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.8;
        const statsSectionTop = statsSection.getBoundingClientRect().top;

        if (statsSectionTop < triggerBottom) {
            statsSection.classList.add('visible');
            startCountingAnimation();
            window.removeEventListener('scroll', showStatsOnScroll);
        }
    };

    const startCountingAnimation = () => {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(number => {
            const target = parseInt(number.getAttribute('data-target'));
            const countUp = new CountUp(number, target, {
                duration: 2.5,
                separator: ',',
                useGrouping: true
            });
            
            if (!countUp.error) {
                countUp.start();
            }
        });
    };

    window.addEventListener('scroll', showStatsOnScroll);
};

// Initialize stats animation when document is ready
document.addEventListener('DOMContentLoaded', () => {
    initStatsAnimation();
});

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
    // Monitor page load time for optimization
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    // Store load time for analytics if needed
    window.pageLoadTime = loadTime;
});

// Add loading indicator to search
function addSearchLoading() {
    const searchBtn = document.getElementById('search-btn');
    if (searchBtn) {
        const originalHTML = searchBtn.innerHTML;
        searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        searchBtn.disabled = true;

        setTimeout(() => {
            searchBtn.innerHTML = originalHTML;
            searchBtn.disabled = false;
        }, 2000);
    }
}

// Update perform search to include loading
function performSearch() {
    const searchInput = document.getElementById('search-input');
    const query = searchInput.value.trim();

    if (query) {
        // Add loading state
        addSearchLoading();

        // Simulate search (replace with actual search implementation)
        setTimeout(() => {
            showToast(`جستجو برای: ${query}`, 'success');
        }, 2000);
    }
}

// Export functions for use in other files
window.SerajApp = {
    changeLanguage,
    showToast,
    showLoading,
    hideLoading,
    formatNumber,
    showContent
};

// Parallax and Mouse Move Effects
document.addEventListener('mousemove', function(e) {
    const bg = document.querySelector('.hero-background');
    if (!bg) return;
    const x = e.clientX / window.innerWidth * 100;
    const y = e.clientY / window.innerHeight * 100;
    bg.style.background = `
        radial-gradient(circle at ${x+20}% ${y+10}%, rgba(255,255,255,0.13) 0, transparent 60%),
        radial-gradient(circle at ${x-30}% ${y+40}%, rgba(255,255,255,0.10) 0, transparent 70%)
    `;
});
