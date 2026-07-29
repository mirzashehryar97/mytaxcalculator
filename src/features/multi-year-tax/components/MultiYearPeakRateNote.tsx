import { Info } from 'lucide-react';

import { getPeakEffectiveRateLabel } from '@/features/multi-year-tax/lib/presentation';
import type { PeakEffectiveRate } from '@/features/multi-year-tax/types';

interface MultiYearPeakRateNoteProps {
  peak: PeakEffectiveRate;
}

export default function MultiYearPeakRateNote({ peak }: MultiYearPeakRateNoteProps) {
  return (
    <p className="flex items-start gap-2.5 rounded-xl bg-gray-50 px-4 py-3 text-gray-700 text-sm">
      <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
      {getPeakEffectiveRateLabel(peak)}
    </p>
  );
}
