import { SALARY_COMPARISON_RESULT_COPY } from '@/features/salary-increment/lib/content';
import type { SalaryComparison } from '@/features/salary-increment/types';

export type ComparisonDirection = 'increase' | 'decrease' | 'same';
export type ComparisonValueTone = 'positive' | 'negative' | 'neutral';

export interface SalaryComparisonPresentation {
  variant: ComparisonDirection;
  badgeLabel: string;
  grossLead: string;
  grossAmount: number | null;
  takeHomeLead: string;
  takeHomeMonthlyAmount: number | null;
  takeHomeAnnualAmount: number;
  annualSuffix: string;
  monthlyTakeHomeLabel: string;
  annualTakeHomeLabel: string;
  takeHomeTone: ComparisonValueTone;
  monthlyTaxLabel: string;
  annualTaxLabel: string;
  taxTone: ComparisonValueTone;
  monthlyTaxAmount: number;
  annualTaxAmount: number;
}

function getDirection(value: number): ComparisonDirection {
  if (value > 0) {
    return 'increase';
  }
  if (value < 0) {
    return 'decrease';
  }
  return 'same';
}

function getTakeHomeLabels(direction: ComparisonDirection) {
  if (direction === 'increase') {
    return {
      badgeLabel: SALARY_COMPARISON_RESULT_COPY.improvementTitle,
      connector: SALARY_COMPARISON_RESULT_COPY.takeHomeIncreaseConnector,
      monthlyLabel: SALARY_COMPARISON_RESULT_COPY.extraMonthlyTakeHome,
      annualLabel: SALARY_COMPARISON_RESULT_COPY.extraAnnualTakeHome,
      annualSuffix: SALARY_COMPARISON_RESULT_COPY.moreTakeHomePerYear,
      tone: 'positive',
    } as const;
  }
  if (direction === 'decrease') {
    return {
      badgeLabel: SALARY_COMPARISON_RESULT_COPY.decreaseTitle,
      connector: SALARY_COMPARISON_RESULT_COPY.takeHomeDecreaseConnector,
      monthlyLabel: SALARY_COMPARISON_RESULT_COPY.monthlyTakeHomeDecrease,
      annualLabel: SALARY_COMPARISON_RESULT_COPY.annualTakeHomeDecrease,
      annualSuffix: SALARY_COMPARISON_RESULT_COPY.lessTakeHomePerYear,
      tone: 'negative',
    } as const;
  }
  return {
    badgeLabel: SALARY_COMPARISON_RESULT_COPY.unchangedTitle,
    connector: SALARY_COMPARISON_RESULT_COPY.takeHomeUnchangedConnector,
    monthlyLabel: SALARY_COMPARISON_RESULT_COPY.noMonthlyTakeHomeChange,
    annualLabel: SALARY_COMPARISON_RESULT_COPY.noAnnualTakeHomeChange,
    annualSuffix: SALARY_COMPARISON_RESULT_COPY.moreTakeHomePerYear,
    tone: 'neutral',
  } as const;
}

function getTaxLabels(direction: ComparisonDirection) {
  if (direction === 'increase') {
    return {
      monthlyLabel: SALARY_COMPARISON_RESULT_COPY.extraMonthlyTax,
      annualLabel: SALARY_COMPARISON_RESULT_COPY.extraAnnualTax,
      tone: 'negative',
    } as const;
  }
  if (direction === 'decrease') {
    return {
      monthlyLabel: SALARY_COMPARISON_RESULT_COPY.monthlyTaxReduction,
      annualLabel: SALARY_COMPARISON_RESULT_COPY.annualTaxReduction,
      tone: 'positive',
    } as const;
  }
  return {
    monthlyLabel: SALARY_COMPARISON_RESULT_COPY.noMonthlyTaxChange,
    annualLabel: SALARY_COMPARISON_RESULT_COPY.noAnnualTaxChange,
    tone: 'neutral',
  } as const;
}

function getGrossLead(comparison: SalaryComparison, direction: ComparisonDirection): string {
  if (comparison.mode === 'increment') {
    if (direction === 'increase') {
      return SALARY_COMPARISON_RESULT_COPY.incrementIncreaseLead;
    }
    if (direction === 'decrease') {
      return SALARY_COMPARISON_RESULT_COPY.incrementDecreaseLead;
    }
    return SALARY_COMPARISON_RESULT_COPY.incrementUnchangedLead;
  }

  if (direction === 'increase') {
    return SALARY_COMPARISON_RESULT_COPY.jobOfferIncreaseLead;
  }
  if (direction === 'decrease') {
    return SALARY_COMPARISON_RESULT_COPY.jobOfferDecreaseLead;
  }
  return SALARY_COMPARISON_RESULT_COPY.jobOfferUnchangedLead;
}

export function buildSalaryComparisonPresentation(
  comparison: SalaryComparison,
): SalaryComparisonPresentation {
  const grossDirection = getDirection(comparison.grossIncreaseMonthly);
  const takeHomeDirection = getDirection(comparison.takeHomeIncreaseMonthly);
  const taxDirection = getDirection(comparison.extraMonthlyTax);
  const takeHomeLabels = getTakeHomeLabels(takeHomeDirection);
  const taxLabels = getTaxLabels(taxDirection);

  return {
    variant: takeHomeDirection,
    badgeLabel: takeHomeLabels.badgeLabel,
    grossLead: getGrossLead(comparison, grossDirection),
    grossAmount: grossDirection === 'same' ? null : Math.abs(comparison.grossIncreaseMonthly),
    takeHomeLead: takeHomeLabels.connector,
    takeHomeMonthlyAmount:
      takeHomeDirection === 'same' ? null : Math.abs(comparison.takeHomeIncreaseMonthly),
    takeHomeAnnualAmount: Math.abs(comparison.takeHomeIncreaseAnnual),
    annualSuffix: takeHomeLabels.annualSuffix,
    monthlyTakeHomeLabel: takeHomeLabels.monthlyLabel,
    annualTakeHomeLabel: takeHomeLabels.annualLabel,
    takeHomeTone: takeHomeLabels.tone,
    monthlyTaxLabel: taxLabels.monthlyLabel,
    annualTaxLabel: taxLabels.annualLabel,
    taxTone: taxLabels.tone,
    monthlyTaxAmount: Math.abs(comparison.extraMonthlyTax),
    annualTaxAmount: Math.abs(comparison.extraAnnualTax),
  };
}
