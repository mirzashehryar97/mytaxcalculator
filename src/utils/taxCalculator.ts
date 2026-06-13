interface TaxBracket {
  min: number;
  max: number | null;
  rate: number;
  fixed: number;
}

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

interface TaxCalculation {
  monthlyIncome: number;
  monthlyTax: number;
  salaryAfterTax: number;
  yearlyIncome: number;
  yearlyTax: number;
  yearlyIncomeAfterTax: number;
  taxRate: number;
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

function findTaxBracket(slabs: TaxBracket[], totalAmount: number): TaxBracket {
  for (const slab of slabs) {
    if (totalAmount >= slab.min && (!slab.max || totalAmount <= slab.max)) {
      return slab;
    }
  }

  return slabs.at(-1) ?? slabs[0];
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
  const taxBracket = findTaxBracket(slabs, totalAmount);
  const tax = taxBracket.fixed + (totalAmount - taxBracket.min) * (taxBracket.rate / 100);

  return Math.round(tax);
}

/**
 * Calculate tax based on monthly salary
 * @param monthlySalary The monthly salary amount
 * @param fiscalYear The fiscal year to use for tax brackets
 * @param months Optional: Number of months to calculate for (defaults to 12)
 * @returns A complete tax calculation result
 */
export function calculateTax(
  monthlySalary: number,
  fiscalYear: string,
  months = 12,
): TaxCalculation {
  // Calculate the total income for the specified number of months
  const totalIncome = monthlySalary * months;

  // Calculate tax on the total income
  const yearlyTax = calculateTaxForTotalAmount(totalIncome, fiscalYear);

  // Calculate monthly tax (for display purposes)
  const monthlyTax = yearlyTax / months;

  // Calculate tax rate
  const taxRate = (yearlyTax / totalIncome) * 100;

  return {
    monthlyIncome: monthlySalary,
    monthlyTax: Math.round(monthlyTax),
    salaryAfterTax: Math.round(monthlySalary - monthlyTax),
    yearlyIncome: Math.round(totalIncome),
    yearlyTax: Math.round(yearlyTax),
    yearlyIncomeAfterTax: Math.round(totalIncome - yearlyTax),
    taxRate,
  };
}
