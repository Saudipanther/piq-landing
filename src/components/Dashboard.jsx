import { useId } from "react";
import { LayoutGrid, Rss, PenLine, BarChart3, Settings, Search } from "lucide-react";
import piqMark from "../assets/piq-mark.png";
import { useCountUp } from "../hooks/useCountUp.js";
import ClaudeSession from "./ClaudeSession.jsx";

const NAV_MAIN = [
  { en: "Overview", ar: "نظرة عامة", Icon: LayoutGrid, active: true },
  { en: "Sources", ar: "المصادر", Icon: Rss },
  { en: "Editorial", ar: "التحرير", Icon: PenLine },
  { en: "Analytics", ar: "التحليلات", Icon: BarChart3 },
];

// Build an SVG polyline path from a value series (needs >= 2 points)
function spark(values, w = 180, h = 34) {
  if (!values || values.length < 2) return "";
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || 1;
  const step = w / (values.length - 1);
  return values
    .map((v, i) => `${i === 0 ? "M" : "L"} ${(i * step).toFixed(1)} ${(h - ((v - min) / span) * h).toFixed(1)}`)
    .join(" ");
}

// Static chart data (module-level: stable refs, computed once)
const SPARK_SOURCES = spark([20, 28, 24, 30, 26, 34, 40]);
const SPARK_COST = spark([30, 26, 28, 20, 24, 16, 14]);
const NEWS_BARS = [3, 5, 8, 4, 9, 6, 7];

const EDITORIAL_SCRIPT = [
  { role: "prompt", text: "claude rewrite --tone sp-house" },
  { role: "tool", text: "Reading: رؤية 2030 وأرقام السياحة" },
  { role: "tool", text: "Drafting Arabic summary" },
  { role: "tool", text: "Translating to English" },
  { role: "done", text: "Draft ready · 1,240 tokens · $0.0041" },
];
const PIPELINE_SCRIPT = [
  { role: "prompt", text: "claude pipeline --since 5m" },
  { role: "tool", text: "Ingested 320 items from 46 sources" },
  { role: "tool", text: "Clustered duplicates to 96 unique events" },
  { role: "tool", text: "Quality gate: 41 passed to drafting" },
  { role: "done", text: "Throughput nominal · $0.0042 per article" },
];

const FEED = [
  { tag: "New source", ar: "مصدر جديد", c: "sage", t: "00:21", text: "Asharq added to monitored Arabic sources." },
  { tag: "Spike", ar: "ارتفاع", c: "crimson", t: "00:09", text: "Sentiment cluster forming on logistics delay." },
  { tag: "Mention", ar: "إشارة", c: "gold", t: "00:34", text: "Op-ed cites Saudi Panther Green Initiative analysis." },
  { tag: "Amplified", ar: "تضخيم", c: "sage", t: "00:02", text: "Vision 2030 tourism figures across 14 outlets." },
];
const TAG_COLOR = { sage: "text-sage bg-sage/15", crimson: "text-crimson bg-crimson/15", gold: "text-gold bg-gold/15" };

const BLIPS = [
  { x: 132, y: 70, c: "#D4A054", ping: true },
  { x: 76, y: 96, c: "#7C967A" },
  { x: 120, y: 134, c: "#7C967A" },
  { x: 150, y: 110, c: "#D4A054" },
  { x: 64, y: 140, c: "#B22234", ping: true },
  { x: 96, y: 58, c: "#7C967A" },
];

function AnimatedNumber({ target, format }) {
  const [ref, v] = useCountUp(target);
  return (
    <span ref={ref} className="font-display text-2xl tabular-nums text-paper tnum">
      {format ? format(v) : v.toLocaleString("en-US")}
    </span>
  );
}

function MetricCard({ label, ar, target, format, delta, children }) {
  return (
    <div className="glass glass-hover glass-sheen overflow-hidden rounded-xl p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-paper/55">{label}</p>
        <span className="text-[10px] text-paper/35" dir="rtl">{ar}</span>
      </div>
      <div className="mt-2 flex items-end gap-2">
        <AnimatedNumber target={target} format={format} />
        {delta && <span className="mb-1 text-[11px] text-sage">↑ {delta}</span>}
      </div>
      <div className="mt-3 h-9">{children}</div>
    </div>
  );
}

