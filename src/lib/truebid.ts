export const YEARS = 5;

export interface ChairSupplier {
  name: string; tag: string; unitPrice: number; delivery: number; lifespan: number;
  maintenance: number; warranty: number; repairability: number; recycled: number;
}
export const CHAIR_QTY = 100;
export const chairSuppliers: ChairSupplier[] = [
  { name: "BudgetSeat", tag: "Supplier Alpha", unitPrice: 4800, delivery: 12000, lifespan: 3, maintenance: 18000, warranty: 1, repairability: 3, recycled: 10 },
  { name: "Circular Furnish", tag: "Supplier Beta", unitPrice: 5900, delivery: 8000, lifespan: 8, maintenance: 7000, warranty: 5, repairability: 9, recycled: 45 },
  { name: "LongSpan Works", tag: "Supplier Gamma", unitPrice: 6500, delivery: 10000, lifespan: 10, maintenance: 5000, warranty: 7, repairability: 8, recycled: 60 },
];

export const replacementCycles = (period: number, lifespan: number) =>
  Math.max(0, Math.ceil(period / lifespan) - 1);

export function chairCosts(s: ChairSupplier) {
  const purchase = CHAIR_QTY * s.unitPrice;
  const acquisition = purchase + s.delivery;
  const cycles = replacementCycles(YEARS, s.lifespan);
  const replacement = cycles * CHAIR_QTY * s.unitPrice;
  const maintenance = s.maintenance * YEARS;
  return { purchase, acquisition, cycles, replacement, maintenance, total: acquisition + replacement + maintenance };
}

export interface LedSupplier {
  name: string; tag: string; unitPrice: number; watts: number; lifespanHours: number;
  warranty: number; maintenance: number; delivery: number; recycled: number;
}
export const LED = { qty: 80, hoursPerDay: 8, daysPerYear: 220, tariff: 60 };
export const ledSuppliers: LedSupplier[] = [
  { name: "BrightStart", tag: "Supplier Alpha", unitPrice: 1200, watts: 24, lifespanHours: 10000, warranty: 1, maintenance: 8000, delivery: 8000, recycled: 15 },
  { name: "EfficientLite", tag: "Supplier Beta", unitPrice: 1700, watts: 18, lifespanHours: 20000, warranty: 3, maintenance: 5000, delivery: 8000, recycled: 30 },
  { name: "EcoGlow", tag: "Supplier Gamma", unitPrice: 2300, watts: 12, lifespanHours: 40000, warranty: 5, maintenance: 3000, delivery: 8000, recycled: 50 },
];

export function ledCosts(s: LedSupplier) {
  const purchase = LED.qty * s.unitPrice;
  const annualKwh = (s.watts * LED.qty * LED.hoursPerDay * LED.daysPerYear) / 1000;
  const annualElectricity = annualKwh * LED.tariff;
  const electricity = annualElectricity * YEARS;
  const operatingHours = LED.hoursPerDay * LED.daysPerYear * YEARS;
  const cycles = replacementCycles(operatingHours, s.lifespanHours);
  const replacement = cycles * purchase;
  const maintenance = s.maintenance * YEARS;
  const total = purchase + s.delivery + replacement + maintenance + electricity;
  return { purchase, annualKwh, annualElectricity, electricity, operatingHours, cycles, replacement, maintenance, total };
}

export const pkr = (n: number) => "Rs. " + Math.round(n).toLocaleString("en-PK");

export interface AcSupplier {
  name: string; tag: string; unitPrice: number; kw: number; lifespan: number;
  warranty: number; maintenance: number; delivery: number; recycled: number;
}
export const AC = { qty: 20, hoursPerDay: 6, daysPerYear: 200, tariff: 60 };
export const acSuppliers: AcSupplier[] = [
  { name: "CoolBasic", tag: "Supplier Alpha", unitPrice: 85000, kw: 1.8, lifespan: 4, warranty: 1, maintenance: 40000, delivery: 20000, recycled: 10 },
  { name: "InverterPro", tag: "Supplier Beta", unitPrice: 120000, kw: 1.2, lifespan: 10, warranty: 5, maintenance: 20000, delivery: 20000, recycled: 35 },
  { name: "EcoChill", tag: "Supplier Gamma", unitPrice: 140000, kw: 0.9, lifespan: 12, warranty: 7, maintenance: 15000, delivery: 20000, recycled: 50 },
];

export function acCosts(s: AcSupplier) {
  const purchase = AC.qty * s.unitPrice;
  const annualKwh = s.kw * AC.qty * AC.hoursPerDay * AC.daysPerYear;
  const annualElectricity = annualKwh * AC.tariff;
  const electricity = annualElectricity * YEARS;
  const cycles = replacementCycles(YEARS, s.lifespan);
  const replacement = cycles * purchase;
  const maintenance = s.maintenance * YEARS;
  const total = purchase + s.delivery + replacement + maintenance + electricity;
  return { purchase, annualKwh, annualElectricity, electricity, cycles, replacement, maintenance, total };
}
