import NumberInput from '@/components/calculator/NumberInput';

import IncrementTypeToggle from '@/features/salary-increment/components/IncrementTypeToggle';
import OptionalFieldsDisclosure from '@/features/salary-increment/components/OptionalFieldsDisclosure';
import { SALARY_COMPARISON_FORM_COPY } from '@/features/salary-increment/lib/content';
import { buildIncrementHelpText } from '@/features/salary-increment/lib/input';
import type {
  SalaryComparisonFormState,
  UpdateSalaryComparisonField,
} from '@/features/salary-increment/types';

interface IncrementFormProps {
  formState: SalaryComparisonFormState;
  updateField: UpdateSalaryComparisonField;
}

/** Keeps the plain "Current Salary" label the same height as the increment toggle so inputs line up. */
const ALIGNED_LABEL = 'min-h-[1.75rem]';

export default function IncrementForm({ formState, updateField }: IncrementFormProps) {
  const isPercent = formState.incrementType === 'percent';
  return (
    <div className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <NumberInput
          id="increment-current-salary"
          label={SALARY_COMPARISON_FORM_COPY.currentSalaryLabel}
          labelClassName={ALIGNED_LABEL}
          value={formState.currentSalary}
          onChange={(value) => updateField('currentSalary', value)}
          prefix="Rs."
          placeholder="200000"
        />
        <NumberInput
          id="increment-value"
          label={SALARY_COMPARISON_FORM_COPY.incrementLabel}
          labelClassName={ALIGNED_LABEL}
          value={isPercent ? formState.incrementPercent : formState.incrementAmount}
          onChange={(value) =>
            updateField(isPercent ? 'incrementPercent' : 'incrementAmount', value)
          }
          prefix={isPercent ? undefined : 'Rs.'}
          suffix={isPercent ? SALARY_COMPARISON_FORM_COPY.incrementSuffix : undefined}
          placeholder={isPercent ? '20' : SALARY_COMPARISON_FORM_COPY.incrementAmountPlaceholder}
          helpText={buildIncrementHelpText(formState)}
          labelAdornment={
            <IncrementTypeToggle
              value={formState.incrementType}
              onChange={(value) => updateField('incrementType', value)}
            />
          }
        />
      </div>

      <OptionalFieldsDisclosure label={SALARY_COMPARISON_FORM_COPY.optionalFieldsLabel}>
        <div className="grid gap-5 sm:grid-cols-2">
          <NumberInput
            id="increment-bonus"
            label={SALARY_COMPARISON_FORM_COPY.bonusLabel}
            value={formState.bonus}
            onChange={(value) => updateField('bonus', value)}
            prefix="Rs."
            placeholder="0"
          />
          <NumberInput
            id="increment-deductions"
            label={SALARY_COMPARISON_FORM_COPY.deductionsLabel}
            value={formState.deductions}
            onChange={(value) => updateField('deductions', value)}
            prefix="Rs."
            placeholder="0"
            helpText={SALARY_COMPARISON_FORM_COPY.deductionsHelp}
          />
        </div>
      </OptionalFieldsDisclosure>
    </div>
  );
}
