/* PantherIQ - iOS experience enhancements (structure + affordances)
Turns each section into iPhone-style widgets: adds widget kickers,
list-row chevrons and a mobile tab bar. Every label is derived from
the page's own copy, so English and Arabic both stay correct and no
brand asset, color or wording is changed. */
(function () {
  function trimTag(s) {
    s = (s || '').trim();
    var i = s.indexOf(']');
    return (i >= 0 ? s.slice(i + 1) : s).trim();
  }
  function sectionLabel(id) {
    var sec = document.getElementById(id);
    var tag = sec ? sec.querySelector('.section-tag') : null;
    return tag ? trimTag(tag.textContent) : '';
  }
  function pad(n) { return n < 10 ? '0' + n : String(n); }

 function kicker(label, i) {
   var d = document.createElement('div');
   d.className = 'ios-kicker';
   var dot = document.createElement('span');
   dot.className = 'ios-kicker-dot';
   var lb = document.createElement('span');
   lb.textContent = label;
   var ix = document.createElement('span');
   ix.className = 'ios-kicker-index';
   ix.textContent = pad(i);
   d.appendChild(dot);
   d.appendChild(lb);
   d.appendChild(ix);
   return d;
 }
  function addKickers(sel, label) {
    if (!label) return;
    var nodes = document.querySelectorAll(sel);
    for (var i = 0; i < nodes.length; i++) {
      if (!nodes[i].querySelector('.ios-kicker')) {
        nodes[i].insertBefore(kicker(label, i + 1), nodes[i].firstChild);
      }
    }
  }
  addKickers('.problem-card', sectionLabel('problem'));
  addKickers('.trust-card', sectionLabel('trust'));

 var chevron = '<svg class="ios-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 6 15 12 9 18"></polyline></svg>';
  var rows = document.querySelectorAll('.contact-item');
  for (var r = 0; r < rows.length; r++) {
    if (!rows[r].querySelector('.ios-chevron')) {
      rows[r].insertAdjacentHTML('beforeend', chevron);
    }
  }

 var wanted = [
   { href: '#services', d: 'M4 6h16M4 12h16M4 18h11' },
   { href: '#how-we-work', d: 'M5 12h4l2-5 2 10 2-5h4' },
   { href: '#proof', d: 'M4 19V9m5 10V5m5 14v-7m5 7V8' },
   { href: '#contact', d: 'M4 5h16v14H4zM4 7l8 6 8-6' }
   ];
  var tabs = [];
  for (var w = 0; w < wanted.length; w++) {
    var src = document.querySelector('.nav-links a[href="' + wanted[w].href + '"]');
    var target = document.querySelector(wanted[w].href);
    if (src && target) {
      tabs.push({ href: wanted[w].href, d: wanted[w].d, label: src.textContent.trim(), target: target });
    }
  }
  if (tabs.length) {
    var bar = document.createElement('nav');
    bar.className = 'ios-tabbar';
    for (var k = 0; k < tabs.length; k++) {
      var a = document.createElement('a');
      a.className = 'ios-tab';
      a.href = tabs[k].href;
      a.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' + tabs[k].d + '"></path></svg>';
      var sp = document.createElement('span');
      sp.textContent = tabs[k].label;
      a.appendChild(sp);
      bar.appendChild(a);
    }
    document.body.appendChild(bar);

  var links = bar.querySelectorAll('.ios-tab');
    if (window.IntersectionObserver) {
      var io = new IntersectionObserver(function (entries) {
        for (var e = 0; e < entries.length; e++) {
          if (!entries[e].isIntersecting) continue;
          var idx = -1;
          for (var m = 0; m < tabs.length; m++) {
            if (tabs[m].target === entries[e].target) idx = m;
          }
          for (var j = 0; j < links.length; j++) {
            links[j].className = (j === idx) ? 'ios-tab active' : 'ios-tab';
          }
        }
      }, { rootMargin: '-45% 0px -45% 0px' });
      for (var o = 0; o < tabs.length; o++) {
        io.observe(tabs[o].target);
      }
    }
  }
})();
