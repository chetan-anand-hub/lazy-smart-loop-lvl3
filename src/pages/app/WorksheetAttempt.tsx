import { useState } from "react";
import { Link } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SolutionCard } from "@/components/SolutionCard";
import { useSession } from "@/lib/session";
import { CheckCircle2, Circle, CircleDot, Sparkles } from "lucide-react";

const questions = [
  { id: 1, q: "Evaluate sin²30° + cos²30°.", marks: 1, status: "Attempted" },
  { id: 2, q: "If tan A = 3/4, find sin A and cos A.", marks: 2, status: "Not started" },
  { id: 3, q: "Prove (1 + tan²θ) = sec²θ.", marks: 3, status: "Not started" },
  { id: 4, q: "From a 30 m tower, angle of depression of a car is 30°. Find distance.", marks: 4, status: "Checked" },
];

const statusIcon = (s: string) => s === "Checked" ? CheckCircle2 : s === "Attempted" ? CircleDot : Circle;

export default function WorksheetAttempt() {
  const { signedIn } = useSession();
  const [active, setActive] = useState(2);
  const [showSol, setShowSol] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const onGen = () => { setGenerating(true); setTimeout(() => { setGenerating(false); setGenerated(true); setShowSol(true); }, 1100); };
  const cur = questions.find(q => q.id === active)!;

  return (
    <AppShell>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl">Worksheet attempt — Trigonometry</h1>
        <Button asChild variant="ghost" size="sm"><Link to="/app/worksheets/ready">Back to worksheet</Link></Button>
      </div>

      <div className="grid lg:grid-cols-[260px_1fr_300px] gap-5">
        <div className="lt-card p-3 h-fit">
          {questions.map(q => {
            const Icon = statusIcon(q.status);
            return (
              <button key={q.id} onClick={() => setActive(q.id)} className={`w-full text-left rounded-lg px-3 py-2 flex items-start gap-2 text-sm ${active === q.id ? "bg-secondary" : "hover:bg-secondary/60"}`}>
                <Icon className={`h-4 w-4 mt-0.5 ${q.status === "Checked" ? "text-primary" : "text-muted-foreground"}`} />
                <div className="flex-1">
                  <div className="font-medium">Q{q.id} · {q.marks}m</div>
                  <div className="text-xs text-muted-foreground line-clamp-1">{q.q}</div>
                  <div className="text-[10px] uppercase tracking-wide text-muted-foreground mt-0.5">{q.status}</div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="lt-card p-6">
          <div className="text-xs text-muted-foreground mb-2">Question {cur.id} • {cur.marks} marks</div>
          <p className="font-display text-xl mb-4">{cur.q}</p>
          <Textarea placeholder="Your working" className="min-h-[160px]" />
          <div className="flex flex-wrap gap-2 mt-4">
            <Button>Mark attempted</Button>
            <Button variant="outline" onClick={() => setShowSol(true)}>Show solution</Button>
            <Button variant="outline" onClick={onGen}><Sparkles className="h-4 w-4 mr-1" /> Generate solution</Button>
            <Button asChild variant="secondary"><Link to="/app/check?source=worksheet&topic=trigonometry">Check this answer</Link></Button>
          </div>

          {(showSol || generated) && (
            <div className="mt-6">
              {generating ? (
                <div className="lt-card p-5 space-y-2">
                  <div className="h-4 w-3/4 rounded shimmer" />
                  <div className="h-4 w-2/3 rounded shimmer" />
                  <div className="h-4 w-1/2 rounded shimmer" />
                </div>
              ) : (
                <SolutionCard generated={generated} />
              )}
            </div>
          )}

          <div className="mt-5 text-sm">
            {signedIn
              ? <span className="rounded-lg lt-soft px-3 py-1.5">Attempt saved to your profile</span>
              : <span className="rounded-lg border border-dashed border-border px-3 py-1.5 text-muted-foreground">This attempt is not saved to your profile.</span>}
          </div>
        </div>

        <aside className="lt-card p-5 h-fit">
          <div className="font-display text-lg mb-2">Next best step</div>
          <ol className="text-sm space-y-2 list-decimal pl-4 text-muted-foreground">
            <li>Finish Q{cur.id} working.</li>
            <li>Check it for examiner-style feedback.</li>
            <li>Move to Q{cur.id + 1}.</li>
          </ol>
        </aside>
      </div>
    </AppShell>
  );
}