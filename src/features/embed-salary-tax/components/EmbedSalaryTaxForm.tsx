import FiscalYearSelect from '@/components/calculator/FiscalYearSelect';
import NumberInput from '@/components/calculator/NumberInput';

import { SALARY_TAX_YEARS } from '@/lib/salaryTaxYears';

import { EMBED_SALARY_TAX_COPY } from '@/features/embed-salary-tax/lib/content';
import { resolveEmbedSalaryTaxFiscalYear } from '@/features/embed-salary-tax/lib/input';
import type {
  EmbedSalaryTaxFormState,
  UpdateEmbedSalaryTaxField,
} from '@/features/embed-salary-tax/types';

interface EmbedSalaryTaxFormProps {
  formState: EmbedSalaryTaxFormState;
  updateField: UpdateEmbedSalaryTaxField;
}

export default function EmbedSalaryTaxForm({ formState, updateField }: EmbedSalaryTaxFormProps) {
  return (
    <form
      className="min-w-0 rounded-2xl border border-gray-200 bg-white p-4 sm:p-6"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <h2 className="sr-only">{EMBED_SALARY_TAX_COPY.formTitle}</h2>
      <div className="grid gap-5 sm:grid-cols-2">
        <FiscalYearSelect
          id="embed-fiscal-year"
          label={EMBED_SALARY_TAX_COPY.fiscalYearLabel}
          years={SALARY_TAX_YEARS}
          value={formState.fiscalYear}
          onChange={(value) => updateField('fiscalYear', resolveEmbedSalaryTaxFiscalYear(value))}
        />

        <NumberInput
          id="embed-monthly-salary"
          label={EMBED_SALARY_TAX_COPY.salaryLabel}
          value={formState.monthlySalary}
          onChange={(value) => updateField('monthlySalary', value)}
          prefix="PKR"
          placeholder="250000"
        />
      </div>
    </form>
  );
}
