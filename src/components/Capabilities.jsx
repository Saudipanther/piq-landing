const LINES = [
  "RSS poller every 5 minutes. X poller every 2 minutes. A decaying re-fetch on engagement metrics keeps cost proportional to new data.",
  "Claude handles every NLP step through tool-use, returning structured output. No AraBERT, no Whisper, no Gemini.",
  "Mozilla Readability, the same algorithm Firefox Reader Mode uses, extracts clean article bodies before drafting.",
];

export default function Capabilities() {
  return (
    <section id="capabilities" className="bg-forest-deep">
      <div className="mx-auto max-w-editorial px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="reveal lg:col-span-5">
            <p className="kicker mb-4">Capabilities · القدرات</p>
            <h2 className="font-display text-4xl leading-[1.05] tracking-[-0.02em] text-paper lg:text-[3.25rem]">
              From source to story in minutes, not hours.
            </h2>
          </div>

          <div className="lg:col-span-7 lg:pt-2">
            <p className="reveal max-w-xl text-lg leading-8 text-paper/75">
              Panther IQ unifies the four jobs a modern newsroom does separately
              today: monitor, triage, rewrite, publish. SP Hub ingests 46 live
              Saudi and GCC sources, clusters duplicates before AI ever touches
              them, drafts bilingual stories with Claude, and pushes finished
              posts to Snapchat, Instagram, TikTok, and X.
            </p>

            <div className="reveal glass mt-12 overflow-hidden rounded-2xl">
              {LINES.map((line, i) => (
                <div
                  key={line.slice(0, 18)}
                  className="flex gap-5 px-6 py-6 [&+&]:border-t [&+&]:border-white/8"
                >
                  <span className="font-display text-xl text-gold tnum">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[15px] leading-7 text-paper/80">{line}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
