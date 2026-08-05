/* PantherIQ - reveal safety net
Some scroll-reveal blocks (section subtitles, the two extra service
cards, the Proof dashboard and the About block) stay at opacity 0
because the GSAP timeline does not cover them and the fallback path
never runs. GSAP keeps rewriting inline styles, so the reveal is
applied through an !important class instead. */
(function () {
  if (!window.IntersectionObserver) return;
  var EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';
  var rule = '.ios-forced-reveal { opacity: 1 !important; transform: translateY(0) !important; transition: opacity 0.8s ' + EASE + ', transform 0.8s ' + EASE + ' !important; }';
  var tag = document.createElement('style');
  tag.appendChild(document.createTextNode(rule));
  document.head.appendChild(tag);
  function force(node) {
    if (window.getComputedStyle(node).opacity !== '0') return;
    if (node.className.indexOf('ios-forced-reveal') > -1) return;
    node.className = node.className + ' ios-forced-reveal';
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
