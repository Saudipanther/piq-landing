// CSS-built product mockups. Arabic is primary inside the editorial screens,
// English is the secondary UI layer, matching the live SP Hub bilingual surface.

function Screen({ label, children }) {
  return (
    <div className="glass glass-hover overflow-hidden rounded-2xl shadow-lift">
      <div className="flex items-center justify-between border-b border-white/8 px-5 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </div>
        <span className="text-[11px] uppercase tracking-kicker text-paper/40">
          {label}
        </span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

export function BoardMock() {
  const cols = [
    { en: "Triage", ar: "غرفة الفرز", n: 12 },
    { en: "Decision", ar: "اتخاذ القرار", n: 5 },
    { en: "Out", ar: "الصادر", n: 8 },
  ];
  return (
    <Screen label="SP Hub · Editorial">
      <div className="grid grid-cols-3 gap-3">
        {cols.map((c, ci) => (
          <div key={c.en} className="rounded-lg bg-white/5 p-3">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs text-paper/70" dir="rtl">
                {c.ar}
              </span>
              <span className="font-display text-sm text-gold tnum">{c.n}</span>
            </div>
            <div className="space-y-2">
              {Array.from({ length: 3 - ci > 0 ? 3 : 2 }).map((_, i) => (
                <div key={i} className="rounded-md bg-forest/60 p-2.5 ring-1 ring-white/5">
                  <div className="mb-1.5 h-1.5 w-3/4 rounded bg-paper/25" />
                  <div className="h-1.5 w-1/2 rounded bg-paper/12" />
                  <div className="mt-2 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-sage" />
                    <span className="text-[9px] text-paper/40" dir="rtl">
                      عاجل
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Screen>
  );
}

export function ArchMock() {
  const stages = [
    { ar: "الجلب", en: "Ingest" },
    { ar: "إزالة التكرار", en: "Dedup" },
    { ar: "التجميع", en: "Cluster" },
    { ar: "الصياغة", en: "Draft" },
    { ar: "المراجعة", en: "Review" },
  ];
  return (
    <Screen label="NCA ECC · Architecture">
      <div className="space-y-3">
        {stages.map((s, i) => (
          <div
            key={s.en}
            className="flex items-center gap-3 rounded-lg bg-white/5 px-4 py-3"
          >
            <span className="font-display text-sm text-gold tnum">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex-1">
              <span className="text-sm text-paper" dir="rtl">
                {s.ar}
              </span>
              <span className="ml-2 text-xs text-paper/40">{s.en}</span>
            </div>
            <span className="rounded-full bg-sage/15 px-2 py-0.5 text-[10px] text-sage">
              eu-west-1
            </span>
          </div>
        ))}
      </div>
    </Screen>
  );
}

export function TransparencyMock() {
  const saudi = ["Orchestration layer", "Editorial workflow", "Arabic corpus", "Cost ledger"];
  const imported = ["Claude (NLP)", "AWS (hosting)"];
  return (
    <Screen label="Transparency · ما هو سعودي">
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-white/5 p-4">
          <p className="mb-3 text-xs text-sage" dir="rtl">
            سعودي الصنع
          </p>
          <ul className="space-y-2">
            {saudi.map((s) => (
              <li key={s} className="flex items-center gap-2 text-[13px] text-paper/80">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg bg-white/5 p-4">
          <p className="mb-3 text-xs text-paper/50" dir="rtl">
            مستورد، بشفافية
          </p>
          <ul className="space-y-2">
            {imported.map((s) => (
              <li key={s} className="flex items-center gap-2 text-[13px] text-paper/60">
                <span className="h-1.5 w-1.5 rounded-full bg-paper/30" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Screen>
  );
}
