import { SALARY_INCREMENT_TYPE_OPTIONS } from '@/features/salary-increment/lib/content';
import type { IncrementInputType } from '@/features/salary-increment/types';

interface IncrementTypeToggleProps {
  value: IncrementInputType;
  onChange: (value: IncrementInputType) => void;
}

export default function IncrementTypeToggle({ value, onChange }: IncrementTypeToggleProps) {
  return (
    <span className="ml-auto inline-flex h-7 items-center rounded-lg bg-gray-100 p-0.5">
      {SALARY_INCREMENT_TYPE_OPTIONS.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            className={`rounded-md px-2.5 py-1 font-medium text-xs transition-colors ${
              active ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </span>
  );
}
