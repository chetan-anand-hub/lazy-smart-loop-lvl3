import { Lightbulb, AlertTriangle, CheckCircle2, BookOpen } from "lucide-react";

export function SolutionCard({ generated = false }: { generated?: boolean }) {
  return (
    <div className="lt-card p-4 space-y-3">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="chip-emerald"><BookOpen className="h-3 w-3" /> {generated ? "AI board-style solution" : "Board-style solution"}</span>
        <span className="chip">CBSE marking scheme</span>
        <span className="chip">3 step credit</span>
      </div>
      <ol className="space-y-3 text-sm">
        <li>
          <div className="font-medium">Step 1 — Identify identity</div>
          <div className="text-muted-foreground">Use the Pythagorean identity: sin²θ + cos²θ = 1.</div>
        </li>
        <li>
          <div className="font-medium">Step 2 — Substitute values</div>
          <div className="text-muted-foreground">sin 30° = 1/2, cos 30° = √3/2 → (1/2)² + (√3/2)² = 1/4 + 3/4.</div>
        </li>
        <li>
          <div className="font-medium">Step 3 — Simplify</div>
          <div className="text-muted-foreground">1/4 + 3/4 = 1.</div>
        </li>
      </ol>
      <div className="rounded-lg lt-success px-3.5 py-2.5 text-sm font-medium flex items-center gap-2">
        <CheckCircle2 className="h-4 w-4" /> Final answer: 1
      </div>
      <div className="grid sm:grid-cols-2 gap-3 text-sm">
        <div className="rounded-lg border border-border bg-secondary/60 p-3">
          <div className="flex items-center gap-2 font-medium"><AlertTriangle className="h-4 w-4 text-[hsl(var(--warn))]" /> Common mistake</div>
          <p className="text-muted-foreground mt-1">Writing cos 30° as 1/2 (that is sin 30°). Mark loss is usually 1.</p>
        </div>
        <div className="rounded-lg border border-border bg-secondary/60 p-3">
          <div className="flex items-center gap-2 font-medium"><Lightbulb className="h-4 w-4 text-[hsl(var(--accent-emerald))]" /> Examiner tip</div>
          <p className="text-muted-foreground mt-1">State the identity used before substituting — markers reward the named step.</p>
        </div>
      </div>
    </div>
  );
}