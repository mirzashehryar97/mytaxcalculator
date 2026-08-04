import SegmentedControlOption from '@/components/calculator/SegmentedControlOption';

interface SegmentedOption<T extends string> {
  label: string;
  value: T;
  /** Optional plain-language explanation revealed on hover or focus of the segment. */
  tooltip?: string;
}

interface SegmentedControlProps<T extends string> {
  label: string;
  options: readonly SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  name: string;
  helpText?: string;
}

export default function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onChange,
  name,
  helpText,
}: SegmentedControlProps<T>) {
  const stackOnMobile = options.length > 2;
  return (
    <fieldset>
      <legend className="form-label">{label}</legend>
      <div
        className={`flex w-full rounded-xl border border-gray-200 bg-gray-50 p-1 ${
          stackOnMobile ? 'flex-col sm:flex-row' : ''
        }`}
      >
        {options.map((option) => (
          <SegmentedControlOption
            key={option.value}
            active={option.value === value}
            label={option.label}
            name={name}
            onSelect={() => onChange(option.value)}
            tooltip={option.tooltip}
            tooltipId={`${name}-${option.value}-info`}
          />
        ))}
      </div>
      {helpText ? <p className="mt-1.5 text-gray-500 text-xs leading-relaxed">{helpText}</p> : null}
    </fieldset>
  );
}
