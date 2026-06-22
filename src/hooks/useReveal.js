import { useEffect } from "react";

// Adds the `is-in` class to any element carrying `.reveal` when it scrolls into
// view. One observer for the whole page. No-op visual when reduced-motion is on
// (the CSS already shows reveal elements; we still tag them for consistency).
// NOTE: this snapshots `.reveal` nodes once at mount. All sections render
// synchronously today, so every reveal element exists when this runs. If a
// section is ever lazy-loaded / Suspense-wrapped, switch to a MutationObserver
// or per-component observers so late-committed elements still reveal.
export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".reveal"));
    if (!("IntersectionObserver" in window) || els.length === 0) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
