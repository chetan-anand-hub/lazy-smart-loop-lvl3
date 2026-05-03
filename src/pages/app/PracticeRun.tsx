import { useState } from "react";
import { Link } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "@/lib/session";
import { SolutionCard } from "@/components/SolutionCard";
import { LogIn, Save, Sparkles } from "lucide-react";

export default function PracticeRun() {
  const { signedIn } = useSession();
  const [attempted, setAttempted] = useState(false);
  const [showSol, setShowSol] = useState(false);
  const [hasBankSolution] = useState(false); // demo AI fallback
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const onGenerate = () => {
    setGenerating(true);
    setTimeout(() => { setGenerating(false); setGenerated(true); }, 1200);
  };

  return (
    <AppShell>
      <div className="mb-5">
        <h1 className="font-display text-3xl">Quick Practice: Trigonometry</h1>
        <p className="text-muted-foreground mt-1 max-w-2xl">
          Try one question at a time. Save future attempts to your profile for mistake-aware recommendations.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div className="lt-card p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Question 1 of 5</span>
            <div className="flex gap-1.5">
              <span className="chip">Section A</span>
              <span className="chip">1 mark</span>
              <span className="chip">MCQ</span>
              <span className="chip">Medium</span>
            </div>
          </div>
          <p className="font-display text-xl mb-4">Evaluate sin²30° + cos²30°.</p>
          <Textarea placeholder="Your working" className="min-h-[140px]" />
          <div className="flex flex-wrap gap-2 mt-4">
            <Button onClick={() => setAttempted(true)} variant={attempted ? "secondary" : "default"}>
              {attempted ? "Marked as attempted" : "Mark as attempted"}
            </Button>
            <Button variant="outline" onClick={() => setShowSol(true)}>Show solution</Button>
            <Button variant="ghost">Next question</Button>
            <Button variant="ghost" asChild className="ml-auto"><Link to="/app">Exit run</Link></Button>
          </div>

          {showSol && (
            <div className="mt-6">
              {hasBankSolution || generated ? (
                <SolutionCard generated={generated} />
              ) : (
                <div className="lt-card p-5 border-dashed">
                  <div className="flex items-center gap-2 mb-2"><Sparkles className="h-4 w-4 text-primary" /><span className="font-medium">Solution not found in the question bank</span></div>
                  <p className="text-sm text-muted-foreground mb-4">Generate a board-style solution with steps, common mistake and examiner tip.</p>
                  {generating ? (
                    <div className="space-y-2">
                      <div className="h-4 w-3/4 rounded shimmer" />
                      <div className="h-4 w-2/3 rounded shimmer" />
                      <div className="h-4 w-1/2 rounded shimmer" />
                    </div>
                  ) : (
                    <Button onClick={onGenerate}>Generate solution</Button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <aside className="lt-card p-5 h-fit space-y-3">
          <div className="font-display text-lg">This practice run</div>
          <ul className="text-sm space-y-2">
            <li className="flex justify-between"><span>Attempted</span><span className="font-medium">{attempted ? 1 : 0}</span></li>
            <li className="flex justify-between"><span>Solutions viewed</span><span className="font-medium">{showSol ? 1 : 0}</span></li>
          </ul>
          {signedIn ? (
            <div className="rounded-lg lt-soft px-3 py-2 text-sm flex items-center gap-2"><Save className="h-4 w-4" /> Saved to your LazyTopper profile</div>
          ) : (
            <div className="rounded-lg border border-dashed border-border px-3 py-3 text-sm">
              <div className="font-medium mb-1">Not saved yet</div>
              <p className="text-muted-foreground mb-3">Sign in to save practice history and get mistake-aware recommendations.</p>
              <Button asChild size="sm" className="w-full"><Link to="/app/login?reason=start-trial"><LogIn className="h-4 w-4 mr-1" /> Start 7-day trial</Link></Button>
            </div>
          )}
        </aside>
      </div>
    </AppShell>
  );
}