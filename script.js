/**
 * MAKESH K — AI Engineer Portfolio Script
 * Author: Makesh K
 */

document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    initScrollHeader();
    initActiveNavHighlight();
    initScrollReveal();
    setCurrentYear();
});

/**
 * Mobile Drawer Menu Navigation
 */
function initMobileNav() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const toggleIcon = document.getElementById('toggle-icon');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!mobileToggle || !navMenu) return;

    function toggleMenu() {
        const isOpen = navMenu.classList.contains('open');
        if (isOpen) {
            navMenu.classList.remove('open');
            mobileToggle.setAttribute('aria-expanded', 'false');
            toggleIcon.className = 'fa-solid fa-bars';
        } else {
            navMenu.classList.add('open');
            mobileToggle.setAttribute('aria-expanded', 'true');
            toggleIcon.className = 'fa-solid fa-xmark';
        }
    }

    mobileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
            toggleMenu();
        }
    });
}

/**
 * Sticky Glass Header Scroll State
 */
function initScrollHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true });
}

/**
 * Scroll Intersection Observer for Active Nav Link
 */
function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!sections.length || !navLinks.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

/**
 * Intersection Observer for Reveal-On-Scroll Animations
 */
function initScrollReveal() {
    const cards = document.querySelectorAll('.skill-category, .timeline-card, .project-card, .education-card, .cert-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.classList.add('reveal-on-scroll');
        observer.observe(card);
    });
}

/**
 * Dynamic Footer Year
 */
function setCurrentYear() {
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}
