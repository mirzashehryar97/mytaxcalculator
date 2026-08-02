import { calcSlabTax, type TaxBracket } from '@/utils/slabEngine';

export const taxSlabs: Record<string, TaxBracket[]> = {
  '2026-2027': [
    { min: 0, max: 600_000, rate: 0, fixed: 0 },
    { min: 600_001, max: 1_200_000, rate: 1, fixed: 0 },
    { min: 1_200_001, max: 2_200_000, rate: 11, fixed: 6000 },
    { min: 2_200_001, max: 3_200_000, rate: 20, fixed: 116_000 },
    { min: 3_200_001, max: 4_100_000, rate: 25, fixed: 316_000 },
    { min: 4_100_001, max: 5_600_000, rate: 29, fixed: 541_000 },
    { min: 5_600_001, max: 7_000_000, rate: 32, fixed: 976_000 },
    { min: 7_000_001, max: null, rate: 35, fixed: 1_424_000 },
  ],
  '2025-2026': [
    { min: 0, max: 600_000, rate: 0, fixed: 0 },
    { min: 600_001, max: 1_200_000, rate: 1, fixed: 0 },
    { min: 1_200_001, max: 2_200_000, rate: 11, fixed: 6000 },
    { min: 2_200_001, max: 3_200_000, rate: 23, fixed: 116_000 },
    { min: 3_200_001, max: 4_100_000, rate: 30, fixed: 346_000 },
    { min: 4_100_001, max: null, rate: 35, fixed: 616_000 },
  ],
  '2024-2025': [
    { min: 0, max: 600_000, rate: 0, fixed: 0 },
    { min: 600_001, max: 1_200_000, rate: 5, fixed: 0 },
    { min: 1_200_001, max: 2_200_000, rate: 15, fixed: 30_000 },
    { min: 2_200_001, max: 3_200_000, rate: 25, fixed: 180_000 },
    { min: 3_200_001, max: 4_100_000, rate: 30, fixed: 430_000 },
    { min: 4_100_001, max: null, rate: 35, fixed: 700_000 },
  ],
  '2023-2024': [
    { min: 0, max: 600_000, rate: 0, fixed: 0 },
    { min: 600_001, max: 1_200_000, rate: 2.5, fixed: 0 },
    { min: 1_200_001, max: 2_400_000, rate: 12.5, fixed: 15_000 },
    { min: 2_400_001, max: 3_600_000, rate: 22.5, fixed: 165_000 },
    { min: 3_600_001, max: 6_000_000, rate: 27.5, fixed: 435_000 },
    { min: 6_000_001, max: null, rate: 35, fixed: 1_095_000 },
  ],
  '2022-2023': [
    { min: 0, max: 600_000, rate: 0, fixed: 0 },
    { min: 600_001, max: 1_200_000, rate: 2.5, fixed: 0 },
    { min: 1_200_001, max: 2_400_000, rate: 12.5, fixed: 15_000 },
    { min: 2_400_001, max: 3_600_000, rate: 20, fixed: 165_000 },
    { min: 3_600_001, max: 6_000_000, rate: 25, fixed: 405_000 },
    { min: 6_000_001, max: 12_000_000, rate: 32.5, fixed: 1_005_000 },
    { min: 12_000_001, max: null, rate: 35, fixed: 2_955_000 },
  ],
  '2021-2022': [
    { min: 0, max: 600_000, rate: 0, fixed: 0 },
    { min: 600_001, max: 1_200_000, rate: 5, fixed: 0 },
    { min: 1_200_001, max: 1_800_000, rate: 10, fixed: 30_000 },
    { min: 1_800_001, max: 2_500_000, rate: 15, fixed: 90_000 },
    { min: 2_500_001, max: 3_500_000, rate: 17.5, fixed: 195_000 },
    { min: 3_500_001, max: 5_000_000, rate: 20, fixed: 370_000 },
    { min: 5_000_001, max: 8_000_000, rate: 22.5, fixed: 670_000 },
    { min: 8_000_001, max: 12_000_000, rate: 25, fixed: 1_345_000 },
    { min: 12_000_001, max: 30_000_000, rate: 27.5, fixed: 2_345_000 },
    { min: 30_000_001, max: 50_000_000, rate: 30, fixed: 7_295_000 },
    { min: 50_000_001, max: 75_000_000, rate: 32.5, fixed: 13_295_000 },
    { min: 75_000_001, max: null, rate: 35, fixed: 21_420_000 },
  ],
  '2020-2021': [
    { min: 0, max: 600_000, rate: 0, fixed: 0 },
    { min: 600_001, max: 1_200_000, rate: 5, fixed: 0 },
    { min: 1_200_001, max: 1_800_000, rate: 10, fixed: 30_000 },
    { min: 1_800_001, max: 2_500_000, rate: 15, fixed: 90_000 },
    { min: 2_500_001, max: 3_500_000, rate: 17.5, fixed: 195_000 },
    { min: 3_500_001, max: 5_000_000, rate: 20, fixed: 370_000 },
    { min: 5_000_001, max: 8_000_000, rate: 22.5, fixed: 670_000 },
    { min: 8_000_001, max: 12_000_000, rate: 25, fixed: 1_345_000 },
    { min: 12_000_001, max: 30_000_000, rate: 27.5, fixed: 2_345_000 },
    { min: 30_000_001, max: 50_000_000, rate: 30, fixed: 7_295_000 },
    { min: 50_000_001, max: 75_000_000, rate: 32.5, fixed: 13_295_000 },
    { min: 75_000_001, max: null, rate: 35, fixed: 21_420_000 },
  ],
  '2019-2020': [
    { min: 0, max: 600_000, rate: 0, fixed: 0 },
    { min: 600_001, max: 1_200_000, rate: 5, fixed: 0 },
    { min: 1_200_001, max: 1_800_000, rate: 10, fixed: 30_000 },
    { min: 1_800_001, max: 2_500_000, rate: 15, fixed: 90_000 },
    { min: 2_500_001, max: 3_500_000, rate: 17.5, fixed: 195_000 },
    { min: 3_500_001, max: 5_000_000, rate: 20, fixed: 370_000 },
    { min: 5_000_001, max: 8_000_000, rate: 22.5, fixed: 670_000 },
    { min: 8_000_001, max: 12_000_000, rate: 25, fixed: 1_345_000 },
    { min: 12_000_001, max: 30_000_000, rate: 27.5, fixed: 2_345_000 },
    { min: 30_000_001, max: 50_000_000, rate: 30, fixed: 7_295_000 },
    { min: 50_000_001, max: 75_000_000, rate: 32.5, fixed: 13_295_000 },
    { min: 75_000_001, max: null, rate: 35, fixed: 21_420_000 },
  ],
  '2018-2019': [
    { min: 0, max: 400_000, rate: 0, fixed: 0 },
    { min: 400_001, max: 800_000, rate: 0, fixed: 1000 },
    { min: 800_001, max: 1_200_000, rate: 0, fixed: 2000 },
    { min: 1_200_001, max: 2_500_000, rate: 5, fixed: 2000 },
    { min: 2_500_001, max: 4_000_000, rate: 15, fixed: 65_000 },
    { min: 4_000_001, max: 8_000_000, rate: 20, fixed: 290_000 },
    { min: 8_000_001, max: null, rate: 25, fixed: 1_090_000 },
  ],
  '2017-2018': [
    { min: 0, max: 400_000, rate: 0, fixed: 0 },
    { min: 400_001, max: 500_000, rate: 2, fixed: 0 },
    { min: 500_001, max: 750_000, rate: 5, fixed: 2000 },
    { min: 750_001, max: 1_400_000, rate: 10, fixed: 14_500 },
    { min: 1_400_001, max: 1_500_000, rate: 12.5, fixed: 79_500 },
    { min: 1_500_001, max: 1_800_000, rate: 15, fixed: 92_000 },
    { min: 1_800_001, max: 2_500_000, rate: 17.5, fixed: 137_000 },
    { min: 2_500_001, max: 3_000_000, rate: 20, fixed: 259_500 },
    { min: 3_000_001, max: 3_500_000, rate: 22.5, fixed: 359_500 },
    { min: 3_500_001, max: 4_000_000, rate: 25, fixed: 472_000 },
    { min: 4_000_001, max: 7_000_000, rate: 27.5, fixed: 597_000 },
    { min: 7_000_001, max: null, rate: 30, fixed: 1_422_000 },
  ],
  '2016-2017': [
    { min: 0, max: 400_000, rate: 0, fixed: 0 },
    { min: 400_001, max: 500_000, rate: 2, fixed: 0 },
    { min: 500_001, max: 750_000, rate: 5, fixed: 2000 },
    { min: 750_001, max: 1_400_000, rate: 10, fixed: 14_500 },
    { min: 1_400_001, max: 1_500_000, rate: 12.5, fixed: 79_500 },
    { min: 1_500_001, max: 1_800_000, rate: 15, fixed: 92_000 },
    { min: 1_800_001, max: 2_500_000, rate: 17.5, fixed: 137_000 },
    { min: 2_500_001, max: 3_000_000, rate: 20, fixed: 259_500 },
    { min: 3_000_001, max: 3_500_000, rate: 22.5, fixed: 359_500 },
    { min: 3_500_001, max: 4_000_000, rate: 25, fixed: 472_000 },
    { min: 4_000_001, max: 7_000_000, rate: 27.5, fixed: 597_000 },
    { min: 7_000_001, max: null, rate: 30, fixed: 1_422_000 },
  ],
  '2015-2016': [
    { min: 0, max: 400_000, rate: 0, fixed: 0 },
    { min: 400_001, max: 500_000, rate: 2, fixed: 0 },
    { min: 500_001, max: 750_000, rate: 5, fixed: 2000 },
    { min: 750_001, max: 1_400_000, rate: 10, fixed: 14_500 },
    { min: 1_400_001, max: 1_500_000, rate: 12.5, fixed: 79_500 },
    { min: 1_500_001, max: 1_800_000, rate: 15, fixed: 92_000 },
    { min: 1_800_001, max: 2_500_000, rate: 17.5, fixed: 137_000 },
    { min: 2_500_001, max: 3_000_000, rate: 20, fixed: 259_500 },
    { min: 3_000_001, max: 3_500_000, rate: 22.5, fixed: 359_500 },
    { min: 3_500_001, max: 4_000_000, rate: 25, fixed: 472_000 },
    { min: 4_000_001, max: 7_000_000, rate: 27.5, fixed: 597_000 },
    { min: 7_000_001, max: null, rate: 30, fixed: 1_422_000 },
  ],
  '2014-2015': [
    { min: 0, max: 400_000, rate: 0, fixed: 0 },
    { min: 400_001, max: 750_000, rate: 5, fixed: 0 },
    { min: 750_001, max: 1_400_000, rate: 10, fixed: 17_500 },
    { min: 1_400_001, max: 1_500_000, rate: 12.5, fixed: 82_500 },
    { min: 1_500_001, max: 1_800_000, rate: 15, fixed: 95_000 },
    { min: 1_800_001, max: 2_500_000, rate: 17.5, fixed: 140_000 },
    { min: 2_500_001, max: 3_000_000, rate: 20, fixed: 262_500 },
    { min: 3_000_001, max: 3_500_000, rate: 22.5, fixed: 362_500 },
    { min: 3_500_001, max: 4_000_000, rate: 25, fixed: 475_000 },
    { min: 4_000_001, max: 7_000_000, rate: 27.5, fixed: 600_000 },
    { min: 7_000_001, max: null, rate: 30, fixed: 1_425_000 },
  ],
};

