export type FreelancerFiscalYear =
  | '2026-2027'
  | '2025-2026'
  | '2024-2025'
  | '2023-2024'
  | '2022-2023'
  | '2021-2022';

export type FreelancerCurrency = 'USD' | 'PKR';

export interface FreelancerRate {
  /** PSEB-registered exporter appearing on ATL. */
  psebAtl: number;
  /** PSEB-registered exporter not appearing on ATL. */
  psebNonAtl: number;
  /** Other Section 154A export services where the taxpayer appears on ATL. */
  standardAtl: number;
  /** Other Section 154A export services where the taxpayer does not appear on ATL. */
  standardNonAtl: number;
}

export interface FreelancerTaxInputs {
  amount: number;
  currency: FreelancerCurrency;
  /** PKR received for one USD. Ignored when currency is PKR. */
  exchangeRate: number;
  psebRegistered: boolean;
  atl: boolean;
}

export interface FreelancerTaxFormState {
  amount: string;
  currency: FreelancerCurrency;
  exchangeRate: string;
  psebRegistered: boolean;
  atl: boolean;
  fiscalYear: FreelancerFiscalYear;
}

export type FreelancerTaxFormField = keyof FreelancerTaxFormState;

export type UpdateFreelancerTaxFormField = <TField extends FreelancerTaxFormField>(
  field: TField,
  value: FreelancerTaxFormState[TField],
) => void;

export interface FreelancerTaxResult {
  fiscalYear: FreelancerFiscalYear;
  /** Annual gross export receipts converted to PKR. */
  grossPkr: number;
  monthlyGrossPkr: number;
  /** Annual Section 154A withholding/final-tax estimate. */
  tax: number;
  monthlyTax: number;
  /** Annual receipts after the estimated Section 154A deduction. */
  net: number;
  monthlyNet: number;
  /** Applied percentage, expressed as 0.25 or 1 rather than a decimal fraction. */
  rate: number;
  eligibleForPsebRate: boolean;
  atlRateApplied: boolean;
  /** Comparison amount at the 0.25% PSEB + ATL rate. */
  concessionTax: number;
  /** Comparison amount at the verified 1% general rate. */
  standardTax: number;
  /** Actual saving for an eligible taxpayer; zero when the general rate applies. */
  taxSavings: number;
  monthlyTaxSavings: number;
  /** Difference between the two verified rates, irrespective of current eligibility. */
  potentialTaxSavings: number;
}

export interface FreelancerOption<TValue extends string> {
  value: TValue;
  label: string;
}

export interface FreelancerFaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FreelancerRateGuideRow {
  id: string;
  psebStatus: string;
  filerStatus: string;
  rate: string;
  treatment: string;
}

export type FreelancerScenarioId = 'all-export-income' | 'mixed-income' | 'standard-rate';

export interface FreelancerScenario {
  id: FreelancerScenarioId;
  title: string;
  description: string;
  tone: 'eligible' | 'mixed' | 'standard';
}

export type FreelancerEligibilityRequirementId =
  | 'it-export-services'
  | 'pseb-registration'
  | 'atl-status'
  | 'banking-channel';

export interface FreelancerEligibilityRequirement {
  id: FreelancerEligibilityRequirementId;
  text: string;
  inputKey?: 'psebRegistered' | 'atl';
}
