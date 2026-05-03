import { ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Home, Pencil, FileText, CheckCircle2, User, GraduationCap } from "lucide-react";
import { useSession } from "@/lib/session";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/app", label: "Home", icon: Home, end: true },
  { to: "/app/practice/run?mode=quick&topic=trigonometry", label: "Practice", icon: Pencil, match: "/app/practice" },
  { to: "/app/worksheets/build?subject=Maths&topic=trigonometry", label: "Worksheets", icon: FileText, match: "/app/worksheets" },
  { to: "/app/check?source=worksheet&topic=trigonometry", label: "Check & Improve", icon: CheckCircle2, match: "/app/check" },
  { to: "/app/me", label: "Me / Progress", icon: User, match: "/app/me" },
];

export function AppShell({ children }: { children: ReactNode }) {
  const { signedIn, setSignedIn, trialDay } = useSession();
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen flex w-full">
      <aside className="hidden md:flex w-56 flex-col border-r border-border bg-card/40 backdrop-blur-sm sticky top-0 h-screen">
        <div className="px-5 py-5 flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg border border-border bg-card grid place-items-center text-primary">
            <GraduationCap className="h-4 w-4" />
          </div>
          <div>
            <div className="font-display text-base leading-tight">LazyTopper</div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">CBSE Class 10</div>
          </div>
        </div>
        <nav className="px-3 py-1 space-y-0.5 flex-1">
          {nav.map((n) => {
            const active = n.end ? pathname === n.to : pathname.startsWith(n.match || n.to.split("?")[0]);
            return (
              <NavLink
                key={n.label}
                to={n.to}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors relative",
                  active
                    ? "bg-[hsl(var(--primary-soft))] text-primary font-medium"
                    : "text-foreground/75 hover:bg-secondary/70"
                )}
              >
                {active && <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-r bg-primary" />}
                <n.icon className="h-4 w-4 opacity-80" />
                {n.label}
              </NavLink>
            );
          })}
        </nav>
        <div className="p-4 text-[10px] uppercase tracking-wider text-muted-foreground border-t border-border">
          Prototype · Sample data
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur">
          <div className="flex items-center justify-between gap-4 px-5 md:px-7 py-2.5">
            <div className="md:hidden font-display text-base">LazyTopper</div>
            <div className="hidden md:block text-xs text-muted-foreground">
              Calm board-exam prep
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-md border border-border bg-card px-2.5 py-1 text-[11px]">
                <span className="text-muted-foreground">Prototype</span>
                <span className="font-medium">{signedIn ? "Signed in" : "Signed out"}</span>
                <Switch checked={signedIn} onCheckedChange={setSignedIn} />
              </div>
              {signedIn ? (
                <div className="hidden sm:flex items-center gap-2 rounded-md border border-border bg-card px-2.5 py-1 text-[11px] font-medium text-foreground/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--success))]" />
                  7-day trial • Day {trialDay}
                </div>
              ) : (
                <NavLink
                  to="/app/login?reason=start-trial"
                  className="hidden sm:inline-flex items-center rounded-md border border-primary/30 bg-[hsl(var(--primary-soft))] text-primary px-2.5 py-1 text-[11px] font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  Start 7-day trial
                </NavLink>
              )}
            </div>
          </div>
          <nav className="md:hidden flex gap-1 overflow-x-auto px-3 pb-2 text-[11px]">
            {nav.map((n) => (
              <NavLink key={n.label} to={n.to} className="px-2.5 py-1 rounded-md border border-border bg-card whitespace-nowrap">
                {n.label}
              </NavLink>
            ))}
          </nav>
        </header>
        <main className="px-5 md:px-7 py-5 max-w-[1180px] mx-auto">{children}</main>
      </div>
    </div>
  );
}