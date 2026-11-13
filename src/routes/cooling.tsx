import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site/layout";
import { CompareTable, CostChart, Recommendation, Stat, SupplierCard, Sustainability } from "@/components/site/demo";
import { AC, YEARS, acCosts, acSuppliers, pkr } from "@/lib/truebid";

export const Route = createFileRoute("/cooling")({
  head: () => ({
    meta: [
      { title: "Classroom AC Comparison — TRUEBID" },
      { name: "description", content: "Which air conditioner is cheapest over five years? 20 classroom ACs including electricity, repairs and replacement." },
      { property: "og:title", content: "Classroom AC Comparison — TRUEBID" },
      { property: "og:description", content: "The cheapest AC can cost the most to run." },
    ],
  }),
  component: Cooling,
});

const kwh = (n: number) => `${n.toLocaleString("en-PK", { maximumFractionDigits: 1 })} kWh`;

function Cooling() {
  const rows = acSuppliers.map((s) => ({ s, c: acCosts(s) }));
  const best = rows.reduce((a, b) => (b.c.total < a.c.total ? b : a));
  const cheap = rows.reduce((a, b) => (b.c.purchase < a.c.purchase ? b : a));

  return (
    <main>
      <PageIntro eyebrow="Demonstration 03 · Classroom cooling" title="The cheapest AC can cost the most to run.">
        {AC.qty} air conditioners · {AC.hoursPerDay} hrs/day · {AC.daysPerYear} days/year · Rs. {AC.tariff} per kWh · {YEARS}-year period.
      </PageIntro>
      <div className="mx-auto max-w-6xl space-y-12 px-5 pb-24">
        <div className="grid gap-5 md:grid-cols-3">
          {rows.map(({ s, c }) => (
            <SupplierCard key={s.name} tag={s.tag} name={s.name} best={s === best.s} cheapest={s === cheap.s}>
              <Stat label="Price per unit" value={pkr(s.unitPrice)} />
              <Stat label="Power" value={`${s.kw} kW`} />
              <Stat label="Lifespan" value={`${s.lifespan} years`} />
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
            ["Replacement cycles", ...rows.map((r) => r.c.cycles)],
            ["Replacement cost", ...rows.map((r) => pkr(r.c.replacement))],
            ["Total ownership cost", ...rows.map((r) => pkr(r.c.total))],
          ]}
        />
        <Recommendation
          name={best.s.name}
          total={best.c.total}
          reasons={[
            `Lowest five-year cost: ${pkr(best.c.total)} versus ${pkr(cheap.c.total)} for ${cheap.s.name}, a difference of ${pkr(cheap.c.total - best.c.total)}.`,
            `Costs ${pkr(best.c.purchase - cheap.c.purchase)} more to buy, but draws ${best.s.kw} kW instead of ${cheap.s.kw} kW.`,
            `Electricity over five years: ${pkr(best.c.electricity)} versus ${pkr(cheap.c.electricity)} — ${pkr(cheap.c.electricity - best.c.electricity)} less.`,
            `${best.s.warranty}-year warranty, ${best.s.lifespan}-year lifespan and ${best.s.recycled}% recycled material versus ${cheap.s.warranty} year, ${cheap.s.lifespan} years (${cheap.c.cycles} replacement) and ${cheap.s.recycled}%.`,
          ]}
        />
        <Sustainability
          items={rows.map(({ s, c }) => ({
            name: s.name,
            metrics: [
              { icon: "energy", label: "Annual energy use", value: kwh(c.annualKwh) },
              { icon: "lifespan", label: "Rated lifespan", value: `${s.lifespan} yrs` },
              { icon: "recycled", label: "Recycled material", value: `${s.recycled}%` },
            ],
          }))}
        />
      </div>
    </main>
  );
}
