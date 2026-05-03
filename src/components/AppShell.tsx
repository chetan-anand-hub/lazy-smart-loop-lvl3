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
      <aside className="hidden md:flex w-60 flex-col border-r border-border bg-card/60 backdrop-blur-sm sticky top-0 h-screen">
        <div className="px-5 py-5 flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl lt-soft grid place-items-center">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <div className="font-display text-lg leading-tight">LazyTopper</div>
            <div className="text-[11px] text-muted-foreground">CBSE Class 10</div>
          </div>
        </div>
        <nav className="px-3 py-2 space-y-1 flex-1">
          {nav.map((n) => {
            const active = n.end ? pathname === n.to : pathname.startsWith(n.match || n.to.split("?")[0]);
            return (
              <NavLink
                key={n.label}
                to={n.to}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  active ? "bg-primary text-primary-foreground" : "text-foreground/80 hover:bg-secondary"
                )}
              >
                <n.icon className="h-4 w-4" />
                {n.label}
              </NavLink>
            );
          })}
        </nav>
        <div className="p-4 text-[11px] text-muted-foreground">
          Prototype • Sample data
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur">
          <div className="flex items-center justify-between gap-4 px-5 md:px-8 py-3">
            <div className="md:hidden font-display text-lg">LazyTopper</div>
            <div className="hidden md:block text-xs text-muted-foreground">
              Calm board-exam prep
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs">
                <span className="text-muted-foreground">Prototype state</span>
                <span className="font-medium">{signedIn ? "Signed in" : "Signed out"}</span>
                <Switch checked={signedIn} onCheckedChange={setSignedIn} />
              </div>
              {signedIn ? (
                <div className="hidden sm:flex items-center gap-2 rounded-full lt-soft px-3 py-1.5 text-xs font-medium">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  7-day trial • Day {trialDay}
                </div>
              ) : (
                <NavLink
                  to="/app/login?reason=start-trial"
                  className="hidden sm:inline-flex items-center rounded-full bg-primary text-primary-foreground px-3 py-1.5 text-xs font-medium"
                >
                  Sign in to start your 7-day trial
                </NavLink>
              )}
            </div>
          </div>
          <nav className="md:hidden flex gap-1 overflow-x-auto px-3 pb-2 text-xs">
            {nav.map((n) => (
              <NavLink key={n.label} to={n.to} className="px-3 py-1.5 rounded-full bg-secondary whitespace-nowrap">
                {n.label}
              </NavLink>
            ))}
          </nav>
        </header>
        <main className="px-5 md:px-8 py-6 max-w-[1200px] mx-auto">{children}</main>
      </div>
    </div>
  );
}