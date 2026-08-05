/* PantherIQ — Process rail controller (see assets/css/process.css)
   Drives the rail fill and each step's active state from scroll
   position every frame, so the sequence plays forward as you read and
   rewinds when you scroll back. One shared anchor line means the fill's
   tip reaches a node on exactly the frame that node lights up. */
(function () {
    'use strict';

    // Where on screen a node counts as "reached"
    var ANCHOR_RATIO = 0.72;

    function init() {
        var timeline = document.querySelector('.process-timeline');
        if (!timeline) return;

        var track = timeline.querySelector('.timeline-line');
        var steps = [].slice.call(timeline.querySelectorAll('.process-step'));
        if (!track || steps.length < 2) return;

        var nodes = steps.map(function (step) {
            return step.querySelector('.step-number');
        });
        if (nodes.indexOf(null) > -1) return;

        var fill = document.createElement('div');
        fill.className = 'timeline-progress';
        timeline.appendChild(fill);

        // Reduced motion: show the finished state, no scroll work at all
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            timeline.classList.add('pt-static');
            steps.forEach(function (step) { step.classList.add('is-active'); });
            return;
        }

        var head = document.createElement('div');
        head.className = 'timeline-head';
        timeline.appendChild(head);

        var railTop = 0;
        var railHeight = 0;
        var centers = [];   // node centers in document space, cached

        // Geometry is read only on measure (load / resize / reflow), never
        // per scroll frame: reading a rect mid-scroll forces a layout pass.
        function measure() {
            var scrollY = window.pageYOffset;
            var timelineTop = timeline.getBoundingClientRect().top + scrollY;

            centers = nodes.map(function (node) {
                var rect = node.getBoundingClientRect();
                return rect.top + scrollY + rect.height / 2;
            });

            railTop = centers[0] - timelineTop;
            railHeight = centers[centers.length - 1] - centers[0];
            if (railHeight <= 0) return;

            track.style.top = railTop + 'px';
            track.style.height = railHeight + 'px';
            fill.style.top = railTop + 'px';
            fill.style.height = railHeight + 'px';
            head.style.top = (railTop - 5) + 'px';
        }

        function update() {
            if (railHeight <= 0) return;
            // Anchor in document space, so the whole frame is pure arithmetic
            var anchor = window.pageYOffset + window.innerHeight * ANCHOR_RATIO;

            var start = centers[0];
            var end = centers[centers.length - 1];

            var progress = end === start ? 0 : (anchor - start) / (end - start);
            progress = Math.max(0, Math.min(1, progress));

            fill.style.transform = 'scaleY(' + progress + ')';
            head.style.transform = 'translateY(' + (progress * railHeight) + 'px)';
            timeline.classList.toggle('pt-live', progress > 0 && progress < 1);

            for (var i = 0; i < centers.length; i++) {
                steps[i].classList.toggle('is-active', centers[i] <= anchor);
            }
        }

        var ticking = false;
        function onScroll() {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(function () {
                update();
                ticking = false;
            });
        }

        measure();
        update();

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', function () { measure(); update(); });
        window.addEventListener('load', function () { measure(); update(); });

        if (window.ResizeObserver) {
            new ResizeObserver(function () { measure(); update(); }).observe(timeline);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
