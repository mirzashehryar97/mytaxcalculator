import type {
  CompanyTaxFormState,
  MinimumTaxFormState,
  SuperTaxFormState,
} from '@/features/corporate-tax/lib/input';
import { getCorporateMode } from '@/features/corporate-tax/lib/modes';
import type { CorporateMode } from '@/features/corporate-tax/types';

export const CORPORATE_ANALYTICS_EVENTS = {
  pageView: 'corporate_calculator_view',
  calculatorUse: 'corporate_calculator_use',
} as const;

const CALCULATOR_NAMES: Record<CorporateMode, string> = {
  'company-tax': 'corporate_company_tax',
  'minimum-tax': 'corporate_minimum_tax',
  'super-tax': 'corporate_super_tax',
};

export function buildCorporateAnalyticsContext(mode: CorporateMode) {
  return {
    calculator: CALCULATOR_NAMES[mode],
    page_path: getCorporateMode(mode).href,
  } as const;
}

export function buildCompanyTaxUseParameters(formState: CompanyTaxFormState) {
  return {
    ...buildCorporateAnalyticsContext('company-tax'),
    fiscal_year: formState.fiscalYear,
    company_type: formState.companyType,
  } as const;
}

export function buildMinimumTaxUseParameters(formState: MinimumTaxFormState) {
  return {
    ...buildCorporateAnalyticsContext('minimum-tax'),
    fiscal_year: formState.fiscalYear,
    taxpayer_type: formState.taxpayerType,
    sector: formState.sector,
  } as const;
}

export function buildSuperTaxUseParameters(formState: SuperTaxFormState) {
  return {
    ...buildCorporateAnalyticsContext('super-tax'),
    fiscal_year: formState.fiscalYear,
    taxpayer_type: formState.taxpayerType,
    export_exempt: String(formState.isExportExempt),
  } as const;
}
