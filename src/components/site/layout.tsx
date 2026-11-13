import { Link } from "@tanstack/react-router";

const nav = [
  { to: "/", label: "Home" },
  { to: "/chairs", label: "Chairs" },
  { to: "/lighting", label: "LED Lighting" },
  { to: "/cooling", label: "AC" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-[100] border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="font-display text-lg font-extrabold tracking-tight text-foreground">
          TRUE<span className="text-primary">BID</span>
        </Link>
        <nav className="flex gap-1 text-sm font-semibold">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: true }}
              className="rounded-full px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "bg-navy text-navy-foreground hover:text-navy-foreground" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-10 text-sm md:flex-row md:items-center md:justify-between">
        <p className="font-display text-base font-bold">TRUE<span className="text-primary">BID</span> — Buy smarter. Think longer. Waste less.</p>
        <p className="opacity-60">Fictional suppliers and simulated figures for demonstration only.</p>
      </div>
    </footer>
  );
}

export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-10 pt-32">
      <Link to="/" className="text-sm font-semibold text-muted-foreground hover:text-foreground">← Back to home</Link>
      <p className="eyebrow mt-8">{eyebrow}</p>
      <h1 className="mt-3 max-w-3xl text-4xl font-extrabold md:text-6xl">{title}</h1>
      {children && <div className="mt-5 max-w-2xl text-lg text-muted-foreground">{children}</div>}
    </section>
  );
}
