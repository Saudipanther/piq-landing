import { useEffect, useState } from "react";
import piqWhite from "../assets/piq-white.png";

const LINKS = [
  { label: "Platform", ar: "المنصة", href: "#platform" },
  { label: "Capabilities", ar: "القدرات", href: "#capabilities" },
  { label: "Personas", ar: "لمن", href: "#personas" },
  { label: "IP", ar: "الملكية", href: "#ip" },
  { label: "Contact", ar: "تواصل", href: "#contact" },
];

export default function Nav() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    let rafHandle = null;
    const update = () => {
      rafHandle = null;
      // only flip state when crossing the threshold (avoids per-scroll re-renders)
      setSolid((prev) => {
        const next = window.scrollY > 24;
        return next === prev ? prev : next;
      });
    };
    const onScroll = () => {
      if (!rafHandle) rafHandle = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafHandle) cancelAnimationFrame(rafHandle);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? "border-b border-white/10 bg-forest-deep/55 backdrop-blur-xl backdrop-saturate-150 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-editorial items-center justify-between px-6 lg:px-10">
        <a href="#top" className="flex items-center gap-3" aria-label="Panther IQ home">
          <img src={piqWhite} alt="Panther IQ" className="h-7 w-auto" />
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm text-paper/70 transition-colors hover:text-paper"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="inline-flex items-center rounded-full bg-forest px-5 py-2.5 text-sm font-medium text-paper ring-1 ring-white/12 transition-colors duration-300 hover:bg-sage hover:text-forest-deep"
        >
          Reach the founders
        </a>
      </div>
    </header>
  );
}
