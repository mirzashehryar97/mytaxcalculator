import type { AgriculturalFiscalYear } from '@/features/agricultural-tax/types';

function finiteOrZero(value: number): number {
  return Number.isFinite(value) ? value : 0;
}

export function formatPkr(value: number): string {
  return `Rs. ${Math.round(finiteOrZero(value)).toLocaleString('en-PK')}`;
}

/** A low-to-high answer, collapsed to one figure when both ends match. */
export function formatPkrRange(low: number, high: number): string {
  return low === high ? formatPkr(low) : `${formatPkr(low)} – ${formatPkr(high)}`;
}

/** Super-tax thresholds run to hundreds of millions and read better shortened. */
export function formatMillions(value: number): string {
  const amount = finiteOrZero(value);
  if (amount < 1_000_000) {
    return formatPkr(amount);
  }
  const millions = Number((amount / 1_000_000).toFixed(2));
  return `Rs. ${millions.toLocaleString('en-PK')} million`;
}

export function formatPercent(value: number): string {
  return `${finiteOrZero(value).toLocaleString('en-PK', { maximumFractionDigits: 2 })}%`;
}

/** The schedules are written "12½ acres", so a trailing half is shown that way. */
const TRAILING_HALF = /\.5$/;

/** 12.5 → "12½ acres", 30 → "30 acres" — the form the schedules are written in. */
export function formatAcres(value: number): string {
  const amount = finiteOrZero(value);
  const label = Number.isInteger(amount)
    ? amount.toLocaleString('en-PK')
    : amount.toLocaleString('en-PK', { maximumFractionDigits: 2 });
  return `${label.replace(TRAILING_HALF, '½')} ${amount === 1 ? 'acre' : 'acres'}`;
}

/** '2026-2027' → '2026-27', the form used in headings and chips. */
export function formatAgriculturalFiscalYear(fiscalYear: AgriculturalFiscalYear): string {
  const [startYear, endYear] = fiscalYear.split('-');
  return `${startYear}-${endYear.slice(-2)}`;
}
