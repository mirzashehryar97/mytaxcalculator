function finiteOrZero(value: number): number {
  return Number.isFinite(value) ? value : 0;
}

export function formatPkr(value: number): string {
  return `Rs. ${Math.round(finiteOrZero(value)).toLocaleString('en-PK')}`;
}

export function formatPercent(value: number): string {
  return `${finiteOrZero(value).toLocaleString('en-PK', { maximumFractionDigits: 2 })}%`;
}

/** "2026-2027" reads as "2026-27" everywhere it is shown. */
export function formatCapitalGainsFiscalYear(fiscalYear: string): string {
  const [startYear, endYear] = fiscalYear.split('-');
  if (!endYear) {
    return fiscalYear;
  }
  return `${startYear}-${endYear.slice(-2)}`;
}

/**
 * A holding period in words. Anything under a year is given in months, because
 * "0.4 years" is not how anyone describes how long they held something.
 */
export function formatHoldingPeriod(years: number): string {
  const safeYears = Math.max(0, finiteOrZero(years));

  if (safeYears < 1) {
    const months = Math.max(0, Math.round(safeYears * 12));
    return months === 1 ? '1 month' : `${months} months`;
  }

  const wholeYears = Math.floor(safeYears);
  const months = Math.round((safeYears - wholeYears) * 12);
  const yearPart = wholeYears === 1 ? '1 year' : `${wholeYears} years`;

  if (months === 0 || months === 12) {
    return yearPart;
  }
  return `${yearPart} ${months} ${months === 1 ? 'month' : 'months'}`;
}
