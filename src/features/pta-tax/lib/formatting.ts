import type { PtaAmountBand, PtaSalesTaxBand } from '@/features/pta-tax/types';

function finiteOrZero(value: number): number {
  return Number.isFinite(value) ? value : 0;
}

export function formatPkr(value: number): string {
  return `Rs. ${Math.round(finiteOrZero(value)).toLocaleString('en-PK')}`;
}

export function formatUsd(value: number): string {
  return `US$ ${finiteOrZero(value).toLocaleString('en-PK', { maximumFractionDigits: 2 })}`;
}

export function formatPtaFiscalYear(fiscalYear: string): string {
  const [startYear, endYear] = fiscalYear.split('-');
  return endYear ? `${startYear}-${endYear.slice(-2)}` : fiscalYear;
}

/** "iPhone 16 · 256 GB", or just the model where the ruling prices no tiers. */
export function formatPhoneName(model: string, variant: string): string {
  return variant ? `${model} · ${variant}` : model;
}

/**
 * A band as a reader would say it out loud — "US$ 500 or less", "over US$ 700"
 * — for the sentences that explain a figure. Middle bands name both endpoint
 * semantics so an exact threshold is never visually assigned to the wrong row.
 *
 * The lowest band is "or less" rather than "under", because its top figure is
 * inside it: a handset at exactly US$ 500 is taxed at 18%, so "under US$ 500"
 * would describe the reader's own phone as outside the band it was priced in.
 */
export function formatPlainBand(band: PtaAmountBand | PtaSalesTaxBand): string {
  if (band.maxUsd === null) {
    return `over US$ ${band.minUsd}`;
  }
  if (band.minUsd === 0) {
    return `US$ ${band.maxUsd} or less`;
  }
  return `over US$ ${band.minUsd} and up to US$ ${band.maxUsd}`;
}

/**
 * A band written with the statute's exclusive lower and inclusive upper bounds
 * made explicit, so the printed rate table cannot misstate an exact boundary.
 */
export function formatUsdBand(band: PtaAmountBand | PtaSalesTaxBand): string {
  if (band.maxUsd === null) {
    return `above US$ ${band.minUsd}`;
  }
  if (band.minUsd === 0) {
    return `up to US$ ${band.maxUsd}`;
  }
  return `above US$ ${band.minUsd} and up to US$ ${band.maxUsd}`;
}
