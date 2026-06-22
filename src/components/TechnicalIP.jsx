const CLAIMS = [
  {
    no: "01",
    title: "Pre-Claude deduplication and clustering",
    body: "Most AI newsroom tools send every story to a language model and pay for the round trip. Panther IQ does not. A pre-ingestion stage clusters near-duplicate stories across all 46 sources using deterministic signatures and trigram similarity, then sends only the cluster winner to Claude. The model sees one story per event, not forty variants of the same headline.",
  },
  {
    no: "02",
    title: "A premium-Saudi quality gate, ahead of the model",
    body: "Before Claude drafts anything, an upstream gate scores stories for Saudi newsroom relevance: source authority, geographic alignment, language quality, freshness. Low-signal stories never reach the drafting stage. The gate is tunable per shift and per editorial priority, so the same pipeline serves a quiet weekday morning and a breaking-news night.",
  },
  {
    no: "03",
    title: "Bilingual Arabic-first NLP, with cost per article",
    body: "The drafting layer treats Arabic as native, not as a translation target. Each Claude call returns structured output through tool-use, token counts are logged per article, and the USD cost is attributed to the story it produced. Editorial leaders see cost per published story the same way ad teams see CPM.",
  },
];

export default function TechnicalIP() {
  return (
    <section id="ip" className="relative scroll-mt-20 overflow-hidden bg-panel panel-grain">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div className="orb drift-1 absolute left-1/4 -top-10 h-80 w-80 bg-gold/12" />
        <div className="orb drift-2 absolute -right-20 bottom-1/4 h-80 w-80 bg-sage/12" />
      </div>
      <div className="relative z-10 mx-auto max-w-editorial px-6 py-24 lg:px-10 lg:py-32">
        <div className="reveal grid gap-8 border-b border-white/10 pb-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="kicker mb-4">Technical IP · الملكية الفكرية</p>
            <h2 className="font-display text-4xl leading-[1.05] tracking-[-0.02em] text-paper lg:text-[3.25rem]">
              What we built that others have not.
            </h2>
          </div>
          <p className="self-end text-[15px] leading-7 text-paper/65 lg:col-span-5">
            Panther IQ is not a wrapper around a chat model. It is a pipeline
            where the AI is one stage among many. The interesting work is in the
            layers that decide which stories reach the model, and what the model
            is told when they do.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {CLAIMS.map((c, i) => (
            <article
              key={c.no}
              className="reveal glass glass-hover glass-sheen overflow-hidden rounded-2xl p-8 lg:p-10"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <span className="font-display text-5xl text-gold tnum">{c.no}</span>
              <h3 className="mt-6 font-display text-[1.4rem] leading-snug tracking-[-0.01em] text-paper">
                {c.title}
              </h3>
              <p className="mt-4 text-[15px] leading-7 text-paper/70">{c.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
