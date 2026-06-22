import { useEffect, useRef, useState } from "react";

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Counts from 0 to `target` once the element enters view. Returns [ref, value].
// Respects reduced-motion by jumping straight to the final value.
export function useCountUp(target, duration = 1600) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    started.current = false; // reset when target/duration change
    let rafHandle = null;

    const run = () => {
      if (started.current) return;
      started.current = true;
      if (prefersReduced() || !("requestAnimationFrame" in window)) {
        setValue(target);
        return;
      }
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t); // easeOutExpo
        setValue(Math.round(target * eased));
        if (t < 1) rafHandle = requestAnimationFrame(tick);
      };
      rafHandle = requestAnimationFrame(tick);
    };

    if (!("IntersectionObserver" in window)) {
      run();
      return () => rafHandle && cancelAnimationFrame(rafHandle);
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && run()),
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (rafHandle) cancelAnimationFrame(rafHandle);
    };
  }, [target, duration]);

  return [ref, value];
}
