import { Link } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/session";
import { CheckCircle2, AlertTriangle, MinusCircle } from "lucide-react";

const steps = [
  { kind: "ok", text: "Stated identity sin²θ + cos²θ = 1.", note: "Correct identity named." },
  { kind: "partial", text: "Divided both sides by cos²θ.", note: "Step shown but missing reasoning line. Partial credit." },
  { kind: "miss", text: "Final simplification.", note: "Mistake type: Conceptual setup. Marks lost: 1." },
];

export default function CheckResult() {
  const { signedIn } = useSession();
  return (
    <AppShell>
      <div className="grid lg:grid-cols-[1fr_300px] gap-5">
        <div className="space-y-4">
          <div className="lt-card p-5">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <div className="text-xs text-muted-foreground">Examiner-style result • Trigonometry</div>
                <h1 className="font-display text-2xl mt-1">2 / 3 marks</h1>
              </div>
              <div className="flex gap-2">
                <span className="chip">Section C</span>
                <span className="chip">3 marks</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1.5">Examiner-style estimate. Not an official board result.</p>
          </div>

          <div className="lt-card p-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Annotated steps</div>
            <ol className="space-y-3 text-sm">
              {steps.map((s, i) => {
                const Icon = s.kind === "ok" ? CheckCircle2 : s.kind === "partial" ? MinusCircle : AlertTriangle;
                const tone = s.kind === "ok" ? "text-[hsl(var(--success))]" : s.kind === "partial" ? "text-[hsl(var(--warn))]" : "text-destructive";
                return (
                  <li key={i} className="flex gap-3">
                    <Icon className={`h-5 w-5 mt-0.5 ${tone}`} />
                    <div>
                      <div className="font-medium">Step {i + 1} — {s.text}</div>
                      <div className="text-muted-foreground">{s.note}</div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="lt-card p-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Mistake summary</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
              <Tag label="Conceptual" v={1} />
              <Tag label="Calculation" v={0} />
              <Tag label="Presentation" v={0} />
              <Tag label="Silly" v={0} />
            </div>
            <div className="mt-3 rounded-md border border-primary/15 bg-[hsl(var(--primary-soft))] text-foreground px-3 py-2 text-sm">
              <span className="font-medium">Teacher note:</span> Name the identity you’re using before dividing — markers reward that line.
            </div>
          </div>
        </div>

        <aside className="space-y-3">
          <div className="lt-card p-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Save state</div>
            {signedIn ? (
              <div className="rounded-md lt-success px-3 py-2 text-sm">Saved to Mistake Intelligence</div>
            ) : (
              <div className="rounded-md border border-dashed border-border px-3 py-2 text-sm text-muted-foreground">
                Result shown, but not saved to your profile.
                <Button asChild size="sm" className="mt-2 w-full"><Link to="/app/login?reason=grade-answer">Sign in to save</Link></Button>
              </div>
            )}
          </div>
          <div className="lt-card p-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Next actions</div>
            <div className="flex flex-col gap-2">
              <Button asChild variant="outline"><Link to="/app/practice/run?mode=quick&topic=trigonometry">Practise similar question</Link></Button>
              <Button asChild variant="outline"><Link to="/app/worksheets/build?subject=Maths&topic=trigonometry">Generate mistake-aware worksheet</Link></Button>
              <Button asChild variant="ghost">{<Link to="/app/practice/run?mode=quick&topic=trigonometry">Revise Trigonometry basics</Link>}</Button>
              <Button asChild variant="ghost"><Link to="/app/me">See Me / Progress</Link></Button>
            </div>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}

function Tag({ label, v }: { label: string; v: number }) {
  return (
    <div className="rounded-md border border-border bg-card p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="font-display text-xl">{v}</div>
    </div>
  );
}