import { Loader2 } from 'lucide-react';

export default function MultiYearCalculatorLoading() {
  return (
    <output
      className="flex min-h-[280px] items-center justify-center rounded-xl bg-gray-50"
      aria-live="polite"
      aria-label="Loading multi-year calculator"
    >
      <Loader2 className="h-8 w-8 animate-spin text-emerald-600" aria-hidden="true" />
    </output>
  );
}
