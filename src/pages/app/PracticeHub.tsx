import { Link } from "react-router-dom";
import { AppShell, ContextBar, ScopeBuilder } from "@/components/AppShell";
import { Pencil, FileText, Sparkles, Timer, ClipboardList, Layers, ArrowRight, BookOpen, AlertTriangle, TrendingUp } from "lucide-react";

const actions = [
  { to: "/app/practice/run?mode=quick&topic=trigonometry", icon: Pencil, title: "Quick Practice", desc: "One question at a time. Honest check, board-style hints.", emerald: true },
  { to: "/app/worksheets?from=practice", icon: FileText, title: "Worksheet", desc: "Build a board-style mix across Sections A–E." },
  { to: "/app/practice/run?mode=hpq&topic=trigonometry", icon: Sparkles, title: "Predicted / HPQs", desc: "High-probability questions for this topic." },
  { to: "/app/practice/run?mode=mock&topic=full", icon: ClipboardList, title: "Full Mock", desc: "Complete 80-mark paper, sectioned and timed." },
];

const more = [
  { icon: Timer, title: "Timed Drill", desc: "10 short questions with a soft timer." },
  { icon: Layers, title: "Chapter Test", desc: "Auto-mix from one chapter, full mark spread." },
  { icon: BookOpen, title: "Practice Paper", desc: "Past-paper style attempt for Term 2." },
];

const hpqTabs = ["Topic HPQs", "Selected topics", "Full subject"] as const;

export default function PracticeHub() {
  return (
    <AppShell>
      <div className="grid lg:grid-cols-[1fr_300px] gap-6">
        <div>
          <div className="text-xs text-muted-foreground mb-1">Practice</div>
          <h1 className="font-display text-[28px] leading-tight">Practise what helps. Skip what doesn’t.</h1>
          <p className="text-sm text-muted-foreground mt-1.5 max-w-2xl">
            Pick your scope, then choose how you want to practise. Every saved attempt feeds your Mistake Intelligence.
          </p>

          <div className="mt-4">
            <ContextBar />
            <ScopeBuilder />
          </div>

          <div className="mb-2 flex items-center justify-between">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Choose what to do</div>
            <span className="text-[11px] text-muted-foreground">4 modes</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {actions.map((a) => (
              <Link
                key={a.title}
                to={a.to}
                className="lt-card p-4 hover:border-foreground/30 transition-colors group"
              >
                <div className="flex items-start gap-3">
                  <div className={`h-9 w-9 rounded-xl grid place-items-center ${a.emerald ? "lt-soft" : "border border-border bg-secondary text-foreground"}`}>
                    <a.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-display text-[15px]">{a.title}</div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
                    </div>
                    <p className="text-[12px] text-muted-foreground mt-0.5">{a.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="lt-card p-4 mt-5">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">More practice options</div>
            <div className="grid sm:grid-cols-3 gap-3">
              {more.map((m) => (
                <div key={m.title} className="rounded-xl border border-border p-3 bg-card">
                  <div className="flex items-center gap-2"><m.icon className="h-4 w-4 text-[hsl(var(--accent-emerald))]" /><div className="font-medium text-sm">{m.title}</div></div>
                  <p className="text-[12px] text-muted-foreground mt-1">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lt-card p-4 mt-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Paper blueprint</div>
                <div className="font-display text-base mt-0.5">Term 2 · Maths · 80 marks</div>
              </div>
              <span className="chip">5 sections</span>
            </div>
            <div className="grid grid-cols-5 gap-2 text-center text-[11px]">
              {[
                ["A", "1×20", "MCQ + 1m"],
                ["B", "2×5", "Short"],
                ["C", "3×6", "Short long"],
                ["D", "5×4", "Long"],
                ["E", "4×3", "Case study"],
              ].map(([s, q, t]) => (
                <div key={s} className="rounded-lg border border-border bg-secondary/60 p-2">
                  <div className="font-display text-base">Sec {s}</div>
                  <div className="text-muted-foreground">{q}</div>
                  <div className="text-[10px] text-muted-foreground/80">{t}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lt-card p-4 mt-5">
            <div className="flex items-center justify-between mb-3">
              <div className="font-display text-base">Predicted questions</div>
              <span className="chip-emerald">Auto-curated</span>
            </div>
            <div className="flex gap-1.5 mb-3">
              {hpqTabs.map((t, i) => (
                <span key={t} className={`chip ${i === 0 ? "chip-emerald" : ""}`}>{t}</span>
              ))}
            </div>
            <div className="space-y-2 text-sm">
              {[
                "Prove that (1 + cot A − cosec A)(1 + tan A + sec A) = 2.",
                "If sin θ + cos θ = √2 cos θ, show that cos θ − sin θ = √2 sin θ.",
                "Evaluate: (sin²30° + 4cot²45° − sec²60°).",
              ].map((q, i) => (
                <div key={i} className="rounded-lg border border-border bg-card px-3 py-2 flex items-start gap-2">
                  <span className="chip mt-0.5">3m</span>
                  <span className="flex-1">{q}</span>
                  <Link to="/app/practice/run?mode=quick&topic=trigonometry" className="text-[12px] text-[hsl(var(--accent-emerald))] hover:underline">Practise</Link>
                </div>
              ))}
            </div>
            <div className="text-[11px] text-muted-foreground mt-3">Sample preview — based on past board patterns.</div>
          </div>
        </div>

        <aside className="space-y-3 lg:sticky lg:top-20 h-fit">
          <div className="lt-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-[hsl(var(--warn))]" />
              <div className="font-display text-base">Mistake Intelligence</div>
            </div>
            <p className="text-[12px] text-muted-foreground mb-3">Powered by your saved checked answers.</p>
            <ul className="text-sm space-y-1.5">
              <li className="flex justify-between"><span className="text-muted-foreground">Top mistake</span><span className="font-medium">Conceptual setup</span></li>
              <li className="flex justify-between"><span className="text-muted-foreground">Weakest sub-topic</span><span className="font-medium">Identity proofs</span></li>
              <li className="flex justify-between"><span className="text-muted-foreground">Marks at risk</span><span className="font-medium">~6/80</span></li>
            </ul>
            <Link to="/app/me" className="text-[12px] text-[hsl(var(--accent-emerald))] hover:underline mt-3 inline-block">See full Me / Progress →</Link>
          </div>

          <div className="lt-card p-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Quick links</div>
            <div className="flex flex-col gap-1.5 text-sm">
              <Link className="hover:underline" to="/app/check?source=worksheet&topic=trigonometry">Check an answer</Link>
              <Link className="hover:underline" to="/app/worksheets?from=practice">Build a worksheet</Link>
              <Link className="hover:underline" to="/app/me">Me / Progress</Link>
            </div>
          </div>

          <div className="lt-card p-4">
            <div className="flex items-center gap-2 mb-1"><TrendingUp className="h-4 w-4 text-[hsl(var(--accent-emerald))]" /><div className="font-display text-base">Today’s loop</div></div>
            <p className="text-[12px] text-muted-foreground">Trigonometry · 7/10. Main issue: sign error in identity proof.</p>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}