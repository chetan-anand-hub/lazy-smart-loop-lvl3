import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, FileText, UploadCloud, TrendingUp, BookOpen, Pencil } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-background/90 backdrop-blur sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl lt-brand-tile grid place-items-center font-display text-base">L</div>
            <div className="font-display text-[17px]">LazyTopper</div>
          </Link>
          <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            <a href="#why" className="hover:text-foreground">Why</a>
            <a href="#how" className="hover:text-foreground">How it works</a>
            <a href="#cockpit" className="hover:text-foreground">The cockpit</a>
            <a href="#trial" className="hover:text-foreground">Trial</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/app/login?reason=start-trial" className="text-sm text-muted-foreground hover:text-foreground px-3 py-2">Log in</Link>
            <Link to="/app/login?reason=start-trial" className="inline-flex items-center gap-1.5 rounded-full bg-foreground text-background px-4 py-2 text-[13px] font-medium hover:opacity-90">
              Start free trial <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 grid lg:grid-cols-[1.15fr_1fr] gap-10 items-start">
        <div>
          <span className="chip-emerald"><Sparkles className="h-3 w-3" /> CBSE Class 10 · Maths &amp; Science</span>
          <h1 className="font-display text-[44px] leading-[1.05] mt-5">
            Know what matters.<br/>Practise what helps.{" "}
            <span className="text-[hsl(var(--accent-emerald))]">Fix what costs marks.</span>
          </h1>
          <p className="text-muted-foreground text-[15px] mt-5 max-w-xl">
            LazyTopper is your action companion for the boards. Pick a topic, generate a worksheet,
            attempt a full 80-mark mock, or check your own answers. Every mistake quietly powers your next practice — no rigid timetable, ever.
          </p>
          <div className="flex flex-wrap gap-2 mt-7">
            <Link to="/app/login?reason=start-trial" className="inline-flex items-center gap-1.5 rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:opacity-90">
              Start 7-day free trial <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/app" className="inline-flex items-center rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium hover:border-foreground/40">
              Explore the cockpit
            </Link>
          </div>
          <p className="text-[12px] text-muted-foreground mt-3">Free trial unlocks personalised practice. No card. No timetable. Cancel anytime.</p>
        </div>

        <div className="lt-card p-5">
          <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">What the cockpit looks like</div>
          <div className="rounded-lg lt-soft px-3 py-2.5 mt-3 text-sm">
            <div className="font-medium">Today’s focus · Trigonometry</div>
            <div className="text-[12px] opacity-80">Pick what to do — practice, worksheet, predicted, or mock.</div>
          </div>
          <div className="text-[11px] text-muted-foreground mt-3">Optional next, never forced:</div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            <span className="chip-emerald">Quick practice</span>
            <span className="chip">Mistake-aware worksheet</span>
            <span className="chip">Full 80-mark mock</span>
          </div>
          <div className="mt-4 border-t border-border pt-3 text-[11px] text-muted-foreground">
            Sample preview. Your real cockpit fills in once you start the trial.
          </div>
        </div>
      </section>

      <section id="why" className="border-t border-border bg-card/60">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Why LazyTopper</div>
          <h2 className="font-display text-[30px] mt-2 max-w-2xl">A connected exam cockpit, not a shop of tools.</h2>
          <p className="text-muted-foreground text-[15px] mt-3 max-w-2xl">
            Most apps give locked timetables or unrelated tools. LazyTopper gives you one calm cockpit where every action — practice, worksheet, mock, predicted questions, answer check — feeds into one mistake-aware loop.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-8">
            {[
              { i: Pencil, t: "Practise smarter", d: "Quick drills, full mocks, predicted papers — all from one scope." },
              { i: Sparkles, t: "Predicted questions", d: "High-probability questions for your topics, based on past board patterns." },
              { i: FileText, t: "Board-style worksheets", d: "Sectioned A–E worksheets, ready for screen or print." },
              { i: UploadCloud, t: "Check & Improve", d: "Examiner-style feedback on your written answers — step-wise." },
              { i: TrendingUp, t: "Mistake Intelligence", d: "Built only from real saved checked answers. No guesses." },
              { i: BookOpen, t: "Me / Progress", d: "Real evidence — attempts, checks, mistakes — never fake mastery." },
            ].map((f) => (
              <div key={f.t} className="lt-card p-4">
                <div className="h-9 w-9 rounded-xl lt-soft grid place-items-center mb-3"><f.i className="h-4 w-4" /></div>
                <div className="font-display text-[15px]">{f.t}</div>
                <p className="text-[12px] text-muted-foreground mt-1">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">How it works</div>
          <h2 className="font-display text-[28px] mt-2">One calm loop. Repeat until the boards.</h2>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
            {[
              ["1", "Pick scope", "Subject, topic, or full subject — your choice."],
              ["2", "Practise or build", "Quick practice, worksheet, predicted, or mock."],
              ["3", "Check your answer", "Examiner-style step-wise feedback."],
              ["4", "Mistake → next practice", "LazyTopper softly suggests what to do next."],
            ].map(([n, t, d]) => (
              <li key={n} className="lt-card p-4">
                <div className="font-display text-[hsl(var(--accent-emerald))] text-lg">{n}</div>
                <div className="font-medium text-sm mt-1">{t}</div>
                <p className="text-[12px] text-muted-foreground mt-1">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="trial" className="border-t border-border bg-card/60">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">7-day free trial</div>
          <h2 className="font-display text-[30px] mt-2">Try the full cockpit. Save your work for 7 days.</h2>
          <p className="text-muted-foreground text-[15px] mt-3">
            No card. No timetable. Your attempts, mistakes and checked answers are saved to your profile so the loop actually learns.
          </p>
          <div className="flex flex-wrap gap-2 mt-6 justify-center">
            <Link to="/app/login?reason=start-trial" className="inline-flex items-center gap-1.5 rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:opacity-90">
              Start 7-day free trial <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/app" className="inline-flex items-center rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium hover:border-foreground/40">
              Explore the cockpit first
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between text-[12px] text-muted-foreground">
          <div>© LazyTopper · Prototype</div>
          <div>CBSE Class 10 · Maths &amp; Science</div>
        </div>
      </footer>
    </div>
  );
}