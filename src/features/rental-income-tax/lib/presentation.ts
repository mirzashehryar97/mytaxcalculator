import { calcRentalTax } from '@/features/rental-income-tax/lib/calculation';
import { RENTAL_RESULT_COPY } from '@/features/rental-income-tax/lib/content';
import {
  formatCompactPkr,
  formatPercent,
  formatPkr,
  formatRentalFiscalYear,
} from '@/features/rental-income-tax/lib/formatting';
import { RENTAL_FISCAL_YEARS } from '@/features/rental-income-tax/lib/rates';
import type {
  RentalFiscalYear,
  RentalOwnerType,
  RentalTaxResult,
} from '@/features/rental-income-tax/types';

const OWNER_LABELS: Record<RentalOwnerType, string> = {
  individual: 'One owner',
  aop: 'Two or more owners',
  company: 'A company',
};

export function getRentalOwnerLabel(ownerType: RentalOwnerType): string {
  return OWNER_LABELS[ownerType];
}

export function getRentalFilerLabel(filer: boolean): string {
  return filer ? RENTAL_RESULT_COPY.filerLabel : RENTAL_RESULT_COPY.nonFilerLabel;
}

/** Plain-language description of how the shown deduction was reached. */
export function getRentalWorkingDescription(result: RentalTaxResult): string {
  if (result.usesFlatRate) {
    return `A flat ${formatPercent(result.flatRate ?? 0)} of the whole yearly rent, with no tax-free amount.`;
  }
  if (result.taxFree) {
    return RENTAL_RESULT_COPY.taxFreeWorking;
  }

  const fixedPart = result.marginalFixed > 0 ? `${formatPkr(result.marginalFixed)} plus ` : '';
  return `${fixedPart}${formatPercent(result.marginalRate)} of the rent above ${formatCompactPkr(
    result.marginalBandStart,
  )}.`;
}

export interface RentalYearComparisonRow {
  fiscalYear: RentalFiscalYear;
  label: string;
  tax: number;
  formattedTax: string;
  /** 0–1 share of the largest deduction in the set, for the bar width. */
  share: number;
}

/** The same rent taxed under every year we cover, for a quick comparison. */
export function buildRentalYearComparison(
  annualRent: number,
  ownerType: RentalOwnerType,
  filer: boolean,
): RentalYearComparisonRow[] {
  const rows = RENTAL_FISCAL_YEARS.map((fiscalYear) => {
    const { tax } = calcRentalTax({ annualRent, ownerType, filer }, fiscalYear);
    return {
      fiscalYear,
      label: formatRentalFiscalYear(fiscalYear),
      tax,
      formattedTax: formatPkr(tax),
    };
  });

  const maxTax = Math.max(...rows.map((row) => row.tax), 0);
  return rows.map((row) => ({
    ...row,
    share: maxTax > 0 ? row.tax / maxTax : 0,
  }));
}
