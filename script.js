//Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('header');
    const scrollWatcher = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', scrollWatcher);

    // Update footer year
    const yearSpan = document.querySelector('#copyright-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }


    
        
   
    
    // Mobile menu toggle with animation
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event from propagating to document
        nav.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        menuToggle.classList.toggle('active');
    });
    
    // Close menu when clicking outside, but ensure the event doesn't trigger immediately
    document.addEventListener('click', (e) => {
        // Only process if menu is active and click is outside menu and toggle
        if (nav.classList.contains('active') && 
            !nav.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            // Small delay to prevent immediate closure when opening
            setTimeout(() => {
                nav.classList.remove('active');
                document.body.classList.remove('menu-open');
                menuToggle.classList.remove('active');
            }, 10);
        }
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            document.body.classList.remove('menu-open');
            menuToggle.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Projects filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Ensure all projects are visible on page load
    projectCards.forEach(card => {
        card.style.display = 'block';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    });
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Apply filtering on both mobile and desktop
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    // First make sure the display is set to block
                    card.style.display = 'block';
                    
                    // Force a reflow to ensure transitions work
                    void card.offsetWidth;
                    
                    // Then set opacity and transform
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                } else {
                    // Set opacity to 0 first
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    // Then after the transition, hide the element
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Parallax effect for sections - disable on mobile
    const parallaxSections = document.querySelectorAll('.hero, .about, .skills, .projects, .contact');
    const isMobile = window.innerWidth <= 768;
    
    // Reset any transforms on container elements for mobile
    if (isMobile) {
        parallaxSections.forEach(section => {
            if (section.querySelector('.container')) {
                section.querySelector('.container').style.transform = 'none';
            }
        });
    }
    
    window.addEventListener('scroll', () => {
        // Skip parallax on mobile devices
        if (isMobile) return;
        
        const scrollPosition = window.pageYOffset;
        
        parallaxSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop - window.innerHeight && 
                scrollPosition <= sectionTop + sectionHeight) {
                const speed = section.dataset.speed || 0.1;
                const yPos = (scrollPosition - sectionTop) * speed;
                
                if (section.querySelector('.container')) {
                    section.querySelector('.container').style.transform = `translateY(${yPos}px)`;
                }
            }
        });
    });
    
    // Enhance cursor follower with magnetic effect
    const cursorFollower = document.querySelector('.cursor-follower');
    const magneticElements = document.querySelectorAll('.btn, .social-link, .project-link');
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorFollower.style.opacity = '0';
    });
    
    const updateCursor = () => {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        cursorX += dx * 0.2;
        cursorY += dy * 0.2;
        
        cursorFollower.style.left = `${cursorX}px`;
        cursorFollower.style.top = `${cursorY}px`;
        
        requestAnimationFrame(updateCursor);
    };
    
    updateCursor();
    
    magneticElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorFollower.style.width = '50px';
            cursorFollower.style.height = '50px';
            cursorFollower.style.backgroundColor = 'rgba(184, 134, 11, 0.15)';
            cursorFollower.style.mixBlendMode = 'overlay';
        });
        
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const pull = 0.3;
            const dx = (centerX - mouseX) * pull;
            const dy = (centerY - mouseY) * pull;
            
            cursorFollower.style.transform = `translate(-50%, -50%) translate(${-dx}px, ${-dy}px)`;
        });
        
        element.addEventListener('mouseleave', () => {
            cursorFollower.style.width = '30px';
            cursorFollower.style.height = '30px';
            cursorFollower.style.backgroundColor = 'rgba(184, 134, 11, 0.2)';
            cursorFollower.style.mixBlendMode = 'normal';
            cursorFollower.style.transform = 'translate(-50%, -50%)';
        });
    });
    
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.about-content, .skill-item, .project-card, .contact-item');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('revealed');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    
    // Trigger first check
    revealOnScroll();
    
    // Initialize skill bars animation
    const skillLevels = document.querySelectorAll('.skill-level');
    
    const animateSkillBars = () => {
        // On mobile, make sure animations happen even if section isn't scrolled to
        if (isMobile) {
            skillLevels.forEach(level => {
                level.style.width = level.getAttribute('data-width') || level.style.width;
            });
            return;
        }
        
        skillLevels.forEach(level => {
            // Store the target width as a data attribute for reference
            const targetWidth = level.style.width;
            level.setAttribute('data-width', targetWidth);
            level.style.width = '0';
            
            setTimeout(() => {
                level.style.width = targetWidth;
            }, 300);
        });
    };
    
    // Ensure all skill bars have their widths set on page load for mobile
    if (isMobile) {
        setTimeout(() => {
            skillLevels.forEach(level => {
                level.style.width = level.getAttribute('data-width') || level.style.width;
            });
        }, 1000);
    }
    
    // Set up Intersection Observer for skill section
    const skillsSection = document.querySelector('.skills');
    
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        skillsObserver.observe(skillsSection);
    }
    
    // Update active navigation based on scroll position
    const sections = document.querySelectorAll('section');
    
    const updateActiveNav = () => {
        let current = '';
        const headerHeight = document.querySelector('header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', updateActiveNav);
    
    // Typing effect for the hero section
    const heroText = document.querySelector('.hero p');
    
    if (heroText) {
        const text = heroText.textContent;
        heroText.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing effect with a delay
        setTimeout(typeWriter, 1000);
    }
    
    // Check cookie consent
    checkCookieConsent();
    
    // Add CSS class for animations
    document.body.classList.add('loaded');
});

