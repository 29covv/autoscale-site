import { useState, useMemo } from "react";
import {
  ArrowRight,
  Bot,
  Brain,
  CheckCircle2,
  Cog,
  LayoutGrid,
  Link as LinkIcon,
  Menu,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from "lucide-react";

const brand = {
  name: "AutoScale Systems",
  tagline: "Stop Hiring. Start Automating.",
};

const navLinks = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

const problems = [
  {
    title: "Too Much Manual Admin",
    stat: "40% time wasted",
    icon: Users,
    body: "Your team spends hours on repetitive tasks that can be automated.",
    left: "Manual data entry",
    right: "Automated workflows",
  },
  {
    title: "Disconnected Systems",
    stat: "3+ hours daily",
    icon: LinkIcon,
    body: "Your CRM doesn’t talk to your accounting tools. Nothing syncs properly.",
    left: "Copy-paste chaos",
    right: "Unified systems",
  },
  {
    title: "Slow Operations",
    stat: "72hr response time",
    icon: LayoutGrid,
    body: "Simple tasks take days. Customers wait. Growth is bottlenecked.",
    left: "Process delays",
    right: "Instant automation",
  },
  {
    title: "Hiring Instead of Automating",
    stat: "$50k+ per role",
    icon: Sparkles,
    body: "Adding headcount to handle growth instead of building scalable systems.",
    left: "Linear scaling",
    right: "Exponential systems",
  },
];

const services = [
  {
    title: "Workflow Automation",
    icon: LinkIcon,
    body: "Eliminate repetitive tasks and connect your tools into seamless workflows.",
    bullets: ["Automate data entry & transfers", "Connect apps without code", "Reduce errors dramatically"],
    
  },
  {
    title: "CRM & Lead Systems",
    icon: Users,
    body: "Capture, nurture, and convert leads automatically with intelligent follow-ups.",
    bullets: ["Automated lead capture", "Smart follow-up sequences", "Pipeline optimization"],
    
  },
  {
    title: "AI Integration",
    icon: Brain,
    body: "Deploy AI to handle support, document processing, routing, and more.",
    bullets: ["24/7 AI chat systems", "Document automation", "Intelligent routing"],
    
  },
  {
    title: "System Design",
    icon: Cog,
    body: "Get a complete operational blueprint designed for scale and efficiency.",
    bullets: ["Process mapping", "Automation architecture", "Continuous optimization"],
    
  },
];

const steps = [
  {
    n: "01",
    title: "Audit & Strategy",
    icon: ShieldCheck,
    body: "We analyze your workflows, identify automation opportunities, and create a clear roadmap.",
  },
  {
    n: "02",
    title: "Build & Integrate",
    icon: Bot,
    body: "We implement automation, connect your tools, and ensure everything runs reliably.",
  },
  {
    n: "03",
    title: "Optimize & Scale",
    icon: Sparkles,
    body: "We measure ROI, iterate on performance, and help you scale without adding complexity.",
  },
];

function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "outline" | "dark" }) {
  const base =
    "inline-flex items-center justify-center whitespace-nowrap rounded-2xl px-5 py-3 text-sm sm:text-base font-semibold transition shadow-sm";
  const styles =
    variant === "primary"
      ? "bg-cyan-500 text-white hover:bg-cyan-600"
      : variant === "dark"
      ? "bg-slate-900 text-white hover:bg-slate-800"
      : "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50";
  return (
    <button className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </button>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center rounded-full bg-cyan-600 px-3 py-1 text-xs font-semibold text-white">{children}</span>;
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-[28px] border border-slate-200 bg-white shadow-sm ${className}`}>{children}</div>;
}

function GlowBg() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(15, 23, 42, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(15, 23, 42, 0.08) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-cyan-400/15 blur-3xl" />
      <div className="absolute top-[420px] -left-20 h-[420px] w-[420px] rounded-full bg-sky-400/10 blur-3xl" />
      <div className="absolute top-[760px] right-0 h-[520px] w-[520px] rounded-full bg-cyan-400/10 blur-3xl" />
    </div>
  );
}

function LogoMark() {
  return (
    <div className="relative grid h-10 w-10 place-items-center rounded-2xl bg-cyan-500/10 ring-1 ring-cyan-500/20">
      <Sparkles className="h-5 w-5 text-cyan-600" />
    </div>
  );
}

function SectionHeading({ kicker, title, subtitle }: { kicker?: string; title: string; subtitle?: string }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      {kicker ? (
        <div className="mb-3 flex items-center justify-center gap-2">
          <Badge>{kicker}</Badge>
        </div>
      ) : null}
      <h2 className="text-balance text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
      {subtitle ? <p className="mt-3 text-pretty text-base text-slate-600 sm:text-lg">{subtitle}</p> : null}
    </div>
  );
}

function StatPill({ children }: { children: React.ReactNode }) {
  return <div className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white shadow-sm">{children}</div>;
}

declare global {
  interface Window {
    Tally?: {
      loadEmbeds?: () => void;
    };
  }
}



export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <div id="top" className="relative min-h-screen bg-white text-slate-900">
      <GlowBg />

      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <LogoMark />
            <div className="leading-tight">
              <div className="text-sm font-black tracking-tight sm:text-base">{brand.name}</div>
              <div className="text-xs text-slate-500">AI-Powered Automation</div>
            </div>
          </div>

          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-sm font-medium text-slate-600 hover:text-slate-900">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
-<a href="#contact">
    <Button>Book Free Audit</Button>
  </a>
</div>

          <button className="md:hidden" onClick={() => setMobileOpen((v) => !v)} aria-label="Toggle menu">
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileOpen ? (
          <div className="border-t border-slate-200/60 bg-white md:hidden">
            <div className="mx-auto max-w-6xl px-4 py-4">
              <div className="flex flex-col gap-3">
                {navLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    {l.label}
                  </a>
                ))}
                <div className="pt-2">
                  <a href="#contact" onClick={() => setMobileOpen(false)} className="block">
  <Button className="w-full">Book Free Audit</Button>
</a>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pb-24 sm:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm">
              <Sparkles className="h-4 w-4 text-cyan-600" />
              <span className="font-semibold">AI-Powered Automation</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500">Operational systems that scale</span>
            </div>

            <h1 className="mt-6 text-balance text-5xl font-black tracking-tight sm:text-6xl">
              We Build Automation Systems That Scale Your Business.
            </h1>

            <p className="mt-5 max-w-xl text-pretty text-lg text-slate-600">
              AI integration, workflow automation, and operational systems designed to eliminate manual work and accelerate growth.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button className="px-6 py-6">
                Book a Free Automation Audit <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="px-6 py-6">
                See Our Services
              </Button>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-3">
              {["Faster ops", "Fewer errors", "More capacity"].map((t) => (
                <div key={t} className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/70 p-3 shadow-sm">
                  <CheckCircle2 className="h-5 w-5 text-cyan-600" />
                  <span className="text-sm font-semibold text-slate-800">{t}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -inset-2 rounded-[32px] bg-gradient-to-b from-cyan-500/10 to-transparent" />
              <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm font-semibold text-slate-600">This week</div>
                    <div className="mt-1 text-2xl font-black tracking-tight">Automation Wins</div>
                  </div>
                  <div className="rounded-2xl bg-cyan-500/10 p-3 ring-1 ring-cyan-500/20">
                    <Bot className="h-6 w-6 text-cyan-600" />
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {[
                    { k: "Leads followed up", v: "+38%" },
                    { k: "Admin time saved", v: "~12 hrs" },
                    { k: "Ops response speed", v: "2.6×" },
                  ].map((row) => (
                    <div key={row.k} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                      <div className="text-sm font-medium text-slate-700">{row.k}</div>
                      <div className="text-sm font-black text-slate-900">{row.v}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-slate-700">System Health</div>
                    <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white">Stable</span>
                  </div>
                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full w-[82%] rounded-full bg-cyan-500" />
                  </div>
                  <div className="mt-2 text-xs text-slate-500">Automations running smoothly • last sync 3m ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEMS */}
      <section id="about" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading kicker="Why it feels hard" title="The Problems Holding You Back" subtitle="Most businesses are stuck in operational chaos. We fix that." />
        <div className="grid gap-6 md:grid-cols-2">
          {problems.map((p) => {
            const Icon = p.icon;
            return (
              <Card key={p.title}>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-50 ring-1 ring-slate-200">
                      <Icon className="h-6 w-6 text-slate-900" />
                    </div>
                    <StatPill>{p.stat}</StatPill>
                  </div>

                  <h3 className="mt-6 text-2xl font-black tracking-tight">{p.title}</h3>
                  <p className="mt-2 text-slate-600">{p.body}</p>

                  <div className="mt-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-rose-600">{p.left}</span>
                      <span className="font-medium text-cyan-600">→ {p.right}</span>
                    </div>
                    <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full w-[70%] rounded-full bg-rose-400/80" />
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading kicker="What we do" title="Transform Your Operations" subtitle="Four core services designed to eliminate manual work and accelerate growth." />

        <div className="grid gap-6 md:grid-cols-2">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <Card key={s.title} className="group">
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-500/10 ring-1 ring-cyan-500/20">
                      <Icon className="h-6 w-6 text-cyan-700" />
                    </div>
                  </div>

                  <h3 className="mt-6 text-2xl font-black tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-slate-600">{s.body}</p>

                  <ul className="mt-6 space-y-3">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-slate-700">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 text-cyan-600" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 rounded-[32px] border border-slate-200 bg-white/70 p-8 shadow-sm">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h3 className="text-2xl font-black tracking-tight">Ready to scale without the chaos?</h3>
              <p className="mt-2 text-slate-600">Get a free automation audit and a clear plan to remove bottlenecks.</p>
            </div>
            <a href="#contact">
<a href="#contact" className="no-underline">
  <Button className="px-6 py-6">Book Your Free Automation Audit</Button>
</a>
</a>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading kicker="How it works" title="How We Transform Your Business" subtitle="A proven 3-step process to eliminate manual work and accelerate growth." />

        <div className="grid gap-6">
          {steps.map((st) => {
            const Icon = st.icon;
            return (
              <Card key={st.n}>
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-5">
                      <div className="grid h-14 w-14 place-items-center rounded-3xl bg-cyan-500/10 ring-1 ring-cyan-500/20">
                        <Icon className="h-7 w-7 text-cyan-700" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-500">Step {st.n}</div>
                        <div className="text-2xl font-black tracking-tight">{st.title}</div>
                      </div>
                    </div>
                    <div className="text-slate-600 sm:max-w-xl">{st.body}</div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CONTACT / BOOK AUDIT */}
<section id="contact" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
  <div className="mx-auto max-w-3xl text-center">
    <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
      Book a Free Audit
    </h2>
    <p className="mt-4 text-slate-600">
      Share your details and we’ll send you a clear plan to improve your conversions and automation.
    </p>
  </div>

  <div className="mt-10 grid gap-6 md:grid-cols-2">
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h3 className="text-lg font-bold text-slate-900">What you’ll get</h3>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600">
        <li>Quick review of your site + offer</li>
        <li>3–5 high-impact improvements</li>
        <li>Automation ideas to increase enquiries</li>
        <li>Clear next steps (even if you DIY)</li>
      </ul>
    </div>

    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
  <p className="text-sm font-semibold text-slate-700">
    Book your audit
  </p>

  <iframe
    title="Free Audit Form"
    src="https://tally.so/embed/rjlEaN?alignLeft=1&hideTitle=1&transparentBackground=1"
    width="100%"
    height={650}
    style={{ border: 0, borderRadius: 16 }}
  />
    </div>
  </div>
</section>

          {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="flex items-center gap-3">
                <LogoMark />
                <div>
                  <div className="text-base font-black tracking-tight">{brand.name}</div>
                  <div className="text-sm text-slate-600">{brand.tagline}</div>
                </div>
              </div>
              <p className="mt-4 max-w-sm text-sm text-slate-600">
                We build automation systems that remove bottlenecks, connect your tools, and help your business scale.
              </p>
            </div>

            <div className="md:col-span-7">
              <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
                <div>
                  <div className="text-sm font-black">Company</div>
                  <div className="mt-3 flex flex-col gap-2 text-sm text-slate-600">
                    <a className="hover:text-slate-900" href="#top">Home</a>
                    <a className="hover:text-slate-900" href="#services">Services</a>
                    <a className="hover:text-slate-900" href="#process">Process</a>
                  </div>
                </div>
                
              <div id="contact">
                <div className="text-sm font-black">Contact</div>
                <div className="mt-3 flex flex-col gap-2 text-sm text-slate-600">
                 <a 
                  href="mailto:hello@autoscalesystems.io"
                  className="hover:text-slate-900"
                 >
                  hello@autoscalesystems.io
                 </a>

                 <a 
                  href="tel:+442034886864"
                  className="hover:text-slate-900"
                 >
                  +44 203 488 6864
                 </a>
                </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-2 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <div>© {year} {brand.name}. All rights reserved.</div>
            <div className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" /> Built for speed, reliability, and scale.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}