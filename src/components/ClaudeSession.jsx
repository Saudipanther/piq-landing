import { useEffect, useState } from "react";

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Original 4-point "spark" mark for the session header (brand gold).
function SparkMark({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 1c.6 5.5 5.5 10.4 11 11-5.5.6-10.4 5.5-11 11-.6-5.5-5.5-10.4-11-11C6.5 11.4 11.4 6.5 12 1Z"
        fill="currentColor"
      />
    </svg>
  );
}

// Per-role line styling for the simulated terminal
const ROLE = {
  prompt: { prefix: "›", cls: "text-gold", textCls: "text-paper" },
  tool: { prefix: "⎿", cls: "text-sage", textCls: "text-paper/70" },
  done: { prefix: "✓", cls: "text-sage", textCls: "text-paper" },
};

/**
 * Simulated Claude Code session with a typewriter effect.
 * `script`: array of { role: 'prompt' | 'tool' | 'done', text }.
 * Types line by line, pauses, then loops. Honors prefers-reduced-motion
 * (renders the full transcript statically). All timers cleared on unmount.
 */
export default function ClaudeSession({ script, label = "claude", className = "" }) {
  const reduced = prefersReduced();
  // done = array of fully-typed line texts; cur = { i, text } currently typing
  const [done, setDone] = useState(reduced ? script.map((l) => l.text) : []);
  const [cur, setCur] = useState(reduced ? { i: script.length, text: "" } : { i: 0, text: "" });

  useEffect(() => {
    if (reduced) return;
    let cancelled = false;
    let timer;
    let line = 0;
    let ch = 0;
    let completed = [];

    const step = () => {
      if (cancelled) return;
      if (line >= script.length) {
        timer = setTimeout(() => {
          if (cancelled) return;
          completed = [];
          line = 0;
          ch = 0;
          setDone([]);
          setCur({ i: 0, text: "" });
          step();
        }, 2800);
        return;
      }
      const full = script[line].text;
      if (ch <= full.length) {
        setCur({ i: line, text: full.slice(0, ch) });
        const speed = script[line].role === "prompt" ? 34 : 13;
        ch += 1;
        timer = setTimeout(step, speed);
      } else {
        completed = [...completed, full];
        setDone(completed);
        const wasPrompt = script[line].role === "prompt";
        line += 1;
        ch = 0;
        setCur({ i: line, text: "" });
        timer = setTimeout(step, wasPrompt ? 480 : 260);
      }
    };

    timer = setTimeout(step, 600);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [script, reduced]);

  const renderLine = (text, role, key, typing = false) => {
    const r = ROLE[role] || ROLE.tool;
    return (
      <div key={key} className="flex gap-2 leading-6">
        <span className={`shrink-0 ${r.cls}`}>{r.prefix}</span>
        <span className={r.textCls}>
          {text}
          {typing && <span className="caret ml-0.5 inline-block">▍</span>}
        </span>
      </div>
    );
  };

  return (
    <div className={`glass-dark relative overflow-hidden rounded-xl shadow-lift ${className}`}>
      <div className="flex items-center justify-between border-b border-white/8 px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          <SparkMark className="spin-slow h-4 w-4 text-gold drop-shadow-[0_0_6px_rgba(212,160,84,0.55)]" />
          <span className="text-[12px] font-medium text-paper/80">{label}</span>
        </div>
        <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-kicker text-paper/40">
          <span className="live-dot h-1.5 w-1.5 rounded-full bg-gold" />
          live
        </span>
      </div>
      <div className="min-h-[150px] p-4 font-mono text-[12.5px]">
        {done.map((text, i) => renderLine(text, script[i].role, `d${i}`))}
        {cur.i < script.length &&
          renderLine(cur.text, script[cur.i].role, `c${cur.i}`, true)}
      </div>
    </div>
  );
}