/** The §4AB surcharge as it stood for salary income in one fiscal year. */
export interface SalarySurcharge {
  /** Share of the slab tax added on top, e.g. `0.09` for nine percent. */
  rate: number;
  /** Annual taxable income the surcharge starts *above*, not at. */
  threshold: number;
}

export interface SalaryTaxBreakdown {
  /** Progressive slab tax, before the surcharge. */
  baseTax: number;
  /** §4AB surcharge, `0` in a year or below an income where it does not apply. */
  surcharge: number;
  /** What is actually owed: `baseTax + surcharge`. */
  totalTax: number;
}

/**
 * §4AB surcharge on the slab tax for a salaried individual, by fiscal year.
 *
 * §4AB was inserted by the Finance Act 2024 at ten percent of the tax imposed
 * under Division I of Part I of the First Schedule "where the taxable income
 * exceeds rupees ten million", for every individual and AOP — no salaried
 * carve-out existed yet, so FY 2024-25 salaries above the threshold pay it. The
 * Finance Act 2025 added a proviso cutting the salaried rate to nine percent,
 * and the Finance Act 2026 replaced that proviso with "no surcharge shall be
 * payable". A year that is absent from this table charges no surcharge.
 *
 * Non-salaried individuals and AOPs keep the flat ten percent throughout — that
 * is the business/AOP calculator's own `BUSINESS_SURCHARGE`, not this table.
 */
