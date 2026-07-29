import { Loader2 } from 'lucide-react';

export default function MultiYearTaxLoading() {
  return (
    <output
      aria-label="Loading multi-year calculator"
      aria-live="polite"
      className="flex min-h-[280px] items-center justify-center rounded-xl bg-gray-50"
    >
      <Loader2 aria-hidden="true" className="h-8 w-8 animate-spin text-emerald-600" />
    </output>
  );
}
