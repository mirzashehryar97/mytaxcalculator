import type {
  FundClass,
  InvestorType,
  ListedSecuritiesFormState,
  ListedSecuritiesInputs,
  MutualFundFormState,
  MutualFundInputs,
} from '@/features/capital-gains-tax/types';

/**
 * The examples the pages open on, so the first thing on screen is a believable
 * answer rather than an empty form. Both put the visitor in the regime almost
 * everyone is in — bought recently, sold inside a year.
 *
 * The sale dates sit in tax year 2026 rather than the year we are actually in.
 * That is deliberate: the sale date picks the year here, and 2026 is the last
 * one whose non-filer rate is confirmed, so the opening example never lands
 * under the pending-rate warning. Move them forward only once tax year 2027
 * stops being `pending-operator-table` in `lib/rates.ts`.
 */
export const DEFAULT_LISTED_SECURITIES_FORM_STATE = {
  purchaseCost: '2000000',
  saleProceeds: '3000000',
  acquisitionDate: '2025-08-01',
  disposalDate: '2026-06-15',
  filer: true,
} satisfies ListedSecuritiesFormState;

export const DEFAULT_MUTUAL_FUND_FORM_STATE = {
  purchaseCost: '2000000',
  redemptionProceeds: '3000000',
  acquisitionDate: '2025-08-01',
  redemptionDate: '2026-06-15',
  investorType: 'individual',
  fundClass: 'stock',
  filer: true,
} satisfies MutualFundFormState;

export function parseCapitalGainsNumberInput(value: string): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

export function buildListedSecuritiesInputs(
  formState: ListedSecuritiesFormState,
): ListedSecuritiesInputs {
  return {
    purchaseCost: parseCapitalGainsNumberInput(formState.purchaseCost),
    saleProceeds: parseCapitalGainsNumberInput(formState.saleProceeds),
    acquisitionDate: formState.acquisitionDate,
    disposalDate: formState.disposalDate,
    filer: formState.filer,
  };
}

export function buildMutualFundInputs(formState: MutualFundFormState): MutualFundInputs {
  return {
    purchaseCost: parseCapitalGainsNumberInput(formState.purchaseCost),
    redemptionProceeds: parseCapitalGainsNumberInput(formState.redemptionProceeds),
    acquisitionDate: formState.acquisitionDate,
    redemptionDate: formState.redemptionDate,
    investorType: formState.investorType,
    fundClass: formState.fundClass,
    filer: formState.filer,
  };
}

/**
 * A sale needs a price on it before anything can be worked out. The cost is
 * allowed to be zero — shares can be inherited or granted at nil cost.
 */
export function isProceedsValid(proceeds: number): boolean {
  return proceeds > 0;
}

export function isGainValid(gain: number): boolean {
  return gain > 0;
}

export function resolveInvestorType(value: string): InvestorType {
  return value === 'company' ? 'company' : 'individual';
}

export function resolveFundClass(value: string): FundClass {
  return value === 'other' ? 'other' : 'stock';
}
