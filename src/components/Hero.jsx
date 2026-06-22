import { ArrowDown } from "lucide-react";
import piqMetallic from "../assets/piq-metallic.png";

export default function Hero() {
  return (
    <section id="top" className="hero-depth relative overflow-hidden">
      {/* ambient drifting orbs behind the hero */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div className="orb drift-1 absolute right-[8%] top-[12%] h-96 w-96 bg-gold/20" />
        <div className="orb drift-2 absolute -left-20 bottom-0 h-96 w-96 bg-sage/15" />
      </div>
      <div className="relative z-10 mx-auto grid min-h-screen max-w-editorial grid-cols-1 items-center gap-12 px-6 pt-28 pb-20 lg:grid-cols-12 lg:px-10">
        {/* Left: the one thing */}
        <div className="lg:col-span-7">
          <p className="kicker mb-6" dir="rtl">
            بانثر آي كيو · Panther IQ
          </p>
          <h1 className="font-display text-[clamp(2.75rem,1.5rem+6vw,6rem)] font-medium leading-[0.98] tracking-[-0.02em] text-paper">
            The technical brain
            <br />
            <span className="italic text-sage">behind the work.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-paper/75">
            Panther IQ is the research, engineering, and internal IP studio of
            Saudi Panther. We build the systems Saudi institutions run on.
          </p>
          <p className="mt-5 max-w-xl text-sm leading-7 text-paper/55">
            Live in production at hub.saudipanther.sa. Built in Riyadh, deployed
            in eu-west-1, governed under Saudi law.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#platform"
              className="group inline-flex items-center gap-2 rounded-full bg-forest px-7 py-3.5 text-sm font-medium text-paper ring-1 ring-white/15 transition-colors duration-300 hover:bg-sage hover:text-forest-deep"
            >
              See what we have shipped
              <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
            <span className="text-sm text-paper/50" dir="rtl">
              نحن نرصد. نحلل. ننقل لك الحقيقة.
            </span>
          </div>
        </div>

        {/* Right: metallic mark, layered for depth */}
        <div className="relative lg:col-span-5">
          <div className="pointer-events-none absolute inset-6 rounded-full bg-sage/10 blur-2xl" />
          <img
            src={piqMetallic}
            alt="Panther IQ mark"
            className="float relative mx-auto w-[78%] max-w-sm drop-shadow-[0_24px_48px_rgba(0,0,0,0.45)] lg:w-full"
            width="512"
            height="512"
            decoding="async"
            fetchpriority="high"
          />
        </div>
      </div>

      {/* bottom rule */}
      <div className="mx-auto max-w-editorial px-6 lg:px-10">
        <div className="hairline" />
      </div>
    </section>
  );
}
