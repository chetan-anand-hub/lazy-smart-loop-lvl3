import { Link } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/session";
import { CheckCircle2, Download, Pencil, Sparkles, FileCheck2 } from "lucide-react";

export default function WorksheetReady() {
  const { signedIn } = useSession();
  return (
    <AppShell>
      <div className="lt-card p-6 mb-5 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl lt-soft grid place-items-center"><CheckCircle2 className="h-6 w-6" /></div>
          <div>
            <h1 className="font-display text-2xl">Worksheet ready</h1>
            <p className="text-sm text-muted-foreground">20 questions • Trigonometry • Sections A–E • All levels</p>
          </div>
        </div>
        <div className="flex gap-2">
          {["A","B","C","D","E"].map(s => <span key={s} className="chip">Section {s}</span>)}
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div className="space-y-4">
          <div className="lt-card p-5">
            <div className="text-sm font-medium mb-3">Actions</div>
            <div className="flex flex-wrap gap-2">
              <Button><Download className="h-4 w-4 mr-1" /> Download PDF</Button>
              <Button asChild variant="outline"><Link to="/app/worksheets/attempt"><Pencil className="h-4 w-4 mr-1" /> Attempt on screen</Link></Button>
              <Button asChild variant="outline"><Link to="/app/check?source=worksheet&topic=trigonometry"><FileCheck2 className="h-4 w-4 mr-1" /> Check an answer</Link></Button>
              <Button variant="ghost"><Sparkles className="h-4 w-4 mr-1" /> Generate board-style solutions</Button>
            </div>
          </div>
          <div className="lt-card p-5 text-sm text-muted-foreground">
            Solutions are included where available. If a solution is missing, LazyTopper can generate a board-style solution in the same format.
          </div>

          <div className="lt-card p-5">
            <div className="text-sm font-medium mb-3">Preview</div>
            <ol className="space-y-2 text-sm list-decimal pl-5">
              <li>Evaluate sin²30° + cos²30°. <span className="chip ml-1">Section A</span></li>
              <li>If tan A = 3/4, find sin A and cos A. <span className="chip ml-1">Section B</span></li>
              <li>Prove (1 + tan²θ) = sec²θ. <span className="chip ml-1">Section C</span></li>
              <li>From a 30 m tower, angle of depression of a car is 30°. Find distance. <span className="chip ml-1">Section D</span></li>
              <li className="text-muted-foreground">+ 16 more…</li>
            </ol>
          </div>
        </div>

        <aside className="lt-card p-5 h-fit">
          <div className="font-display text-lg mb-2">Profile status</div>
          {signedIn ? (
            <div className="rounded-lg lt-soft px-3 py-2 text-sm">Saved to your LazyTopper profile</div>
          ) : (
            <div className="space-y-3">
              <div className="rounded-lg border border-dashed border-border px-3 py-2 text-sm">Saved on this device only</div>
              <Button asChild className="w-full"><Link to="/app/login?reason=save-worksheet">Sign in to save to your profile</Link></Button>
            </div>
          )}
        </aside>
      </div>
    </AppShell>
  );
}