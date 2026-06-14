import { calculateTax, taxSlabs } from '@/utils/taxCalculator';

export const BUDGET_YEARS = {
  previous: '2025-2026',
  current: '2026-2027',
} as const;

/** 9% surcharge on income tax when annual income exceeds PKR 10M (Finance Act 2025). */
export const FY_2025_26_SURCHARGE_RATE = 0.09;
export const FY_2025_26_SURCHARGE_THRESHOLD = 10_000_000;

export const BUDGET_SUMMARY = {
  financeBill: 'Finance Bill 2026',
  effectiveFrom: '1 July 2026',
  previousAct: 'Finance Act 2025',
  slabCountPrevious: 6,
  slabCountCurrent: 8,
  unchangedThresholdMonthly: 183_000,
} as const;

export interface BudgetChangeItem {
  title: string;
  detail: string;
}

export const BUDGET_KEY_CHANGES: BudgetChangeItem[] = [
  {
    title: 'Slabs restructured from 6 to 8',
    detail:
      'The salaried class moves from six bands to eight, with new intermediate rates of 25%, 29% and 32% to smooth marginal-rate jumps for middle-income earners.',
  },
  {
    title: 'PKR 2.2M–3.2M band: 23% → 20%',
    detail:
      'Annual income between Rs. 2.2 million and Rs. 3.2 million is taxed at 20% instead of 23% (Rs. 116,000 + 20% of amount exceeding Rs. 2.2 million).',
  },
  {
    title: 'PKR 3.2M–4.1M band: 30% → 25%',
    detail:
      'Income between Rs. 3.2 million and Rs. 4.1 million drops from 30% to 25% (Rs. 316,000 + 25% of amount exceeding Rs. 3.2 million).',
  },
  {
    title: 'PKR 4.1M–5.6M: new 29% band (was 35%)',
    detail:
      'Previously all income above Rs. 4.1 million faced 35%. Under Budget 2026-27, Rs. 4.1M–5.6M is taxed at 29% (Rs. 541,000 + 29% above Rs. 4.1 million).',
  },
  {
    title: 'PKR 5.6M–7M: new 32% band (was 35%)',
    detail:
      'A new 32% band applies from Rs. 5.6 million to Rs. 7 million (Rs. 976,000 + 32% above Rs. 5.6 million).',
  },
  {
    title: '35% top rate now starts above PKR 7M',
    detail:
      'The maximum 35% marginal rate previously applied above Rs. 4.1 million; it now applies only above Rs. 7 million (Rs. 1,424,000 + 35% above Rs. 7 million).',
  },
  {
    title: '9% surcharge abolished above PKR 10M',
    detail:
      'Under FY 2025-26, salaried individuals with annual income above Rs. 10 million pay a 9% surcharge on their income tax (reduced from 10% in the prior year). Finance Bill 2026 proposes abolishing this surcharge entirely.',
  },
  {
    title: 'Lower slabs unchanged',
    detail:
      'The tax-free threshold (up to Rs. 600,000), the 1% band (Rs. 600,001–1.2M) and the 11% band (Rs. 1.2M–2.2M) remain the same in both years.',
  },
];

export interface SlabComparisonRow {
  incomeBand: string;
  ratePrevious: string;
  rateCurrent: string;
  change: 'unchanged' | 'reduced' | 'restructured';
  changeLabel: string;
}

export const SLAB_COMPARISON_ROWS: SlabComparisonRow[] = [
  {
    incomeBand: 'Up to Rs. 600,000',
    ratePrevious: '0%',
    rateCurrent: '0%',
    change: 'unchanged',
    changeLabel: 'No change',
  },
  {
    incomeBand: 'Rs. 600,001 – 1,200,000',
    ratePrevious: '1%',
    rateCurrent: '1%',
    change: 'unchanged',
    changeLabel: 'No change',
  },
  {
    incomeBand: 'Rs. 1,200,001 – 2,200,000',
    ratePrevious: '11%',
    rateCurrent: '11%',
    change: 'unchanged',
    changeLabel: 'No change',
  },
  {
    incomeBand: 'Rs. 2,200,001 – 3,200,000',
    ratePrevious: '23%',
    rateCurrent: '20%',
    change: 'reduced',
    changeLabel: '−3 percentage points',
  },
  {
    incomeBand: 'Rs. 3,200,001 – 4,100,000',
    ratePrevious: '30%',
    rateCurrent: '25%',
    change: 'reduced',
    changeLabel: '−5 percentage points',
  },
  {
    incomeBand: 'Rs. 4,100,001 – 5,600,000',
    ratePrevious: '35%',
    rateCurrent: '29%',
    change: 'reduced',
    changeLabel: '−6 percentage points',
  },
  {
    incomeBand: 'Rs. 5,600,001 – 7,000,000',
    ratePrevious: '35%',
    rateCurrent: '32%',
    change: 'restructured',
    changeLabel: 'New band (was 35%)',
  },
  {
    incomeBand: 'Above Rs. 7,000,000',
    ratePrevious: '35%',
    rateCurrent: '35%',
    change: 'restructured',
    changeLabel: 'Same rate; threshold raised',
  },
];

