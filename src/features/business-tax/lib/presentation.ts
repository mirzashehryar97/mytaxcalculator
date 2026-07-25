import { calcBusinessTax } from '@/features/business-tax/lib/calculation';
import { BUSINESS_RESULT_COPY } from '@/features/business-tax/lib/content';
import {
  formatBusinessFiscalYear,
  formatCompactPkr,
  formatPercent,
  formatPkr,
} from '@/features/business-tax/lib/formatting';
import { BUSINESS_FISCAL_YEARS } from '@/features/business-tax/lib/rates';
import type {
  BusinessFiscalYear,
  BusinessTaxpayerType,
  BusinessTaxResult,
} from '@/features/business-tax/types';

const TAXPAYER_LABELS: Record<BusinessTaxpayerType, string> = {
  individual: 'Sole trader',
  aop: 'Partnership (AOP)',
  'professional-aop': 'Professional firm',
};

export function getBusinessTaxpayerLabel(taxpayerType: BusinessTaxpayerType): string {
  return TAXPAYER_LABELS[taxpayerType];
}

/** Plain-language description of the band the income sits in. */
export function getMarginalBandDescription(result: BusinessTaxResult): string {
  if (result.taxFree) {
    return BUSINESS_RESULT_COPY.taxFreeBand;
  }
  const fixedPart = result.marginalFixed > 0 ? `${formatPkr(result.marginalFixed)} plus ` : '';
  return `The tax above is based on this band: ${fixedPart}${formatPercent(
    result.marginalRate,
  )} of income above ${formatCompactPkr(result.marginalBandStart)}.`;
}

export interface BusinessYearComparisonRow {
  fiscalYear: BusinessFiscalYear;
  label: string;
  totalTax: number;
  formattedTax: string;
  /** 0–1 share of the largest bill in the set, for the bar width. */
  share: number;
}

/** Same taxable income taxed under every year we cover, for a quick comparison. */
export function buildBusinessYearComparison(
  netIncome: number,
  taxpayerType: BusinessTaxpayerType,
): BusinessYearComparisonRow[] {
  const rows = BUSINESS_FISCAL_YEARS.map((fiscalYear) => {
    const { totalTax } = calcBusinessTax(
      { netIncome, taxpayerType, advanceTaxPaid: 0 },
      fiscalYear,
    );
    return {
      fiscalYear,
      label: formatBusinessFiscalYear(fiscalYear),
      totalTax,
      formattedTax: formatPkr(totalTax),
    };
  });

  const maxTax = Math.max(...rows.map((row) => row.totalTax), 0);
  return rows.map((row) => ({
    ...row,
    share: maxTax > 0 ? row.totalTax / maxTax : 0,
  }));
}
