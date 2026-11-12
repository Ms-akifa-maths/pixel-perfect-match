import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site/layout";
import { CompareTable, CostChart, Recommendation, Stat, SupplierCard, Sustainability } from "@/components/site/demo";
import { CHAIR_QTY, YEARS, chairCosts, chairSuppliers, pkr } from "@/lib/truebid";

export const Route = createFileRoute("/chairs")({
  head: () => ({
    meta: [
      { title: "Classroom Chairs Comparison — TRUEBID" },
      { name: "description", content: "Is the cheapest chair really the cheapest purchase? A five-year total cost comparison of 100 classroom chairs." },
      { property: "og:title", content: "Classroom Chairs Comparison — TRUEBID" },
      { property: "og:description", content: "Initial price vs total ownership cost for 100 classroom chairs." },
    ],
  }),
  component: Chairs,
});

function Chairs() {
  const rows = chairSuppliers.map((s) => ({ s, c: chairCosts(s) }));
  const best = rows.reduce((a, b) => (b.c.total < a.c.total ? b : a));
  const cheap = rows.reduce((a, b) => (b.c.acquisition < a.c.acquisition ? b : a));
  const saving = cheap.c.total - best.c.total;
  const extraUpfront = best.c.acquisition - cheap.c.acquisition;

  return (
    <main>
      <PageIntro eyebrow="Demonstration 01 · Classroom furniture" title="Is the cheapest chair really the cheapest purchase?">
        A school needs {CHAIR_QTY} chairs. Three fictional suppliers, compared over a fixed {YEARS}-year period.
      </PageIntro>
      <div className="mx-auto max-w-6xl space-y-12 px-5 pb-24">
        <div className="grid gap-5 md:grid-cols-3">
          {rows.map(({ s, c }) => (
            <SupplierCard key={s.name} tag={s.tag} name={s.name} best={s === best.s} cheapest={s === cheap.s}>
              <Stat label="Price per chair" value={pkr(s.unitPrice)} />
              <Stat label={`Purchase (${CHAIR_QTY} chairs)`} value={pkr(c.purchase)} />
              <Stat label="Lifespan" value={`${s.lifespan} years`} />
              <Stat label="Warranty" value={`${s.warranty} yr`} />
              <Stat label="Repairability" value={`${s.repairability}/10`} />
              <Stat label="Recycled material" value={`${s.recycled}%`} />
              <Stat label="5-year total cost" value={pkr(c.total)} strong />
            </SupplierCard>
          ))}
        </div>
        <CostChart title="Initial purchase price vs total ownership cost" data={rows.map(({ s, c }) => ({ name: s.name, initial: c.acquisition, total: c.total }))} />
        <CompareTable
          head={["Cost item", ...rows.map((r) => r.s.name)]}
          rows={[
            ["Purchase cost", ...rows.map((r) => pkr(r.c.purchase))],
            ["Delivery", ...rows.map((r) => pkr(r.s.delivery))],
            ["Initial acquisition", ...rows.map((r) => pkr(r.c.acquisition))],
            ["Replacement cycles", ...rows.map((r) => r.c.cycles)],
            ["Replacement cost", ...rows.map((r) => pkr(r.c.replacement))],
            [`Maintenance (${YEARS} yrs)`, ...rows.map((r) => pkr(r.c.maintenance))],
            ["Total ownership cost", ...rows.map((r) => pkr(r.c.total))],
          ]}
        />
        <Recommendation
          name={best.s.name}
          total={best.c.total}
          reasons={[
            `Lowest five-year cost of the three: ${pkr(best.c.total)} versus ${pkr(cheap.c.total)} for ${cheap.s.name}, a difference of ${pkr(saving)}.`,
            `Costs ${pkr(extraUpfront)} more upfront, but ${cheap.s.name}'s ${cheap.s.lifespan}-year lifespan forces ${cheap.c.cycles} full replacement (${pkr(cheap.c.replacement)}) within five years.`,
            `${best.s.lifespan}-year lifespan and ${best.s.warranty}-year warranty versus ${cheap.s.lifespan} years and ${cheap.s.warranty} year.`,
            `Repairability ${best.s.repairability}/10 and ${best.s.recycled}% recycled material versus ${cheap.s.repairability}/10 and ${cheap.s.recycled}%.`,
          ]}
        />
        <Sustainability
          items={chairSuppliers.map((s) => ({
            name: s.name,
            metrics: [
              { icon: "lifespan", label: "Lifespan", value: `${s.lifespan} yrs` },
              { icon: "repair", label: "Repairability", value: `${s.repairability}/10` },
              { icon: "recycled", label: "Recycled material", value: `${s.recycled}%` },
            ],
          }))}
        />
      </div>
    </main>
  );
}
