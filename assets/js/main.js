// ===== PantherIQ Main JavaScript =====

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initMobileMenu();
    initCounterAnimation();
    initSmoothScroll();
    initFormHandler();
    initCursorEffect();
});

// Navigation scroll effect
function initNavigation() {
    const nav = document.getElementById('mainNav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 80) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

// Mobile menu
function initMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    const menu = document.getElementById('mobileMenu');
    
    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
        menu.classList.toggle('active');
        btn.classList.toggle('active');
    });

    // Close on link click
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            btn.classList.remove('active');
        });
    });
}

// Counter animation
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseFloat(counter.getAttribute('data-count'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();
    const isFloat = target % 1 !== 0;

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = start + (target - start) * eased;

        element.textContent = isFloat ? current.toFixed(1) : Math.floor(current);

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = isFloat ? target.toFixed(1) : target;
        }
    }

    requestAnimationFrame(update);
}

// Smooth scroll (offset tracks the floating nav's real height)
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const nav = document.getElementById('mainNav');
                const offset = (nav ? nav.offsetHeight + nav.getBoundingClientRect().top : 60) + 28;
                const position = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: position, behavior: 'smooth' });
            }
        });
    });
}

// Form handler: composes a prefilled email in the visitor's mail app.
// The site is static (GitHub Pages), so mailto is the delivery path.
function initFormHandler() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const CONTACT_EMAIL = 'hello@pantheriq.sa';
    const isArabic = document.documentElement.lang === 'ar';

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = (form.name?.value || '').trim();
        const email = (form.email?.value || '').trim();
        const company = (form.company?.value || '').trim();
        const message = (form.message?.value || '').trim();

        const subject = isArabic
            ? `طلب تشخيص جاهزية الأتمتة - ${name}${company ? ' - ' + company : ''}`
            : `Automation readiness request - ${name}${company ? ' - ' + company : ''}`;
        const bodyLines = isArabic
            ? [`الاسم: ${name}`, `البريد: ${email}`, `الشركة: ${company || '-'}`, '', message]
            : [`Name: ${name}`, `Email: ${email}`, `Company: ${company || '-'}`, '', message];
        const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;

        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = isArabic ? '<span>جارٍ فتح تطبيق البريد...</span>' : '<span>Opening your email app...</span>';
        btn.disabled = true;

        window.location.href = mailto;

        setTimeout(() => {
            btn.innerHTML = isArabic ? '<span>أكمل الإرسال من بريدك ✓</span>' : '<span>Finish sending in your email app ✓</span>';
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 4000);
        }, 1200);
    });
}

// Custom cursor effect
function initCursorEffect() {
    if (window.innerWidth < 768) return;

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.innerHTML = '<div class="cursor-dot"></div><div class="cursor-ring"></div>';
    document.body.appendChild(cursor);

    const dot = cursor.querySelector('.cursor-dot');
    const ring = cursor.querySelector('.cursor-ring');

    // Add cursor styles
    const style = document.createElement('style');
    style.textContent = `
        .custom-cursor {
            position: fixed;
            top: 0;
            left: 0;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
        }
        .cursor-dot {
            position: absolute;
            width: 6px;
            height: 6px;
            background: #00F5FF;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: transform 0.1s ease;
        }
        .cursor-ring {
            position: absolute;
            width: 36px;
            height: 36px;
            border: 1px solid rgba(0, 245, 255, 0.5);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: all 0.15s ease;
        }
        .custom-cursor.hover .cursor-ring {
            width: 50px;
            height: 50px;
            border-color: rgba(139, 92, 246, 0.8);
        }
        .custom-cursor.hover .cursor-dot {
            transform: translate(-50%, -50%) scale(1.5);
            background: #8B5CF6;
        }
    `;
    document.head.appendChild(style);

    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Hover effect on interactive elements
    document.querySelectorAll('a, button, .service-card, .problem-card, .trust-card').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    function animateCursor() {
        dotX += (mouseX - dotX) * 0.3;
        dotY += (mouseY - dotY) * 0.3;
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;

        dot.style.left = dotX + 'px';
        dot.style.top = dotY + 'px';
        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';

        requestAnimationFrame(animateCursor);
    }

    animateCursor();
}

// Magnetic button effect
document.querySelectorAll('.btn-primary, .btn-ghost').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

// Typing effect for section tags
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing on scroll
const typingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const text = entry.target.textContent;
            typeWriter(entry.target, text, 30);
            typingObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.section-tag').forEach(tag => {
    typingObserver.observe(tag);
});
