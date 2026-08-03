import { findTaxBracket, isBandReached } from '@/utils/slabEngine';
import { calculateTaxForTotalAmount, taxSlabs } from '@/utils/taxCalculator';

import type {
  SalaryComparison,
  SalaryComparisonInsightPeriod,
  SalaryComparisonInsightSummary,
  SalaryComparisonTaxBandImpact,
  SalaryComparisonTaxBandRow,
  SalaryScenario,
  SalaryScenarioPeriodBreakdown,
  SalaryScenarioTaxBandInsights,
} from '@/features/salary-increment/types';

const MONTHS_IN_YEAR = 12;
const DEFAULT_FISCAL_YEAR = '2026-2027';

function getPeriodMultiplier(period: SalaryComparisonInsightPeriod): number {
  return period === 'annual' ? MONTHS_IN_YEAR : 1;
}

function getPercentageChange(current: number, next: number): number {
  return current === 0 ? 0 : ((next - current) / Math.abs(current)) * 100;
}

function toPeriodBreakdown(
  scenario: SalaryScenario,
  period: SalaryComparisonInsightPeriod,
): SalaryScenarioPeriodBreakdown {
  const multiplier = getPeriodMultiplier(period);

  return {
    gross: scenario.grossMonthly * multiplier,
    tax: scenario.monthlyTax * multiplier,
    deductions: scenario.deductionMonthly * multiplier,
    takeHome: scenario.netMonthly * multiplier,
  };
}

function formatThreshold(value: number): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toLocaleString('en-PK', { maximumFractionDigits: 2 })}M`;
  }

  return `${Math.round(value / 1000)}K`;
}

function formatBandLabel(min: number, max: number | null): string {
  if (min === 0 && max !== null) {
    return `Up to Rs. ${formatThreshold(max)}`;
  }

  if (max === null) {
    return `Above Rs. ${formatThreshold(min)}`;
  }

  return `Rs. ${formatThreshold(min)}–${formatThreshold(max)}`;
}

export function getSalaryComparisonInsightSummary(
  comparison: SalaryComparison,
  period: SalaryComparisonInsightPeriod,
): SalaryComparisonInsightSummary {
  const current = toPeriodBreakdown(comparison.current, period);
  const next = toPeriodBreakdown(comparison.next, period);
  const grossChange = next.gross - current.gross;
  const takeHomeChange = next.takeHome - current.takeHome;

  return {
    current,
    next,
    grossChange,
    takeHomeChange,
    grossGrowthPercent: getPercentageChange(current.gross, next.gross),
    takeHomeGrowthPercent: getPercentageChange(current.takeHome, next.takeHome),
  };
}

function getScenarioTaxBandInsights(
  annualIncome: number,
  annualTax: number,
  fiscalYear: string,
  period: SalaryComparisonInsightPeriod,
): SalaryScenarioTaxBandInsights {
  const slabs = taxSlabs[fiscalYear] ?? taxSlabs[DEFAULT_FISCAL_YEAR];
  const activeSlab = findTaxBracket(slabs, annualIncome);
  const divisor = period === 'annual' ? 1 : MONTHS_IN_YEAR;
  let previousTax = 0;

  const rows = slabs.map((slab): SalaryComparisonTaxBandRow => {
    const isReached = isBandReached(slab, annualIncome);
    const cappedIncome = slab.max === null ? annualIncome : Math.min(annualIncome, slab.max);
    const cumulativeTax = isReached
      ? calculateTaxForTotalAmount(cappedIncome, fiscalYear)
      : previousTax;
    const contribution = Math.max(0, cumulativeTax - previousTax);

    if (isReached) {
      previousTax = cumulativeTax;
    }

    return {
      barPercent: 0,
      contribution: contribution / divisor,
      isActive: slab === activeSlab,
      label: formatBandLabel(slab.min, slab.max),
      rate: slab.rate,
    };
  });
  const activeRow = rows.find((row) => row.isActive) ?? rows.at(-1);
  const baseTax = calculateTaxForTotalAmount(annualIncome, fiscalYear);

  return {
    activeBandLabel: activeRow?.label ?? 'Not available',
    activeRate: activeRow?.rate ?? 0,
    rows,
    surcharge: Math.max(0, annualTax - baseTax) / divisor,
    taxableIncome: annualIncome / divisor,
    totalTax: annualTax / divisor,
  };
}

function applySharedTaxBandScale(
  current: SalaryScenarioTaxBandInsights,
  next: SalaryScenarioTaxBandInsights,
): [SalaryScenarioTaxBandInsights, SalaryScenarioTaxBandInsights] {
  const maximumContribution = Math.max(
    ...current.rows.map((row) => row.contribution),
    ...next.rows.map((row) => row.contribution),
    1,
  );
  const withScaledRows = (insights: SalaryScenarioTaxBandInsights) => ({
    ...insights,
    rows: insights.rows.map((row) => ({
      ...row,
      barPercent: (row.contribution / maximumContribution) * 100,
    })),
  });

  return [withScaledRows(current), withScaledRows(next)];
}

export function getSalaryComparisonTaxBandImpact(
  comparison: SalaryComparison,
  period: SalaryComparisonInsightPeriod,
): SalaryComparisonTaxBandImpact {
  const currentInsights = getScenarioTaxBandInsights(
    comparison.current.annualGross,
    comparison.current.annualTax,
    comparison.fiscalYear,
    period,
  );
  const nextInsights = getScenarioTaxBandInsights(
    comparison.next.annualGross,
    comparison.next.annualTax,
    comparison.fiscalYear,
    period,
  );
  const [current, next] = applySharedTaxBandScale(currentInsights, nextInsights);

  return {
    current,
    next,
    crossedBand: current.activeBandLabel !== next.activeBandLabel,
    taxChange: next.totalTax - current.totalTax,
  };
}
