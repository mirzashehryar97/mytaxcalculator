export const MONTH_LABELS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

export const MONTH_SHORT_LABELS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;

export const MULTI_YEAR_COPY = {
  title: 'Salary history',
  subtitle: 'Add each period where your monthly salary stayed the same.',
  addPeriod: 'Add another period',
  calculate: 'Calculate total tax',
  recalculate: 'Update total tax',
  removePeriod: 'Remove',
  editPeriod: 'Edit',
  periodLabel: 'Period',
  incompletePeriod: 'Dates and salary not set yet',
  startDateLabel: 'Start date',
  endDateLabel: 'End date',
  salaryLabel: 'Monthly salary',
  salaryHelp: 'Before tax',
  salaryPlaceholder: '0',
  dayLabel: 'Day',
  monthLabel: 'Month',
  yearLabel: 'Year',
  dayPlaceholder: 'DD',
  monthPlaceholder: 'Mon',
  yearPlaceholder: 'YYYY',
} as const;

/** The three dropdowns that make up one date, in the order they read. */
export const DATE_PART_FIELDS = [
  { part: 'day', label: MULTI_YEAR_COPY.dayLabel, placeholder: MULTI_YEAR_COPY.dayPlaceholder },
  {
    part: 'month',
    label: MULTI_YEAR_COPY.monthLabel,
    placeholder: MULTI_YEAR_COPY.monthPlaceholder,
  },
  { part: 'year', label: MULTI_YEAR_COPY.yearLabel, placeholder: MULTI_YEAR_COPY.yearPlaceholder },
] as const;

export const MULTI_YEAR_RESULT_COPY = {
  summaryTitle: 'Your multi-year tax summary',
  breakdownTitle: 'Tax breakdown by fiscal year',
  breakdownSubtitleDesktop: 'Each row uses the tax slabs for that fiscal year.',
  breakdownSubtitleMobile: 'Each card uses the tax slabs for that fiscal year.',
  totalRowLabel: 'Total',
  totalTaxLabel: 'Total tax',
  grossLabel: 'Gross income',
  /** Inline form, where the row already reads as income. */
  grossShortLabel: 'Gross',
  takeHomeLabel: 'Take-home',
  taxLabel: 'Tax',
  effectiveRateLabel: 'Effective rate',
  coverageLabel: 'Coverage',
  fiscalYearLabel: 'Fiscal year',
  rateLabel: 'Rate',
  /** Spoken form of the take-home / tax bar, which carries no text of its own. */
  allocationLabel: (yearLabel: string, takeHomePercent: string, taxPercent: string) =>
    `${yearLabel}: ${takeHomePercent} take-home, ${taxPercent} tax`,
} as const;

export const MULTI_YEAR_SUMMARY_LABELS = {
  totalGross: 'Total gross',
  totalTax: 'Total tax',
  takeHome: 'Take-home',
  effectiveRate: 'Effective rate',
} as const;

export const MULTI_YEAR_CHART_COPY = {
  comparison: {
    tab: 'Year comparison',
    title: 'Income allocation by fiscal year',
    descriptionDesktop: 'Each column adds up to gross income.',
    descriptionMobile: 'Each bar adds up to gross income.',
  },
  effectiveRate: {
    tab: 'Effective rate',
    title: 'Effective tax rate by fiscal year',
    description: 'Tax as a percentage of gross income.',
  },
  takeHomeLegend: 'Take-home',
  taxLegend: 'Tax',
  overallPrefix: 'Overall',
  peakPrefix: 'Peak effective rate:',
} as const;

export const MULTI_YEAR_CHART_TABS = [
  { id: 'comparison', label: MULTI_YEAR_CHART_COPY.comparison.tab },
  { id: 'effectiveRate', label: MULTI_YEAR_CHART_COPY.effectiveRate.tab },
] as const;

/**
 * Reasons a day or month sits outside what a period can cover. They name the
 * boundary that blocks it so the tooltip answers "why can't I pick this?".
 */
export const MULTI_YEAR_DATE_REASONS = {
  beforeSupportedRange: (earliestDate: string, earliestFiscalYear: string) =>
    `FY ${earliestFiscalYear} is the oldest tax year with published slabs, so it can't start before ${earliestDate}.`,
  afterSupportedRange: (latestDate: string, latestFiscalYear: string) =>
    `FY ${latestFiscalYear} is the newest tax year with published slabs, so it can't run past ${latestDate}.`,
  beforePeriodStart: (startDate: string) =>
    `This period starts on ${startDate}, so it can't end earlier than that.`,
  afterPeriodEnd: (endDate: string) =>
    `This period ends on ${endDate}, so it can't start later than that.`,
} as const;

export const MULTI_YEAR_VALIDATION_COPY = {
  incomplete: 'Pick a day, month and year for every start and end date, and enter a salary.',
  invalidSalary: (periodNumber: number) =>
    `Enter a monthly salary above zero for period ${periodNumber}.`,
  startAfterEnd: (periodNumber: number) =>
    `Period ${periodNumber} ends before it starts. Check its start and end dates.`,
  outsideRange: (periodNumber: number, supportedRange: string) =>
    `Period ${periodNumber} falls outside the years we hold tax slabs for (${supportedRange}).`,
  overlap: (periodNumber: number, otherPeriodNumber: number) =>
    `Period ${periodNumber} overlaps period ${otherPeriodNumber}. Each date can only belong to one period.`,
} as const;

/**
 * The three rules that shape every entry, spelled out rather than named: each
 * one says what the rule is and what it means for the numbers.
 */
export const MULTI_YEAR_NOTE_COPY = {
  supportedDates: {
    label: 'Dates you can enter',
    description: (supportedRange: string) =>
      `${supportedRange} — that's every tax year with official salary tax rates.`,
  },
  partialMonths: {
    label: 'Mid-month changes are fine',
    description:
      'If a period starts or ends part-way through a month, only the days it covers are counted, not the whole month.',
  },
  noOverlap: {
    label: 'One period per date',
    description:
      'Two periods cannot cover the same day. End one period the day before the next one starts.',
  },
} as const;
