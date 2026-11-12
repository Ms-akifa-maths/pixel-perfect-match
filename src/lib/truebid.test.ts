import { describe, it, expect } from "vitest";
import { chairSuppliers, chairCosts, ledSuppliers, ledCosts } from "./truebid";

describe("chair 5-year ownership cost", () => {
  it("BudgetSeat needs one replacement and totals Rs 1,062,000", () => {
    const c = chairCosts(chairSuppliers[0]!);
    expect(c.cycles).toBe(1);
    expect(c.total).toBe(1062000);
  });
  it("Circular Furnish totals Rs 633,000", () => expect(chairCosts(chairSuppliers[1]!).total).toBe(633000));
  it("LongSpan Works totals Rs 685,000", () => expect(chairCosts(chairSuppliers[2]!).total).toBe(685000));
});

describe("LED 5-year ownership cost", () => {
  it("BrightStart uses 3379.2 kWh/yr and totals Rs 1,157,760", () => {
    const c = ledCosts(ledSuppliers[0]!);
    expect(c.annualKwh).toBeCloseTo(3379.2);
    expect(c.total).toBeCloseTo(1157760);
  });
  it("EfficientLite totals Rs 929,320", () => expect(ledCosts(ledSuppliers[1]!).total).toBeCloseTo(929320));
  it("EcoGlow totals Rs 713,880", () => expect(ledCosts(ledSuppliers[2]!).total).toBeCloseTo(713880));
});
