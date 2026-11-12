import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Award, CheckCircle2, Leaf, Recycle, Wrench, Zap, Clock } from "lucide-react";
import { pkr } from "@/lib/truebid";

export function Stat({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-border/70 py-2 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={strong ? "font-display text-lg font-bold text-foreground" : "font-semibold"}>{value}</span>
    </div>
  );
}

export function SupplierCard({ tag, name, best, cheapest, children }: { tag: string; name: string; best?: boolean; cheapest?: boolean; children: React.ReactNode }) {
  return (
    <div className={`card-surface card-hover relative p-6 ${best ? "ring-2 ring-primary" : ""}`}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{tag}</p>
        {best && <span className="rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground">Best value</span>}
        {cheapest && !best && <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-bold text-muted-foreground">Cheapest upfront</span>}
      </div>
      <h3 className="mt-2 text-2xl font-bold">{name}</h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export function CostChart({ data, title }: { data: { name: string; initial: number; total: number }[]; title: string }) {
  return (
    <div className="card-surface p-6 md:p-8">
      <p className="eyebrow">Five-year view</p>
      <h2 className="mt-2 text-2xl font-bold md:text-3xl">{title}</h2>
      <div className="mt-6 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={8}>
            <CartesianGrid vertical={false} stroke="var(--border)" />
            <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 13 }} />
            <YAxis tickLine={false} axisLine={false} width={70} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
            <Tooltip formatter={(v) => pkr(Number(v))} cursor={{ fill: "var(--muted)" }} contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }} />
            <Legend iconType="circle" />
            <Bar dataKey="initial" name="Initial purchase price" fill="var(--chart-1)" radius={[8, 8, 0, 0]} />
            <Bar dataKey="total" name="Total ownership cost" fill="var(--chart-2)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function CompareTable({ head, rows }: { head: string[]; rows: (string | number)[][] }) {
  return (
    <div className="card-surface overflow-x-auto">
      <table className="w-full min-w-[560px] text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/60 text-left">
            {head.map((h, i) => <th key={h} className={`px-5 py-3 font-bold ${i ? "text-right" : ""}`}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri} className={`border-b border-border/60 last:border-0 ${ri === rows.length - 1 ? "bg-accent font-bold text-accent-foreground" : ""}`}>
              {r.map((c, i) => <td key={i} className={`px-5 py-3 ${i ? "text-right tabular-nums" : "text-muted-foreground"} ${ri === rows.length - 1 ? "text-accent-foreground" : ""}`}>{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Recommendation({ name, total, reasons }: { name: string; total: number; reasons: string[] }) {
  return (
    <div className="overflow-hidden rounded-[calc(var(--radius)+8px)] bg-navy p-8 text-navy-foreground shadow-lift md:p-10">
      <div className="flex items-center gap-2 text-primary"><Award className="h-5 w-5" /><span className="text-xs font-bold uppercase tracking-[0.2em]">TRUEBID recommends</span></div>
      <div className="mt-4 grid gap-8 md:grid-cols-[1fr_1.4fr]">
        <div>
          <h2 className="text-4xl font-extrabold md:text-5xl">{name}</h2>
          <p className="mt-4 text-sm opacity-60">Five-year total ownership cost</p>
          <p className="font-display text-3xl font-bold text-primary">{pkr(total)}</p>
        </div>
        <ul className="space-y-3">
          {reasons.map((r) => (
            <li key={r} className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><span className="opacity-90">{r}</span></li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const ICONS = { lifespan: Clock, repair: Wrench, recycled: Recycle, energy: Zap, leaf: Leaf };
export function Sustainability({ items }: { items: { name: string; metrics: { icon: keyof typeof ICONS; label: string; value: string }[] }[] }) {
  return (
    <section>
      <p className="eyebrow">Sustainability indicators</p>
      <h2 className="mt-2 text-2xl font-bold md:text-3xl">Longer life, more repair, less waste.</h2>
      <p className="mt-2 max-w-2xl text-muted-foreground">Indicators from each supplier's stated data. TRUEBID does not claim verified emission or waste reductions.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {items.map((it) => (
          <div key={it.name} className="card-surface p-5">
            <p className="font-bold">{it.name}</p>
            <div className="mt-3 space-y-2">
              {it.metrics.map((m) => {
                const I = ICONS[m.icon];
                return (
                  <div key={m.label} className="flex items-center gap-3 text-sm">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent text-accent-foreground"><I className="h-4 w-4" /></span>
                    <span className="flex-1 text-muted-foreground">{m.label}</span>
                    <span className="font-semibold">{m.value}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
