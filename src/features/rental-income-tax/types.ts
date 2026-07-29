import type { TaxBracket } from '@/utils/slabEngine';

export type RentalFiscalYear =
  | '2026-2027'
  | '2025-2026'
  | '2024-2025'
  | '2023-2024'
  | '2022-2023'
  | '2021-2022';

/** Individuals and AOPs share the slab; companies pay a flat percentage. */
export type RentalOwnerType = 'individual' | 'aop' | 'company';

/** Whether the user types the rent per month or for the whole year. */
export type RentalPeriod = 'monthly' | 'annual';

export interface RentalRateYear {
  /** Slab for individuals and AOPs on the Active Taxpayer List. */
  filerSlabs: TaxBracket[];
  /** Slab for individuals and AOPs not on the Active Taxpayer List. */
  nonFilerSlabs: TaxBracket[];
  /** Flat percentage charged to companies on the Active Taxpayer List. */
  companyFilerRate: number;
  /** Flat percentage charged to companies not on the Active Taxpayer List. */
  companyNonFilerRate: number;
  /**
   * Whether the Tenth Schedule non-filer uplift reached section 155 that year.
   * It did not until the Finance Act 2022 removed section 155 from the rule 10
   * exclusions, so 2021-22 charges non-filers the same as filers.
   */
  nonFilerUpliftApplies: boolean;
}

export interface RentalTaxInputs {
  /** Gross rent for the whole year, before anything is taken off. */
  annualRent: number;
  ownerType: RentalOwnerType;
  /** True when the owner is on the FBR Active Taxpayer List. */
  filer: boolean;
}

export interface RentalTaxFormState {
  rentPeriod: RentalPeriod;
  /** Used when rentPeriod is 'monthly'. */
  monthlyRent: string;
  /** Used when rentPeriod is 'annual'. */
  annualRent: string;
  ownerType: RentalOwnerType;
  filer: boolean;
  fiscalYear: RentalFiscalYear;
}

export type RentalTaxFormField = keyof RentalTaxFormState;

export type UpdateRentalTaxFormField = <TField extends RentalTaxFormField>(
  field: TField,
  value: RentalTaxFormState[TField],
) => void;

export interface RentalTaxResult {
  fiscalYear: RentalFiscalYear;
  ownerType: RentalOwnerType;
  filer: boolean;
  annualRent: number;
  monthlyRent: number;
  /** Tax deducted from the year's rent under section 155. */
  tax: number;
  /** The yearly deduction spread over twelve months. */
  monthlyTax: number;
  /** Tax as a percentage of the yearly rent. */
  effectiveRate: number;
  /** Rent left for the year once the deduction is taken off. */
  rentAfterTax: number;
  monthlyRentAfterTax: number;
  /** The same rent taxed as a filer, for the side-by-side comparison. */
  filerTax: number;
  /** The same rent taxed as a non-filer. */
  nonFilerTax: number;
  /** How much less a filer pays on this rent. */
  filerSaving: number;
  /** True for companies, which pay a flat rate instead of the slab. */
  usesFlatRate: boolean;
  /** The flat percentage applied, when the owner is a company. */
  flatRate: number | null;
  /** Whether non-filers were charged extra in the selected year. */
  nonFilerUpliftApplies: boolean;
  /** True when a slab owner's rent sits inside the tax-free band. */
  taxFree: boolean;
  /** Marginal band the rent falls into. */
  marginalRate: number;
  marginalFixed: number;
  /** Lower edge of the marginal band (band min − 1, i.e. the "above" figure). */
  marginalBandStart: number;
}

export interface RentalOption<TValue extends string> {
  value: TValue;
  label: string;
  /** Optional plain-language explanation shown on the segmented-control option. */
  tooltip?: string;
}

export interface RentalFaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface RentalRateGuideRow {
  id: string;
  band: string;
  filerRate: string;
  nonFilerRate: string;
}
