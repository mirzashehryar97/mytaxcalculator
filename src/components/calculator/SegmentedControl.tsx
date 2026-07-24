interface SegmentedOption<T extends string> {
  label: string;
  value: T;
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
  return (
    <fieldset>
      <legend className="form-label">{label}</legend>
      <div className="inline-flex min-w-64 rounded-xl border border-gray-200 bg-gray-50 p-1">
        {options.map((option) => {
          const active = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              name={name}
              aria-pressed={active}
              onClick={() => onChange(option.value)}
              className={`min-h-10 flex-1 rounded-lg px-5 py-2 font-semibold text-sm transition-all ${
                active
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-white hover:text-gray-900'
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
      {helpText ? <p className="mt-1.5 text-gray-500 text-xs leading-relaxed">{helpText}</p> : null}
    </fieldset>
  );
}