export interface SlabRow {
  range: string;
  rate: string;
}

export interface BudgetExampleRow {
  monthlySalary: number;
  annualIncome: number;
  taxPrevious: number;
  taxCurrent: number;
  monthlyTaxPrevious: number;
  monthlyTaxCurrent: number;
  annualSavings: number;
  monthlySavings: number;
  surchargePrevious: number;
}

/** Representative monthly salaries spanning no-change, relief, and surcharge bands. */
export const EXAMPLE_MONTHLY_SALARIES = [
  100_000, 125_000, 150_000, 175_000, 200_000, 225_000, 250_000, 300_000, 350_000, 400_000, 450_000,
  500_000, 600_000, 750_000, 833_333, 900_000, 1_000_000,
] as const;

function formatPkr(value: number): string {
  return `Rs. ${value.toLocaleString('en-PK')}`;
}

function formatSlabRange(min: number, max: number | null): string {
  if (min === 0 && max !== null) return `Up to ${formatPkr(max)}`;
  if (max === null) return `Above ${formatPkr(min - 1)}`;
  return `${formatPkr(min)} – ${formatPkr(max)}`;
}

function formatSlabRate(slab: { rate: number; fixed: number; min: number }): string {
  if (slab.rate === 0) return '0%';
  if (slab.fixed === 0) return `${slab.rate}%`;
  return `${formatPkr(slab.fixed)} + ${slab.rate}% above ${formatPkr(slab.min - 1)}`;
}

export function getSlabRows(fiscalYear: string): SlabRow[] {
  const slabs = taxSlabs[fiscalYear] ?? [];
  return slabs.map((slab) => ({
    range: formatSlabRange(slab.min, slab.max),
    rate: formatSlabRate(slab),
  }));
}

/** FY 2025-26 tax including 9% surcharge when annual income exceeds PKR 10 million. */
export function calculateBudgetYearTax(monthlySalary: number, fiscalYear: string) {
  const result = calculateTax(monthlySalary, fiscalYear);
  let surcharge = 0;

  if (
    fiscalYear === BUDGET_YEARS.previous &&
    result.yearlyIncome > FY_2025_26_SURCHARGE_THRESHOLD
  ) {
    surcharge = Math.round(result.yearlyTax * FY_2025_26_SURCHARGE_RATE);
  }

  const totalYearlyTax = result.yearlyTax + surcharge;

  return {
    yearlyIncome: result.yearlyIncome,
    baseTax: result.yearlyTax,
    surcharge,
    yearlyTax: totalYearlyTax,
    monthlyTax: Math.round(totalYearlyTax / 12),
    yearlyTakeHome: result.yearlyIncome - totalYearlyTax,
    monthlyTakeHome: Math.round(monthlySalary - totalYearlyTax / 12),
    effectiveRate: (totalYearlyTax / result.yearlyIncome) * 100,
  };
}

export function getBudgetComparisonExamples(): BudgetExampleRow[] {
  return EXAMPLE_MONTHLY_SALARIES.map((monthlySalary) => {
    const previous = calculateBudgetYearTax(monthlySalary, BUDGET_YEARS.previous);
    const current = calculateBudgetYearTax(monthlySalary, BUDGET_YEARS.current);
    const annualSavings = previous.yearlyTax - current.yearlyTax;

    return {
      monthlySalary,
      annualIncome: monthlySalary * 12,
      taxPrevious: previous.yearlyTax,
      taxCurrent: current.yearlyTax,
      monthlyTaxPrevious: previous.monthlyTax,
      monthlyTaxCurrent: current.monthlyTax,
      annualSavings,
      monthlySavings: Math.round(annualSavings / 12),
      surchargePrevious: previous.surcharge,
    };
  });
}

export type BudgetYearComparison =
  | { type: 'save'; monthlyAmount: number; annualAmount: number; previousYear: string }
  | { type: 'pay-more'; monthlyAmount: number; annualAmount: number; previousYear: string };

export function getPreviousFiscalYear(fiscalYear: string): string | null {
  const startYear = Number.parseInt(fiscalYear.split('-')[0] ?? '', 10);
  if (Number.isNaN(startYear)) return null;

  const previousYear = `${startYear - 1}-${startYear}`;
  return previousYear in taxSlabs ? previousYear : null;
}

/** Compare selected fiscal year tax against the immediately preceding fiscal year. */
export function compareWithPreviousFiscalYear(
  monthlySalary: number,
  selectedYear: string,
): BudgetYearComparison | null {
  const previousYear = getPreviousFiscalYear(selectedYear);
  if (!previousYear) return null;

  const baseline = calculateBudgetYearTax(monthlySalary, previousYear);
  const selected = calculateBudgetYearTax(monthlySalary, selectedYear);
  const annualDiff = selected.yearlyTax - baseline.yearlyTax;
  const monthlyAmount = Math.round(Math.abs(annualDiff) / 12);

  if (monthlyAmount === 0) return null;

  return annualDiff > 0
    ? { type: 'pay-more', monthlyAmount, annualAmount: annualDiff, previousYear }
    : { type: 'save', monthlyAmount, annualAmount: Math.abs(annualDiff), previousYear };
}

export { formatPkr };
