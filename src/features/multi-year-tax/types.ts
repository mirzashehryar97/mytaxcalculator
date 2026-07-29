/** One date as held by the day / month / year dropdowns. `''` means "not chosen yet". */
export interface DateParts {
  /** Day of the month, `'1'`–`'31'`. */
  day: string;
  /** Calendar month, `'1'` (January) – `'12'` (December). */
  month: string;
  /** Calendar year, e.g. `'2024'`. */
  year: string;
}

export type DatePartName = keyof DateParts;

/** Which end of a period a date belongs to. */
export type PeriodDateName = 'start' | 'end';

/** One stretch of employment where the monthly salary stayed the same. */
export interface SalaryPeriod {
  /** Stable key, so removing a period doesn't shuffle React state. */
  id: string;
  start: DateParts;
  end: DateParts;
  /** Monthly salary before tax, kept as the raw input string. */
  salary: string;
}

export interface DatePartOption {
  value: string;
  label: string;
  /** Set when the option can't be chosen; the tooltip text explaining why. */
  disabledReason?: string;
}

/** One edge of the range a date field may sit in, with the reason it stops there. */
export interface DateBoundary {
  date: Date;
  reason: string;
}

export interface DateFieldBounds {
  min: DateBoundary;
  max: DateBoundary;
}

/** One fiscal year's slice of the whole salary history. */
export interface FiscalYearBreakdown {
  fiscalYear: string;
  /** e.g. `FY 2023–2024`. */
  label: string;
  /** e.g. `FY 23–24`, for chart axes. */
  shortLabel: string;
  /** Months covered, including prorated partial months. */
  months: number;
  gross: number;
  tax: number;
  takeHome: number;
  /** Tax as a percentage of the year's gross. */
  effectiveRate: number;
  /** Share of the year's gross kept, 0–100. */
  takeHomePercent: number;
  /** Share of the year's gross paid as tax, 0–100. */
  taxPercent: number;
}

/** The take-home / tax split behind one bar, with the text a reader hears. */
export interface BreakdownAllocation {
  takeHomePercent: number;
  taxPercent: number;
  label: string;
}

/** One line of the stacked breakdown: a fiscal year, or the total that closes it. */
export interface BreakdownRow {
  id: string;
  label: string;
  monthsLabel: string;
  grossLabel: string;
  taxLabel: string;
  takeHomeLabel: string;
  rateLabel: string;
  /** `null` on the total row, which sums years rather than splitting one. */
  allocation: BreakdownAllocation | null;
  isTotal: boolean;
}

export interface MultiYearResult {
  breakdown: FiscalYearBreakdown[];
  totalGross: number;
  totalTax: number;
  totalTakeHome: number;
  totalMonths: number;
  effectiveRate: number;
  /** e.g. `01 Jul 2023 – 30 Jun 2026`. */
  coverageLabel: string;
}

export interface MultiYearState {
  periods: SalaryPeriod[];
  result: MultiYearResult | null;
}

export type MultiYearChartTab = 'comparison' | 'effectiveRate';

export type SummaryStatTone = 'neutral' | 'negative' | 'positive';

export interface MultiYearSummaryStat {
  id: string;
  label: string;
  value: string;
  tone: SummaryStatTone;
}

/** A collapsed period row: what the user sees once a period is filled in. */
export interface PeriodSummary {
  dateRangeLabel: string;
  salaryLabel: string;
  monthsLabel: string;
  isComplete: boolean;
}

export interface ComparisonDatum {
  label: string;
  gross: number;
  tax: number;
  takeHome: number;
}

export interface EffectiveRateDatum {
  label: string;
  rate: number;
}

/** One horizontal bar of the mobile year-comparison chart. */
export interface ComparisonBarRow {
  id: string;
  label: string;
  grossLabel: string;
  takeHomeLabel: string;
  taxLabel: string;
  /** Width of the take-home segment as a share of the largest year's gross. */
  takeHomeWidth: number;
  /** Width of the tax segment as a share of the largest year's gross. */
  taxWidth: number;
}

export interface PeakEffectiveRate {
  label: string;
  rate: number;
}

/** One entry rule shown above the salary history: what it is, then what it means. */
export interface MultiYearNote {
  id: string;
  label: string;
  description: string;
}