function ThroughputChart() {
  const uid = useId();
  const gGold = `gGold-${uid}`;
  const gSage = `gSage-${uid}`;
  const W = 560, H = 180;
  const rss = [120, 180, 150, 230, 200, 280, 320];
  const x = [80, 110, 95, 140, 130, 175, 210];
  const max = Math.max(...rss, ...x) * 1.15;
  const step = W / (rss.length - 1);
  const toPts = (s) => s.map((v, i) => [i * step, H - (v / max) * H]);
  const line = (pts) => pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  const area = (pts) => `${line(pts)} L ${W} ${H} L 0 ${H} Z`;
  const rp = toPts(rss), xp = toPts(x);
  const last = rp[rp.length - 1];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return (
    <div className="h-full rounded-xl glass p-5 ring-1 ring-white/8">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-paper">Throughput</h3>
          <p className="text-[11px] text-paper/45" dir="rtl">الإنتاجية · آخر 7 أيام</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-[11px] text-paper/55"><span className="h-1.5 w-1.5 rounded-full bg-gold" /> RSS</span>
          <span className="flex items-center gap-1.5 text-[11px] text-paper/55"><span className="h-1.5 w-1.5 rounded-full bg-sage" /> X</span>
        </div>
      </div>
      <svg viewBox={`0 0 ${W} ${H + 22}`} className="w-full" role="img" aria-label="Throughput, RSS versus X, last seven days">
        <defs>
          <linearGradient id={gGold} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D4A054" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#D4A054" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={gSage} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7C967A" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#7C967A" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75, 1].map((g) => (
          <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} stroke="#ffffff" strokeOpacity="0.06" />
        ))}
        <path d={area(rp)} fill={`url(#${gGold})`} />
        <path d={area(xp)} fill={`url(#${gSage})`} />
        <path d={line(rp)} fill="none" stroke="#D4A054" strokeWidth="2" className="chart-line" />
        <path d={line(xp)} fill="none" stroke="#7C967A" strokeWidth="2" className="chart-line" />
        <circle cx={last[0]} cy={last[1]} r="9" fill="#D4A054" opacity="0.18" className="radar-ping" style={{ transformOrigin: `${last[0]}px ${last[1]}px` }} />
        <circle cx={last[0]} cy={last[1]} r="3.5" fill="#D4A054" />
        {days.map((d, i) => (
          <text key={d} x={i * step} y={H + 16} fill="#ffffff" fillOpacity="0.4" fontSize="10" textAnchor={i === 0 ? "start" : i === days.length - 1 ? "end" : "middle"}>{d}</text>
        ))}
      </svg>
    </div>
  );
}

function Radar() {
  const uid = useId();
  const sweepG = `sweepG-${uid}`;
  return (
    <div className="h-full rounded-xl glass p-5 ring-1 ring-white/8">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-paper">Intelligence radar</h3>
          <p className="text-[11px] text-paper/45" dir="rtl">رادار الإشارات</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-sage/15 px-2 py-0.5 text-[10px] text-sage">
          <span className="live-dot h-1.5 w-1.5 rounded-full bg-sage" /> Live
        </span>
      </div>
      <svg viewBox="0 0 200 200" className="mx-auto w-full max-w-[230px]" role="img" aria-label="Signal radar">
        <defs>
          <radialGradient id={sweepG} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D4A054" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#D4A054" stopOpacity="0" />
          </radialGradient>
        </defs>
        {[30, 55, 80].map((r) => (
          <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="#ffffff" strokeOpacity="0.08" />
        ))}
        <line x1="100" y1="20" x2="100" y2="180" stroke="#ffffff" strokeOpacity="0.06" />
        <line x1="20" y1="100" x2="180" y2="100" stroke="#ffffff" strokeOpacity="0.06" />
        <g className="radar-sweep" style={{ transformOrigin: "100px 100px" }}>
          <path d="M100 100 L100 20 A80 80 0 0 1 156 44 Z" fill={`url(#${sweepG})`} />
          <line x1="100" y1="100" x2="100" y2="20" stroke="#D4A054" strokeOpacity="0.5" strokeWidth="1.5" />
        </g>
        {BLIPS.map((b) => (
          <g key={`${b.x}-${b.y}`}>
            {b.ping && (
              <circle cx={b.x} cy={b.y} r="7" fill={b.c} opacity="0.25" className="radar-ping" style={{ transformOrigin: `${b.x}px ${b.y}px` }} />
            )}
            <circle cx={b.x} cy={b.y} r="2.6" fill={b.c} />
          </g>
        ))}
      </svg>
    </div>
  );
}

