import { Info } from 'lucide-react';

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
        {options.map((option) => {
          const active = option.value === value;
          const tooltipId = option.tooltip ? `${name}-${option.value}-info` : undefined;
          return (
            <button
              key={option.value}
              type="button"
              name={name}
              aria-pressed={active}
              aria-describedby={tooltipId}
              onClick={() => onChange(option.value)}
              className={`min-h-10 min-w-0 flex-1 rounded-lg px-3 py-2 font-semibold text-sm transition-all ${
                active
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-white hover:text-gray-900'
              }`}
            >
              <span className="inline-flex items-center justify-center gap-1.5">
                {option.label}
                {option.tooltip ? (
                  <span className="group/info relative inline-flex">
                    <Info
                      className="h-4 w-4 shrink-0 opacity-70 transition-opacity group-hover/info:opacity-100"
                      aria-hidden="true"
                    />
                    <span
                      id={tooltipId}
                      role="tooltip"
                      className="-translate-x-1/2 pointer-events-none absolute top-full left-1/2 z-30 mt-2 w-56 max-w-[15rem] rounded-lg bg-gray-900 px-3 py-2 text-left font-normal text-white text-xs leading-relaxed opacity-0 shadow-lg transition-opacity duration-150 group-hover/info:opacity-100"
                    >
                      {option.tooltip}
                    </span>
                  </span>
                ) : null}
              </span>
            </button>
          );
        })}
      </div>
      {helpText ? <p className="mt-1.5 text-gray-500 text-xs leading-relaxed">{helpText}</p> : null}
    </fieldset>
  );
}
