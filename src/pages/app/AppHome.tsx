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
      <section className="lt-card p-7 mb-6 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full lt-soft opacity-60" />
        <div className="relative">
          <span className="chip lt-soft border-transparent"><Sparkles className="h-3 w-3" /> Calm cockpit</span>
          <h1 className="font-display text-3xl md:text-4xl mt-3 mb-2">Welcome back to LazyTopper.</h1>
          <p className="text-muted-foreground max-w-xl">
            Practise a question, build a worksheet, or check an answer. {signedIn ? "Your trial is active — attempts and mistakes save to your profile." : "Start your 7-day trial to save attempts, worksheets and mistakes."}
          </p>
        </div>
      </section>

      <div className="grid sm:grid-cols-2 gap-4">
        {tiles.map((t) => (
          <Link key={t.to} to={t.to} className="lt-card p-5 hover:border-primary/40 transition-colors group">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-xl lt-soft grid place-items-center"><t.icon className="h-5 w-5" /></div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="font-display text-lg">{t.title}</div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                </div>
                <p className="text-sm text-muted-foreground mt-1">{t.desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="lt-card p-5 mt-6">
        <div className="text-sm font-medium mb-3">All prototype routes</div>
        <div className="grid sm:grid-cols-2 gap-2 text-sm">
          {allRoutes.map(([to, label]) => (
            <Link key={to} to={to} className="text-primary hover:underline">{label}</Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}