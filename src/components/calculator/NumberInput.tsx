interface NumberInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  prefix?: string;
  suffix?: string;
  helpText?: string;
  placeholder?: string;
  min?: number;
  step?: number | 'any';
  disabled?: boolean;
}

export default function NumberInput({
  id,
  label,
  value,
  onChange,
  prefix,
  suffix,
  helpText,
  placeholder,
  min = 0,
  step = 'any',
  disabled = false,
}: NumberInputProps) {
  return (
    <div>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <div className="relative">
        {prefix ? (
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 font-semibold text-gray-600">
            {prefix}
          </span>
        ) : null}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onWheel={(event) => event.currentTarget.blur()}
          placeholder={placeholder}
          min={min}
          step={step}
          disabled={disabled}
          className={`form-input no-spinner ${prefix ? 'pl-12' : ''} ${suffix ? 'pr-24' : ''} disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500`}
        />
        {suffix ? (
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 text-sm">
            {suffix}
          </span>
        ) : null}
      </div>
      {helpText ? <p className="mt-1.5 text-gray-500 text-xs leading-relaxed">{helpText}</p> : null}
    </div>
  );
}
