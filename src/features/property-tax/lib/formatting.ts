import { parseIsoDate } from '@/utils/calendarDates';

import type { PropertyFiscalYear } from '@/features/property-tax/types';

function finiteOrZero(value: number): number {
  return Number.isFinite(value) ? value : 0;
}

export function formatPkr(value: number): string {
  return `Rs. ${Math.round(finiteOrZero(value)).toLocaleString('en-PK')}`;
}

/** Short currency for value bands, e.g. 50,000,000 → "Rs. 50M". */
export function formatCompactPkr(value: number): string {
  const amount = finiteOrZero(value);
  if (amount >= 1_000_000) {
    const trimmed = Number((amount / 1_000_000).toFixed(2));
    return `Rs. ${trimmed}M`;
  }
  return formatPkr(amount);
}

export function formatPercent(value: number): string {
  return `${finiteOrZero(value).toLocaleString('en-PK', {
    maximumFractionDigits: 2,
  })}%`;
}

export function formatPropertyFiscalYear(fiscalYear: PropertyFiscalYear): string {
  const [startYear, endYear] = fiscalYear.split('-');
  return `${startYear}-${endYear.slice(-2)}`;
}

/** Holding period as years and months, e.g. 2.5 → "2 years 6 months". */
export function formatHoldingPeriod(years: number): string {
  const total = Math.max(0, finiteOrZero(years));
  const wholeYears = Math.floor(total);
  const months = Math.round((total - wholeYears) * 12);
  const carriedYears = months === 12 ? wholeYears + 1 : wholeYears;
  const remainingMonths = months === 12 ? 0 : months;

  const yearLabel = `${carriedYears} ${carriedYears === 1 ? 'year' : 'years'}`;
  if (remainingMonths === 0) {
    return yearLabel;
  }

  const monthLabel = `${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}`;
  return carriedYears === 0 ? monthLabel : `${yearLabel} ${monthLabel}`;
}

/** Turns `2024-08-01` into `1 Aug 2024` for display. */
export function formatIsoDate(value: string): string {
  const timestamp = parseIsoDate(value);
  if (timestamp === null) {
    return '—';
  }

  return new Date(timestamp).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
