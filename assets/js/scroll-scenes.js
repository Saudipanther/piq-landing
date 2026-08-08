// PantherIQ - Scroll-Driven Video Scene Controller
// Transitions between Riyadh landmark videos as user scrolls

class ScrollSceneController {
    constructor() {
        const isArabic = document.documentElement.lang === 'ar';
        this.isArabic = isArabic;
        this.scenes = [
            { id: 'hero', video: '../assets/video/scene_kafd.mp4', label: isArabic ? 'مركز الملك عبدالله المالي' : 'KAFD Financial District' },
            { id: 'problem', video: '../assets/video/scene_metro.mp4', label: isArabic ? 'مترو الرياض' : 'Riyadh Metro' },
            { id: 'services', video: '../assets/video/scene_kingdom.mp4', label: isArabic ? 'برج المملكة' : 'Kingdom Tower' },
            { id: 'how-we-work', video: '../assets/video/scene_faisaliah.mp4', label: isArabic ? 'برج الفيصلية' : 'Al Faisaliah Tower' },
            { id: 'proof', video: '../assets/video/scene_library.mp4', label: isArabic ? 'مكتبة الملك فهد الوطنية' : 'King Fahad Library' },
            { id: 'trust', video: '../assets/video/scene_cairo.mp4', label: isArabic ? 'ميدان القاهرة' : 'Cairo Square' },
        ];
        
        this.currentScene = 0;
        this.videoA = null;
        this.videoB = null;
        this.activeVideo = 'A';
        this.transitioning = false;
        this.container = null;

        this.init();
    }

    // Some visitors should never pay for the scene layer: metered or slow
    // connections, and low-memory phones that stutter decoding video behind
    // a scrolling page. They keep the gradient background instead.
    static shouldSkipVideo() {
        const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (conn) {
            if (conn.saveData) return true;
            if (/(^|-)(2g|slow-2g)$/.test(conn.effectiveType || '')) return true;
        }
        if (navigator.deviceMemory && navigator.deviceMemory <= 2) return true;
        return false;
    }

    init() {
        // Create video background container
        this.container = document.createElement('div');
        this.container.id = 'video-scene-bg';
        this.container.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            z-index: 0; overflow: hidden; pointer-events: none;
        `;

        // Create two video elements for crossfade
        this.videoA = this.createVideoElement('scene-video-a');
        this.videoB = this.createVideoElement('scene-video-b');
        this.videoB.style.opacity = '0';

        // Dark overlay for readability
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background: linear-gradient(180deg, rgba(2,5,16,0.6) 0%, rgba(2,5,16,0.4) 50%, rgba(2,5,16,0.7) 100%);
            z-index: 1;
        `;

        this.container.appendChild(this.videoA);
        this.container.appendChild(this.videoB);
        this.container.appendChild(overlay);
        document.body.prepend(this.container);

        // Load first scene
        this.videoA.src = this.scenes[0].video;
        this.videoA.play().catch(() => {});

        // A backgrounded tab keeps decoding video otherwise
        document.addEventListener('visibilitychange', () => {
            const active = this.activeVideo === 'A' ? this.videoA : this.videoB;
            if (document.hidden) {
                active.pause();
            } else if (active.src) {
                active.play().catch(() => {});
            }
        });

        // Autoplay can be blocked until first interaction: resume once
        const resumePlayback = () => {
            const active = this.activeVideo === 'A' ? this.videoA : this.videoB;
            if (active.paused && active.src) active.play().catch(() => {});
        };
        ['pointerdown', 'touchstart', 'scroll', 'keydown'].forEach((evt) =>
            window.addEventListener(evt, resumePlayback, { once: true, passive: true }));

        // Setup scroll observer
        this.setupScrollObserver();
    }

    createVideoElement(id) {
        const video = document.createElement('video');
        video.id = id;
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        // 'auto' had both elements fully buffering; only the playing clip
        // needs data, and the idle one is given a src at transition time
        video.preload = 'metadata';
        video.style.cssText = `
            position: absolute; top: 50%; left: 50%;
            min-width: 100%; min-height: 100%;
            width: auto; height: auto;
            transform: translate(-50%, -50%);
            transition: opacity 1.2s ease-in-out;
            object-fit: cover;
        `;
        return video;
    }

