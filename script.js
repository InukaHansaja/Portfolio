// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Navigation scroll effect
    initNavScrollEffect();
    
    // Mobile navigation toggle
    initMobileNavigation();
    
    // Intersection Observer for animations
    initScrollAnimations();
    
    // Project card interactions
    initProjectCardInteractions();
    
    // Contact form interactions (if needed)
    initContactInteractions();
    
    // Services section initialization
    initServicesSection();
});

/**
 * Initialize smooth scrolling for navigation links
 */
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navToggle = document.querySelector('.nav-toggle');
    
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80; // Account for fixed nav height
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                // Close mobile menu immediately if open
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    if (navToggle) {
                        navToggle.classList.remove('active');
                    }
                    document.body.style.overflow = '';
                }
                
                // Smooth scroll with enhanced options
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link with delay to ensure smooth transition
                setTimeout(() => {
                    updateActiveNavLink(targetId);
                }, 100);
            }
        });
    });
}

/**
 * Initialize mobile navigation
 */
function initMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    if (navToggle && mobileMenu) {
        // Toggle mobile menu
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (mobileMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenu.contains(e.target) && !navToggle.contains(e.target)) {
                if (mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
        
        // Close menu on nav link click with delay for smooth UX
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Add small delay before closing menu for better UX
                setTimeout(() => {
                    if (mobileMenu.classList.contains('active')) {
                        mobileMenu.classList.remove('active');
                        navToggle.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                }, 150);
            });
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

/**
 * Update active navigation link
 */
function updateActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

/**
 * Initialize navigation scroll effect with improved performance
 */
function initNavScrollEffect() {
    const nav = document.querySelector('nav');
    let lastScrollTop = 0;
    let scrolling = false;
    
    const handleScroll = () => {
        if (!scrolling) {
            scrolling = true;
            requestAnimationFrame(() => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                // Change nav background opacity based on scroll
                if (scrollTop > 100) {
                    nav.style.background = 'rgba(26, 11, 46, 0.95)';
                    nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
                    nav.style.backdropFilter = 'blur(10px)';
                } else {
                    nav.style.background = 'rgba(26, 11, 46, 0.9)';
                    nav.style.boxShadow = 'none';
                    nav.style.backdropFilter = 'blur(5px)';
                }
                
                // Auto-hide nav on scroll down (optional - can be disabled)
                if (scrollTop > lastScrollTop && scrollTop > 200) {
                    nav.style.transform = 'translateY(-100%)';
                } else {
                    nav.style.transform = 'translateY(0)';
                }
                
                lastScrollTop = scrollTop;
                scrolling = false;
            });
        }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
}

/**
 * Initialize scroll-triggered animations with better performance
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Stagger animation for grid items
                if (entry.target.classList.contains('project-card') || 
                    entry.target.classList.contains('service-card')) {
                    const cards = entry.target.parentElement.children;
                    const index = Array.from(cards).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.project-card, .service-card, .showcase-item, .tech-icons, .logo-3d'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

/**
 * Initialize project card interactions
 */
function initProjectCardInteractions() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        card.addEventListener('click', function() {
            this.style.animation = 'pulse 0.6s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    });
}

/**
 * Initialize contact form interactions
 */
function initContactInteractions() {
    const contactEmail = document.querySelector('.contact-email');
    const socialIcons = document.querySelectorAll('.social-icon');
    
    if (contactEmail) {
        contactEmail.addEventListener('click', function(e) {
            showNotification('Opening email client...');
        });
    }
    
    socialIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            showNotification('Social link clicked!');
        });
    });
}

/**
 * Initialize services section
 */
function initServicesSection() {
    // Initialize AOS if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100
        });
    } else {
        initFallbackAnimations();
    }
    
    initServiceCardInteractions();
    initFloatingShapes();
    initScrollEffects();
}

/**
 * Fallback animations if AOS library is not available
 */
function initFallbackAnimations() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    serviceCards.forEach(card => {
        observer.observe(card);
    });
    
    // Add CSS for fallback animation
    if (!document.querySelector('#fallback-animations')) {
        const style = document.createElement('style');
        style.id = 'fallback-animations';
        style.textContent = `
            .service-card {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .service-card.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Service card interactions
 */
function initServiceCardInteractions() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            
            const techTags = this.querySelectorAll('.tech-tag');
            techTags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'translateY(-3px) scale(1.05)';
                }, index * 50);
            });
            
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1.15) rotate(10deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            
            const techTags = this.querySelectorAll('.tech-tag');
            techTags.forEach(tag => {
                tag.style.transform = 'translateY(0) scale(1)';
            });
            
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
        
        card.addEventListener('click', function(e) {
            createRippleEffect(this, e);
            console.log('Service card clicked:', this.querySelector('.service-title').textContent);
        });
    });
}

/**
 * Create ripple effect on click
 */
function createRippleEffect(element, event) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(255, 193, 7, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        z-index: 0;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    if (!document.querySelector('#ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

/**
 * Enhanced floating shapes animation
 */
function initFloatingShapes() {
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        shape.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            this.style.transform = 'scale(1.2)';
        });
        
        shape.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            this.style.transform = 'scale(1)';
        });
        
        setInterval(() => {
            if (Math.random() > 0.7) {
                const randomX = Math.random() * 20 - 10;
                const randomY = Math.random() * 20 - 10;
                shape.style.transform += ` translate(${randomX}px, ${randomY}px)`;
                
                setTimeout(() => {
                    shape.style.transform = shape.style.transform.replace(/translate\([^)]*\)/g, '');
                }, 2000);
            }
        }, 3000 + index * 1000);
    });
}

/**
 * Scroll effects with throttling for better performance
 */
function initScrollEffects() {
    const servicesSection = document.querySelector('.services-section');
    
    const throttledScrollHandler = throttle(() => {
        const scrolled = window.pageYOffset;
        
        if (servicesSection) {
            const sectionTop = servicesSection.offsetTop;
            const sectionHeight = servicesSection.offsetHeight;
            const windowHeight = window.innerHeight;
            
            if (scrolled > sectionTop - windowHeight && scrolled < sectionTop + sectionHeight) {
                const shapes = document.querySelectorAll('.shape');
                shapes.forEach((shape, index) => {
                    const speed = 0.1 + index * 0.05;
                    const yPos = (scrolled - sectionTop) * speed;
                    shape.style.transform += ` translateY(${yPos}px)`;
                });
            }
        }
    }, 16); // ~60fps
    
    window.addEventListener('scroll', throttledScrollHandler, { passive: true });
}

/**
 * Show temporary notification
 */
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(45deg, #a855f7, #ec4899);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        z-index: 10000;
        opacity: 0;
        transform: translateX(100px);
        transition: all 0.3s ease;
        box-shadow: 0 10px 25px rgba(168, 85, 247, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 2000);
}

/**
 * Performance optimization: Throttle function
 */
function throttle(func, wait) {
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

// Export functions for external use if needed
window.NavigationUtils = {
    scrollToSection: function(targetId) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const headerOffset = 80;
            const elementPosition = targetSection.offsetTop;
            const offsetPosition = elementPosition - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    },
    updateActiveNav: updateActiveNavLink,
    showNotification: showNotification
};