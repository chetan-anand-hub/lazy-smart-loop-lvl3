import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { useSession } from "@/lib/session";
import { Lock } from "lucide-react";

const presets = [
  { id: "board", title: "Board exam mix", desc: "Sections A–E in board ratio." },
  { id: "drill", title: "Quick drill", desc: "10 short questions, mostly Section A & B." },
  { id: "high", title: "High-marks focus", desc: "Section D & E, full-step answers." },
];

export default function WorksheetBuild() {
  const { signedIn } = useSession();
  const nav = useNavigate();
  const [preset, setPreset] = useState("board");
  const [count, setCount] = useState([20]);
  const [mistakeFocus, setMistakeFocus] = useState(false);

  return (
    <AppShell>
      <div className="mb-5">
        <h1 className="font-display text-3xl">Build a worksheet</h1>
        <p className="text-muted-foreground mt-1">Maths → Trigonometry</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div className="space-y-6">
          <div className="lt-card p-5">
            <div className="text-sm font-medium mb-3">Presets</div>
            <div className="grid sm:grid-cols-3 gap-3">
              {presets.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPreset(p.id)}
                  className={`rounded-xl border px-4 py-3 text-left transition-colors ${preset === p.id ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/40"}`}
                >
                  <div className="font-medium text-sm">{p.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">{p.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="lt-card p-5 space-y-5">
            <div>
              <div className="text-sm font-medium mb-2">Sections</div>
              <div className="flex flex-wrap gap-2">
                {["A", "B", "C", "D", "E"].map((s) => (
                  <span key={s} className="chip">Section {s}</span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium mb-2">Difficulty</div>
              <div className="flex gap-2">
                {["Easy", "Medium", "Hard", "Mixed"].map((d) => (
                  <button key={d} className={`chip ${d === "Mixed" ? "lt-soft border-transparent" : ""}`}>{d}</button>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-2"><span className="font-medium">Question count</span><span className="text-muted-foreground">{count[0]}</span></div>
              <Slider value={count} onValueChange={setCount} min={5} max={40} step={1} />
            </div>

            <div className={`rounded-xl border p-4 ${signedIn ? "border-border" : "border-dashed border-border opacity-90"}`}>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-medium flex items-center gap-2">
                    Add mistake-focus mini-section {!signedIn && <Lock className="h-3.5 w-3.5 text-muted-foreground" />}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {signedIn
                      ? "Uses your checked answers to add a few questions where marks were lost."
                      : "Sign in to use mistake-aware worksheets."}
                  </p>
                </div>
                <Switch disabled={!signedIn} checked={mistakeFocus} onCheckedChange={setMistakeFocus} />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button size="lg" onClick={() => nav("/app/worksheets/ready")}>Generate worksheet</Button>
            {!signedIn && (
              <Button asChild size="lg" variant="outline"><Link to="/app/login?reason=start-trial">Start 7-day trial to save worksheets</Link></Button>
            )}
          </div>
        </div>

        <aside className="lt-card p-5 h-fit">
          <div className="font-display text-lg mb-2">What gets saved?</div>
          {signedIn ? (
            <ul className="text-sm text-muted-foreground space-y-1.5 list-disc pl-4">
              <li>Worksheet</li><li>Attempt</li><li>Checked answers</li><li>Mistakes</li><li>Progress</li>
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">You can generate and download, but profile progress and Mistake Intelligence will not update.</p>
          )}
          <div className="mt-4 rounded-lg lt-soft px-3 py-2 text-xs">
            Honest data: nothing is shared with CBSE or schools.
          </div>
        </aside>
      </div>
    </AppShell>
  );
}