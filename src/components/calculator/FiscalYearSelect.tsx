import { toSelectOptions } from '@/components/calculator/options';
import SelectInput from '@/components/calculator/SelectInput';

interface FiscalYearSelectProps {
  years: readonly string[];
  value: string;
  onChange: (value: string) => void;
  id?: string;
  label?: string;
  /** Sits beside a heading rather than above a field: smaller, label read-only. */
  compact?: boolean;
}

export default function FiscalYearSelect({
  years,
  value,
  onChange,
  id = 'fiscal-year',
  label = 'Fiscal year',
  compact = false,
}: FiscalYearSelectProps) {
  return (
    <SelectInput
      className={compact ? 'w-full sm:w-36' : undefined}
      hideLabel={compact}
      id={id}
      label={label}
      onChange={onChange}
      options={toSelectOptions(years)}
      size={compact ? 'sm' : 'md'}
      value={value}
    />
  );
}
