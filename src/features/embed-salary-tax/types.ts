export interface EmbedSalaryTaxFormState {
  monthlySalary: string;
  fiscalYear: string;
}

export type EmbedSalaryTaxFormField = keyof EmbedSalaryTaxFormState;

export type UpdateEmbedSalaryTaxField = <TField extends EmbedSalaryTaxFormField>(
  field: TField,
  value: EmbedSalaryTaxFormState[TField],
) => void;

export interface EmbedSalaryTaxResult {
  monthlyGross: number;
  monthlyTax: number;
  monthlyTakeHome: number;
  annualGross: number;
  annualTax: number;
  annualTakeHome: number;
  effectiveRate: number;
}

export interface EmbedSalaryTaxPeriodPresentation {
  title: string;
  grossLabel: string;
  grossValue: string;
  taxLabel: string;
  taxValue: string;
  takeHomeLabel: string;
  takeHomeValue: string;
}

export interface EmbedSalaryTaxResultPresentation {
  monthly: EmbedSalaryTaxPeriodPresentation;
  annual: EmbedSalaryTaxPeriodPresentation;
  effectiveRateLabel: string;
  effectiveRateValue: string;
}