function LiveFeed() {
  return (
    <div className="h-full rounded-xl glass p-5 ring-1 ring-white/8">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium text-paper">Live signal feed</h3>
        <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-kicker text-gold">
          <span className="live-dot h-1.5 w-1.5 rounded-full bg-gold" /> Live
        </span>
      </div>
      <ul className="space-y-3">
        {FEED.map((f, i) => (
          <li key={f.tag} className="feed-item flex gap-3" style={{ animationDelay: `${0.3 + i * 0.18}s` }}>
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-paper/40" />
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center justify-between gap-2">
                <span className={`rounded px-1.5 py-0.5 text-[10px] ${TAG_COLOR[f.c]}`}>
                  {f.tag} · <span dir="rtl">{f.ar}</span>
                </span>
                <span className="text-[10px] tabular-nums text-paper/35 tnum">{f.t}</span>
              </div>
              <p className="text-[12px] leading-5 text-paper/70">{f.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Dashboard() {
  return (
    <section id="platform" className="scroll-mt-20 bg-forest-deep">
      <div className="mx-auto max-w-editorial px-6 py-24 lg:px-10 lg:py-32">
        <div className="reveal mb-12 max-w-2xl">
          <p className="kicker mb-4">The platform · المنصة</p>
          <h2 className="font-display text-4xl leading-tight tracking-[-0.02em] text-paper lg:text-5xl">
            One screen. Source to story.
          </h2>
          <p className="mt-5 text-[15px] leading-7 text-paper/65">
            The SP Hub operating surface: live sources, the editorial pipeline,
            and Claude working each story in view. This is the product, not a render.
          </p>
        </div>

        <div className="reveal scan relative overflow-hidden rounded-2xl bg-[#0a140f] p-1.5 shadow-lift ring-1 ring-white/12">
          <div className="flex min-h-[540px] overflow-hidden rounded-xl">
            {/* Sidebar */}
            <aside className="glass-dark hidden w-[220px] shrink-0 flex-col justify-between border-r border-white/8 p-4 lg:flex">
              <div>
                <div className="mb-8 flex items-center gap-2.5">
                  <img src={piqMark} alt="" className="h-7 w-7" />
                  <div>
                    <p className="text-sm font-semibold tracking-tight text-paper">SP Hub</p>
                    <p className="text-[10px] text-paper/40" dir="rtl">منصة بانثر آي كيو</p>
                  </div>
                </div>
                <p className="mb-2 px-3 text-[10px] uppercase tracking-kicker text-paper/30">Main</p>
                <nav className="space-y-1">
                  {NAV_MAIN.map(({ en, ar, Icon, active }) => (
                    <span key={en} className={`relative flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs ${active ? "bg-white/[0.06] font-medium text-paper ring-1 ring-white/10" : "text-paper/55"}`}>
                      {active && <span className="absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-full bg-gold" />}
                      <Icon className={`h-4 w-4 ${active ? "text-gold" : "text-paper/40"}`} />
                      <span className="flex-1">{en}</span>
                      <span className="text-[10px] text-paper/30" dir="rtl">{ar}</span>
                    </span>
                  ))}
                </nav>
              </div>
              <div className="rounded-xl glass p-3 ring-1 ring-white/8">
                <p className="text-[11px] font-medium text-paper">Cost ledger</p>
                <p className="mt-1 text-[10px] leading-4 text-paper/45" dir="rtl">تكلفة كل خبر بالدولار</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-display text-base text-gold tnum">$0.0042</span>
                  <Settings className="h-3.5 w-3.5 text-paper/35" />
                </div>
              </div>
            </aside>

            {/* Main (div, not header: avoids a second banner landmark) */}
            <div className="relative flex-1 overflow-hidden p-4 lg:p-6">
              {/* ambient orbs that the glass tiles refract */}
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
                <div className="orb drift-1 absolute -left-10 -top-12 h-64 w-64 bg-gold/25" />
                <div className="orb drift-2 absolute right-0 top-1/3 h-72 w-72 bg-sage/20" />
                <div className="orb drift-1 absolute bottom-0 left-1/3 h-56 w-56 bg-forest/50" />
              </div>
              <div className="relative z-10">
              <div className="mb-5 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                <div className="flex items-center gap-3">
                  <div>
                    <h3 className="font-display text-xl tracking-[-0.01em] text-paper">Newsroom Hub</h3>
                    <p className="text-xs text-paper/45" dir="rtl">رصد، فرز، صياغة، نشر</p>
                  </div>
                  <span className="flex items-center gap-1.5 rounded-full bg-gold/15 px-2.5 py-1 text-[10px] uppercase tracking-kicker text-gold">
                    <span className="live-dot h-1.5 w-1.5 rounded-full bg-gold" /> Live
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="hidden h-9 items-center gap-2 rounded-xl border border-white/10 glass px-3 text-xs text-paper/40 sm:flex sm:w-56">
                    <Search className="h-3.5 w-3.5" />
                    <span dir="rtl">ابحث في الأخبار...</span>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/15 text-xs font-semibold text-gold ring-1 ring-gold/30">AB</div>
                </div>
              </div>

              {/* Row A: metric cards */}
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
                <MetricCard label="Active sources" ar="المصادر" target={46} delta="2">
                  <svg viewBox="0 0 180 34" className="h-full w-full overflow-visible"><path d={SPARK_SOURCES} fill="none" stroke="#D4A054" strokeWidth="2" className="chart-line" /></svg>
                </MetricCard>
                <MetricCard label="Indexed" ar="مفهرس" target={16393} delta="4.1%">
                  <div className="flex h-full items-center justify-between">
                    <p className="text-[11px] text-paper/40">Elastic Cloud</p>
                    <div className="h-9 w-9 rounded-full border-[5px] border-gold/80 border-l-white/10" />
                  </div>
                </MetricCard>
                <MetricCard label="News items" ar="الأخبار" target={69745} delta="1.2%">
                  <div className="flex h-full items-end gap-1.5">
                    {NEWS_BARS.map((h, i) => (
                      <span key={`${i}-${h}`} className="w-1.5 rounded-full bg-sage/80" style={{ height: `${h * 3.5}px` }} />
                    ))}
                  </div>
                </MetricCard>
                <MetricCard label="NLP cost / day" ar="التكلفة" target={1840} format={(v) => `$${(v / 100).toFixed(2)}`} delta="3.3%">
                  <svg viewBox="0 0 180 34" className="h-full w-full overflow-visible"><path d={SPARK_COST} fill="none" stroke="#7C967A" strokeWidth="2" className="chart-line" /></svg>
                </MetricCard>
              </div>

              {/* Row B: Claude session + live feed */}
              <div className="mt-3 grid grid-cols-1 gap-3 xl:grid-cols-5">
                <div className="xl:col-span-3">
                  <ClaudeSession label="claude · editorial" script={EDITORIAL_SCRIPT} className="h-full" />
                </div>
                <div className="xl:col-span-2"><LiveFeed /></div>
              </div>

              {/* Row C: throughput + radar */}
              <div className="mt-3 grid grid-cols-1 gap-3 xl:grid-cols-5">
                <div className="xl:col-span-3"><ThroughputChart /></div>
                <div className="xl:col-span-2"><Radar /></div>
              </div>

              {/* Row D: full-width Claude pipeline session */}
              <div className="mt-3">
                <ClaudeSession label="claude · pipeline" script={PIPELINE_SCRIPT} />
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
