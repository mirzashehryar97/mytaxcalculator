import type {
  ListedSecuritiesFormState,
  MutualFundFormState,
} from '@/features/capital-gains-tax/types';

export const CAPITAL_GAINS_ANALYTICS_EVENTS = {
  listedSecuritiesPageView: 'capital_gains_listed_view',
  listedSecuritiesUse: 'capital_gains_listed_use',
  mutualFundPageView: 'capital_gains_mutual_fund_view',
  mutualFundUse: 'capital_gains_mutual_fund_use',
} as const;

export const LISTED_SECURITIES_ANALYTICS_CONTEXT = {
  calculator: 'capital_gains_listed_securities',
} as const;

export const MUTUAL_FUND_ANALYTICS_CONTEXT = {
  calculator: 'capital_gains_mutual_funds',
} as const;

export function buildListedSecuritiesUseParameters(formState: ListedSecuritiesFormState) {
  return {
    acquisition_date: formState.acquisitionDate,
    disposal_date: formState.disposalDate,
    filer: formState.filer,
  };
}

export function buildMutualFundUseParameters(formState: MutualFundFormState) {
  return {
    acquisition_date: formState.acquisitionDate,
    redemption_date: formState.redemptionDate,
    investor_type: formState.investorType,
    fund_class: formState.fundClass,
    filer: formState.filer,
  };
}
