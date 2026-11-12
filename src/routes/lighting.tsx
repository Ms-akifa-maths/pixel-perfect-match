import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site/layout";
import { CompareTable, CostChart, Recommendation, Stat, SupplierCard, Sustainability } from "@/components/site/demo";
import { LED, YEARS, ledCosts, ledSuppliers, pkr } from "@/lib/truebid";

export const Route = createFileRoute("/lighting")({
  head: () => ({
    meta: [
      { title: "LED Lighting Comparison — TRUEBID" },
      { name: "description", content: "Can a more expensive light save money in the long run? Five-year cost of 80 LED lights including electricity." },
      { property: "og:title", content: "LED Lighting Comparison — TRUEBID" },
      { property: "og:description", content: "A higher initial price can mean a lower lifetime cost." },
    ],
  }),
  component: Lighting,
});

const kwh = (n: number) => `${n.toLocaleString("en-PK", { maximumFractionDigits: 1 })} kWh`;

function Lighting() {
  const rows = ledSuppliers.map((s) => ({ s, c: ledCosts(s) }));
  const best = rows.reduce((a, b) => (b.c.total < a.c.total ? b : a));
  const cheap = rows.reduce((a, b) => (b.c.purchase < a.c.purchase ? b : a));

  return (
    <main>
      <PageIntro eyebrow="Demonstration 02 · LED lighting" title="A higher initial price can mean a lower lifetime cost.">
        {LED.qty} lights · {LED.hoursPerDay} hrs/day · {LED.daysPerYear} days/year · Rs. {LED.tariff} per kWh · {YEARS}-year period.
      </PageIntro>
      <div className="mx-auto max-w-6xl space-y-12 px-5 pb-24">
        <div className="grid gap-5 md:grid-cols-3">
          {rows.map(({ s, c }) => (
            <SupplierCard key={s.name} tag={s.tag} name={s.name} best={s === best.s} cheapest={s === cheap.s}>
              <Stat label="Price per light" value={pkr(s.unitPrice)} />
              <Stat label="Power" value={`${s.watts} W`} />
              <Stat label="Lifespan" value={`${s.lifespanHours.toLocaleString()} hrs`} />
              <Stat label="Warranty" value={`${s.warranty} yr`} />
              <Stat label="Annual electricity" value={pkr(c.annualElectricity)} />
              <Stat label="Recycled material" value={`${s.recycled}%`} />
              <Stat label="5-year total cost" value={pkr(c.total)} strong />
            </SupplierCard>
          ))}
        </div>
        <CostChart title="Initial purchase price vs total ownership cost" data={rows.map(({ s, c }) => ({ name: s.name, initial: c.purchase, total: c.total }))} />
        <CompareTable
          head={["Cost item", ...rows.map((r) => r.s.name)]}
          rows={[
            ["Initial purchase price", ...rows.map((r) => pkr(r.c.purchase))],
            ["Delivery", ...rows.map((r) => pkr(r.s.delivery))],
            ["Annual electricity use", ...rows.map((r) => kwh(r.c.annualKwh))],
            [`${YEARS}-year electricity cost`, ...rows.map((r) => pkr(r.c.electricity))],
            [`Maintenance (${YEARS} yrs)`, ...rows.map((r) => pkr(r.c.maintenance))],
            ["Replacement cost", ...rows.map((r) => pkr(r.c.replacement))],
            ["Total ownership cost", ...rows.map((r) => pkr(r.c.total))],
          ]}
        />
        <p className="-mt-8 text-sm text-muted-foreground">
          Over {YEARS} years each light runs {rows[0]!.c.operatingHours.toLocaleString()} hours — within every supplier's rated lifespan, so no replacements are needed.
        </p>
        <Recommendation
          name={best.s.name}
          total={best.c.total}
          reasons={[
            `Lowest five-year cost: ${pkr(best.c.total)} versus ${pkr(cheap.c.total)} for ${cheap.s.name}, a difference of ${pkr(cheap.c.total - best.c.total)}.`,
            `Costs ${pkr(best.c.purchase - cheap.c.purchase)} more to buy, but uses ${best.s.watts} W instead of ${cheap.s.watts} W.`,
            `Electricity over five years: ${pkr(best.c.electricity)} versus ${pkr(cheap.c.electricity)} — ${pkr(cheap.c.electricity - best.c.electricity)} less.`,
            `${best.s.warranty}-year warranty, ${best.s.lifespanHours.toLocaleString()}-hour lifespan and ${best.s.recycled}% recycled material versus ${cheap.s.warranty} year, ${cheap.s.lifespanHours.toLocaleString()} hours and ${cheap.s.recycled}%.`,
          ]}
        />
        <Sustainability
          items={rows.map(({ s, c }) => ({
            name: s.name,
            metrics: [
              { icon: "energy", label: "Annual energy use", value: kwh(c.annualKwh) },
              { icon: "lifespan", label: "Rated lifespan", value: `${s.lifespanHours.toLocaleString()} h` },
              { icon: "recycled", label: "Recycled material", value: `${s.recycled}%` },
            ],
          }))}
        />
      </div>
    </main>
  );
}
