interface SwitchToggleProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
  /**
   * Greys the switch out and blocks changes. Keep it visible rather than
   * hiding it, and say why in `description` — same rule as a disabled
   * `SelectInput` option.
   */
  disabled?: boolean;
}

function getTrackClass(checked: boolean, disabled: boolean): string {
  if (disabled) {
    return 'bg-gray-200';
  }
  return checked ? 'bg-emerald-600' : 'bg-gray-300';
}

export default function SwitchToggle({
  id,
  label,
  checked,
  onChange,
  description,
  disabled = false,
}: SwitchToggleProps) {
  return (
    <div>
      <div className="flex min-h-11 items-center justify-between gap-4">
        <label
          htmlFor={id}
          className={`font-semibold text-sm ${disabled ? 'text-gray-400' : 'text-gray-700'}`}
        >
          {label}
        </label>
        <button
          id={id}
          type="button"
          role="switch"
          aria-checked={checked}
          disabled={disabled}
          onClick={() => onChange(!checked)}
          className={`relative h-7 w-12 shrink-0 rounded-full transition-colors focus:outline-none focus:ring-4 focus:ring-emerald-500/25 ${getTrackClass(
            checked,
            disabled,
          )} ${disabled ? 'cursor-not-allowed' : ''}`}
        >
          <span
            className={`absolute top-1 left-1 h-5 w-5 rounded-full shadow-sm transition-transform ${
              disabled ? 'bg-gray-50' : 'bg-white'
            } ${checked ? 'translate-x-5' : 'translate-x-0'}`}
          />
          <span className="sr-only">{checked ? 'Enabled' : 'Disabled'}</span>
        </button>
      </div>
      {description ? (
        <p className="mt-1 text-gray-500 text-xs leading-relaxed">{description}</p>
      ) : null}
    </div>
  );
}
