import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "@/lib/session";
import { Camera, Type } from "lucide-react";

export default function CheckPage() {
  const { signedIn } = useSession();
  const nav = useNavigate();
  const [method, setMethod] = useState<"type" | "photo">("type");

  return (
    <AppShell>
      <h1 className="font-display text-2xl mb-1">Check this answer</h1>
      <p className="text-sm text-muted-foreground mb-4">Examiner-style feedback. Not an official board score.</p>

      <div className="grid lg:grid-cols-[1fr_300px] gap-5">
        <div className="space-y-4">
          <div className="lt-card p-4">
            <div className="grid sm:grid-cols-4 gap-3 text-sm">
              <div><div className="text-muted-foreground text-xs">Subject</div><div className="font-medium">Maths</div></div>
              <div><div className="text-muted-foreground text-xs">Topic</div><div className="font-medium">Trigonometry</div></div>
              <div><div className="text-muted-foreground text-xs">Source</div><div className="font-medium">Worksheet</div></div>
              <div><div className="text-muted-foreground text-xs">Marks</div><div className="font-medium">3</div></div>
            </div>
            <div className="mt-3 rounded-md border border-border bg-secondary/60 p-3 text-sm">
              <div className="text-xs text-muted-foreground mb-1">Question</div>
              Prove that (1 + tan²θ) = sec²θ.
            </div>
          </div>

          <div className="lt-card p-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Your answer</div>
            <div className="flex gap-2 mb-3">
              <button onClick={() => setMethod("photo")} className={`chip ${method === "photo" ? "border-primary/30 text-primary bg-[hsl(var(--primary-soft))]" : ""}`}><Camera className="h-3 w-3" /> Upload photo</button>
              <button onClick={() => setMethod("type")} className={`chip ${method === "type" ? "border-primary/30 text-primary bg-[hsl(var(--primary-soft))]" : ""}`}><Type className="h-3 w-3" /> Type answer</button>
            </div>
            {method === "type" ? (
              <Textarea placeholder="Write your steps here…" className="min-h-[160px]" />
            ) : (
              <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                Drop a photo of your answer here, or tap to upload.
              </div>
            )}
            <div className="mt-4 flex gap-2">
              <Button onClick={() => nav("/app/check/result")}>Check my answer</Button>
            </div>
          </div>

            {!signedIn && (
            <div className="lt-card p-4 border-dashed">
              <div className="font-medium mb-1">Sign in to save your checked answer and mistake history</div>
              <p className="text-sm text-muted-foreground mb-3">This helps LazyTopper show what cost marks and what to practise next.</p>
              <div className="flex gap-2">
                <Button asChild><Link to="/app/login?reason=grade-answer">Start 7-day trial</Link></Button>
                <Button variant="ghost" onClick={() => nav("/app/check/result")}>Continue without saving</Button>
              </div>
            </div>
          )}
        </div>

        <aside className="lt-card p-4 h-fit text-sm text-muted-foreground space-y-2">
          <div className="font-display text-base text-foreground">How checking works</div>
          <p>LazyTopper compares your steps to a board-style solution and flags conceptual, calculation, presentation and silly mistakes.</p>
          <p>It is examiner-style feedback to help you study. It is not an official CBSE result.</p>
        </aside>
      </div>
    </AppShell>
  );
}