import { Loader2 } from 'lucide-react';

export default function MultiYearChartLoading() {
  return (
    <output
      aria-label="Loading chart"
      aria-live="polite"
      className="flex h-72 w-full items-center justify-center rounded-xl bg-gray-50 sm:h-80"
    >
      <Loader2 aria-hidden="true" className="h-7 w-7 animate-spin text-emerald-600" />
    </output>
  );
}