export const salarySurcharges: Record<string, SalarySurcharge> = {
  '2025-2026': { rate: 0.09, threshold: 10_000_000 },
  '2024-2025': { rate: 0.1, threshold: 10_000_000 },
};

/** The §4AB surcharge for a salary year, or `null` where none applied. */
export function getSalarySurcharge(fiscalYear: string): SalarySurcharge | null {
  return salarySurcharges[fiscalYear] ?? null;
}

function calculateTax2018_2019(totalAmount: number): number {
  if (totalAmount <= 400_000) {
    return 0;
  }
  if (totalAmount <= 800_000) {
    return 1000;
  }
  if (totalAmount <= 1_200_000) {
    return 2000;
  }
  if (totalAmount <= 2_500_000) {
    return Math.max(2000, (totalAmount - 1_200_000) * 0.05);
  }
  if (totalAmount <= 4_000_000) {
    return 65_000 + (totalAmount - 2_500_000) * 0.15;
  }
  if (totalAmount <= 8_000_000) {
    return 290_000 + (totalAmount - 4_000_000) * 0.2;
  }
  return 1_090_000 + (totalAmount - 8_000_000) * 0.25;
}

/**
 * Calculate tax for a specific total amount using the appropriate tax bracket
 * @param totalAmount The total income amount to calculate tax on
 * @param fiscalYear The fiscal year to use for tax brackets
 * @returns The calculated tax amount
 */
export function calculateTaxForTotalAmount(totalAmount: number, fiscalYear: string): number {
  if (fiscalYear === '2018-2019') {
    return Math.round(calculateTax2018_2019(totalAmount));
  }

  const slabs = taxSlabs[fiscalYear] || taxSlabs['2026-2027'];

  return Math.round(calcSlabTax(totalAmount, slabs));
}

/**
 * The one entry point for salary tax: the progressive slab tax plus the §4AB
 * surcharge for that year. Every salary calculator — both home tabs, the embed,
 * reverse salary, increment/job offer and the budget comparison — goes through
 * this, so the surcharge cannot be applied on one page and skipped on another.
 */
export function salaryTaxForYear(annualGross: number, fiscalYear: string): SalaryTaxBreakdown {
  const baseTax = calculateTaxForTotalAmount(annualGross, fiscalYear);
  const surchargeRule = getSalarySurcharge(fiscalYear);
  const surcharge =
    surchargeRule && annualGross > surchargeRule.threshold
      ? Math.round(baseTax * surchargeRule.rate)
      : 0;

  return { baseTax, surcharge, totalTax: baseTax + surcharge };
}
