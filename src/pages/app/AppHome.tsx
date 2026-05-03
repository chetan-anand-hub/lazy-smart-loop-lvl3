import { Link } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { useSession } from "@/lib/session";
import { Pencil, FileText, UploadCloud, Sparkles, ArrowRight, BookOpen, TrendingUp, AlertTriangle, User } from "lucide-react";

const cockpitTiles = [
  { to: "/app/practice", title: "Practice", desc: "Quick practice, HPQs, full mock and more.", icon: Pencil },
  { to: "/app/worksheets", title: "Worksheet", desc: "Build a board-style worksheet across Sections A–E.", icon: FileText },
  { to: "/app/topic-hub", title: "Topic Hub", desc: "Trigonometry — concept refresh, predicted, worksheet.", icon: BookOpen },
  { to: "/app/check?source=worksheet&topic=trigonometry", title: "Check & Improve", desc: "Examiner-style feedback on your written answer.", icon: UploadCloud },
];

const quickGen = [
  { tag: "Full mock", title: "Maths · 80 marks", sub: "Sections A–E · 3 hours", to: "/app/practice/run?mode=mock&topic=full" },
  { tag: "Full mock", title: "Science · 80 marks", sub: "Phy + Chem + Bio · 3 hours", to: "/app/practice/run?mode=mock&topic=science" },
  { tag: "Predicted paper", title: "Maths · full subject", sub: "Likely Section A → E breakdown", to: "/app/practice/run?mode=hpq&topic=full" },
  { tag: "Worksheet", title: "Multi-topic worksheet", sub: "Pick topics in scope builder", to: "/app/worksheets" },
];

export default function AppHome() {
  const { signedIn, trialDay } = useSession();
  return (
    <AppShell>
      <div className="flex items-center gap-2 mb-2">
        <span className="chip">Class 10</span>
        <span className="chip">Maths</span>
        <span className="chip-emerald">Scope · Trigonometry</span>
      </div>
      <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
        <div>
          <h1 className="font-display text-[30px] leading-tight">Welcome back to LazyTopper.</h1>
          <p className="text-sm text-muted-foreground mt-1.5 max-w-2xl">
            Pick what to do now. LazyTopper softly suggests — never forces.
          </p>
        </div>
        {!signedIn ? (
          <Link to="/app/login?reason=start-trial" className="inline-flex items-center rounded-full bg-foreground text-background px-4 py-2 text-[13px] font-medium hover:opacity-90">
            Start free trial →
          </Link>
        ) : (
          <span className="chip-emerald">7-day trial · Day {trialDay}</span>
        )}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {cockpitTiles.map((t) => (
          <Link key={t.to} to={t.to} className="lt-card p-4 hover:border-foreground/30 transition-colors group">
            <div className="h-9 w-9 rounded-xl lt-soft grid place-items-center mb-3"><t.icon className="h-4 w-4" /></div>
            <div className="flex items-center justify-between">
              <div className="font-display text-[15px]">{t.title}</div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
            </div>
            <p className="text-[12px] text-muted-foreground mt-1">{t.desc}</p>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-5">
        <div className="lt-card p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="font-display text-lg">Quick generate</div>
            <Link to="/app/practice" className="text-[12px] text-muted-foreground hover:text-foreground">All practice modes →</Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {quickGen.map((q) => (
              <Link key={q.title} to={q.to} className="rounded-xl border border-border bg-secondary/50 hover:bg-secondary p-3.5 transition-colors block">
                <div className="text-[11px] text-muted-foreground">{q.tag}</div>
                <div className="font-medium text-sm mt-0.5">{q.title}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{q.sub}</div>
              </Link>
            ))}
          </div>
        </div>

        <aside className="space-y-3">
          <div className="lt-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-[hsl(var(--accent-emerald))]" />
              <div className="font-display text-base">Today’s loop</div>
            </div>
            {signedIn ? (
              <>
                <div className="rounded-lg lt-soft px-3 py-2 text-sm">
                  <div className="font-medium">Trigonometry · 7/10</div>
                  <div className="text-[12px] opacity-80">Main issue: sign error in identity proof.</div>
                </div>
                <div className="text-[11px] text-muted-foreground mt-2">Prototype sample based on saved checked answers. Optional next:</div>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  <Link to="/app/practice/run?mode=quick&topic=trigonometry" className="chip-emerald">Targeted drill</Link>
                  <Link to="/app/worksheets" className="chip">Mistake-aware worksheet</Link>
                  <Link to="/app/practice" className="chip">Add weak-area to mock</Link>
                </div>
              </>
            ) : (
              <p className="text-[12px] text-muted-foreground">
                Sign in to start your 7-day trial and save checked answers so LazyTopper can show today’s loop here.
              </p>
            )}
          </div>

          <div className="lt-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-[hsl(var(--warn))]" />
              <div className="font-display text-base">Mistake Intelligence</div>
            </div>
            {signedIn ? (
              <ul className="text-sm space-y-1.5">
                <li className="text-[11px] text-muted-foreground">Prototype sample based on saved checked answers.</li>
                <li className="flex justify-between"><span className="text-muted-foreground">Top mistake</span><span className="font-medium">Conceptual setup</span></li>
                <li className="flex justify-between"><span className="text-muted-foreground">Weakest sub-topic</span><span className="font-medium">Identity proofs</span></li>
              </ul>
            ) : (
              <p className="text-[12px] text-muted-foreground">
                Sign in to start your 7-day trial and save checked answers so LazyTopper can show Mistake Intelligence.
              </p>
            )}
          </div>

          <Link to="/app/me" className="lt-card p-4 flex items-center gap-3 hover:border-foreground/30">
            <User className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1">
              <div className="font-display text-base">Me / Progress</div>
              <div className="text-[12px] text-muted-foreground">Real saved evidence — no fake mastery.</div>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </Link>
        </aside>
      </div>

      <div className="text-[11px] text-muted-foreground mt-6 flex items-center gap-1">
        <Sparkles className="h-3 w-3" /> Prototype build — sample data shown for demo.
      </div>
    </AppShell>
  );
}