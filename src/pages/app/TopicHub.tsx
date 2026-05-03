import { Link } from "react-router-dom";
import { AppShell, ContextBar } from "@/components/AppShell";
import { BookOpen, Pencil, FileText, Sparkles } from "lucide-react";

export default function TopicHub() {
  return (
    <AppShell>
      <div className="text-xs text-muted-foreground mb-1">Topic Hub</div>
      <h1 className="font-display text-[28px] leading-tight">Trigonometry</h1>
      <p className="text-sm text-muted-foreground mt-1.5 max-w-2xl">Everything for this topic — concept refresh, predicted questions, worksheet, and check.</p>
      <div className="mt-4"><ContextBar /></div>

      <div className="grid sm:grid-cols-2 gap-3">
        {[
          { to: "/app/practice/run?mode=quick&topic=trigonometry", icon: Pencil, t: "Quick Practice", d: "5 short Qs to warm up." },
          { to: "/app/worksheets?from=topic", icon: FileText, t: "Build worksheet", d: "Sectioned, board-style." },
          { to: "/app/practice/run?mode=hpq&topic=trigonometry", icon: Sparkles, t: "Predicted / HPQs", d: "Most likely questions." },
          { to: "/app/check?source=topic&topic=trigonometry", icon: BookOpen, t: "Check an answer", d: "Examiner-style feedback." },
        ].map((x) => (
          <Link key={x.t} to={x.to} className="lt-card p-4 hover:border-foreground/30">
            <div className="flex items-start gap-3">
              <div className="h-9 w-9 rounded-xl border border-border bg-secondary grid place-items-center text-[hsl(var(--accent-emerald))]"><x.icon className="h-4 w-4" /></div>
              <div>
                <div className="font-display text-[15px]">{x.t}</div>
                <p className="text-[12px] text-muted-foreground mt-0.5">{x.d}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </AppShell>
  );
}