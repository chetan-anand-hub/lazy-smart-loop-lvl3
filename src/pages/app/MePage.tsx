import { Link } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/session";
import { FileText, CheckCircle2, AlertTriangle, Sparkles } from "lucide-react";

const stats = [
  { label: "7-day trial", v: "Day 2", sub: "5 days remaining" },
  { label: "Worksheets generated", v: "3" },
  { label: "Answers checked", v: "5" },
  { label: "Mistakes logged", v: "4" },
];

const timeline = [
  { icon: FileText, text: "Worksheet generated — Trigonometry, 20 questions", when: "Today, 10:14" },
  { icon: CheckCircle2, text: "Answer checked — Q3, 2/3 marks", when: "Today, 10:42" },
  { icon: AlertTriangle, text: "Mistake logged — Conceptual setup", when: "Today, 10:42" },
  { icon: Sparkles, text: "Similar practice recommended — 5 identity questions", when: "Today, 10:43" },
];

export default function MePage() {
  const { signedIn } = useSession();

  if (!signedIn) {
    return (
      <AppShell>
      <div className="lt-card p-6 text-center max-w-xl mx-auto">
          <h1 className="font-display text-2xl mb-2">Me / Progress</h1>
          <p className="text-muted-foreground mb-5">Start your 7-day trial so LazyTopper can save attempts, mistakes and recommend what to practise next.</p>
          <Button asChild><Link to="/app/login?reason=start-trial">Start 7-day trial</Link></Button>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="flex items-end justify-between mb-4 flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl">Me / Progress</h1>
          <p className="text-muted-foreground text-xs">Sample prototype state · based on saved attempts and checked answers</p>
        </div>
        <span className="chip text-primary border-primary/20 bg-[hsl(var(--primary-soft))]">Demo profile</span>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {stats.map(s => (
          <div key={s.label} className="lt-card p-3.5">
            <div className="text-xs text-muted-foreground">{s.label}</div>
            <div className="font-display text-xl mt-0.5">{s.v}</div>
            {s.sub && <div className="text-[11px] text-muted-foreground mt-0.5">{s.sub}</div>}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-5">
        <div className="lt-card p-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Activity timeline</div>
          <ol className="space-y-3">
            {timeline.map((t, i) => (
              <li key={i} className="flex gap-3">
                <div className="h-8 w-8 rounded-md border border-border bg-secondary grid place-items-center shrink-0 text-primary"><t.icon className="h-4 w-4" /></div>
                <div className="flex-1">
                  <div className="text-sm">{t.text}</div>
                  <div className="text-[11px] text-muted-foreground">{t.when}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <aside className="space-y-3">
          <div className="lt-card p-4">
            <div className="text-xs text-muted-foreground">Most common mark loss</div>
            <div className="font-display text-lg mt-0.5">Conceptual setup</div>
            <div className="text-[11px] text-muted-foreground mt-0.5">Based on checked answers only.</div>
          </div>
          <div className="lt-card p-4">
            <div className="text-xs text-muted-foreground">Next recommended action</div>
            <div className="text-sm mt-1">Practise 5 trigonometry identity questions.</div>
            <Button asChild className="w-full mt-3"><Link to="/app/practice/run?mode=quick&topic=trigonometry">Start practice</Link></Button>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}