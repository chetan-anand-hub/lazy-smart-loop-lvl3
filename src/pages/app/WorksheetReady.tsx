import { Link } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/session";
import { CheckCircle2, Download, Pencil, Sparkles, FileCheck2 } from "lucide-react";

export default function WorksheetReady() {
  const { signedIn } = useSession();
  return (
    <AppShell>
      <div className="lt-card p-5 mb-4 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-md border border-border bg-secondary grid place-items-center text-[hsl(var(--success))]"><CheckCircle2 className="h-5 w-5" /></div>
          <div>
            <h1 className="font-display text-xl">Worksheet ready</h1>
            <p className="text-xs text-muted-foreground">20 questions • Trigonometry • Sections A–E • All levels</p>
          </div>
        </div>
        <div className="flex gap-2">
          {["A","B","C","D","E"].map(s => <span key={s} className="chip">Section {s}</span>)}
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_300px] gap-5">
        <div className="space-y-4">
          <div className="lt-card p-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Actions</div>
            <div className="flex flex-wrap gap-2">
              <Button><Download className="h-4 w-4 mr-1" /> Download PDF</Button>
              <Button asChild variant="outline"><Link to="/app/worksheets/attempt"><Pencil className="h-4 w-4 mr-1" /> Attempt on screen</Link></Button>
              <Button asChild variant="outline"><Link to="/app/check?source=worksheet&topic=trigonometry"><FileCheck2 className="h-4 w-4 mr-1" /> Check an answer</Link></Button>
              <Button variant="ghost"><Sparkles className="h-4 w-4 mr-1" /> Generate board-style solutions</Button>
            </div>
          </div>
          <div className="lt-card p-4 text-sm text-muted-foreground">
            Solutions are included where available. If a solution is missing, LazyTopper can generate a board-style solution in the same format.
          </div>

          <div className="lt-card p-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Preview</div>
            <ol className="space-y-2 text-sm list-decimal pl-5">
              <li>Evaluate sin²30° + cos²30°. <span className="chip ml-1">Section A</span></li>
              <li>If tan A = 3/4, find sin A and cos A. <span className="chip ml-1">Section B</span></li>
              <li>Prove (1 + tan²θ) = sec²θ. <span className="chip ml-1">Section C</span></li>
              <li>From a 30 m tower, angle of depression of a car is 30°. Find distance. <span className="chip ml-1">Section D</span></li>
              <li className="text-muted-foreground">+ 16 more…</li>
            </ol>
          </div>
        </div>

        <aside className="lt-card p-4 h-fit">
          <div className="font-display text-base mb-2">Profile status</div>
          {signedIn ? (
            <div className="rounded-md lt-success px-3 py-2 text-sm">Saved to your LazyTopper profile</div>
          ) : (
            <div className="space-y-3">
              <div className="rounded-md border border-dashed border-border px-3 py-2 text-sm">Saved on this device only</div>
              <Button asChild className="w-full"><Link to="/app/login?reason=save-worksheet">Sign in to save to your profile</Link></Button>
            </div>
          )}
        </aside>
      </div>
    </AppShell>
  );
}