const PILLARS = [
  {
    no: "01",
    title: "Saudi origin, global standard",
    body: "Panther IQ is built in Riyadh, by Saudis, for the systems Saudi Arabia depends on. We hold our work to international engineering and audit standards, then deliver it in Arabic and English, on Saudi infrastructure, under Saudi law. Vision 2030 is the operating context for our roadmap, not a backdrop for our marketing.",
  },
  {
    no: "02",
    title: "Technical depth over slideware",
    body: "We do not sell pictures of platforms. We ship them. Panther IQ owns the architecture, the code, the data models, and the controls behind every product Saudi Panther offers. When a regulator, a CISO, or an editor asks how something works, we answer with diagrams, runbooks, and live systems.",
  },
  {
    no: "03",
    title: "Intellectual property as the asset",
    body: "Every engagement at Saudi Panther feeds Panther IQ. Compliance work becomes reusable control libraries. Newsroom operations become the SP Hub platform. Brand work becomes a system, not a logo. What we learn for one client compounds into durable IP the company, its partners, and its investors can value.",
  },
];

export default function Pillars() {
  return (
    <section className="relative overflow-hidden bg-panel panel-grain">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div className="orb drift-2 absolute -right-16 top-0 h-80 w-80 bg-gold/12" />
        <div className="orb drift-1 absolute -left-16 bottom-0 h-80 w-80 bg-sage/12" />
      </div>
      <div className="relative z-10 mx-auto max-w-editorial px-6 py-24 lg:px-10 lg:py-32">
        <div className="reveal mb-16 max-w-2xl">
          <p className="kicker mb-4">Three commitments · ثلاثة التزامات</p>
          <h2 className="font-display text-4xl leading-tight tracking-[-0.02em] text-paper lg:text-5xl">
            What Panther IQ is built on.
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {PILLARS.map((p, i) => (
            <article
              key={p.no}
              className="reveal glass glass-hover glass-sheen overflow-hidden rounded-2xl p-8 lg:p-10"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <span className="font-display text-5xl text-gold tnum">{p.no}</span>
              <h3 className="mt-6 font-display text-2xl tracking-[-0.01em] text-paper">
                {p.title}
              </h3>
              <p className="mt-4 text-[15px] leading-7 text-paper/70">{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
