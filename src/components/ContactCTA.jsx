import { ArrowUpRight } from "lucide-react";

const CTAS = [
  {
    tag: "For newsrooms",
    action: "See PIQ on today's news",
    body: "A live editorial walkthrough on real Saudi and GCC stories from the last 24 hours, on production data. A calendar link, not a contact form.",
    href: "#contact",
  },
  {
    tag: "For GRC practices",
    action: "Get the NCA-aligned brief",
    body: "A two-page technical summary: pipeline stages, model choices, cost model, region and security posture, control mapping. One email field. Reply within one business day.",
    href: "#contact",
  },
  {
    tag: "For Vision 2030 programs",
    action: "Reach the founders",
    body: "A direct line to Saudi Panther leadership for partnership, investment, and ecosystem conversations. No sales funnel in between.",
    href: "#contact",
  },
];

export default function ContactCTA() {
  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden hero-depth">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div className="orb drift-1 absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 bg-gold/15" />
        <div className="orb drift-2 absolute right-0 bottom-0 h-80 w-80 bg-sage/15" />
      </div>
      <div className="relative z-10 mx-auto max-w-editorial px-6 py-24 lg:px-10 lg:py-32">
        <div className="reveal mb-16 max-w-2xl">
          <p className="kicker mb-4">Contact · تواصل معنا</p>
          <h2 className="font-display text-4xl leading-tight tracking-[-0.02em] text-paper lg:text-5xl">
            Three audiences. Three next steps.
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {CTAS.map((c, i) => (
            <a
              key={c.tag}
              href={c.href}
              className="reveal group glass glass-hover glass-sheen flex flex-col justify-between overflow-hidden rounded-2xl p-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div>
                <p className="kicker mb-6">{c.tag}</p>
                <h3 className="font-display text-2xl leading-snug tracking-[-0.01em] text-paper">
                  {c.action}
                </h3>
                <p className="mt-4 text-[14px] leading-7 text-paper/70">{c.body}</p>
              </div>
              <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-paper">
                Start here
                <ArrowUpRight className="h-4 w-4 text-gold transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
