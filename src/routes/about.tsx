import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site/layout";
import { BatteryCharging, Hammer, Leaf, Recycle, RefreshCw, Wallet, Wrench } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About TRUEBID — Procurement intelligence" },
      { name: "description", content: "TRUEBID helps schools, organizations and businesses make informed purchasing decisions using total cost of ownership." },
      { property: "og:title", content: "About TRUEBID" },
      { property: "og:description", content: "The cheapest quotation is not always the smartest investment." },
    ],
  }),
  component: About,
});

const factors = [
  { icon: Wallet, label: "Purchase price" }, { icon: Wrench, label: "Maintenance" },
  { icon: BatteryCharging, label: "Energy" }, { icon: Hammer, label: "Durability" },
  { icon: RefreshCw, label: "Replacement" }, { icon: Recycle, label: "Repairability" },
  { icon: Leaf, label: "Sustainability" },
];
const sustain = [
  "Longer product lifespans", "Repair instead of unnecessary replacement", "Recycled materials",
  "Energy-efficient purchasing", "Reduced resource consumption",
];

function About() {
  return (
    <main>
      <PageIntro eyebrow="About TRUEBID" title="Procurement that sees the bigger picture.">
        TRUEBID is designed to help schools, organizations and businesses make informed purchasing decisions. Traditional procurement often focuses on the initial price. TRUEBID considers everything that follows.
      </PageIntro>
      <div className="mx-auto max-w-6xl space-y-16 px-5 pb-24">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
          {factors.map(({ icon: I, label }) => (
            <div key={label} className="card-surface card-hover flex flex-col items-center gap-3 p-5 text-center">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-accent-foreground"><I className="h-5 w-5" /></span>
              <span className="text-sm font-semibold">{label}</span>
            </div>
          ))}
        </div>
        <section className="card-surface grid gap-8 p-8 md:grid-cols-2 md:p-10">
          <div>
            <p className="eyebrow">Sustainability</p>
            <h2 className="mt-2 text-3xl font-bold">Smarter buying is greener buying.</h2>
            <p className="mt-3 text-muted-foreground">By making lifetime costs visible, TRUEBID rewards products that last, can be repaired and use fewer resources.</p>
          </div>
          <ul className="space-y-3">
            {sustain.map((s) => <li key={s} className="flex items-center gap-3"><Leaf className="h-4 w-4 text-primary" />{s}</li>)}
          </ul>
        </section>
        <p className="mx-auto max-w-4xl text-center font-display text-3xl font-extrabold leading-tight md:text-5xl">
          The cheapest quotation is not always the <span className="text-primary">smartest investment.</span>
        </p>
      </div>
    </main>
  );
}
