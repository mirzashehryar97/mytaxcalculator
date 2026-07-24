interface SwitchToggleProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
}

export default function SwitchToggle({
  id,
  label,
  checked,
  onChange,
  description,
}: SwitchToggleProps) {
  return (
    <div>
      <div className="flex min-h-11 items-center justify-between gap-4">
        <label htmlFor={id} className="font-semibold text-gray-700 text-sm">
          {label}
        </label>
        <button
          id={id}
          type="button"
          role="switch"
          aria-checked={checked}
          onClick={() => onChange(!checked)}
          className={`relative h-7 w-12 shrink-0 rounded-full transition-colors focus:outline-none focus:ring-4 focus:ring-emerald-500/25 ${
            checked ? 'bg-emerald-600' : 'bg-gray-300'
          }`}
        >
          <span
            className={`absolute top-1 left-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
              checked ? 'translate-x-5' : 'translate-x-0'
            }`}
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
