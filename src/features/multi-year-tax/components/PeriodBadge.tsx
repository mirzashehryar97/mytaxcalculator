import { Check } from 'lucide-react';

interface PeriodBadgeProps {
  periodNumber: number;
  isComplete: boolean;
}

/** Numbered while a period is still being filled in, ticked once it can be taxed. */
export default function PeriodBadge({ isComplete, periodNumber }: PeriodBadgeProps) {
  return (
    <span
      aria-hidden="true"
      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-bold text-sm ${
        isComplete ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700'
      }`}
    >
      {isComplete ? <Check className="h-4 w-4" /> : periodNumber}
    </span>
  );
}
