import {
  MULTI_YEAR_CHART_COPY,
  MULTI_YEAR_NOTE_COPY,
  MULTI_YEAR_RESULT_COPY,
  MULTI_YEAR_SUMMARY_LABELS,
} from '@/features/multi-year-tax/lib/content';
import { getSupportedRangeLabel } from '@/features/multi-year-tax/lib/dateOptions';
import {
  formatCompactPkr,
  formatMonths,
  formatPercent,
  formatPkr,
} from '@/features/multi-year-tax/lib/formatting';
import type {
  BreakdownRow,
  ComparisonBarRow,
  ComparisonDatum,
  EffectiveRateDatum,
  FiscalYearBreakdown,
  MultiYearNote,
  MultiYearResult,
  MultiYearSummaryStat,
  PeakEffectiveRate,
} from '@/features/multi-year-tax/types';

/** Headroom above the tallest point so its label isn't clipped by the axis. */
const RATE_AXIS_HEADROOM = 1.25;
const MIN_RATE_AXIS_MAX = 5;

/** The entry rules, with the supported range filled into the first one. */
export function getMultiYearNotes(): MultiYearNote[] {
  return [
    {
      id: 'supported-dates',
      label: MULTI_YEAR_NOTE_COPY.supportedDates.label,
      description: MULTI_YEAR_NOTE_COPY.supportedDates.description(getSupportedRangeLabel()),
    },
    {
      id: 'partial-months',
      label: MULTI_YEAR_NOTE_COPY.partialMonths.label,
      description: MULTI_YEAR_NOTE_COPY.partialMonths.description,
    },
    {
      id: 'no-overlap',
      label: MULTI_YEAR_NOTE_COPY.noOverlap.label,
      description: MULTI_YEAR_NOTE_COPY.noOverlap.description,
    },
  ];
}

export function getSummaryStats(result: MultiYearResult): MultiYearSummaryStat[] {
  return [
    {
      id: 'total-gross',
      label: MULTI_YEAR_SUMMARY_LABELS.totalGross,
      value: formatPkr(result.totalGross),
      tone: 'neutral',
    },
    {
      id: 'total-tax',
      label: MULTI_YEAR_SUMMARY_LABELS.totalTax,
      value: formatPkr(result.totalTax),
      tone: 'negative',
    },
    {
      id: 'take-home',
      label: MULTI_YEAR_SUMMARY_LABELS.takeHome,
      value: formatPkr(result.totalTakeHome),
      tone: 'positive',
    },
    {
      id: 'effective-rate',
      label: MULTI_YEAR_SUMMARY_LABELS.effectiveRate,
      value: formatPercent(result.effectiveRate),
      tone: 'neutral',
    },
  ];
}

/** What the take-home / tax bar says to a screen reader. */
export function getAllocationLabel(year: FiscalYearBreakdown): string {
  return MULTI_YEAR_RESULT_COPY.allocationLabel(
    year.label,
    formatPercent(year.takeHomePercent),
    formatPercent(year.taxPercent),
  );
}

/**
 * The stacked breakdown: one row per fiscal year, then the total. Every figure
 * the wide table shows is here too, formatted once so the row stays markup.
 */
export function getBreakdownRows(result: MultiYearResult): BreakdownRow[] {
  const years: BreakdownRow[] = result.breakdown.map((year) => ({
    id: year.fiscalYear,
    label: year.label,
    monthsLabel: formatMonths(year.months),
    grossLabel: formatPkr(year.gross),
    taxLabel: formatPkr(year.tax),
    takeHomeLabel: formatPkr(year.takeHome),
    rateLabel: formatPercent(year.effectiveRate),
    allocation: {
      takeHomePercent: year.takeHomePercent,
      taxPercent: year.taxPercent,
      label: getAllocationLabel(year),
    },
    isTotal: false,
  }));

  return [
    ...years,
    {
      id: 'total',
      label: MULTI_YEAR_RESULT_COPY.totalRowLabel,
      monthsLabel: formatMonths(result.totalMonths),
      grossLabel: formatPkr(result.totalGross),
      taxLabel: formatPkr(result.totalTax),
      takeHomeLabel: formatPkr(result.totalTakeHome),
      rateLabel: formatPercent(result.effectiveRate),
      allocation: null,
      isTotal: true,
    },
  ];
}

export function getFiscalYearCountLabel(result: MultiYearResult): string {
  const count = result.breakdown.length;
  return `${count} fiscal year${count === 1 ? '' : 's'}`;
}

export function getComparisonChartData(result: MultiYearResult): ComparisonDatum[] {
  return result.breakdown.map((year) => ({
    label: year.shortLabel,
    gross: Math.round(year.gross),
    tax: Math.round(year.tax),
    takeHome: Math.round(year.takeHome),
  }));
}

export function getEffectiveRateChartData(result: MultiYearResult): EffectiveRateDatum[] {
  return result.breakdown.map((year) => ({
    label: year.shortLabel,
    rate: Number(year.effectiveRate.toFixed(2)),
  }));
}

/** Upper bound of the rate axis, rounded up to a clean 5% step. */
export function getEffectiveRateAxisMax(result: MultiYearResult): number {
  const peak = Math.max(
    result.effectiveRate,
    ...result.breakdown.map((year) => year.effectiveRate),
    MIN_RATE_AXIS_MAX,
  );

  return Math.ceil((peak * RATE_AXIS_HEADROOM) / 5) * 5;
}

/** Bars are scaled against the biggest year, so their lengths stay comparable. */
export function getComparisonBarRows(result: MultiYearResult): ComparisonBarRow[] {
  const largestGross = Math.max(...result.breakdown.map((year) => year.gross), 1);

  return result.breakdown.map((year) => ({
    id: year.fiscalYear,
    label: year.shortLabel,
    grossLabel: formatCompactPkr(year.gross),
    takeHomeLabel: formatCompactPkr(year.takeHome),
    taxLabel: formatCompactPkr(year.tax),
    takeHomeWidth: (year.takeHome / largestGross) * 100,
    taxWidth: (year.tax / largestGross) * 100,
  }));
}

/** The year that took the biggest bite, worth calling out once there are several. */
export function getPeakEffectiveRate(result: MultiYearResult): PeakEffectiveRate | null {
  if (result.breakdown.length < 2) {
    return null;
  }

  const peak = result.breakdown.reduce((highest, year) =>
    year.effectiveRate > highest.effectiveRate ? year : highest,
  );

  return { label: peak.label, rate: peak.effectiveRate };
}

export function getPeakEffectiveRateLabel(peak: PeakEffectiveRate): string {
  return `${MULTI_YEAR_CHART_COPY.peakPrefix} ${formatPercent(peak.rate)} in ${peak.label}`;
}

export function getOverallRateLabel(effectiveRate: number): string {
  return `${MULTI_YEAR_CHART_COPY.overallPrefix} ${formatPercent(effectiveRate)}`;
}
