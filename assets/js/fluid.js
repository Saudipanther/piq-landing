/* PantherIQ — Fluid interface layer (Apple design translation)
   1. Enables :active press states on iOS (empty touchstart).
   2. Reduced motion: pauses the full-viewport scene videos and flags
      the document so fluid.css can retire the moving layers.
   Loaded with defer, after the scene controller has been constructed. */
(function () {
    'use strict';

    // iOS only honors :active when a touchstart listener exists
    document.addEventListener('touchstart', function () {}, { passive: true });

    var reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    function applyReducedMotion(matches) {
        document.documentElement.classList.toggle('fluid-reduce', matches);
        if (!matches) return;
        // The scene layer is display:none via CSS; also stop its playback
        // so hidden videos are not burning battery or network.
        var videos = document.querySelectorAll('#video-scene-bg video');
        for (var i = 0; i < videos.length; i++) {
            try {
                videos[i].pause();
                videos[i].removeAttribute('src');
                videos[i].load();
            } catch (e) { /* ignore */ }
        }
    }

    function init() {
        applyReducedMotion(reduceQuery.matches);
        if (reduceQuery.addEventListener) {
            reduceQuery.addEventListener('change', function (e) {
                applyReducedMotion(e.matches);
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
