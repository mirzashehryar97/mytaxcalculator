export interface ReverseSalaryFormState {
  fiscalYear: string;
  /** Desired monthly take-home (net) pay, as a raw string. */
  desiredTakeHome: string;
}

export type ReverseSalaryFormField = keyof ReverseSalaryFormState;

export type UpdateReverseSalaryField = <TField extends ReverseSalaryFormField>(
  field: TField,
  value: ReverseSalaryFormState[TField],
) => void;

export interface ReverseSalaryResult {
  fiscalYear: string;
  desiredMonthlyNet: number;
  requiredMonthlyGross: number;
  requiredAnnualGross: number;
  monthlyTax: number;
  annualTax: number;
  monthlyNet: number;
  annualNet: number;
  /** Effective tax rate on the required gross, as a percentage (e.g. 13.55). */
  effectiveRate: number;
}

export interface ReverseSalaryFaqItem {
  id: string;
  question: string;
  answer: string;
}
