/**
 * Shared progressive slab engine used by every sector calculator (salary,
 * business/AOP, …). Keeps the pure "which band, fixed + marginal rate" maths in
 * one place so each calculator only supplies its own `TaxBracket[]` table.
 *
 * **Bands abut.** A band's `min` is the previous band's `max`, not one rupee
 * above it, because that is what the statute says: Division V charges "5 per
 * cent of the gross amount exceeding Rs. 300,000", so the band that runs to
 * Rs. 600,000 has `min: 300_000` and `amount - min` is the statutory excess.
 * Writing `min: 300_001` instead left a gap that a fractional amount could fall
 * into — it matched no band at all and fell through to the top one, which
 * returned a large negative tax.
 *
 * The boundary rupee belongs to the band **below**: `findTaxBracket` walks the
 * table in order and takes the first band whose `max` the amount is within, so
 * exactly Rs. 600,000 is taxed in the band ending there, not the one starting
 * there. Use `bandStart` when displaying where a band begins.
 */

export interface TaxBracket {
  /** Figure the band charges the excess over — also the previous band's `max`. */
  min: number;
  max: number | null;
  rate: number;
  fixed: number;
}

/**
 * Returns the bracket a given amount falls into, defaulting to the top band.
 *
 * Selection is on the upper bound alone: a progressive table is fully
 * determined by its band ceilings, and matching on `min` as well is what made a
 * gap between bands possible.
 */
export function findTaxBracket(brackets: TaxBracket[], amount: number): TaxBracket {
  for (const bracket of brackets) {
    if (bracket.max === null || amount <= bracket.max) {
      return bracket;
    }
  }

  return brackets.at(-1) ?? brackets[0];
}

/**
 * First rupee inside a band, for labels like "Rs. 600,001 – 1,200,000". The
 * band's `min` is the figure it charges the excess *over*, so the band itself
 * starts one rupee higher.
 */
export function bandStart(min: number): number {
  return min === 0 ? 0 : min + 1;
}

/**
 * True once `amount` has entered the band. The boundary rupee belongs to the
 * band below, so reaching a band means passing its `min`, not matching it.
 */
export function isBandReached(bracket: TaxBracket, amount: number): boolean {
  return bracket.min === 0 ? amount >= bracket.min : amount > bracket.min;
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
