import { getPropertyMode } from '@/features/property-tax/lib/modes';
import type {
  PropertyCapitalGainsFormState,
  PropertyFiscalYear,
  PropertyMode,
  PropertyTransferFormState,
} from '@/features/property-tax/types';

export const PROPERTY_ANALYTICS_EVENTS = {
  pageView: 'property_calculator_view',
  calculatorUse: 'property_calculator_use',
} as const;

export function buildPropertyAnalyticsContext(mode: PropertyMode) {
  return {
    calculator: `property-${mode}`,
    page_path: getPropertyMode(mode).href,
  } as const;
}

export function buildPropertyTransferUseEventParameters(
  mode: PropertyMode,
  formState: PropertyTransferFormState,
) {
  return {
    ...buildPropertyAnalyticsContext(mode),
    fiscal_year: formState.fiscalYear,
    filer_status: formState.status,
  } as const;
}

/** The year is derived from the sale date here, so it is passed in rather than read off the form. */
export function buildPropertyCapitalGainsUseEventParameters(
  formState: PropertyCapitalGainsFormState,
  fiscalYear: PropertyFiscalYear,
) {
  return {
    ...buildPropertyAnalyticsContext('capital-gains'),
    fiscal_year: fiscalYear,
    filer_status: formState.status,
    property_type: formState.propertyType,
  } as const;
}