// Add reveal animation styles
const style = document.createElement('style');
style.textContent = `
    .about-content, .skill-item, .project-card, .contact-item {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .skill-item:nth-child(2) {
        transition-delay: 0.2s;
    }
    
    .skill-item:nth-child(3) {
        transition-delay: 0.4s;
    }
    
    .project-card:nth-child(1) {
        transition-delay: 0.1s;
    }
    
    .project-card:nth-child(2) {
        transition-delay: 0.2s;
    }
    
    .project-card:nth-child(3) {
        transition-delay: 0.3s;
    }
    
    .project-card:nth-child(4) {
        transition-delay: 0.4s;
    }
    
    .contact-item:nth-child(2) {
        transition-delay: 0.15s;
    }
    
    .contact-item:nth-child(3) {
        transition-delay: 0.3s;
    }
    
    body.menu-open {
        overflow: hidden;
    }
    
    /* Hamburger Menu Animation */
    .menu-toggle {
        position: relative;
        width: 30px;
        height: 20px;
        cursor: pointer;
        display: none;
        z-index: 1001;
    }
    
    .menu-toggle i {
        display: none;
    }
    
    .menu-toggle::before,
    .menu-toggle::after,
    .menu-toggle span {
        position: absolute;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: var(--gold);
        transition: all 0.3s ease;
    }
    
    .menu-toggle::before {
        content: '';
        top: 0;
    }
    
    .menu-toggle span {
        top: 9px;
    }
    
    .menu-toggle::after {
        content: '';
        bottom: 0;
    }
    
    .menu-toggle.active::before {
        transform: translateY(9px) rotate(45deg);
    }
    
    .menu-toggle.active span {
        opacity: 0;
    }
    
    .menu-toggle.active::after {
        transform: translateY(-9px) rotate(-45deg);
    }
    
    @media (max-width: 768px) {
        .menu-toggle {
            display: block;
        }
    }
    
    .form-group input.error,
    .form-group textarea.error {
        border-color: #ff3b30;
        box-shadow: 0 0 0 2px rgba(255, 59, 48, 0.2);
    }
    
    button.success {
        background-color: #28a745 !important;
    }
    
    body.loaded .hero h1 {
        animation: fadeInDown 1s ease forwards;
    }
    
    body.loaded .hero h2 {
        animation: fadeInUp 1s ease 0.3s forwards;
        opacity: 0;
    }
    
    body.loaded .cta-buttons {
        animation: fadeIn 1s ease 0.6s forwards;
        opacity: 0;
    }
    
    @keyframes fadeInDown {
        from {
            opacity: 0;
            transform: translateY(-30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

document.head.appendChild(style);

// Cookie Banner Functionality
const cookieBanner = document.querySelector('.cookie-banner');
const customizeBtn = document.querySelector('.cookie-btn.customize');
const acceptBtn = document.querySelector('.cookie-btn.accept');
const rejectBtn = document.querySelector('.cookie-btn.reject');
const saveBtn = document.querySelector('.cookie-btn.save');
const cookieSettings = document.querySelector('.cookie-settings');
const analyticsCookies = document.getElementById('analytics-cookies');
const marketingCookies = document.getElementById('marketing-cookies');

// Check if user has already set cookie preferences
const checkCookieConsent = () => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
        // Show cookie banner with slight delay
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1500);
    } else {
        // Parse stored preferences
        const preferences = JSON.parse(cookieConsent);
        
        // Apply stored preferences (can be implemented later)
        console.log('User cookie preferences:', preferences);
        
        // You can add actual cookie implementation here later
    }
};

// Handle customize button click
customizeBtn.addEventListener('click', () => {
    cookieSettings.classList.toggle('show');
});

// Handle accept all button click
acceptBtn.addEventListener('click', () => {
    const preferences = {
        essential: true,
        analytics: true,
        marketing: true,
        timestamp: new Date().toISOString()
    };
    
    // Save preferences to local storage
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    
    // Hide the banner
    cookieBanner.classList.remove('show');
});

// Handle reject all button click
rejectBtn.addEventListener('click', () => {
    const preferences = {
        essential: true, // Essential cookies are always required
        analytics: false,
        marketing: false,
        timestamp: new Date().toISOString()
    };
    
    // Save preferences to local storage
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    
    // Hide the banner
    cookieBanner.classList.remove('show');
});

// Handle save preferences button click
saveBtn.addEventListener('click', () => {
    const preferences = {
        essential: true, // Essential cookies are always required
        analytics: analyticsCookies.checked,
        marketing: marketingCookies.checked,
        timestamp: new Date().toISOString()
    };
    
    // Save preferences to local storage
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    
    // Hide the banner and settings
    cookieSettings.classList.remove('show');
    cookieBanner.classList.remove('show');
}); 