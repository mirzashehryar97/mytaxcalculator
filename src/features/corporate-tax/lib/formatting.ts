import type { CorporateFiscalYear } from '@/features/corporate-tax/types';

function finiteOrZero(value: number): number {
  return Number.isFinite(value) ? value : 0;
}

export function formatPkr(value: number): string {
  return `Rs. ${Math.round(finiteOrZero(value)).toLocaleString('en-PK')}`;
}

/**
 * Corporate figures run to hundreds of millions, so thresholds read far better
 * shortened: 150,000,000 → "Rs. 150 million".
 */
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

/** '2026-2027' → '2026-27', the form used in headings and chips. */
export function formatCorporateFiscalYear(fiscalYear: CorporateFiscalYear): string {
  const [startYear, endYear] = fiscalYear.split('-');
  return `${startYear}-${endYear.slice(-2)}`;
}
