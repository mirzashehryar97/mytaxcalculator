import { Loader2 } from 'lucide-react';

export default function SalaryInsightsLoading() {
  return (
    <output
      aria-label="Loading salary insights"
      aria-live="polite"
      className="flex min-h-80 items-center justify-center rounded-2xl border border-gray-200 bg-gray-50/70"
    >
      <Loader2 aria-hidden className="h-7 w-7 animate-spin text-emerald-600" />
    </output>
  );
}
