import { BoardMock, ArchMock, TransparencyMock } from "./PersonaMocks.jsx";

const PERSONAS = [
  {
    id: "newsrooms",
    kicker: "For newsrooms · لغرف الأخبار",
    title: "Your newsroom's AI stack, built in Riyadh.",
    body: "Your editor wants AI on the next board deck. Your CFO wants the Dataminr line item explained. SP Hub is the production newsroom platform built by a Saudi team, in eu-west-1, processing 46 sources today. The AI is Claude on the inside. The orchestration, editorial workflow, cost ledger, and data residency are ours. License the platform or co-deliver the playbook.",
    Mock: BoardMock,
  },
  {
    id: "grc",
    kicker: "For GRC practices · لممارسات الحوكمة",
    title: "An intelligence layer your NCA ECC clients approve.",
    body: "Your juniors use ChatGPT, which you forbid, so you cannot defend the control mapping in your deliverables. SP Hub is the same engineering discipline that backs our GRC service line. The infra story reads like an NCA ECC checklist. Partner with us and your analysts get an Arabic-first intelligence layer that plugs into NCA, CSCC, and ECC workflows.",
    Mock: ArchMock,
  },
  {
    id: "vision2030",
    kicker: "For Vision 2030 programs · لبرامج رؤية 2030",
    title: "The worked example, not another wrapper.",
    body: "Every other deck you see is a wrapper. SP Hub is the worked example: Saudi-founded, Saudi-operated, Arabic-first by design. The IP is the orchestration layer, the editorial workflow primitives, and the Arabic content corpus, not the underlying LLM. We are explicit about that distinction, which answers the wrapper question before it is asked.",
    Mock: TransparencyMock,
  },
];

export default function Personas() {
  return (
    <section id="personas" className="relative overflow-hidden bg-panel panel-grain">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div className="orb drift-1 absolute right-0 top-1/4 h-96 w-96 bg-sage/12" />
        <div className="orb drift-2 absolute -left-24 bottom-0 h-96 w-96 bg-gold/10" />
      </div>
      <div className="relative z-10 mx-auto max-w-editorial px-6 py-24 lg:px-10 lg:py-32">
        <div className="reveal mb-20 max-w-2xl">
          <p className="kicker mb-4">Personas served · لمن نبني</p>
          <h2 className="font-display text-4xl leading-tight tracking-[-0.02em] text-paper lg:text-5xl">
            Three buyers. Three proofs.
          </h2>
        </div>

        <div className="space-y-24 lg:space-y-32">
          {PERSONAS.map((p, i) => {
            const flip = i % 2 === 1;
            const Mock = p.Mock;
            return (
              <article
                key={p.id}
                id={p.id}
                className="grid scroll-mt-28 items-center gap-12 lg:grid-cols-12"
              >
                <div
                  className={`reveal lg:col-span-5 ${flip ? "lg:order-2 lg:col-start-8" : ""}`}
                >
                  <p className="kicker mb-4">{p.kicker}</p>
                  <h3 className="font-display text-[1.9rem] leading-snug tracking-[-0.01em] text-paper lg:text-4xl">
                    {p.title}
                  </h3>
                  <p className="mt-6 text-[15px] leading-7 text-paper/75">
                    {p.body}
                  </p>
                </div>
                <div className={`reveal lg:col-span-7 ${flip ? "lg:order-1" : ""}`}>
                  <Mock />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
