import FiscalYearSelect from '@/components/calculator/FiscalYearSelect';
import NumberInput from '@/components/calculator/NumberInput';

import { SALARY_TAX_YEARS } from '@/lib/salaryTaxYears';

import { REVERSE_SALARY_FORM_COPY } from '@/features/reverse-salary/lib/content';
import { formatPkr } from '@/features/reverse-salary/lib/formatting';
import { REVERSE_SALARY_QUICK_PICKS } from '@/features/reverse-salary/lib/input';
import type {
  ReverseSalaryFormState,
  UpdateReverseSalaryField,
} from '@/features/reverse-salary/types';

interface ReverseSalaryFormProps {
  formState: ReverseSalaryFormState;
  updateField: UpdateReverseSalaryField;
}

export default function ReverseSalaryForm({ formState, updateField }: ReverseSalaryFormProps) {
  const activePick = Number(formState.desiredTakeHome);

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <FiscalYearSelect
        id="reverse-salary-fiscal-year"
        label={REVERSE_SALARY_FORM_COPY.fiscalYearLabel}
        years={SALARY_TAX_YEARS}
        value={formState.fiscalYear}
        onChange={(value) => updateField('fiscalYear', value)}
      />

      <div>
        <NumberInput
          id="reverse-salary-desired"
          label={REVERSE_SALARY_FORM_COPY.desiredLabel}
          value={formState.desiredTakeHome}
          onChange={(value) => updateField('desiredTakeHome', value)}
          prefix="Rs."
          placeholder={REVERSE_SALARY_FORM_COPY.desiredPlaceholder}
        />
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-gray-500 text-xs">{REVERSE_SALARY_FORM_COPY.quickPicksLabel}</span>
          {REVERSE_SALARY_QUICK_PICKS.map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => updateField('desiredTakeHome', String(amount))}
              className={`chip ${activePick === amount ? 'chip-active' : 'chip-inactive'}`}
            >
              {formatPkr(amount)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
