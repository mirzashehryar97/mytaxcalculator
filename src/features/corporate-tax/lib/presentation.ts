import { calcCompanyTax, calcSuperTax } from '@/features/corporate-tax/lib/calculation';
import { COMPANY_TYPE_OPTIONS } from '@/features/corporate-tax/lib/companyTaxContent';
import {
  formatCorporateFiscalYear,
  formatMillions,
  formatPercent,
  formatPkr,
} from '@/features/corporate-tax/lib/formatting';
import { MINIMUM_TAX_SECTOR_OPTIONS } from '@/features/corporate-tax/lib/minimumTaxContent';
import { CORPORATE_FISCAL_YEARS } from '@/features/corporate-tax/lib/rates';
import { SUPER_TAXPAYER_OPTIONS } from '@/features/corporate-tax/lib/superTaxContent';
import type {
  CompanyType,
  CorporateFiscalYear,
  CorporateOption,
  MinimumTaxSector,
  SuperTaxpayerType,
  SuperTaxResult,
} from '@/features/corporate-tax/types';

function findOptionLabel<TValue extends string>(
  options: readonly CorporateOption<TValue>[],
  value: TValue,
): string {
  return options.find((option) => option.value === value)?.label ?? value;
}

export function getCompanyTypeLabel(companyType: CompanyType): string {
  return findOptionLabel(COMPANY_TYPE_OPTIONS, companyType);
}

export function getMinimumTaxSectorLabel(sector: MinimumTaxSector): string {
  return findOptionLabel(MINIMUM_TAX_SECTOR_OPTIONS, sector);
}

/**
 * The chosen sector's plain-language description. The list itself has room for
 * a label and no more, so the explanation is shown under the field for
 * whichever option is selected.
 */
export function getMinimumTaxSectorDescription(sector: MinimumTaxSector): string {
  return MINIMUM_TAX_SECTOR_OPTIONS.find((option) => option.value === sector)?.tooltip ?? '';
}

export function resolveMinimumTaxSector(value: string): MinimumTaxSector {
  return MINIMUM_TAX_SECTOR_OPTIONS.find((option) => option.value === value)?.value ?? 'general';
}

export function getSuperTaxpayerLabel(taxpayerType: SuperTaxpayerType): string {
  return findOptionLabel(SUPER_TAXPAYER_OPTIONS, taxpayerType);
}

export function getSuperTaxpayerDescription(taxpayerType: SuperTaxpayerType): string {
  return SUPER_TAXPAYER_OPTIONS.find((option) => option.value === taxpayerType)?.tooltip ?? '';
}

export function resolveSuperTaxpayerType(value: string): SuperTaxpayerType {
  return SUPER_TAXPAYER_OPTIONS.find((option) => option.value === value)?.value ?? 'other';
}

/**
 * Plain-language line under the super-tax result. Below the threshold it says
 * how much headroom is left; above it, what the next step up would cost, since
 * the rate lands on the whole income rather than the slice above the band.
 */
export function getSuperTaxBandDescription(result: SuperTaxResult): string {
  if (result.applies) {
    return `${formatPercent(result.rate)} of the whole income, because it is above ${formatMillions(
      result.bandOver,
    )}.`;
  }
  const headroom = Math.max(0, result.threshold - result.income);
  return `Super tax starts above ${formatMillions(result.threshold)}. This income is ${formatPkr(
    headroom,
  )} below that point.`;
}

export interface CorporateYearRow {
  fiscalYear: CorporateFiscalYear;
  label: string;
  tax: number;
  formattedTax: string;
  /** 0–1 share of the largest bill in the set, for the bar width. */
  share: number;
}

function withShares(rows: Omit<CorporateYearRow, 'share'>[]): CorporateYearRow[] {
  const maxTax = Math.max(...rows.map((row) => row.tax), 0);
  return rows.map((row) => ({ ...row, share: maxTax > 0 ? row.tax / maxTax : 0 }));
}

/** The same profit taxed under every year the company calculator covers. */
export function buildCompanyTaxYearComparison(
  taxableProfit: number,
  companyType: CompanyType,
): CorporateYearRow[] {
  return withShares(
    CORPORATE_FISCAL_YEARS.map((fiscalYear) => {
      const { tax } = calcCompanyTax({ taxableProfit, companyType, taxAlreadyPaid: 0 }, fiscalYear);
      return {
        fiscalYear,
        label: formatCorporateFiscalYear(fiscalYear),
        tax,
        formattedTax: formatPkr(tax),
      };
    }),
  );
}

/** The same income charged under every year the super-tax calculator covers. */
export function buildSuperTaxYearComparison(
  income: number,
  taxpayerType: SuperTaxpayerType,
): CorporateYearRow[] {
  return withShares(
    CORPORATE_FISCAL_YEARS.map((fiscalYear) => {
      const { superTax } = calcSuperTax(
        { income, taxpayerType, isExportExempt: false },
        fiscalYear,
      );
      return {
        fiscalYear,
        label: formatCorporateFiscalYear(fiscalYear),
        tax: superTax,
        formattedTax: formatPkr(superTax),
      };
    }),
  );
}
