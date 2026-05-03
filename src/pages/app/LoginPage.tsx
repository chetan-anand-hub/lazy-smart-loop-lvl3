import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AppShell, BackToParent } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/session";
import { GraduationCap, ShieldCheck, Sparkles } from "lucide-react";

const reasons = {
  "start-trial": {
    title: "Start your 7-day free trial",
    desc: "Save your attempts, mistakes, worksheets and progress so LazyTopper can guide what to practise next.",
    secondary: null as string | null,
  },
  "save-worksheet": {
    title: "Save this worksheet to your profile",
    desc: "Download works on this device. Profile save helps Mistake Intelligence and Me / Progress remember it.",
    secondary: "Continue without saving",
  },
  "grade-answer": {
    title: "Save your checked answer and mistake history",
    desc: "This helps LazyTopper show what cost marks and what to practise next.",
    secondary: "Continue without saving",
  },
} as const;

type ReasonKey = keyof typeof reasons;

export default function LoginPage() {
  const [params] = useSearchParams();
  const reason = (params.get("reason") as ReasonKey) || "start-trial";
  const cfg = reasons[reason] ?? reasons["start-trial"];
  const { setSignedIn } = useSession();
  const nav = useNavigate();

  const onSignIn = () => { setSignedIn(true); nav("/app/me"); };

  return (
    <AppShell>
      <BackToParent to="/app" label="Back to Dashboard" />
      <div className="grid lg:grid-cols-2 gap-5 items-stretch">
        <div className="lt-card p-6">
          <div className="flex items-center gap-2 mb-3"><span className="chip text-primary border-primary/20 bg-[hsl(var(--primary-soft))]"><Sparkles className="h-3 w-3" /> 7-day free trial</span></div>
          <h1 className="font-display text-2xl mb-2">{cfg.title}</h1>
          <p className="text-sm text-muted-foreground mb-5">{cfg.desc}</p>
          <ul className="text-sm space-y-2 text-muted-foreground mb-5">
            <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> No card needed for trial.</li>
            <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Examiner-style feedback only — no official CBSE link.</li>
            <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Your work stays in your profile.</li>
          </ul>
          <Button className="w-full" onClick={onSignIn}>
            <GoogleG /> Continue with Google
          </Button>
          {cfg.secondary && (
            <Button variant="ghost" className="w-full mt-2" asChild><Link to="/app">{cfg.secondary}</Link></Button>
          )}
          <p className="text-[11px] text-muted-foreground mt-3">Prototype only. No real account is created.</p>
        </div>

        <div className="lt-card p-6 bg-[hsl(var(--primary-soft))] border-primary/15">
          <div className="h-10 w-10 rounded-md border border-border bg-card grid place-items-center mb-3 text-primary"><GraduationCap className="h-5 w-5" /></div>
          <div className="font-display text-xl text-foreground mb-2">Why save?</div>
          <ul className="space-y-2.5 text-sm text-foreground/80">
            <li>• Mistake Intelligence learns from your checked answers, not guesses.</li>
            <li>• Me / Progress shows real saved evidence — attempts, checks, mistakes.</li>
            <li>• Worksheets can target the exact places you lost marks.</li>
          </ul>
        </div>
      </div>
    </AppShell>
  );
}

function GoogleG() {
  return (
    <svg viewBox="0 0 48 48" className="h-4 w-4 mr-2 bg-white rounded-sm p-0.5">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );
}