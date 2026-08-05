// PantherIQ — Upgrade v2 interaction layer
// Additive enhancements: scroll progress, active-section nav,
// dashboard tilt. Everything is guarded and reduced-motion aware.

(function () {
    'use strict';

    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function onReady(fn) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', fn);
        } else {
            fn();
        }
    }

    // ---------- Scroll progress bar ----------
    function initScrollProgress() {
        var wrap = document.createElement('div');
        wrap.id = 'scroll-progress';
        var bar = document.createElement('div');
        bar.className = 'bar';
        wrap.appendChild(bar);
        document.body.appendChild(wrap);

        var ticking = false;
        function update() {
            var doc = document.documentElement;
            var max = doc.scrollHeight - window.innerHeight;
            var ratio = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
            bar.style.transform = 'scaleX(' + ratio.toFixed(4) + ')';
            ticking = false;
        }
        window.addEventListener('scroll', function () {
            if (!ticking) {
                window.requestAnimationFrame(update);
                ticking = true;
            }
        }, { passive: true });
        update();
    }

    // ---------- Active section highlighting in nav ----------
    function initActiveNav() {
        if (!window.IntersectionObserver) return;
        var links = document.querySelectorAll('.nav-link[href^="#"]');
        if (!links.length) return;
        var map = {};
        links.forEach ? links.forEach(collect) : Array.prototype.forEach.call(links, collect);
        function collect(link) {
            var id = link.getAttribute('href').slice(1);
            if (id) map[id] = link;
        }
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var id = entry.target.id;
                if (!map[id]) return;
                Object.keys(map).forEach(function (key) {
                    map[key].classList.toggle('active', key === id);
                });
            });
        }, { rootMargin: '-40% 0px -50% 0px' });
        Object.keys(map).forEach(function (id) {
            var section = document.getElementById(id);
            if (section) observer.observe(section);
        });
    }

    // ---------- Dashboard mock tilt (desktop pointers only) ----------
    function initDashboardTilt() {
        if (reducedMotion) return;
        if (!window.matchMedia('(pointer: fine)').matches) return;
        var card = document.querySelector('.proof-dashboard');
        if (!card) return;
        var MAX_DEG = 5;
        card.addEventListener('mousemove', function (e) {
            var rect = card.getBoundingClientRect();
            var px = (e.clientX - rect.left) / rect.width - 0.5;
            var py = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform =
                'perspective(1100px) rotateX(' + (-py * MAX_DEG).toFixed(2) + 'deg)' +
                ' rotateY(' + (px * MAX_DEG).toFixed(2) + 'deg)';
        });
        card.addEventListener('mouseleave', function () {
            card.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg)';
        });
    }

    onReady(function () {
        try { initScrollProgress(); } catch (e) { /* non-critical */ }
        try { initActiveNav(); } catch (e) { /* non-critical */ }
        try { initDashboardTilt(); } catch (e) { /* non-critical */ }
    });
})();
