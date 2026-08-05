/* PantherIQ - reveal safety net
Some scroll-reveal blocks (section subtitles, the two extra service
cards, the Proof dashboard and the About block) are left at opacity 0
because the GSAP timeline does not cover them and the fallback path
never runs. This observer fades in anything that is still hidden once
it has been on screen, so no content can stay invisible. */
(function () {
  if (!window.IntersectionObserver) return;
  var EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';
  function force(node) {
    if (window.getComputedStyle(node).opacity !== '0') return;
    node.style.transition = 'opacity 0.8s ' + EASE + ', transform 0.8s ' + EASE;
    node.style.opacity = '1';
    node.style.transform = 'translateY(0)';
  }
  function watch() {
    var nodes = document.querySelectorAll('.animate-reveal, .animate-fade-up');
    var obs = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (!entries[i].isIntersecting) continue;
        var node = entries[i].target;
        obs.unobserve(node);
        setTimeout(force.bind(null, node), 900);
      }
    }, { rootMargin: '0px 0px -6% 0px' });
    for (var n = 0; n < nodes.length; n++) {
      obs.observe(nodes[n]);
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', watch);
  } else {
    watch();
  }
})();
