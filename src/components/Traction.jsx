import { useCountUp } from "../hooks/useCountUp.js";

function Stat({ target, prefix = "", label, sub }) {
  const [ref, value] = useCountUp(target);
  return (
    <div ref={ref} className="reveal">
      <div className="font-display text-[clamp(3.5rem,2rem+9vw,9rem)] font-medium leading-none tracking-[-0.03em] text-paper tnum">
        {prefix}
        {value.toLocaleString("en-US")}
      </div>
      <div className="mt-4 h-px w-16 bg-gold" />
      <p className="mt-4 text-sm font-medium text-paper">{label}</p>
      <p className="mt-1 text-[13px] leading-6 text-paper/55">{sub}</p>
    </div>
  );
}

export default function Traction() {
  return (
    <section className="relative bg-forest-deep">
      <div className="mx-auto max-w-editorial px-6 py-24 lg:px-10 lg:py-32">
        <div className="reveal mb-16 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-4xl leading-tight tracking-[-0.02em] text-paper lg:text-5xl">
            In production. Measured. Trusted.
          </h2>
          <p className="max-w-sm text-sm leading-7 text-paper/60">
            Running at hub.saudipanther.sa since early 2026. The editorial team
            works behind Microsoft Entra ID SSO with MFA enforced.
          </p>
        </div>

        <div className="grid gap-x-10 gap-y-14 sm:grid-cols-3">
          <Stat
            target={46}
            label="Active Saudi and GCC sources"
            sub="15 RSS, 31 X. 53 configured including disabled."
          />
          <Stat
            target={16393}
            label="Articles indexed in Elastic Cloud"
            sub="Arabic and English analyzers."
          />
          <Stat
            target={69745}
            prefix="~"
            label="News items in the corpus"
            sub="Per-article NLP cost tracked in tokens and USD."
          />
        </div>
      </div>
    </section>
  );
}
