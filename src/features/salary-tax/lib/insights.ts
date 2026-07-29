import { calculateBudgetYearTax, getPreviousFiscalYear } from '@/lib/budgetComparison';

import { calculateTaxForTotalAmount, taxSlabs } from '@/utils/taxCalculator';

import type {
  FiscalComparisonRow,
  FiscalComparisonSummary,
  SalaryAllocation,
  SalaryInsightPeriod,
  SalaryPeriodBreakdown,
  SalaryTaxResult,
  TaxBandContribution,
  TaxBandInsights,
} from '@/features/salary-tax/types';

const COMPARISON_YEAR_COUNT = 4;
const TRAILING_DOUBLE_ZERO = /\.00$/;
const TRAILING_SINGLE_ZERO = /(\.\d)0$/;

function clampPercentage(value: number): number {
  return Math.min(100, Math.max(0, value));
}

function trimDecimal(value: string): string {
  return value.replace(TRAILING_DOUBLE_ZERO, '').replace(TRAILING_SINGLE_ZERO, '$1');
}

function formatThreshold(value: number): string {
  if (value >= 1_000_000) {
    return `${trimDecimal((value / 1_000_000).toFixed(2))}M`;
  }

  return `${Math.round(value / 1000)}K`;
}

function formatBandLabel(min: number, max: number | null): string {
  if (min === 0 && max !== null) {
    return `Up to Rs. ${formatThreshold(max)}`;
  }

  if (max === null) {
    return `Above Rs. ${formatThreshold(min - 1)}`;
  }

  return `Rs. ${formatThreshold(min - 1)}–${formatThreshold(max)}`;
}

function getComparisonYears(selectedYear: string): string[] {
  const fiscalYears = Object.keys(taxSlabs);
  const selectedIndex = fiscalYears.indexOf(selectedYear);
  const safeIndex = selectedIndex === -1 ? 0 : selectedIndex;
  const latestStart = Math.max(0, fiscalYears.length - COMPARISON_YEAR_COUNT);
  const startIndex = Math.min(safeIndex, latestStart);

  return fiscalYears.slice(startIndex, startIndex + COMPARISON_YEAR_COUNT).reverse();
}

export function formatFiscalYear(fiscalYear: string, includePrefix = true): string {
  const [start, end] = fiscalYear.split('-');
  const value = `${start}–${end?.slice(-2) ?? ''}`;
  return includePrefix ? `FY ${value}` : value;
}

export function formatPkr(value: number): string {
  return `Rs. ${Math.round(value).toLocaleString('en-PK')}`;
}

export function formatCompactPkr(value: number): string {
  const absoluteValue = Math.abs(value);

  if (absoluteValue >= 1_000_000) {
    return `Rs. ${trimDecimal((value / 1_000_000).toFixed(2))}M`;
  }

  if (absoluteValue >= 1000) {
    return `Rs. ${trimDecimal((value / 1000).toFixed(1))}K`;
  }

  return formatPkr(value);
}

export function getSalaryAllocation(result: SalaryTaxResult): SalaryAllocation {
  const taxPercent = clampPercentage(result.taxRate);

  return {
    takeHomePercent: 100 - taxPercent,
    taxPercent,
  };
}

export function getSalaryPeriodBreakdown(
  result: SalaryTaxResult,
  period: SalaryInsightPeriod,
): SalaryPeriodBreakdown {
  const allocation = getSalaryAllocation(result);

  if (period === 'annual') {
    return {
      ...allocation,
      gross: result.yearlyIncome,
      net: result.yearlyIncomeAfterTax,
      periodLabel: 'Annual',
      secondaryNet: result.salaryAfterTax,
      secondaryPeriodLabel: 'per month',
      tax: result.yearlyTax,
    };
  }

  return {
    ...allocation,
    gross: result.monthlyIncome,
    net: result.salaryAfterTax,
    periodLabel: 'Monthly',
    secondaryNet: result.yearlyIncomeAfterTax,
    secondaryPeriodLabel: 'per year',
    tax: result.monthlyTax,
  };
}

