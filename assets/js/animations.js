// ===== PantherIQ Scroll Animations (GSAP) =====
document.addEventListener('DOMContentLoaded', () => {
    // Register ScrollTrigger
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        initGSAPAnimations();
    } else {
        // Fallback: use Intersection Observer
        initFallbackAnimations();
    }
});

function initGSAPAnimations() {
    // Hero elements - show immediately, no animation (prevents flash of invisible content)
    gsap.set('.hero-eyebrow, .hero-title, .hero-subtitle, .hero-cta, .hero-stats', { opacity: 1, y: 0, clearProps: 'all' });

    // Section reveals
    gsap.utils.toArray('.section-tag').forEach(tag => {
        gsap.from(tag, {
            scrollTrigger: { trigger: tag, start: 'top 85%', toggleActions: 'play none none none' },
            opacity: 0, x: -30, duration: 0.6
        });
    });

    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: { trigger: title, start: 'top 85%', toggleActions: 'play none none none' },
            opacity: 0, y: 40, duration: 0.8
        });
    });

    // Problem cards stagger
    gsap.from('.problem-card', {
        scrollTrigger: { trigger: '.problem-grid', start: 'top 80%' },
        opacity: 0, y: 50, stagger: 0.15, duration: 0.8
    });

    // Service cards stagger
    gsap.from('.service-card', {
        scrollTrigger: { trigger: '.services-grid', start: 'top 80%' },
        opacity: 0, y: 60, scale: 0.95, stagger: 0.2, duration: 0.8
    });

    // Process section is driven by process.js (scroll-linked rail) — GSAP
    // must not write inline styles on .process-step or .timeline-line.

    // Dashboard entrance
    gsap.from('.proof-dashboard', {
        scrollTrigger: { trigger: '.proof-showcase', start: 'top 80%' },
        opacity: 0, y: 60, scale: 0.9, duration: 1, ease: 'power3.out'
    });

    // Dashboard stats counter
    gsap.from('.dash-stat-value', {
        scrollTrigger: { trigger: '.dashboard-stats', start: 'top 85%' },
        textContent: 0, duration: 2, stagger: 0.2,
        snap: { textContent: 1 }
    });

    // Trust cards
    gsap.from('.trust-card', {
        scrollTrigger: { trigger: '.trust-grid', start: 'top 80%' },
        opacity: 0, y: 40, stagger: 0.1, duration: 0.6
    });

    // About section
    gsap.from('.about-text', {
        scrollTrigger: { trigger: '.about-content', start: 'top 80%' },
        opacity: 0, x: -40, duration: 0.8
    });

    gsap.from('.about-metrics .metric', {
        scrollTrigger: { trigger: '.about-metrics', start: 'top 85%' },
        opacity: 0, y: 30, stagger: 0.15, duration: 0.6
    });

    // Contact form
    gsap.from('.contact-form-wrap', {
        scrollTrigger: { trigger: '.contact-grid', start: 'top 80%' },
        opacity: 0, x: -40, duration: 0.8
    });

    gsap.from('.contact-info', {
        scrollTrigger: { trigger: '.contact-grid', start: 'top 80%' },
        opacity: 0, x: 40, duration: 0.8, delay: 0.2
    });

    // Parallax effects
    gsap.utils.toArray('.section').forEach(section => {
        const bg = section.querySelector('.section-header');
        if (bg) {
            gsap.to(bg, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                },
                y: -30
            });
        }
    });

    // Nav background on scroll
    ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        toggleClass: { className: 'scrolled', targets: '.nav' }
    });
}

function initFallbackAnimations() {
    // Intersection Observer fallback
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-fade-up, .animate-reveal').forEach(el => {
        observer.observe(el);
    });

    // Trigger hero animations immediately
    setTimeout(() => {
        document.querySelectorAll('.hero .animate-fade-up').forEach(el => {
            el.classList.add('visible');
        });
    }, 300);
}
