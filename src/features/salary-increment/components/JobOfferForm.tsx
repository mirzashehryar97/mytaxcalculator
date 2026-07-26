import NumberInput from '@/components/calculator/NumberInput';

import OptionalFieldsDisclosure from '@/features/salary-increment/components/OptionalFieldsDisclosure';
import { SALARY_COMPARISON_FORM_COPY } from '@/features/salary-increment/lib/content';
import type {
  SalaryComparisonFormState,
  UpdateSalaryComparisonField,
} from '@/features/salary-increment/types';

interface JobOfferFormProps {
  formState: SalaryComparisonFormState;
  updateField: UpdateSalaryComparisonField;
}

export default function JobOfferForm({ formState, updateField }: JobOfferFormProps) {
  return (
    <div className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <NumberInput
          id="job-current-salary"
          label={SALARY_COMPARISON_FORM_COPY.currentSalaryLabel}
          value={formState.currentSalary}
          onChange={(value) => updateField('currentSalary', value)}
          prefix="Rs."
          placeholder="200000"
        />
        <NumberInput
          id="job-offered-salary"
          label={SALARY_COMPARISON_FORM_COPY.offeredSalaryLabel}
          value={formState.offeredSalary}
          onChange={(value) => updateField('offeredSalary', value)}
          prefix="Rs."
          placeholder="260000"
        />
      </div>

      <OptionalFieldsDisclosure label={SALARY_COMPARISON_FORM_COPY.optionalFieldsLabel}>
        <div className="grid gap-5 sm:grid-cols-2">
          <NumberInput
            id="job-current-bonus"
            label={SALARY_COMPARISON_FORM_COPY.currentBonusLabel}
            value={formState.currentBonus}
            onChange={(value) => updateField('currentBonus', value)}
            prefix="Rs."
            placeholder="0"
          />
          <NumberInput
            id="job-new-bonus"
            label={SALARY_COMPARISON_FORM_COPY.newBonusLabel}
            value={formState.newBonus}
            onChange={(value) => updateField('newBonus', value)}
            prefix="Rs."
            placeholder="0"
          />
          <NumberInput
            id="job-current-deductions"
            label={SALARY_COMPARISON_FORM_COPY.currentDeductionsLabel}
            value={formState.currentDeductions}
            onChange={(value) => updateField('currentDeductions', value)}
            prefix="Rs."
            placeholder="0"
          />
          <NumberInput
            id="job-new-deductions"
            label={SALARY_COMPARISON_FORM_COPY.newDeductionsLabel}
            value={formState.newDeductions}
            onChange={(value) => updateField('newDeductions', value)}
            prefix="Rs."
            placeholder="0"
            helpText={SALARY_COMPARISON_FORM_COPY.deductionsHelp}
          />
        </div>
      </OptionalFieldsDisclosure>
    </div>
  );
}
