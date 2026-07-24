interface FiscalYearSelectProps {
  years: readonly string[];
  value: string;
  onChange: (value: string) => void;
  id?: string;
  label?: string;
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
    <div className={compact ? 'w-full sm:w-auto' : undefined}>
      <label htmlFor={id} className={compact ? 'sr-only' : 'form-label'}>
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={compact ? 'form-select min-w-36 py-2 text-sm' : 'form-select'}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}