export function getActiveTaxBand(fiscalYear: string, annualIncome: number) {
  const slabs = taxSlabs[fiscalYear] ?? taxSlabs['2026-2027'];
  const activeSlab = slabs.find(
    (slab) => annualIncome >= slab.min && (slab.max === null || annualIncome <= slab.max),
  );
  const fallbackSlab = slabs.at(-1);
  const slab = activeSlab ?? fallbackSlab;

  return {
    label: slab ? formatBandLabel(slab.min, slab.max) : 'Not available',
    rate: slab?.rate ?? 0,
  };
}

export function getFiscalComparisonRows(
  monthlySalary: number,
  selectedYear: string,
): FiscalComparisonRow[] {
  return getComparisonYears(selectedYear).map((fiscalYear) => {
    const result = calculateBudgetYearTax(monthlySalary, fiscalYear);
    const taxPercent = clampPercentage(result.effectiveRate);

    return {
      fiscalYear,
      fiscalYearLabel: formatFiscalYear(fiscalYear, false),
      isSelected: fiscalYear === selectedYear,
      takeHome: result.yearlyTakeHome,
      takeHomePercent: 100 - taxPercent,
      tax: result.yearlyTax,
      taxPercent,
    };
  });
}

export function getFiscalComparisonSummary(
  rows: FiscalComparisonRow[],
  selectedYear: string,
): FiscalComparisonSummary | null {
  const selected = rows.find((row) => row.isSelected);
  const previousYear = getPreviousFiscalYear(selectedYear);
  const baseline =
    rows.find((row) => row.fiscalYear === previousYear) ?? rows.find((row) => !row.isSelected);

  if (!(selected && baseline)) {
    return null;
  }

  const difference = selected.tax - baseline.tax;
  let outcome: FiscalComparisonSummary['outcome'] = 'same';

  if (difference < 0) {
    outcome = 'save';
  } else if (difference > 0) {
    outcome = 'pay-more';
  }

  return {
    annualDifference: Math.abs(difference),
    comparisonYearLabel: formatFiscalYear(baseline.fiscalYear),
    monthlyDifference: Math.round(Math.abs(difference) / 12),
    outcome,
  };
}

export function getFiscalComparisonPeriodAmount(
  annualAmount: number,
  period: SalaryInsightPeriod,
): number {
  return period === 'monthly' ? annualAmount / 12 : annualAmount;
}

export function getFiscalComparisonSecondaryAmount(
  summary: FiscalComparisonSummary,
  period: SalaryInsightPeriod,
): number {
  return period === 'monthly' ? summary.annualDifference : summary.monthlyDifference;
}

export function getTaxBandInsights(result: SalaryTaxResult, selectedYear: string): TaxBandInsights {
  const slabs = taxSlabs[selectedYear] ?? taxSlabs['2026-2027'];
  const rawRows: Omit<TaxBandContribution, 'barPercent'>[] = [];
  let previousTax = 0;

  for (const slab of slabs) {
    const isReached = result.yearlyIncome >= slab.min;
    const cappedIncome =
      slab.max === null ? result.yearlyIncome : Math.min(result.yearlyIncome, slab.max);
    const cumulativeTax = isReached
      ? calculateTaxForTotalAmount(cappedIncome, selectedYear)
      : previousTax;
    const contribution = Math.max(0, cumulativeTax - previousTax);
    const isActive =
      result.yearlyIncome >= slab.min && (slab.max === null || result.yearlyIncome <= slab.max);

    rawRows.push({
      contribution,
      isActive,
      label: formatBandLabel(slab.min, slab.max),
      rate: slab.rate,
    });

    if (isReached) {
      previousTax = cumulativeTax;
    }
  }

  const maximumContribution = Math.max(...rawRows.map((row) => row.contribution), 1);
  const rows = rawRows.map((row) => ({
    ...row,
    barPercent: (row.contribution / maximumContribution) * 100,
  }));
  const activeRow = rows.find((row) => row.isActive) ?? rows.at(-1);
  const surcharge = result.surcharge ?? 0;
  const baseTax = result.baseTax ?? result.yearlyTax - surcharge;

  return {
    activeBandLabel: activeRow?.label ?? 'Not available',
    activeRate: activeRow?.rate ?? 0,
    annualIncome: result.yearlyIncome,
    baseTax,
    effectiveRate: result.taxRate,
    fiscalYearLabel: formatFiscalYear(selectedYear),
    rows,
    surcharge,
    totalTax: result.yearlyTax,
  };
}
