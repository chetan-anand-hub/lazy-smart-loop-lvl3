import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppShell, ContextBar, ScopeBuilder } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { useSession } from "@/lib/session";
import { Lock, UploadCloud, Save, AlertTriangle, Lightbulb } from "lucide-react";

const formats = ["MCQ", "Short", "Long", "Case study", "Assertion-Reason"];

export default function WorksheetHub() {
  const { signedIn } = useSession();
  const nav = useNavigate();
  const [count, setCount] = useState([20]);
  const [mistakeFocus, setMistakeFocus] = useState(false);

  return (
    <AppShell>
      <div className="grid lg:grid-cols-[1fr_300px] gap-6">
        <div>
          <div className="text-xs text-muted-foreground mb-1">Worksheet</div>
          <h1 className="font-display text-[28px] leading-tight">A worksheet that fits today’s study.</h1>
          <p className="text-sm text-muted-foreground mt-1.5 max-w-2xl">
            Choose your scope, then generate a board-style mix. Mistake-focus mini-section pulls from your checked answers.
          </p>

          <div className="mt-4">
            <ContextBar />
            <ScopeBuilder />
          </div>

          <div className="lt-card p-4 mb-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Worksheet preview</div>
            <div className="grid grid-cols-5 gap-2 text-center text-[11px] mb-4">
              {[
                ["A", 6, "1m · MCQ"],
                ["B", 5, "2m · Short"],
                ["C", 5, "3m · Short long"],
                ["D", 3, "5m · Long"],
                ["E", 1, "4m · Case study"],
              ].map(([s, q, t]) => (
                <div key={s as string} className="rounded-lg border border-border bg-secondary/60 p-2">
                  <div className="font-display text-base">Sec {s}</div>
                  <div className="text-muted-foreground">{q} Qs</div>
                  <div className="text-[10px] text-muted-foreground/80">{t}</div>
                </div>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium mb-2">Question formats</div>
                <div className="flex flex-wrap gap-1.5">
                  {formats.map((f) => <span key={f} className="chip">{f}</span>)}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-2"><span className="font-medium">Question count</span><span className="text-muted-foreground">{count[0]}</span></div>
                <Slider value={count} onValueChange={setCount} min={10} max={40} step={1} />
              </div>
            </div>

            <div className={`rounded-xl border mt-4 p-3.5 ${signedIn ? "border-border" : "border-dashed border-border"}`}>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-medium flex items-center gap-2">
                    Mistake-focus mini-section {!signedIn && <Lock className="h-3.5 w-3.5 text-muted-foreground" />}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {signedIn
                      ? "Adds 3 questions where you lost marks recently."
                      : "Sign in to use mistake-aware worksheets."}
                  </p>
                </div>
                <Switch disabled={!signedIn} checked={mistakeFocus} onCheckedChange={setMistakeFocus} />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              <Button onClick={() => nav("/app/worksheets/ready")}>Generate worksheet</Button>
              <Button asChild variant="outline">
                <Link to={signedIn ? "/app/worksheets/ready" : "/app/login?reason=save-worksheet"}>
                  <Save className="h-4 w-4 mr-1" /> Save worksheet
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/app/check?source=worksheet&topic=trigonometry">
                  <UploadCloud className="h-4 w-4 mr-1" /> Upload your answers
                </Link>
              </Button>
            </div>
          </div>

          <div className="lt-card p-4 flex gap-3 items-start">
            <Lightbulb className="h-4 w-4 text-[hsl(var(--accent-emerald))] mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <span className="text-foreground font-medium">About mistake-focus:</span> we add a small set of questions targeted at the exact mistakes from your checked answers. Available on the 7-day trial and beyond.
            </div>
          </div>
        </div>

        <aside className="space-y-3 lg:sticky lg:top-20 h-fit">
          <div className="lt-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-[hsl(var(--warn))]" />
              <div className="font-display text-base">Mistake Intelligence</div>
            </div>
            {signedIn ? (
              <>
                <p className="text-[11px] text-muted-foreground mb-2">Prototype sample based on saved checked answers.</p>
                <ul className="text-sm space-y-1.5">
                  <li className="flex justify-between"><span className="text-muted-foreground">Top mistake</span><span className="font-medium">Conceptual setup</span></li>
                  <li className="flex justify-between"><span className="text-muted-foreground">Weakest sub-topic</span><span className="font-medium">Identity proofs</span></li>
                  <li className="flex justify-between"><span className="text-muted-foreground">Suggested adds</span><span className="font-medium">3 questions</span></li>
                </ul>
              </>
            ) : (
              <p className="text-[12px] text-muted-foreground">
                Sign in to start your 7-day trial and save checked answers so LazyTopper can show Mistake Intelligence.
              </p>
            )}
          </div>
          <div className="lt-card p-4">
            <div className="font-display text-base mb-1">What gets saved?</div>
            {signedIn ? (
              <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                <li>Worksheet</li><li>Attempts</li><li>Checked answers</li><li>Mistakes</li><li>Progress</li>
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">You can generate and download. Profile progress and Mistake Intelligence will not update until you sign in.</p>
            )}
          </div>
        </aside>
      </div>
    </AppShell>
  );
}