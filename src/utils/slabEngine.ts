/**
 * Shared progressive slab engine used by every sector calculator (salary,
 * business/AOP, …). Keeps the pure "which band, fixed + marginal rate" maths in
 * one place so each calculator only supplies its own `TaxBracket[]` table.
 */

export interface TaxBracket {
  min: number;
  max: number | null;
  rate: number;
  fixed: number;
}

/** Returns the bracket a given amount falls into, defaulting to the top band. */
export function findTaxBracket(brackets: TaxBracket[], amount: number): TaxBracket {
  for (const bracket of brackets) {
    if (amount >= bracket.min && (bracket.max === null || amount <= bracket.max)) {
      return bracket;
    }
  }

  return brackets.at(-1) ?? brackets[0];
}

/**
 * Progressive tax for `amount` against `brackets`: the band's fixed amount plus
 * its marginal rate applied to the income inside the band. Returns a
 * full-precision value; callers round when formatting.
 */
export function calcSlabTax(amount: number, brackets: TaxBracket[]): number {
  if (!(amount > 0) || brackets.length === 0) {
    return 0;
  }

  const bracket = findTaxBracket(brackets, amount);
  return bracket.fixed + (amount - bracket.min) * (bracket.rate / 100);
}
