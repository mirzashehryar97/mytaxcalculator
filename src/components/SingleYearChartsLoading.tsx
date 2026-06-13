import { Loader2 } from 'lucide-react';

export default function SingleYearChartsLoading() {
  return (
    <output
      className="flex h-80 items-center justify-center rounded-2xl bg-gray-100"
      aria-live="polite"
      aria-label="Loading charts"
    >
      <Loader2 className="h-8 w-8 animate-spin text-emerald-600" aria-hidden="true" />
    </output>
  );
}
