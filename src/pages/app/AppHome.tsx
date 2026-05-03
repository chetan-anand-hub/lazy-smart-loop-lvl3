import { Link } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { useSession } from "@/lib/session";
import { ArrowRight, Pencil, FileText, CheckCircle2, User, Sparkles } from "lucide-react";

const tiles = [
  { to: "/app/practice/run?mode=quick&topic=trigonometry", title: "Quick Practice", desc: "Try one question at a time. Trigonometry warm-up.", icon: Pencil },
  { to: "/app/worksheets/build?subject=Maths&topic=trigonometry", title: "Build a worksheet", desc: "Board-style mix, custom sections, mistake-aware add-ons.", icon: FileText },
  { to: "/app/check?source=worksheet&topic=trigonometry", title: "Check & Improve", desc: "Examiner-style check on a written answer.", icon: CheckCircle2 },
  { to: "/app/me", title: "Me / Progress", desc: "Saved attempts, mistakes and what to practise next.", icon: User },
];

const allRoutes = [
  ["/app/practice/run?mode=quick&topic=trigonometry", "Quick Practice run"],
  ["/app/worksheets/build?subject=Maths&topic=trigonometry", "Worksheet builder"],
  ["/app/worksheets/ready", "Worksheet ready"],
  ["/app/worksheets/attempt", "Worksheet attempt"],
  ["/app/check?source=worksheet&topic=trigonometry", "Check & Improve"],
  ["/app/check/result", "Check result"],
  ["/app/me", "Me / Progress"],
  ["/app/login?reason=start-trial", "Login • Start trial"],
  ["/app/login?reason=save-worksheet", "Login • Save worksheet"],
  ["/app/login?reason=grade-answer", "Login • Grade answer"],
];

export default function AppHome() {
  const { signedIn } = useSession();
  return (
    <AppShell>
      <section className="lt-card p-6 mb-5 relative overflow-hidden">
        <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[hsl(var(--primary-soft))] opacity-50" />
        <div className="relative">
          <span className="chip"><Sparkles className="h-3 w-3 text-primary" /> Cockpit</span>
          <h1 className="font-display text-2xl md:text-3xl mt-2 mb-1.5">Welcome back to LazyTopper.</h1>
          <p className="text-sm text-muted-foreground max-w-xl">
            Practise a question, build a worksheet, or check an answer. {signedIn ? "Your trial is active — attempts and mistakes save to your profile." : "Start your 7-day trial to save attempts, worksheets and mistakes."}
          </p>
        </div>
      </section>

      <div className="grid sm:grid-cols-2 gap-3">
        {tiles.map((t) => (
          <Link key={t.to} to={t.to} className="lt-card p-4 hover:border-primary/40 transition-colors group">
            <div className="flex items-start gap-3">
              <div className="h-9 w-9 rounded-md border border-border bg-secondary grid place-items-center text-primary"><t.icon className="h-4 w-4" /></div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="font-display text-base">{t.title}</div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{t.desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="lt-card p-4 mt-5">
        <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">All prototype routes</div>
        <div className="grid sm:grid-cols-2 gap-1.5 text-sm">
          {allRoutes.map(([to, label]) => (
            <Link key={to} to={to} className="text-primary hover:underline">{label}</Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}