    setupScrollObserver() {
        const sections = document.querySelectorAll('.section, .hero');
        const sectionIds = Array.from(sections).map(s => s.id);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                    const sectionId = entry.target.id;
                    const sceneIndex = this.scenes.findIndex(s => s.id === sectionId);
                    if (sceneIndex !== -1 && sceneIndex !== this.currentScene) {
                        this.transitionToScene(sceneIndex);
                    }
                }
            });
        }, { threshold: [0.3, 0.5] });

        sections.forEach(section => observer.observe(section));
    }

    transitionToScene(index) {
        if (this.transitioning || index === this.currentScene) return;
        this.transitioning = true;
        this.currentScene = index;

        const incomingVideo = this.activeVideo === 'A' ? this.videoB : this.videoA;
        const outgoingVideo = this.activeVideo === 'A' ? this.videoA : this.videoB;

        // Load and play new scene
        incomingVideo.src = this.scenes[index].video;
        incomingVideo.play().catch(() => {});

        // Crossfade
        incomingVideo.style.opacity = '1';
        outgoingVideo.style.opacity = '0';

        // Switch active
        this.activeVideo = this.activeVideo === 'A' ? 'B' : 'A';

        setTimeout(() => {
            this.transitioning = false;
            outgoingVideo.pause();
            // Release the finished clip: frees its decoder and stops it
            // buffering in the background. This is what keeps the cost flat
            // as more scenes are added to the list above.
            outgoingVideo.removeAttribute('src');
            outgoingVideo.load();
        }, 1500);
    }
}

// Interactive 3D Blocks on click
class Interactive3DBlocks {
    constructor(reducedMotion) {
        this.blocks = [];
        this.reducedMotion = !!reducedMotion;
        this.init();
    }

    init() {
        // Add click ripple effect to all interactive elements
        document.querySelectorAll('.btn-primary, .btn-ghost, .service-card, .problem-card, .trust-card').forEach(el => {
            el.addEventListener('click', (e) => this.createRipple(e));
            el.addEventListener('mouseenter', (e) => this.create3DLift(e));
            el.addEventListener('mouseleave', (e) => this.reset3D(e));
        });

        // Add floating 3D blocks that react to scroll
        if (!this.reducedMotion) {
            this.createFloatingBlocks();
        }
    }

    createRipple(e) {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute; border-radius: 50%;
            background: radial-gradient(circle, rgba(0,245,255,0.4) 0%, transparent 70%);
            width: 0; height: 0; left: ${x}px; top: ${y}px;
            transform: translate(-50%, -50%);
            pointer-events: none; z-index: 100;
        `;
        el.style.position = 'relative';
        el.style.overflow = 'hidden';
        el.appendChild(ripple);

        ripple.animate([
            { width: '0px', height: '0px', opacity: 1 },
            { width: '400px', height: '400px', opacity: 0 }
        ], { duration: 800, easing: 'ease-out' });

        setTimeout(() => ripple.remove(), 800);
    }

    create3DLift(e) {
        const el = e.currentTarget;
        el.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease';
        el.style.transform = 'translateY(-8px) scale(1.02) perspective(1000px) rotateX(2deg)';
        el.style.boxShadow = '0 20px 60px rgba(0,245,255,0.15), 0 0 30px rgba(26,124,255,0.1)';
    }

    reset3D(e) {
        const el = e.currentTarget;
        el.style.transform = 'translateY(0) scale(1) perspective(1000px) rotateX(0deg)';
        el.style.boxShadow = '';
    }

    createFloatingBlocks() {
        const container = document.createElement('div');
        container.id = 'floating-blocks';
        container.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            pointer-events: none; z-index: 1; overflow: hidden;
        `;

        for (let i = 0; i < 5; i++) {
            const block = document.createElement('div');
            const size = 20 + Math.random() * 40;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = 15 + Math.random() * 20;

            block.style.cssText = `
                position: absolute; left: ${x}%; top: ${y}%;
                width: ${size}px; height: ${size}px;
                border: 1px solid rgba(0,245,255,0.08);
                background: rgba(26,124,255,0.02);
                transform: rotate(45deg);
                animation: floatBlock ${duration}s ease-in-out ${delay}s infinite;
            `;
            container.appendChild(block);
            this.blocks.push(block);
        }

        document.body.appendChild(container);

        // Parallax on scroll
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    this.blocks.forEach((block, i) => {
                        const speed = 0.02 + (i * 0.01);
                        const rotation = 45 + scrollY * speed * 0.5;
                        block.style.transform = `rotate(${rotation}deg) translateY(${scrollY * speed * -1}px)`;
                    });
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion && !ScrollSceneController.shouldSkipVideo()) {
        new ScrollSceneController();
    }
    new Interactive3DBlocks(prefersReducedMotion);

    // Add CSS animation for floating blocks
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatBlock {
            0%, 100% { transform: rotate(45deg) translateY(0) translateX(0); opacity: 0.3; }
            25% { transform: rotate(50deg) translateY(-30px) translateX(10px); opacity: 0.6; }
            50% { transform: rotate(45deg) translateY(-15px) translateX(-5px); opacity: 0.4; }
            75% { transform: rotate(40deg) translateY(-25px) translateX(15px); opacity: 0.5; }
        }
    `;
    document.head.appendChild(style);
});
