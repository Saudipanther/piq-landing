import { useEffect } from "react";

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const MAX_TILT = 5; // degrees

// One delegated, rAF-throttled mousemove listener drives the Apple-style
// cursor glare (`--mx/--my`) on every `.glass`/`.glass-dark` tile and a subtle
// 3D tilt (`--rx/--ry`) on light `.glass` tiles. No per-card listeners, no
// React re-renders — writes CSS custom properties directly. No-op under
// reduced-motion.
export function useGlassPointer() {
  useEffect(() => {
    if (prefersReduced()) return;

    let raf = null;
    let lastEvent = null;
    let current = null;

    const reset = (el) => {
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
      el.style.setProperty("--s", "1");
      el.style.setProperty("--mx", "50%");
      el.style.setProperty("--my", "50%");
    };

    const apply = () => {
      raf = null;
      const e = lastEvent;
      if (!e || !e.target || !e.target.closest) return;
      const el = e.target.closest(".glass, .glass-dark");
      if (el !== current) {
        if (current) reset(current);
        current = el;
      }
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
      el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
      el.style.setProperty("--s", "1.015");
      // tilt only the light glass tiles (dark glass = terminals/sidebar stay flat)
      if (el.classList.contains("glass")) {
        el.style.setProperty("--rx", `${((0.5 - py) * MAX_TILT * 2).toFixed(2)}deg`);
        el.style.setProperty("--ry", `${((px - 0.5) * MAX_TILT * 2).toFixed(2)}deg`);
      }
    };

    const onMove = (e) => {
      lastEvent = e;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
      if (current) reset(current);
    };
  }, []);
}
