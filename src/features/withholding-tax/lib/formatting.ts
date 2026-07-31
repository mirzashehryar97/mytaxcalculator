function finiteOrZero(value: number): number {
  return Number.isFinite(value) ? value : 0;
}

export function formatPkr(value: number): string {
  return `Rs. ${Math.round(finiteOrZero(value)).toLocaleString('en-PK')}`;
}

/** Keeps the paisa on small amounts, where rounding would hide the whole answer. */
export function formatPkrExact(value: number): string {
  const amount = finiteOrZero(value);
  const decimals = Number.isInteger(amount) ? 0 : 2;
  return `Rs. ${amount.toLocaleString('en-PK', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}

export function formatPercent(value: number): string {
  return `${finiteOrZero(value).toLocaleString('en-PK', { maximumFractionDigits: 2 })}%`;
}

/** "2026-2027" reads as "2026-27" everywhere it is shown. */
export function formatWithholdingFiscalYear(fiscalYear: string): string {
  const [startYear, endYear] = fiscalYear.split('-');
  if (!endYear) {
    return fiscalYear;
  }
  return `${startYear}-${endYear.slice(-2)}`;
}
