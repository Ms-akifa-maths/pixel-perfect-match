import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Armchair, Lightbulb, AirVent } from "lucide-react";
import { CinematicHero } from "@/components/ui/cinematic-hero";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TRUEBID — Buy smarter. Think longer. Waste less." },
      { name: "description", content: "TRUEBID compares the total lifetime cost of products so organizations stop overpaying for cheap quotations." },
      { property: "og:title", content: "TRUEBID — Procurement intelligence" },
      { property: "og:description", content: "Buy smarter. Think longer. Waste less." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const demos = [
  { to: "/chairs", icon: Armchair, label: "Classroom furniture", q: "Is the cheapest chair really the cheapest purchase?" },
  { to: "/lighting", icon: Lightbulb, label: "LED lighting", q: "Can a more expensive light save money in the long run?" },
  { to: "/cooling", icon: AirVent, label: "Classroom cooling", q: "Is the cheapest air conditioner the cheapest to own?" },
] as const;

function Index() {
    return (
    <main>
      <div className="overflow-x-hidden w-[100%] min-h-screen"><CinematicHero
        brandName="TRUEBID"
        tagline1="Buy smarter."
        tagline2="Think longer. Waste less."
        cardHeading="Lifetime cost, revealed."
        cardDescription={<><span className="text-white font-semibold">TRUEBID</span> compares the total cost of ownership — purchase, maintenance, energy and replacement — not just the cheapest quotation.</>}
        metricValue={429}
        metricLabel="K PKR saved"
        ctaHeading="See it in action."
        ctaDescription="Two live demonstrations show why the lowest price is not always the best decision."
        onComplete={() => document.getElementById("demos")?.scrollIntoView({ behavior: "smooth" })}
        ctaAction={
          <a href="#demos" className="inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-sm font-extrabold uppercase tracking-widest text-primary-foreground shadow-lift">
            Choose a comparison <ArrowRight className="h-4 w-4" />
          </a>
        }
      /></div>
      <section id="demos" className="mx-auto max-w-6xl px-5 py-24">
        <div className="grid gap-10 md:grid-cols-2 md:items-end">
          <div>
            <p className="eyebrow">Pick one of three comparisons</p>
            <h2 className="mt-3 text-4xl font-extrabold md:text-5xl">Price is what you pay. Cost is what you live with.</h2>
          </div>
          <p className="text-lg text-muted-foreground">
            TRUEBID is a procurement intelligence platform. It compares suppliers on the total lifetime cost of a product — so schools and businesses choose the quotation that is genuinely cheapest over time.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {demos.map(({ to, icon: I, label, q }) => (
            <Link key={to} to={to} className="card-surface card-hover group flex flex-col p-8">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-navy text-primary"><I className="h-7 w-7" /></span>
              <p className="eyebrow mt-8">{label}</p>
              <h3 className="mt-2 text-2xl font-bold md:text-3xl">{q}</h3>
              <span className="mt-8 inline-flex items-center gap-2 font-semibold text-primary">
                Open demonstration <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
