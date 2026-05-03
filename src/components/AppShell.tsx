import { ReactNode } from "react";
import { NavLink, useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard, Pencil, FileText, BookOpen, UploadCloud, Sparkles, Timer, User, Search, ChevronRight,
} from "lucide-react";
import { useSession } from "@/lib/session";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

type Item = { to: string; label: string; icon: any; match?: string; end?: boolean };

const cockpit: Item[] = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/app/practice", label: "Practice", icon: Pencil, match: "/app/practice" },
  { to: "/app/worksheets", label: "Worksheet", icon: FileText, match: "/app/worksheets" },
  { to: "/app/topic-hub", label: "Topic Hub", icon: BookOpen, match: "/app/topic-hub" },
];
const tools: Item[] = [
  { to: "/app/check?source=worksheet&topic=trigonometry", label: "Check & Improve", icon: UploadCloud, match: "/app/check" },
  { to: "/app/practice?mode=hpq", label: "HPQ / Predictions", icon: Sparkles },
  { to: "/app/practice?mode=timed", label: "Timed Drill", icon: Timer },
];
const you: Item[] = [
  { to: "/app/me", label: "Me / Progress", icon: User, match: "/app/me" },
];

function NavSection({ label, items }: { label: string; items: Item[] }) {
  const { pathname, search } = useLocation();
  return (
    <div className="px-3 mb-3">
      <div className="px-2 pb-1 text-[10px] uppercase tracking-[0.14em] text-[hsl(var(--sidebar-muted))]">{label}</div>
      <div className="space-y-0.5">
        {items.map((n) => {
          const base = n.to.split("?")[0];
          const active = n.end ? pathname === base : pathname.startsWith(n.match || base);
          return (
            <NavLink
              key={n.label + n.to}
              to={n.to}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] transition-colors",
                active
                  ? "bg-[hsl(var(--sidebar-active))] text-[hsl(var(--sidebar-active-foreground))]"
                  : "text-[hsl(var(--sidebar-foreground))]/85 hover:bg-[hsl(var(--sidebar-active))]/60 hover:text-white"
              )}
            >
              <n.icon className="h-4 w-4 opacity-80" />
              <span>{n.label}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const { signedIn, setSignedIn, trialDay } = useSession();

  return (
    <div className="min-h-screen flex w-full bg-background">
      <aside
        className="hidden md:flex w-60 flex-col sticky top-0 h-screen text-[hsl(var(--sidebar-foreground))]"
        style={{ background: "hsl(var(--sidebar-background))", borderRight: "1px solid hsl(var(--sidebar-border))" }}
      >
        <Link to="/app" className="flex items-center gap-2.5 px-4 py-4">
          <div className="h-9 w-9 rounded-xl lt-brand-tile grid place-items-center font-display text-base">L</div>
          <div>
            <div className="font-display text-[15px] leading-tight text-white">LazyTopper</div>
            <div className="text-[10px] uppercase tracking-wider text-[hsl(var(--sidebar-muted))]">Class 10 · CBSE</div>
          </div>
        </Link>

        <div className="flex-1 overflow-y-auto pt-2">
          <NavSection label="Cockpit" items={cockpit} />
          <NavSection label="Tools" items={tools} />
          <NavSection label="You" items={you} />
        </div>

        <div className="px-4 py-3 border-t" style={{ borderColor: "hsl(var(--sidebar-border))" }}>
          <div className="text-[10px] uppercase tracking-wider text-[hsl(var(--sidebar-muted))] mb-1">Current focus</div>
          <div className="text-sm text-white">Maths · Trigonometry</div>
          <div className="text-[11px] text-[hsl(var(--sidebar-muted))] mt-0.5">
            {signedIn ? `Trial · Day ${trialDay} of 7` : "Logged out · Start trial"}
          </div>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-20 bg-background/90 backdrop-blur border-b border-border">
          <div className="flex items-center gap-3 px-5 md:px-7 py-3">
            <div className="hidden md:flex flex-1 items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 text-sm text-muted-foreground max-w-xl">
              <Search className="h-4 w-4" />
              <span className="truncate">Search a topic, chapter, or PYQ — e.g. "Trigonometry identities"</span>
            </div>
            <div className="md:hidden font-display text-base flex-1">LazyTopper</div>
            <div className="flex items-center gap-2">
              <span className="chip">Term 2</span>
              <span className="chip">CBSE</span>
              <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-[11px]">
                <span className="text-muted-foreground">Prototype</span>
                <span className="font-medium">{signedIn ? "Signed in" : "Signed out"}</span>
                <Switch checked={signedIn} onCheckedChange={setSignedIn} />
              </div>
              {!signedIn && (
                <NavLink
                  to="/app/login?reason=start-trial"
                  className="hidden sm:inline-flex items-center rounded-full bg-foreground text-background px-3 py-1.5 text-[12px] font-medium hover:opacity-90"
                >
                  Start free trial
                </NavLink>
              )}
            </div>
          </div>
        </header>
        <main className="px-5 md:px-8 py-6 max-w-[1180px] mx-auto">{children}</main>
      </div>
    </div>
  );
}

/* ---------- Shared shell pieces (Level 2 grammar) ---------- */

export function BackToParent({ to, label }: { to: string; label: string }) {
  return (
    <Link to={to} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-2">
      <ChevronRight className="h-3 w-3 rotate-180" /> {label}
    </Link>
  );
}

export function ContextBar({
  subject = "Maths",
  topic = "Trigonometry",
  scope = "Single topic",
  marks = "Term 2 · 80 marks",
}: {
  subject?: string;
  topic?: string;
  scope?: string;
  marks?: string;
}) {
  return (
    <div className="lt-card px-4 py-2.5 mb-4 flex flex-wrap items-center gap-2 text-[12px]">
      <span className="chip">Class 10</span>
      <span className="chip">{subject}</span>
      <span className="chip-emerald">Topic · {topic}</span>
      <span className="chip">Scope · {scope}</span>
      <span className="chip">{marks}</span>
      <Link to="/app" className="ml-auto text-[11px] text-muted-foreground hover:text-foreground">Change scope →</Link>
    </div>
  );
}

export function ScopeBuilder({
  subject = "Maths",
  topic = "Trigonometry",
  mode = "Single topic",
}: {
  subject?: string;
  topic?: string;
  mode?: string;
}) {
  return (
    <div className="lt-card p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Scope builder</div>
          <div className="font-display text-base mt-0.5">Pick what you want to practise</div>
        </div>
        <span className="chip-emerald">Locked to {topic}</span>
      </div>
      <div className="grid sm:grid-cols-4 gap-2 text-sm">
        <Field label="Stream" value="CBSE" />
        <Field label="Subject" value={subject} options={["Maths", "Science"]} />
        <Field label="Scope" value={mode} options={["Single topic", "Multi-topic", "Full subject"]} />
        <Field label="Topic" value={topic} options={["Trigonometry", "Quadratic Eq.", "Circles", "Statistics"]} />
      </div>
    </div>
  );
}

function Field({ label, value, options }: { label: string; value: string; options?: string[] }) {
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium truncate">{value}</span>
        {options && <span className="text-[10px] text-muted-foreground">▾</span>}
      </div>
    </div>
  );
}